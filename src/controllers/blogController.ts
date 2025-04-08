import BlogPost from '../models/blogPost';
import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

/**
 * BlogController - Server-side controller for blog functionality
 * Handles API endpoints related to blog posts
 */
export class BlogController {
    private posts: BlogPost[] = [];
    private nextId: number = 1;
    private readonly dataFilePath = path.join(process.cwd(), 'data', 'posts.json'); // Use process.cwd() for root-relative path

    constructor() {
        this.loadData();
    }

    // Load data from posts.json
    private async loadData(): Promise<void> {
        try {
            const data = await fs.readFile(this.dataFilePath, 'utf-8');
            const parsedData = JSON.parse(data);

            // Ensure parsedData.posts is an array
            if (!Array.isArray(parsedData.posts)) {
                console.warn(`Invalid or missing 'posts' property in ${this.dataFilePath}. Initializing with an empty list.`);
                this.posts = [];
                this.nextId = 1;
                await this.saveDefaultData(); // Save default data
            } else {
                this.posts = parsedData.posts.map((post: any) =>
                    new BlogPost(post.id, post.title, post.content, post.author, post.tags, post.createdAt, post.likes)
                );
                this.nextId = parsedData.nextId || 1;
            }
        } catch (error: any) {
            if (error.code === 'ENOENT') { // ENOENT = Error NO ENTry (File not found)
                console.warn(`posts.json not found at: ${this.dataFilePath}, initializing with empty list.`);
                this.posts = [];
                this.nextId = 1;
                await this.saveDefaultData(); // Save default data
            } else {
                console.error('Error loading data:', error);
                this.posts = [];
                this.nextId = 1;
            }
        }
    }

    // Save default data to posts.json
    private async saveDefaultData(): Promise<void> {
        try {
            const defaultData = {
                posts: [],
                nextId: 1
            };
            await fs.writeFile(this.dataFilePath, JSON.stringify(defaultData, null, 2), 'utf-8');
            console.log(`Default posts.json created at: ${this.dataFilePath}`);
        } catch (error) {
            console.error('Error saving default data:', error);
        }
    }

    // Save data to posts.json
    private async saveData(): Promise<void> {
        try {
            const data = JSON.stringify({ posts: this.posts, nextId: this.nextId }, null, 2);
            await fs.writeFile(this.dataFilePath, data, 'utf-8');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    // Public methods for seeding
    public isEmpty(): boolean {
        return this.posts.length === 0;
    }

    public addPost(post: BlogPost): void {
        this.posts.push(post);
    }

    public setNextId(id: number): void {
        this.nextId = id;
    }

    async createPost(req: Request, res: Response) {
        const { title, content, author, tags } = req.body;
        
        if (!title || !content || !author) {
            return res.status(400).json({ error: "Title, content, and author are required" });
        }
        
        try {
            const newPost = new BlogPost(this.nextId++, title, content, author, tags || []);
            this.posts.push(newPost);
            await this.saveData();
            res.status(201).json(newPost);
        } catch (error) {
            console.error("Error creating post:", error); // Log any errors
            res.status(500).json({ error: "Failed to create post" });
        }
    }

    getPosts(req: Request, res: Response) {
        // Support filtering by tag
        const { tag, author } = req.query;
        
        let filteredPosts = this.posts;
        
        if (tag) {
            filteredPosts = filteredPosts.filter(post => 
                post.tags.includes(tag as string)
            );
        }
        
        if (author) {
            filteredPosts = filteredPosts.filter(post => 
                post.author.toLowerCase() === (author as string).toLowerCase()
            );
        }

        // Sort posts by date in descending order (most recent first)
        filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
        res.status(200).json(filteredPosts);
    }

    getPostById(req: Request, res: Response) {
        const { id } = req.params;
        const post = this.posts.find(post => post.id === parseInt(id));
        
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        
        res.status(200).json(post);
    }

    async updatePost(req: Request, res: Response) {
        const { id } = req.params;
        const { title, content, tags } = req.body;
        
        const postIndex = this.posts.findIndex(post => post.id === parseInt(id));
        
        if (postIndex === -1) {
            return res.status(404).json({ error: "Post not found" });
        }
        
        const post = this.posts[postIndex];
        post.update(title, content);
        
        // Update tags if provided
        if (tags && Array.isArray(tags)) {
            post.tags = tags;
        }
        
        await this.saveData(); // Save changes
        res.status(200).json(post);
    }

    async deletePost(req: Request, res: Response) {
        const { id } = req.params;
        const initialLength = this.posts.length;
        
        this.posts = this.posts.filter(post => post.id !== parseInt(id));
        
        if (this.posts.length === initialLength) {
            return res.status(404).json({ error: "Post not found" });
        }
        
        await this.saveData(); // Save changes
        res.status(204).send();
    }

    async likePost(req: Request, res: Response) {
        const { id } = req.params;
        const post = this.posts.find(post => post.id === parseInt(id));
        
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        
        post.like();
        await this.saveData(); // Save changes
        res.status(200).json({ likes: post.likes });
    }

    async unlikePost(req: Request, res: Response) {
        const { id } = req.params;
        const post = this.posts.find(post => post.id === parseInt(id));
        
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        
        if (post.likes > 0) {
            post.likes--;
            await this.saveData(); // Save changes
        }
        
        res.status(200).json({ likes: post.likes });
    }

    async addTagToPost(req: Request, res: Response) {
        const { id } = req.params;
        const { tag } = req.body;
        
        if (!tag) {
            return res.status(400).json({ error: "Tag is required" });
        }
        
        const post = this.posts.find(post => post.id === parseInt(id));
        
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        
        post.addTag(tag);
        await this.saveData(); // Save changes
        res.status(200).json(post);
    }

    getPostNavigation(req: Request, res: Response) {
        const { currentId } = req.query;

        if (!currentId) {
            return res.status(400).json({ error: "currentId query parameter is required" });
        }

        const currentIndex = this.posts.findIndex(post => post.id === parseInt(currentId as string));

        if (currentIndex === -1) {
            return res.status(200).json({
                prevId: null,
                nextId: null
            });
        }

        const prevPost = this.posts[currentIndex - 1] || null;
        const nextPost = this.posts[currentIndex + 1] || null;

        res.status(200).json({
            prevId: prevPost ? prevPost.id : null,
            nextId: nextPost ? nextPost.id : null
        });
    }
}
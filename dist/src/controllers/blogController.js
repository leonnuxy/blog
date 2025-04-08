"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const blogPost_1 = __importDefault(require("../models/blogPost"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
/**
 * BlogController - Server-side controller for blog functionality
 * Handles API endpoints related to blog posts
 */
class BlogController {
    constructor() {
        this.posts = [];
        this.nextId = 1;
        this.dataFilePath = path_1.default.join(process.cwd(), 'data', 'posts.json'); // Use process.cwd() for root-relative path
        this.loadData();
    }
    // Load data from posts.json
    loadData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield promises_1.default.readFile(this.dataFilePath, 'utf-8');
                const parsedData = JSON.parse(data);
                // Ensure parsedData.posts is an array
                if (!Array.isArray(parsedData.posts)) {
                    console.warn(`Invalid or missing 'posts' property in ${this.dataFilePath}. Initializing with an empty list.`);
                    this.posts = [];
                    this.nextId = 1;
                    yield this.saveDefaultData(); // Save default data
                }
                else {
                    this.posts = parsedData.posts.map((post) => new blogPost_1.default(post.id, post.title, post.content, post.author, post.tags, post.createdAt, post.likes));
                    this.nextId = parsedData.nextId || 1;
                }
            }
            catch (error) {
                if (error.code === 'ENOENT') { // ENOENT = Error NO ENTry (File not found)
                    console.warn(`posts.json not found at: ${this.dataFilePath}, initializing with empty list.`);
                    this.posts = [];
                    this.nextId = 1;
                    yield this.saveDefaultData(); // Save default data
                }
                else {
                    console.error('Error loading data:', error);
                    this.posts = [];
                    this.nextId = 1;
                }
            }
        });
    }
    // Save default data to posts.json
    saveDefaultData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const defaultData = {
                    posts: [],
                    nextId: 1
                };
                yield promises_1.default.writeFile(this.dataFilePath, JSON.stringify(defaultData, null, 2), 'utf-8');
                console.log(`Default posts.json created at: ${this.dataFilePath}`);
            }
            catch (error) {
                console.error('Error saving default data:', error);
            }
        });
    }
    // Save data to posts.json
    saveData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = JSON.stringify({ posts: this.posts, nextId: this.nextId }, null, 2);
                yield promises_1.default.writeFile(this.dataFilePath, data, 'utf-8');
            }
            catch (error) {
                console.error('Error saving data:', error);
            }
        });
    }
    // Public methods for seeding
    isEmpty() {
        return this.posts.length === 0;
    }
    addPost(post) {
        this.posts.push(post);
    }
    setNextId(id) {
        this.nextId = id;
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, content, author, tags } = req.body;
            if (!title || !content || !author) {
                return res.status(400).json({ error: "Title, content, and author are required" });
            }
            try {
                const newPost = new blogPost_1.default(this.nextId++, title, content, author, tags || []);
                this.posts.push(newPost);
                yield this.saveData();
                res.status(201).json(newPost);
            }
            catch (error) {
                console.error("Error creating post:", error); // Log any errors
                res.status(500).json({ error: "Failed to create post" });
            }
        });
    }
    getPosts(req, res) {
        // Support filtering by tag
        const { tag, author } = req.query;
        let filteredPosts = this.posts;
        if (tag) {
            filteredPosts = filteredPosts.filter(post => post.tags.includes(tag));
        }
        if (author) {
            filteredPosts = filteredPosts.filter(post => post.author.toLowerCase() === author.toLowerCase());
        }
        // Sort posts by date in descending order (most recent first)
        filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        res.status(200).json(filteredPosts);
    }
    getPostById(req, res) {
        const { id } = req.params;
        const post = this.posts.find(post => post.id === parseInt(id));
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json(post);
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield this.saveData(); // Save changes
            res.status(200).json(post);
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const initialLength = this.posts.length;
            this.posts = this.posts.filter(post => post.id !== parseInt(id));
            if (this.posts.length === initialLength) {
                return res.status(404).json({ error: "Post not found" });
            }
            yield this.saveData(); // Save changes
            res.status(204).send();
        });
    }
    likePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const post = this.posts.find(post => post.id === parseInt(id));
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }
            post.like();
            yield this.saveData(); // Save changes
            res.status(200).json({ likes: post.likes });
        });
    }
    unlikePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const post = this.posts.find(post => post.id === parseInt(id));
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }
            if (post.likes > 0) {
                post.likes--;
                yield this.saveData(); // Save changes
            }
            res.status(200).json({ likes: post.likes });
        });
    }
    addTagToPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield this.saveData(); // Save changes
            res.status(200).json(post);
        });
    }
    getPostNavigation(req, res) {
        const { currentId } = req.query;
        if (!currentId) {
            return res.status(400).json({ error: "currentId query parameter is required" });
        }
        const currentIndex = this.posts.findIndex(post => post.id === parseInt(currentId));
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
exports.BlogController = BlogController;

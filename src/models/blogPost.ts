class BlogPost {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
    likes: number;
    imageUrl: string;

    constructor(
        id: number,
        title: string,
        content: string,
        author: string,
        imageUrl: string,
        tags: string[] = [],
        createdAt?: string | Date,
        likes?: number
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.createdAt = createdAt ? new Date(createdAt) : new Date();
        this.updatedAt = new Date();
        this.tags = tags || [];
        this.likes = likes !== undefined ? likes : 0;
        this.imageUrl = imageUrl;
    }

    addTag(tag: string): void {
        if (!this.tags.includes(tag)) {
            this.tags.push(tag);
        }
    }

    like(): void {
        this.likes++;
    }

    update(title?: string, content?: string): void {
        if (title) this.title = title;
        if (content) this.content = content;
        this.updatedAt = new Date();
    }
}

export default BlogPost;
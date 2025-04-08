"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BlogPost {
    constructor(id, title, content, author, tags = [], createdAt, likes) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.createdAt = createdAt ? new Date(createdAt) : new Date();
        this.updatedAt = new Date();
        this.tags = tags || [];
        this.likes = likes !== undefined ? likes : 0;
    }
    addTag(tag) {
        if (!this.tags.includes(tag)) {
            this.tags.push(tag);
        }
    }
    like() {
        this.likes++;
    }
    update(title, content) {
        if (title)
            this.title = title;
        if (content)
            this.content = content;
        this.updatedAt = new Date();
    }
}
exports.default = BlogPost;

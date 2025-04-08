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
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
function seedBlogPosts(blogController) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataFilePath = path_1.default.join(process.cwd(), 'data', 'posts.json');
        console.log(`🌱 Seeding initial blog posts from ${dataFilePath}...`);
        try {
            const data = yield promises_1.default.readFile(dataFilePath, 'utf-8');
            const postsData = JSON.parse(data);
            // Validate that postsData.posts is an array
            if (!Array.isArray(postsData.posts)) {
                throw new TypeError(`Invalid 'posts' property in ${dataFilePath}. Expected an array.`);
            }
            // Seed posts into the BlogController
            postsData.posts.forEach((post) => {
                blogController.addPost(post);
            });
            // Set the nextId in the BlogController
            blogController.setNextId(postsData.nextId || 1);
            console.log(`✅ Seeded ${postsData.posts.length} blog posts successfully!`);
        }
        catch (error) {
            console.error(`❌ Error seeding blog posts:`, error);
        }
    });
}
exports.default = seedBlogPosts;

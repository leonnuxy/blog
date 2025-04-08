import fs from 'fs/promises';
import path from 'path';
import { BlogController } from '../controllers/blogController';

async function seedBlogPosts(blogController: BlogController): Promise<void> {
    const dataFilePath = path.join(process.cwd(), 'data', 'posts.json');
    console.log(`🌱 Seeding initial blog posts from ${dataFilePath}...`);

    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        const postsData = JSON.parse(data);

        // Validate that postsData.posts is an array
        if (!Array.isArray(postsData.posts)) {
            throw new TypeError(`Invalid 'posts' property in ${dataFilePath}. Expected an array.`);
        }

        // Seed posts into the BlogController
        postsData.posts.forEach((post: any) => {
            blogController.addPost(post);
        });

        // Set the nextId in the BlogController
        blogController.setNextId(postsData.nextId || 1);

        console.log(`✅ Seeded ${postsData.posts.length} blog posts successfully!`);
    } catch (error) {
        console.error(`❌ Error seeding blog posts:`, error);
    }
}

export default seedBlogPosts;
import { Router } from 'express';
import { BlogController } from '../controllers/blogController';

export function setBlogRoutes(app: any, blogController?: BlogController) {
    const router = Router();
    
    // Use provided controller instance or create a new one
    const controller = blogController || new BlogController(); // Ensure no conflicts here

    // Blog post CRUD operations
    router.get('/posts/navigation', controller.getPostNavigation.bind(controller));
    router.post('/posts', controller.createPost.bind(controller));
    router.get('/posts', controller.getPosts.bind(controller));
    router.get('/posts/:id', controller.getPostById.bind(controller));
    router.put('/posts/:id', controller.updatePost.bind(controller));
    router.delete('/posts/:id', controller.deletePost.bind(controller));

    // Additional blog post operations
    router.post('/posts/:id/like', controller.likePost.bind(controller));
    router.post('/posts/:id/tags', controller.addTagToPost.bind(controller));
    router.delete('/posts/:id/like', controller.unlikePost.bind(controller));

    app.use('/api', router);
}
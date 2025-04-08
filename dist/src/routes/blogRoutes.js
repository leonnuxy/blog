"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBlogRoutes = setBlogRoutes;
const express_1 = require("express");
const blogController_1 = require("../controllers/blogController");
function setBlogRoutes(app, blogController) {
    const router = (0, express_1.Router)();
    // Use provided controller instance or create a new one
    const controller = blogController || new blogController_1.BlogController(); // Ensure no conflicts here
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

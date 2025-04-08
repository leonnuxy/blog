"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const blogRoutes_1 = require("../routes/blogRoutes"); // Adjust path relative to src/entries/app.ts
const blogController_1 = require("../controllers/blogController"); // Adjust path relative to src/entries/app.ts
const promises_1 = __importDefault(require("fs/promises")); // Import fs promises
// --- Configuration ---
const PORT = process.env.PORT || 3000;
// --- Corrected Path Calculation ---
const BASE_DIR = path_1.default.join(__dirname, '..', '..', '..');
const PUBLIC_DIR = path_1.default.join(BASE_DIR, 'public');
const DIST_DIR = path_1.default.join(BASE_DIR, 'dist');
const STYLES_DIR = path_1.default.join(BASE_DIR, 'styles');
const IMAGES_DIR = path_1.default.join(PUBLIC_DIR, 'images');
// --- Express App Setup ---
const app = (0, express_1.default)();
// --- Initialize Controllers ---
const blogController = new blogController_1.BlogController();
// --- Middleware ---
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// --- Static File Serving ---
// Serve built client-side JS bundles from dist/client
app.use('/dist/client', express_1.default.static(path_1.default.join(DIST_DIR, 'client')));
// Serve CSS files from styles
app.use('/styles', express_1.default.static(STYLES_DIR));
// Serve images from public/images
app.use('/images', express_1.default.static(IMAGES_DIR));
// Serve static assets (HTML, fonts etc.) from the 'public' directory
// This handles requests for /, /index.html, /post.html, /admin.html etc.
app.use(express_1.default.static(PUBLIC_DIR));
// --- API Routes ---
// Pass the controller instance
(0, blogRoutes_1.setBlogRoutes)(app, blogController);
// --- Page Serving ---
// Explicit routes REMOVED - relying on express.static(PUBLIC_DIR) above
/*
app.get('/', (req: Request, res: Response) => {
    // express.static should serve index.html automatically
});

app.get('/admin.html', (req: Request, res: Response) => {
     // express.static should serve admin.html automatically
});
*/
// --- Error Handling ---
// 404 Handler - Keep this AFTER all other routes and static middleware
app.use((req, res) => {
    console.log(`404 Handler triggered for: ${req.method} ${req.originalUrl}`); // Add log
    const fourOhFourPath = path_1.default.join(PUBLIC_DIR, '404.html');
    // Check if 404.html exists before sending
    promises_1.default.access(fourOhFourPath).then(() => {
        res.status(404).sendFile(fourOhFourPath);
    }).catch(() => {
        // Fallback if 404.html doesn't exist
        res.status(404).send('Error 404: Page Not Found');
    });
});
// Global Error Handler (should be last middleware)
app.use((err, req, res, next) => {
    console.error("Global error handler:", err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV !== 'production' ? err.message : 'Something went wrong on the server.'
    });
});
// --- Server Start Function ---
function startServer(port) {
    const server = app.listen(port)
        .on('error', (err) => {
        server.close();
        if (err.code === 'EADDRINUSE') {
            console.warn(`⚠️ Port ${port} is already in use, trying port ${port + 1}...`);
            if (port < (typeof PORT === 'string' ? parseInt(PORT, 10) : PORT) + 10) {
                startServer(port + 1);
            }
            else {
                console.error(`❌ Could not find an available port after trying up to ${port}.`);
            }
        }
        else {
            console.error('❌ Server startup error:', err);
        }
    })
        .on('listening', () => {
        const address = server.address();
        if (address && typeof address !== 'string') {
            const actualPort = address.port;
            console.log(`✅ Server is running successfully on http://localhost:${actualPort}`);
        }
        else {
            console.log(`✅ Server is running successfully (address: ${address})`);
        }
    });
}
// --- Initiate Server Start ---
startServer(Number(PORT));
// Export the app instance (useful for testing)
exports.default = app;

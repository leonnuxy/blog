import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import { AddressInfo } from 'net'; 
import { setBlogRoutes } from '../routes/blogRoutes'; // Adjust path relative to src/entries/app.ts
import { BlogController } from '../controllers/blogController'; // Adjust path relative to src/entries/app.ts
import { Server } from 'http'; 
import fs from 'fs/promises'; // Import fs promises

// --- Configuration ---
const PORT = process.env.PORT || 3000;

// --- Corrected Path Calculation ---
const BASE_DIR = path.join(__dirname, '..', '..', '..'); 
const PUBLIC_DIR = path.join(BASE_DIR, 'public'); 
const DIST_DIR = path.join(BASE_DIR, 'dist');     
const STYLES_DIR = path.join(BASE_DIR, 'styles'); 
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images'); 

// --- Express App Setup ---
const app = express();

// --- Initialize Controllers ---
const blogController = new BlogController();

// --- Middleware ---
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// --- Static File Serving ---
// Serve built client-side JS bundles from dist/client
app.use('/dist/client', express.static(path.join(DIST_DIR, 'client'))); 
// Serve CSS files from styles
app.use('/styles', express.static(STYLES_DIR));
// Serve images from public/images
app.use('/images', express.static(IMAGES_DIR)); 
// Serve static assets (HTML, fonts etc.) from the 'public' directory
// This handles requests for /, /index.html, /post.html, /admin.html etc.
app.use(express.static(PUBLIC_DIR)); 

// --- API Routes ---
// Pass the controller instance
setBlogRoutes(app, blogController); 

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
app.use((req: Request, res: Response) => {
    console.log(`404 Handler triggered for: ${req.method} ${req.originalUrl}`); // Add log
    const fourOhFourPath = path.join(PUBLIC_DIR, '404.html');
    // Check if 404.html exists before sending
    fs.access(fourOhFourPath).then(() => {
        res.status(404).sendFile(fourOhFourPath);
    }).catch(() => {
        // Fallback if 404.html doesn't exist
        res.status(404).send('Error 404: Page Not Found');
    });
});

// Global Error Handler (should be last middleware)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Global error handler:", err.stack); 
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV !== 'production' ? err.message : 'Something went wrong on the server.'
    });
});

// --- Server Start Function ---
function startServer(port: number): void {
    const server: Server = app.listen(port)
        .on('error', (err: NodeJS.ErrnoException) => {
            server.close(); 
            if (err.code === 'EADDRINUSE') {
                console.warn(`⚠️ Port ${port} is already in use, trying port ${port + 1}...`);
                if (port < (typeof PORT === 'string' ? parseInt(PORT, 10) : PORT) + 10) {
                    startServer(port + 1);
                } else {
                    console.error(`❌ Could not find an available port after trying up to ${port}.`);
                }
            } else {
                console.error('❌ Server startup error:', err);
            }
        })
        .on('listening', () => {
            const address = server.address();
            if (address && typeof address !== 'string') {
                const actualPort = address.port;
                console.log(`✅ Server is running successfully on http://localhost:${actualPort}`);
            } else {
                 console.log(`✅ Server is running successfully (address: ${address})`);
            }
        });
}

// --- Initiate Server Start ---
startServer(Number(PORT));

// Export the app instance (useful for testing)
export default app;

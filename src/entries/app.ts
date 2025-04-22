// src/entries/app.ts

import express, { Request, Response } from 'express';
import next from 'next';
import path from 'path';
import cors from 'cors';

const dev = process.env.NODE_ENV !== 'production';
// point Next at your project root (where package.json + pages/ live)
const nextApp = next({ dev, dir: path.resolve(__dirname, '../../../') });
const handle = nextApp.getRequestHandler();

async function main() {
  // 1) Prepare Next
  await nextApp.prepare();

  // 2) Create Express server
  const app = express();

  // 3) Standard middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // 4) Static asset routes
  //    - your CSS under /styles
  //    - images under /images
  //    - everything in public (including index.html, post.html, admin.html—though
  //      with Next in front we’ll rarely hit these)
  const projectRoot = path.resolve(__dirname, '../../../');
  app.use('/styles', express.static(path.join(projectRoot, 'styles')));
  app.use('/images', express.static(path.join(projectRoot, 'public/images')));
  app.use(express.static(path.join(projectRoot, 'public')));

  // 5) Let Next.js handle **everything else** (pages, /pages/api, next‑static, etc.)
  app.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  // 6) Start listening
  const port = parseInt(process.env.PORT || '3000', 10);
  app.listen(port, () => {
    console.log(`> Server ready on http://localhost:${port}  [dev=${dev}]`);
  });
}

main().catch((err) => {
  console.error('‼️ Failed to start server:', err);
  process.exit(1);
});

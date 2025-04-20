# Duolingo-Style Blog Project

This project is a modern blog application with a Duolingo-inspired design, built with TypeScript and Webpack. It features both client and admin interfaces for managing blog posts.

## Project Structure

```
blog-project
├── src
│   ├── client                 # Client-side code
│   ├── components             # UI components
│   ├── controllers            # Application controllers
│   ├── entries                # Entry points for client and admin
│   ├── models                 # Data models
│   ├── services               # API services
│   ├── types                  # TypeScript types and interfaces
│   └── utils                  # Utility functions
├── public                     # Static HTML files
│   ├── admin.html            # Admin interface
│   ├── index.html            # Main blog page
│   └── post.html             # Individual post page
├── styles                     # CSS styles
├── data                       # JSON data files
├── Dockerfile                 # Docker image instructions
├── docker-compose.yml         # Docker orchestration file
├── package.json               # npm configuration file
├── tsconfig.json              # TypeScript configuration file
├── webpack.config.js          # Webpack configuration
└── README.md                  # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd blog-project
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the application in development mode:
   ```
   npm run dev -- src/entries/client.ts
   ```
   
   For the admin interface:
   ```
   npm run dev -- src/entries/admin.ts
   ```

4. Build the application for production:
   ```
   npm run build
   ```
   
5. Start the production build:
   ```
   npm start
   ```

6. To run the application using Docker:
   ```
   docker-compose up
   ```

## Usage

- To create a new blog post, send a POST request to `/api/posts` with the blog post data.
- To retrieve all blog posts, send a GET request to `/api/posts`.
- To delete a blog post, send a DELETE request to `/api/posts/:id`.

## License

This project is licensed under the MIT License.
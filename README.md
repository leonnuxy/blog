# Blog Project

This project is a simple blog application built with TypeScript and Express. It allows users to create, retrieve, and delete blog posts.

## Project Structure

```
blog-project
├── src
│   ├── app.ts                  # Entry point of the application
│   ├── controllers
│   │   ├── blogController.ts   # Handles blog post operations
│   │   └── index.ts            # Aggregates controllers
│   ├── models
│   │   └── blogPost.ts         # Defines the BlogPost model
│   ├── routes
│   │   └── blogRoutes.ts       # Sets up blog-related routes
│   └── types
│       └── index.ts            # TypeScript types and interfaces
├── Dockerfile                   # Docker image instructions
├── docker-compose.yml           # Docker orchestration file
├── package.json                 # npm configuration file
├── tsconfig.json                # TypeScript configuration file
└── README.md                    # Project documentation
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

3. Run the application:
   ```
   npm start
   ```

4. To run the application using Docker, use:
   ```
   docker-compose up
   ```

## Usage

- To create a new blog post, send a POST request to `/api/posts` with the blog post data.
- To retrieve all blog posts, send a GET request to `/api/posts`.
- To delete a blog post, send a DELETE request to `/api/posts/:id`.

## License

This project is licensed under the MIT License.
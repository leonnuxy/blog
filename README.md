# Duolingo-Style Blog Project

This project is a modern blog application with a Duolingo-inspired design, built with TypeScript and Webpack. It features both client and admin interfaces for managing blog posts.

## Project Structure

```
blog-project
├── data                      # Data files (e.g., posts.json)
├── fonts                     # Font files
├── public                    # Static HTML and assets
│   ├── admin.html            # Admin interface
│   ├── index.html            # Main blog page
│   └── post.html             # Individual post page
├── scripts                   # Utility scripts
├── shared                    # Shared TypeScript types
├── src                       # Source code
│   ├── client                # Client-side code
│   ├── components            # UI components
│   ├── controllers           # Application controllers
│   ├── entries               # Entry points for client and admin
│   ├── models                # Data models
│   ├── modules               # Feature modules
│   ├── services              # API services
│   ├── types                 # TypeScript types and interfaces
│   └── utils                 # Utility functions
├── styles                    # CSS stylesheets
│   ├── components            # Component-specific styles
│   ├── global                # Global styles
│   └── views                 # View-specific styles
├── views                     # HTML views
├── Dockerfile                # Docker configuration
├── docker-compose.yml        # Docker Compose configuration
├── package.json              # Node.js dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── webpack.config.js         # Webpack configuration
```

## How to Run the Application

To build and run the application, use the following commands:

```bash
npm run build && npx tsc && node dist/src/entries/app.js
```

### Steps:
1. `npm run build`: Builds the project using Webpack.
2. `npx tsc`: Compiles the TypeScript files into JavaScript.
3. `node dist/src/entries/app.js`: Starts the application.

## Features
- **Client Interface**: A user-friendly interface for browsing blog posts.
- **Admin Interface**: Tools for managing blog content.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Dark Mode**: Toggle between light and dark themes.
- **Search and Pagination**: Easily find and navigate through posts.

## Development
To contribute or modify the project, ensure you have the following installed:
- Node.js (v16 or later)
- npm (v7 or later)

### Setting Up the Development Environment
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Use `npm run build` to build the project.
4. Start the application using the run command mentioned above.

Feel free to explore the `src` directory for the main codebase and the `styles` directory for CSS customizations.
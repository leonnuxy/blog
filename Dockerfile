# Use a lightweight Node.js image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the application files
COPY . ./

# Build the project
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Serve the built files using http-server
CMD ["npx", "http-server", "dist", "-p", "3000"]
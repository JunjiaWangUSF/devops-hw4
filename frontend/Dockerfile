# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build your app
RUN npm run build

# Install `serve` to serve the build directory
RUN npm install -g serve

# Serve your static files
CMD ["serve", "-s", "dist", "-l", "80"]
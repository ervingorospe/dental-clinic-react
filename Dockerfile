# Use Node.js as the base image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Expose the port
EXPOSE 3000

# Serve the built app using a basic Express server
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]

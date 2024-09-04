# Use parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY backend/package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY backend/ ./

# Copy the frontend files into a public directory in the backend
COPY frontend/ /app/public/

# Expose the port the app runs on
EXPOSE 3003
#

# Define the command to run your app
CMD ["node", "index.js"]

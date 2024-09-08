# Start from the official MongoDB image
FROM mongo:latest

# Copy the MongoDB initialization script to the initialization directory
COPY init-users.js /docker-entrypoint-initdb.d/

# Ensure permissions are set correctly
RUN chmod +x /docker-entrypoint-initdb.d/init-users.js

# Expose MongoDB's default port
EXPOSE 27017

# Use the default MongoDB entrypoint
CMD ["mongod"]
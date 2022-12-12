FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY ./client/client-app/package*.json ./
COPY ./client/client-app/yarn*.lock ./

# Install dependencies
RUN yarn

# Copy the source code from the repository to the container
COPY ./client/client-app/* ./

# Run the start-command which builds and serves the app
CMD ["yarn", "start"]
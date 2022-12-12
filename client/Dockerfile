FROM alpine

# Add nodeJS to the container because alpine doesn't have it
RUN apk add --update nodejs yarn

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package*.json ./
COPY yarn*.lock ./

# Install dependencies
RUN yarn install --ignore-engines

# Copy the source code from the repository to the container
COPY ./ ./

# Run the start-command which builds and serves the app
CMD ["yarn", "start"]
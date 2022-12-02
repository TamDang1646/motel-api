FROM node:17

# Working dir
WORKDIR /usr/src/app

# Copy files from Build
COPY package*.json ./

# Install Globals
RUN yarn add prettier 

# Install Files
RUN yarn

# Copy SRC
COPY . .

# Build
RUN yarn build

# Open Port
EXPOSE 3000

# Docker Command to Start Service
CMD [ "node", "build/server.js" ]
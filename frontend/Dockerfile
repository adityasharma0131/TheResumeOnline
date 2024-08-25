# Stage 1: Build the React application
FROM node:22 
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
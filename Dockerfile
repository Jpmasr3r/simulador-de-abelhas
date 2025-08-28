# Stage 1: build TypeScript
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx tsc

# Stage 2: Nginx
FROM nginx:latest
# Cpoy dist from builder
COPY --from=builder /app/beeSimulator/dist /usr/share/nginx/html/dist
# Copy index.html
COPY beeSimulator/index.html /usr/share/nginx/html/index.html
# Copy CSS
COPY beeSimulator/style.css /usr/share/nginx/html/style.css
# Copy images
COPY beeSimulator/assets /usr/share/nginx/html/assets
# Copy nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

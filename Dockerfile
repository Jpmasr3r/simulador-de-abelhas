# Stage 1: build TypeScript
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Nginx
FROM nginx:latest
# Copy nginx.conf
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf
# Copy public
COPY --from=builder /app/app/public /usr/share/nginx/html/public
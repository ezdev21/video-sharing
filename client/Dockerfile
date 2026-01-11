# --- Stage 1: Build the Vite app ---
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package.json and lock file first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining project files
COPY . .

# Build the Vite project
RUN npm run build


# --- Stage 2: Serve with NGINX ---
FROM nginx:1.27-alpine

# Remove default NGINX static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from Vite to NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (if provided)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
# 1️⃣ Base image
FROM node:20-alpine AS base

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy package files only
COPY package*.json ./

# 4️⃣ Disable npm postinstall scripts temporarily
ENV NPM_CONFIG_IGNORE_SCRIPTS=true

# 5️⃣ Install only production dependencies
RUN npm install --production

# 6️⃣ Re-enable npm scripts
ENV NPM_CONFIG_IGNORE_SCRIPTS=false

# 7️⃣ Copy rest of the source code
COPY . .

# 8️⃣ Build TypeScript
RUN npm run build

# 9️⃣ Expose app port
EXPOSE 3000

# 10️⃣ Set environment variable to point to production database
# Replace with your actual production DATABASE_URL at runtime
ENV NODE_ENV=production

# 11️⃣ Startup script
# This ensures Prisma generates client at runtime and optionally runs migrations
CMD npx prisma generate && node dist/index.js

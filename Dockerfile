FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production
COPY src ./src
ENV PORT=8000
EXPOSE 8000
CMD ["node","src/http-mcp.js"]


FROM node:22-alpine
WORKDIR /app
COPY package.json ./
COPY src ./src
COPY web ./web
ENV NODE_ENV=production AUTH_MODE=trusted-proxy PORT=8080
USER node
EXPOSE 8080
CMD ["node","src/index.js"]

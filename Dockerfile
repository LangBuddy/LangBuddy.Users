FROM node:20.6.1 AS base
WORKDIR /app
EXPOSE 8003

COPY package*.json ./
# COPY tsconfig.json ./
# COPY src ./src

RUN npm install
COPY . .
RUN npm run build

CMD ["node", "dist/main"]
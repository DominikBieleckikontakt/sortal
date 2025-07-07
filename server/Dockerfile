FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
EXPOSE 5000
CMD ["pnpm", "run", "dev"]

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 👇 Accept build argument
ARG VITE_API_URL

# 👇 Export as env so Vite can read
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

RUN npm install -g serve

EXPOSE 3001

CMD ["serve", "-s", "dist", "-l", "3000"]
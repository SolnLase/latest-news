FROM node:alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx
EXPOSE 80

WORKDIR /usr/share/nginx/html/spotlatestnews
COPY --from=builder /app/build ./

CMD ["nginx", "-g", "daemon off;"]
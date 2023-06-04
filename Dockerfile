FROM node:alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx
EXPOSE 80

WORKDIR /var/www/html
COPY --from=builder /app/build ./

CMD ["nginx", "-g", "daemon off;"]
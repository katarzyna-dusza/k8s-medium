FROM node as builder
COPY . /app
WORKDIR /app
RUN npm install && npm run build

FROM nginx
COPY --from=builder /app/build /etc/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf
WORKDIR /etc/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

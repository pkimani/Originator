FROM nginx:latest

RUN apt-get update && apt-get install -y netcat

COPY wait-for-frontend.sh /wait-for-frontend.sh

RUN chmod +x /wait-for-frontend.sh

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["/wait-for-frontend.sh", "nginx", "-g", "daemon off;"]

FROM nginx:alpine

# Copy the wait-for-it script and make it executable
COPY wait-for-graphql.sh /wait-for-graphql.sh
RUN chmod +x /wait-for-graphql.sh

# Copy Nginx configuration files
COPY nginx.conf /etc/nginx/nginx.conf
COPY proxy_params /etc/nginx/proxy_params

# Copy SSL certificates
COPY localhost.crt /etc/nginx/localhost.crt
COPY localhost.key /etc/nginx/localhost.key
COPY dhparam.pem /etc/nginx/dhparam.pem

# Adjusted to expose HTTPS port
EXPOSE 443

# Adjusted entrypoint to keep Nginx running in the foreground
ENTRYPOINT ["/wait-for-graphql.sh", "nginx", "-g", "daemon off;"]

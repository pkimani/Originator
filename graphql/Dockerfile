FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install express express-graphql graphql

COPY . .

EXPOSE 4000

CMD ["node", "index.js"]

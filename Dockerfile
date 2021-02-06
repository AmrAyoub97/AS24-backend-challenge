FROM node:14
WORKDIR /app
COPY package*.json ./
RUN apt-get update && apt-get install -y postgresql-client
RUN npm install
COPY . .
EXPOSE 3000
CMD npm start


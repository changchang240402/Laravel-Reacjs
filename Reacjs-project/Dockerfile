FROM node:19-alpine

WORKDIR /var/www/html

COPY package.json /frontend

RUN npm install

COPY . /frontend

CMD [ "npm", "run", "dev" ]
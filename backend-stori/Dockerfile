FROM node:16

RUN npm i -g nodemon

WORKDIR /usr/src/api

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]
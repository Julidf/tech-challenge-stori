FROM node:16

RUN npm i -g nodemon

WORKDIR /backend

COPY package.json .

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "dev" ]
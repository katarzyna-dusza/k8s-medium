FROM node

COPY package.json .
RUN yarn install

COPY server.js .
COPY movies-model.js .

EXPOSE 4000

CMD node server.js prod

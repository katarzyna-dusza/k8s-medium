FROM node

COPY package.json .
RUN yarn install

COPY server.js .

EXPOSE 4040

CMD node server.js prod

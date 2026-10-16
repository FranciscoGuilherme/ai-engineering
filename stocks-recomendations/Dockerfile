FROM node:20-slim

WORKDIR /home/node/app

COPY package.json ./
RUN npm install

COPY --chown=node:node . .

USER node

EXPOSE 8080

CMD ["npm", "run", "dev"]

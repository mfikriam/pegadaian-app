FROM node:18.17.0

WORKDIR /app

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
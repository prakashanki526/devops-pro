FROM node:19-alpine3.15

WORKDIR /devops-pro

COPY . .

RUN npm install --legacy-peer-deps

EXPOSE 3000

CMD ["npm","start"]


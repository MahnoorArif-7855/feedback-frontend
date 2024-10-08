FROM node:16.8.0

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]

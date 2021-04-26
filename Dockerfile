FROM node:latest

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY src /app/src

RUN npm install
RUN npm build

COPY . /app

EXPOSE 3000
CMD ["npm", "start"]

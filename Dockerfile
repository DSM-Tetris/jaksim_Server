FROM node:14.16.1

WORKDIR /app

COPY package*.json ./
COPY prisma ./
COPY tsconfig.json ./
COPY src /app/src

RUN npm install
RUN npx prisma generate
RUN npm run build

COPY . /app

EXPOSE 3000
CMD ["npm", "start"]

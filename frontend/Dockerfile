FROM node:12.18-alpine
WORKDIR /usr/src/app
COPY package*.json /usr/src/app
RUN npm install 
COPY . /usr/src/app
EXPOSE 4200
CMD ["npm", "start"]

FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# COPY package.json .
# For npm@5 or later, copy package-lock.json as well
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8081

CMD [ "npm", "start" ]
# pull official base image
FROM node:16.0.0-alpine3.13

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install --force --silent 
RUN npm install react-scripts@3.4.1 -g --force --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]

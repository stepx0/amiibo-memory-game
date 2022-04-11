# pull official base image
FROM node:16.13.2-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./

RUN npm install 
RUN npm install react-scripts@5.0.0 -g 

# add app
COPY src ./src
COPY public ./public

# start app
EXPOSE 3000
CMD ["npm", "start"]

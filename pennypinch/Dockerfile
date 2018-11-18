#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

FROM node:8

# Create app directory
WORKDIR /usr/src/app

RUN npm install webpack -g

WORKDIR /tmp
COPY ClientApp/package*.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install --only=production

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/
RUN webpack

# Bundle app source
COPY ./ClientApp/. .

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD [ "npm", "run", "start:prod" ]

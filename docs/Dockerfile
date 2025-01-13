FROM node:22.13.0

WORKDIR /app

COPY docs/package*.json .
COPY docs/tsconfig.json .

RUN npm install

COPY docs/. .

COPY users-service/src/swagger-docs users-service-swagger-docs
COPY url-service/src/swagger-docs url-service-swagger-docs

EXPOSE 4000

CMD ["npm", "start"]

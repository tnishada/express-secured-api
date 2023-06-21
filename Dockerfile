FROM node:latest as builder

RUN mkdir /build

WORKDIR /build

COPY  . .

ENTRYPOINT ["sh", "-c", "node /build/index.js" ]



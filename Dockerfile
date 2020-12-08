FROM node:14 AS builder

WORKDIR /usr/src/app

ARG BASE_PATH
ENV BASE_PATH=$BASE_PATH

COPY package*.json /usr/src/app/
RUN npm ci

COPY . /usr/src/app
ENV NODE_ENV=production 
RUN npm run build

FROM node:14-alpine AS runtime

WORKDIR /usr/src/app

ARG BASE_PATH
ARG VERSION_HASH
ENV PORT=7100 \
    NODE_ENV=production \
    BASE_PATH=$BASE_PATH \
    VERSION_HASH=$VERSION_HASH

COPY package*.json /usr/src/app/
RUN npm ci
COPY . /usr/src/app

EXPOSE 7100
USER node

COPY --from=builder /usr/src/app/build /usr/src/app/build

CMD ["npm", "run", "podlet"]


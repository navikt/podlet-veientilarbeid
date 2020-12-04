FROM node:14 AS builder

WORKDIR /usr/src/app

ARG BASE_PATH
ENV NODE_ENV=production \
    BASE_PATH=$BASE_PATH

COPY package*.json /usr/src/app/
RUN npm ci

COPY . /usr/src/app
RUN npm run build

FROM node:14-alpine AS runtime

WORKDIR /usr/src/app

ARG BASE_PATH
ENV PORT=7100 \
    NODE_ENV=production \
    BASE_PATH=$BASE_PATH

EXPOSE 7100
USER node

COPY --from=builder /usr/src/app /usr/src/app

CMD ["npm", "run", "podlet"]


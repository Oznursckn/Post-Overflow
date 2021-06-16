FROM node:alpine as build

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

# After Build

FROM node:alpine

WORKDIR /app

COPY --from=build /app/build ./build
COPY package.json .
COPY yarn.lock .

RUN yarn install --prod

EXPOSE 5000

ENTRYPOINT [ "yarn", "start" ]
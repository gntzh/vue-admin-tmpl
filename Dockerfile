FROM node:lts-alpine as build-stage

RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . ./
RUN pnpm run build

FROM nginx:stable-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html

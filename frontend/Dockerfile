FROM node:lts-stretch

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY . /src/frontend
WORKDIR /src/frontend
RUN pnpm install && pnpm build

FROM nginx:stable
COPY --from=0 /src/frontend/dist /usr/share/nginx/html/
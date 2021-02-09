#ARG DOCKER_HUB="docker.io"
#
#FROM $DOCKER_HUB/library/node:10.10-alpine as build
#
#
#COPY . /workspace/
#
#ARG NPM_REGISTRY=" https://registry.npmjs.org"
#
#RUN echo "registry = \"$NPM_REGISTRY\"" > /workspace/.npmrc                              && \
#    cd /workspace/                                                                       && \
#    npm install                                                                          && \
#    npm run build
#
#ARG NGINX_VERSION="1.17.6"
#FROM $DOCKER_HUB/library/nginx:$NGINX_VERSION AS runtime
#
#
#COPY  --from=build /workspace/dist/ /usr/share/nginx/html/
#
#RUN chmod a+rwx /var/cache/nginx /var/run /var/log/nginx                        && \
#    sed -i.bak 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf && \
#    sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf
#
#
#EXPOSE 8080
#
#USER nginx
#
#HEALTHCHECK     CMD     [ "service", "nginx", "status" ]
#
#
# stage 1
# FROM node:latest as node
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build --prod

# # stage 2
# FROM nginx:alpine
# COPY --from=node /app/dist/ /usr/share/nginx/html

FROM node:latest as node
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/
RUN npm install 
COPY . /app/
EXPOSE 4200
CMD ["npm", "run", "start"]
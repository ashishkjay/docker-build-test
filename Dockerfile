FROM node:14.8.0 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app
RUN yarn
COPY . /app
USER node

RUN yarn config set registry http://repo1.uhc.com/artifactory/api/npm/npm-virtual
# RUN yarn build

RUN chmod g+wrx /app && \
    chmod g+wrx /app/node_modules

EXPOSE 3000
# CMD ["yarn", "start"]
CMD ["sh", "-c", "yarn build && yarn start"]

# production environment
# FROM nginx:stable-alpine
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
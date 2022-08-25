FROM node:16.10 AS build

# Dependencies install, project build and copy result to deployment folder
WORKDIR /app

COPY .eslintrc tsconfig.json tsconfig.build.json package.json yarn.lock .env ./
COPY src/ ./src/

RUN yarn --ignore-scripts
RUN yarn --ignore-scripts build

RUN rm -rf ./node_modules
RUN yarn --ignore-scripts --production

FROM node:16.10 AS dist

# Prepare folder trees
RUN mkdir -p /app

# Prepare environment
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# Dependencies install, project build and copy result to deployment folder
WORKDIR /app

# Exposing the api port
EXPOSE 5050

# Copy package definition and dist code into the container
COPY package.json yarn.lock ./
COPY --from=build /app/dist/ ./dist/
COPY --from=build /app/node_modules/ ./node_modules/
COPY ./execute/entrypoint.sh /

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

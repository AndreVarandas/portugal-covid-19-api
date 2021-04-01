# First stage - The Build image
FROM node:15-alpine AS build

# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json yarn.lock ./
# Install deps
RUN yarn
# Copy app assets
COPY . .
# Build the app
RUN yarn build

# Second Stage - The production image
FROM node:15-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock ./

RUN yarn install --production

# Copy only the dist
COPY --from=build /usr/src/app/dist dist

# Set environment variables
ENV NODE_ENV production

EXPOSE ${PORT}
CMD [ "npm", "run", "start" ]

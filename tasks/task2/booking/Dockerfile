FROM node:24.0.0-bullseye
WORKDIR /app

COPY . .
# Install
RUN npm ci --production
#RUN npm uninstall node-rdkafka
#RUN npm install node-rdkafka --no-package-lock

# Migrate (docker container with db should be up) IT IS NOT
##RUN bun migrate:latest

# Run server
CMD ["npm", "run", "start"]

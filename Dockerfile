# Stage 1
FROM node AS my-app-build
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=my-app-build /app/dist/TodoTasksfrontend /usr/share/nginx/html
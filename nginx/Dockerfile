FROM nginx:1.27.1-alpine

RUN mkdir -p /etc/nginx/conf.d

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
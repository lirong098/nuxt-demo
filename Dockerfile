FROM node:8.9.0

ENV NODE_ENV=production
ENV HOST 0.0.0.0
ENV LANG C.UTF-8
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo Asia/Shanghai > /etc/timezone
RUN mkdir -p /app
COPY . /app
WORKDIR /app
EXPOSE 3000
# 在中国环境下，为了提高npm下载包速度，设置镜像源 https://registry.npm.taobao.org 非中国环境下可删掉
RUN npm config set registry https://registry.npm.taobao.org && npm install -g pm2 && npm install && npm run build
CMD ["npm", "start"]

# nuxt-ssr

> docker环境部署
> pm2守护nuxt.js进程
> 自定义api、axios、less、全局less变量、url-loader、全局css，js等配置

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```
## Deploy
```bash
# create docker image
docker build -t nuxt-demo .

# start server
docker run -d -p 3000:3000 --name nuxt-demo1 nuxt-demo

# start server and enter container
docker run -it -p 3000:3000 --name nuxt-demo1 nuxt-demo
```
## FAQ
### 如何在docker中运行pm2？
参考[keymetrics/docker-pm2](https://github.com/keymetrics/docker-pm2)
~~~bash
# 安装pm2一样
$ npm install -g pm2

# 物理机启动pm2守护nuxt.js
$ pm2 start nuxt --name nuxt-demo -- start -i 0

# docker启动pm2守护nuxt.js
$ pm2-runtime start nuxt --name nuxt-demo -- start -i 0
 # or
$ pm2-docker start nuxt --name nuxt-demo -- start -i 0
~~~
[pm2命令中文备注](https://github.com/lirong098/record/blob/master/PM2.md)

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

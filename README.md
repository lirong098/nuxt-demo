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

### 如何在脚手架创建的新项目里添加api模块统一管理？
**1. nuxt.js有注入context和vue实例的概念plugin，context是服务端执行时的全局实例，vue实例是客户端执行时的实例，所以，可以将api的类分别注入context和vue**
> plugins/api.server.js:
~~~javascript
import * as apiServer from '@/api/api.server.js'
export default ({ app }, inject) => {
    inject('apiServer', apiServer) // 默认添加‘$’符
}
~~~
> nuxt.config.js:
~~~javascript
// 将api对象挂载在 context实例上（ *.server 或者 mode：server 代表服务端使用）
// 客服端代码引入rem.js（*.client 或者 mode：client 代表客户端使用）
export default {
    plugins: [
        { src: '~plugins/api.server.js' },
        { src: '~plugins/rem.js', mode: 'client' }
    ]
}
~~~
> pages/report_app.vue
~~~javascript
export default {
   async asyncData (context) {
       const { payDetail } = context.app.$apiServer
       const res = await payDetail({
            classId: 12233
        })
   }
}
~~~
[了解更多nuxt.js-plugins（插件）](https://www.nuxtjs.cn/guide/plugins)

**2. 引入api文件**
> pages/report_app.vue
~~~javascript
import { payDetail } from '@/api/api.server.js'
export default {
   async asyncData (context) {
       const res = await payDetail({
            classId: 12233
        })
   }
}
~~~
### 如何设置全局css、js？
> nuxt.config.js:
~~~javascript
export default {
    /*
    ** Global CSS
    */
    css: [
        // 项目里要使用的 全局CSS 文件
        '~assets/css/common_flex.css'
    ],
    plugins: [
        { src: '~plugins/rem.js', mode: 'client' }
    ]
}
~~~
### 如何设置全局less变量？
> package.json
~~~json
"dependencies": {
    "@nuxtjs/style-resources": "^1.0.0"
}
~~~
> nuxt.config.js:
~~~javascript
export default {
    // 全局注册less变量的文件
    styleResources: {
        less: './assets/css/common_less.less'
    }
}
~~~
### 如何设置assets目录下，小文件编译成base64？
> nuxt.config.js:
~~~javascript
export default {
    build: {
        loaders: {
            imgUrl: { limit: 10000 }
        }
    }
}
~~~
有人会疑惑为什么是imgUrl不是url-loader呢？
可以查看nuxt.js的[webpack源码其中base.js](https://github.com/nuxt/nuxt.js/tree/dev/packages/webpack/src/config)能看以下代码
~~~javascript
{
    test: /\.(png|jpe?g|gif|svg|webp)$/i,
    use: [{
        loader: 'url-loader',
        options: Object.assign(
            this.loaders.imgUrl, // 就是这里
            { name: this.getFileName('img') }
        )
    }]
}
~~~
### 新创建的项目部署到阿里云为什么不能访问，在服务器ping curl localhost:3000 也有返回值？
配置server.host为 '0.0.0.0'即可。因为，nuxt.js host默认值是 ‘localhost’，node.js有经验的人一看就明白，不明白的可以详情了解以下，这里简单说明，不详解以免误人子弟。
localhost 只是 127.0.0.1 的别名，指本地地址。
0.0.0.0 指任意IPv4地址，都可以访问，所以，使用公有地址和内部地址都可以访问3000端口
> nuxt.config.js:
~~~javascript
export default {
    server: {
        host: '0.0.0.0', // default: localhost
    }
}
~~~
## Tips
* 项目中引用资源时，使用~报错，就用@/试一试。
For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

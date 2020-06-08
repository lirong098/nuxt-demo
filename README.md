# y

> test

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
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

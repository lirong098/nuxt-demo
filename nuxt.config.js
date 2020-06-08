
export default {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    server: {
        host: '0.0.0.0', // default: localhost,
        timing: {
            total: true
        }
    },
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
    },
    // 设置全局变量
    env: {
        dev: process.env.NODE_ENV !== 'production' 
    },

    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },
    /*
    ** Global CSS
    */
    css: [
        // 项目里要使用的 全局CSS 文件
        '~assets/css/common_flex.css'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        { src: '~plugins/api.server.js' }, // 将api对象挂载在 context实例上（ *.server 或者 mode：server 代表服务端使用）
        { src: '~plugins/rem.js', mode: 'client' } // 客服端代码引入rem.js（*.client 或者 mode：client 代表客户端使用）
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/style-resources' // 全局注册less、sass变量时安装
    ],
    styleResources: {
        less: './assets/css/common_less.less' // 全局注册less、sass变量的文件
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        // 开启打包分析
        analyze: true,
        assetFilter: function (assetFilename) { // 打包分析
            return assetFilename.endsWith('.js');
        },
        extractCSS: true,
        loaders: {
            less: {},
            imgUrl: { limit: 10000 }, // assets文件下，小于等于10kb的文件转成base64
        },
        extend(config, ctx) {
        }
    }
}

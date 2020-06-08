
export default {
    mode: 'universal',
    /*
    ** Headers of the page
    */
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
        // 项目里要使用的 SCSS 文件
        '~assets/css/common_flex.css'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        { src: '~plugins/api.server.js'},
        { src: '~plugins/rem.js', mode: 'client' }
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
        '@nuxtjs/style-resources'
    ],
    styleResources: {
        less: './assets/css/common_less.less'
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
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.js');
        },
        extractCSS: true,
        loaders: {
            less: {},
            imgUrl: { limit: 10000 },
        },
        extend(config, ctx) {
        }
    }
}

import ENV_CONFIG from './env.config.js.js.js'
const ENV = process.env.dev ? ENV_CONFIG.DEV : ENV_CONFIG.PROD
export default {
    ...ENV
}
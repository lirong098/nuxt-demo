
import * as apiServer from '@/api/api.server.js'
/*
 * api请求封装
 * type -请求方式(post/get)
 * url -请求地址
 * params -传递参数
 */
export default ({ app }, inject) => {
    inject('apiServer', apiServer)
}
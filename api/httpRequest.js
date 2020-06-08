
import axios from './axiosConfig'
/*
 * api请求封装
 * type -请求方式(post/get)
 * url -请求地址
 * params -传递参数
 */
export default function httpRequest(type, url, params) {
    // const axios = fun()
    type = type.toLowerCase()
    const options = {
        method: type,
        url
    }
    if (type === 'post') {
        options.headers = {
            'content-type': 'application/json',
            timeZone: '+8',
            srcType: 0,
            role: 0,
            uid: 401509
        }
        options.data = params
    }
    return axios(options)
}
import httpRequest from './httpRequest'
/*
 * api请求封装
 * type -请求方式(post/get)
 * url -请求地址
 * params -传递参数
 */
export const payDetail = (params) => {
    return httpRequest('post', 'training-report/v1/record/pay-detail', params)
}
export const payDetail1 = (params) => httpRequest('post', 'training-report/v1/record/pay-detail', params)
import httpRequest from '@/api/httpRequest.js'
import { reportData } from '@/api/mock.js'
/*
 * api请求封装
 * type -请求方式(post/get)
 * url -请求地址
 * params -传递参数
 */
export const payDetail = (params) => {
    // mock数据
    // return httpRequest('post', 'training-report/v1/record/pay-detail', params)
    return Promise.resolve(reportData)
}
export const payDetail1 = (params) => httpRequest('post', 'training-report/v1', params)
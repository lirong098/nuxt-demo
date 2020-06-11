import axios from 'axios'
// import config from './app-config'
/*
 * axios配置
 * baseURL -请求api地址
 * headers -头文件设置
 * timeout -超时时间
 */
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = 'https://api.com/'
//POST传参序列化
axios.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})

//code状态码200判断
axios.interceptors.response.use((res) => {
    if (res.data.code !== 200) {
        return Promise.reject(res)
    }
    return res
}, (error) => {
    // 判断网络超时
    if (error.code == 'ECONNABORTED' && error.message.includes('timeout')) {
        error = {
            data: {
                code: 'netTimeOut',
                msg: ' 网络超时，请刷新重试。'
            }
        }
        return Promise.reject(error)
    }
    return Promise.reject(error)
})
export default axios

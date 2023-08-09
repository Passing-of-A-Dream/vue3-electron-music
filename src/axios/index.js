// axios配置
import axios from 'axios'

// 创建axios实例
const request = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
    onUploadProgress: progressEvent => {
        
    },
    onDownloadProgress: progressEvent => {
        
    }
})

// 请求拦截器
request.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        return config
    }
)

// 响应拦截器
request.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        return response.data
    }
)

export default request
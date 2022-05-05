// ajax.js
import conf from './conf'
// import {
//   useAppStore
// } from '../store'

import {
  renderEmoji
} from './util'

// 引入 uni-ajax 模块
import ajax from 'uni-ajax'

// const userStore = useAppStore()

// 创建请求实例
const instance = ajax.create({
  // 初始配置
  baseURL: conf?.serviceAddress
})


// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求前做些什么
    let bxAuthTicket = uni.getStorageSync("bx_auth_ticket")

    // if (userStore?.token) {
    //   bxAuthTicket = userStore.token
    // }
    
    bxAuthTicket && (request.header["bx_auth_ticket"] = bxAuthTicket)

    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应数据做些什么
    if (response?.data?.state === 'SUCCESS' && Array.isArray(response?.data?.data)) {
      try {
        let str = JSON.stringify(response.data.data);
        str = renderEmoji(str)
        response.data.data = JSON.parse(str)
      } catch (e) {
        //TODO handle the exception
        console.log('xhr-error', e)
      }
    }
    return response
  },
  error => {
    // 对响应错误做些什么
    return Promise.reject(error)
  }
)

// 导出 create 创建后的实例
export default instance

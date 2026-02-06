import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import { showNotify } from 'vant'
import Cookies from 'js-cookie'
import { showToast } from 'vant';
import { useRouter } from 'vue-router'
const router = useRouter();
// create an axios instance
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
  // headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  // transformRequest: [ (data: any) => qs.stringify({ reqData: JSON.stringify(data) }) ]
})

// saas 嵌入，传入标识
// jd.com 域名，并且传入embed参数

// request interceptor
service.interceptors.request.use(
  (config) => {
    config.headers['Sid'] = Cookies.get('small-cookie')
    config.headers['Platform'] = 1
    return config
  },
  (error) => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response: AxiosResponse) => {
    const res = response.data
    // console.log(res)
    // if the custom code is not 200, it is judged as an error.
    if ( res.code !== 200) {
      // const res = response.data

      // // 避免没有登录重复登录报异常接口
      // if (res.code !== 900) {

      // }

      // // 900: 未登录;
      if (res.code === 401) {
        // 重新登录
         showToast(res.msg);
         router.push({ path: '/login', query: {} })
      }

      return Promise.reject(new Error(`${res.code}-${res.msg || res.message}` || 'Error'))
    } else {

      return res
    }
  },
  (error) => {
    showNotify({ type: 'danger', message: error.msg || error.message || '接口异常' })
    return Promise.reject(error)
  }
)

export default service


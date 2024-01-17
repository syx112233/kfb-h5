import { axios } from 'taro-axios'
import Taro from '@tarojs/taro'
 
// 公共提示
const shwoErrorToast = (msg: any) => {
    Taro.showToast({
        title: msg,
        icon: 'none'
    })
}
 
// 请求根路径
const request = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'api/' : 'http://47.106.188.14',
})
 
// 请求拦截器
request.interceptors.request.use(
    (config) => {
        Taro.showLoading({
            title: '加载中',
            mask:true //使用蒙层
        })
        let token = Taro.getStorageSync('token')
        if (typeof token == undefined) {
            token = '';
        }
        config.headers = {
            'Content-Type': 'application/json;charset=utf-8',
            token:token,
        }
        if(config.data.params){
            let paramsUrl = ''
            for (let var1 in config.data.params) {
                paramsUrl += ((paramsUrl===''?"?":"&") + `${var1}` + '=' + `${config.data.params[var1]}`)
            }
            config.url += paramsUrl
        }
        return config;
    }, (error) => {
        return Promise.reject(error)
    }
)
 
// 响应拦截器
request.interceptors.response.use(
    (response: any) => {
        Taro.hideLoading()
        if (response.data.code !== 0) {
            switch (response.data.code) {
                case 400:
                    shwoErrorToast(response.data.msg || '非法请求')
                    break
                case 401:
                    shwoErrorToast('登录过期')// 可以尝试无感登陆或者跳转到登陆页
                    Taro.redirectTo({
                        url: '/pages/login/index'
                    })
                    break
                case 403:
                    shwoErrorToast(response.data.msg || '非法请求')
                    break
                case 404:
                    shwoErrorToast(response.data.msg || '非法请求')
                    break
                case 500:
                case 502:
                    shwoErrorToast(response.data.msg || '服务器开小差啦')
                    break
                default:
                    shwoErrorToast(response.data.msg || response.data.statusText)
            }
            return response
        } else {
            return response;
        }
    }, (error) => {
        if (error.response) {
            Taro.hideLoading()
            let res = error.response.data
            switch (res.code) {
                case 400:
                    shwoErrorToast(res.message || '非法请求')
                    break
                case 401:
                    shwoErrorToast('登录过期')// 可以尝试无感登陆或者跳转到登陆页
                    break
                case 403:
                    shwoErrorToast(res.message || '非法请求')
                    break
                case 404:
                    shwoErrorToast(res.message || '非法请求')
                    break
                case 500:
                case 502:
                    shwoErrorToast(res.message || '服务器开小差啦')
                    break
                default:
                    shwoErrorToast(res.message || res.statusText)
            }
        } else {
            shwoErrorToast('请检查网络连接状态')
        }
        return Promise.reject(error)
    }
)
 
export default request
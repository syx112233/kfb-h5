import request from "@/utils/request";


// 账号密码登录
export const login = (data: any) => request({
    method: 'POST',
    url: 'card-api/app/newApp/loginByMobile1',
    data: {
        params: data
    }
})

// 验证码登录
export const loginBySms = (data: any) => request({
    method: 'POST',
    url: 'card-api/app/newApp/loginBySms',
    data: {
        params: data
    }
})

// 发送验证码
export const sendSmsCode = (data: any) => request({
    method: 'POST',
    url: 'card-api/app/newApp/smsCode',
    data: {
        params: data
    }
})

// 注册
export const registerPost = (data: any) => request({
    method: 'POST',
    url: 'card-api/app/newApp/register',
    data: {
        params: data
    }
})

 /**
  * 获取我的信息
  */
export const getUserInfo = () => request({
    method: 'GET',
    url: 'card-api/app/creditcard/myInfo',
    data: {}
})

/**
 * 获取首页数据
 */
export const getHomeDataFunc = (data: any) => request({
    method: 'POST',
    url: '/card-api/app/newApp/homePage',
    data: {
        params: data
    }
})


/**
 * 获取收益明细
 */
export const queryEarnDetail = (data: any) => request({
    method: 'POST',
    url: '/card-api/app/newApp/myEarnings',
    data: {
        params: data
    }
})

/**
 * 获取我的团队列表
 */
export const queryTeamInfo = () => request({
    method: 'POST',
    url: '/card-api/app/newApp/myTeam',
    data: {
        params: {}
    }
})

/**
 * 获取我的团队统计
 */
export const queryTeamTotalInfo = () => request({
    method: 'POST',
    url: '/card-api/app/newApp/userCount',
    data: {
        params: {}
    }
})
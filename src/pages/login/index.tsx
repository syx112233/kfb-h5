import { View, Text, Input, Button } from "@tarojs/components"

import './index.less'
import { useRef, useState } from "react"
import Taro from "@tarojs/taro"
import { getUserInfo, login, loginBySms, sendSmsCode } from "@/api"

/**
 * 映射类型
 */
const typeEnum = {
    1: '密码',
    2: '验证码'
}

/**
 * 登录组件
 */
const Login = () => {
    // 登录类型 1 
    const [loginType, setLoginType] = useState(1)
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [smsCode, setSmsCode] = useState('')
    const timer = useRef<any>(null)
    const timeNumRef = useRef<number>(59)
    const [timeTxt, setTimeTxt] = useState('获取验证码')

    // 切换登录类型
    const changeText = () => {
        if (loginType === 1) {
            setLoginType(2)
        } else {
            setLoginType(1)
        }
    }

    // 设置输入密码和验证码
    const setInputVal = (e: any) => {
        if (loginType === 1) {
            setPassword(e.detail.value)
        } else {
            setSmsCode(e.detail.value)
        }
    }

    // 登录事件
    const loginEvent = () => {
        if(!phone){
            Taro.showToast({
                title: '手机号不能为空',
                icon: 'none'
            })
        }
        const params = {
            mobile: phone,
            smsCode: smsCode,
            password: password
        }
        if (loginType === 1) { // 账号密码登录
            login(params).then(res => {
                if (res.data.code === 0) {
                    Taro.setStorageSync('token', res.data.token)
                    getUserInfo().then(ret => {
                        if(ret.data.code === 0){
                            Taro.setStorageSync("userInfo", ret.data.data)
                            Taro.showToast({
                                title: '登录成功',
                                icon: 'none',
                                success() {
                                    Taro.redirectTo({ url: '/pages/index/index' })
                                }
                            })
                        }else{
                            Taro.showToast({
                                title: '获取个人信息失败',
                                icon: 'none'
                            })
                        }
                    }) 
                }else{
                    Taro.showToast({
                        title: '登录失败',
                        icon: 'none'
                    }) 
                }
            })
        } else { // 验证码登录
            loginBySms(params).then(res => {
                if (res.data.code === 0) {
                    Taro.setStorageSync('token', res.data.token)
                    getUserInfo().then(ret => {
                        if(ret.data.code === 0){
                            Taro.setStorageSync("userInfo", ret.data.data)
                            Taro.showToast({
                                title: '登录成功',
                                icon: 'none',
                                success() {
                                    Taro.redirectTo({ url: '/pages/index/index' })
                                }
                            })
                        }else{
                            Taro.showToast({
                                title: '获取个人信息失败',
                                icon: 'none'
                            })
                        }
                    }) 
                }else{
                    Taro.showToast({
                        title: '登录失败',
                        icon: 'none'
                    }) 
                }
            })
        }
    }

    // 获取验证码
    const getSmsCode = () => {
        if (timer.current) { // 有倒计时不走下面逻辑
            return
        }
        sendSmsCode({
            phone: phone
        }).then(res => {
            if(res.data.code ===0){
                Taro.showToast({
                    title: res.data.msg,
                    icon: 'none'
                });	
                startCountdown();
            }
        })
    }

    // 开始倒计时
    const startCountdown = () => {
        if(timer.current) return;
        timer.current = setInterval(() => {
            if(timeNumRef.current > 1){
                timeNumRef.current--
                setTimeTxt(`${timeNumRef.current}秒后重新获取`)
            }else{
                resetCountdown()
            }
        }, 1000)
    }

    // 重置倒计时
    const resetCountdown = () => {
        clearInterval(timer.current)
        timer.current = null
        timeNumRef.current = 59
        setTimeTxt('获取验证码')
    }

    return (
        <View className="login-container">
            <View className="header-top">
                <Text className="welcome-txt">欢迎</Text>
                <Text className="tips-txt">登录</Text>
            </View>
            <View className="logo"></View>
            <View className="login-form">
                <View className="form-item">
                    <Input className="phone-input" value={phone} type="number" placeholder="请输入手机号" maxlength={11} onInput={(e) => setPhone(e.detail.value)} />
                </View>
                <View className="form-item">
                    <Input className="password-input" password placeholder={`请输入${typeEnum[loginType]}`} onInput={setInputVal} />
                    {loginType === 2 && <Button className="code-btn" onClick={getSmsCode}>
                        {timeTxt}
                    </Button>}
                </View>
                <View className="button-change">
                    <Text onClick={changeText}>{typeEnum[loginType === 2 ? 1 : 2]}登录</Text>
                </View>
            </View>
            <Button type="primary" className="login-btn" onClick={loginEvent}>登录</Button>
            <Button className="register-btn" onClick={() => Taro.navigateTo({ url: '/pages/register/index' })}>注册账号</Button>
        </View>
    )
}

export default Login
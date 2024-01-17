import { View, Text, Input, Button } from "@tarojs/components"
import './index.less'
import Taro from "@tarojs/taro"
import { useState } from "react"
import { registerPost } from "@/api"

/**
 * 注册页面
 */
const Register = () => {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [referrer, setReferrer] = useState('')

    // 注册请求
    const registerFunc = () => {
        if (!phone) {
            Taro.showToast({
                title: '请填写手机号',
                icon: 'none'
            })
            return
        }
        if (!password) {
            Taro.showToast({
                title: '请填写密码',
                icon: 'none'
            })
            return
        }
        if (!referrer) {
            Taro.showToast({
                title: '请填写邀请码',
                icon: 'none'
            })
            return
        }
        const params = {
            mobile: phone,
            password,
            referrer
        }
        registerPost(params).then(res => {
            if (res.data.code === 0) {
                Taro.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    success() {
                        Taro.navigateTo({ url: '/pages/login/index' })
                    }
                })
            }
        })
    }

    return (
        <View className="register-container">
            <View className="header-top">
                <Text className="welcome-txt">欢迎</Text>
                <Text className="tips-txt">新用户注册</Text>
            </View>
            <View className="login-form">
                <View className="form-item">
                    <Input className="phone-input" type="number" placeholder="请输入手机号" maxlength={11} onInput={e => setPhone(e.detail.value)} />
                </View>
                <View className="form-item">
                    <Input className="password-input" type="number" placeholder="请输入密码" onInput={e => setPassword(e.detail.value)} />
                </View>
                <View className="form-item">
                    <Input className="introduce-input" type="number" placeholder="请输入邀请码" onInput={e => setReferrer(e.detail.value)} />
                </View>
            </View>
            <Button type="primary" className="login-btn" onClick={registerFunc}>注册</Button>
            <Button className="register-btn" onClick={() => Taro.navigateBack()}>已有账号</Button>
        </View>
    )
}

export default Register

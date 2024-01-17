import CommonHead from "@/components/CommonHead"
import { Button, ScrollView, Text, View } from "@tarojs/components"
import './index.less'
import Taro from "@tarojs/taro"


/**
 * 购买会员
 */
const MemberCenter = () => {

    // 购买开通会员
    const updateMember = () => {
        Taro.requestPayment({
            package: '',
            timeStamp: new Date().getTime().toString(),
            nonceStr: '',
            signType: 'RSA',
            paySign: ''
        })
    }
    return(
        <View className="member-container">
            <CommonHead title={'购买会员'}/>
            <ScrollView className="member-card-list">
                <View className="member-card">
                    <View className="left-detail">
                        <Text className="member-name">初级会员</Text>
                        <View className="member-sec-name">
                            <View className="lower-txt">super</View>
                            <View>VIP</View>
                        </View>
                        <Text className="member-amount">会员价:168</Text>
                        <Text className="member-tips">开通会员卡立享福利</Text>
                    </View>
                    <Button className="open-member-btn" onClick={updateMember}>立即开通</Button>
                </View>
            </ScrollView>
        </View>
    )
}   

export default MemberCenter
import CommonHead from "@/components/CommonHead"
import { Image, Text, View } from "@tarojs/components"
import teamIcon from '../../images/team_icon.png'
import rightIcon from '../../images/right-arrow.png'
import firstLevel from '../../images/cjhy.png'
import secLevel from '../../images/zjhy.png'
import './index.less'
import Taro from "@tarojs/taro"
import { queryTeamTotalInfo } from "@/api"
import { useEffect, useState } from "react"


/**
 * 我的团队
 */
const MyTeam = () => {
    // 普通会员
    const [defUser, setDefUser] = useState(0)
    // 中级会员
    const [intermediateUser, setIntermediateUser] = useState(0)
    // 高级会员
    const [seniorUser, setSeniorUser] = useState(0)

    const getTeamInfo = () => {
        queryTeamTotalInfo().then(res => {
            if(res.data.code === 0){
                setDefUser(res.data.defUser)
                setIntermediateUser(res.data.intermediateUser)
                setSeniorUser(res.data.seniorUser)
            }
        })
    }

    useEffect(() => {
        getTeamInfo()
    }, [])

    return (
        <View className="team-container">
            <CommonHead title={'我的团队'} />
            <View className="team-body">
                <View className="team-body-top" onClick={() => Taro.navigateTo({url: '/pages/team/teamList'})}>
                    <Image className="team-icon" src={teamIcon} />
                    <Text className="team-title">全部团队</Text>
                    <Text className="team-num">{defUser+intermediateUser+seniorUser}</Text>
                    <Image className="right-arrow" src={rightIcon} />
                </View>
                <View className="team-members">
                    <View className="left">
                        <View className="show-title">
                            <Text className="level-name">普通会员</Text>
                            <Text className="level-user-num">{defUser}</Text>
                        </View>
                        <Image className="level-icon" src={firstLevel} />
                    </View>
                    <View className="right">
                        <View className="sec-member sec">
                            <View className="show-title">
                                <Text className="level-name">中级会员</Text>
                                <Text className="level-user-num">{intermediateUser}</Text>
                            </View>
                            <Image className="level-icon" src={secLevel} />
                        </View>
                        <View className="sec-member third">
                            <View className="show-title">
                                <Text className="level-name">高级会员</Text>
                                <Text className="level-user-num">{seniorUser}</Text>
                            </View>
                            <Image className="level-icon" src={secLevel} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default MyTeam
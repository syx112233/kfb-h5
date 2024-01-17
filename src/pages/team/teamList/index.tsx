import CommonHead from "@/components/CommonHead"
import { ScrollView, Text, View } from "@tarojs/components"
import './index.less'
import { useEffect, useState } from "react"
import { queryTeamInfo } from "@/api"


/**
 * 团队列表
 */
const TeamList = () => {
    const [records, setRecords] = useState([])

    const getTeamInfo = () => {
        queryTeamInfo().then(res => {
            if(res.data.code === 0){
                setRecords(res.data.page.records)
            }
        })
    }

    useEffect(() => {
        getTeamInfo()
    }, [])
    
    return(
        <View className="team-list-container">
            <CommonHead title={'全部团队'}/>
            <View className="team-list-header">
                <Text className="head-item tl">会员名字</Text>
                <Text className="head-item">会员等级</Text>
                <Text className="head-item tr">会员电话</Text>
            </View>
            <ScrollView className="team-list-view">
                {records.map((item: any) => {
                    return(
                        <View  className="list-item" key={item.phone}>
                        <Text className="list-item-txt tl">{item.true_name}</Text>
                        <Text className="list-item-txt">{item.agentLevel}</Text>
                        <Text className="list-item-txt tr">{item.phone}</Text>
                    </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default TeamList
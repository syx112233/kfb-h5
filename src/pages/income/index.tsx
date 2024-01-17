import CommonHead from "@/components/CommonHead"
import { Image, Picker, ScrollView, Text, View } from "@tarojs/components"
import './index.less'
import dateIcon from '../../images/date-arrow.png'
import { AtButton } from "taro-ui"
import { useEffect, useState } from "react"
import { formatDateStr } from "@/utils/utils"
import NoneData from "@/components/NodeData"
import Taro, { useRouter } from "@tarojs/taro"
import { queryEarnDetail } from "@/api"


/**
 * 收益明细
 */
const InCome = () => {
    const routers = useRouter()
    const [state, setState] = useState({
        startDate: formatDateStr(new Date()),
        endDate: formatDateStr(new Date())
    })
    const [scrollH, setScrollH] = useState(0)
    const [earnBalance, setEarnBalance] = useState(0)
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [records, setRecords] = useState([])

    // 选择开始时间
    const changeStartDate = (e: { detail: { value: string } }) => {
        setState({
            ...state,
            startDate: e.detail.value
        })
    }

    // 选择结束时间
    const changeEndDate = (e: { detail: { value: string } }) => {
        setState({
            ...state,
            endDate: e.detail.value
        })
    }

    // 获取收益数据
    const getIncomeDetail = () => {
        queryEarnDetail({
            startDate: state.startDate,
            endDate: state.endDate,
            page: page,
            type: routers.params.type
        }).then(res => {
            if (res.data.code === 0) {
                setEarnBalance(res.data.balance)
                const pageData = res.data.page
                setRecords(pageData.records)
                setTotal(pageData.total)
            }
        })
    }

    useEffect(() => {
        setScrollH(Taro.getSystemInfoSync().windowHeight - 360)
        Taro.onWindowResize(() => {
            setScrollH(Taro.getSystemInfoSync().windowHeight - 360)
        })
    }, [])

    useEffect(() => {
        getIncomeDetail()
    }, [state.endDate, state.startDate, page, routers.params.type])

    return (
        <View className="income-container">
            <CommonHead title={'收益明细'} />
            <View className="income-body">
                <View className="dividend-details">
                    <Text className="title">分润明细</Text>
                    <View className="dividend-amount">
                        <Text className="amount">累计收益: ￥{earnBalance}</Text>
                        <AtButton className="go-cash">去提现</AtButton>
                    </View>
                </View>
                <View className="dividend-list">
                    <View className="date-picker-view">
                        <Picker mode="date" value={state.startDate} onChange={changeStartDate}>
                            <View className="start-date">
                                <Text>{state.startDate}</Text>
                                <Image className="date-icon" src={dateIcon} />
                            </View>
                        </Picker>
                        <View className="spector"></View>
                        <Picker mode="date" value={state.endDate} onChange={changeEndDate}>
                            <View className="end-date">
                                <Text>{state.endDate}</Text>
                                <Image className="date-icon" src={dateIcon} />
                            </View>
                        </Picker>
                    </View>
                    <View className="dividend-record">
                        {total === 0 && <NoneData />}
                        {total !== 0 && <View className="dividend-body">
                            <View className="header">
                                <Text className="header-item">时间</Text>
                                <Text className="header-item tr">收益</Text>
                            </View>
                            <ScrollView className="list-view" scrollY style={{ height: scrollH }}>
                                <View className="list-item">
                                    <Text className="list-item-txt">2024-01-02 09:00</Text>
                                    <Text className="list-item-txt tr">￥3.00</Text>
                                </View>
                            </ScrollView>
                        </View>}

                    </View>

                </View>
            </View>
        </View>
    )
}

export default InCome
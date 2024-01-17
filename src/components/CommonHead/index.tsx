import { Text, View, Image } from "@tarojs/components"
import BackIcon from '../../images/left_arrow.png'
import './index.less'
import Taro from "@tarojs/taro"

/**
 * 公共头部组件
 */
const CommonHead = ({title}) => {
    return(
        <View className="common-head">
            <View className="back-icon" onClick={() => Taro.navigateBack()}>
                <Image className="icon-img" src={BackIcon}/>
            </View>
            <Text className="head-title">{title}</Text>
        </View>
    )
}

export default CommonHead
import { View, Image, Text } from "@tarojs/components"
import noneImg from '../../images/none-data.png'
import './index.less'

/**
 * 空数据页面
 */
const NoneData = ({title}: {title?:string}) => {
    return(
        <View className="none-data">
            <Image className="none-image" src={noneImg}/>
            <Text className="none-txt">{title || '暂无记录'}</Text>
        </View>
    )
}

export default NoneData
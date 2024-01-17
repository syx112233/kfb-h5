import { View, Image, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import './index.less'
import Avator from '../../images/avator.png'
import "taro-ui/dist/style/components/tabs.scss";
import { AtTabs, AtTabsPane } from 'taro-ui'
import { useEffect, useState } from 'react';
import tgzq from '../../images/tgzq.png'
import memberCenter from '../../images/member_center.png'
import myTeam from '../../images/my_team.png'
import teamAmount from '../../images/team_amount.png'
import buyMember from '../../images/buy_member.png'
import memberAmount from '../../images/member_amount.png'
import { getHomeDataFunc } from '@/api';


// 权益列表
const qy_list = [
  {
    icon: tgzq,
    title: '推广赚钱'
  },
  {
    icon: memberCenter,
    title: '会员中心',
    // clickEvent: () => {
    //   Taro.navigateTo({
    //     url: '/pages/member/index'
    //   })
    // }
  },
  {
    icon: myTeam,
    title: '我的团队',
    clickEvent: () => {
      Taro.navigateTo({
        url: '/pages/team/index'
      })
    }
  },
  {
    icon: teamAmount,
    title: '团队收益',
    clickEvent: () => {
      Taro.navigateTo({
        url: '/pages/income/index?type=2'
      })
    }
  },
  {
    icon: buyMember,
    title: '购买会员',
    clickEvent: () => {
      Taro.navigateTo({
        url: '/pages/member/index'
      })
    }
  },
  {
    icon: memberAmount,
    title: '会员收益',
    clickEvent: () => {
      Taro.navigateTo({
        url: '/pages/income/index?type=1'
      })
    }
  }
]

export default function Index() {
  const [state, setState] = useState({
    current: 0,
  })
  const [userInfo, setUserInfo] = useState<any>({})
  const [categoryList, setCategoryList] = useState([{ // 显示的分类枚举
    type: 'sumAmount',
    name: '收款金额',
    num: '0.00'
  },
  {
    type: 'sumFrAmount',
    name: '收益金额',
    num: '0.00'
  },
  {
    type: 'countNum',
    name: '交易笔数',
    num: 0
  },
  {
    type: 'countUser',
    name: '注册用户',
    num: 0
  }])
  const tabList = [
    { title: '今日' },
    { title: '昨日' },
    { title: '本月' },
    { title: '上月' }
  ]

  // 切换标签
  const changeCurrent = (value) => {
    setState({
      current: value
    })
  }

  // 获取首页数据
  const getHomeData = () => {
    getHomeDataFunc({
      map: 'map',
      type: state.current + 1
    }).then(res => {
      if (res.data.code === 0) {
        const newCate = categoryList.map(idx => {
          return {
            ...idx,
            num: res.data[idx.type]
          }
        })
        setCategoryList(newCate)
      }
    })
  }

  useEffect(() => {
    getHomeData()
  }, [state.current])

  const getUrlParam = (name) => {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
  }

  // 获取用户openid
  const getUserOpenId = () => {
    let ua = navigator.userAgent.toLowerCase();
    if (/micromessenger/.test(ua)) {
        if (!localStorage.getItem('wxOpenid')) {
            const code = getUrlParam('code'); // 截取路径中的code,
            if (code == null || code === '' || !code) {
                const local = location.href;
                let appid = 'wx75ba0256c556b665';
                window.location.href =
                    'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
                    appid +
                    '&redirect_uri=' +
                    encodeURIComponent(local) +
                    '&response_type=code&scope=snsapi_base&state=1#wechat_redirect';
            } else {
                this.$axios.post('/index/index/getWxOpenid?code=' + code).then(res => {
                    const openid = res.data.data.openid;
                    if (openid) {
                        localStorage.setItem('wxOpenid', openid);
                    } else {
                        location.href = '/';
                    }
                });
            }
        }
    }
  }

  useEffect(() => {
    const userInfoMsg = Taro.getStorageSync('userInfo')
    setUserInfo(userInfoMsg)
    getUserOpenId()
  }, [])

  return (
    <View className='home-container'>
      <View className='water-mask'></View>
      <View className='userInfo-header'>
        <View className='avator'>
          <Image src={userInfo?.pictureUrl || Avator} />
        </View>
        <View className='right-detail'>
          <Text className="tips-txt">尊敬的{userInfo?.trueName}，您好！</Text>
          <View className='show-member'>
            <Text className='tips-txt'>欢迎回来</Text>
            <View className='member-icon'>{userInfo?.lvlName}</View>
          </View>
        </View>
      </View>
      <View className='operation-container'>
        <AtTabs tabDirection='horizontal' tabList={tabList} current={state.current} onClick={changeCurrent}>
          {tabList.map((idx, index) => {
            return (
              <AtTabsPane key={idx.title} current={state.current} index={index}>
                <View className='type-container'>
                  {categoryList.map(item => (
                    <View className='type-item' key={item.type}>
                      <Text className='type-name'>{item.name}</Text>
                      <Text className='type-num'>{item.num}</Text>
                    </View>
                  ))}
                </View>
              </AtTabsPane>
            )
          })}
        </AtTabs>
      </View>
      <View className='equity-container'>
        {qy_list.map((item, index) => (
          <View className='qy_item' key={index} onClick={item.clickEvent}>
            <Image className='qy_icon' src={item.icon} />
            <Text className='qy_name'>{item.title}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

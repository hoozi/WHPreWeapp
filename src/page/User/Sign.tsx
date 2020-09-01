import * as React from 'react';
import { TabItem } from 'taro-ui/types/tabs';
import { View, Text } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui';
import SignIn from './components/SignIn';
import classNames from './style/index.module.scss';

const tabList:TabItem[] = [
  {
    title: '登录'
  },
  {
    title: '注册'
  }
]

const Sign:React.FC<any> & {[key: string]:any} = props => {
  const [current, setCurrent] = React.useState<number>(0);
  const handleCurrentChange = React.useCallback((v) => {
    if(current !== v) {
      setCurrent(v);
    }
  }, [current, setCurrent]);
  return (
    <View className={classNames.signContainer}>
      <View className={classNames.signCard}>
        <View className={classNames.circleBg}/>
        <Text className={classNames.signTitle}>你好,欢迎回来</Text>
      </View>
      <AtTabs 
        className={classNames.signTab} 
        current={current} 
        tabList={tabList}
        animated={false}
        onClick={handleCurrentChange}
      >
        <AtTabsPane current={0} index={0}>
          <SignIn/>
        </AtTabsPane>
        <AtTabsPane current={1} index={1}>
          <View>注册</View>
        </AtTabsPane>
      </AtTabs>
    </View>
  )
}

export default Sign;

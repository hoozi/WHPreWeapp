import * as React from 'react';
import * as Taro from '@tarojs/taro';
import { View, Text, OpenData } from '@tarojs/components';
import { AtAvatar, AtGrid } from 'taro-ui';
import menus from './map';
import classNames from './style/index.module.scss';
import { removeToken } from '../../shared/token';

const { height, top } = Taro.getMenuButtonBoundingClientRect();
export default () => {
  return (
    <View className={classNames.container}>
      <View className={classNames.userCard} style={`padding-top: calc(${top}px + ${height}px)`}>
        <View className={classNames.circleBg}/>
        <View className={`${classNames.circleBg} ${classNames.circleBg1}`}/>
        <View className={`${classNames.circleBg} ${classNames.circleBg2}`}/>
        <View className={`${classNames.circleBg} ${classNames.circleBg3}`}/>
        <View className={classNames.userContent}>
          <AtAvatar circle openData={{type: 'userAvatarUrl'}}/>
          <View className={classNames.userCardText}>
            <OpenData type='userNickName'/>
            <Text className={classNames.extraText}>司机</Text>
          </View>
        </View>
        <View className='at-icon at-icon-settings' 
          style='position: relative; color:#fff; z-index: 11;' 
          onClick={async () => {
            const contralList: any[] = [
              () => {
                Taro.navigateTo({
                  url: '/page/User/UpdatePassword'
                });
              },
              () => {
                removeToken();
                Taro.removeStorageSync('uid');
                Taro.removeStorageSync('uname');
                Taro.redirectTo({
                  url: '/page/User/Sign'
                });
              }
            ]
            try {
              const res = await Taro.showActionSheet({
                itemList: ['修改密码','退出登录']
              });
              contralList[res.tapIndex]();
            } catch(e) {}
          }}
        />
      </View>
      
      <View className={classNames.menuList}>
        <View className={classNames.menuBody}>
          <AtGrid
            onClick={m => Taro.navigateTo({
              url: m.url
            })}
            data={menus}
          />
        </View>
      </View>
    </View>
  )
}
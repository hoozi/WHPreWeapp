import * as React from 'react';
import * as Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import { AtButtonProps } from 'taro-ui/types/button';
import { color } from '../../constants';
import classNames from './style/index.module.scss';

interface ButtonProps extends AtButtonProps {
  text: string;
}

interface GrabCardProps {
  data: any;
  button?:ButtonProps
}

interface StatusMap {
  [key: string]: string
}

const statusMap:StatusMap = {
  'rob_1': '信息反馈'
}

const GrabCard:React.FC<GrabCardProps> = ({
  data,
  button
}) => {
  return (
    <View className={classNames.grabCard}>
      <View className={classNames.grabTopBar} onClick={() => data.orderStatus !== 'loot' ? Taro.navigateTo({
        url: `/page/Detail/index?id=${data.id}`
      }) : null}>
        <View>
          <Text className='icon icon-jiezhi' style='font-size: 14px'/>
          <Text> {data.tkValidity}</Text>
        </View>
        {
          data.orderStatus !== 'loot' &&
          <View>
            <Text>{statusMap[`${data.orderStatus}_${data.tkOverFlag}`] || '查看详情'}</Text>
            <Text className='icon icon-xiayiyeqianjinchakangengduo' style='font-size:14px'/>
          </View>
        }
      </View>
      <View className={classNames.grabCardHeader}>
        <View className={classNames.grabCardHeaderContent}>
          <Text>{data.barCode || '暂无预提码'}</Text>
          <Text>{data.ctnOperatorCode}/{data.ctnSizeType}</Text>
        </View>
        <Text className={classNames.grabPrice}>{data.feePay}元</Text>
      </View>
      <View className={classNames.grabCardBody}>
        <View className={classNames.grabContent}>

          <View className={classNames.address}>
            <View className={classNames.addressItem}>
              <View className={classNames.tail}/>
              <View className={classNames.dot} style={{borderColor: color.brandColor}}/>
              <View className={classNames.addressContent}>{data.tkAddress}</View>
            </View>
            <View className={classNames.addressItem}>
              <View className={classNames.tail}/>
              <View className={classNames.dot} style={{borderColor: color.successColor}}/>
              <View className={classNames.addressContent}>{data.inYardName || ''}</View>
            </View>
          </View>

        </View>
        {
          !!button &&
          <View className={classNames.grabButtonContainer}>
            {
              <AtButton {...button}>{button?.text}</AtButton>
            }
          </View>
        }
      </View>
      {
        data.tkRemark &&
        <View style='padding:0 8px 8px'>
          <View className='alert-warning'>
            <Text className='icon icon-beizhu'/>
            <Text>{data.tkRemark}</Text>
          </View>
        </View>
      }
      <View className={classNames.grabCardFooter}>
        <View className={classNames.grabField}>
          <Text className='icon icon-danju1'/>
          <View className={classNames.grabFieldValue}>{data.blNo}</View>
        </View>
        <View className={classNames.grabField}>
          <Text className='icon icon-chuan'/>
          <View className={classNames.grabFieldValue}>{data.vesselNameE}/{data.vesselVoyage}</View>
        </View>
      </View>
    </View>
  )
}

export default GrabCard;
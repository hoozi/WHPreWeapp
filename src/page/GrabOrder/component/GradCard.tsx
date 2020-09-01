import * as React from 'react';
import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import { color } from '../../../constants';
import classNames from '../style/index.module.scss';

interface GrabCardProps {
  data: any;
  onGrab(id:number):void;
}

const GrabCard:React.FC<GrabCardProps> = ({
  data,
  onGrab
}) => {
  return (
    <View className={classNames.grabCard}>
      <View className={classNames.grabTopBar}>
        <Text className='icon icon-jiezhi' style='font-size: 12px'/>
        <Text> {data.tkValidity} 截止</Text>
      </View>
      <View className={classNames.grabCardHeader}>
        <View className={classNames.grabCardHeaderContent}>
          <Text>{data.blNo}</Text>
          <Text>{data.ctnOperatorCode}</Text>
          <Text>{data.ctnSizeType}</Text>
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
        <View className={classNames.grabButtonContainer}>
          <AtButton 
            type='primary' 
            className={classNames.grabButton}
            onClick={() => onGrab(data.id)}
          >抢单</AtButton>
        </View>
      </View>
    </View>
  )
}

export default GrabCard;
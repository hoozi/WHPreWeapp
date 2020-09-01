import * as React from 'react';
import * as Taro from '@tarojs/taro';
import { useDispatch, useSelector } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { View } from '@tarojs/components';
import { RootState } from '../../store';
import SearchBar from '../../component/SearchBar'
import classNames from './style/index.module.scss';
import GrabCard from './component/GradCard';

const GrabOrder:React.FC<any> = () => {
  const { grab } = useDispatch<RematchDispatch<Models>>();
  const { records } = useSelector((state:RootState) => state.grab)
  Taro.useDidShow(() => {
    grab.fetchGrab({});
  });
  const handleSearchGrab = React.useCallback((blNo:string) => {
    grab.fetchGrab({blNo});
  }, [grab]);
  const handleGrab = React.useCallback((id) => {
    grab.putGrab({
      id,
      operationType: 'rob'
    })
  }, [grab]);
  return (
    <View style='margin-top: 50px'>
      <SearchBar placeholder='搜索提单号' fixed onSearch={handleSearchGrab}/>
      <View className={classNames.cardContainer}>
        {
          records.map(item => (
            <GrabCard
              data={item}
              onGrab={handleGrab}
            />
          ))
        }
      </View>
    </View>
  )
}

export default GrabOrder;
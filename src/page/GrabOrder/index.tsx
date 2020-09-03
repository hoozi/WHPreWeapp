import * as React from 'react';
import * as Taro from '@tarojs/taro';
import { useDispatch, useSelector } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { View } from '@tarojs/components';
import TopBarPage from '../../layout/TopBarPage';
import { RootState } from '../../store';
import GrabCard from '../../component/GradCard';
import Empty from '../../component/Empty';

const GrabOrder:React.FC<any> = () => {
  const { grab } = useDispatch<RematchDispatch<Models>>();
  const { records } = useSelector((state:RootState) => state.grab);
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
    <TopBarPage
      placeholder='搜索提单号' 
      fixed 
      dark
      onSearch={handleSearchGrab}
    >
      {
        records.length ? 
        <View className='cardContainer'>
          {
            records.map(item => (
              <GrabCard
                key={item.id}
                data={item}
                button={
                  {
                    onClick: () => handleGrab(item.id),
                    className: 'grab-button',
                    type: 'primary',
                    text: '抢 单'
                  }
                }
              />
            ))
          }
        </View> : <Empty/>
      }
      
    </TopBarPage>
  )
}

export default GrabOrder;
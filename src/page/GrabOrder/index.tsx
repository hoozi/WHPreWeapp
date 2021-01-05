import * as React from 'react';
import * as Taro from '@tarojs/taro';
import { useDispatch, useSelector } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { View } from '@tarojs/components';
import TopBarPage from '../../layout/TopBarPage';
import useList from '../../hook/useList';
import { RootState } from '../../store';
import GrabCard from '../../component/GradCard';
import Empty from '../../component/Empty';

const GrabOrder:React.FC<any> = () => {
  const { grab } = useDispatch<RematchDispatch<Models>>();
  const { pages } = useSelector((state:RootState) => state.grab);
  const [ list, createList, setParams ] = useList({
    getList: grab.fetchGrab,
    pages,
    initParams: {
      barCode: ''
    }
  });
  const handleGrab = React.useCallback((id) => {
    grab.putGrab({
      id,
      operationType: 'rob',
      callback() {
        Taro.navigateTo({
          url: '/page/History/index'
        });
      }
    })
  }, [grab]);
  const handleSearchGrab = React.useCallback((barCode:string) => {
    setParams({
      barCode
    });
    createList('init');
  }, [createList]);
  return (
    <TopBarPage
      placeholder='搜索预提号' 
      fixed 
      dark
      onSearch={handleSearchGrab}
    >
      {
        list.length ? 
        <View className='cardContainer'>
          {
            list.map(item => (
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
import * as React from 'react';
import { View } from '@tarojs/components';
import { useDispatch, useSelector } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import TopBarPage from '../../layout/TopBarPage';
import { RootState } from '../../store';
import useList from '../../hook/useList';
import GrabCard from '../../component/GradCard';
import Empty from '../../component/Empty';

const indexs:number[] = [1, 0];

const History:React.FC<any> = props => {
  const { grab } = useDispatch<RematchDispatch<Models>>();
  const { pages } = useSelector((state:RootState) => state.grab);
  const [tabActive, setTabActive] = React.useState<number>(0);
  const [ list, createList, setParams ] = useList({
    getList: grab.fetchHistory,
    pages,
    initParams: {
      tkOverFlag: indexs[tabActive]
    }
  });
  const handleGrabCancel = React.useCallback(id => {
    grab.putGrab({
      id,
      operationType: 'rob_cancel',
      callback() {
        createList('init');
      }
    });
  },[]);
  const handleTabChange = React.useCallback(index => {
    if(index !== tabActive) {
      setTabActive(index);
      setParams({
        tkOverFlag: indexs[index],
        current: 1
      });
      createList('init');
    }
  }, [tabActive,setTabActive]);
  return (
    <TopBarPage
      tabList={[
        {
          title: '进行中'
        },
        {
          title: '历史'
        }
      ]}
      dark
      tabCurrent={tabActive}
      onTabChange={handleTabChange}
      fixed 
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
                  item.tkOverFlag === 1 ? {
                    onClick: () => handleGrabCancel(item.id),
                    className: 'grab-button grab-button-warning',
                    type: 'primary',
                    text: '取 消'
                  } : undefined
                }
              />
            ))
          }
        </View> : <Empty/>
      }
    </TopBarPage>
  )
}

export default History;
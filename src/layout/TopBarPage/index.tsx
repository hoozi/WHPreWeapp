import * as React from 'react';
import { View, Text } from '@tarojs/components';
import { TabItem } from 'taro-ui/types/tabs';
import classnames from 'classnames';
import SearchBar from '../../component/SearchBar';
import classNames from './style/index.module.scss';
import { color } from '../../constants';
import { AtTabs } from 'taro-ui';

interface PageHeaderProps {
  fixed?:boolean;
  hasSearch?:boolean;
  tabList?: TabItem[];
  placeholder?: string;
  onSearch?(v:string):void;
  onTabChange?(index:number):void;
  tabCurrent?:number;
  dark?:boolean;
}

const computedMargin = (tabList:any, onSearch:any):number => {
  if(!!tabList && !!onSearch) {
    return 82;
  }
  if(!!tabList) {
    return 44;
  }
  if(!!onSearch) {
   return 50;
  }
  return 0;
}

const TopBarPage:React.FC<React.PropsWithChildren<PageHeaderProps>> = ({
  placeholder,
  tabList,
  onSearch,
  onTabChange,
  tabCurrent=0,
  fixed,
  dark,
  children
}) => {
  const topBarClassName = classnames(classNames.topBar, {
    [`${classNames.topBarFixed}`]: !!fixed
  });
  const paddingTop = React.useMemo(() => computedMargin(tabList, onSearch), [tabList, onSearch]);
  return (
    <View>
      <View className={topBarClassName} >
        {
          !!onSearch &&
          <SearchBar
            dark 
            placeholder={placeholder} 
            onSearch={v => onSearch && onSearch(v)}
            customStyle={{
              paddingBottom: !!tabList ? 0 : 12,
              backgroundColor: !!dark ? '#455fe4' : '#fff'
            }}
          />
        }
        {
          !!tabList &&
          <AtTabs
            className={`custom-tabs ${!!dark ? 'custom-tabs-dark' : ''}`}
            tabList={tabList}
            current={tabCurrent}
            animated={false}
            onClick={index => onTabChange && onTabChange(index)}
          />
        }
      </View>
      <View style={{
        paddingTop,
        height: '100vh',
        boxSizing: 'border-box'
      }}>
        { children }
      </View>
    </View>
  )
}

export default TopBarPage;
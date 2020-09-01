import * as React from 'react';
import { View, Input } from '@tarojs/components';
import classnames from 'classnames';
import classNames from './style/index.module.scss';

interface SearchBarProps {
  onSearch(v:string):void;
  placeholder?: string;
  fixed?:boolean;
}

const SearchBar:React.FC<SearchBarProps> = ({
  onSearch,
  placeholder='搜索',
  fixed=false
}) => {
  const searchBarClassName = classnames(classNames.searchBar, {
    [`${classNames.fixed}`]: !!fixed
  });
  return (
    <View className={searchBarClassName}>
      <View className={classNames.searchBarInner}>
        <View className='at-icon at-icon-search'/>
        <Input placeholder={placeholder} placeholderStyle='color:#999' className={classNames.searchBarInput} onConfirm={e => onSearch(e.detail.value)}/>
      </View>
    </View>
  )
}

export default SearchBar;
import * as React from 'react';
import * as Taro from '@tarojs/taro';
import { View, Text, Input, Image } from '@tarojs/components';
import { useDispatch, useSelector } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { AtButton } from 'taro-ui';
import { RootState } from '../../store';
import classNames from './style/index.module.scss';

interface Row {
  title: string;
  dataIndex: string;
  render?(data): string;
  hidden?(data): boolean;
}
interface FormItem {
  label: string;
  name: string;
  fileType: string;
}

const rows:Row[] = [
  {
    title: '提单号',
    dataIndex: 'blNo'
  },
  {
    title: '船名/航次',
    dataIndex: '-',
    render: data => `${data.vesselNameE}/${data.vesselVoyage}`
  },
  {
    title: '箱主',
    dataIndex: 'ctnOperatorCode'
  },
  {
    title: '箱号',
    dataIndex: 'ctnNo',
    hidden: data => data.orderStatus === 'rob' && data.tkOverFlag === 1
  },
  {
    title: '铅封',
    dataIndex: 'sealNo',
    hidden: data => data.orderStatus === 'rob' && data.tkOverFlag === 1
  },
  {
    title: '箱型尺寸',
    dataIndex: 'ctnSizeType'
  },
  {
    title: '提箱堆场',
    dataIndex: 'tkAddress'
  },
  {
    title: '还箱堆场',
    dataIndex: 'inYardName'
  },
  {
    title: '截止时间',
    dataIndex: 'tkValidity'
  }
];



const formItem:FormItem[] = [
  {
    label: '箱号',
    name: 'ctnNo',
    fileType: 'CTN_NO'
  },
  {
    label: '铅封',
    name: 'sealNo',
    fileType: 'SEAL'
  }
];

interface PageTitleMap {
  [key: string]: string
}

const pageTitleMap:PageTitleMap = {
  'rob_1': '信息反馈'
}

export default () => {
  const { grab, common } = useDispatch<RematchDispatch<Models>>();
  const { records } = useSelector((state:RootState) => state.grab);
  const [current, setCurrent] = React.useState<any>(null);
  const [postData, setPostData] = React.useState<any>({});
  const [locImages, setLocImages] = React.useState<any>({})
  const { params:{id} } = Taro.useRouter();
  Taro.setNavigationBarTitle({
    title:  current ? pageTitleMap[`${current.orderStatus}_${current.tkOverFlag}`] : '详细信息'
  });
  React.useEffect(() => {
    const current = records.filter(item => item.id === Number(id));
    setCurrent(current[0]);
  }, [setCurrent, records]);
  const handleChangeValue = React.useCallback((name:string, value:any) => {
    setPostData({
      ...postData,
      [name]: value
    });
  }, [setPostData,postData]);
  const handleChooseImage = React.useCallback(async (fileType:string) => {
    try {
      const res = await Taro.chooseImage({count: 1,sizeType:['compressed']});
      common.uploadFile({
        filePath: res.tempFilePaths[0],
        formData: {
          id,
          fileType
        },
        callback() {
          setLocImages({
            ...locImages,
            [fileType]: res.tempFilePaths[0]
          });
        }
      });
    } catch(e) {
      console.log(e)
    }
  }, [common, id, locImages, setLocImages]);
  const handleFeedback = React.useCallback(() => {
    grab.feedBackGrab({
      id,
      ...postData,
    })
  }, [grab, postData])
  return (
    <View className='cardContainer cardBtnContainer'>
      {
        current ? 
        <React.Fragment>
          <View className={classNames.detailCard}>
            {
              rows.map(item => {
                const hidden = item.hidden && item.hidden(current);
                return (
                  !hidden ?
                  <View className={classNames.detailItem}>
                    <Text className={classNames.detailName}>{item.title}</Text>
                    <View className={classNames.detailValue}>
                      <Text>
                        {
                          item.render ? item.render(current) :
                          ( current[item.dataIndex] || '暂无' )
                        }
                      </Text>
                    </View>
                  </View> : null
                )
              })
            }
          </View>
          {
            (current.orderStatus === 'rob' && current.tkOverFlag === 1) &&
            <View className={classNames.formList}>
            {
              formItem.map(item => (
                <View className={classNames.formItem}>
                  <View className={classNames.formItemContent}>
                    <Text className={classNames.formItemLabel}>{item.label}</Text>
                    <View className={classNames.formItemValue}>
                      <Input 
                        disabled={current.orderStatus === 'carry' && current.tkOverFlag === 0}
                        value={current[item.name]}
                        placeholder='请输入' 
                        placeholderStyle='color: #eee' 
                        className={classNames.formTextInput}
                        onInput={e => handleChangeValue(item.name, e.detail.value)}
                      />
                      <View className={classNames.formExtra} onClick={() => handleChooseImage(item.fileType)}>添加图片</View>
                    </View>
                  </View>
                  { 
                    locImages[item.fileType] ?
                    <View className={classNames.formItemImage}>
                      <Image className={classNames.imageRadius} src={locImages[item.fileType]} />
                    </View> :
                    null
                  }
                </View>
              ))
            }
          </View>
          }
        </React.Fragment> : null
      }
      {
        (current && current.orderStatus === 'rob' && current.tkOverFlag === 1) &&
        <View className='bottomButton'>
          <AtButton type='primary' className='grab-button' onClick={handleFeedback}>提 交</AtButton>
        </View>
      }
    </View>
  )
}
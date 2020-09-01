import * as Taro from '@tarojs/taro';
import { ModelEffects, ModelReducers, RematchDispatch, Models } from '@rematch/core';
import { RootState } from '../index';
import { queryGrab, putGrab } from '../../api/grab';

export type Grab = {
  records: any[];
  total: number;
  size: number;
  pages: number;
  current: number;
}

const state:Grab = {
  records: [],
  total: 0,
  size: 10,
  pages: 0,
  current: 1
}
const reducers:ModelReducers<Grab> = {
  save(state, payload) {
    return Object.assign({},state, payload);
  }
}
const effects = (dispatch:RematchDispatch<Models>):ModelEffects<RootState> => ({
  async fetchGrab(payload) {
    const { callback, ...restPayload } = payload;
    try {
      const response = await queryGrab<Grab>(restPayload);
      if(response) {
        this.save(response);
        callback && callback(response);
      }
    } catch(e) {
      
    }
  },
  async putGrab(payload) {
    try {
      const response = await putGrab<any>(payload);
      if(response.code === 0) {
        Taro.showToast({
          title: payload.operationType === 'rob' ? '抢单成功' : '取消成功',
          icon: 'success',
          mask: true,
          duration: 2000,
          success() {
            setTimeout(() => {
              dispatch.grab.fetchGrab({})
            }, 2000)
          }
        })
      }
    } catch(e) {
      
    }
  }
})

export default {
  state,
  reducers,
  effects
}
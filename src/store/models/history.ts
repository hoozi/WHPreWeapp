import { ModelEffects, ModelReducers, RematchDispatch, Models } from '@rematch/core';
import { RootState } from '../index';
import { queryHistory } from '../../api/history';

export type History = {
  records: any[];
  total: number;
  size: number;
  pages: number;
  current: number;
}

const state:History = {
  records: [],
  total: 0,
  size: 10,
  pages: 0,
  current: 1
}
const reducers:ModelReducers<History> = {
  save(state, payload) {
    return Object.assign({},state, payload);
  }
}
const effects = (dispatch:RematchDispatch<Models>):ModelEffects<RootState> => ({
  async fetchHistory(payload, rootState) {
    const { callback, ...restPayload } = payload;
    //const openId = rootState.common.openId || (await dispatch.common.fetchOpenId());
    try {
      const response = await queryHistory<History>({
        size: '10',
        tkDriverId: rootState.user.uid,
        ...restPayload
      });
      if(response) {
        this.save(response);
        callback && callback(response)
      }
    } catch(e) {}
  }
})

export default {
  state,
  reducers,
  effects
}
import * as Taro from '@tarojs/taro';
import { ModelEffects, ModelReducers } from '@rematch/core';
import { RootState } from '../index';
import { signIn } from '../../api/user';
import { setToken } from '../../shared/token';

export type User = {
  
}

export interface UserToken {
  access_token: string;
  refresh_token: string;
}

const state:User = {
  
}
const reducers:ModelReducers<User> = {
  save(state, payload) {
    return Object.assign({},state, payload);
  }
}
const effects:ModelEffects<RootState> = {
  async signIn(payload) {
    try {
      const response = await signIn<UserToken>(payload);
      if(response.access_token) {
        setToken(response.access_token);
        Taro.redirectTo({
          url: '/page/Home/index'
        });
      }
    } catch(e) {
      
    }
  }
}

export default {
  state,
  reducers,
  effects
}
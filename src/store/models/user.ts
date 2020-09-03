import * as Taro from '@tarojs/taro';
import { ModelEffects, ModelReducers } from '@rematch/core';
import { RootState } from '../index';
import { signIn, queryCurrentUser } from '../../api/user';
import { setToken } from '../../shared/token';

interface SysUser {
  avatar: string;
  createTime: string;
  delFlag:string;
  deptId: number;
  lockFlag: string;
  password: string;
  phone: string;
  qqOpenid: string;
  tenantId: number;
  updateTime: string;
  userId: number;
  username: string;
  wxOpenid: string
}

export type User = {
  permissions: string[];
  sysUser:Partial<SysUser>;
  roles: number[];
  uid: number
}

export interface UserToken {
  access_token: string;
  refresh_token: string;
  user_id: number;
}

const state:User = {
  permissions: [''],
  sysUser:{},
  roles: [],
  uid: -1
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
        this.save({
          uid: response.user_id
        })
        Taro.redirectTo({
          url: '/page/Home/index'
        });
      }
    } catch(e) {
      
    }
  },
  async fetchCurrentUser() {
    try {
      const response = await queryCurrentUser<User>();
      if(response) {
        //setToken(response.access_token);
        this.save(response)
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
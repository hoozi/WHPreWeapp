import * as Taro from '@tarojs/taro';
import { ModelEffects, ModelReducers } from '@rematch/core';
import { RootState } from '../index';
import { signIn, signUp, queryCurrentUser, updatePassword } from '../../api/user';
import { setToken, removeToken } from '../../shared/token';
import Password from 'src/page/User/components/Password';

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
  username: string;
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
        Taro.setStorageSync('uid', response.user_id);
        Taro.setStorageSync('uname', response.username);
        Taro.redirectTo({
          url: '/page/Home/index'
        });
      }
    } catch(e) {
      
    }
  },
  async updatePassword(payload) {
    try {
      const response = await updatePassword<any>({
        username: Taro.getStorageSync('uname'),
        ...payload
      });
      if(response.code === 0) {
        Taro.showToast({
          title: '修改成功',
          icon: 'success',
          mask: true,
          duration: 2000,
          success() {
            setTimeout(() => {
              removeToken();
              Taro.removeStorageSync('uid');
              Taro.removeStorageSync('uname');
              Taro.redirectTo({
                url: '/page/User/Sign'
              });
            }, 2000)
          }
        })
      }
    } catch(e) {
      
    }
  },
  async signUp(payload) {
    const { callback, ...restPayload } = payload;
    Taro.showLoading({
      title: '注册中...',
      mask: true
    });
    try {
      const response = await signUp(restPayload);
      const res = JSON.parse(response.data)
      if(res.code === 0) {
        Taro.showToast({
          title: restPayload.password ? '注册成功' : '注册成功,为您分配的密码为123456',
          icon: 'success',
          mask: true,
          duration: 2000,
          success() {
            setTimeout(() => {
              callback && callback();
            }, 2000)
          }
        })
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
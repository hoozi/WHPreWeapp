import request from '../shared/request';
import { stringify } from 'qs';

interface SignInParams {
  username: string;
  password: string;
}

export async function signIn<T>(data:SignInParams) {
  return request<T>({
    url: `/auth/oauth/token?grant_type=password&${stringify(data)}`,
    data,
    loadingText: '登录中...'
  })
}
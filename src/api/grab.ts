import request from '../shared/request';
import { stringify } from 'qs';

interface GrabParams {
  current: number
}

interface PutGrabParams {
  id: number;
  operationType: string;
}

export async function queryGrab<T>(data:GrabParams) {
  return request<T>({
    url: `/act/ctn-yard-info/driver-page?${stringify(data)}&size=10&orderStatus=loot`,
    method: 'GET',
    loadingText: '查询中...',
    onlyData: true
  })
}

export async function putGrab<T>(data:PutGrabParams) {
  return request<T>({
    url: `/act/ctn-yard-info/rob?${stringify(data)}`,
    method: 'PUT',
    loadingText: '抢单中...'
  })
}

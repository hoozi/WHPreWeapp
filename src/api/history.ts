import request from '../shared/request';
import { stringify } from 'qs';

interface QueryHistoryParam {
  current: number,
  tkOverFlag: number,
  tkDriverId: number
}

export async function queryHistory<T>(data:QueryHistoryParam) {
  return request<T>({
    url: `/act/ctn-yard-info/driver-page?${stringify(data)}`,
    method: 'GET',
    loadingText: '正在查询',
    onlyData: true
  })
}
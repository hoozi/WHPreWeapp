export const color = {
  brandColor:      '#4962eb',
  brandColorTap:   '#4258d4',
  tintColor:       '#fff',
  textBaseColor:   '#333B5A',
  fillColor:       '#f7f8fa',
  borderColorBase: '#ebedf0',
  warningColor:    '#fa8c16',
  successColor:    '#6abf47',
  errorColor:      '#f4333c',
  importantColor:  '#ff5b05',
  waitColor:       '#108ee9'
}

const { envVersion } = __wxConfig;
export const seriveUrlMap: {[key:string] : string} = {
  'develop': 'http://wms.weihuanginfo.com',
  'trial':   'http://wms.weihuanginfo.com',
  'release': 'https://www.eporthub.com:8443'
}
export const service_url:string = seriveUrlMap[envVersion]

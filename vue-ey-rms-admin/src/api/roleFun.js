import request from '@/utils/request'

export function getFunList(data) {
  return request({
    url: '/fun/getFunList',
    method: 'post',
    data,
  })
}

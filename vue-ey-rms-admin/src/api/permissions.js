import request from '@/utils/request'

/**
 * @author shou.liang.du
 * @description 权限管理API
 */

/**
 * 更新权限
 * @param {*} data 
 */
export function updatePerm(data) {
  return request({
    url: '/permissions/updatePerm',
    method: 'post',
    data,
  })
}


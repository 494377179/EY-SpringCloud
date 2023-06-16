import request from '@/utils/request'

/**
 * @author shou.liang.du
 * @description 角色管理API
 */

/**
 * 获取用户列表
 * @param {*} data 
 */
export function getList(data) {
  return request({
    url: '/userManagement/getList',
    method: 'post',
    data,
  })
}

/**
 * 修改
 * @param {*} data 
 */
export function doEdit(data) {
  return request({
    url: '/userManagement/doEdit',
    method: 'post',
    data,
  })
}

/**
 * 删除
 * @param {*} data 
 */
export function doDelete(data) {
  return request({
    url: '/userManagement/doDelete',
    method: 'post',
    data,
  })
}

/**
 * 更新状态(启用，停用)
 * @param {*} id 
 * @param {*} params 
 */
export function updateStatus(id, params) {
  return request({
    url: '/userManagement/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

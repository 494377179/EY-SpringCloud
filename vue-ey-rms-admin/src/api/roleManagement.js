import request from '@/utils/request'

/**
 * @author shou.liang.du
 * @description 角色管理API
 */

/**
 * 获得角色列表
 * @param {*} data 
 */
export function getList(data) {
  return request({
    url: '/roleManagement/getList',
    method: 'post',
    data,
  })
}

/**
 * 角色编辑
 * @param {*} data 
 */
export function doEdit(data) {
  return request({
    url: '/roleManagement/doEdit',
    method: 'post',
    data,
  })
}

/**
 * 角色删除
 * @param {*} data 
 */
export function doDelete(data) {
  return request({
    url: '/roleManagement/doDelete',
    method: 'post',
    data,
  })
}

/**
 * 角色树
 * @param {*} data 
 */
export function getRoleList(data) {
  return request({
    url: '/roleManagement/getRoleList',
    method: 'post',
    data,
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/roleManagement/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function getRoleMenuFunInfo(data) {
  return request({
    url: '/roleMenuFunInfo',
    method: 'post',
    data,
  })
}


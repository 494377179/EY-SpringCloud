import request from '@/utils/request'

/**
 * @author shou.liang.du
 * @description 部门管理API
 */

/**
 * 获取部门列表
 * @param {*} data 
 */
export function getList(data) {
  return request({
    url: '/deptManagement/getList',
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
    url: '/deptManagement/doEdit',
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
    url: '/deptManagement/doDelete',
    method: 'post',
    data,
  })
}

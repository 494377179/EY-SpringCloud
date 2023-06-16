import request from '@/utils/request'

/**
 * @author shou.liang.du
 * @description 部门管理API
 */

/**
 * 部门树
 * @param {*} data 
 */
export function getTreeList(data) {
  return request({
    url: '/departmentTree/list',
    method: 'post',
    data,
  })
}

import request from '@/utils/request'

/**
 * @author shou.liang.du
 * @description 日志管理API
 */

/**
 * 获取日志列表
 * @param {*} data 
 */
export function getList(data) {
  return request({
    url: '/logManagement/getList',
    method: 'post',
    data,
  })
}

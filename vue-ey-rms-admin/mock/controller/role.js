const data = [
  {
    id: '1',
    name: '股份运维',
    value: '1',
  },
  {
    id: '2',
    name: '股份IT支持',
    value: '1',
  },
  {
    id: '3',
    name: '股份管理员',
    value: '1',
  },
  {
    id: '4',
    name: '区域管理员',
    value: '1',
  },
  {
    id: '5',
    name: '区域IT支持',
    value: '1',
  },
  {
    id: '6',
    name: '区域运维',
    value: '1',
  },
  {
    id: '7',
    name: '区域业务',
    value: '1',
  },
]

module.exports = [
  {
    url: '/roleManagement/getRoleList',
    type: 'post',
    response() {
      return { code: 200, msg: 'success', data }
    },
  },
  {
    url: '/roleMenuFunInfo',
    type: 'post',
    response() {
      let menuIdPerm='1,2,3,4,5,6,7,8,9'
      let menuNamePerm='仪表盘,虚拟机监控,机器人监控,任务监控,区域监控,系统管理,用户管理,角色管理,菜单管理'
      let funIdPerm='333,444,555'
      let funNamePerm= '机器人监控-筛选,任务监控-筛选,区域监控-搜索'
      return {
        code: 200,
        msg: 'success',
        data: {
          menuIdPerm,
          menuNamePerm,
          funIdPerm,
          funNamePerm,
        },
      }
    },
  },
]

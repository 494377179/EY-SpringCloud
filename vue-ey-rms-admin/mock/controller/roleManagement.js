const totalCount = 5
const List = [
  {
    //id: '@id',
    id: '1',
    roleName: '测试管理员',
    menuIdPerm: '1,2,3,4,5,6,7,8,9',
    menuNamePerm: '仪表盘,虚拟机监控,机器人监控,任务监控,区域监控,系统管理,用户管理,角色管理,菜单管理',
    funIdPerm: '333,444,555',
    funNamePerm: '机器人监控-筛选,任务监控-筛选,区域监控-搜索',
    desc:'只有机器人权限',
    createUser: '平台管理员',
    createTime: '@datetime',
    updateUser: '平台管理员',
    updateTime: '@datetime',
    status: 1,
    isDelete: 1,
  },
  {
    id: '2',
    roleName: '管理员',
    menuIdPerm: '1,2,3,4,5,6,7,8,9',
    menuNamePerm: '仪表盘,虚拟机监控,机器人监控,任务监控,区域监控,系统管理,用户管理,角色管理,菜单管理',
    funIdPerm: '333,444,555',
    funNamePerm: '机器人监控-筛选,任务监控-筛选,区域监控-搜索',
    desc:'用户注册',
    createUser: '平台管理员',
    createTime: '@datetime',
    updateUser: '平台管理员',
    updateTime: '@datetime',
    status: 1,
    isDelete: 1,
  },
  {
    id: '3',
    roleName: '部门管理员',
    menuIdPerm: '1,2,3,4,5,6,7,8,9',
    menuNamePerm: '仪表盘,虚拟机监控,机器人监控,任务监控,区域监控,系统管理,用户管理,角色管理,菜单管理',
    funIdPerm: '333,444,555',
    funNamePerm: '机器人监控-筛选,任务监控-筛选,区域监控-搜索',
    desc:'-',
    createUser: '平台管理员',
    createTime: '@datetime',
    updateUser: '平台管理员',
    updateTime: '@datetime',
    status: 1,
    isDelete: 1,
  },
  {
    id: '4',
    roleName: '部门业务人员',
    menuIdPerm: '1,2,3,4,5,6,7,8,9',
    menuNamePerm: '仪表盘,虚拟机监控,机器人监控,任务监控,区域监控,系统管理,用户管理,角色管理,菜单管理',
    funIdPerm: '333,444,555',
    funNamePerm: '机器人监控-筛选,任务监控-筛选,区域监控-搜索',
    desc:'-',
    createUser: '平台管理员',
    createTime: '@datetime',
    updateUser: '平台管理员',
    updateTime: '@datetime',
    status: 1,
    isDelete: 1,
  },
  {
    id: '5',
    roleName: '队列监控',
    menuIdPerm: '1,2,3,4,5,6,7,8,9',
    menuNamePerm: '仪表盘,虚拟机监控,机器人监控,任务监控,区域监控,系统管理,用户管理,角色管理,菜单管理',
    funIdPerm: '333,444,555',
    funNamePerm: '机器人监控-筛选,任务监控-筛选,区域监控-搜索',
    desc:'-',
    createUser: '平台管理员',
    createTime: '@datetime',
    updateUser: '平台管理员',
    updateTime: '@datetime',
    status: 1,
    isDelete: 1,
  },
]
module.exports = [
  {
    url: '/roleManagement/getList',
    type: 'post',
    response(config) {
      const { title = '', pageNo = 1, pageSize = 20 } = config.body
      let mockList = List.filter((item) => {
        return !(title && item.title.indexOf(title) < 0)
      })
      const pageList = mockList.filter(
        (item, index) =>
          index < pageSize * pageNo && index >= pageSize * (pageNo - 1)
      )
      return {
        code: 200,
        msg: 'success',
        totalCount,
        data: pageList,
      }
    },
  },
  {
    url: '/roleManagement/doEdit',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟保存成功',
      }
    },
  },
  {
    url: '/roleManagement/doDelete',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟删除成功',
      }
    },
  },
  {
    url: '/roleManagement/updateStatus/',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
      }
    },
  },
]

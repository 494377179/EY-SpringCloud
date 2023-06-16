const totalCount = 15
const List = [
  {
    id: 1,
    operateTime: '@datetime',
    operateDetail: '登录了系统',
    operateModule: '登录模块',
    operateUser: '平台管理员',
  },
  {
    id: 2,
    operateTime: '@datetime',
    operateDetail: '登录了系统',
    operateModule: '登录模块',
    operateUser: '平台管理员',
  },
  {
    id: 3,
    operateTime: '@datetime',
    operateDetail: '登录了系统',
    operateModule: '登录模块',
    operateUser: '平台管理员',
  },
  {
    id: 4,
    operateTime: '@datetime',
    operateDetail: '登录了系统',
    operateModule: '登录模块',
    operateUser: '平台管理员',
  },
  {
    id: 5,
    operateTime: '@datetime',
    operateDetail: '登录了系统',
    operateModule: '登录模块',
    operateUser: '平台管理员',
  },
  {
    id: 6,
    operateTime: '@datetime',
    operateDetail: '登录了系统',
    operateModule: '登录模块',
    operateUser: '平台管理员',
  },
  {
    id: 7,
    operateTime: '@datetime',
    operateDetail: '登录了系统',
    operateModule: '登录模块',
    operateUser: '平台管理员',
  },
  {
    id: 8,
    operateTime: '@datetime',
    operateDetail: '登录了系统',
    operateModule: '登录模块',
    operateUser: '平台管理员',
  },
  {
    id: 9,
    operateTime: '@datetime',
    operateDetail: '登录了系统',
    operateModule: '登录模块',
    operateUser: '平台管理员',
  },
  {
    id: 10,
    operateTime: '@datetime',
    operateDetail: '登录了系统',
    operateModule: '登录模块',
    operateUser: '平台管理员',
  },
  {
    id: 11,
    operateTime: '@datetime',
    operateDetail: '登录了系统',
    operateModule: '登录模块',
    operateUser: '平台管理员',
  },
  {
    id: 12,
    operateTime: '@datetime',
    operateDetail: '登录了系统',
    operateModule: '登录模块',
    operateUser: '平台管理员',
  },
  {
    id: 13,
    operateTime: '@datetime',
    operateDetail: '登录了系统',
    operateModule: '登录模块',
    operateUser: '平台管理员',
  },
  {
    id: 14,
    operateTime: '@datetime',
    operateDetail: '登录了系统',
    operateModule: '登录模块',
    operateUser: '平台管理员',
  },
  {
    id: 15,
    operateTime: '@datetime',
    operateDetail: '登录了系统',
    operateModule: '登录模块',
    operateUser: '平台管理员',
  },
]

module.exports = [
  {
    url: '/logManagement/getList',
    type: 'post',
    response(config) {
      const { title = '', pageNo = 1, pageSize = 20 } = config.body
      let mockList = List.filter((item) => {
        if (title && item.title.indexOf(title) < 0) return false
        return true
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
]

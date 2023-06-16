const totalCount = 6
const List = [
  {
    id: 1,
    deptName: '上海船代',
    deptRegion: '华东',
    createUser: '平台管理员',
    createTime: '@datetime',
    updateUser: '平台管理员',
    updateTime: '@datetime',
    isDelete: 1,
  },
  {
    id: 2,
    deptName: '长江公司',
    deptRegion: '华东',
    createUser: '平台管理员',
    createTime: '@datetime',
    updateUser: '平台管理员',
    updateTime: '@datetime',
    isDelete: 1,
  },
  {
    id: 3,
    deptName: '集海事业部',
    deptRegion: '华中',
    createUser: '平台管理员',
    createTime: '@datetime',
    updateUser: '平台管理员',
    updateTime: '@datetime',
    isDelete: 1,
  },
  {
    id: 4,
    deptName: '集装箱分公司',
    deptRegion: '华北',
    createUser: '平台管理员',
    createTime: '@datetime',
    updateUser: '平台管理员',
    updateTime: '@datetime',
    isDelete: 1,
  },
  {
    id: 5,
    deptName: '广州分公司',
    deptRegion: '华南',
    createUser: '平台管理员',
    createTime: '@datetime',
    updateUser: '平台管理员',
    updateTime: '@datetime',
    isDelete: 1,
  },
  {
    id: 6,
    deptName: '广西分公司',
    deptRegion: '华南',
    createUser: '平台管理员',
    createTime: '@datetime',
    updateUser: '平台管理员',
    updateTime: '@datetime',
    isDelete: 1,
  },
]

module.exports = [
  {
    url: '/deptManagement/getList',
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
  {
    url: '/deptManagement/doEdit',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟保存成功',
      }
    },
  },
  {
    url: '/detpManagement/doDelete',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟删除成功',
      }
    },
  },
]

const totalCount = 7
const List = [
  {
    //id: '@id',
    id: 1,
    userName: 'admin',
    nickName: '平台管理员',
    passWord: 'admin',
    departmentId: '51',
    departmentName: '外运股份公司',
    phone: '13130402918',
    email: 'admin@sintrans.com',
    userRoleIds: '1,2,3,4',
    userRoleNames: '股份运维,股份IT支持,股份管理员,区域管理员',
    createUser: '平台管理员',
    createTime: '@datetime',
    updateUser: '平台管理员',
    updateTime: '@datetime',
    //email: '@email',
    //permissions: ['admin'],
    //datatime: '@datetime',
    status: 1,
    isDelete: 1,
  },
  {
    id: 2,
    userName: 'huangjiayin',
    nickName: '黄音佳',
    passWord: '12345',
    departmentId: '41',
    departmentName: '广州分公司',
    phone: '13894285241',
    email: 'huangjiayin@sintrans.com',
    userRoleIds: '1,2,3,4',
    userRoleNames: '股份运维,股份IT支持,股份管理员,区域管理员',
    createUser: '平台管理员',
    createTime: '@datetime',
    updateUser: '平台管理员',
    updateTime: '@datetime',
    status: 1,
    isDelete: 1,
  },
  {
    id: 3,
    userName: 'dushouliang',
    nickName: '杜守亮',
    passWord: '12345',
    departmentId: '42',
    departmentName: '广西分公司',
    phone: '13894425241',
    email: 'dushouliang@sintrans.com',
    userRoleIds: '1,4,7',
    userRoleNames: '股份运维,区域管理员,区域业务',
    createUser: '平台管理员',
    createTime: '@datetime',
    updateUser: '平台管理员',
    updateTime: '@datetime',
    status: 1,
    isDelete: 1,
  },
  {
    id: 4,
    userName: 'baining',
    nickName: '拜宁',
    passWord: '12345',
    departmentId: '31',
    departmentName: '集海事业部',
    phone: '13242548521',
    email: 'baining@sintrans.com',
    userRoleIds: '1,4,7',
    userRoleNames: '区域管理员,区域运维,区域业务',
    createUser: '平台管理员',
    createTime: '@datetime',
    updateUser: '平台管理员',
    updateTime: '@datetime',
    status: 1,
    isDelete: 1,
  },
  {
    id: 5,
    userName: 'louqixin',
    nickName: '娄启鑫',
    passWord: '12345',
    departmentId: '21',
    departmentName: '长江公司',
    phone: '13654285241',
    email: 'louqixin@sintrans.com',
    userRoleIds: '1,2,6,7',
    userRoleNames: '股份IT支持,股份管理员,区域运维,区域业务',
    createUser: '平台管理员',
    createTime: '@datetime',
    updateUser: '平台管理员',
    updateTime: '@datetime',
    status: 1,
    isDelete: 1,
  },
  {
    id: 6,
    userName: 'liusihao',
    nickName: '刘思昊',
    passWord: '12345',
    departmentId: '11',
    departmentName: '上海船代',
    phone: '13767285241',
    email: 'liusihao@sintrans.com',
    userRoleIds: '3,6,7',
    userRoleNames: '股份管理员,区域运维,区域业务',
    createUser: '平台管理员',
    createTime: '@datetime',
    updateUser: '平台管理员',
    updateTime: '@datetime',
    status: 0,
    isDelete: 1,
  },
  {
    id: 7,
    userName: 'choujun',
    nickName: '丑君',
    passWord: '12345',
    departmentId: '51',
    departmentName: '外运股份公司',
    phone: '13767285242',
    email: 'choujun@sintrans.com',
    userRoleIds: '4,6,7',
    userRoleNames: '区域管理员,区域运维,区域业务',
    createUser: '平台管理员',
    createTime: '@datetime',
    updateUser: '平台管理员',
    updateTime: '@datetime',
    status: 0,
    isDelete: 1,
  },
]

module.exports = [
  {
    url: '/userManagement/getList',
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
    url: '/userManagement/doEdit',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟保存成功',
      }
    },
  },
  {
    url: '/userManagement/doDelete',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟删除成功',
      }
    },
  },
  {
    url: '/userManagement/updateStatus/',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
      }
    },
  },
]

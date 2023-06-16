module.exports = [
  {
    url: '/permissions/updatePerm',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟更新权限成功',
      }
    },
  },
]

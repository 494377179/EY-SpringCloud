const data = [
  {
    title: '测试轮播消息通知1',
    url:
      'http://xxx',
  },
  {
    title: '测试轮播消息通知2',
    url:
      'http://xxx',
  },
  {
    title: '测试轮播消息通知3',
    url:
      'http://xxx',
  },
  {
    title: '测试轮播消息通知4',
    url:
      'http://xxx',
  },
]
module.exports = [
  {
    url: '/ad/getList',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data,
      }
    },
  },
]

const data = [
  {
    id:'1',
    parentId: '0',
    rank: 1,
    name: '仪表盘',
    disabled: true,
    children: [
      {
        id:'2',
        parentId: '1',
        rank: 2,
        name: '虚拟机监控',
        disabled: true,
      },
      {
        id:'3',
        parentId: '1',
        rank: 2,
        name: '机器人监控',
        disabled: true,
        children: [
          {
            id:'333',
            parentId: '3',
            rank: 3,
            name: '机器人监控-筛选',
            isFun: true,
          }
        ],
      },
      {
        id:'4',
        parentId: '1',
        rank: 2,
        name: '任务监控',
        disabled: true,
        children: [
          {
            id:'444',
            parentId: '4',
            rank: 3,
            name: '任务监控-筛选',
            isFun: true,
          }
        ],
      },
      {
        id:'5',
        parentId: '1',
        rank: 2,
        name: '区域监控',
        disabled: true,
        children: [
          {
            id:'555',
            parentId: '5',
            rank: 3,
            name: '区域监控-搜索',
            isFun: true,
          }
        ],
      },
    ],
  },
  {
    id:'6',
    parentId: '0',
    rank: 1,
    name: '系统管理',
    disabled: true,
    children: [
      {
        id:'7',
        parentId: '6',
        rank: 2,
        name: '用户管理',
        disabled: true,
        children: [
          {
            id:'777',
            parentId: '7',
            rank: 3,
            name: '用户管理-新增',
            isFun: true,
          },
          {
            id:'778',
            parentId: '7',
            rank: 3,
            name: '用户管理-修改',
            isFun: true,
          },
          {
            id:'779',
            parentId: '7',
            rank: 3,
            name: '用户管理-删除',
            isFun: true,
          },
        ],
      },
      {
        id:'8',
        parentId: '6',
        rank: 2,
        name: '角色管理',
        disabled: true,
        children: [
          {
            id:'888',
            parentId: '8',
            rank: 3,
            name: '角色管理-新增',
            isFun: true,
          },
          {
            id:'889',
            parentId: '8',
            rank: 3,
            name: '角色管理-修改',
            isFun: true,
          },
          {
            id:'890',
            parentId: '8',
            rank: 3,
            name: '角色管理-删除',
            isFun: true,
          },
        ],
      },
      {
        id:'11',
        parentId: '6',
        rank: 2,
        name: '菜单管理',
        disabled: true,
        children: [
          {
            id:'999',
            parentId: '9',
            rank: 3,
            name: '菜单管理-新增',
            isFun: true,
          },
          {
            id:'1000',
            parentId: '9',
            rank: 3,
            name: '菜单管理-修改',
            isFun: true,
          },
          {
            id:'1001',
            parentId: '9',
            rank: 3,
            name: '菜单管理-删除',
            isFun: true,
          },
        ],
      },
    ],
  },
]

module.exports = [
  {
    url: '/fun/getFunList',
    type: 'post',
    response() {
      return { code: 200, msg: 'success', data: data }
    },
  },
]

<template>
  <div class="permissions-container">
      <el-row :gutter="20">
        <el-form ref="form" :model="form">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-card class="form-container" shadow="hover">
              <div slot="header" class="card-header"><span>角色列表</span></div>
              <ul class="list-group show-menu-arrow">
                <li v-for="(item,index) in allRoleList" 
                  :key="item.id" :value="item.id" 
                  :class="index===activeIndex?'list-group-item active':'list-group-item list-group-item-action'" 
                  @click="clickRole(index,item.id)">
                  {{item.name}}
                </li>
              </ul>
            </el-card>
          </el-col>

          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-card class="form-container" shadow="hover">
              <div slot="header" class="card-header"><span>菜单权限</span></div>
              <ul class="list-group show-menu-arrow">
                <el-tree
                    id="menuIdPermSelectTree"
                    ref="menuIdPermSelectTree"
                    :current-node-key="menuIdPermSelectTreeKey"
                    :data="selectTreeData"
                    :default-checked-keys="selectTreeDefaultSelectedKeys"
                    :default-expanded-keys="selectTreeDefaultSelectedKeys"
                    :highlight-current="true"
                    :props="selectTreeDefaultProps"
                    :default-expand-all='true'
                    node-key="id"
                    show-checkbox
                    @check="menuIdPermSelectTreeCheckNode"
                  ></el-tree>
              </ul>
            </el-card>
          </el-col>

          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-card class="form-container" shadow="hover">
              <div slot="header" class="card-header"><span>功能权限</span></div>
              <ul class="list-group show-menu-arrow">
                <el-tree
                  id="funIdPermSelectTree"
                  ref="funIdPermSelectTree"
                  :current-node-key="funIdPermSelectTreeKey"
                  :data="selectFunIdPermData"
                  :default-checked-keys="selectFunIdPermDefaultSelectedKeys"
                  :default-expanded-keys="selectFunIdPermDefaultSelectedKeys"
                  :highlight-current="true"
                  :props="selectFunIdPermDefaultProps"
                  :default-expand-all='true'
                  node-key="id"
                  check-strictly
                  show-checkbox
                  @check="funIdPermSelectTreeCheckNode"
                ></el-tree>
              </ul>
            </el-card>
          </el-col>
        </el-form>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div style="text-align: right;">
              <el-button type="primary" @click="updatePermFun">更新权限</el-button>
            </div>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import { getRoleList, getRoleMenuFunInfo } from '@/api/roleManagement'
import { getRouterList } from '@/api/router'
import { getFunList } from '@/api/roleFun'
import { updatePerm } from '@/api/permissions'

export default {
  name: 'Permissions',
  data() {
    return {
      allRoleList:[],
      activeIndex:0,

      /* 菜单多选树---------开始 */
      menuIdPermSelectLevel:2,// 树可选叶子level等级
      menuIdPermSelectTreeKey: '', //多选树默认key值
      selectTreeData: [], //多选树的值
      selectTreeDefaultSelectedKeys: [], //多选树默认展开的key值数组
      selectTreeDefaultProps: {
        children: 'children',
        label: 'name',
      },
      /* 菜单多选树---------结束 */
      /* 功能多选树---------开始 */
      funIdPermSelectLevel:3,// 树可选叶子level等级
      funIdPermSelectTreeKey: '', //多选树默认key值
      selectFunIdPermData: [], //多选树的值
      selectFunIdPermDefaultSelectedKeys: [], //多选树默认展开的key值数组
      selectFunIdPermDefaultProps: {
        children: 'children',
        label: 'name',
      },
      form: {
        roleId: '',
        menuIdPerm: [],
        funIdPerm: [],
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      //初始化角色列表
      this.initRoleList()

      //初始化菜单列表
      this.initMenuList()
    })
  },
  methods: {
    //初始化菜单列表
    async initRoleList() {
      const { data } = await getRoleList()
      this.allRoleList = data
    },
    //点击角色
    clickRole(index,roleId) {
      this.activeIndex = index
      this.getMenuFunInfo(roleId)
    },
    //通过角色ID获取菜单功能权限勾选树
    async getMenuFunInfo(roleId){
      const { data } = await getRoleMenuFunInfo(roleId)
      this.$nextTick(() => {
        this.selectTreeDefaultSelectedKeys = data.menuIdPerm.split(',')
        this.selectFunIdPermDefaultSelectedKeys = data.funIdPerm.split(',')
      })
    },
    // 初始化菜单列表树的值
    async initMenuList() {
      const { data } = await getRouterList()
      this.selectTreeData = data
      this.getMenuFunInfo(this.roleId)
      this.$nextTick(() => {
        this.$refs.menuIdPermSelectTree.setCheckedKeys(
          this.selectTreeDefaultSelectedKeys
        )
        
        setTimeout(() => {
          this.initFunList()
        }, 100);
      })
    },
    // 初始化功能列表树的值
    async initFunList() {
      const checkedNodes = this.$refs.menuIdPermSelectTree.getCheckedNodes()
      const { data } = await getFunList()
      let filterdata = this.filterData(checkedNodes,data)
      this.selectFunIdPermData = filterdata
      this.$nextTick(() => {
        this.targetdSelectedKeys(this.selectFunIdPermData)
        this.$refs.funIdPermSelectTree.setCheckedKeys(
          this.selectFunIdPermDefaultSelectedKeys
        )
      })
    },
    //递归遍历树勾选
    targetdSelectedKeys(list) {
      // 结束条件
      if (list && list.length > 0) {
      // 循环遍历
        for (let i = 0; i < list.length; i++) {
          //结束递归
          if (!list[i].isFun) {
            this.selectFunIdPermDefaultSelectedKeys.push(list[i].id)
            this.targetdSelectedKeys(list[i].children)
          } 
        }
      }
    },
    //根据菜单树选择过滤功能树数据
    filterData(checkedNodes,list) {
      const data = []
      // 结束条件
      if (list && list.length > 0) {
      // 循环遍历
        for (let i = 0; i < list.length; i++) {
          let children = list[i].children
          let newChildren = []
          let childrenIsExist = this.getChildrenIsExist(checkedNodes,children)

          if(children){
            for (let j = 0; j < children.length; j++) {
              if(list[i].isFun){
                newChildren.push(children[j])
              } else {
                let isChildrenExist = this.getIsExist(checkedNodes,children[j].id)
                if(isChildrenExist){
                  newChildren.push(children[j])
                }
              }
            }
            list[i].children = newChildren  
          }
          if(childrenIsExist){
            data.push(list[i])
          }
        }
      }
      return data
    },
    //判断子节点是否在菜单树勾选里存在
    getChildrenIsExist(checkedNodes,children){
      var isExist = false;

      if(children){
        for (var i = 0; i < checkedNodes.length; i++) {
          var nodeId = checkedNodes[i].id;
        
          for (let j = 0; j < children.length; j++) {
            var childrenId = children[j].id;
            if (childrenId == nodeId) {
              isExist = true;
            }
          }
        }
      }
      return isExist;
    },
    //判断功能节点是否在菜单树勾选里存在
    getIsExist(checkedNodes,id){
      var isExist = false;
      for (var i = 0; i < checkedNodes.length; i++) {
        var nodeId = checkedNodes[i].id;
        if (id == nodeId) {
          isExist = true;
        }
      }
      return isExist;
    },
    // 菜单节点选中操作
    menuIdPermSelectTreeCheckNode(data, node, el) {
      const checkedNodes = this.$refs.menuIdPermSelectTree.getCheckedNodes()
      const keyArr = []
      checkedNodes.forEach((item) => {
      if (item.rank >= this.menuIdPermSelectLevel) {
          keyArr.push(item.id)
        }
      })
      this.menuIdPermSelectTreeKey = keyArr.join(',')
      this.form.menuIdPerm = keyArr.join(',')
      this.initFunList()
    },
    // 功能节点选中操作
    funIdPermSelectTreeCheckNode(data, node, el) {
        const checkedNodes = this.$refs.funIdPermSelectTree.getCheckedNodes()
        const keyArr = []
        checkedNodes.forEach((item) => {
          if (item.rank >= this.funIdPermSelectLevel) {
            keyArr.push(item.id)
          }
        })
        this.funIdPermSelectTreeKey = keyArr.join(',')
        this.form.funIdPerm = keyArr.join(',')
    },
    //更新权限
    updatePermFun(){
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          const { msg } = await updatePerm(this.form)
          this.$baseMessage(msg, 'success')
          this.$emit('fetch-data')
          this.close()
        } else {
          return false
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  .show-menu-arrow {
    overflow:auto;
    max-height: 300px;
    min-height: 500px;
    border:1px solid #ffffff;
  }

  .list-group {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-direction: column;
      flex-direction: column;
      padding-left: 0;
      margin-bottom: 0;
      border-radius: 0.25rem;
  }

  .ul {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }

  li {
    display: list-item;
    text-align: -webkit-match-parent;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .list-group-item.active {
    z-index: 2;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }

  .list-group-item:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  .list-group-item {
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
    cursor: pointer;
  }

  .list-group-item + .list-group-item {
    border-top-width: 0;
  }

  .list-group-item:last-child {
    border-bottom-right-radius: inherit;
    border-bottom-left-radius: inherit;
  }

  .list-group-item-action:hover, .list-group-item-action:focus {
    z-index: 1;
    color: #495057;
    text-decoration: none;
    background-color: #f8f9fa;
  }
</style>

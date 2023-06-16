<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @open="initData"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单权限" prop="menuIdPerm">
        <el-select
          v-model="menuIdPermSelectTreeVal"
          class="vab-tree-select"
          clearable
          collapse-tags
          multiple
          popper-class="select-tree-popper"
          @change="changeMenuIdPermSelectTreeHandle"
          @clear="selectTreeClearHandle()"
          @remove-tag="removeSelectTreeTag"
        >
          <el-option :value="menuIdPermSelectTreeKey">
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
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="功能权限" prop="funIdPerm">
        <el-select
          v-model="funIdPermSelectTreeVal"
          class="vab-tree-select"
          clearable
          collapse-tags
          multiple
          popper-class="select-tree-popper"
          @change="changeFunIdPermSelectTreeHandle"
          @clear="selectFunIdPermClearHandle()"
          @remove-tag="removeSelectFunIdPermTag"
          @click.native="checkMenuSelect()"
        >
          <el-option :value="funIdPermSelectTreeKey">
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
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
        <el-input v-model="form.desc" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio-group v-model="form.status">
          <el-radio :label="1" border>是</el-radio>
          <el-radio :label="0" border>否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit, getRoleMenuFunInfo } from '@/api/roleManagement'
  import { getRouterList } from '@/api/router'
  import { getFunList } from '@/api/roleFun'

  export default {
    name: 'RoleManagementEdit',
    data() {
      return {
        /* 菜单多选树---------开始 */
        menuIdPermSelectLevel:2,// 树可选叶子level等级
        menuIdPermSelectTreeKey: '', //多选树默认key值
        menuIdPermSelectTreeVal: [],   //多选树默认val值
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
        funIdPermSelectTreeVal: [],   //多选树默认val值
        selectFunIdPermData: [], //多选树的值
        selectFunIdPermDefaultSelectedKeys: [], //多选树默认展开的key值数组
        selectFunIdPermDefaultProps: {
          children: 'children',
          label: 'name',
        },
        /* 功能多选树---------结束 */
        form: {
          id: '',
          roleName: '',
          menuIdPerm: [],
          funIdPerm: [],
          desc: '',
          status: 1,
        },
        rules: {
          roleName: [
            { required: true, trigger: 'blur', message: '请输入角色名' },
          ],
          menuIdPerm: [
            { required: true, trigger: 'blur', message: '请输入菜单权限' },
          ],
          funIdPerm: [
            { required: true, trigger: 'blur', message: '请输入功能权限' },
          ],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    //vue实例被生成后调用这个函数，初始化函数
    created() {},
    methods: {
      //编辑
      showEdit(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.form = Object.assign({}, row)
          this.$nextTick(() => {
            //同步方式直接从表格中获取角色菜单功能权限信息
            this.selectTreeDefaultSelectedKeys = row.menuIdPerm.split(',')
            this.selectFunIdPermDefaultSelectedKeys = row.funIdPerm.split(',')
            this.menuIdPermSelectTreeKey = row.menuIdPerm
            this.funIdPermSelectTreeKey = row.funIdPerm
            this.menuIdPermSelectTreeVal = row.menuNamePerm.split(',')
            this.funIdPermSelectTreeVal = row.funNamePerm.split(',')
            this.form.menuIdPerm = row.menuIdPerm
            this.form.funIdPerm = row.funNamePerm
            
            //异步方式通过角色ID获取角色菜单功能权限信息
            //this.getMenuFunInfo(row.id)
          })
        }
        this.dialogFormVisible = true
      },
      //关闭dialog
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.selectTreeClearHandle()
        this.selectFunIdPermClearHandle()
      },
      //保存dialog form
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const { msg } = await doEdit(this.form)
            this.$baseMessage(msg, 'success')
            this.$emit('fetch-data')
            this.close()
          } else {
            return false
          }
        })
      },
      //异步获取角色菜单功能权限信息
      async getMenuFunInfo(roleId){
        const { data } = await getRoleMenuFunInfo(roleId)
        this.selectTreeDefaultSelectedKeys = data.menuIdPerm.split(',')
        this.selectFunIdPermDefaultSelectedKeys = data.funIdPerm.split(',')
        this.menuIdPermSelectTreeKey = data.menuIdPerm
        this.menuIdPermSelectTreeVal = row.menuNamePerm.split(',')
        this.funIdPermSelectTreeVal = row.funNamePerm.split(',')
        this.form.menuIdPerm = row.menuIdPerm
        this.form.funIdPerm = data.funIdPerm
      },
      //初始化dialog数据
      initData(){
        this.$nextTick(() => {
          //初始化菜单列表
          this.initMenuList();
        })
      },
      // 初始化菜单列表树的值
      async initMenuList() {
        const { data } = await getRouterList()
        this.selectTreeData = data
        this.$nextTick(() => {
          this.$refs.menuIdPermSelectTree.setCheckedKeys(
              this.selectTreeDefaultSelectedKeys
          )
        })
      },
      // 初始化功能列表树的值
      async initFunList(checkedNodes) {
        const { data } = await getFunList()
        let filterdata = this.filterData(checkedNodes,data)
        this.selectFunIdPermData = filterdata
        this.$nextTick(() => {
          this.selectFunIdPermDefaultSelectedKeys=this.filterSelectKeyData(filterdata)
          this.targetdSelectedKeys(this.selectFunIdPermData)

          this.$refs.funIdPermSelectTree.setCheckedKeys(
              this.selectFunIdPermDefaultSelectedKeys
          )
        })
      },
      filterSelectKeyData(list) {
        const data = []
        const valData = []
        let selectKeyData = this.funIdPermSelectTreeKey.split(',')
        let selectValueData = this.funIdPermSelectTreeVal

        if (selectKeyData && selectKeyData.length > 0) {
          for (let i = 0; i < selectKeyData.length; i++) {
            let selectKey = selectKeyData[i]
            let selectVal = selectValueData[i]
            let isExist = this.getChildIsExist(list,selectKey)

            if(isExist){
              data.push(selectKey)
              valData.push(selectVal)
            }
          }
        }
        this.funIdPermSelectTreeVal = valData
        return data
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
      //递归判断ID是否存在
      getChildIsExist(checkedNodes,id){
        var isExist = false

        for (var i = 0; i < checkedNodes.length; i++) {
          var nodeId = checkedNodes[i].id;
          let children = checkedNodes[i].children

          if(id == nodeId){
            isExist = true
          } else {
            if(children){
              for (let j = 0; j < children.length; j++) {
                var childrenId = children[j].id;
                var childrenNode = children[j].children;
                if(id == childrenId){
                  isExist = true
                } else {
                  if(childrenNode){
                    for (let k = 0; k < childrenNode.length; k++) {
                      var childrenNodeId = childrenNode[k].id;
                      if(id == childrenNodeId){
                        isExist = true
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return isExist
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
      //清除Tree已选数据
      selectTreeClearHandle() {
        this.selectTreeDefaultSelectedKeys = []
        this.menuIdPermSelectTreeVal = []
        this.form.menuIdPerm = ''
        this.menuIdPermSelectTreeKey = ''
        this.funIdPermSelectTreeVal = []
        this.$refs.menuIdPermSelectTree.setCheckedKeys([])
      },
      // select多选时移除某项操作
      removeSelectTreeTag(val) {
        const stack = JSON.parse(JSON.stringify(this.selectTreeData))
        while (stack.length) {
          const curr = stack.shift()
          if (curr.name == val) {
            return this.$refs.menuIdPermSelectTree.setChecked(curr.id, false)
          }
          if (curr.children && curr.children.length) {
            stack.unshift(...curr.children)
          }
        }
      },
      changeMenuIdPermSelectTreeHandle(val) {},
      // 菜单节点选中操作
      menuIdPermSelectTreeCheckNode(data, node, el) {
        const checkedNodes = this.$refs.menuIdPermSelectTree.getCheckedNodes()
        const keyArr = []
        const valueArr = []
        checkedNodes.forEach((item) => {
          if (item.rank >= this.menuIdPermSelectLevel) {
            keyArr.push(item.id)
            valueArr.push(item.name)
          }
        })
        this.menuIdPermSelectTreeVal = valueArr
        this.form.menuIdPerm = keyArr.join(',')
        this.menuIdPermSelectTreeKey = keyArr.join(',')
        //菜单权限选择时刷新功能权限
        this.initFunList(checkedNodes)
      },
      //清除Tree已选数据
      selectFunIdPermClearHandle() {
        this.selectFunIdPermDefaultSelectedKeys = []
        this.form.funIdPerm = ''
        this.funIdPermSelectTreeKey = ''
        this.funIdPermSelectTreeVal = []
        this.$refs.funIdPermSelectTree.setCheckedKeys([])
      },
      // select多选时移除某项操作
      removeSelectFunIdPermTag(val) {
        const stack = JSON.parse(JSON.stringify(this.selectFunIdPermData))
        while (stack.length) {
          const curr = stack.shift()
          if (curr.name == val) {
            return this.$refs.funIdPermSelectTree.setChecked(curr.id, false)
          }
          if (curr.children && curr.children.length) {
            stack.unshift(...curr.children)
          }
        }
      },
      changeFunIdPermSelectTreeHandle(val) {},
      // 功能节点选中操作
      funIdPermSelectTreeCheckNode(data, node, el) {
        const checkedNodes = this.$refs.funIdPermSelectTree.getCheckedNodes()
        const keyArr = []
        const valueArr = []
        checkedNodes.forEach((item) => {
          if (item.rank >= this.funIdPermSelectLevel) {
            keyArr.push(item.id)
            valueArr.push(item.name)
          }
        })
        this.funIdPermSelectTreeVal = valueArr
        this.form.funIdPerm = keyArr.join(',')
        this.funIdPermSelectTreeKey = keyArr.join(',')
      },
      //检查菜单权限
      checkMenuSelect(){
        const checkedNodes = this.$refs.menuIdPermSelectTree.getCheckedNodes()
        if(checkedNodes==null||checkedNodes.length==0){
          this.$baseMessage('未选择任何菜单权限', 'error')
        } else {
          //初始化功能列表
          this.initFunList(checkedNodes);       
        }
      },
    },
  }
</script>

<style lang="scss">
  .vab-tree-select{
      width: 100%;
  }
</style>

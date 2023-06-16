<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @open="initData"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model.trim="form.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model.trim="form.nickName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input
          v-model.trim="form.passWord"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model.trim="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model.trim="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="departmentId">
        <el-select
          ref="departmentTree"
          v-model="departmentSelectTreeVal"
          class="vab-tree-select"
          clearable
          popper-class="select-tree-popper"
          value-key="id"
          @clear="selectTreeClearHandle('single')"
        >
          <el-option :value="departmentSelectTreeKey">
            <el-tree
              id="departmentSelectTree"
              ref="departmentSelectTree"
              :current-node-key="departmentSelectTreeKey"
              :data="departmentSelectTreeData"
              :default-expanded-keys="departmentSelectTreeDefaultSelectedKeys"
              :highlight-current="true"
              :props="departmentSelectTreeDefaultProps"
              :default-expand-all='true'
              node-key="id"
              @node-click="departmentSelectTreeNodeClick"
            >
              <template #defalut="{ node }" class="vab-custom-tree-node">
                <span class="vab-tree-item">{{ node.label }}</span>
              </template>
            </el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属角色" prop="userRoleIds">
        <el-select v-model="form.userRoleIds" multiple collapse-tags placeholder="请选择所属角色">
          <el-option
            v-for="item in allRoleList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
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
  import { doEdit } from '@/api/userManagement'
  import { getTreeList as getDepartmentTreeList } from '@/api/department'
  import { getRoleList as getRoleList } from '@/api/roleManagement'
  import { getUserRoleInfo } from '@/api/user'

  export default {
    name: 'UserManagementEdit',
    data() {
      return {
        /* 部门单选树---------开始 */
        departmentSelectLevel:2,// 树可选叶子level等级
        departmentSelectTreeVal: '', //单选树默认label值
        departmentSelectTreeKey: '', //单选树默认key值
        departmentSelectTreeData: [], //单选树的值
        departmentSelectTreeDefaultSelectedKeys: [], //单选树默认展开的key值数组
        departmentSelectTreeDefaultProps: {
          children: 'children',
          label: 'name',
        },
        /* 部门单选树---------结束 */
        allRoleList:[],
        form: {
          id: '',
          userName: '',
          nickName: '',
          passWord: '',
          phone: '',
          email: '',
          departmentId: '',
          userRoleIds: [],
          status: 1,
        },
        rules: {
          userName: [
            { required: true, trigger: 'blur', message: '请输入用户名' },
          ],
          nickName: [
            { required: true, trigger: 'blur', message: '请输入登录名' },
          ],
          passWord: [
            { required: true, trigger: 'blur', message: '请输入密码' },
          ],
          email: [{ required: true, trigger: 'blur', message: '请输入邮箱' }],
          departmentId: [{ required: true, trigger: 'blur', message: '请输入部门' }],
          userRoleIds: [
            { required: true, trigger: 'blur', message: '请选择所属角色' },
          ],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    //挂载
    mounted() {
      //树初始化不从挂载执行，因为会和dialog冲突,在dialog的open事件初始化
      //this.$nextTick(() => {
        // 初始化单选树
        //this.initSingleTree('single')
      //})
    },
    //vue实例被生成后调用这个函数，初始化函数
    created() {},
    methods: {
      //编辑
      showEdit(row) {
        if (!row) {
          this.title = '添加'
          this.initTreeClearData('add');
        } else {
          this.title = '编辑'
          this.form = Object.assign({}, row)
          this.initTreeClearData('update',row);
          //同步方式直接从表格中获取用户角色信息
          this.form.userRoleIds = row.userRoleIds.split(",")
          
          //异步方式通过用户ID获取角色信息
          //this.getRoleInfo(row.id)
        }
        this.dialogFormVisible = true
      },
      //关闭dialog
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.selectTreeClearHandle('single')
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
      //初始化dialog数据
      initData(){
        this.$nextTick(() => {
          // 初始化单选树
          this.initSingleTree('single')

          //初始化角色列表
          this.initRoleList();
        })
      },
      /* 单选/多选树方法-------------------开始 */
      // 添加修改页面 初始化树参数
      initTreeClearData(type,row){
          //添加
          if(type == 'add'){
            //单选数据
            this.departmentSelectTreeDefaultSelectedKeys = []
            this.departmentSelectTreeVal = ''
            this.departmentSelectTreeKey = ''
            this.form.departmentId = '';
          } else {
            //单选数据
            this.departmentSelectTreeDefaultSelectedKeys = []
            this.departmentSelectTreeVal = row.departmentName;
            this.departmentSelectTreeKey = row.departmentId;
            this.form.departmentId = row.departmentId;
          }
      },
      //异步获取用户角色信息
      async getRoleInfo(userId){
        const { data } = await getUserRoleInfo(userId)
        this.form.userRoleIds = data.userRoleIds.split(",")
      },
      // 初始化单选树的值
      async initSingleTree(treeType) {
        //单选树
        if (treeType == 'single') {
            const { data } = await getDepartmentTreeList()
            this.departmentSelectTreeData = data
            this.$nextTick(() => {
              this.departmentSelectTreeDefaultSelectedKeys = this.departmentSelectTreeKey.split(
                ','
              ) // 设置默认展开
            })
        }
      },
      async initRoleList() {
          const { data } = await getRoleList()
          this.allRoleList = data
      },
      // 清除单选树选中
      selectTreeClearHandle(type) {
        if (type == 'single') {
          this.departmentSelectTreeDefaultSelectedKeys = []
          this.clearSelected()
          this.departmentSelectTreeVal = ''
          this.departmentSelectTreeKey = ''
          this.form.departmentId = '';
          this.$refs.departmentSelectTree.setCurrentKey('') // 设置默认选中
        }
      },
      /* 清空选中样式 */
      clearSelected() {
        const allNode = document.querySelectorAll(
          '#departmentSelectTree .el-tree-node'
        )
        allNode.forEach((element) => element.classList.remove('is-current'))
      },
      // 点击叶子节点
      departmentSelectTreeNodeClick(data, node, el) {
        if (data.rank >= this.departmentSelectLevel) {
          if(data.parentId != '0'){
            this.departmentSelectTreeVal = data.name
            this.departmentSelectTreeKey = data.id
            this.form.departmentId = data.id;
            this.$refs.departmentTree.blur()
          }
        }
      },
      /* 单选/多选树方法-------------------结束 */
    },
  }
</script>

<style lang="scss">
  .vab-tree-select{
      width: 100%;
  }

  .el-select{
    width: 100%;
  }
</style>

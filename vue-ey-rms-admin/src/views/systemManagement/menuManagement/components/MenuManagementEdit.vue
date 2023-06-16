<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="父级菜单" prop="parentId">
        <el-select v-model="form.parentId" clearable placeholder="请选择">
          <el-option
            v-for="item in allParentMenu"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单顺序" prop="order">
        <el-input v-model="form.order" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标" prop="icon">
        <el-popover
          ref="popoverIcon"
          placement="right-start"
          width="400"
          trigger="click"
          popper-class="popper-class"
          @show="$refs.icons.reset()">
          <VabIconPicker ref="icons" @selected="selectedIcon"/>
          <el-input slot="reference" v-model="form.icon" placeholder="请输入菜单图标" style="cursor: pointer;" readonly>
            <template slot="prepend"><vab-icon :icon="['fas', form.icon]" /></template>
          </el-input>
        </el-popover>
      </el-form-item>
      <el-form-item label="菜单链接" prop="path">
        <el-input v-model="form.path" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否显示">
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
  import { getRouterList as getList } from '@/api/router'
  import { doEdit } from '@/api/menuManagement'

  export default {
    name: 'MenuManagementEdit',
    data() {
      return {
        allParentMenu: [],
        placement: 'bottom',
        form: {
          name: '',
          parentId: '',
          order: '',
          path: '',
          icon: '',
          status: 1,
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入菜单名称' }],
          parentId: [{ required: true, trigger: 'blur', message: '请输入父级菜单' }],
          order: [{ required: true, trigger: 'blur', message: '请输入菜单顺序' }],
          path: [{ required: true, trigger: 'blur', message: '请输入菜单链接' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    mounted() {
      this.$nextTick(() => {
        //初始化父级菜单列表
        this.initParentMenu()
      })
    },
    created() {},
    methods: {
      selectedIcon (name) {
        this.form.icon = name
      },
      showEdit(row) {
        if (!row.id) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.form = Object.assign({}, row)
        }
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.menuIcon = ''
        this.form.icon = ''
        this.dialogFormVisible = false
      },
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
      async initParentMenu(){
        const { data } = await getList()
        let indexMenu = {id: '0',name: '无父级菜单'}
        data.unshift(indexMenu)
        this.allParentMenu = data
      },
    },
  }
</script>

<style lang="scss">
  .el-select{
    width: 100%;
  }

  .popper-class{
    height: 50%;
    overflow-y:auto;
    overflow-x: hidden;
  }
</style>

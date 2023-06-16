<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="部门名称" prop="deptName">
        <el-input v-model.trim="form.deptName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="部门地区" prop="deptRegion">
        <el-input v-model.trim="form.deptRegion" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit } from '@/api/deptManagement'

  export default {
    name: 'DeptManagementEdit',
    data() {
      return {
        form: {
          id: '',
          deptName: '',
          deptRegion: '',
        },
        rules: {
          deptName: [
            { required: true, trigger: 'blur', message: '请输入部门名称' },
          ],
          deptRegion: [
            { required: true, trigger: 'blur', message: '请输入部门地区' },
          ],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    //挂载
    mounted() {
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
        }
        this.dialogFormVisible = true
      },
      //关闭dialog
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
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
    },
  }
</script>

<style lang="scss">
</style>

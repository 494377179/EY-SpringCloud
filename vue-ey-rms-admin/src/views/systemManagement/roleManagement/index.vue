<template>
  <div class="roleManagement-container">
    <vab-query-form>
      <el-form ref="queryForm" :inline="true" :model="queryForm" @submit.native.prevent>
        <vab-query-form-left-panel :span="24">
          <el-form-item label="角色名:" prop="roleName">
              <el-input
                v-model.trim="queryForm.roleName"
                placeholder="请输入用户名"
                clearable
              />
          </el-form-item>
        </vab-query-form-left-panel>
        <vab-query-form-left-panel :span="12">
          <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
            添加
          </el-button>
          <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
            批量删除
          </el-button>
        </vab-query-form-left-panel>
        <vab-query-form-right-panel :span="12">
            <el-form-item>
              <el-button icon="el-icon-search" type="primary" @click="queryData">
                查询
              </el-button>
              <el-button icon="el-icon-refresh" type="success" @click="resetForm('queryForm')">
                 重置
              </el-button>
            </el-form-item>
        </vab-query-form-right-panel>
      </el-form>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      border
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <el-table-column show-overflow-tooltip type="selection" align="center"></el-table-column>
      <el-table-column
        v-if="show"
        show-overflow-tooltip
        prop="id"
        label="id"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="roleName"
        label="角色名称"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="menuNamePerm"
        label="菜单权限"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="funNamePerm"
        label="功能权限"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="desc"
        label="备注"
        align="center"
      ></el-table-column>
      <el-table-column label="是否启用" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="handleStatusChange(scope.$index, scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="updateUser"
        label="更新人"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="updateTime"
        label="更新时间"
        align="center"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" align="center">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.pageNo"
      :page-size="queryForm.pageSize"
      :layout="layout"
      :total="total"
      style="text-align:right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <edit ref="edit" @fetch-data="fetchData"></edit>
  </div>
</template>

<script>
  import { getList, doDelete, updateStatus } from '@/api/roleManagement'
  import Edit from './components/RoleManagementEdit'

  export default {
    name: 'RoleManagement',
    components: { Edit },
    data() {
      return {
        show: false,
        list: null,
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        selectRows: '',
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          roleName: '',
        },
      }
    },
    //vue实例被生成后调用这个函数，初始化函数
    created() {
      this.fetchData()
    },
    methods: {
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      //选择表格多行记录
      setSelectRows(val) {
        this.selectRows = val
      },
      //编辑
      handleEdit(row) {
        if (row.id) {
          this.$refs['edit'].showEdit(row)
        } else {
          this.$refs['edit'].showEdit()
        }
      },
      //删除
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ ids: row.id })
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await doDelete({ ids })
              this.$baseMessage(msg, 'success')
              this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error')
            return false
          }
        }
      },
      //改变状态
      handleStatusChange(index, row) {
        this.$confirm('是否要修改该状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateStatus(row.id, {status: row.status}).then(response => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });
          this.fetchData()
        });
      },
      //改变页面显示行数
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      //改变当前页码
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData()
      },
      //查询条件
      queryData() {
        this.queryForm.pageNo = 1
        this.fetchData()
      },
      //表格数据加载
      async fetchData() {
        this.listLoading = true
        const { data, totalCount } = await getList(this.queryForm)
        this.list = data
        this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 300)
      },
    },
  }
</script>

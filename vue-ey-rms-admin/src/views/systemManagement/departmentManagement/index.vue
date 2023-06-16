<template>
  <div class="deptManagement-container">
    <vab-query-form>
      <el-form ref="queryForm" :inline="true" :model="queryForm" @submit.native.prevent>
        <vab-query-form-left-panel :span="8">
          <el-form-item label="部门名称:" prop="deptName">
              <el-input
                v-model.trim="queryForm.deptName"
                placeholder="请输入部门名称"
                clearable
              />
          </el-form-item>
        </vab-query-form-left-panel>
        <vab-query-form-left-panel :span="8">  
            <el-form-item label="部门地区:" prop="deptRegion">
                <el-input
                  v-model.trim="queryForm.deptRegion"
                  placeholder="请输入部门地区"
                  clearable
                />
            </el-form-item>
        </vab-query-form-left-panel>
        <vab-query-form-left-panel :span="8">  
            <el-form-item label="创建人:" prop="createUser">
                <el-input
                  v-model.trim="queryForm.createUser"
                  placeholder="请输入创建人"
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
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="deptName"
        label="部门名称"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="deptRegion"
        label="部门地区"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="createUser"
        label="创建人"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="createTime"
        label="创建时间"
        align="center"
      ></el-table-column>
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
      <el-table-column show-overflow-tooltip label="操作" width="100" align="center">
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
  import { getList, doDelete } from '@/api/deptManagement'
  import Edit from './components/DeptManagementEdit'

  export default {
    name: 'DeptManagement',
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
          userName: '',
          departmenName:'',
          roleName:'',
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

<template>
  <div class="menuManagement-container">
    <vab-query-form>
      <el-form ref="queryForm" :inline="true" :model="queryForm" @submit.native.prevent>
        <vab-query-form-left-panel :span="24">
          <el-form-item label="菜单名:" prop="menuName">
              <el-input
                v-model.trim="queryForm.menuName"
                placeholder="请输入菜单名"
                clearable
              />
          </el-form-item>
        </vab-query-form-left-panel>
        <vab-query-form-left-panel :span="12">
          <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
            添加
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
          ref="menuTable"
          v-loading="listLoading"
          :data="list"
          :element-loading-text="elementLoadingText"
          row-key="id"
          border
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column
            show-overflow-tooltip
            prop="name"
            label="菜单名称"
            align="center"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="parentName"
            label="父级菜单"
            align="center"
          ></el-table-column>

          <el-table-column show-overflow-tooltip label="菜单类型">
            <template #default="{ row }">
              <span>
                {{ row.rank == 1 ? '一级菜单' : '二级菜单' }}
              </span>
            </template>
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            prop="order"
            label="菜单顺序"
            align="center"
          ></el-table-column>

          <el-table-column show-overflow-tooltip label="菜单图标" align="center">
            <template #default="{ row }">
              <span v-if="row.meta">
                <vab-icon
                  v-if="row.meta.icon"
                  :icon="['fas', row.meta.icon]"
                ></vab-icon>
              </span>
            </template>
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            prop="path"
            label="菜单链接"
            align="center"
          ></el-table-column>
        
          <!--<el-table-column show-overflow-tooltip label="是否隐藏">
            <template #default="{ row }">
              <span>
                {{ row.hidden ? '是' : '否' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="是否一直显示当前节点">
            <template #default="{ row }">
              <span>
                {{ row.alwaysShow ? '是' : '否' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="component"
            label="vue文件路径"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="redirect"
            label="重定向"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="meta.title"
            label="标题"
          ></el-table-column>-->
          <!--<el-table-column show-overflow-tooltip label="是否固定">
            <template #default="{ row }">
              <span v-if="row.meta">
                {{ row.meta.affix ? '是' : '否' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="是否无缓存">
            <template #default="{ row }">
              <span v-if="row.meta">
                {{ row.meta.noKeepAlive ? '是' : '否' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="badge">
            <template #default="{ row }">
              <span v-if="row.meta">
                {{ row.meta.badge }}
              </span>
            </template>
          </el-table-column>-->
          <el-table-column label="是否显示" align="center">
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
    <edit ref="edit" @fetch-data="fetchData"></edit>
  </div>
</template>

<script>
  import { getRouterList as getList } from '@/api/router'
  import { doDelete, updateStatus } from '@/api/menuManagement'
  import Edit from './components/MenuManagementEdit'

  export default {
    name: 'MenuManagement',
    components: { Edit },
    data() {
      return {
        list: [],
        listLoading: true,
        elementLoadingText: '正在加载...',
        queryForm: {
          menuName: '',
        },
      }
    },
    async created() {
      this.fetchData()
    },
    methods: {
      //查询条件
      queryData() {
        this.fetchData()
      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleEdit(row) {
        if (row.path) {
          this.$refs['edit'].showEdit(row)
        } else {
          this.$refs['edit'].showEdit()
        }
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ ids: row.id })
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })
        } 
      },
      async fetchData() {
        this.listLoading = true

        const { data } = await getList()
        this.list = data
        setTimeout(() => {
          this.listLoading = false
        }, 300)
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
    },
  }
</script>

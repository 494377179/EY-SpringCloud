<template>
  <div class="logManagement-container">
    <vab-query-form>
      <el-form ref="queryForm" :inline="true" :model="queryForm" @submit.native.prevent>
        <vab-query-form-left-panel :span="8">
          <el-form-item label="开始时间:" prop="startTime">
            <el-date-picker
              v-model="queryForm.startTime"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </vab-query-form-left-panel>
        <vab-query-form-left-panel :span="8">  
            <el-form-item label="结束时间:" prop="endTime">
              <el-date-picker
                v-model="queryForm.endTime"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
        </vab-query-form-left-panel>
        <vab-query-form-left-panel :span="8">  
            <el-form-item label="操作用户:" prop="operateUser">
              <el-input
                v-model.trim="queryForm.operateUser"
                placeholder="请输入角色名"
                clearable
              />
            </el-form-item>
        </vab-query-form-left-panel>
        <vab-query-form-right-panel :span="24">
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
    >
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="编号"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="operateTime"
        label="操作时间"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="operateDetail"
        label="操作详情"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="operateModule"
        label="操作模块"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="operateUser"
        label="操作用户"
        align="center"
      ></el-table-column>
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
  import { getList } from '@/api/logManagement'

  export default {
    name: 'LogManagement',
    data() {
      return {
        list: null,
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          startTime: (new Date().getTime() - 3600 * 1000 * 24 * 30),
          endTime: Date.now(),
          operateUser:'',
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          },{
            text: '一月前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', date);
            }
          }]
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

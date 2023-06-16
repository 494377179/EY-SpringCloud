<template>
  <div class="rpaMonitor-container">
    <el-row :gutter="20">
      <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
        <el-card shadow="hover">
          <div slot="header" class="card-header card-header-border-left-secondary">
            <span>机器人任务总数</span>
          </div>
          <div style="text-align: center">
            <img src="@/assets/dashboard/robotGreen.png" />
          </div>
          <hr style="margin-bottom: 1.5rem !important;margin-top: 1.5rem !important;border: 0;border-top: 1px solid rgba(0, 0, 0, 0.1);"/>
          <el-row :gutter="2">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <div style="text-align: center">
                <div style="margin-bottom: 5px">
                  <vab-icon :icon="['fas', 'circle']" style="color: rgb(255, 85, 3)"></vab-icon>
                  <span style="font-size: 12px; padding-left: 2%">
                    执行总数
                  </span>
                </div>
                <h6 style="font-size: 1rem;margin-top: 0;margin-bottom: 0.5rem;font-weight: 500;line-height: 1.2;">
                  440个
                </h6>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <div style="text-align: center">
                <div style="margin-bottom: 5px">
                  <vab-icon
                    :icon="['fas', 'circle']"
                    style="color: rgb(78, 51, 255)"
                  ></vab-icon>
                  <span style="font-size: 12px; padding-left: 2%">
                    今日新增
                  </span>
                </div>
                <h6 style="font-size: 1rem;margin-top: 0;margin-bottom: 0.5rem;font-weight: 500;line-height: 1.2;">
                  11个
                </h6>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
        <el-card shadow="hover">
          <div
            slot="header"
            class="card-header card-header-border-left-secondary">
            <span>机器人运行总时长</span>
          </div>
          <div style="text-align: center">
            <img src="@/assets/dashboard/robotPendding.png" />
          </div>
          <hr
            style="margin-bottom: 1.5rem !important;margin-top: 1.5rem !important;border: 0;border-top: 1px solid rgba(0, 0, 0, 0.1);"/>
          <el-row :gutter="2">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <div style="text-align: center">
                <div style="margin-bottom: 5px">
                  <vab-icon
                    :icon="['fas', 'circle']"
                    style="color: rgb(255, 85, 3)"
                  ></vab-icon>
                  <span style="font-size: 12px; padding-left: 2%">
                    忙碌总时长
                  </span>
                </div>
                <h6 style="font-size: 1rem;margin-top: 0;margin-bottom: 0.5rem;font-weight: 500;line-height: 1.2;">
                  4.25小时
                </h6>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <div style="text-align: center">
                <div style="margin-bottom: 5px">
                  <vab-icon
                    :icon="['fas', 'circle']"
                    style="color: rgb(78, 51, 255)"
                  ></vab-icon>
                  <span style="font-size: 12px; padding-left: 2%">
                    今日新增
                  </span>
                </div>
                <h6 style="font-size: 1rem;margin-top: 0;margin-bottom: 0.5rem;font-weight: 500;line-height: 1.2;">
                  0.23小时
                </h6>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
        <el-card shadow="hover">
          <div slot="header" class="card-header">
            <span>筛选条件</span>
          </div>
          <div style="text-align: center;min-height:12.15rem;">
            <el-form ref="searchForm" :model="searchForm" label-width="30%" class="demo-ruleForm">
              <br/>
              <el-form-item label="开始时间:" prop="startTime">
                <el-date-picker
                  v-model="searchForm.startTime"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
              <br>
              <el-form-item label="结束时间:" prop="endTime">
                <el-date-picker
                  v-model="searchForm.endTime"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
              <br>
              <el-form-item style="text-align: right;">
                <el-button type="primary" @click="submitForm('searchForm')">
                  筛选
                </el-button>
                <el-button @click="resetForm('searchForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card shadow="hover">
          <div slot="header" class="card-header">
            <span>机器人数量</span>
          </div>
          <!--<vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="rpaCount"
            class="chart-area"
          />-->
        </el-card>
      </el-col>

      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card shadow="hover">
          <div slot="header" class="card-header">
            <span>机器人运行总时长Top 10</span>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card shadow="hover">
          <div slot="header" class="card-header">
            <span>机器人运行总任务数Top 10</span>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card shadow="hover">
          <div slot="header" class="card-header">
            <span>机器人异常任务数Top 10</span>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card shadow="hover">
          <div slot="header" class="card-header">
            <span>机器人运行总任务数Top 10</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VabChart from '@/plugins/echarts'

export default {
  name: 'Form',
  data() {
    return {
      title:'title',
      total:200,
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
      searchForm: {
          startTime: (new Date().getTime() - 3600 * 1000 * 24 * 30),
          endTime: Date.now(),
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.chart-area {
  position: relative;
  height: 20rem;
  width: 100%;
}
</style>

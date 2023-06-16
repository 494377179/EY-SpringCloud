<template>
  <div class="icon-container">
    <el-input 
      v-model="name" 
      suffix-icon="el-icon-search" 
      placeholder="请输入图标名称" 
      @input.native="filterIcons">
    </el-input>

    <div style="padding-bottom: 4%;">

    </div>

    <el-row :gutter="6">
      <el-col 
        v-for="(item, index) in iconList"
        :key="index"
        :xs="4" 
        :sm="4" 
        :md="4" 
        :lg="4" 
        :xl="4">
        <el-card
          shadow="hover"
          style="cursor: pointer"
          @click.native="selectedIcon(item)">
          <vab-icon :icon="['fas', item]" />
        </el-card>
      </el-col>
    </el-row>
    <!--<span>{{item}}</span>-->
  </div>
</template>
<script>

import { getIconList } from '@/api/icon'

export default {
  name: 'VabIconPicker',
  data () {
    return {
      name: '',
      iconList: [],
    }
  },
  mounted() {
    this.$nextTick(() => {
      //初始化图标列表
      this.initIconList()
    })
  },
  methods: {
    filterIcons () {
      if (this.name) {
        this.iconList = this.iconList.filter(item => item.includes(this.name))
      } else {
        this.$nextTick(() => {
          //初始化图标列表
          this.initIconList()
        })
        //this.iconList = iconList
      }
    },
    selectedIcon (name) {
      this.$emit('selected', name)
    },
    reset () {
      this.name = ''
      this.$nextTick(() => {
        //初始化图标列表
        this.initIconList()
      })
      //this.iconList = iconList
    },
    async initIconList(){
      let params ={
        pageNo: 1,
        pageSize: 9999,
      }
      const { data } = await getIconList(params)
      this.iconList = data
    }
  }
}
</script>

<style lang="scss" scoped>
  .icon-container {
    ::v-deep {
      .el-card__body {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center; /* 垂直居中 */
        justify-content: center; /* 水平居中 */

        svg:not(:root).svg-inline--fa {
          font-size: 16px;
          color: $base-color-gray;
          text-align: center;
          vertical-align: middle;
          pointer-events: none;
          cursor: pointer;
        }
      }
    }

    .icon-text {
      height: 30px;
      margin-top: -15px;
      overflow: hidden;
      font-size: 12px;
      line-height: 30px;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
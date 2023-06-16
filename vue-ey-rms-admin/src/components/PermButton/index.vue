<template>
  <el-button v-if="hasPerms(perms)" :size="size" :type="type" :icon="icon" :disabled="disabled"
    :loading="loading" @click="handleClick">
    {{label}}
  </el-button>
</template>
 
<script>
  // 禁用标识
  // :disabled="!hasPerms(perms)"
import checkPermission from '@/utils/permission'

export default {
  name: 'PermButton',
  props: {
    label: {  // 按钮显示文本
      type: String,
      default: 'Button'
    },
    size: {  // 按钮尺寸
      type: String,
      default: ''
    },
    icon: { //图标
      type: String,
      default: ''
    },
    type: {  // 按钮类型
      type: String,
      default: null
    },
    loading: {  // 按钮加载标识
      type: Boolean,
      default: false
    },
    disabled: {  // 按钮是否禁用
      type: Boolean,
      default: false
    },
    perms: {  // 按钮权限标识，外部使用者传入
      type: String,
      default: null
    },
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    handleClick: function () {
      // 按钮操作处理函数
      this.$emit('click', {})
    }, 
    hasPerms: function (perms) {
      // 根据权限标识和外部指示状态进行权限判断
      if(perms){
        perms = perms.split(',')
      }
      return checkPermission(perms) //& !this.disabled
    }
  },
}
</script>
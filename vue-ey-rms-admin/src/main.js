import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './plugins'
import '@/layouts/export'
import PermButton from '@/components/PermButton'
import VabIconPicker from '@/components/VabIconPicker'

/**
 * @author shou.liang.du
 * @description 生产环境默认都使用mock，如果正式用于生产环境时，记得去掉
 */

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('@/utils/static')
  mockXHR()
}

Vue.config.productionTip = false

Vue.component("Pebutton",PermButton)
Vue.component("VabIconPicker",VabIconPicker)

new Vue({
  el: '#vue-ey-rms-admin',
  router,
  store,
  render: (h) => h(App),
})

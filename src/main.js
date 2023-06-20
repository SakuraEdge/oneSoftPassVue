import Vue from 'vue'
import VueClipBoard from 'vue-clipboard2'

import App from './App.vue'
// 导入axios
import axios from 'axios'
// 引入element-ui
import ElementUI from 'element-ui'
// 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入路由模块
import router from '@/router'
// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.use(VueClipBoard)
Vue.use(ElementUI)
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
axios.defaults.headers['Content-Type'] = 'application/json'
Vue.config.productionTip = false

new Vue({
  // 挂载
  axios,
  // 注册路由信息：组件身上都拥有$route【路径、query、params】,
  // $router（进行路由跳转【push|replace）属性
  router,
  render: h => h(App)
}).$mount('#app')

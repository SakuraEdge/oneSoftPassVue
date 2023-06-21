import Vue from 'vue'
import VueRouter from 'vue-router'
import pathArr from '@/router/pathArr.js'

// 导入路由组件
import Home from '@/components/Header/index'
import Web from '@/pages/CommonWeb/index'
import First from '@/pages/Home/First/index'
import Login from '@/pages/Login/index'
import CourseActivitie from '@/pages/CourseActivitie/index'
import FinisHomework from '@/pages/FinisHomework/index'
import Assessment from '@/pages/Assessment/index'
import UpdateLog from "@/pages/UpdateLog/index";

// 将VueRouter安装为vue项目的插件
Vue.use(VueRouter)

// 创建实例对象
const router = new VueRouter({
  mode: 'history',
  // routes 是一个数组，作用：定义“hash”地址与组件之间的对应关系
  routes: [
    // 项目跑起来，重定向到home
    {
      path: '/',
      component: First,
    },
    {
      path: '/action',
      component: Home,
      children: [
        { name: 'commonweb', path: '/web', component: Web },
        { name: 'updateLog', path: '/log', component: UpdateLog },
        { name: 'login', path: '/login', component: Login },
        { name: 'courseactivitie', path: '/courseactivitie', component: CourseActivitie },
        { name: 'finishomework', path: '/finishomework', component: FinisHomework },
        { name: 'assessment', path: '/assessment', component: Assessment }
      ]
    }
  ]
})


export default router

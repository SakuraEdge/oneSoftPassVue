import Vue from 'vue'
import VueRouter from 'vue-router'
import pathArr from '@/router/pathArr.js'

// 导入路由组件
import Home from '@/components/Header/title'
import Web from '@/pages/CommonWeb/webInfo'
import First from '@/pages/Home/home'
import Login from '@/pages/User/login'
import Register from "@/pages/User/register";
import FinisHomework from '@/pages/FinisHomework/index'
import Assessment from '@/pages/Assessment/index'
import UpdateLog from "@/pages/Log/updateInfo";
import UserInfo from "@/pages/UserInfo/userInfo";

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
        { name: 'register', path: '/register', component: Register },
        { name: 'userInfo', path: '/userInfo', component: UserInfo },
        { name: 'assessment', path: '/assessment', component: Assessment }
      ]
    }
  ]
})


export default router

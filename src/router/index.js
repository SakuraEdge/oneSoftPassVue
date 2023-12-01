import Vue from 'vue'
import VueRouter from 'vue-router'
import pathArr from '@/router/pathArr.js'

// 导入路由组件
import Home from '@/components/Header/title'
import Web from '@/pages/CommonWeb/webInfo'
import First from '@/pages/Home/home'
import Login from '@/pages/User/login'
import Register from "@/pages/User/register";
import UpdateLog from "@/pages/Log/updateInfo";
import UserInfo from "@/pages/User/userInfo";
import Change from "@/pages/Change/change";
import Money from "@/pages/Money/money";
import Code from "@/pages/Code/code";
import Tool from "@/pages/Tool/tool";
import Datasource from "@/pages/Datasource/datasource";
import Admin from "@/pages/Admin/adminMenu";
import AdminHome from "@/pages/Admin/adminHome";
import adminMenu from "@/pages/Admin/adminMenu";
import adminHome from "@/pages/Admin/adminHome";
import AdminMenu from "@/pages/Admin/adminMenu";
import adminUserList from "@/pages/Admin/adminUserList";
import adminUserPerm from "@/pages/Admin/adminUserPerm";

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
        { name: 'change', path: '/change', component: Change },
        { name: 'money', path: '/money', component: Money },
        { name: 'code', path: '/code', component: Code },
        { name: 'tool', path: '/tools', component: Tool },
        { name: 'datasource', path: '/datasource', component: Datasource },
        { name: 'updateLog', path: '/log', component: UpdateLog },
        { name: 'login', path: '/login', component: Login },
        { name: 'register', path: '/register', component: Register },
        { name: 'userInfo', path: '/userInfo', component: UserInfo },
      ]
    },
    {
      path: '/admin',
      component: AdminMenu,
      children: [
          { name: 'aHome', path: '/admin/home', component: adminHome },
          { name: 'aUserList', path: '/admin/userList', component: adminUserList },
          { name: 'aUserPerm', path: '/admin/userPerm', component: adminUserPerm }
      ]
    }
  ]
})


export default router

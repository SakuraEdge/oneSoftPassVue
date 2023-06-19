import Vue from 'vue'
import VueRouter from 'vue-router'
import pathArr from '@/router/pathArr.js'

// 导入路由组件
import Home from '@/pages/Home/index'
import Login from '@/pages/Login/index'
import OnlineClasses from '@/pages/OnlineClasses/index'
import StudyTest from '@/pages/StudyTest/index'
import First from '@/pages/Home/First/index'
import ToDo from '@/pages/ToDo/index'
import CourseActivitie from '@/pages/CourseActivitie/index'
import FinisHomework from '@/pages/FinisHomework/index'
import Assessment from '@/pages/Assessment/index'

// 将VueRouter安装为vue项目的插件
Vue.use(VueRouter)

// 创建实例对象
const router = new VueRouter({
  // routes 是一个数组，作用：定义“hash”地址与组件之间的对应关系
  routes: [
    // 项目跑起来，重定向到home
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        { name: 'first', path: '', component: First },
        { name: 'onlineclasses', path: '/onlineclasses', component: OnlineClasses },
        { name: 'studytest', path: '/studytest', component: StudyTest },
        { name: 'todo', path: '/todo', component: ToDo },
        { name: 'courseactivitie', path: '/courseactivitie', component: CourseActivitie },
        { name: 'finishomework', path: '/finishomework', component: FinisHomework },
        { name: 'assessment', path: '/assessment', component: Assessment }
      ]
    }
  ]
})

// 全局前置导航守卫
router.beforeEach(function (to, from, next) {
  if (pathArr.indexOf(to.path) === -1) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router

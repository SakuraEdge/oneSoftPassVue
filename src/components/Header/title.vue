<template>
  <div>
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                 style = "width: 100%;">
          <el-menu-item index="/#" style="color: black">首页</el-menu-item>
          <el-menu-item index="/change" style = "color:black;">编码转换</el-menu-item>
          <el-menu-item index="/money" style = "color:black;">货币汇率</el-menu-item>
          <el-menu-item index="/code" style = "color:black;">代码生成</el-menu-item>
          <el-menu-item index="/datasource" style = "color:black;">数据库表</el-menu-item>
          <el-menu-item index="/tools" style = "color:black;">实用工具</el-menu-item>
          <el-menu-item index="/web" style = "color:black;">常用网站</el-menu-item>
          <el-menu-item index="/log" style = "color:black;">更新日志</el-menu-item>
          <!-- <el-menu-item index="/images">图片上传</el-menu-item> -->
          <!-- 头像 -->
          <div v-if="user === '暂未登录'" style="float: right;padding-top: 1rem;padding-right: 1rem"><a href="/login">{{user}}</a></div>
          <div v-else style="float: right;padding-top: 1rem;padding-right: 1rem"><a href="/userInfo">{{user}}</a></div>
        </el-menu>

      </el-header>
      <el-main style="padding: 0;overflow:hidden;">
        <router-view />
      </el-main>
    </el-container>
  </div>

</template>

<script>
import cookie from '@/js/cookie.js'
export default {
  name: "index",
  data() {
    return {
      user: null,
    }
  },
  created(){
    if (cookie.getCookie("id") === null){
      console.log("没有cookie")
      this.user = "暂未登录"
    }
    else {
      this.$axios
          .post('/loginByCookie',{
            id: cookie.getCookie("id"),
            password: cookie.getCookie("password")
          }).then(res =>{
            if (res.data.code === 200){
              this.user = res.data.result.name + ' (' + cookie.getCookie("id") + ')'
            }
            else if (res.data.code === 300){
              this.error();
              cookie.clearCookie('id');
              cookie.clearCookie('password');
              this.user = "暂未登录"
            }
      })
    }
  },
  methods:{
    handleSelect(key, keyPath) {
      if (this.$route.path.indexOf(key) == -1) {
        this.$router.push(key)
      }
    },
    error(){
      this.$notify({
        title: '请重新登录',
        message: '账号密码在近期进行过更改',
        showClose: false,
        type: "error",
        duration: 2000
      })
    },
  }

}
</script>

<style scoped>

</style>
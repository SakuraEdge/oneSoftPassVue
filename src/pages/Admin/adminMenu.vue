<template>
  <div>
    <el-menu class="navMenu" @select="handleSelect">
      <el-menu-item index="/admin/home">
        <i class="el-icon-location"></i>
        <span slot="title">首页 </span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-user"></i>用户管理</template>
          <el-menu-item index="/admin/userList">用户列表</el-menu-item>
          <el-menu-item index="/admin/userPerm">用户权限管理</el-menu-item>
      </el-submenu>
<!--      <el-submenu index="2">-->
<!--        <template slot="title"><i class="el-icon-message"></i>请求审批</template>-->
<!--          <el-menu-item index="/">网页共享请求</el-menu-item>-->
<!--          <el-menu-item index="/">权限请求</el-menu-item>-->
<!--          <el-menu-item index="/">数据源共享请求</el-menu-item>-->
<!--      </el-submenu>-->
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-s-data"></i>数据管理</template>
        <el-menu-item index="/admin/web">自定义网页管理</el-menu-item>
        <el-menu-item @click="exchange">立刻更新货币汇率</el-menu-item>
        <el-menu-item @click="delMsg" style="color: red">清空在线聊天记录</el-menu-item>
      </el-submenu>
    </el-menu>
    <el-card style="height: 100vh">
      <router-view/>
    </el-card>
  </div>
</template>

<script>
import cookie from "@/js/cookie";
export default {
  name: "admin",
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    if (cookie.getCookie("id") === null){
      this.loginErr()
    }
    this.$axios.post('/loginByCookie',{
          id: cookie.getCookie("id"),
          password: cookie.getCookie("password")
        }).then(res =>{
      if (res.data.code === 200){
        if (res.data.result.level < 10) {
          this.loginErr()
        }
        else {
          this.userInfo = res.data.result
        }
      }
      else if (res.data.code === 300){
        this.loginErr()
      }
    })
  },
  methods: {
    handleSelect(key, keyPath) {
      if (this.$route.path.indexOf(key) == -1) {
        this.$router.push(key)
      }
    },
    loginErr() {
      this.$message({
        message: '当前未登录管理员账号，无法进入页面',
        type: "error",
        duration: 2000
      })
      this.$router.push("/#")
    },
    delMsg() {
      this.$axios.post("/delMsg",{}).then(v=>{
        this.$message({
          message: '已将在线聊天记录全部删除',
          type: "success",
          duration: 2000
        })
      })
    },
    exchange() {
      this.$axios.post("/updateExChange",{}).then(v=>{
        this.$message({
          message: '已更新汇率',
          type: "success",
          duration: 2000
        })
      })
    }
  }
}
</script>

<style scoped>

.navMenu {
  width: 15%;
  height: 100vh;
  float: left;
}
</style>
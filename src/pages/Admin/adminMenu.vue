<template>
  <div>
    <el-menu class="navMenu" @select="handleSelect">
      <el-menu-item index="/admin">
        <i class="el-icon-location"></i>
        <span slot="title">首页 </span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>用户管理</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="/admin">选项1</el-menu-item>
          <el-menu-item index="/">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
        </el-submenu>
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
          console.log(this.userInfo)
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
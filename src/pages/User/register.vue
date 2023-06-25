<template>
  <div class="bk">
    <div class="login_out" style="padding-top: 5%;">
      <el-card class="login" style="height: 588px;">
        <div class="title">
          账号注册
        </div>
        <div class="content">
          <el-input class="input"  placeholder="请输入用户名" v-model="username" clearable></el-input>
        </div>
        <div class="content">
          <el-input class="input"  placeholder="请输入手机号" v-model="tel" clearable></el-input>
        </div>
        <div class="content">
          <el-input class="input" placeholder="请输入密码" v-model="password" clearable show-password></el-input>
        </div>
        <div class="content">
          <el-input class="input" placeholder="请再次输入密码" v-model="rePassword" clearable show-password></el-input>
        </div>
        <div class="content">
          <el-input class="input" placeholder="请输入邮箱号" v-model="email" clearable></el-input>
        </div>
        <div class="register">
          <a href="/login">
            登录账号
          </a>
        </div>
        <div class="forget">
          <a href="/forget">
            忘记密码
          </a>
        </div>

        <el-button v-on:click="register" class="login_btn">注&nbsp;&nbsp;册</el-button>

      </el-card>
    </div>
  </div>
</template>

<script>
import cookie from '@/js/cookie.js'
export default {
  name: "register",
  data() {
    return {
      username: "",
      tel: "",
      password: "",
      email: "",
      rePassword: "",
    }
  },
  created() {
    // if (cookie.getCookie("id") !== null){
    //   this.$router.push('/');
    //   this.isLogin()
    // }
  },
  methods: {
    isLogin() {
      this.$notify({
        title: '当前已登录账号',
        message: '请退出账号后重试',
        showClose: false,
        type: "null",
        duration: 2000
      })
    },
    error(info) {
      this.$notify({
        title: '注册失败',
        message: info,
        showClose: false,
        type: "error",
        duration: 2000
      })
    },
    success(info) {
      this.$notify({
        title: '注册成功',
        message: info,
        showClose: false,
        type: "success",
        duration: 2000
      })
    },
    register() {
      if (this.username === "" || this.tel === "" || this.password === "" || this.rePassword === "" || this.email === ""){
        this.error("注册信息中有未填写信息，请重试")
      }
      else if (this.tel.length !== 11){
        this.error("手机号信息错误，请重试")
      }
      else if (this.password !== this.rePassword){
        this.error("两次输入的密码不一致，请重试")
      }
      else if (!this.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
        this.error("邮箱信息错误，请重试")
      }
      else{
        this.$axios
            .post("/register",{
              username: this.username,
              tel: this.tel,
              password: this.password,
              email: this.email,
            }).then(response => {
              if (response.data.code === 301){
                this.error("该手机号已注册")
              }
              else if (response.data.code === 302){
                this.error("该邮箱号已注册")
              }
              else{
                this.success("将在3秒后返回登录页面")
                this.timer = setTimeout(() =>{
                  this.$router.push('/login');
                },3000);
              }
        }).catch(response => {
          this.error("出现未知错误，请和管理员联系")
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
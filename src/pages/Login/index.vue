<template>
  <div class="bk">
    <div class="login_out">
      <el-card class="login">
        <div class="title">
          账号登录
        </div>
        <div class="content">
          <el-input class="input"  placeholder="请输入手机号" v-model="tel" clearable></el-input>
        </div>
        <div class="content">
          <el-input class="input" placeholder="请输入密码" v-model="password" show-password></el-input>
        </div>
        <div class="register">
          <a href="/register">
            注册账号
          </a>
        </div>
        <div class="forget">
          <a href="/forget">
            忘记密码
          </a>
        </div>

        <el-button v-on:click="login" class="login_btn">登&nbsp;&nbsp;录</el-button>

      </el-card>
    </div>
  </div>
</template>

<script>
import '@/css/login.css'
import cookie from '@/js/cookie.js'
export default {
  name: "index",
  data() {
    return {
      tel: "",
      password: "",
    }
  },
  methods: {
    success() {
      this.$notify({
        title: '登录成功！',
        message: '将在3秒后返回首页',
        showClose: false,
        type: "success",
        duration: 2000
      })
    },
    fail(){
      this.$notify({
        title: '登录失败！',
        message: '账号密码错误或账号未注册',
        showClose: false,
        type: "error",
        duration: 2000
      })
    },
    error(){
      this.$notify({
        title: '出现未知错误！',
        message: '请及时联系管理员',
        showClose: false,
        type: "error",
        duration: 2000
      })
    },
    login(){
      this.$axios
       .post('/login',{
         tel: this.tel,
         password: this.password
       }).then(response=>{
         console.log(response)
         if (response.data.code === 200){
           let loginInfo = {
             id: response.data.result.u_ID,
             name: response.data.result.name,
             tel: response.data.result.tel,
             email: response.data.result.email,
             description: response.data.result.description
           }
           cookie.setCookie(loginInfo,7);
           this.success();
           console.log(cookie.getCookie("description"))
           this.timer = setTimeout(() =>{
             this.$router.push('/');
           },3000);
         } else if (response.data.code === 300) {
           this.fail();
         } else {
           this.error();
         }
      }).catch(response => {
        this.error();
      })
    }
  }
}

</script>

<style scoped>

</style>
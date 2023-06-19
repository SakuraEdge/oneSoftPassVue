<template>
  <div class="loginbody">
    <div class="logindata">
      <div class="formdata">
        <el-form ref="loginForm" :model="loginForm" size="medium">
          <el-form-item prop=" loginAct">
            <el-input v-model="loginForm.loginAct" clearable placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.loginPwd" clearable placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <div class="in">
            <el-input v-model="check" clearable placeholder="请输入验证码"></el-input>
            <span style="margin-top: 5%;">231232</span>
          </div>
        </el-form>
      </div>
    </div>
    <div class="tool">
      <div>
        <el-checkbox v-model="remember"></el-checkbox>
      </div>
      <div>
        <span class="shou">忘记密码</span>
      </div>
    </div>
    <el-button class="butt" type="primary" @click="login">登录</el-button>
  </div>
</template>

<script>
// 引入cookies
import Cookies from 'js-cookie'
export default {
  name: 'LoginBox',
  data() {
    return {
      msg: '',
      remember: false,
      check: '',
      loginForm: {
        loginAct: '',
        loginPwd: ''
      },
    }
  },
  methods: {
    login() {
      if (this.loginForm.loginAct == '') {
        this.msg = '账号不能为空'
        this.open2()
        return
      }
      if (this.loginForm.loginPwd == '') {
        this.msg = '密码不能为空'
        this.open2()
        retur
      }
      //axios跨域请求
      this.$axios
        .post('/user/checkUserLogin', {
          uid: this.loginForm.loginAct,
          pwd: this.loginForm.loginPwd
        })
        .then(response => {
          if (response.data.code == 500) {
            this.msg = response.data.message
            this.open2()
            return
          } else {
            console.log(response)
            this.msg = '登陆成功'
            this.open1()
            localStorage.setItem('token', 'Bearer ' + this.loginForm.loginAct)
            // bus.$emit('username', response.data.returnData.name)
            // let data = new Date().getTime()   //先将此时的时间转化为毫秒
            // let new_data = new Date(data + 7 * 24 * 60 * 60 * 1000)  //将过期时间设置为7天后
            // 将用户名存入cookie中
            // Cookies.set('username', response.data.returnData.name + 'expires=' + new_data.toUTCString())
            Cookies.set('username', response.data.result.u_NAME)
            // 将用户id存入cookie中
            Cookies.set('uid', response.data.result.id)
            this.$router.push('/home')
            // console.log(response.data.result.id)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    open1() {
      this.$notify({
        title: '成功',
        message: this.msg,
        type: 'success'
      })
    },

    open2() {
      this.$notify.info({
        title: '提示',
        message: "账号或密码错误",
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.loginbody {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  background-image: url("../../assets/images/loginbackground.png");
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
  background-repeat: no-repeat;
  position: fixed;
  line-height: 100%;
  padding-top: 150px;
}

.logindata {
  width: 250px;
  height: 10px;
  transform: translate(-50%, -50%);
  margin-left: 82.8%;
  margin-top: 14%;
  background-color: rgba(217, 211, 211, 0.459);
}


.tool {
  display: flex;
  justify-content: space-between;
  width: 275px;
  height: 10px;
  margin-left: 72.8%;
  margin-top: 9.1%;
}

.butt {
  margin-top: 2%;
  margin-left: 72.8%;
  text-align: center;
  width: 290px;
  height: 40px;
}

.in {
  display: flex;
  justify-content: space-between;
}

.shou {
  cursor: pointer;
  color: #606266;
  font-size: 0.5rem;
}
</style>

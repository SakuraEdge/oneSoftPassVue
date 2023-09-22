<template>
  <div>
    <el-select v-model="selectSource" placeholder="数据库源选择" @change="changeUrl">
      <el-option v-for="(sources,index) in source" :label="sources" :value="index"></el-option>
    </el-select>
    <br>
    <el-input v-model="ip" id="ip" @input="sourceInput" placeholder="数据库ip"></el-input>
    <br>
    <el-input v-model="port" id="port" @input="sourceInput" placeholder="数据库端口"></el-input>
    <br>
    <el-input v-model="table" id="table" @input="sourceInput" placeholder="数据库名"></el-input>
    <br>
    <el-input v-model="userName" id="source_name" @input="sourceInput" placeholder="数据库用户名"></el-input>
    <br>
    <el-input v-model="userPwd" id="source_pwd" show-password @input="sourceInput" placeholder="数据库密码"></el-input>
    <br>
    自动生成的连接串为:
    <span style="color: #5a8cff" @click="copy(urls)">
      {{urls}}
    </span>
    <br>
    <el-button id="testConn" @click="testConn">点击测试</el-button>
  </div>

</template>

<script>
import cookie from "@/js/cookie";

export default {
  name: "datasource",
  data() {
    return {
      source: ['Oracle','Mysql'],
      selectSource: '',
      url: '',
      ip: '',
      port: '',
      urls: '',
      table: '',
      userName: '',
      userPwd: '',
    }
  },
  created() {
    if (cookie.getCookie("id") == null){
      this.$router.push('/change');
      this.nullLogin()
    }
  },
  methods: {
    nullLogin() {
      this.$notify({
        title: '该应用仅登录后使用',
        message: '请先登录账号',
        showClose: false,
        type: "error",
        duration: 2000
      })
    },
    changeUrl() {
      if (this.selectSource === 0) {
        this.url = 'jdbc:oracle:thin:@'
        this.changeOracleUrls()
      }
      else {
        this.url = 'jdbc:mysql://'
        this.changeMysqlUrls()
      }
    },
    copy(text) {
      this.$copyText(text).then(
          this.$notify({
            message: '已成功复制到剪贴板中',
            showClose: false,
            type: "success",
            duration: 1500
          })
      )
    },
    sourceInput() {
      if (this.selectSource === 0) {
        this.changeOracleUrls()
      }
      else {
        this.changeMysqlUrls()
      }
    },
    changeOracleUrls() {
      this.urls = this.url + this.ip + ':' + this.port + ':' + this.table
    },
    changeMysqlUrls() {
      this.urls = this.url + this.ip + ':' + this.port + '/' + this.table
    },
    testConn() {
      this.$axios.post("/testConn",{
        url: this.urls,
        userName: this.userName,
        userPwd: this.userPwd
      }).then(res => {
        let code = res.data.code
        if (code === 200) {
          this.$notify({
            title: '测试成功',
            message: '该连接串正常连接',
            showClose: false,
            type: "success",
            duration: 2000
          })
        }
        else {
          this.$notify({
            title: '测试失败',
            message: res.data.result,
            showClose: false,
            type: "error",
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
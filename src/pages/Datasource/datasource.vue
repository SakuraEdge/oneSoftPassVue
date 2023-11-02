<template>
  <div>
    <div>
      <el-card class="source-card-left">

      </el-card>
      <el-card class="source-card-right">

      </el-card>
    </div>

    <div class="fun-button">
      <el-button icon="el-icon-document-add" type="success" plain @click="dialogFormVisible = true">新建连接串</el-button>
      <el-button icon="el-icon-paperclip">更改连接串</el-button>
      <el-button icon="el-icon-document-copy">复制连接串</el-button>
      <el-button icon="el-icon-document-remove" type="danger" plain>删除连接串</el-button>
      <el-button class="fresh" icon="el-icon-refresh" circle></el-button>
    </div>


    <el-dialog title="新建连接串" :visible.sync="dialogFormVisible">
      <el-select class="form-input" v-model="selectSource" placeholder="数据库源选择" @change="changeUrl" style="margin-left: 1.6%">
        <el-option v-for="(sources,index) in source" :label="sources" :value="index"></el-option>
      </el-select>
      <br>
      <el-input class="form-input" v-model="ip" id="ip" @input="sourceInput" placeholder="数据库ip"></el-input>
      <br>
      <el-input class="form-input" v-model="port" id="port" @input="sourceInput" placeholder="数据库端口"></el-input>
      <br>
      <el-input class="form-input" v-model="table" id="table" @input="sourceInput" placeholder="数据库名"></el-input>
      <br>
      <el-input class="form-input" v-model="userName" id="source_name" @input="sourceInput" placeholder="数据库用户名"></el-input>
      <br>
      <el-input class="form-input" v-model="userPwd" id="source_pwd" show-password @input="sourceInput" placeholder="数据库密码"></el-input>
      <br>
      自动生成的连接串为:
      <span style="color: #5a8cff" @click="copy(urls)">
        {{ urls }}
      </span>
      <br>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button id="testConn" @click="testConn">点击测试</el-button>
        <el-button type="primary" @click="sourceSave">保存连接串</el-button>
      </div>
    </el-dialog>






  </div>


</template>

<script>
import cookie from "@/js/cookie";

export default {
  name: "datasource",
  data() {
    return {
      source: ['Oracle','Mysql'],
      dataSave: [],
      selectSource: '',
      url: '',
      ip: '',
      port: '',
      urls: '',
      table: '',
      userName: '',
      userPwd: '',
      dialogFormVisible: false,
    }
  },
  created() {
    if (cookie.getCookie("id") == null){
      this.$router.push('/change');
      this.nullLogin()
    }
    else {

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
        this.changeUrls()
      }
      else {
        this.url = 'jdbc:mysql://'
        this.changeUrls()
      }
    },
    copy(text) {
      this.$copyText(text).then(
          this.$message({
            message: '已成功复制到剪贴板中',
            type: "success",
            duration: 1500
          })
      )
    },
    sourceInput() {
      this.changeUrls()
    },
    changeUrls() {
      this.urls = this.url + this.ip + ':' + this.port + '/' + this.table
    },
    testConn() {
      this.$axios.post("/testConn",{
        url: this.urls,
        userName: this.userName,
        userPwd: this.userPwd
      }).then(res => {
        console.log(res.data.result)
        let code = res.data.code
        if (code === 200) {
          this.$message({
            message: '测试成功,该连接串正常连接',
            type: "success",
            duration: 2000
          })
        }
        else {
          this.$message({
            message: res.data.result,
            type: "error",
            duration: 2000
          })
        }
      })
    },
    sourceSave() {
      this.$axios.post("/sourceSave",{
        uid: cookie.getCookie("id"),
        type: this.selectSource,
        ip: this.ip,
        port: this.port,
        table: this.table,
        userName: this.userName,
        userPwd: this.userPwd
      }).then(res => {
        let code = res.data.code
        if (code === 200) {
          this.$message({
            message: '保存成功，连接串已加入数据库',
            type: "success",
            duration: 2000
          })
          this.dialogFormVisible = false
        }
        else {
          this.$message({
            message: res.data.result,
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
.source-card-left{
  width: 62%;
  margin-top: 2%;
  margin-left: 3%;
  height: 550px;
  float: left;
}

.source-card-right{
  width: 30%;
  margin-top: 2%;
  margin-right: 3%;
  height: 550px;
  float: right;
}

.fun-button{
  float: left;
  margin-top: 1%;
  margin-left: 3%;
  margin-right: 3%;
  width: 94%;
}

.fresh{
  margin-left: 25%;
}

.form-input {
  margin-bottom: 1%;
}
</style>
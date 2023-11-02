<template>
  <div>
    <div>
      <el-card class="source-card-left">
        <div slot="header" style="font-weight: 600;font-size: 18px">
          数据源管理
        </div>
        <el-scrollbar class="source-bar">
          <el-checkbox-group v-model="checkList">
            <el-card v-for="(data,index) in dataSave" class="source-info-card">
              <el-checkbox :label="data" :key="data">
                <span class="source-info">
                  {{data.name}}
                </span>
                <span class="source-info">
                  [{{data.note}}]
                </span>
              </el-checkbox>
              <el-button class="source-info-button" size="mini" type="text">点击查看详情</el-button>
            </el-card>
          </el-checkbox-group>
        </el-scrollbar>
      </el-card>
      <el-card class="source-card-right">

      </el-card>
    </div>

    <div class="fun-button">
      <el-button icon="el-icon-document-add" type="success" plain @click="dialogFormVisible = true">新建连接串</el-button>
      <el-button icon="el-icon-paperclip" @click="updateSource">更改连接串</el-button>
      <el-button icon="el-icon-document-copy" @click="copySource">复制连接串</el-button>
      <el-button icon="el-icon-document-remove" type="danger" @click="delSource" plain>删除连接串</el-button>
      <el-button class="fresh" icon="el-icon-refresh" circle @click="getSource"></el-button>
    </div>


    <el-dialog title="新建连接串" :visible.sync="dialogFormVisible">
      <el-select class="form-input" v-model="selectSource" placeholder="数据库源选择" @change="changeUrl" style="margin-left: 1.6%;margin-right: 1.5%">
        <el-option v-for="(sources,index) in source" :label="sources" :value="index"></el-option>
      </el-select>
      <el-input class="form-input" v-model="name" id="name" @input="sourceInput" placeholder="连接串名称"></el-input>
      <br>
      <el-input class="form-input" v-model="ip" id="ip" @input="sourceInput" placeholder="数据库ip"></el-input>
      <el-input class="form-input" v-model="port" id="port" @input="sourceInput" placeholder="数据库端口"></el-input>
      <br>
      <el-input class="form-input" v-model="table" id="table" @input="sourceInput" placeholder="数据库名"></el-input>
      <br>
      <el-input class="form-input" v-model="userName" id="source_name" @input="sourceInput" placeholder="数据库用户名"></el-input>
      <el-input class="form-input" v-model="userPwd" id="source_pwd" show-password @input="sourceInput" placeholder="数据库密码"></el-input>
      <el-input class="form-input" style="width: 96.5%" v-model="note" id="note" @input="sourceInput" placeholder="备注信息"></el-input>
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
      checkList: [],
      selectSource: '',
      name: '',
      url: '',
      ip: '',
      port: '',
      urls: '',
      table: '',
      userName: '',
      userPwd: '',
      note: '',
      dialogFormVisible: false,
    }
  },
  created() {
    if (cookie.getCookie("id") == null){
      this.$router.push('/change');
      this.nullLogin()
    }
    else {
      this.getSource()
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
    getSource() {
      this.$axios.post("/getSource",{
        id: cookie.getCookie("id")
      }).then(res => {
        this.dataSave = res.data.result
        console.log(this.dataSave)
      })
    },
    sourceSave() {
      if (this.dataSave.length > 2) {
        this.$message({
          message: "你的存储数量已达到上限，尝试开通会员提高上限",
          type: "error",
          duration: 2000
        })
      }
      else {
        this.$axios.post("/sourceSave",{
          name: this.name,
          uid: cookie.getCookie("id"),
          type: this.selectSource,
          ip: this.ip,
          port: this.port,
          table: this.table,
          userName: this.userName,
          userPwd: this.userPwd,
          note: this.note
        }).then(res => {
          let code = res.data.code
          if (code === 200) {
            this.$message({
              message: '保存成功，连接串已加入数据库',
              type: "success",
              duration: 2000
            })
            this.dialogFormVisible = false
            this.getSource()
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
    },
    copySource(){
      let copy = JSON.stringify(this.checkList)
      this.$copyText(copy).then(
        this.$message({
          type: 'success',
          message: '已将Json连接串复制到剪贴板中'
        })
      )
    },
    updateSource(){
      if (this.checkList.length > 1){
        this.$message({
          type: 'error',
          message: '仅能选择一条数据源进行更改'
        })
      }
    },
    delSource(){
      this.$confirm('此操作将永久删除选中所有数据源, 是否继续?', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.checkList.length === 0) {
          this.$message({
            type: 'error',
            message: '当前未选中任何数据源'
          });
        }
        else {
          let list = []
          this.checkList.forEach(function (value){
            list.push(value.id)
          })
          this.$axios.post("/delSource",{
            sourceList: list
          }).then(res =>{
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getSource()
            this.checkList = []
          })
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
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

.source-info {
  padding-left: 5%;
  width: 200px;
}

.source-info-button {
  float: right;
}

.source-info-card {
  margin-bottom: 15px;
}
</style>
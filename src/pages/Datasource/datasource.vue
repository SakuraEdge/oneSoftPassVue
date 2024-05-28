<template xmlns="http://www.w3.org/1999/html">
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
              <el-button class="source-info-button" size="mini" type="text" @click="source_info(data)">点击查看详情</el-button>
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
      <el-select class="form-input" v-model="selectSource" placeholder="数据库源选择" @change="changeUrls" style="margin-left: 1.6%;margin-right: 1.5%">
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
        <el-button @click="testConn(urls,userName,userPwd)">点击测试</el-button>
        <el-button type="primary" @click="sourceSave">保存连接串</el-button>
      </div>
    </el-dialog>


    <el-dialog title="更改连接串" :visible.sync="dialogUpdateVisible">
      <el-select class="form-input" v-model="selectUpdateSource" placeholder="数据库源选择" @change="changeUpdateUrls" style="margin-left: 1.6%;margin-right: 1.5%">
        <el-option v-for="(sources,index) in source" :label="sources" :value="index"></el-option>
      </el-select>
      <el-input class="form-input" v-model="update.name" id="update.name" @input="sourceUpdateInput" placeholder="连接串名称"></el-input>
      <br>
      <el-input class="form-input" v-model="update.ip" id="update.ip" @input="sourceUpdateInput" placeholder="数据库ip"></el-input>
      <el-input class="form-input" v-model="update.port" id="update.port" @input="sourceUpdateInput" placeholder="数据库端口"></el-input>
      <br>
      <el-input class="form-input" v-model="update.table" id="update.table" @input="sourceUpdateInput" placeholder="数据库名"></el-input>
      <br>
      <el-input class="form-input" v-model="update.userName" id="update.source_name" @input="sourceUpdateInput" placeholder="数据库用户名"></el-input>
      <el-input class="form-input" v-model="update.userPwd" id="update.source_pwd" show-password @input="sourceUpdateInput" placeholder="数据库密码"></el-input>
      <el-input class="form-input" style="width: 96.5%" v-model="update.note" id="update.note" @input="sourceUpdateInput" placeholder="备注信息"></el-input>
      <br>
      自动生成的连接串为:
      <span style="color: #5a8cff" @click="copy(update.urls)">
        {{ update.urls }}
      </span>
      <br>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取 消</el-button>
        <el-button @click="testConn(update.urls,update.userName,update.userPwd)">点击测试</el-button>
        <el-button type="primary" @click="updateSourceSave">保存连接串</el-button>
      </div>
    </el-dialog>


    <el-drawer
        title="数据源详情"
        :visible.sync="drawer"
        :direction="direction"
    >
      <div class="source-info-col">
        <span class="source-info-name">数据源ID </span> <span class="source-info-text"> {{ this.source_list.id }}</span>
      </div>
      <div class="source-info-col">
        <span class="source-info-name">名称 </span> <span class="source-info-text"> {{ this.source_list.name}} </span>
      </div>
      <div class="source-info-col">
        <span class="source-info-name">用户名 </span> <span class="source-info-text"> {{ this.source_list.userName}} </span> <br/>
      </div>
      <div class="source-info-col">
        <span class="source-info-name">IP </span> <span class="source-info-text"> {{ this.source_list.ip}} </span> <br/>
      </div>
      <div class="source-info-col">
        <span class="source-info-name">端口 </span> <span class="source-info-text"> {{ this.source_list.port}} </span> <br/>
      </div>
      <div class="source-info-col">
        <span class="source-info-name">数据库类型 </span> <span class="source-info-text"> {{ this.source_list.type }}</span> <br/>
      </div>
      <div class="source-info-col">
        <span class="source-info-name">Server名称 </span> <span class="source-info-text"> {{ this.source_list.table}} </span> <br/>
      </div>
      <div class="source-info-col">
        <span class="source-info-name">密码 </span> <i class="el-icon-view" @click="changeShow"></i> <span class="source-info-text" > {{ this.source_list.userPwdShow}} </span> <br/>
      </div>
      <div class="source-info-col">
        <span class="source-info-name">备注 </span> <span class="source-info-text"> {{ this.source_list.note}} </span> <br/>
      </div>
      <div class="source-info-col">
        <span class="source-info-name">状态 </span> <span class="source-info-text"> {{ this.source_list.status}} </span> <br/>
      </div>
      <div class="source-info-col">
        <span class="source-info-name">创建时间 </span> <span class="source-info-text"> {{ this.source_list.createTime}} </span> <br/>
      </div>
      <div class="source-info-col">
        <span class="source-info-name">更新时间 </span> <span class="source-info-text"> {{ this.source_list.updateTime}} </span> <br/>
      </div>
    </el-drawer>
  </div>


</template>

<script>
import cookie from "@/js/cookie";
import tool from "@/js/tool";


export default {
  name: "datasource",
  data() {
    return {
      drawer: false,
      direction: 'rtl',
      source_list: {
        id: '',
        name: '',
        ip: '',
        port: '',
        urls: '',
        table: '',
        userName: '',
        userPwd: '',
        note: '',
        type: '',
        status: '',
        createTime: '',
        updateTime: '',
        userPwdShow: '',
        isShow: '',
      },
      source: ['Oracle','Mysql'],
      dataSave: [],
      checkList: [],
      selectSource: '',
      selectUpdateSource: '',
      name: '',
      ip: '',
      port: '',
      urls: '',
      table: '',
      userName: '',
      userPwd: '',
      note: '',
      dialogFormVisible: false,
      dialogUpdateVisible: false,
      update: {
        id: '',
        name: '',
        ip: '',
        port: '',
        urls: '',
        table: '',
        userName: '',
        userPwd: '',
        note: '',
      },

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
    sourceUpdateInput() {
      this.changeUpdateUrls()
    },
    changeUrls() {
      this.urls = tool.getUrls(this.url,this.ip,this.port,this.table)
    },
    changeUpdateUrls() {
      this.update.urls = tool.getUrls(this.update.url,this.update.ip,this.update.port,this.update.table)
    },
    testConn(urls,userName,userPwd) {
      this.$axios.post("/testConn",{
        url: urls,
        userName: userName,
        userPwd: userPwd
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
      else {
        this.update.id = this.checkList[0].id
        this.selectUpdateSource = Number(this.checkList[0].data_TYPE)
        this.update.name = this.checkList[0].name
        this.update.ip = this.checkList[0].data_IP
        this.update.port = this.checkList[0].data_PORT
        this.update.table = this.checkList[0].data_TABLE
        this.update.userName = this.checkList[0].data_USERNAME
        this.update.userPwd = this.checkList[0].data_PASSWORD
        this.update.note = this.checkList[0].note
        this.changeUpdateUrls()
        this.dialogUpdateVisible = true
      }
    },
    updateSourceSave(){
      this.$axios.post("/updateSourceSave",{
        name: this.update.name,
        id: this.update.id,
        type: this.selectUpdateSource,
        ip: this.update.ip,
        port: this.update.port,
        table: this.update.table,
        userName: this.update.userName,
        userPwd: this.update.userPwd,
        note: this.update.note
      }).then(res => {
        let code = res.data.code
        if (code === 200) {
          this.$message({
            message: '保存成功，连接串已更新',
            type: "success",
            duration: 2000
          })
          this.dialogUpdateVisible = false
          this.getSource()
          this.checkList = []
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
    },
    source_info(data) {

      this.source_list.name = data.name
      this.source_list.id = data.id
      this.source_list.ip = data.data_IP
      this.source_list.port = data.data_PORT
      this.source_list.table = data.data_TABLE
      this.source_list.userName = data.data_USERNAME
      this.source_list.userPwd = data.data_PASSWORD
      this.source_list.type = this.source[data.data_TYPE]
      this.source_list.note = data.note
      this.source_list.createTime = data.create_TIME
      this.source_list.updateTime = data.update_TIME
      this.source_list.userPwdShow = '******'
      this.source_list.isShow = false
      if (data.state === 'U') {
        this.source_list.status = '启用'
      }
      else {
        this.source_list.status = '关闭'
      }
      this.drawer = true

    },
    changeShow() {
      this.source_list.isShow = !this.source_list.isShow
      if (this.source_list.isShow) {
        this.source_list.userPwdShow = this.source_list.userPwd
      }
      else {
        this.source_list.userPwdShow = '******'
      }
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

.source-info-col {
  padding-bottom: 1%;
  font-size: 15px;
}

.source-info-name {
  float: left;
  padding-left: 2%;
  padding-right: 5%;
  width: 25%;
  text-align: right;
  font-weight: 600;
}
</style>
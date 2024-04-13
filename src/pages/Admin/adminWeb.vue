<template>
  <div>
    <el-card>
      <div slot="header" style="font-weight: 600;font-size: 18px">
        <span>友情链接</span>
        <el-button size="mini"style="float: right" @click="getWebList">搜索</el-button>
        <el-input @keydown.enter.native="getWebList" size="mini" style="float: right" placeholder="输入网址名称" v-model="name">
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <el-scrollbar class="userList-bar">
        <el-card v-for="(data,index) in webList" class="web-info-card">
            <span class="web-info-1" style="color: dodgerblue" >
              {{ data.name }}
            </span>
          <span class="web-info-1" style="color: darkred">
              {{ data.website }}
            </span>
          <el-button class="web-info-button" size="mini" type="text" @click="delWeb(data)">删除</el-button>
          <el-button class="web-info-button" size="mini" type="text" @click="source_info(data)">修改信息</el-button>
        </el-card>
      </el-scrollbar>
    </el-card>

    <div class="fun-button">
      <el-button icon="el-icon-document-add" type="success" plain @click="dialogFormVisible = true">新建链接</el-button>
    </div>

    <el-dialog title="新建友情链接" :visible.sync="dialogFormVisible">
      <el-input type="textarea" :autosize="{ minRows: 1}" class="form-input" v-model="webInfo.name" id="name"placeholder="请输入链接名称"></el-input>
      <br>
      <el-input type="textarea" :autosize="{ minRows: 1}" class="form-input" v-model="webInfo.website" id="ip" placeholder="请输入链接地址"></el-input>
      <br>
      <el-input type="textarea" :autosize="{ minRows: 10}" class="form-input" v-model="webInfo.desc" placeholder="请输入链接描述"></el-input>
      <br>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="webSave">保存链接</el-button>
      </div>
    </el-dialog>

    <el-dialog title="更改友情链接" :visible.sync="dialogUpdateVisible">
      <el-input type="textarea" :autosize="{ minRows: 1}" class="form-input" v-model="updateInfo.name" id="name"placeholder="请输入链接名称"></el-input>
      <br>
      <el-input type="textarea" :autosize="{ minRows: 1}" class="form-input" v-model="updateInfo.website" id="ip" placeholder="请输入链接地址"></el-input>
      <br>
      <el-input type="textarea" :autosize="{ minRows: 10}" class="form-input" v-model="updateInfo.comment" placeholder="请输入链接描述"></el-input>
      <br>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="webUpdate">保存链接</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
export default {
  name: "adminWeb",
  data() {
    return {
      dialogUpdateVisible: false,
      dialogFormVisible: false,
      name: '',
      updateInfo: '',
      webList: [],
      source_list: '',
      webInfo: {
        website: '',
        name: '',
        desc: '',
      }
    }
  },
  created() {
    this.getListFirst()
  },
  methods: {
    getListFirst() {
      this.$axios.post('/website/getWebSite', {}).then(res => {
        this.webList = res.data.result
        console.log(this.webList)
      })
          .catch(function (error) {
            console.log(error)
          })
    },
    getWebList() {
      this.$axios.post("/getWebByName",{
        name: this.name
      }).then(v=>{
        this.webList = v.data.result
      })
    },
    delWeb(data) {
      this.$axios.post("/delWeb",{
        id: data.w_ID
      }).then(v=>{
        this.$message({
          message: '删除成功',
          type: "success",
          duration: 1500
        })
        this.getListFirst()
      })

    },
    webSave() {
      this.$axios.post("/webSave",{
        name: this.webInfo.name,
        website: this.webInfo.website,
        desc: this.webInfo.desc
      }).then(v=>{
        this.$message({
          message: '添加成功',
          type: "success",
          duration: 1500
        })
        this.getListFirst()
      })
      this.webInfo = {
        website: '',
        name: '',
        desc: '',
      }
      this.dialogFormVisible = false
    },
    source_info(data) {
      this.updateInfo = data
      this.dialogUpdateVisible = true
    },
    webUpdate() {
      this.$axios.post("/webUpdate",{
        id: this.updateInfo.w_ID,
        name: this.updateInfo.name,
        website: this.updateInfo.website,
        comment: this.updateInfo.comment,
      }).then(v=>{
        this.$message({
          message: '修改成功',
          type: "success",
          duration: 1500
        })
        this.getListFirst()
      })
      this.dialogUpdateVisible = false
    },
  },
}
</script>

<style scoped>
.web-info-card {
  margin-bottom: 15px;
}

.web-info-1 {
  float: left;
  padding-right: 3%;
  padding-bottom: 1%;
  width: 80px;
}

.web-info-button {
  float: right;
  padding-left: 1%;
}

.fun-button{
  float: left;
  margin-left: 0.5%;
  margin-top: 1%;
  margin-right: 3%;
  width: 94%;
}

.form-input{
  width: 95%;
  padding-bottom: 2%;
}


</style>
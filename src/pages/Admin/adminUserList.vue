<template>
  <el-card>
    <div slot="header" style="font-weight: 600;font-size: 18px">
      <span>用户列表</span>
      <el-button size="mini"style="float: right" @click="getUserList">搜索</el-button>
      <el-input @keydown.enter.native="getUserList" size="mini" style="float: right" placeholder="输入用户名" v-model="name">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <el-scrollbar class="userList-bar">
      <el-checkbox-group v-model="userSelect">
        <el-card v-for="(data,index) in userList" class="user-info-card">
          <el-checkbox :label="data" :key="data">
            <span class="user-info-1" style="color: dodgerblue" v-if="data.state === 'U'">
              {{ data.name }}
            </span>
            <span class="user-info-1" style="color: darkred" v-else>
              {{ data.name }}
            </span>
            <span class="user-info">
              [{{ data.email }}]
            </span>
            <span>
              最后登录时间：{{data.login_TIME}}
            </span>

          </el-checkbox>
          <el-button class="user-info-button" size="mini" type="text" @click="source_info(data)">点击查看详情</el-button>
        </el-card>
      </el-checkbox-group>
    </el-scrollbar>
    <el-drawer
        title="用户详情"
        :visible.sync="drawer"
    >
      <div class="source-info-col">
        <span class="source-info-name">用户编号 </span> <span class="source-info-text"> {{ this.source_list.u_ID }}</span>
      </div>
      <div class="source-info-col">
        <span class="source-info-name">用户名称 </span> <span class="source-info-text"> {{ this.source_list.name }} </span>
      </div>
      <div class="source-info-col">
        <span class="source-info-name">用户电话 </span> <div class="source-info-notice"> {{ this.source_list.tel }} </div>
      </div>
      <div class="source-info-col">
        <span class="source-info-name">用户邮箱 </span> <span class="source-info-text"> {{ this.source_list.email }} </span> <br/>
      </div>
      <div class="source-info-col">
        <span class="source-info-name">创建时间 </span> <span class="source-info-text"> {{ this.source_list.create_TIME }} </span> <br/>
      </div>
      <div class="source-info-col">
        <span class="source-info-name">最后登录时间 </span> <span class="source-info-text"> {{ this.source_list.login_TIME }} </span> <br/>
      </div>
      <div class="source-info-col">
        <span class="source-info-name">个性签名 </span> <span class="source-info-text"> {{ this.source_list.description }} </span> <br/>
      </div>
    </el-drawer>
  </el-card>

</template>

<script>
export default {
  name: "adminUserList",
  data() {
    return {
      drawer: false,
      name: "",
      userList: [],
      userSelect: [],
      source_list: '',

    }
  },
  created() {
    this.getUserList()
  },
  methods:{
    getUserList() {
      this.$axios.post("/getUserList",{
        name: this.name
      }).then(res=>{
        this.userList = res.data.result
        console.log(this.userList)
      })
    },
    source_info(data) {
      this.source_list = data
      this.drawer = true
    }
  }
}
</script>

<style scoped>
.user-info-card {
  margin-bottom: 15px;
}

.user-info-1 {
  float: left;
  padding-left: 5%;
  width: 80px;
}
.user-info {
  float: left;
  padding-left: 5%;
  width: 200px;
}

.user-info-button {
  float: right;
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

.source-info-notice {
  width: 250px;
  padding-left: 32%;
}

</style>
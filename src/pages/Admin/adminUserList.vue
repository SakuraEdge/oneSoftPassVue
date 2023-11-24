<template>
  <el-card>
    <div slot="header" style="font-weight: 600;font-size: 18px">
      <span>用户列表</span>
      <el-button size="mini"style="float: right" @click="getUserList">搜索</el-button>
      <el-input size="mini" style="float: right" placeholder="输入用户名" v-model="name">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <el-scrollbar class="userList-bar">
      <el-checkbox-group v-model="userSelect">
        <el-card v-for="(data,index) in userList" class="user-info-card">
          <el-checkbox :label="data" :key="data">
            <span class="user-info-1">
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
  </el-card>
</template>

<script>
export default {
  name: "adminUserList",
  data() {
    return {
      name: "",
      userList: [],
      userSelect: [],

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

</style>
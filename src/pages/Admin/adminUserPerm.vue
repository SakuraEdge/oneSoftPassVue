<template>
  <el-card>
    <div slot="header" style="font-weight: 600;font-size: 18px">
      <span>用户权限详情</span>
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
              权限等级：
            </span>
            <span v-if="data.level === '1'" style="font-weight: 600">
              普通用户
            </span>
            <span v-else-if="data.level === '2'" style="color: gold;font-weight: 600">
              VIP用户
            </span>
            <span v-else-if="data.level === '3'" style="color: deepskyblue;font-weight: 600">
              SVIP用户
            </span>
            <span v-else-if="data.level === '4'" style="color: red;font-weight: 600">
              至尊用户
            </span>
            <span v-else style="color: mediumpurple;font-weight: 600">
              管理员[{{data.level}}]
            </span>

          </el-checkbox>
          <el-button class="user-info-button" size="mini" type="text" @click="updatePerm(data)">修改权限</el-button>
        </el-card>
      </el-checkbox-group>
    </el-scrollbar>
  </el-card>
</template>

<script>
import cookie from "@/js/cookie";

export default {
  name: "adminUserPerm",
  data() {
    return {
      name: "",
      userList: [],
      userSelect: [],
      userInfo: []

    }
  },
  created() {
    this.getUserList()
    this.$axios.post('/loginByCookie',{
      id: cookie.getCookie("id"),
      password: cookie.getCookie("password")
    }).then(res =>{
      if (res.data.code === 200){
        if (res.data.result.level < 10) {
          this.loginErr()
        }
        else {
          this.userInfo = res.data.result
        }
      }
      else if (res.data.code === 300){
        this.loginErr()
      }
    })
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
    updatePerm(data) {
      if (this.userInfo['level'] < 99){
        this.$message({
          message: '管理员权限不足，无法进行更改',
          type: "error",
          duration: 2000
        })
      }
      else {
        console.log("权限通过")
      }


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
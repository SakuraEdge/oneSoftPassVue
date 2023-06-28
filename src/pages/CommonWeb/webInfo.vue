<template>
<div class="border">
  <el-card v-for="(item,index) in webList" :key="webInfo" class="card">
    <div>
      <span class="name">
        {{ item.name }}
      </span>
      <span class="website" v-on:click="copy(item.website)" >
        {{ item.website }}
      </span>
      <span>
        {{ item.comment }}
      </span>
      <a v-bind:href="item.website" target="_blank" class="gate">
        点击跳转
      </a>
    </div>
  </el-card>
  <div style="color: salmon;margin-top: 10px">
    提示：点击网址可以直接复制到剪贴板
  </div>
</div>

</template>

<script>
export default {
  data() {
    return {
      webList: [],
    }
  },
  created() {
    this.$axios
        .post('/website/getWebSite', {}).then(response => {
      response.data.result.forEach((item, index) => {
        this.webList.push(item)
      })
    })
        .catch(function (error) {
          console.log(error)
        })
  },
  methods: {
    open1() {
      this.$notify({
        message: '已将网址复制到剪贴板中',
        showClose: false,
        type: "success",
        duration: 1500
      })
    },
    copy(web){
      this.$copyText(web).then(
          this.open1
      )
    }
  },
  name: "index"
}
</script>

<style scoped>
.border{
  padding-left: 10%;
  padding-right: 10%;

}

.card{
  border: 1px solid #E0E0E0;
  margin-top: 20px;
  padding-bottom: 25px;
  height: 40px;
}

.website{
  padding-left: 5%;
  width: 300px;
  float: left;
  color: mediumslateblue;
}

.name{
  width: 100px;
  float: left;
}

.gate{
  float: right;
  color: #5a8cff;
}


</style>
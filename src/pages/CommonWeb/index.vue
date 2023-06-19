<template>
<div class="border">
  <el-card class="card">
    <div>
      <span class="name">
        百度
      </span>
      <span class="website">
        www.baidu.com
      </span>
      <span>
        基本上什么都可以查得到，用它就够了
      </span>
      <span class="gate">
        点击跳转
      </span>
    </div>
  </el-card>
  <el-card class="card">
    <div>
      <span class="name">
        Github
      </span>
      <span class="website">
        www.github.com
      </span>
      <span>
        你想要的项目这里都有
      </span>
      <span class="gate">
        点击跳转
      </span>
    </div>
  </el-card>
  <el-card class="card">
    <span class="name">
        chatGPT
      </span>
    <span class="website">
        chat.openai.com
      </span>
    <span>
        有时候他甚至比你聪明
      </span>
    <span class="gate">
        点击跳转
      </span>
  </el-card>
</div>

</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>
.border{
  padding-left: 8%;
  padding-right: 8%;

}

.card{
  border: 1px solid #E0E0E0;
  margin-top: 20px;
  padding-bottom: 25px;
  height: 40px;
}

.website{
  padding-left: 5%;
  width: 250px;
  float: left;
}

.name{
  width: 100px;
  float: left;
}

.gate{
  float: right;
}


</style>
<template>
  <div>
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                 style = "width: 100%;">
          <el-menu-item index="/#" style="color: black">首页</el-menu-item>
          <el-menu-item index="/change" style = "color:black;">编码转换</el-menu-item>
          <el-menu-item index="/money" style = "color:black;">货币汇率</el-menu-item>
          <el-menu-item index="/code" style = "color:black;">代码生成</el-menu-item>
          <el-menu-item index="/datasource" style = "color:black;">数据库表</el-menu-item>
          <el-menu-item index="/tools" style = "color:black;">实用工具</el-menu-item>
          <el-menu-item index="/web" style = "color:black;">常用网站</el-menu-item>
          <el-menu-item index="/log" style = "color:black;">更新日志</el-menu-item>
          <!-- <el-menu-item index="/images">图片上传</el-menu-item> -->
          <!-- 头像 -->
        </el-menu>
      </el-header>
      <el-main style="padding: 0;overflow:hidden;">
        <router-view />
      </el-main>
    </el-container>
  </div>

</template>

<script>
export default {
  name: "index",
  methods:{
    handleSelect(key, keyPath) {
      if (this.$route.path.indexOf(key) == -1) {
        this.$router.push(key)
      }
    }
  }

}
</script>

<style scoped>

</style>
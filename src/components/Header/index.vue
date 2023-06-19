<template>
  <el-container>
  <el-header>
    <!-- 导航菜单 -->
    <el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1">主页</el-menu-item>
  <el-menu-item index="1">班级模块</el-menu-item>
  <el-menu-item index="3" disabled>消息中心</el-menu-item>
  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
</el-menu>
  </el-header>
  <el-main>
    <router-view></router-view>
  </el-main>
</el-container>
</template>

<script>
export default {
  data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
};
</script>

<style scoped>

</style>
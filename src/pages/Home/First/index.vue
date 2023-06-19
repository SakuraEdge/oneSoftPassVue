<template>
  <body>
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
               style = "width: 100%;">
        <el-menu-item index="./#" style="color: black">首页</el-menu-item>
        <el-menu-item index="/studytest" style = "color:black;">编码转换</el-menu-item>
        <el-menu-item index="/money" style = "color:black;">货币汇率</el-menu-item>
        <el-menu-item index="/code" style = "color:black;">代码生成</el-menu-item>
        <el-menu-item index="/datasource" style = "color:black;">数据库表</el-menu-item>
        <el-menu-item index="/tools" style = "color:black;">实用工具</el-menu-item>
        <el-menu-item index="/web" style = "color:black;">常用网站</el-menu-item>
        <el-menu-item index="/word" style = "color:black;">开发文档</el-menu-item>
        <!-- <el-menu-item index="/images">图片上传</el-menu-item> -->
        <!-- 头像 -->
      </el-menu>
    </el-header>
  </el-container>
  <div class="homepage">
    <div class="main">
      <div class="content" style="font-size: 16px">
        <section class="board board-index">
          <div class="left-text">
            <h2 class="bigtext">壹软通Plus</h2>
            <h3 class="middletext">方便，轻松，快捷</h3>
            <div class="actions">
              <a href="/person" class="btn">注册/登录</a>
              <a href="/class" class="btn">开始使用</a>
            </div>
          </div>
          <a class="float-down" href="#"></a>
        </section>
        <section class="board board-intro" style="--bg: url(https://nyat-static.globalslb.net/natfrp/index/bg2.jpg)">
          <a href="#" class="title-bar">
            <div class="bg"></div>
            <span> 介绍</span>
          </a>
          <div class="bg"></div>
          <div class="left-text">
            <div class="middletext">这是一款什么软件？</div>
            如你所见，这是一个集众多功能为一体的多功能应用平台<br><br>在这里，可以极大的便利计算机人员开发的速度...
          </div>
          <div class="right-pic">
          </div>
          <a class="float-down" href="#"></a>
        </section>
        <section class="board board-price" style="--bg: url(https://nyat-static.globalslb.net/natfrp/index/bg3.jpg)">
          <a href="#" class="title-bar">
            <div class="bg"></div>
            <span> Tags</span>
          </a>
          <div class="bg"></div>
          <div class="left-text">
            <div class="middletext">耽误的事情太多</div>
            事情可就做不完了<br><br>劳逸结合是不错，但可别放松过头
          </div>
          <div class="right-pic">

          </div>
          <a class="float-down" href="#"></a>



        </section>
        <section class="board board-about">
          <a href="#" id="about" class="title-bar">
            <div class="bg" id="about-bg-s"></div>
            <span> 关于</span>
          </a>

          <div class="bg" id="about-bg"></div>
          <div class="left-text">
            <div class="middletext">壹软通Plus(Version 3.0) 由 <br id="mobile-br">谢利杰进行开发</div>
            <br>
            <br>
            <span id="comname">安徽信息工程学院 </span> · 产业学院

            <div style="margin-top: 40px" class="actions">
              <a href="#" class="btn">QQ邮箱</a>
              <a href="#" class="btn">返回顶部</a>
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>
  </body>
</template>

<script>
import '@/css/index.css'

export default {
  name: "index",
  methods:{
    handleSelect(key, keyPath) {
      if (this.$route.path.indexOf(key) === -1) {
        this.$router.push(key)
      }
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <div id="">
    <!-- <Header></Header> -->
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
// js
import drawMixin from '@/utils/drawMixin.js'
export default {
  name: 'App',
  components: {
  },
  mounted() {
    var browerWidth = window.innerWidth; //浏览器可视宽度
    var baseWidth = 1920; //设计稿宽度
    var zoomValue = browerWidth / baseWidth; //缩放比例计算
    document.getElementById("mainContainer").style.transform = "scale(" + zoomValue + "," + zoomValue + ")"; //mainContainer为主容器id
    window.onresize = function () { //窗口尺寸变化时，重新计算和缩放
      browerWidth = window.innerWidth;
      zoomValue = browerWidth / baseWidth;
      document.getElementById("mainContainer").style.transform = "scale(" + zoomValue + "," + zoomValue + ")";
    }
  }


  // data () {
  //   return {
  //     data: 'data from the server'
  //   }
  // },
  // mounted: function () {
  //   this.getData()
  // },

  // methods: {
  //   getData () {
  //     console.log('-------getData')
  //     this.$axios.get('/setting/qx/user/hello')
  //       .then(response => {
  //         console.log(response)
  //         console.log(this)
  //         this.data = response.data
  //       }, response => {
  //         console.log('错误...')
  //       })
  //   }
  // }
}
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  background: rgb(24, 25, 35);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

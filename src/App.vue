<template>
  <div id="">
    <!-- <Header></Header> -->
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
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

</style>

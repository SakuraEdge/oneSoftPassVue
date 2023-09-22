<template>
<h1 style="padding-top: 15%;padding-left: 45%">施工中......</h1>
</template>

<script>
import cookie from "@/js/cookie";

export default {
  name: "code",
  created() {
    if (cookie.getCookie("id") == null){
      this.$router.push('/change');
      this.nullLogin()
    }
  },
  methods: {
    nullLogin() {
      this.$notify({
        title: '该应用仅登录后使用',
        message: '请先登录账号',
        showClose: false,
        type: "error",
        duration: 2000
      })
    }
  }
}
</script>

<style scoped>

</style>
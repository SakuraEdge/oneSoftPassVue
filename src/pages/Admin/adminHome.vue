<template>
  <div>
    <div id="userInfo"></div>
  </div>
</template>

<script>
export default{
  name: 'adminHome',
  data () {
    return {
      chart: null,
      options: {}
    }
  },
  mounted () {
    this.initOptions()
    this.initCharts()
  },
  methods: {
    initOptions () {
      this.options = {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 5,
                name: '普通用户'
              },
              {
                value: 1,
                name: 'VIP用户'
              },
              {
                value: 2,
                name: '管理员'
              }
            ],
            radius: '50%'
          }
        ]
      }
    },
    initCharts () {
      this.chart = this.$echarts.init(document.getElementById('userInfo'))
      this.chart.setOption(this.options)
    }
  }
}
</script>

<style scoped>
#userInfo{
  width: 400px;
  height: 400px;
}
</style>
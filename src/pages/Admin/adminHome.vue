<template>
  <div>
    <el-card>
      <div slot="header" style="font-weight: 600;font-size: 18px">
        管理信息一览
      </div>
      <span id="userInfo"></span>
      <span id="userInfo2"></span>
      <div class="info-bar">
        <div  class="info-text">
          <el-card>总用户数： 13</el-card>
        </div>
        <div  class="info-text">
          <el-card>管理员数： 2</el-card>
        </div>
        <div  class="info-text">
          <el-card>需审批信息数： 16</el-card>
        </div>
      </div>
    </el-card>

  </div>
</template>

<script>
export default{
  name: 'adminHome',
  data () {
    return {
      chart: null,
      chart2: null,
      options: {},
      options2: {}
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
      this.options2 = {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 6,
                name: '存续用户'
              },
              {
                value: 1,
                name: '注销用户'
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
      this.chart2 = this.$echarts.init(document.getElementById('userInfo2'))
      this.chart2.setOption(this.options2)
    }
  }
}
</script>

<style scoped>
#userInfo {
  width: 400px;
  height: 400px;
  float: left;
}
#userInfo2 {
  width: 400px;
  height: 400px;
  float: left;
}
.info-bar {
  float: right;
  font-weight: 600;
  padding-top: 7%;
  padding-right: 3%;
}
.info-text {
  padding-top: 5%;
}
</style>
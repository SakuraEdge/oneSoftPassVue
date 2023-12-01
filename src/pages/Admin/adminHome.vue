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
          <el-card>总用户数： {{allNum}}</el-card>
        </div>
        <div  class="info-text">
          <el-card>管理员数： {{adminNum}}</el-card>
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
      userNum: {},
      adminNum: 0,
      allNum: 0,
      chart: null,
      chart2: null,
      options: {},
      options2: {}
    }
  },
  mounted () {
    this.getUserNum()


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
                value: parseInt(this.userNum['normalNum']),
                name: '普通用户'
              },
              {
                value: parseInt(this.userNum['VIPNum']),
                name: 'VIP用户'
              },
              {
                value: parseInt(this.userNum['sVIPNum']),
                name: 'SVIP用户'
              },
              {
                value: parseInt(this.userNum['tVIPNum']),
                name: '至尊用户'
              },
              {
                value: parseInt(this.userNum['adminNum']),
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
                value: parseInt(this.userNum['existNum']),
                name: '存续用户'
              },
              {
                value: parseInt(this.userNum['closeNum']),
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
    },
    getUserNum() {
      this.$axios.post("/getUserNum",{

      }).then(res=>{
        this.userNum = res.data.result
        this.adminNum = parseInt(this.userNum['adminNum'])
        this.allNum = parseInt(this.userNum['allNum'])
        this.initOptions()
        this.initCharts()
      })
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
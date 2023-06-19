<template>
  <div>
    <el-image :src=homework[num] style = "margin-left: 400px; width: 500px;height: 680px">
    </el-image>
    <div class="right">
      <!-- 进度条 -->
      <div
        style="width:auto; padding-top: 10px;padding-left: 15px;padding-bottom: 10px;border-bottom: 1px solid #dbdbdb;">
        <span style="color:#d7cece;font-size:0.5rem;">当前互评进度：</span>
        <span style="font-size: 0.5rem;">{{ num + 1 }}/5</span>
        <el-progress :percentage="percentage" :color="customColor"></el-progress>
      </div>
      <!-- 匿名 -->
      <div
        style="margin-top: 15px;padding-left: 15px;padding-right: 15px;padding-bottom: 15px;display:flex;justify-content:space-between;border-bottom: 1px solid #dbdbdb">
        <span>匿名</span>
        <span v-if="!isSpeak" style="color: red;">未评价</span>
        <span v-if="isSpeak" style="color: blue;">已评价</span>
      </div>
      <!-- 批阅区 -->
      <div
        style="margin-top:20px;height:245px;width:90%;background-color:white;margin-left:2.5%;padding-top:10px;padding-left:15px;">
        <span>互评批阅区</span>
        <!-- 评分 -->
        <div style="margin-top:10px;">
          <span style="font-size: 0.6rem;">评分:</span>
          <input style="margin-left:5px;width: 70px;height: 25px;text-align:center;" v-model="score" placeholder="0-100">
          <span style="font-size: 0.6rem;margin-left:5px">分</span>
        </div>
        <!-- 评语 -->
        <div style="margin-top:5px;">
          <span style="font-size: 0.6rem;">评语:</span>
          <textarea
            style="width:93%;height:100px;margin-right:10px;margin-top:10px;border:1px solid #dbdbdb;text-align:justify;resize:none"
            v-model="speak" placeholder="选填，教师、被评价人可见，最多200字符">
          </textarea>
          <div style="font-size:0.6rem;margin-top:10px;color:#e6a23c;">
            本次评价为匿名评价
          </div>
        </div>
      </div>
      <!-- 提交 -->
      <div
        style="margin-top: 15px;padding-left: 15px;padding-right: 15px;padding-bottom: 15px;display:flex;justify-content:space-between">
        <button style="background-color:white;border:1px solid #dbdbdb;width: 80px;" @click="reduce"
          v-if="num > 0">上一个</button>
        <button style="width: 80px;border:none;background-color:blue;color:white;" @click="save">保存</button>
        <button style="background-color:white;border:1px solid #dbdbdb;width: 80px;" @click="add"
          v-if="num < 4">下一个</button>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import homework1 from "@/assets/images/homework1.png"
import homework2 from "@/assets/images/homework2.png"
import homework3 from "@/assets/images/homework3.png"
import homework4 from "@/assets/images/homework4.png"
import homework5 from "@/assets/images/homework5.png"

export default {
  data() {
    return {
      percentage: 20,
      customColor: '#409eff',
      score: '',
      speak: '',
      uidList: [],
      num: 0,
      isSpeak: false,
      homework:[homework1,homework2,homework3,homework4,homework5]
    };
  },
  methods: {
    open1() {
      this.$notify({
        title: '保存成功！',
        message: this.msg,
        type: 'success'
      })
    },
    // 保存提交互评结果
    save() {
      this.uidList.forEach((item, index) => {
        if (this.num === index) {
          // 提交互评结果
          this.$axios
            .post('/mutual/insertMutual', {
              id: Cookies.get('uid'),
              tid: item,
              score: this.score,
              comment: this.speak,
              tCode: this.$route.params.tcode
            }).then(response => {
              console.log(response)
            })
        }
      })
      this.score = ''
      this.speak = ''
      this.isSpeak = true
      this.open1()
    },
    add() {
      this.num++
      this.percentage += 20
      this.score = ''
      this.speak = ''
      this.isSpeak = false
    },
    reduce() {
      this.num--
      this.percentage -= 20
      this.score = ''
      this.speak = ''
      this.isSpeak = true
    }
  },
  created() {
    // 获得互评作业
    this.$axios
      .post('/mutual/selectMutualUser', {
        id: Cookies.get('uid'),
        tCode: this.$route.params.tcode
      }).then(response => {
        if (response.data.code === '500') {
          return
        } else {
          console.log(response)
          response.data.result.forEach((item, index) => {
            this.uidList.push(item)
          })
        }
      })
  }
};
</script>

<style scoped>
.right {
  width: 20%;
  height: 680px;
  float: right;
  background-color: #F8F8F8;
}
</style>
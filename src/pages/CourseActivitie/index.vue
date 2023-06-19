<template>
  <el-container>
    <el-header style="height: 100px">
      <div style="display: flex; margin-left: 150px;margin-top: 10px;">
        <el-image :src=hehe style="width: 120px; height: 90px;border-radius: 10px;"></el-image>
        <span style="color: black;font-weight: 700;font-size: 18px;margin-left: 20px;">{{ course.courseName + '_' +
          course.className + '_' +
          course.mainTeacher
        }}</span>
        <div style="display: inline-block;height: 50px;width: 1020px;margin-top: 40px;border-radius: 5px;background-color: rgba(209,209,209,0.2);margin-left: -20%;">
          <span style="margin-left: 10px;color:gray;font-size: 13px">主讲：</span>
          <span style="font-size: 13px">{{ course.mainTeacher}}</span>
          <span style="font-size: 13px;margin-left: 168px;color: gray" v-if="course.assistTeacher != null">助教：</span>
          <span style="font-size: 13px;">{{ course.assistTeacher}}</span><br>
          <span style="margin-left: 10px;color: gray;font-size: 13px">学期：</span>
          <span style="font-size: 13px">{{ course.year + '-' +
          (Number(course.year) + 1) + '学年'
          + ' 第' + course.term + "学期" }}</span>
          <span style="margin-left: 34px;font-size: 13px;color: gray">课程：<span style="color: black">{{ course.courseName }}</span></span>
          <span style="margin-left: 34px;font-size: 13px;color: gray">班级：<span style="color: black">{{ course.className }}</span></span>
        </div>
      </div>
    </el-header>
    <el-main>
      <el-card style="width: 73%;height:1000px;border-radius: 20px;margin-top:10px;margin-left:200px;">
        <div slot="header">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" style="margin-top: -20px"
            @select="handleSelect">
            <el-menu-item index="1" style="font-size: 15px; font-weight: 550;">课表计划</el-menu-item>
            <el-menu-item index="2" style="font-size: 15px; font-weight: 550;">教学活动</el-menu-item>
            <el-menu-item index="3" style="font-size: 15px; font-weight: 550;">实景课堂</el-menu-item>
            <el-menu-item index="4" style="font-size: 15px; font-weight: 550;">知识点</el-menu-item>
          </el-menu>
          <div v-for="(item, index) in testList" :key="index">
            <el-card style="margin-top: 20px;background-color: rgba(209,209,209,0.1)" v-if="show1">
              <div style="width: auto; height: 40px; display: flex;">
                <el-avatar :src="studytest_icon" :size="40"
                  style="margin-top: -10px;background-color: unset"></el-avatar>
                <span style="width:100px;margin-left: -43px;margin-top: 35px;font-weight: 550;font-size: 12px;">{{ item.type
                }}</span>
                <span
                  style="width:500px;margin-top: -10px; margin-left: -30px;font-weight: 550;font-size: 15px;">{{
                    item.tName }}_{{ item.type }}_{{ item.createTime.substring(0, 10).replaceAll('-', '') }}</span>
                <div style="margin-top: 32px; margin-left: -500px;font-size: 8px;width: 600px">
                  <span>开课：{{item.course }}</span>
                  <span style="margin-left: 20px">发布人：{{item.teacherName }}</span>
                  <span style="margin-left: 20px">发布时间：{{item.createTime.substring(5, 16) }}</span>
                  <span style="margin-left: 20px;">提交截至时间：{{item.endTime.substring(5, 16) }}</span>
                </div>

                <span
                  style="margin-left: -80px;margin-top: 32px;height: 17px;width: 46px;font-weight: 550; background-color: rgba(135,206,235,0.2); font-size: 0.5rem;color: #5a8cff;border: 1px solid #87ceeb;"
                  v-if="item.active === '进行中'"><span style="margin: 2px">{{
                    item.active }}</span></span>
                <span
                  style="margin-left: -80px;margin-top: 32px;height: 17px;width: 46px;font-weight: 550; background-color: rgba(128,128,128,0.1); font-size: 0.5rem;color: rgba(128,128,128,0.6);border: 1px solid rgba(128,128,128,0.1);"
                  v-if="item.active === '已结束'"><span style="margin: 2px">{{
                    item.active }}</span></span>
<!--                <span-->
<!--                  style="margin-left: 20px; margin-top: 45px; height: 17px; font-size: 0.7rem;color: #FF0033;border: 1px solid #C0C0C0;font-family: STKAITI"-->
<!--                  v-if="item.tReSubmit != 0">被打回</span>-->
                <span style="margin-top: 5px;margin-left: 105px; font-size: 13px;width:50px;color: orange; font-weight: 550"
                  v-if="item.active === '进行中'">待完成</span>
                <span style="margin-top: 5px;margin-left: 105px; font-size: 13px;width:50px;font-weight: 550;color: gray"
                  v-if="item.active === '已结束' && item.T_TEACHER_SCORE == null">已提交</span>
                <div style="margin-left: 100px;margin-top: 5px;font-size: 1rem;"
                     v-if="item.T_TEACHER_SCORE != null">成绩
                  <span v-if="item.T_TEACHER_SCORE < 60" style="color: red">
                    {{ item.T_TEACHER_SCORE }}</span>
                  <span v-if="item.T_TEACHER_SCORE >= 60" style="color: blue">
                      {{ item.T_TEACHER_SCORE }}</span>
                </div>
                <div style="display: flex; justify-content: space-between; width: 190px; ">
                  <span
                    style="margin-top: 30px; margin-left: -70px;font-size: 11px;font-weight: 550;color: black;">{{
                      item.percent
                    }}<span style="color: #B0B0B0">同学已完成</span></span>
                  <router-link :to="{ name: 'finishomework', params: { tcode: item.tCode, tid: item.id } }">
                    <div style="margin-top: 15px;border-radius: 5px;height: 30px;margin-left: 110px"
                               type="text" v-if="item.active === '进行中'"><span style="margin-right: 10px;color: rgba(70,90,255,0.85);font-size: 13px">去完成</span></div>
                  </router-link>
                  <router-link :to="{ name: 'finishomework', params: { tcode: item.tCode, tid: item.id } }">
                    <el-button style="margin-top: 5px;border-radius: 5px;height: 30px;"
                               type="text" v-if="item.active === '已结束'"><span style="margin-left: 10px;margin-right: 10px;color: rgba(70,90,255,0.85);font-size: 13px">查看</span></el-button>
                  </router-link>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>
 
<script>
import Cookies from 'js-cookie'
import hehe from '@/assets/images/course.png'
import studytest_icon from "@/assets/images/studytest_icon.png"

export default {
  data() {
    return {
      studytest_icon: studytest_icon,
      hehe: hehe,
      course: {},
      activeIndex: '2',
      show1: true,
      show2: false,
      show3: false,
      show4: false,
      opening1: true,
      opening3: false,
      opening4: false,
      testList: []
    };

  },
  methods: {
    handleSelect(key) {
      if (key === 1) {
        if (!this.show1) {
          this.show1 = true;
          this.show2 = false;
          this.show3 = false;
          this.show4 = false;
        }
      } else if (key === 2) {
        if (!this.show2) {
          this.show2 = true;
          this.show1 = false;
          this.show3 = false;
          this.show4 = false;
        }
      } else if (key === 3) {
        if (!this.show3) {
          this.show3 = true;
          this.show1 = false;
          this.show2 = false;
          this.show4 = false;
        }
      } else if (key === 4) {
        if (!this.show1) {
          this.show4 = true;
          this.show1 = false;
          this.show2 = false;
          this.show3 = false;
        }
      }
    }
  },
  created() {
    this.course = this.$route.params.course
    if (this.course.term === 1) {
      this.course.term = '春季学期'
    } else if (this.course.term === 2) {
      this.course.term = '夏季学期'
    } else if (this.course.term === 3) {
      this.course.term = '秋季学期'
    } else if (this.course.term === 4) {
      this.course.term = '冬季学期'
    }

    // 获取所有任务
    this.$axios
      .post('task/selectTaskInfoByCourseID', {
        id: Cookies.get('uid'),
        cid: this.course.id
      }).then(response => {
        if (response.data.code === 500) {

        } else {
          // console.log(response)
          // console.log(Cookies.get('uid'))
          // console.log(this.course.id)
          response.data.result.forEach((item, index) => {
            if (item.active === '0') {
              item.active = '进行中'
            } else {
              item.active = '已结束'
            }
            this.testList.push(item)
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
};
</script>

<style scoped lang="scss">

.el-main {
  padding: 10px;
}
</style>
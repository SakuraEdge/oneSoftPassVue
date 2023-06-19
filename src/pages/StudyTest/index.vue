<template>
  <el-container>
    <el-header style="margin-top: 10px;vertical-align: middle;height: 15px;text-align: center; font-size: 15px;font-weight: 550;background-color: white">
      学习任务
    </el-header>
    <el-main>
      <el-card style="width: 79%;height:1000px;border-radius: 20px;margin-top:10px;margin-left:150px;">
        <div slot="header">
          <el-menu :default-active="activeIndex" class="menuBox"  mode="horizontal" @select="handleSelect" style="font-weight: 550">
            <el-menu-item index="1">全部</el-menu-item>
            <el-menu-item index="2">待完成</el-menu-item>
            <el-menu-item index="3">已完成</el-menu-item>
            <el-menu-item index="4">已过期</el-menu-item>
          </el-menu>
          <!-- show1 -->
          <div v-for="(item, index) in testList" :key="index">
            <el-card style="margin-top: 20px;background-color: rgba(209,209,209,0.1)" v-if="show1">
              <div style="width: auto; height: 40px; display: flex;">
                <el-avatar :src="studytest_icon" slot="reference"
                  style="margin-top: -10px;background-color: unset"></el-avatar>
                <span style="width:100px;margin-left: -43px;margin-top: 35px;font-weight: 550;font-size: 12px;">{{ item.type
                }}</span>
                <!-- <span style="margin-top: 53px; margin-left: -63px;font-size: 1rem;font-family: STKAITI;">期末作业</span> -->
                <div style="display: inline-block;width: 600px;font-size: 8px;">
                  <span style="font-weight: 550;font-size: 14px;">{{
                    item.course }}_{{ item.type }}_{{ item.createTime.substring(0, 10).replaceAll('-', '') }}</span>
                  <span
                    style="margin-left: 10px; height: 17px; font-size: 0.7rem;border: 1px solid #B0B0B0;"
                    v-if="item.active === '已结束'">{{
                      item.active }}</span>
                  <span
                    style="margin-left: 10px; height: 17px; font-size: 0.7rem;color: #3333FF;border: 1px solid #B0B0B0;"
                    v-if="item.active === '进行中'">{{
                      item.active }}</span>
                  <span
                    style="margin-left: 10px; margin-top: -7px; height: 17px; font-size: 0.7rem;color: #FF0033;border: 1px solid #C0C0C0;font-family: STKAITI"
                    v-if="item.tReSubmit === '1'">被打回</span>
                  <span
                    style="margin-left: 10px; margin-top: -7px; height: 17px; font-size: 0.7rem;border: 1px solid #C0C0C0;font-family: STKAITI"
                    v-if="Date.parse(item.endTime) < new Date() && item.active === '0'">已过期</span><br><br>
                  <span
                    style="margin-left: 20px;margin-top: 45px;font-weight: 530;font-size: 8px;">开课：{{
                      item.course }}</span>
                  <span
                    style="margin-top: 45px; margin-left: 30px;font-weight: 530;font-size: 8px;">发布人：{{
                      item.teacher }}</span>
                  <div
                    style="margin-top: 45px; margin-left: 30px;font-weight: 530;font-size: 8px;">发布时间：{{
                      item.createTime.substring(5, 16) }}</div>
                </div>
                <div style="width: 200px;margin-top: 10px;font-size: 8px;">
                  <div
                    style="">提交截至时间：{{
                      item.endTime.substring(5, 16) }}</div>
                  <div
                    style=""
                    v-if="item.T_TIME_OTHER != null">自评/互评截至时间：{{
                      item.T_TIME_OTHER.substring(5, 16) }}</div>
                  <div
                    style="">自评/互评截至时间：9-2
                    13:20</div>
                  </div>
                <div style="width: 100px; margin-top: 5px">
                  <div style="margin-top: 5px;margin-left: 20px;font-size: 13px;width:50px;color: orange; font-weight: 550"
                    v-if="item.active === '进行中'">待完成</div>
                  <div style="margin-top: 5px;margin-left: 20px;font-size: 13px;width:50px;font-weight: 550;color: gray;"
                    v-if="item.active === '已结束' && item.T_TEACHER_SCORE == null">已完成</div>
                  <div style="margin-left: 10px;margin-top: 5px;font-size: 1rem;"
                    v-if="item.T_TEACHER_SCORE != null">成绩
                    <span v-if="item.T_TEACHER_SCORE < 60" style="color: red">
                    {{ item.T_TEACHER_SCORE }}</span>
                    <span v-if="item.T_TEACHER_SCORE >= 60" style="color: blue">
                      {{ item.T_TEACHER_SCORE }}</span>
                    </div>
                  <div
                    style="font-size: 11px;font-weight: 550;color: black;">{{
                      parseFloat(item.percent).toFixed(0)
                    }}%同学已完成</div>

                </div>
                <span style="width: 25px;margin-top: 5px;margin-left: 50px">
                  <router-link style="" :to="{ name: 'finishomework', params: { tcode: item.tCode, tid: item.id } }">
                   <el-button style="height: 30px;"
                              type="text"><div style="margin-left: 10px;margin-right: 10px;color: rgba(70,90,255,0.85);font-size: 13px">查看</div></el-button>
                  </router-link></span>

              </div>
            </el-card>
          </div>
          <!-- show2 -->
          <div v-for="(item, index) in testList" :key="index">
            <el-card style="margin-top: 20px;" v-if="show2 && item.active === '进行中'">
              <div style="width: auto; height: 40px; display: flex;">
                <el-avatar :src="studytest_icon" slot="reference"
                           style="margin-top: -10px;background-color: unset"></el-avatar>
                <span style="width:100px;margin-left: -43px;margin-top: 35px;font-weight: 550;font-size: 12px;">{{ item.type
                  }}</span>
                <!-- <span style="margin-top: 53px; margin-left: -63px;font-size: 1rem;font-family: STKAITI;">期末作业</span> -->
                <div style="display: inline-block;width: 600px;font-size: 8px;">
                  <span style="font-weight: 550;font-size: 14px;">{{
                      item.course }}_{{ item.type }}_{{ item.createTime.substring(0, 10).replaceAll('-', '') }}</span>
                  <span
                      style="margin-left: 10px; height: 17px; font-size: 0.7rem;border: 1px solid #B0B0B0;"
                      v-if="item.active === '已结束'">{{
                      item.active }}</span>
                  <span
                      style="margin-left: 10px; height: 17px; font-size: 0.7rem;color: #3333FF;border: 1px solid #B0B0B0;"
                      v-if="item.active === '进行中'">{{
                      item.active }}</span>
                  <span
                      style="margin-left: 10px; margin-top: -7px; height: 17px; font-size: 0.7rem;color: #FF0033;border: 1px solid #C0C0C0;font-family: STKAITI"
                      v-if="item.tReSubmit !== '0'">被打回</span>
                  <span
                      style="margin-left: 10px; margin-top: -7px; height: 17px; font-size: 0.7rem;border: 1px solid #C0C0C0;font-family: STKAITI"
                      v-if="Date.parse(item.endTime) < new Date() && item.active === '0'">已过期</span><br><br>
                  <span
                      style="margin-left: 20px;margin-top: 45px;font-weight: 530;font-size: 8px;">开课：{{
                      item.course }}</span>
                  <span
                      style="margin-top: 45px; margin-left: 30px;font-weight: 530;font-size: 8px;">发布人：{{
                      item.teacher }}</span>
                  <div
                      style="margin-top: 45px; margin-left: 30px;font-weight: 530;font-size: 8px;">发布时间：{{
                      item.createTime.substring(5, 16) }}</div>
                </div>
                <div style="width: 200px;margin-top: 10px;font-size: 8px;">
                  <div
                      style="">提交截至时间：{{
                      item.endTime.substring(5, 16) }}</div>
                  <div
                      style=""
                      v-if="item.T_TIME_OTHER != null">自评/互评截至时间：{{
                      item.T_TIME_OTHER.substring(5, 16) }}</div>
                  <div
                      style="">自评/互评截至时间：9-2
                    13:20</div>
                </div>
                <div style="width: 100px; margin-top: 5px">
                  <div style="margin-top: 5px;margin-left: 20px;font-size: 13px;width:50px;color: orange; font-weight: 550"
                       v-if="item.active === '进行中'">待完成</div>
                  <div style="margin-top: 5px;margin-left: 20px;font-size: 13px;width:50px;font-weight: 550;color: gray;"
                       v-if="item.active === '已结束' && item.T_TEACHER_SCORE == null">已完成</div>
                  <div style="margin-left: 10px;margin-top: 5px;font-size: 1rem;"
                       v-if="item.T_TEACHER_SCORE != null">成绩
                    <span v-if="item.T_TEACHER_SCORE < 60" style="color: red">
                    {{ item.T_TEACHER_SCORE }}</span>
                    <span v-if="item.T_TEACHER_SCORE >= 60" style="color: blue">
                      {{ item.T_TEACHER_SCORE }}</span>
                  </div>
                  <div
                      style="font-size: 11px;font-weight: 550;color: black;">{{
                      parseFloat(item.percent).toFixed(0)
                    }}%同学已完成</div>

                </div>
                <span style="width: 25px;margin-top: 5px;margin-left: 50px">
                  <router-link style="" :to="{ name: 'finishomework', params: { tcode: item.tCode, tid: item.id } }">
                   <el-button style="height: 30px;"
                              type="text"><div style="margin-left: 10px;margin-right: 10px;color: rgba(70,90,255,0.85);font-size: 13px">查看</div></el-button>
                  </router-link></span>

              </div>
            </el-card>
          </div>
          <!-- show3 -->
          <div v-for="(item, index) in testList" :key="'info3-' + index">
            <el-card style="margin-top: 20px;" v-if="show3 && item.active == '已结束'">
              <div style="width: auto; height: 40px; display: flex;">
                <el-avatar :src="studytest_icon" slot="reference"
                           style="margin-top: -10px;background-color: unset"></el-avatar>
                <span style="width:100px;margin-left: -43px;margin-top: 35px;font-weight: 550;font-size: 12px;">{{ item.type
                  }}</span>
                <!-- <span style="margin-top: 53px; margin-left: -63px;font-size: 1rem;font-family: STKAITI;">期末作业</span> -->
                <div style="display: inline-block;width: 600px;font-size: 8px;">
                  <span style="font-weight: 550;font-size: 14px;">{{
                      item.course }}_{{ item.type }}_{{ item.createTime.substring(0, 10).replaceAll('-', '') }}</span>
                  <span
                      style="margin-left: 10px; height: 17px; font-size: 0.7rem;border: 1px solid #B0B0B0;"
                      v-if="item.active === '已结束'">{{
                      item.active }}</span>
                  <span
                      style="margin-left: 10px; height: 17px; font-size: 0.7rem;color: #3333FF;border: 1px solid #B0B0B0;"
                      v-if="item.active === '进行中'">{{
                      item.active }}</span>
                  <span
                      style="margin-left: 10px; margin-top: -7px; height: 17px; font-size: 0.7rem;color: #FF0033;border: 1px solid #C0C0C0;font-family: STKAITI"
                      v-if="item.tReSubmit !== '0'">被打回</span>
                  <span
                      style="margin-left: 10px; margin-top: -7px; height: 17px; font-size: 0.7rem;border: 1px solid #C0C0C0;font-family: STKAITI"
                      v-if="Date.parse(item.endTime) < new Date() && item.active === '0'">已过期</span><br><br>
                  <span
                      style="margin-left: 20px;margin-top: 45px;font-weight: 530;font-size: 8px;">开课：{{
                      item.course }}</span>
                  <span
                      style="margin-top: 45px; margin-left: 30px;font-weight: 530;font-size: 8px;">发布人：{{
                      item.teacher }}</span>
                  <div
                      style="margin-top: 45px; margin-left: 30px;font-weight: 530;font-size: 8px;">发布时间：{{
                      item.createTime.substring(5, 16) }}</div>
                </div>
                <div style="width: 200px;margin-top: 10px;font-size: 8px;">
                  <div
                      style="">提交截至时间：{{
                      item.endTime.substring(5, 16) }}</div>
                  <div
                      style=""
                      v-if="item.T_TIME_OTHER != null">自评/互评截至时间：{{
                      item.T_TIME_OTHER.substring(5, 16) }}</div>
                  <div
                      style="">自评/互评截至时间：9-2
                    13:20</div>
                </div>
                <div style="width: 100px; margin-top: 5px">
                  <div style="margin-top: 5px;margin-left: 20px;font-size: 13px;width:50px;color: orange; font-weight: 550"
                       v-if="item.active === '进行中'">待完成</div>
                  <div style="margin-top: 5px;margin-left: 20px;font-size: 13px;width:50px;font-weight: 550;color: gray;"
                       v-if="item.active === '已结束' && item.T_TEACHER_SCORE == null">已完成</div>
                  <div style="margin-left: 10px;margin-top: 5px;font-size: 1rem;"
                       v-if="item.T_TEACHER_SCORE != null">成绩
                    <span v-if="item.T_TEACHER_SCORE < 60" style="color: red">
                    {{ item.T_TEACHER_SCORE }}</span>
                    <span v-if="item.T_TEACHER_SCORE >= 60" style="color: blue">
                      {{ item.T_TEACHER_SCORE }}</span>
                  </div>
                  <div
                      style="font-size: 11px;font-weight: 550;color: black;">{{
                      parseFloat(item.percent).toFixed(0)
                    }}%同学已完成</div>

                </div>
                <span style="width: 25px;margin-top: 5px;margin-left: 50px">
                  <router-link style="" :to="{ name: 'finishomework', params: { tcode: item.tCode, tid: item.id } }">
                   <el-button style="height: 30px;"
                              type="text"><div style="margin-left: 10px;margin-right: 10px;color: rgba(70,90,255,0.85);font-size: 13px">查看</div></el-button>
                  </router-link></span>

              </div>
            </el-card>
          </div>
          <!-- show4 -->
          <div v-for="(item, index) in testList" :key="'info4-' + index">
            <el-card style="margin-top: 20px;"
              v-if="show4 && Date.parse(item.endTime) < new Date() && item.active == 0">
              <div style="width: auto; height: 40px; display: flex;">
                <el-avatar :src="studytest_icon" slot="reference"
                           style="margin-top: -10px;background-color: unset"></el-avatar>
                <span style="width:100px;margin-left: -43px;margin-top: 35px;font-weight: 550;font-size: 12px;">{{ item.type
                  }}</span>
                <!-- <span style="margin-top: 53px; margin-left: -63px;font-size: 1rem;font-family: STKAITI;">期末作业</span> -->
                <div style="display: inline-block;width: 600px;font-size: 8px;">
                  <span style="font-weight: 550;font-size: 14px;">{{
                      item.course }}_{{ item.type }}_{{ item.createTime.substring(0, 10).replaceAll('-', '') }}</span>
                  <span
                      style="margin-left: 10px; height: 17px; font-size: 0.7rem;border: 1px solid #B0B0B0;"
                      v-if="item.active === '已结束'">{{
                      item.active }}</span>
                  <span
                      style="margin-left: 10px; height: 17px; font-size: 0.7rem;color: #3333FF;border: 1px solid #B0B0B0;"
                      v-if="item.active === '进行中'">{{
                      item.active }}</span>
                  <span
                      style="margin-left: 10px; margin-top: -7px; height: 17px; font-size: 0.7rem;color: #FF0033;border: 1px solid #C0C0C0;font-family: STKAITI"
                      v-if="item.tReSubmit !== '0'">被打回</span>
                  <span
                      style="margin-left: 10px; margin-top: -7px; height: 17px; font-size: 0.7rem;border: 1px solid #C0C0C0;font-family: STKAITI"
                      v-if="Date.parse(item.endTime) < new Date() && item.active === '0'">已过期</span><br><br>
                  <span
                      style="margin-left: 20px;margin-top: 45px;font-weight: 530;font-size: 8px;">开课：{{
                      item.course }}</span>
                  <span
                      style="margin-top: 45px; margin-left: 30px;font-weight: 530;font-size: 8px;">发布人：{{
                      item.teacher }}</span>
                  <div
                      style="margin-top: 45px; margin-left: 30px;font-weight: 530;font-size: 8px;">发布时间：{{
                      item.createTime.substring(5, 16) }}</div>
                </div>
                <div style="width: 200px;margin-top: 10px;font-size: 8px;">
                  <div
                      style="">提交截至时间：{{
                      item.endTime.substring(5, 16) }}</div>
                  <div
                      style=""
                      v-if="item.T_TIME_OTHER != null">自评/互评截至时间：{{
                      item.T_TIME_OTHER.substring(5, 16) }}</div>
                  <div
                      style="">自评/互评截至时间：9-2
                    13:20</div>
                </div>
                <div style="width: 100px; margin-top: 5px">
                  <div style="margin-top: 5px;margin-left: 20px;font-size: 13px;width:50px;color: orange; font-weight: 550"
                       v-if="item.active === '进行中'">待完成</div>
                  <div style="margin-top: 5px;margin-left: 20px;font-size: 13px;width:50px;font-weight: 550;color: gray;"
                       v-if="item.active === '已结束' && item.T_TEACHER_SCORE == null">已完成</div>
                  <div style="margin-left: 10px;margin-top: 5px;font-size: 1rem;"
                       v-if="item.T_TEACHER_SCORE != null">成绩
                    <span v-if="item.T_TEACHER_SCORE < 60" style="color: red">
                    {{ item.T_TEACHER_SCORE }}</span>
                    <span v-if="item.T_TEACHER_SCORE >= 60" style="color: blue">
                      {{ item.T_TEACHER_SCORE }}</span>
                  </div>
                  <div
                      style="font-size: 11px;font-weight: 550;color: black;">{{
                      parseFloat(item.percent).toFixed(0)
                    }}%同学已完成</div>

                </div>
                <span style="width: 25px;margin-top: 5px;margin-left: 50px">
                  <router-link style="" :to="{ name: 'finishomework', params: { tcode: item.tCode, tid: item.id } }">
                   <el-button style="height: 30px;"
                              type="text"><div style="margin-left: 10px;margin-right: 10px;color: rgba(70,90,255,0.85);font-size: 13px">查看</div></el-button>
                  </router-link></span>

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
import studytest_icon from "@/assets/images/studytest_icon.png"

export default {
  data() {
    return {
      studytest_icon: studytest_icon,
      activeIndex: '1',
      show1: true,
      show2: false,
      show3: false,
      show4: false,
      opening1: true,
      opening3: false,
      opening4: false,
      // inputStr: '',
      // options: [{
      //   value: '选项1',
      //   label: '2022-2023学年 春季学期'
      // }, {
      //   value: '选项2',
      //   label: '2022-2023学年 春季学期'
      // }, {
      //   value: '选项3',
      //   label: '2022-2023学年 春季学期'
      // }, {
      //   value: '选项4',
      //   label: '2022-2023学年 春季学期'
      // }, {
      //   value: '选项5',
      //   label: '2022-2023学年 春季学期'
      // }],
      // value: '',
      // ingOptions: [{
      //   value: '选项1',
      //   label: '进行中'
      // }, {
      //   value: '选项2',
      //   label: '未进行'
      // }],
      ing: '',
      testList: []
    };

  },
  methods: {
    handleSelect(key) {
      if (key == 1) {
        if (this.show1 == false) {
          this.show1 = true;
          this.show2 = false;
          this.show3 = false;
          this.show4 = false;
        }
      } else if (key == 2) {
        if (this.show2 == false) {
          this.show2 = true;
          this.show1 = false;
          this.show3 = false;
          this.show4 = false;
        }
      } else if (key == 3) {
        if (this.show3 == false) {
          this.show3 = true;
          this.show1 = false;
          this.show2 = false;
          this.show4 = false;
        }
      } else if (key == 4) {
        if (this.show1 == false) {
          this.show4 = true;
          this.show1 = false;
          this.show2 = false;
          this.show3 = false;
        }
      }
    }
  },
  created() {
    // 获取所有任务
    this.$axios
      .post('task/selectTaskInfo', {
        id: Cookies.get('uid')
      }).then(response => {
        if (response.data.code == 500) {
          return
        } else {
          console.log(response)
          response.data.result.forEach((item, index) => {
            if (item.active == 0) {
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


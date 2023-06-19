<template>
  <body style="margin: 1px;">
    <div class="homeleft">
      <el-card style="width: 95%; border-radius: 25px;padding-bottom: 12px">
        <div slot="header" style="width: auto;">
          <span style="float: right; font-size: 1.25rem;font-family: SIMLI;">安徽信息工程学院</span>
        </div>
        <div style="display: flex;">
          <el-avatar :src="imageUrl" slot="reference" style="width: 80px;height: 80px;margin-left: 20px;"></el-avatar>
          <span style="margin-left: 30px;font-size: 1.5rem;font-family: SIMLI;">{{ username }}</span>
          <span style="margin-top: 15px;font-size: 1rem;font-family: SIMLI;">同学，你好！</span>
          <span
            style="font-family: SIMLI;font-size: 1.3rem; margin-top: 45px;margin-left: -160px;border: 1px solid #3bd8da;padding: 5px;text-align: center;width: 400px;border-radius: 25px;">今日课程：3节
            (直播课2节 | 面授课1节)</span>
        </div>
      </el-card>
      <el-card style="width: 95%; height: 200px; border-radius: 25px;padding-bottom: 12px; margin-top: 20px;">
        <div slot="header" class="clearfix">
          <span style="font-size: 1.7rem; font-weight: 1000;">| </span>
          <span style="font-family: SIMLI; font-size: 2rem;">学习任务</span>
          <span style="font-family: SIMLI; font-weight: 1000;">({{ testNum }})</span>
          <router-link target="_blank" :to="{ path: '/studytest' }"
            style="color: black; float: right; padding: 3px 0; font-family: SIMLI; font-size: 1.25rem;" type="text">全部
            ></router-link>
        </div>
        <div v-for="(item, index) in studyTests.slice(0, 3)" :key="index"
          style="font-family: SIMLI; font-size: 1.5rem; margin-top: 10px;">
          <span style="font-family: STKAITI; font-size: 1rem;color: #FFCC33;border: 1px solid #B0B0B0;">待完成</span>
          {{ item.t_NAME }}_{{ item.created_TIME }}
          <router-link :to="{ name: 'finishomework', params: { tcode: item.t_CODE, tid: item.id } }"><el-button
              style="float: right; padding: 3px 0; font-family: SIMLI; font-size: 1.25rem;" type="text">去完成</el-button>
          </router-link>
        </div>
      </el-card>
      <el-card style="width: 95%; height: 200px; border-radius: 25px;padding-bottom: 12px; margin-top: 20px;">
        <div slot="header" class="clearfix">
          <span style="font-size: 1.7rem; font-weight: 1000;">| </span>
          <span style="font-family: SIMLI; font-size: 2rem;">我的待办</span>
          <span style="font-family: SIMLI; font-weight: 1000;">({{ lookNum }})</span>
          <router-link target="_blank" :to="{ path: '/todo' }"
            style="color: black; float: right; padding: 3px 0; font-family: SIMLI; font-size: 1.25rem;" type="text">全部
            ></router-link>
        </div>
        <div v-for="(item, index) in lookTests.slice(0, 3)" :key="index"
          style="font-family: SIMLI; font-size: 1.5rem; margin-top: 10px;">
          <span style="font-size: 1rem;color: #FFCC33;border: 1px solid #B0B0B0;">待批阅</span>
          {{ item.name }}_{{ item.time }}
          <router-link :to="{ name: 'finishomework', params: { tcode: item.tCode, tid: item.taskID } }">
            <el-button style="float: right; padding: 3px 0; font-family: SIMLI; font-size: 1.25rem;"
              type="text">去完成</el-button>
          </router-link>
        </div>
      </el-card>
      <el-card style="width: 95%; height: 400px; border-radius: 25px;padding-bottom: 12px; margin-top: 20px;">
        <div slot="header" class="clearfix">
          <span style="font-size: 1.7rem; font-weight: 1000;">| </span>
          <span style="font-family: SIMLI; font-size: 2rem;">我的开课</span>
          <span style="font-family: SIMLI; font-weight: 1000;">({{ classNum }})</span>
          <span style="font-family: SIMLI; margin-left: 20px; font-size: 1.2rem;">2021-2022学年 春季学期</span>
          <router-link target="_blank" :to="{ path: '/onlineclasses' }"
            style="color: black; float: right; padding: 3px 0; font-family: SIMLI; font-size: 1.25rem;" type="text">全部
            ></router-link>
        </div>
        <div v-for="(item, index) in myClass.slice(0, 2)" :key="index">
          <div style="width: auto; height: 130px; display: flex; border-bottom: 1px solid black;">
            <router-link :to="{ name: 'courseactivitie', params: { course: item } }"
              style="width: 100px; height: 100px; margin-top: 15px; flex: 3;">
              <el-image :src=hehe>
              </el-image>
            </router-link>
            <div style="flex: 8; display: inline-block; margin-top: 10px; ">
              <span style="font-family: SIMLI;margin-left: 10px;font-weight: 530;font-size: 1.5rem;">{{ item.courseName
              }}_{{ item.mainTeacher }}</span><br><br>
              <span style="font-family: SIMLI;margin-left: 10px;font-size: 1.2rem;">主讲：{{ item.mainTeacher }}
              </span>
              <span style="font-family: SIMLI;margin-left: 10px;font-size: 1.2rem;"
                v-if="item.assistTeacher != null">助教：{{
                  item.assistTeacher }}
              </span>
              <br><br>
              <span
                style="height: 30px; margin-top: 10px; font-family:STKAITI;margin-left: 10px;font-size: 1.2rem;">课表：今日第4,5节
                教学楼-W201</span>
              <span
                style="height: 30px; margin-top: 10px; font-family: STKAITI;margin-left: 10px;font-size: 1rem;color: #FFCC33;border: 1px solid #B0B0B0;">{{
                  item.type }}</span>
              <span style="height: 30px; margin-top: 10px; font-family: STKAITI;margin-left: 10px;font-size: 1rem;"
                v-if="item.code != null">教室号：{{
                  item.code }}</span>
            </div>
          </div>
        </div>
        <br>
        <span style="font-family: SIMLI;font-size: 1.1rem; color: #708090;">提示：非本学期开课，请至“在线课堂”查看</span>
      </el-card>
    </div>
    <div class="homeright">
      <el-card style="width: 100%; height: 1270px; border-radius: 25px">
        <div class="timetable w100 h100">
          <div class="time-b w100">
            <div class="time-detail">{{ startTime }} - {{ endTime }}</div>
            <div class="time-controller">
              <el-button-group>
                <el-button type="primary" icon="el-icon-arrow-left" @click="changeCount(1), getWeek(count)"></el-button>
                <el-button round class="date-btn">第七周</el-button>
                <el-button type="primary" icon="el-icon-arrow-right" @click="changeCount(-1), getWeek(count)"></el-button>
              </el-button-group>
            </div>
          </div>
          <div class="timetable-b w100">
            <table class="timetable-content w100">
              <thead>
                <tr>
                  <th></th>
                  <!-- <th>周一</th>
            <th>周二</th>
            <th>周三</th>
            <th>周四</th>
            <th>周五</th>
            <th>周六</th>
            <th>周日</th> -->
                  <th v-for="(item1, index1) in weeks" :key="index1">
                    {{ "周" + numberToChinease(item1 + 1, "week") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item2, index2) in maxCourseLength" :key="index2">
                  <td>
                    <p>{{ "第" + numberToChinease(item2) + "节" }}</p>
                  </td>
                  <template v-for="(item3, index3) in weeks">
                    <td :key="index3" :rowspan="showData(index3, index2 + 1).subject &&
                      showData(index3, index2).subject ===
                      showData(index3, index2 + 1).subject ? 2 : ''
                      " :style="[
    {
      display:
        showData(index3, index2 - 1).subject &&
          showData(index3, index2 - 1).subject ===
          showData(index3, index2).subject
          ? 'none'
          : '',
    },
  ]">
                      <div class="dmsjandjs-b" :style="[
                        {
                          background: showData(index3, index2).index
                            ? getRandomColor()
                            : '#FFFFFF',
                        },
                        { color: '#fff' },
                        { borderRadius: '15px' },
                        { padding: '12px' },
                        { height: '100%' },
                      ]">
                        <p>
                          {{ showData(index3, index2).startTime }}
                          {{ showData(index3, index2).startTime ? "-" : "" }}
                          {{ showData(index3, index2).endTime }}
                        </p>
                        <p>{{ showData(index3, index2).subject }}</p>
                        <p>{{ showData(index3, index2).major }}</p>
                        <p>{{ showData(index3, index2).class }}</p>
                      </div>
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </el-card>
    </div>
  </body>
</template>
 
<script>
import Cookies from 'js-cookie'
import moment from "moment";
import avata from '@/assets/images/avatar.png'
import hehe from '@/assets/images/course.png'
import { weekCourse, colorList } from "../../../js/Timetable";
export default {
  data() {
    return {
      hehe: hehe,
      uid: '',
      username: 'Harry',
      imageUrl: avata,
      lookTests: [], // 待办
      studyTests: [], // 待完成学习任务
      myClass: [], // 我的开课
      testNum: 0, // 待完成学习任务数
      lookNum: 0, // 待办数
      classNum: 0, // 开课数
      startTime: "2022.10.17",
      endTime: "2022.10.23",
      colorList: [], //随机颜色
      weekCourse: [], // 课程详细课程、数量
      weeks: [], //头部周期
      maxCourseLength: 0, //最大课节数,
      count: 0, //上周、下周、本周选择器flag
    };
  },
  created() {
    // 获得待完成任务
    this.$axios
      .post('/task/selectStuTask', {
        id: Cookies.get('uid'),
      }).then(response => {
        if (response.data.code == 500) {
          return
        } else {
          console.log(response)
          let time = ''
          response.data.result.forEach((item, index) => {
            if (item.t_ACTIVE == 0) {
              this.testNum++
              item.created_TIME = item.created_TIME.substring(0, 10).replaceAll('-', '')
              this.studyTests.push(item)
            }
          })
        }
      })
    // 待办任务
    this.$axios
      .post('/task/selectTaskMutualInfo', {
        id: Cookies.get('uid'),
      }).then(response => {
        if (response.data.code == 500) {
          return
        } else {
          console.log(response)
          let time = ''
          let obj = {}
          response.data.result.forEach((item, index) => {
            if (item.active == '未互评') {
              this.lookNum++
              time = item.createTime.substring(0, 10).replaceAll('-', '')
              obj = { 'name': item.tName, 'time': time, 'tCode': item.tCode, 'taskID': item.taskID }
              this.lookTests.push(obj)
            }
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    // 我的开课
    this.$axios
      .post('/course/selectCourseByTermAndYear', {
        id: Cookies.get('uid'),
        year: 2022,
        term: 1
      }).then(response => {
        if (response.data.code == 500) {
          return
        } else {
          // console.log(Cookies.get('uid'))
          response.data.result.forEach((item, index) => {
            this.classNum++
            this.myClass.push(item)
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    this.uid = Cookies.get('uid')
    this.username = Cookies.get('username')
    this.weekCourse = weekCourse;
    this.colorList = colorList;
    this.sortData();
    this.init();
    this.getWeek(0);
  },
  methods: {
    //改变选择器次数
    changeCount(i) {
      this.count += i;
      return this.count;
    },
    // 排序周期和课数
    sortData() {
      //周期
      this.weekCourse.sort((a, b) => {
        return a.week - b.week;
      });
      this.weekCourse.forEach((item) => {
        for (const key in item) {
          if (key === "courses") {
            item[key].sort((a, b) => {
              return a.index - b.index;
            });
          }
        }
      });
    },
    // 初始化课数(courses)与天数(week)
    init() {
      this.weeks = []; //周集合
      this.maxCourseLength = 0;
      this.weeks = this.weekCourse.map((item, index) => {
        for (const key in item) {
          if (key === "courses") {
            let max = 0; //
            //取出一周中最大的课节数及当天的最大课节数
            for (let j of item[key]) {
              j.index > this.maxCourseLength &&
                (this.maxCourseLength = j.index); //取所有一周里最大课节值
              j.index > max && (max = j.index); //取当天最大课节值
            }
            // console.log("max:", max);

            //如果当天的课节总数小于当天的最大课节值
            if (item[key].length < max) {
              //以最大课节值为终点遍历当天课节
              for (let i = 0; i < max; i++) {
                //如果下标课节不存在或着与循环的下标不匹配
                if (!item[key][i] || item[key][i].index != i + 1) {
                  item[key].splice(i, 0, " "); //填充空课节
                }
              }
            }
          }
        }
        return item.week;
      });
    },

    /**
     * 处理数据
     * @param { Number } weekIndex 周几对应的下标
     * @param { Number }  courseNum  第几节课对应的下标
     * @returns { String }   返回对应字符
     */
    showData(weekIndex, courseNum) {
      if (
        this.weekCourse[weekIndex] &&
        this.weekCourse[weekIndex].courses[courseNum] &&
        this.weekCourse[weekIndex].courses[courseNum].index === courseNum + 1
      ) {
        // this.getRandomColor();
        return this.weekCourse[weekIndex].courses[courseNum];
      }
      return false;
    },

    /**
     * 数字转中文
     * @param { Number } n 需转换的数字
     * @param { Boolean }  identifier  标识符
     * @returns { String }  identifier  转换后的中文
     */
    numberToChinease(n, identifier) {
      const chnArr = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二",
      ];
      return identifier === "week" && (n === 0 || n === 7) ? "日" : chnArr[n];
    },

    //随机获取颜色
    getRandomColor() {
      let colorList = this.colorList;
      let colorRandom = Math.floor(Math.random() * colorList.length + 1) - 1;
      let color;
      for (let i = 0; colorList.length > i; i++) {
        if (i == colorRandom) {
          color = colorList[i];
        }
      }
      return color;
    },

    //随机上、本、下周 日期
    getWeek(i) {
      let weekOfDay = parseInt(moment().format("E")); //计算今天是这周第几天
      let last_monday = moment()
        .subtract(weekOfDay + 7 * i - 1, "days")
        .format("YYYY-MM-DD"); //周一日期
      let last_sunday = moment()
        .subtract(weekOfDay + 7 * (i - 1), "days")
        .format("YYYY-MM-DD"); //周日日期
      this.startTime = last_monday;
      this.endTime = last_sunday;
    },
  },
};
</script>
 
<style scoped lang="scss">
.homeleft {
  float: left;
  left: 5%;
  position: absolute;
  margin-top: 10px;
  width: 45%;
  height: 100%;
}

.homeright {
  float: left;
  right: 5%;
  position: absolute;
  margin-top: 10px;
  width: 45%;
  height: 100%;
  background-color: white;
}

.timetable {
  background-color: #f1f7ff;

  .w100 {
    width: 100% !important;
  }

  .h100 {
    height: 100% !important;
  }

  .time-b {
    height: 46px;
    margin-bottom: 1px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .time-detail {
      color: #333333;
      font-weight: 700;
      font-size: 20px;
      font-family: "Microsoft YaHei";
    }
  }

  .timetable-b {
    height: 1180px;
    background-color: #fff;
    overflow: auto;

    .timetable-content {
      height: 100%;
      table-layout: fixed;
      border-collapse: collapse; //设置表格的边框是否被合并为一个单一的边框
      text-align: center;
      color: #333333;
      font-weight: 50;
      font-size: 0.1px;

      thead {
        height: 100px;

        th {
          border: 2px solid rgba(27, 100, 240, 0.1);
        }
      }

      tbody {
        height: calc(100% - 2px) / 7;

        td {
          padding: 12px;
          border: 2px solid rgba(27, 100, 240, 0.1);

          .dmsjandjs-b {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        }
      }
    }
  }
}

::v-deep {
  .time-controller {
    .el-button-group {
      .el-button {
        height: 10px;
        background: #ffffff;
        font-size: 1px;
        font-weight: 600;
        border: 1px solid rgba(27, 100, 240, 0.1);
        border-radius: 55px;
        color: #1b64f0;
      }
    }
  }
}

@font-face {
  font-family: 'SIMLI';
  src: url('../../../assets/fonts/SIMLI.TTF');
}

@font-face {
  font-family: 'STKAITI';
  src: url('@/assets/fonts/STKAITI.TTF');
}

.el-card ::v-deep .el-card__header {
  padding: 10px 20px;
  border-bottom: none
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
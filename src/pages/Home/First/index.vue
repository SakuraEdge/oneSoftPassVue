<template>
  <body style="margin: 1px;">
    <div class="homeleft">
      <div class="stupanel" id = "blueBK" style="width: 95%; border-radius: 5px;padding-bottom: 12px;">
        <div style="display: flex;">
          <el-avatar :src="imageUrl" slot="reference" style="width: 130px;height: 80px;margin-left: 20px;margin-top: 13px"></el-avatar>
          <span style="margin-left: 20px;margin-top: 8px;width: 125px;text-align: center;font-size: 23px">{{ username }}</span>
          <span style="left: 10px;margin-top: 20px;font-size: 1px;width: 300px">同学，你好！</span>
          <span
            style=" font-size: 1px;margin-top: 50px;height: 18px; background-color: rgb(0,0,0,0.15);
            margin-left: -270px;margin-right:50px;border: 1px solid #3bd8da;
            padding: 5px;text-align: center;width: 400px;border-radius: 20px;">
            今日课程：3节 (直播课2节 | 面授课1节)
          </span>
        </div>
      </div>
      <div class="stupanel" style="width: 95%; height: 120px; border-radius: 5px;padding-bottom: 12px; margin-top: 20px;">
        <div slot="header" class="clearfix">
          <span style="border-left:5px #1b64f0 solid">&nbsp;&nbsp;学习任务</span>
          <span style="font-weight: 1000;">({{ testNum }})</span>
          <router-link target="_blank" :to="{ path: '/studytest' }"
            style="color: black; float: right; padding: 3px 0;font-size: 2px;text-decoration: none;margin-right: 15px" type="text">全部
            ></router-link>
        </div>
        <div v-for="(item, index) in studyTests.slice(0, 3)" :key="index"
          style="margin-top: 10px;">
          <span style="font-size: 11px;border: 1px solid rgba(255,165,0,0.92);background-color: rgba(255,165,0,0.05)">
            <span style="margin: 3px;color: orange">待完成</span>
          </span>
          {{ item.t_NAME }}_{{ item.created_TIME }}
          <router-link :to="{ name: 'finishomework', params: { tcode: item.t_CODE, tid: item.id } }"><el-button
              style="float: right; padding: 3px 0;margin-right: 20px;font-size: 1px" type="text">去完成</el-button>
          </router-link>
        </div>
      </div>
      <div class="stupanel" style="width: 95%; height: 120px; border-radius: 5px;padding-bottom: 12px; margin-top: 20px;">
        <div slot="header" class="clearfix">
          <span style="border-left:5px #1b64f0 solid">&nbsp;&nbsp;我的待办</span>
          <span style=" font-weight: 1000;">({{ lookNum }})</span>
          <router-link target="_blank" :to="{ path: '/todo' }"
            style="color: black; float: right; padding: 3px 0;font-size: 2px;text-decoration: none;margin-right: 15px" type="text">全部
            ></router-link>
        </div>
        <div v-for="(item, index) in lookTests.slice(0, 3)" :key="index"
          style="margin-top: 10px;">
          <span style="font-size: 11px;border: 1px solid rgba(255,165,0,0.92);background-color: rgba(255,165,0,0.05)">
            <span style="margin: 3px;color: orange">待批阅</span>
          </span>
          {{ item.name }}_{{ item.time }}
          <router-link :to="{ name: 'finishomework', params: { tcode: item.tCode, tid: item.taskID } }">
            <el-button style="float: right; padding: 3px 0;margin-right: 20px;font-size: 1px"
                       type="text">去完成</el-button>
          </router-link>
        </div>
      </div>
      <div class="stupanel" style="width: 95%; height: 250px; border-radius: 5px;padding-bottom: 12px; margin-top: 20px;">
        <div slot="header" class="clearfix">
          <span style="border-left:5px #1b64f0 solid">&nbsp;&nbsp;我的开课</span>
          <span style="font-weight: 1000;">({{ classNum }})</span>
          <span style="margin-left: 20px;">2021-2022学年 春季学期</span>
          <router-link target="_blank" :to="{ path: '/onlineclasses' }"
            style="color: black; float: right; padding: 3px 0;font-size: 2px;text-decoration: none;margin-right: 15px" type="text">全部
            ></router-link>
        </div>
        <div v-for="(item, index) in myClass.slice(0, 2)" :key="index" style="font-size: 1px;
            width: auto; height: 110px; display: flex; border-bottom: 1px solid #B0B0B0;">
            <router-link :to="{ name: 'courseactivitie', params: { course: item } }"
                         style="width: 100px; height: 100px; margin-top: 15px; flex: 3;">
              <el-image :src=hehe>
              </el-image>
            </router-link>
            <div style="flex: 8; display: inline-block; margin-top: 10px; ">
              <span style="margin-left: 10px;font-weight: 530;">{{ item.courseName
              }}_{{ item.mainTeacher }}</span><br><br>
              <span style="margin-left: 10px;">主讲：{{ item.mainTeacher }}
              </span>
              <span style="margin-left: 10px;"
                v-if="item.assistTeacher != null">助教：{{
                  item.assistTeacher }}
              </span>
              <br><br>
              <span
                style="height: 30px; margin-top: 10px; margin-left: 10px;">课表：今日第4,5节
                教学楼-W201</span>
              <span
                style="height: 30px; margin-top: 10px; margin-left: 10px;color: #FFCC33;border: 1px solid #B0B0B0;">{{
                  item.type }}</span><br>
              <span style="height: 30px; margin-top: 10px; margin-left: 10px;"
                v-if="item.code != null">教室号：{{
                  item.code }}</span>
            </div>
          </div>
        </div>
        <br>
        <br>
        <span style="margin-left: 150px; color: #708090;font-size: 1px">提示：非本学期开课，请至“在线课堂”查看</span>
      </div>
    <div class="homeright">
      <div class="stupanel"style="width: 100%; border-radius: 25px">
        <div class="timetable w100 h100">
          <div class="time-b w100">
            <div class="time-detail">{{ startTime }} - {{ endTime }}</div>
            <div class="time-controller">
              <el-button-group>
                <el-button type="primary" icon="el-icon-arrow-left" @click="changeCount(1), getWeek(count)"></el-button>
                <el-button round class="date-btn">第{{week}}周</el-button>
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
                  <td style="width: 50px;">
                    <p>{{item2}}</p>
                  </td>
                  <template v-for="(item3, index3) in weeks">
                    <td :key="index3" :rowspan="
                      showData(index3, index2 + 1).subject &&
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

                        <div style="text-align: left;font-size: 10px;transform: scale(0.8);" >

                          <p style="font-size: 18px;">{{ showData(index3, index2).course }}</p>


                          <p>{{ showData(index3, index2).classroom }}</p>

                          <p>{{ showData(index3, index2).teacher }}</p>
                        </div>

                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
 
<script>
import Cookies from 'js-cookie'
import moment from "moment";
import avata from '@/assets/images/avatar.png';
import hehe from '@/assets/images/course.png';
import { weekCourse, colorList } from "../../../js/Timetable";
import "@/assets/css/student.css"
export default {
  data() {
    return {
      hehe: hehe,
      buleBK: require('../../../static/blueBK.jpg'),
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
      week: 7,//当前周
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
      if(this.week <= 1 && i > 0){return;}
      this.count += i;
      this.week -= i;
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
.div{
  font-size: 1px;
}
.span{
  font-size: 1px;
}


.homeleft {
  float: left;
  left: 8%;
  position: absolute;
  margin-top: 10px;
  width: 30%;
}

.homeright {
  float: left;
  right: 8%;
  position: absolute;
  margin-top: 10px;
  background-color: white;
}

.timetable {
  background-color: #f1f7ff;
  width: 800px;

  .w100 {

  }

  .h100 {

  }

  .time-b {
    height: 36px;
    margin-bottom: 1px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .time-detail {
      color: #333333;
      font-weight: 20;
      font-size: 1px;
      font-family: "Microsoft YaHei";
    }
  }

  .timetable-b {
    background-color: #fff;

    .timetable-content {
      width: 800px;
      height: 1050px;
      border-collapse: collapse; //设置表格的边框是否被合并为一个单一的边框
      text-align: center;
      color: #333333;
      font-weight: 600;
      font-size: 15px;

      thead {
        height: 30px;

        th {
          border: 2px solid rgba(0, 50, 50, 0.1);
        }
      }

      tbody {
        background-color: rgba(248, 248, 255, 0.5);
        td {
          border: 1px solid rgba(0, 0,  0, 0.1);
          .dmsjandjs-b {
            height: 100%;
            width: 100%;
            flex-direction: column;
            justify-content: center;
            text-align: left;
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

.div {
  font-family:Arial, "Microsoft Yahe", "微软雅黑", serifs;
}

.el-card ::v-deep .el-card__header {
  padding: 10px 10px;
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

#blueBK{
  background-image: url("https://img-qn.51miz.com/preview/element/00/01/11/44/E-1114426-586DEA2C.jpg");
  color: white;
}
</style>
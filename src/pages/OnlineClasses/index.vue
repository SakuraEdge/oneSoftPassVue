<template>
  <body>
    <div class="homeleft">
      <el-card style="width: 95%; height: 1000px; border-radius: 15px;padding-bottom: 12px;">
        <div slot="header" class="clearfix">
          <span style="border-left:4px #1b64f0 solid;font-weight: 1000;font-size: 17px">&nbsp;&nbsp;我的开课</span>
          <span style="font-size: 12px;font-weight: 600"> ({{ classNum }})</span>
        </div>
        <el-select v-model="value" size="small" @change="selectChange">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select style="margin-left: 10px; width: 100px;" v-model="ing" size="small" @change="ingSelectChange">
          <el-option v-for="item in ingOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input style="margin-left: 10px;width: 200px;" placeholder="开课名称" v-model="inputClassName"
          class="input-with-select" size="small">
          <el-button slot="append" icon="el-icon-search" size="small" @click="searchc"></el-button>
        </el-input>
        <el-row>
          <el-col :span="12" v-for="(item, index) in mySelectCla.slice(0, 3)" :key="index" :offset="index > 0 ? 1.5 : 0">
            <el-card style="width: 345px; height: 240px;border-radius: 5px;margin-top: 30px; margin-left: 8px;"
              :body-style="{ padding: '0px' }">
              <router-link :to="{ name: 'courseactivitie', params: { course: item } }" v-if="item.type === '直播课'">
                <img :src=haha style="background-color: white;width: 100%; height: 120px;">
              </router-link>
              <router-link :to="{ name: 'courseactivitie', params: { course: item } }" v-if="item.type === '面授课'">
                <img :src=haha2 style="background-color: white;width: 100%; height: 120px;">
              </router-link>
              <span style="margin-left: 10px;font-size: 16px;font-weight: 800">{{ item.courseName
              }}_{{ item.mainTeacher }}</span>
              <div style="display: flex; margin-top: 15px;">
                <span style="margin-left: 10px;font-size: 13px;color: darkgray">主讲：</span>
                <span style="font-size: 13px">{{ item.mainTeacher }}</span>
                <span style="margin-left: 60px;font-size: 13px;color: darkgray">班级：</span>
                <span style="font-size: 13px">{{ item.className }}</span>
              </div>
              <hr style="margin-top: 10px">
              <div style="display: flex; margin-top: 10px;">
                <span style="height: 30px;margin-left: 10px;font-size: 10px;color: darkgray">课表：</span>
                <span style="height: 30px;font-size: 11px;">今日第4,5节 教学楼-W201</span>
                <span
                  style="margin-left: 25px;height: 16px;font-size: 10px;font-weight: 550;background-color: rgba(135,206,235,0.3)"
                  v-if="item.type === '直播课'">
                  <span style="margin: 5px 5px 5px 5px;color: blue">{{item.type }}</span>
                </span>
                <span
                    style="margin-left: 90px;height: 16px;font-size: 10px;font-weight: 550;background-color: rgba(255,165,0,0.2)"
                    v-if="item.type === '面授课'">
                  <span style="margin: 5px 5px 5px 5px;color: orange">{{item.type }}</span>
                </span>
                <span style="margin-left: 4px;height: 30px;font-size: 10px;font-weight: 400"
                  v-if="item.code != null">教室号:{{item.code }}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="homeright">
      <el-card style="width: 95%; height: 500px; border-radius: 15px;padding-bottom: 12px;">
        <div slot="header" class="clearfix">
          <span style="border-left:4px #1b64f0 solid;font-weight: 1000;font-size: 17px;">&nbsp;&nbsp;学习任务</span>
          <router-link target="_blank" :to="{ path: '/studytest' }"
            style="color: gray;margin-top: 3px;text-decoration: none;float: right;font-size: 14px;font-weight: 600;" type="text">全部
            ></router-link>
        </div>
        <div v-for="(item, index) in studyTests.slice(0, 18)" :key="index"
          style="font-size: 11px; margin-top: 10px;">
          <span style="font-size: 11px;border: 1px solid rgba(255,165,0,0.92);background-color: rgba(255,165,0,0.05)">
            <span style="margin: 3px;color: orange">待完成</span>
          </span>
          <router-link :to="{ name: 'finishomework', params: {  tcode: item.tCode, tid: item.id } }">
            <span style="font-size: 13px;margin-left: 5px;font-weight: 550">{{ item.name }}_{{ item.time }}</span>
          </router-link>
        </div>
      </el-card>
      <el-card style="width: 95%; height: 466px; border-radius: 25px;padding-bottom: 12px; margin-top: 20px;"
        v-if="lookTests !== ''">
        <div slot="header" class="clearfix">
          <span style="border-left:4px #1b64f0 solid;font-weight: 1000;font-size: 17px;">&nbsp;&nbsp;我的代办</span>
          <span style="font-size: 12px;font-weight: 600">({{ lookNum }})</span>
          <router-link target="_blank" :to="{ path: '/todo' }"
            style="color: gray;margin-top: 3px;text-decoration: none;float: right;font-size: 14px;font-weight: 600;">全部
            ></router-link>
        </div>
        <div v-for="(item, index) in lookTests.slice(0, 10)" :key="index"
          style="font-size: 13px; margin-top: 10px;">
          <span style="font-size: 11px;border: 1px solid rgba(255,165,0,0.92);background-color: rgba(255,165,0,0.05)">
            <span style="margin: 3px;color: orange">待批阅</span>
          </span>
          <router-link :to="{ name: 'finishomework', params: {  tcode: item.tCode, tid: item.id } }">
            <span style="font-size: 13px;margin-left: 5px;font-weight: 550">{{ item.name }}_{{ item.time }}</span>
          </router-link>
        </div>
      </el-card>
    </div>
  </body>
</template>
 
<script>
import haha from '@/assets/images/bg2.png'
import haha2 from '@/assets/images/bg.png'
import '@/assets/css/router_link.css'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      haha: haha,
      haha2: haha2,
      inputClassName: '',
      options: [{
        value: '20221',
        label: '2022-2023学年 春季学期'
      }, {
        value: '20222',
        label: '2022-2023学年 夏季学期'
      }, {
        value: '20223',
        label: '2022-2023学年 秋季学期'
      }, {
        value: '20224',
        label: '2022-2023学年 冬季学期'
      }, {
        value: '20231',
        label: '2023-2024学年 春季学期'
      }],
      value: '',
      ingOptions: [{
        value: '进行中',
        label: '进行中'
      }, {
        value: '未进行',
        label: '未进行'
      }],
      ing: '',
      myClass: [],
      mySelectCla: [],
      studyTests: [],
      lookTests: [],
      classNum: 0,
      lookNum: 0,
      show: false
    };
  },
  methods: {
    selectChange() {
      let str = ''
      let newClass = []
      this.myClass.forEach((item, index) => {
        str = item.year + item.term
        if (this.inputClassName === '') {
          if (str === this.value && this.ing === '') {
            newClass.push(item)
          }
          if (str === this.value && this.ing === item.status) {
            newClass.push(item)
          }
        }
        if (this.ing === '') {
          if (str === this.value && this.inputClassName.toUpperCase() === item.courseName.toUpperCase()) {
            newClass.push(item)
          }
        }
        if (str === this.value && this.ing === item.status && this.inputClassName.toUpperCase() === item.courseName.toUpperCase()) {
          newClass.push(item)
        }
      })
      this.mySelectCla = newClass
    },
    ingSelectChange() {
      let str = ''
      let newClass = []
      this.myClass.forEach((item, index) => {
        str = item.year + item.term
        if (this.value === '') {
          if (this.inputClassName === '') {
            if (this.ing === item.status) {
              newClass.push(item)
            }
          } else {
            if (this.inputClassName.toUpperCase() === item.courseName.toUpperCase() && this.ing === item.status) {
              newClass.push(item)
            }
          }
        } else if (this.inputClassName === '') {
          if (str === this.value && this.ing === item.status) {
            newClass.push(item)
          }
        } else if (str === this.value && this.ing === item.status && this.inputClassName.toUpperCase() === item.courseName.toUpperCase()) {
          newClass.push(item)
        }
      })
      this.mySelectCla = newClass
    },
    searchc() {
      let str = ''
      let newClass = []
      if (this.mySelectCla === '' && this.inputClassName !== '') {
        this.myClass.forEach((item, index) => {
          if (this.inputClassName.toUpperCase() === item.courseName.toUpperCase()) {
            newClass.push(item)
          }
        })
      }

      if (this.mySelectCla !== '' && this.inputClassName !== '') {
        this.mySelectCla.forEach((item, index) => {
          str = item.year + item.term
          if (this.ing !== '') {
            if (this.inputClassName.toUpperCase() === item.courseName.toUpperCase() && str === this.value && this.ing === item.status) {
              newClass.push(item)
            }
            if (this.value === '') {
              if (this.inputClassName.toUpperCase() === item.courseName.toUpperCase() && this.ing === item.status) {
                newClass.push(item)
              }
            }
          } else {
            if (this.inputClassName.toUpperCase() === item.courseName.toUpperCase() && str === this.value) {
              newClass.push(item)
            }
          }
        })
      }
      if (this.inputClassName !== '') {
        this.mySelectCla = newClass
      }
    }
  },
  created() {
    // 获取所有课
    this.$axios
      .post('/course/selectCourseByTermAndYear', {
        id: Cookies.get('uid'),
        year: 0,
        term: 0
      }).then(response => {
        if (response.data.code === 500) {
        } else {
          // console.log(response)
          response.data.result.forEach((item, index) => {
            this.classNum++
            this.myClass.push(item)
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    // 获得待完成任务
    this.$axios
      .post('/task/selectStuTask', {
        id: Cookies.get('uid'),
      }).then(response => {
        if (response.data.code === 500) {

        } else {
          let time = ''
          let obj = {}
          response.data.result.forEach((item, index) => {
            if (item.t_ACTIVE === "0") {
              time = item.created_TIME.substring(0, 10).replaceAll('-', '')
              obj = { 'name': item.t_NAME, 'time': time ,'tCode': item.t_CODE,'id': item.id}
              this.studyTests.push(obj)
            }
          })
        }
      })
    // 待办任务
    this.$axios
      .post('/work/selectMutualInfo', {
        id: Cookies.get('uid'),
      }).then(response => {
        if (response.data.code === 500) {
        } else {
          let time = ''
          let obj = {}
          console.log(response.data.result)
          response.data.result.forEach((item, index) => {
            if (item.active === '未互评') {
              this.lookNum++
              time = item.create_time.substring(0, 10).replaceAll('-', '')
              obj = { 'name': item.t_name, 'time': time ,'tCode': item.tCode,'id': item.tid}
              this.lookTests.push(obj)
            }
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
.homeleft {
  float: left;
  left: 11%;
  position: absolute;
  margin-top: 10px;
  width: 53%;
  height: 100%;
}

.homeright {
  float: left;
  right: 11%;
  position: absolute;
  margin-top: 10px;
  width: 25%;
  height: 100%;
  background-color: white;
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

hr {
  display: inline-block;
  border-style: inset;
  border-width: 1px;
  width: 100%;
}
</style>
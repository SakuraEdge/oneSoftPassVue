<template>
  <el-container>
    <el-header style="height: 70px">
      <div style="display: flex; margin-left: 150px;margin-top: 10px;width:auto;">
        <el-avatar :src="studytest_icon" slot="reference" style="width: 40px;height: 40px;margin-left: 20px;background-color: rgba(0,128,128,0.15)"></el-avatar>
        <span style="font-weight:550;width: 50px;margin-top: 50px; margin-left: -45px;font-size: 11px;color: rgba(0,128,128,0.7)">{{ homework.type
        }}</span>
        <span style="color: black;font-weight: 550;width: 400px;font-size: 16px;margin-left: 20px;">{{ homework.name +
          '_作业_' +
          homework.releaseTime.substring(5, 11)
        }}</span>
        <div style="color: gray;font-size: 11px;display: inline-block;height: 50px;width:500px;margin-top: 35px;margin-left: -435px;padding-left: 35px;">
          <span>发布人：<span style="color: black">{{ homework.teacherName }}</span></span>
          <span style="margin-left: 106px;">批阅人：<span style="color: black">{{ speakTeacher }}</span></span>
          <span style="margin-left: 30px;">开课：<span style="color: black"> {{ homework.courseName }}_{{ homework.teacherName }}</span></span><br>
          <span>发布时间：<span style="color: black">{{ homework.releaseTime.substring(5, 16) }}</span></span>
          <span style="margin-left: 50px;">提交截止时间：<span style="color: black">{{ homework.submitTime.substring(5, 16) }}</span></span>
          <span
            style="margin-left: 10px;height: 17px;font-size: 0.7rem;color: #3333FF;border: 1px solid #B0B0B0">进行中</span>
        </div>
        <span style="color: orange;margin-left: 530px;margin-top: 20px;font-weight: 550;font-size: 14px" v-if="active === '0' || active === '2'">待完成</span>
        <span style="color: gray;margin-left: 530px;margin-top: 20px;font-weight: 550;font-size: 14px" v-if="active === '1'">已完成</span>
        <span style="margin-top: 50px;margin-left: -65px;font-size: 13px">{{ parseFloat(homework.overPercent).toFixed(0) }}%同学已完成</span>
      </div>
    </el-header>
    <el-main>
      <el-card style=" width: 80%;border-radius: 10px;margin-top:20px;margin-left:160px;padding-bottom: 100px;">
        <div slot="header">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
            @select="handleSelect">
            <el-menu-item index="1" style="font-size: 17px;font-weight: 550">我的进度</el-menu-item>
            <!-- <el-menu-item index="2" style="font-size: 1.3rem;">批阅</el-menu-item> -->
          </el-menu>
          <!-- 时间线 不需要互评 -->
          <div class="Timeline" v-if="isMutual == 0">
            <div class="timeaxis">
              <div v-for="(item, i) in list" :key="i">
                <div class="timeaxis-box">
                  <div class="timeaxis-topText" :class="{ 'bd-empty': i === list.length - 1 }">
                    <div class="text">{{ item.warnname }}</div>
                    <div class="tiem">{{ item.standard }}</div>
                  </div>
                  <div class="circular" v-if="i == 0" style="background: #165dff;"></div>
                  <div class="circular" v-if="i != 0"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- 时间线 需要自评 -->
          <div class="Timeline1" v-else-if="isSelf === '1' && selfScore === null">
            <div class="timeaxis">
              <div v-for="(item, i) in list1" :key="i">
                <div class="timeaxis-box">
                  <div class="timeaxis-topText" :class="{ 'bd-empty': i == list1.length - 1 }">
                    <div class="text">{{ item.warnname }}</div>
                    <div class="tiem">{{ item.standard }}</div>
                  </div>
                  <!-- <div class="circular" v-if="i == 0" style="background: #165dff;"></div> -->
                  <div class="circular" v-if="i != 4" style="background: #165dff;"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- 时间线 需要互评 -->
          <div class="Timeline1" v-else-if="isMutual == 1">
            <div class="timeaxis">
              <div v-for="(item, i) in list1" :key="i">
                <div class="timeaxis-box">
                  <div class="timeaxis-topText" :class="{ 'bd-empty': i == list1.length - 1 }">
                    <div class="text">{{ item.warnname }}</div>
                    <div class="tiem">{{ item.standard }}</div>
                  </div>
                  <!-- <div class="circular" v-if="i == 0" style="background: #165dff;"></div> -->
                  <div class="circular" v-if="i != 4" style="background: #165dff;"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- 上传文件 -->
          <div style="width: auto;background:	#F8F8F8;" v-if="active == 0 && !showDiv">
            <el-upload class="upload-demo" drag style="margin-left: 390px;" ref="upload"
              action="https://61.139.65.135:52482/uploadsWork" :file-list="fileList" :http-request="uploadFile"
              :on-change="handleChange" :on-preview="handlePreview" multiple>
              <i class="el-icon-upload" style="margin-top: 10px;"></i>
              <div class="el-upload__text"><em @click="delFile">点击上传</em></div>
              <div class="el-upload__tip" slot="tip" style="text-indent: 3em;color:#FFCC66;"
                v-if="homework.active == 2">
                您的作业被打回，请尽快提交
                (打回原因：作业不合格)</div>
              <div class="el-upload__tip" slot="tip"
                style="padding-left: 70px;text-indent: 3em;color:#FFCC66;"
                v-if="homework.active == 0 && homework.reSubmit != 1">
                您的作业待提交，请尽快提交</div>
              <div class="el-upload__tip" slot="tip"
                style="padding-left: 70px;text-indent: 3em;color:#FFCC66;"
                v-if="homework.reSubmit == 1">
                您的作业待补交，请尽快提交</div>
            </el-upload>
          </div>
          <!-- 成绩 -->
          <div style="width: auto;height:130px;background:	#F8F8F8;" v-if="teacherScore !== 'null' && teacherScore !== '' &&  active === '1'">
            <div style="width: 50%;margin-left: 25%; padding-top: 20px;">
              <el-image :src=hupin style="margin-left: 250px;"></el-image><br>
              <span style="color: #ea9d12;margin-left: 235px;font-size: 11px">已完成批阅</span><br/>
              <span style="margin-left: 230px;font-size: 11px">您的成绩：</span>
              <span v-if="teacherScore > 59" style="font-size: 11px;color: #1b64f0">{{teacherScore}}</span>
              <span v-else style="font-size: 11px;color: red">{{teacherScore}}</span>
            </div>
          </div>
          <!-- 自评 -->
          <div style="width: auto;height:130px;background:	#F8F8F8;" v-else-if="isSelf === '1' && active === '1' && selfScore === null">
            <div style="width: 50%;margin-left: 25%; padding-top: 20px;">
                <el-image :src=hupin style="margin-left: 250px;" @click="showSelf = true"></el-image><br>
              <span style="color: blue;margin-left: 238px;font-size: 13px" @click="showSelf = true">点击自评</span><br>
              <span style="color: #ea9d12;margin-left: 115px;font-size: 11px">请尽快完成自评，否则影响最终成绩(完成互评后方可自评)</span>
            </div>
          </div>
          <!-- 互评 -->
          <div style="width: auto;height:130px;background:	#F8F8F8;" v-else-if="isMutual == 1 && active == 1">
            <div style="width: 50%;margin-left: 25%; padding-top: 20px;">
              <router-link :to="{ name: 'assessment', params: { tcode: this.tcode } }" style="margin-left: 250px;">
                <el-image :src=hupin></el-image>
              </router-link><br>
              <span style="color: blue;margin-left: 238px;font-size: 13px">点击互评</span><br>
              <span style="color: #ea9d12;margin-left: 170px;font-size: 11px">请尽快完成互评，否则影响最终成绩</span>
            </div>
          </div>
          <!-- 提交完成 -->
          <div style="width: auto;margin-top: 15px;margin-bottom: 15px;font-size: 11px;" v-if="active == 1 || showDiv">
            <span style="font-size: 15px;font-weight: 600;">我的提交</span>
            <span style="padding-left: 15px;">已于{{ timeArry.timeText }}提交，</span>
            <el-upload ref="upload"
                       action="https://61.139.65.135:52482/uploadsWork" :file-list="fileList" :http-request="uploadFile"
                       :on-change="handleChange" :on-preview="handlePreview" multiple>
              <span style="color:blue;"><em @click="delFile">点击此处</em></span>
              <span> 可修改</span>
            </el-upload>

            <div
              style="border: 1px solid #E0E0E0; height: 300px;margin-top: 15px;padding-left: 25px;padding-right: 25px;padding-bottom: 25px; height: auto;">
              <span v-for="(item, index) in fileList" :key="index"
                style="margin-top:10px; background:#F8F8F8;display: flex; justify-content: space-between; width: 100%;">
                <div>
                  <img :src=photo_icon style="padding-top: 5px;padding-right: 20px;">
                  <span style="margin-bottom: 10px;">{{ item }}</span>
                </div>
                <div style="width: 100px;display: flex; justify-content: space-between;padding-top: 15px;">
                  <span style="color: blue;">查看</span>
                  <button
                    style="font-size: 12px; font-weight: 550; background-color:transparent;border: none; color: blue;margin-right: 20px;padding-bottom:13px;"
                    @click="downLoad(index)">下载</button>
                </div>
              </span>
            </div>
          </div>
          <!-- 作业内容 -->
          <div style="margin-top: 20px;height: auto;">
            <span style="font-size: 15px;font-weight: 600;">作业内容</span>
            <div
              style="border: 1px solid #E0E0E0; height: 300px;padding-left: 25px;padding-right: 25px;padding-bottom: 25px; height: auto;">
              <br>
              <span style="font-size: 14px;font-weight: 600;">说明</span>
              <br><br>
              <span style="font-size: 12px">这是作业说明，500字以内这是作业说明，500字以内这是作业说明，500字以内这是作业说明，500字以内这是作业说明，500字以内这是作业说明，500字以内这是作业说明，500字以内这是作业说明，500字以内这是作业说明，500字以内这是作业说明，500字以内这是作业说明，500字以内这是作业说明，500字以内这是作业说明，500字以内</span>
              <br><br>
              <span style="font-size: 14px;font-weight: 600;">附件</span>
              <div style="width: auto;height: 100px;">
                <br>
                <li style="background:	#F8F8F8;"></li>
                <br>
                <li style="background:	#F8F8F8;"></li>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <div v-if="showSelf" class="mask">
        <div class="dlg-input-box flex flex-col" style="background-color: gray">
          <div class="flex flex-space-between full-width">
            <div class="font-bold"></div>
            <div class="pointer" @click=""></div>
          </div>
          <div class="margin-top-xl flex flex-col">
            <input class="input-box" placeholder="请输入自评成绩(1-100)" v-model="inputValue" ref="selfScore" style="width: 330px"/>
          </div>
          <div class="flex flex-end margin-top-xl">
            <button class="margin-left-m btn-blue-auto pointer" style="width:80px;margin-left: 50px;margin-right: 70px" @click="updateSelfScore()">确定</button>
            <button class="btn-huibai-auto pointer" style="width:80px" @click="showSelf = false">取消</button>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
 
<script>
import Cookies from 'js-cookie'
import { formatDate } from "@/js/time";
import studytest_icon from "@/assets/images/studytest_icon.png"
import photo_icon from "@/assets/images/photo.png"
import "@/assets/css/router_link.css"
import hupin from "@/assets/images/hupin.png"

export default {
  data() {
    return {
      studytest_icon: studytest_icon,
      photo_icon: photo_icon,
      hupin: hupin,
      tcode: 0,
      homework: {},
      timeArray: '',
      activeIndex: '1',
      show1: true,
      show2: false,
      showDiv: false,
      showSelf: false,
      teacherScore:'',
      list: [
        {
          warnname: "发布时间",
          standard: ''
        },
        {
          warnname: "提交截止时间",
          standard: ''
        },
        {
          warnname: "公布成绩",
          standard: ''
        }
      ],
      list1: [
        {
          warnname: "发布时间",
          standard: ''
        },
        {
          warnname: "提交截止时间",
          standard: ''
        },
        {
          warnname: "补交截止时间",
          standard: ''
        },
        {
          warnname: "互评/自评截止时间",
          standard: ''
        },
        {
          warnname: "公布成绩",
          standard: ''
        }
      ],
      fileList: [],
      formData: "",
      timer: null, //定时器名称
      isMutual: '', //是否要互评
      isSelf:'',
      selfScore:null,
      active: '',
      speakTeacher: '',
    };

  },
  methods: {
    updateSelfScore(){
      this.$axios
          .post('/task/updateSelfScore', {
            id: Cookies.get('uid'),
            tCode: this.$route.params.tcode,
            score:this.$refs.selfScore.value,
          }).then(response =>{
            this.showSelf = false;
            this.msg = '自评成功！';
            this.selfScore =  this.$refs.selfScore.value;
          })
    },
    setTime() {
      //每隔一分钟运行一次保存方法
        this.saveList();
    },
    saveList() {
      // 获得文件
      this.$axios
        .post('/getFileName', {
          studentID: Cookies.get('uid'),
          taskCode: this.$route.params.tcode
        }).then(response => {
          if (response.data.code == 500) {
            return
          } else {
            console.log(response)
            let fileListTe = []
            response.data.result.forEach((item, index) => {
              fileListTe.push(item)
            })
            this.fileList = fileListTe
            console.log(fileListTe)
          }
        })
    },
    handleSelect(key) {
      if (key == 1) {
        if (this.show1 == false) {
          this.show1 = true;
          this.show2 = false;
        }
      } else if (key == 2) {
        if (this.show2 == false) {
          this.show2 = true;
          this.show1 = false;
        }
      }
    },
    //点击上传文件触发的额外事件,清空fileList
    delFile() {
      this.fileList = [];
      this.setTime();
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
      console.log(this.fileList, "sb");
    },
    //自定义上传文件
    uploadFile(file) {
      // console.log(file)
      // this.formData.append('file', file.file)
      // this.formData.append('studentID', Cookies.get('uid'))
      // this.formData.append('taskID', this.$route.params.tid)
      // console.log(this.formData.getAll('file'))
      const formData = new FormData()
      formData.append('file', file.file)
      formData.append('studentID', Cookies.get('uid'))
      formData.append('taskID', this.$route.params.tid)
      // 上传文件
      this.$axios
        .post('/uploadsWork',
          formData, {
          headers: {
            'content-type': "multipart/form-data"
          }
        }).then(response => {
          if (response.data.code == 500) {
          } else {
            // this.subTime = new Date()
            // console.log(this.subTime)
            this.showDiv = true
            console.log(response)
            this.setTime();
          }
        })
    },
    // 点击文件
    handlePreview(file) {
      console.log(file);
    },
    // 下载
    downLoad(index) {
      // console.log(this.fileList.slice(index, index + 1).pop())
      this.$axios
      ({
        url: "downloadLocal",
        method: 'post',
        responseType: "arraybuffer",
        data:JSON.stringify({
          studentID: Cookies.get('uid'),
          taskCode: this.$route.params.tcode,
          fileName: this.fileList.slice(index, index + 1).pop()
        })
      }).then(response => {
        if (response.data.code == 500) {
          return
        } else {
          // console.log(response)
          const content = response.data
          // console.log(response.data)
          const blob = new Blob([content])
          // console.log(blob)
          const fileName = this.fileList.slice(index, index + 1).pop()
          if ('download' in document.createElement('a')) { // 非IE下载
            const blob = new Blob([response.data]);
            const link = document.createElement("a");
            link.download = decodeURI(
                response.headers["content-disposition"].replace(/.*filename=/, "")
            ); //后端可以将文件名放在headers中返回
            link.style.display = "none";
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(link.href);
            document.body.removeChild(link);
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
        }
      })

    },
  },
  created() {
    // console.log(Cookies.get('uid'))
    console.log(this.$route.params.tcode)
    this.setTime()
    this.timeArry = formatDate(new Date())

    this.tcode = this.$route.params.tcode
    // 获得任务
    this.$axios
      .post('task/selectTaskByCode', {
        id: Cookies.get('uid'),
        code: this.$route.params.tcode
      }).then(response => {
        if (response.data.code == 500) {
          return
        } else {
          console.log(response)
          this.homework = response.data.result
          this.isMutual = response.data.result.isMutual
          this.active = response.data.result.active
          this.speakTeacher = response.data.result.speakTeacher
          this.isSelf = response.data.result.isSelf
          this.selfScore = response.data.result.selfScore
          this.teacherScore = response.data.result.teacherScore
          if (response.data.result.isMutual == 0) {
            this.list.forEach((item, i) => {
              // console.log(response)
              if (i == 0) {
                item.standard = this.homework.releaseTime.substring(5, 11) + "(星期三) " + this.homework.releaseTime.substring(11, 16)
              }
              if (i == 1) {
                item.standard = this.homework.submitTime.substring(5, 11) + "(星期六) " + this.homework.submitTime.substring(11, 16)
              }
              if (i == 2) {
                item.standard = this.homework.scoreTime.substring(5, 11) + "(星期六) " + this.homework.scoreTime.substring(11, 16)
              }
            })
          }

          if (response.data.result.isMutual == 1) {
            this.list1.forEach((item, i) => {
              // console.log(response)
              if (i == 0) {
                item.standard = this.homework.releaseTime.substring(5, 11) + "(星期六) " + this.homework.releaseTime.substring(11, 16)
              }
              if (i == 1 || i == 2) {
                item.standard = this.homework.submitTime.substring(5, 11) + "(星期四) " + this.homework.submitTime.substring(11, 16)
              }
              if (i == 3) {
                item.standard = this.homework.mutualTime.substring(5, 11) + "(星期五) " + this.homework.mutualTime.substring(11, 16)
              }
              if (i == 4) {
                item.standard = this.homework.scoreTime.substring(5, 11) + "(星期二) " + this.homework.scoreTime.substring(11, 16)
              }
            })
          }
        }
      })
  }
};
</script>

<style  lang="scss">

.el-main {
  padding: 10px;
}

.Timeline {
  margin-top: 40px;
  margin-left: 60px;

  .timeaxis {
    height: 50px;
    margin-top: 80px;
    margin-left: 1.5em;
    display: flex;

    .timeaxis-box {
      width: 480px;

      .circular {
        width: 10px;
        height: 11px;
        border-radius: 6px;
        // background: #165dff;
        background: #c9cdd4;
        margin-bottom: -4px;
        position: relative;
        top: -4px;
        box-shadow: 0px 0px 5px 5px #fff;
      }

      .timeaxis-topText {
        border-bottom: 1px solid #c9cdd4;
        position: relative;
        margin-top: -20px;

        .text {
          position: absolute;
          top: -38px;
          margin-left: -20px;
          font-size: 12px;
          font-weight: 550;
        }

        .tiem {
          position: absolute;
          top: 20px;
          margin-left: -50px;
          font-size: 12px;
        }
      }

      .bd-empty {
        border: 0;
      }

      .timeaxis-bootomText {
        position: relative;

        .text {
          position: absolute;
          top: 10px;
          font-size: 14px;
        }
      }
    }
  }
}

.Timeline1 {
  margin-top: 40px;
  margin-left: 60px;

  .timeaxis {
    height: 50px;
    margin-top: 80px;
    margin-left: 1em;
    display: flex;

    .timeaxis-box {
      width: 245px;

      .circular {
        width: 10px;
        height: 11px;
        border-radius: 6px;
        background: #c9cdd4;
        margin-bottom: -4px;
        position: relative;
        top: -4px;
        box-shadow: 0px 0px 5px 5px #fff;
      }

      .timeaxis-topText {
        border-bottom: 1px solid #c9cdd4;
        position: relative;
        margin-top: -20px;

        .text {
          position: absolute;
          top: -38px;
          margin-left: -25px;
          font-size: 12px;
          font-weight: 550;
        }

        .tiem {
          position: absolute;
          top: 20px;
          margin-left: -50px;
          font-size: 12px;
        }
      }

      .bd-empty {
        border: 0;
      }

      .timeaxis-bootomText {
        position: relative;

        .text {
          position: absolute;
          top: 10px;
          font-size: 14px;
        }
      }
    }
  }
}

.el-upload-dragger {
  background-color: #F8F8F8;
  border: none;
  height: 100px;
}

.dlg-input-box {
  border-radius: 3px;
  width: 350px;
  height: 150px;
  background-color: #fff;
  padding: 30px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.mask{
  display: flex;
  justify-content: center;
  align-items: center;
}

.mask{
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  color: #fff;
}
.mask h1{
  width: 260px;
}
.mask input{
  width: 260px;
  height: 50px;
  border: 2px solid #fff;
  background-color: #fff;
  outline: none;
  border-radius: 10px;
  text-indent: 15px;
  font-size: 18px;
  margin: 20px 0;
}

.mask button{
  width: 260px;
  height: 50px;
  border: 2px solid #fff;
  background: none;
  border-radius: 10px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}

.mask button:hover{
  background-color: #fff;
  color: #002866;
  cursor: pointer;
}
</style>
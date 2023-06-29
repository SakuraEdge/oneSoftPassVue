<template>
  <div class="change-main">
    <el-card class="change-card-left">
      <div class="change-title">
        进制计算
      </div>
      <el-divider></el-divider>

      <el-select v-model="selectBinary" placeholder="请选择进制类型">
        <el-option label="二进制" value="2"></el-option>
        <el-option label="八进制" value="8"></el-option>
        <el-option label="十进制" value="10"></el-option>
        <el-option label="十六进制" value="16"></el-option>
      </el-select>

      <el-input v-model="binary" placeholder="请输入需要计算的值" class="binary-text"></el-input>
      <el-button class="binary-button" @click="getBinary">计算</el-button>

      <el-divider></el-divider>

      <div>
        <el-row :gutter="20">
          <el-col :span="11"><div class="binary-col">二进制：
          <span class="binary-num" @click="copy(binary2)">{{binary2}}</span></div></el-col>
          <el-col :span="11"><div class="binary-col">八进制：
            <span class="binary-num" @click="copy(binary8)">{{binary8}}</span></div></el-col>
        </el-row>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="11"><div class="binary-col">十进制：
            <span class="binary-num" @click="copy(binary10)">{{binary10 }}</span></div></el-col>
          <el-col :span="11"><div class="binary-col">十六进制：
            <span class="binary-num" @click="copy(binary16)">{{binary16}}</span></div></el-col>
        </el-row>
      </div>

      <div class="change-title" style="padding-top: 5%">
        URL转码 & 解码
      </div>
      <el-divider></el-divider>
      <div>
        <el-input class="url-input" v-model="url" placeholder="请输入需要转码的URL"></el-input>
        <el-button class="url-button" @click="encode">转码</el-button>
      </div>
      <div>
        <el-input class="url-input" v-model="toUrl" placeholder="请输入需要解码的URL"></el-input>
        <el-button class="url-button" @click="decode">解码</el-button>
      </div>

    </el-card>
    <el-card class="change-card-right">
      <div class="change-title">
        MD5加密
      </div>
      <el-divider></el-divider>
      <el-input v-model="md5_text" placeholder="请输入文本" class="md5-text"></el-input>
      <el-button class="md5-button" @click="md5_change">转化</el-button>
      <div class="md5-main">
        <div class="md5-title">转化后的MD5码为:</div>
        <span class="md5-result" v-if="md5_result !== '' " @click="copy(md5_result)">{{ md5_result }}</span>
        <span class="md5-result" v-else style="color: #9e9e9e">请先进行转换</span>
        <span v-if="md5_result !== ''" style="color: #9e9e9e">（点击可复制）</span>
      </div>
    </el-card>
    <el-card class="change-card-right" style="height: 340px">
      <div class="change-title">
        中文 & UniCode 转换
      </div>
      <el-divider></el-divider>
      <div class="unicode-main">
        <el-input v-model="kanji" placeholder="中文输入区" class="unicode-text"></el-input>
        <div>
          <el-button class="unicode-button" @click="getUnicode">中文转化UniCode</el-button>
          <el-button class="unicode-button" @click="getKanji">UniCode转化中文</el-button>
        </div>
        <div>
          <el-button class="unicode-button-2" @click="clearUnicode">清空</el-button>
        </div>

        <el-input v-model="unicode" placeholder="UniCode输入区" class="unicode-text"></el-input>
      </div>
    </el-card>
  </div>

</template>

<script>
export default {
  name: "change",
  data() {
    return {
      md5_text: "",
      md5_result: "",
      kanji: "",
      unicode: "",
      selectBinary: "10",
      binary: "",
      binary2: "",
      binary8: "",
      binary10: "",
      binary16: "",
      url: "",
      toUrl: "",
    }
  },
  methods: {
    open1() {
      this.$notify({
        message: '已成功复制到剪贴板中',
        showClose: false,
        type: "success",
        duration: 1500
      })
    },
    error(title,info) {
      this.$notify({
        title: title,
        message: info,
        showClose: false,
        type: "error",
        duration: 2000
      })
    },
    encode(){
      this.$axios.post("/encodeURL",{
        url: this.url
      }).then(res => {
        this.toUrl = res.data.result
      }).catch(res => {
        this.error("转换出错！","请检查输入内容是否正确")
      })
    },
    decode(){
      this.$axios.post("/decodeURL",{
        url: this.toUrl
      }).then(res => {
        this.url = res.data.result
      }).catch(res => {
        this.error("转换出错！","请检查输入内容是否正确")
      })
    },
    md5_change() {
      this.md5_result = this.$md5(this.md5_text)
    },
    copy(text) {
      this.$copyText(text).then(
          this.open1
      )
    },
    clearUnicode(){
      this.unicode = ""
      this.kanji = ""
    },
    getUnicode() {
      this.$axios.post("/getUnicodeByKanji",{
        kanji: this.kanji
      }).then(res => {
        this.unicode = res.data.result
      })
    },
    getBinary() {
      this.$axios.post("/getBinary",{
        binary: this.selectBinary,
        num: this.binary
      }).then(res => {
        let result = res.data.result
        this.binary2 = result.binary2
        this.binary8 = result.binary8
        this.binary10 = result.binary10
        this.binary16 = result.binary16
      }).catch(res => {
        this.error("转换出错！","请检查输入数字是否正确")
      })

    },
    getKanji() {
      this.$axios.post("getKanjiByUnicode",{
        unicode: this.unicode
      }).then(res => {
        this.kanji = res.data.result
      })
    }
  }
}
</script>

<style scoped>
.change-main{
  margin-top: 3%;
  height: 100%;
}

.change-card-left{
  width: 50%;
  margin-left: 9%;
  height: 590px;
  float: left;
}
.change-card-right{
  width: 30%;
  margin-right: 9%;
  margin-bottom: 1%;
  float: right;
}
.change-title{
  font-weight: 600;
  font-size: 17px;
}

.md5-main{
  padding-left: 4%;
  padding-top: 5%;
}

.md5-text{
  width: 55%;
}

.md5-button{
  float: right;
  margin-right: 5%;
  margin-top: 8%;
}

.md5-title{
  font-size: 15px;
  font-weight: 550;
}

.md5-result{
  color: #5a8cff;
}

.unicode-button{
  margin-top: 3%;
  margin-left: 3%;
  margin-bottom: 3%;
}

.unicode-button-2{
  margin-left: 3%;
  margin-bottom: 3%;
}

.unicode-text{
  width: 94%;
}


::v-deep .el-select .el-input {
  width: 100%!important;
}

.binary-text{
  width: 30%;
}

.binary-button{
  margin-left: 5%;
}


.el-col{
  padding-bottom: 20px;
}

.el-row{
  padding-left: 5%;
}

.binary-col{
  border-radius: 4px;
  padding: 5%;
  background: #fff0ec;
}

.binary-num{
  color: #5a8cff;
}

.url-input{
  width: 80%;
  margin-bottom: 2%;
}

.url-button{
  margin-left: 5%;
}



</style>
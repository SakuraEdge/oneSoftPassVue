<template>
  <div class="change-main">
    <el-card class="change-card-left">
      <div class="change-title">
        进制转换
      </div>
      <el-divider></el-divider>
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
        <span class="md5-result" v-if="md5_result !== '' " @click="copy">{{ md5_result }}</span>
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
    }
  },
  methods: {
    open1() {
      this.$notify({
        message: '已将MD5码复制到剪贴板中',
        showClose: false,
        type: "success",
        duration: 1500
      })
    },
    md5_change() {
      this.md5_result = this.$md5(this.md5_text)
    },
    copy() {
      this.$copyText(this.md5_result).then(
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


</style>
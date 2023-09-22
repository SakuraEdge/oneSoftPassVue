<template>
  <div class="exchange-main">
    <el-card class="exchange-card-left">
      <div>
        <span class="exchange-title">
          货币汇率详情
        </span>
        <span class="exchange-title" style="color: #36ad6a"> [100当前货币可以换多少人民币] </span>
        <span class="exchange-title-2">
          汇率更新日期：{{money_info[0].day}} {{money_info[0].time}}
        </span>
        <el-divider></el-divider>
        <div class="ret-card">
          <div style="padding-left: 2%;padding-bottom: 3%">
              <span class="ret-field">
              货币名称
              </span>
            <span class="ret-field">
              货币代码
              </span>
            <span class="ret-field">
              购汇汇率
              </span>
            <span class="ret-field">
              出汇汇率
              </span>
            <span class="ret-field">
              购钞汇率
              </span>
            <span class="ret-field">
              出钞汇率
              </span>
            <span class="ret-field">
              标准折算
              </span>
          </div>
        </div>
        <el-divider></el-divider>
        <el-scrollbar class="ret-info-bar">
          <div v-for="(item,index) in money_info" class="ret-card">
            <div style="padding-left: 2%;padding-bottom: 3%">
              <span class="ret-field" style="color: #5a8cff">
              {{ item.name }}
              </span>
              <span class="ret-field">
              {{ item.code }}
              </span>
              <span class="ret-field" v-if="item.hui_in !== ''">
              {{ item.hui_in }}
              </span>
              <span class="ret-field" style="color: red" v-else>
                暂无
              </span>
              <span class="ret-field" v-if="item.hui_out !== ''">
              {{ item.hui_out }}
              </span>
              <span class="ret-field" style="color: red" v-else>
                暂无
              </span>
              <span class="ret-field" v-if="item.chao_in !== ''">
              {{ item.chao_in }}
              </span>
              <span class="ret-field" style="color: red" v-else>
                暂无
              </span>
              <span class="ret-field" v-if="item.chao_out !== ''">
              {{ item.chao_out }}
              </span>
              <span class="ret-field" style="color: red" v-else>
                暂无
              </span>
              <span class="ret-field">
              {{ item.zhesuan }}
              </span>
            </div>
            <el-divider></el-divider>
          </div>


        </el-scrollbar>
      </div>

    </el-card>
    <el-card class="exchange-card-right">
      <div>
        <span class="exchange-title" style="color: red">
          Tips
        </span>
        <el-divider></el-divider>
        <div>
          汇率详情中的数据计算方法为：<br>
          <span style="color: #ff7733">100面值的当前货币</span>与<span style="color: darkorchid">100面值的人民币</span>进行对比<br>
          例如{{ money_info[25].name }}购汇汇率为 <span style="font-weight: 600">{{ money_info[25].hui_in }}</span> ，
          则100{{ money_info[25].name }}可以购买 <span style="font-weight: 600">{{ money_info[25].hui_in }}</span> 人民币

        </div>
      </div>
    </el-card>
    <el-card class="exchange-card-right" style="height: 340px">
      <div>
        <span class="exchange-title">
          指定货币汇率计算
        </span>
        <span style="float: right;padding-right: 3%">
          <el-button @click="setZero" >清零</el-button>
        </span>
        <el-divider></el-divider>
      </div>
      <div class="money-select-div">
        <span class="money-select">
          <el-select v-model="selectMoney1" placeholder="请选择货币" @change="money1Change">
          <el-option v-for="(money,index) in money_info" :label="money.name" :value="index"></el-option>
        </el-select>
          <el-input v-model="money1" class="money-text" @input="money1Input"></el-input>
        </span>
        <br>
        <span class="hui-get">
          [1 {{code1}} = {{hui1}} CNY]
        </span>
      </div>

      <div class="money-select-div">
        <span class="money-select">
          <el-select v-model="selectMoney2" placeholder="请选择货币" @change="money2Change">
          <el-option v-for="(money,index2) in money_info" :label="money.name" :value="index2"></el-option>
        </el-select>
          <el-input v-model="money2" class="money-text" @input="money2Input"></el-input>
        </span>
        <br>
        <span class="hui-get">
          [1 {{code2}} = {{hui2}} CNY]
        </span>
      </div>

      <div class="money-select-div">
        <span class="money-select">
          <el-select v-model="selectMoney3" placeholder="请选择货币" @change="money3Change">
          <el-option v-for="(money,index3) in money_info" :label="money.name" :value="index3"></el-option>
        </el-select>
          <el-input v-model="money3" class="money-text"  @input="money3Input"></el-input>
        </span>
        <br>
        <span class="hui-get">
          [1 {{code3}} = {{hui3}} CNY]
        </span>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  name: "money",
  data() {
    return {
      money_info: [],
      temp_hui: 0,
      code1: "CNY",
      code2: "USD",
      code3: "JPY",
      hui1: 0.00,
      hui2: 0.00,
      hui3: 0.00,
      money1: 0.00,
      money2: 0.00,
      money3: 0.00,
      selectMoney1: 27,
      selectMoney2: 25,
      selectMoney3: 11,
    }
  },
  created() {
    this.$axios.post("/getRetInfo",{})
        .then(res => {
            this.money_info = res.data.result
            console.log(this.money_info)
          this.code1 = this.money_info[27].code
          this.code2 = this.money_info[25].code
          this.code3 = this.money_info[11].code
          this.hui1 = Math.floor(this.money_info[27].zhesuan * 1000000) / 100000000
          this.hui2 = Math.floor(this.money_info[25].zhesuan * 1000000) / 100000000
          this.hui3 = Math.floor(this.money_info[11].zhesuan * 1000000) / 100000000
        }
    )
  },
  methods: {
    money1Change() {
      this.code1 = this.money_info[this.selectMoney1].code
      let temp_hui1 = this.hui1
      this.hui1 = Math.floor(this.money_info[this.selectMoney1].zhesuan * 1000000) / 100000000
      this.money1 = this.money1 * temp_hui1 / this.hui1
    },
    money2Change() {
      this.code2 = this.money_info[this.selectMoney2].code
      let temp_hui2 = this.hui2
      this.hui2 = Math.floor(this.money_info[this.selectMoney2].zhesuan * 1000000) / 100000000
      this.money2 = this.money2 * temp_hui2 / this.hui2
    },
    money3Change() {
      this.code3 = this.money_info[this.selectMoney3].code
      let temp_hui3 = this.hui3
      this.hui3 = Math.floor(this.money_info[this.selectMoney3].zhesuan * 1000000) / 100000000
      this.money3 = this.money3 * temp_hui3 / this.hui3
    },
    money1Input() {
      this.money2 = this.money1 * this.hui1 / this.hui2
      this.money3 = this.money1 * this.hui1 / this.hui3
    },
    money2Input() {
      this.money1 = this.money2 * this.hui2 / this.hui1
      this.money3 = this.money2 * this.hui2 / this.hui3
    },
    money3Input() {
      this.money1 = this.money3 * this.hui3 / this.hui1
      this.money2 = this.money3 * this.hui3 / this.hui2
    },
    setZero() {
      this.money1 = 0
      this.money2 = 0
      this.money3 = 0
    }

  }
}
</script>

<style scoped>

.exchange-main{
  margin-top: 3%;
  height: 100%;
}

.ret-info-bar{
  overflow:scroll;
  height: 420px;
  width: 100%;
}

.ret-field{
  float: left;
  width: 100px;
}

.exchange-card-left{
  width: 50%;
  margin-left: 9%;
  height: 590px;
  float: left;
}

.exchange-card-right{
  width: 30%;
  margin-right: 9%;
  float: right;
}

.exchange-title{
  font-weight: 600;
  font-size: 1.05rem;
}

::v-deep .el-select .el-input {
  width: 100%!important;
}

.money-text {
  padding-left: 5%;
  width: 50%;
}

::v-deep .money-text .el-input__inner{
  font-size: 1.05rem;
  font-weight: 600;
  text-align: center;
}

.money-select-div{
  padding-bottom: 1%;
}

.money-select .el-select {
  width: 35%;
}

.ret-card{
  font-weight: 600;
  font-size: 0.85rem;
}

.hui-get{
  padding-left: 2%;
  color: darkorchid;
  font-size: 0.7rem;
}

.exchange-title-2{
  float: right;
  font-weight: 600;
  font-size: 0.7rem;
}

</style>
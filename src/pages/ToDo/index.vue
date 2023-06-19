<template>
  <el-container>
    <el-header style="margin-top: 10px;margin-bottom:10px；vertical-align: middle;height: 15px;text-align: center; font-size: 15px;font-weight: 550;background-color: white">
      我的代办
    </el-header>
    <el-main>
      <el-card style="width: 75%; margin-left: 185px; border-radius: 25px;">
        <div slot="header" class="clearfix" style="margin-top: 20px;margin-left:20px;">
          <el-select v-model="value" size="small" @change="selectChange">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-input style="margin-left: 10px;width: 150px;" placeholder="开课名称" v-model="inputClassName"
            class="input-with-select" size="small">
            <el-button slot="append" icon="el-icon-search" size="small" @click="searchc"></el-button>
          </el-input>
        </div>
        <div style="padding: 10px;">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="序号" width="70px" prop="id" />
            <el-table-column label="名称" width="300px" prop="tName" />
            <el-table-column label="类型" width="120px" prop="tType" />
            <el-table-column label="发布人" width="100px" prop="teacherName" />
            <el-table-column label="发布时间" width="150px" prop="createTime" />
            <el-table-column label="完成截止时间" width="200px" prop="overTime" />
            <el-table-column fixed="right" label="操作">
              <template #default="scope">
                <div style="display: flex; align-content: space-between">
                  <router-link :to="{ name: 'assessment',  }">
                  <el-button type="primary" @click="handleReview(scope.row)">
                    批阅</el-button>
                  </router-link>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>
 
<script>
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      value: '',
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
      }],
      tableData: [],
      tcode: 1,
    }
  },
  methods: {
    selectChange() {

    },
    searchc() {

    }
  },
  created() {
    // 获取所有任务
    this.$axios
      .post('task/selectTaskMutualInfo', {
        id: Cookies.get('uid')
      }).then(response => {
        if (response.data.code == 500) {
          return
        } else {
          let num = 0
          // console.log(response)
          response.data.result.forEach((item, index) => {
            if (item.active == '未互评') {
              num++
              this.$set(item, 'id', num)
              item.tName = item.tName + '_' + item.tType + '_' + item.createTime.substring(0, 10).replaceAll('-', '')
              item.createTime = item.createTime.substring(5, 16)
              if (item.overTime == null) {
                item.overTime = '-'
              }
              this.tableData.push(item)
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


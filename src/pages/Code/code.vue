<template>
  <div>
    当前选择的数据源为：
    <el-select v-model="selectSource" filterable placeholder="数据库源选择" @change="updateSource">
      <el-option v-for="(sources,index) in sources" :label="sources['name']" :value="index"></el-option>
    </el-select>
    <el-button @click="getTable">获取数据表</el-button>

    <el-dialog title="选择数据表" :visible.sync="dialogSelectVisible">
      <el-select v-model="selectTable" filterable placeholder="数据表选择">
        <el-option v-for="(tables,index) in tables" :label="sources['name']" :value="tables"></el-option>
      </el-select>
      <el-divider></el-divider>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSelectVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateTableSelect">选 择</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import cookie from "@/js/cookie";
import tool from "@/js/tool";

export default {
  name: "code",
  data() {
    return {
      selectSource: '',
      selectTable: '',
      dialogSelectVisible: false,
      source: [],
      sources: [],
      tables: [],
    }
  },
  created() {
    if (cookie.getCookie("id") == null){
      this.$router.push('/change');
      this.nullLogin()
    }

    this.$axios.post("/getSource",{
      id: cookie.getCookie("id")
    }).then(v=>{
      this.sources = v.data.result
      console.log(this.sources)
    })

  },
  methods: {
    notify(title,msg,type) {
      this.$notify({
        title: title,
        message: msg,
        showClose: false,
        type: type,
        duration: 2000
      })
    },
    nullLogin() {
      this.notify('该应用仅登录后使用','请先登录账号','error')
    },
    updateSource() {
      this.source = this.sources[this.selectSource]
    },
    getTable() {
      if (this.selectSource === ''){
        this.notify('当前暂未选择数据源','请选择数据源后重试','error')
      }
      else {
        let source = this.source
        let url = tool.getUrls(source['data_TYPE'],source['data_IP'],source['data_PORT'],'')
        this.$axios.post("/getTables",{
          url: url,
          userName: source['data_USERNAME'],
          userPwd: source['data_PASSWORD'],
          table: source['data_TABLE']
        }).then(v=>{
          this.tables = v.data.result
          this.dialogSelectVisible = true
        })

      }
    },
    updateTableSelect() {
      this.notify("更改数据表成功","数据表已更改为"+this.selectTable,"success")
      this.dialogSelectVisible = false
    }
  }
}
</script>

<style scoped>
.tables-info{
  overflow:scroll;
  height: 300px;
}
</style>
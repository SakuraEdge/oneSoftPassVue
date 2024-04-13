<template>
  <div>
    <el-card style="margin: 20px 20px 10px 20px">
      <div style="margin-bottom: 10px">
        <el-select v-model="selectSource" filterable placeholder="数据库源选择" @change="updateSource">
          <el-option v-for="(sources,index) in sources" :label="sources['name']" :value="index"></el-option>
        </el-select>
        <el-button @click="getTable" style="margin-left: 50px">获取数据表</el-button>
      </div>
      <span style="margin-left: 10px">
        当前选择的数据表为：{{ selectTableName }}
      </span>
    </el-card>
    <el-card style="float:left;margin:0 10px 0 20px;height: 600px;width: 74%">
      <div slot="header" style="font-weight: 600;font-size: 18px">
        操作控制台
      </div>
      <div>
        作者名(英文)：<el-input v-model="pakeageName" style="margin-left: -30px;margin-right: 50px"></el-input>
        项目名(英文)：<el-input v-model="pakeageName" style="margin-left: -30px;"></el-input>
      </div>
      <div>
        <el-button class="code-button">生成Bean对象内容</el-button>
        <el-button class="code-button">生成Controller层对象内容</el-button>
        <el-button class="code-button">生成Controller层接口内容</el-button>
        <el-button class="code-button">生成Service层对象内容</el-button>
        <el-button class="code-button">生成Service层接口内容</el-button>
        <el-button class="code-button">生成Dao层接口内容</el-button>
      </div>
      <el-divider></el-divider>
    </el-card>
    <el-card style="float: left;height: 600px;width: 23%">
      <div slot="header" style="font-weight: 600;font-size: 18px">
        代码生成区
      </div>
      <div>
        <textarea readonly style="width: 100%;height: 490px;" v-model="codeGet"></textarea>
      </div>
    </el-card>



    <el-dialog title="选择数据表" :visible.sync="dialogSelectVisible" class="table-dialog">
      <el-select v-model="selectTable" filterable placeholder="数据表选择">
        <el-option v-for="(tables,index) in tables" :label="tables['tableName']" :value="index"></el-option>
      </el-select>
      <el-divider></el-divider>
      <el-card v-if="selectTable !== ''">
        <el-scrollbar class="column-sc">
          <el-card v-for="(columns,index) in tables[Number(selectTable)]['column']" >
            <span class="column-span">
              字段名:{{columns['columnName']}}
            </span>
            <span class="column-span">
              类型:{{columns['typeName']}}
            </span>
            <el-tooltip :content="columns['remarks']" placement="top" v-if="columns['remarks'] !== ''">
              <span class="column-span-2">
                字段注释
              </span>
            </el-tooltip>
          </el-card>
        </el-scrollbar>
      </el-card>
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
      selectTableName: '',
      pakeageName: '',
      dialogSelectVisible: false,
      source: [],
      sources: [],
      tables: [],
      keys: [],
      codeGet: ''
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
      this.selectTableName = this.tables[Number(this.selectTable)]['tableName']
      this.notify("更改数据表成功","数据表已更改为"+ this.selectTableName,"success")
      this.keys = []
      for (let v of this.tables[Number(this.selectTable)]['column']) {
        this.keys.push(v['columnName'])
      }
      this.dialogSelectVisible = false
    }
  }
}
</script>

<style scoped>
.column-sc {
  overflow:scroll;
  height: 300px;
}

.column-span {
  float: left;
  width: 45%;
  margin-bottom: 2%;
}

.column-span-2 {
  float: right;
  color: #3c77ff;
  margin-bottom: 2%;
}

.table-dialog {
  padding-left: 10%;
  width: 80%;
}

.code-button {
  margin-top: 30px;
  margin-bottom: 10px;
  width: 200px;
}

</style>
<template>
  <main class="page" data-v-1156296a="">
    <section
        style="transition: transform 0.25s ease-in-out 0.08s, opacity 0.25s ease-in-out 0.08s; transform: translateY(0px); opacity: 1;">
      <div class="page-title"><h1 class="title"></h1>
        <div>
          <i class="iconfont reco-account">
            <span>
              SakuraEdge
            </span>
          </i>
        </div>
      </div>
      <div class="theme-reco-content content__default">
        <el-scrollbar class="update-bar">
          <div v-for="log in logs">
            <h3>V{{ log['version'] }} ({{ log['time'] }})  </h3>
            <ul v-for="info in log['msg']">
              <li>{{ info }} </li>
            </ul>
          </div>
        </el-scrollbar>
      </div>
    </section>


  </main>
</template>

<script>
import '@/css/log.css'
import '@/css/log-2.css'
import axios from "axios";



export default {
  name: "index",
  data() {
    return {
      logs: {}
    }
  },
  created() {
    this.$axios.post("/getUpdateLog",{}).then(v=>{
      this.logs = v.data.result
      console.log(this.logs)
    })
  }
}
</script>

<style scoped>

h3 {
  font-weight: 600;
}

ul {
  padding-bottom: 2%;
}

.update-bar{
  overflow:scroll;
  height: 460px;
  width: 100%;
}
</style>
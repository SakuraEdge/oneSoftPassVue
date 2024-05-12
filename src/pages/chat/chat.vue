<template>
  <div class="chat-window">
    <el-container >
      <el-aside width="300px">
        <div class="chat-sidebar">
          <div class="chat-users">
            <h4>访问用户</h4>
            <ul>
              <li v-for="user in users" :key="user.id">
                {{ user.name }}
              </li>
            </ul>
          </div>
        </div>
      </el-aside>
      <el-main>
        <div class="chat-divider"></div>
        <div class="chat-messages">
          <el-scrollbar class="chat-bar" ref="scrollbar">
            <div class="message" v-for="message in messages">
              <span class="message-sender">{{ message.chat_UNAME }}</span>
              <span class="message-content">{{ message.chat_MSG }}</span>
              <span class="message-time">{{ message.chat_TIME }}</span>
            </div>
          </el-scrollbar>
        </div>
        <div class="chat-input">
          <el-input
              v-model="newMessage"
              placeholder="Enter your message..."
              @keydown.enter.native="sendMessage"
          ></el-input>
          <el-button @click="sendMessage">发送</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import cookie from "@/js/cookie";
export default {
  name: "chat",
  data() {
    return {
      users: [
        {id: 1, name: 'admin'},
        {id: 2, name: 'Edge'},
      ],
      messages: '',
      newMessage: '',
    };
  },
  created() {
    this.getChatList();
  },
  mounted() {
    this.intervalId = setInterval(this.getChatList, 1000);
  },
  beforeDestroy() {
    // 在组件销毁前清除定时器，防止内存泄漏
    clearInterval(this.intervalId);
  },
  methods: {
    sendMessage() {
      if (this.newMessage === '') {
        this.$message({
          message: '当前未输入信息,请输入后重试',
          type: "error",
          duration: 1500
        })
      }
      else {
        this.$axios.post("/sendMsg",{
          id: cookie.getCookie("id"),
          msg: this.newMessage
        })
        this.newMessage = ''
      }
    },
    getChatList() {
      this.$axios.post("/getChatList",{}).then(v=>{
        this.messages = v.data.result
      })
    }
  },
}
</script>

<style scoped>
.chat-bar {
  overflow:scroll;
}

.chat-window {
  display: flex;
}

.chat-sidebar {
  padding: 20px;
}

.chat-users h4 {
  margin-top: 0;
  font-size: 1rem;
}

.chat-users li {
  margin-bottom: 10px;
  cursor: pointer;
}

.chat-users li:hover {
  background-color: #f5f7fa;
}

.chat-messages {
  padding: 20px;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
}

.chat-divider {
  border-right: 1px solid #eee;
  height: calc(100vh - 140px); /* Adjust this value based on your sidebar height and header height */
  position: absolute;
  left: 300px; /* Adjust this value to match your aside width */
  width: 1px;
}

.message {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.message-sender {
  font-weight: bold;
  font-size: 16px;
  margin-right: 10px;
}

.message-content {
  max-width: 60%;
}

.message-time {
  margin-left: auto;
  color: #9e9e9e;

}



.chat-input {
  position: fixed;
  margin-left: 300px;
  left: 0;
  bottom: 100px;
  width: 80%;
  padding: 10px; /* Adjust padding as needed */
  display: flex;
  margin-top: 20px;
}

.chat-input .el-input {
  flex: 1;
  margin-right: 10px;
}
</style>
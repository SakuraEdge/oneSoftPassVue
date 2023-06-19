<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        style = "height: 60px;width: 105%;right: 40px;
    line-height: 60px;
    background: #002866">
        <el-image :src=logoUrl style = "width: 350px; right: 580px">
        </el-image>
        <el-menu-item index="/home" style="margin-left: 450px;color: white;">主页</el-menu-item>
        <el-menu-item index="/onlineclasses" style = "color:white;">在线课堂</el-menu-item>
        <!-- <el-menu-item index="/images">图片上传</el-menu-item> -->
        <!-- 头像 -->
          <el-popover placement="top-start" width="200" trigger="hover" style = "margin-left: 500px;">
            <el-avatar :src="imageUrl" slot="reference" style = "margin-bottom: 10px"></el-avatar>
              <!-- <el-popover placement="right" width="400" trigger="click">
                <el-upload class="avatar-uploader" :action=getUrl() :show-file-list="false" accept=".jpg,.png"
                  :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-button slot="reference">上传头像</el-button>
              </el-popover>
              <br>
              <el-button @click="showUser">个人中心</el-button> -->
              <el-button @click="logout">退出登录</el-button>
          </el-popover>
      </el-menu>
    </el-header>
    <el-main style="padding: 0;overflow:hidden;">
      <router-view />
    </el-main>
    <div style="height: 100px;width: 103%;margin-left:-10px;background-color:#002866;">
    </div>
  </el-container>
</template>

<script>
// import bus from '../eventBus.js'
import avata from '@/assets/images/avatar.png'
import logo from '@/assets/images/logo.png';
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      activeIndex: '/home',
      imageUrl: avata,
      logoUrl: logo,
      uid: '',
      username: ''
    };
  },
  methods: {
    // getUrl() {
    //   return 'http://localhost:8081/szshengligroup/images/touploadavatar?uid=' + this.uid + '&createBy=' + this.username
    // },
    // 退出
    logout() {
      // 清空token
      localStorage.removeItem('token')
      // 跳转
      this.$router.push('/login')
    },
    // 个人中心
    // showUser() {
    //   let name = Cookies.get('username')
    //   this.$axios.get('/user/finduser?name=' + name).then(response => {
    //     let user = response.data
    //     this.$alert(
    //       '<div align="left"><p>昵称：' + user.name + '</p></br> <p>账号：' + user.loginAct + '</p></br> <p>手机号：' + user.tel + '</p></br> <p>邮箱：' + user.email + '</p></div>',
    //       '个人中心', {
    //       dangerouslyUseHTMLString: true
    //     })
    //   })
    // },
    handleSelect(key, keyPath) {
      if (this.$route.path.indexOf(key) == -1) {
        this.$router.push(key)
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // beforeAvatarUpload(file) {
    //   //在头像上传之前需要做的判断，如判断文件格式
    //   const isJPG = file.type === 'image/jpeg';
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //   if (!isJPG) {
    //     this.$message.error('上传头像图片只能是 JPG 格式!');
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('上传头像图片大小不能超过 2MB!');
    //   }
    // }
  },
  // created() {
  //   this.uid = Cookies.get('uid')
  //   this.username = Cookies.get('username')
  //   // 登陆后获取头像
  //   // 获取数据库的url
  //   this.$axios.get('/images/getiurl?uid=' + this.uid).then(response => {
  //     if (response.data != '') {
  //       // 获取头像
  //       let iurl = response.data
  //       this.$axios.get(iurl, {
  //         responseType: 'arraybuffer'
  //       }).then(response => {
  //         return 'data:image/png;base64,' + btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
  //       }).then(res => {
  //         this.imageUrl = res
  //       })
  //     }
  //   })
  // }
};
</script>

<style scoped>
body {
  height: 1300px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-menu-item:hover{
  font-weight:800;
}

.el-menu-item{
  background-color: #002866 !important;
}
</style>
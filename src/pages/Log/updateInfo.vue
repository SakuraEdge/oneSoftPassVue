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
          <h3> 2023/11/13</h3>
          <ul>
            <li>新增数据源查看详情 </li>
            <li>数据库中添加配置表用于存储 </li>
            <li>进行账户等级划分，新增管理员菜单入口 </li>
          </ul>
          <h3> 2023/11/02</h3>
          <ul>
            <li>优化了整体UI，修改整体数据库结构 </li>
            <li>数据库表菜单中完成部分功能 </li>
            <li>加入部分会员功能（？） </li>
          </ul>
          <h3> 2023/9/22</h3>
          <ul>
            <li>完成货币汇率页面 </li>
            <li>修改了软件手机端显示效果，基础自适应</li>
            <li>完成数据库数据源连接测试</li>
          </ul>
          <h3> 2023/9/06</h3>
          <ul>
            <li>更新了货币汇率页面 </li>
            <li>修改了更新日志样式，添加滑动框查看日志</li>
          </ul>
          <h3> 2023/6/29</h3>
          <ul>
            <li>编码转换更新完毕 </li>
          </ul>
          <h3> 2023/6/28</h3>
          <ul>
            <li>把所有页面都新建了 </li>
            <li>制作编码转换内容 </li>
            <li>完成了MD5加密与中文UniCode转换 </li>
          </ul>
          <h3> 2023/6/27</h3>
          <ul>
            <li>完善当前已有页面 </li>
            <li>新增等级经验值 </li>
          </ul>
          <h3> 2023/6/26</h3>
          <ul>
            <li>修复了部分BUG </li>
            <li style="text-decoration:line-through">今天摸了（×） </li>
          </ul>
          <h3> 2023/6/25</h3>
          <ul>
            <li>完善注册/忘记密码接口 </li>
            <li>为登录注册添加拦截器，若已登录则会自动返回首页 </li>
          </ul>
          <h3> 2023/6/21</h3>
          <ul>
            <li>新建登录注册页面 </li>
            <li>更新需登录才可使用内容的功能 </li>
          </ul>
          <h3> 2023/6/20</h3>
          <ul>
            <li>将常用网站存入数据库中，从后端数据库调取 </li>
            <li>新建更新日志页面</li>
          </ul>
          <h3> 2022/6/19</h3>
          <ul>
            <li style="text-decoration:line-through">新建文件夹（×） </li>
            <li>创建首页页面，修复css</li>
            <li>创建常用网站</li>
          </ul>
        </el-scrollbar>
      </div>
    </section>


  </main>
</template>

<script>
import '@/css/log.css'
import '@/css/log-2.css'



export default {
  name: "index"
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
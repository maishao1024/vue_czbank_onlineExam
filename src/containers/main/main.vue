<template lang="html">
  <div class="main">
    <div class="left-menu">
      <img class="logo" src="../../assets/images/czlogo.jpg" />
      <el-menu
        @select="selectItem"
        default-active="2"
        class="el-menu-vertical-demo">
        <el-menu-item index="checkin" >
          <i class="el-icon-check"></i>
          <span slot="title">在线签到</span>
        </el-menu-item>
        <el-menu-item index="examOnline" >
          <i class="el-icon-edit-outline"></i>
          <span slot="title">在线考试</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-star-off"></i>
            <span>个人中心</span>
          </template>
          <el-menu-item index="changePass">修改密码</el-menu-item>
          <el-menu-item index="informationView">我的信息</el-menu-item>
          <el-menu-item index="achievementView">我的成绩</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>试题管理</span>
          </template>
          <el-menu-item index="question">试题上传</el-menu-item>
        </el-submenu>
        <el-menu-item index="examManage" >
          <i class="el-icon-notebook-2"></i>
          <span slot="title">考试管理</span>
        </el-menu-item>
        <el-menu-item index="showGrade" >
          <i class="el-icon-trophy"></i>
          <span slot="title">成绩管理</span>
        </el-menu-item>
        <el-menu-item index="showChart" >
          <i class="el-icon-trophy"></i>
          <span slot="title">图标展示</span>
        </el-menu-item>
        <el-menu-item index="userManagement">
          <i class="el-icon-view"> </i>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right-box">
      <div class="top-bar clearfix">
        <el-dropdown class="f-r" @command="handleCommand">
          <el-button type="text" class="user-menu">
            <i class="el-icon-star-off"></i>
            {{userName}}
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import httpServer from '@/components/httpServer/httpServer.js'

export default {
  data() {
    return {
      userName: ''
    }
  },
  mounted(){
    this.userName = sessionStorage.jobNo;
  },
  methods: {
    handleCommand(command) {
      if (command == 'exit') {
        localStorage.removeItem('username');
        this.$router.push('/login');
      } else if (command == 'changePass') {
        this.$router.push('/main/personalCenter/changePass');
      }else if (command == 'information') {
        this.$router.push('/main/information/informationView');
      }else if (command == 'achievement') {
        this.$router.push('/main/achievement/achievementView');
      }else if (command == 'checkin'){
        this.$router.push('/main/checkin/checkin');
      }else if (command == 'question'){
        this.$router.push('/main/question/question');
      }else if (command == 'userManagement'){
        this.$router.push('/main/UserManagement/StudentManagement');
      }else if (command == 'showGrade'){
        this.$router.push('/main/showGrade/showGrade');
      }else if (command == 'examManage'){
        this.$router.push('/main/examManage/examManagement');
      }else if (command == 'showChart'){
        this.$router.push('/main/achievement/showChart');
      }
    },
    selectItem(i) {
      if (i == 'examOnline') { //点击在线考试
        httpServer({
            url: '/question/questions',
          }, {
            stuId: localStorage.stuId,
          })
          .then((res) => {
            let respData = res.data;
            sessionStorage.startTime = res.data.startTime;
            sessionStorage.endTime = res.data.endTime;
            for(var i = 0;i < res.data.questions.length; i ++){
              sessionStorage.questionNo = sessionStorage.questionNo + res.data.questions[i].questionNo + "&";
            }
            sessionStorage.questions = JSON.stringify(res.data.questions);
            sessionStorage.instId = res.data.instId;
            if(res.data.respCode == '1') {
              this.$router.push(`/main/exam/${respData.paperId}/0`);
            }
          })
          .catch((err) => {

          })

      } else if (i == 'changePass') {
        this.$router.push('/main/personalCenter/changePass');
      }else if (i == 'informationView'){
        this.$router.push('/main/information/informationView');
      }else if (i == 'achievementView'){
        this.$router.push('/main/achievement/achievementView');
      }else if (i == 'checkin'){
        this.$router.push('/main/checkin/checkin');
      }else if (i == 'question') {
        this.$router.push('/main/question/question');
      }else if(i == 'userManagement'){
        this.$router.push('/main/UserManagement/StudentManagement');
      }else if(i == 'showGrade'){
        this.$router.push('/main/showGrade/showGrade');
      }else if(i == 'examManage'){
        this.$router.push('/main/examManage/examManagement');
      }else if(i == 'showChart'){
        this.$router.push('/main/achievement/showChart');
      }
  }
}}
</script>

<style lang="css">
.left-menu {
  position: absolute;
  width: 200px;
  top: 0;
  left: 0;
  bottom: 0;
  border-right: 1px solid #e9e9e9;
  overflow-y: auto;
  overflow-x: hidden;
}

.left-menu .logo{
  display: block;
  width: 130px;
  margin: 50px auto;
}

.el-menu {
  border-right : none;
}

.right-box {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  min-width: 700px;
  padding: 20px 20px 0;
  position: absolute;
  top: 0;
  left: 200px;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
.top-bar {
  border: 0;
  border-bottom: 1px solid #e8e8e8;
  -webkit-box-shadow: none;
  box-shadow: none;
  line-height: 46px;
}
.right-box .user-menu {
  cursor: pointer;
  padding: 0 20px;
}

.el-button--text {
  color: #000
}

.el-button--text:hover {
  color: #000
}

</style>

<template lang="html">
  <div class="total">
    <div class="checkin">
      <div class="left">
        <div class="text" style="text-align:center">
          <!-- <p>欢迎使用本系统</p> -->
          <p>每日签到时间为<font color="red">06:00——08:00</font></p>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
        </div>

        <!--<div style = "margin-left: 42.7%" id="app">-->
        <!--{{date | formatDate}}-->
        <!--</div>-->
        <div align="center">
          <!-- <el-button style = "margin-left: 46.5%" id="button" type="primary" size="large" round @click="checkin()"><p>签到</p></el-button> -->
          <img src="../../../assets/images/timg.png" id="test" @click="sign()" style="cursor: pointer;"  />
        </div>
      </div>
      <div class="right">
        <clock id="qiu-clock"></clock>
      </div>

    </div>
  </div>
</template>

<script>
import Clock from 'vue-clock2';
import httpServer from '@/components/httpServer/httpServer.js'

import {formatDate} from '@/date.js';
import ElImage from "element-ui/packages/image/src/main";

export default {
  filters:{
    formatDate(time){
      let date = new Date(time);
      return formatDate(date, 'yyyy/MM/dd hh:mm:ss');
    }
  },
  components: {
    ElImage,
    Clock },
  data() {
    return {
      date: new Date()
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.date = new Date();
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
  // checkin(){
  //   button.disabled=true;
  //   button.style.backgroundColor="gray";
  // },
  sign() {
    httpServer({
      url: '/user/sign'
    }, {
      id: sessionStorage.id,
    })
      .then((res) => {
        if (res.data.success == true){
          this.$message({
            type: 'success',
            message: '签到成功',
          });
        } else {
          this.$message({
            type: 'info',
            message: '失败',
          });
        }
      });
  },
    clockStyle(){

    }
}
}
</script>

<style scoped>
  .total
  {
    /* overflow: hidden;
    height: 500px; */
    background-image: url('../../../assets/images/background_checkin.jpg');
    background-size: cover;
    height: 500px;
  }
  .checkin {

    display: flex;
    /* margin-top: 10%;
    margin-bottom: 100px;
    margin-left: 30%;
    margin-right: 50px; */
    /* background-color: rgba(255,255,255,0.8); */
  }
  .left{
    margin-top:10%;
    margin-left: 42%;
  }
  .right{
    /* margin-top:1%;*/
    padding-left: 15%;
    margin-right:0.05%;
  }


</style>

<style lang="css">

  #qiu-clock {
    margin-top: 10px;
    font-size: 18px;
    width: 200px;
    height: 200px;
    border: none;
    background-image: url('../../../assets/images/qiu-clock-bg.png');
    background-size: 100% 100%;
  }
  #qiu-clock .clock-circle {
    background: #f5c147;
    border: 3px solid #22aaad;
    width: 18px;
    height: 18px;
  }
  #qiu-clock .clock-circle::before {
    content: none;
  }
  #qiu-clock .clock-hour {
    background: transparent;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 50px solid #22aaad;
    top: 52px;
  }
  #qiu-clock .clock-minute {
    background: transparent;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 75px solid #22aaad;
    top: 12%;
  }
  #qiu-clock .clock-second {
    background-color: #22aaad;
    width: 2px;
  }
  #qiu-clock .hour {
    display: none;
  }


</style>

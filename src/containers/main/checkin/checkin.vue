<template lang="html">
  <div class="checkin" >
    <div style = "margin-left: 40%">
      <clock id="qiu-clock"></clock>
    </div>
        <div class="text" style="text-align:center">
          <h3>欢迎使用本系统签到，当前时间是{{date | formatDate}}</h3>
          <h3>每日签到时间为<font color="red">06:00——08:00</font></h3>
        </div>
    <!--<div style = "margin-left: 42.7%" id="app">-->
        <!--{{date | formatDate}}-->
    <!--</div>-->
    <div align="center">
    <img src="../../../assets/images/timg.png" onclick="sign()" style="cursor: pointer;"/>
    </div>
  </div>
</template>

<script>
import Clock from 'vue-clock2';
import httpServer from '@/components/httpServer/httpServer.js'

// import moment from 'moment'
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
      date: new Date(),
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.date = new Date(); // 修改数据date
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  sign() {
    alert("1");
    this.$message({
      type: 'success',
      message: '签到成功'
    });
  },

  methods: {
  checkin(){
     this.$message({
  type: 'success',
  message: '签到成功'
});
button.disabled=true;
button.style.backgroundColor="gray";
  },
  clockStyle(){

  }
}
}
</script>

<style scoped>
.checkin {
  background-image: url('../../../assets/images/login-bg-small.jpg');
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

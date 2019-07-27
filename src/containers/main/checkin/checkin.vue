.<template lang="html">

  <div class="checkin" >


<div style = "margin-left: 40%">
  <clock style="border: 3px solid; font-size: 18px; width: 200px; height: 200px;" :time="time"></clock>
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
      date: new Date()
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

<style lang="css">

/* .buttonStyle {


} */


</style>

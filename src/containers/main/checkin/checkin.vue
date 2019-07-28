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
  <img src="../../../assets/images/timg.png" @click="sign" style="cursor: pointer;"/>
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
  checkin(){
    button.disabled=true;
    button.style.backgroundColor="gray";
  },
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
            message: res.data.resMsg,
          });
        }
      });
  },
}
}
</script>

<style lang="css">

/* .buttonStyle {


} */


</style>

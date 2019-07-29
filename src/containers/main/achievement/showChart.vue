<template lang="html">
  <div class="showChart" >
    <div class="chart-wrap">
      <!-- <div id="chart1" style="height: 500px"></div>
      <div id="chart2" style="height: 300px"></div> -->

      <div id="chart1" style="height: 500px"></div>
      <div id="chart2" style="height: 500px"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import httpServer from '@/components/httpServer/httpServer.js'

export default {
    data() {
      return {
        echart1:null,
        echart2:null,
        currentPage: 1,
        pagesize: 6,
        userList: [],
        dialogStatus: "",
        textMap: {
          update: "Edit",
          create: "Create"
        },
        dialogFormVisible: true,
        ruleForm: {
          ID: '',
          grade: '',
        },
        ID:'',
        grade:'',
      };
    },

  mounted() {
  this.initEchart1();
  this.initEchart2();
  window.onresize = this.echartResize;
  },

  created() {
    this.handleUserList()
  },
  methods: {
    echartResize() {
    console.log(333);
    this.echart1.resize();
    this.echart2.resize();
    },

    initEchart1() {
      let mychart = echarts.init(document.getElementById("chart1"));
      let option = {
        tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
        },
      toolbox: {
        feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
      },
      legend: {
        data:['蒸发量','降水量','平均温度']
      },
      xAxis: [
        {
            type: 'category',
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            axisPointer: {
                type: 'shadow'
            }
        }
      ],
      yAxis: [
        {
            type: 'value',
            name: '水量',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
                formatter: '{value} ml'
            }
        },
        {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
                formatter: '{value} °C'
            }
        }
      ],
      series: [
      {
            name:'蒸发量',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
      },
      {
            name:'降水量',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
      },
      {
            name:'平均温度',
            type:'line',
            yAxisIndex: 1,
            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      }
      ] 

      };
      mychart.setOption(option);
      this.eachart=mychart;

    },

    initEchart2() {
      let mychart = echarts.init(document.getElementById("chart2"));
      
      let option = {
    backgroundColor: '#2c343c',

    title: {
        text: 'Customized Pie',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },

    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series : [
        {
            name:'访问来源',
            type:'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:274, name:'联盟广告'},
                {value:235, name:'视频广告'},
                {value:400, name:'搜索引擎'}
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
}; 

mychart.setOption(option);
this.echart = mychart
    },
    handleSizeChange: function (size) {
      this.pagesize = 6
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          httpServer({
            url: '/user/changePassword'
          }, {
            jobNo: localStorage.username,
            password: this.ruleForm.oldPass,
            newPassword: this.ruleForm.pass
          })
            .then((res) => {
              // if() {
              localStorage.removeItem('username');
              this.$router.push('/login');
              // }
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    updateUser: function(index, row) {
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      //this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    updateData:function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',})
            .then(({ value }) => {
              this.$message({
                type: 'success',
                message: '提交成功 '
              });
            }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        }
      });
    },
    deleteUser() {
      this.$confirm('此操作将删除用户信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style lang="css">
.search{
  text-align: center
}
.StudentManagement{
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
}
  #id_footer{

    width: 100%; /*展开footer宽度*/
    line-height: 40px;
    text-align: center
  }
.el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
.showChart{

  height: 90%;

}
</style>

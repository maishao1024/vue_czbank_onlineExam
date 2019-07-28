<template>
  <div>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="考试时间"
      prop="startTime">
    </el-table-column>
    <el-table-column
      label="考试名称"
      prop="examTitle">
    </el-table-column>
    <el-table-column
      label="姓名"
      prop="userName">
    </el-table-column>
    <el-table-column
      label="得分"
      prop="totalScore">
    </el-table-column>
    <el-table-column
      label="交卷时间"
      prop="handPaperTime">
    </el-table-column>
    <el-table-column>
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入考试名称搜索" @keyup.enter.native="onSubmit" clearable/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
    <!--<el-pagination-->
      <!--@size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page.sync="currentPage3"-->
      <!--:page-size="10"-->
      <!--layout="prev, pager, next, jumper"-->
      <!--:total="1000">-->
    <!--</el-pagination>-->
  </div>

</template>

<script>
  import httpServer from '@/components/httpServer/httpServer.js'

  export default {
    data() {
      return {
        tableData: '',
        search: ''
      }
    },
    mounted(){
      httpServer({
        url: '/user/myExam'
      }, {
        id: sessionStorage.id,
        username: sessionStorage.userName,
      })
        .then((res) => {
          if (res.data.success == true){
            this.tableData = res.data.data;
           } else {
            this.$message({
              type: 'info',
              message: res.data.resMsg,
            });
          }
        })
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      onSubmit(){
        httpServer({
          url: '/user/myExam'
        }, {
          id: sessionStorage.id,
          username: sessionStorage.userName,
          title: this.search,
        })
          .then((res) => {
            if (res.data.success == true){
              this.tableData = res.data.data;
            } else {
              this.$message({
                type: 'info',
                message: res.data.resMsg,
              });
            }
          })
      }
    },
  }
</script>

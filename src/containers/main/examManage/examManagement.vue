<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="开始时间"
        prop="startTime">
      </el-table-column>
      <el-table-column
        label="结束时间"
        prop="endTime">
      </el-table-column>
      <el-table-column
        label="考试名称"
        prop="title">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="state">
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
            @click="handleEdit(scope.$index, scope.row)" >设置</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.state == '待考' ? false: true">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
        url: '/paper/history'
      }, {

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

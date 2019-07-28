<template lang="html">
  <div class="userManagement">
    <el-form :inline="true" model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="工号">
        <el-input v-model="ruleForm.id" clearable></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="ruleForm.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="考试">
        <el-input v-model="ruleForm.department" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="Info">
      <el-table
        :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border style="width:100%">
        <el-table-column
          prop = "id"
          label= "工号"
        ></el-table-column>
        <el-table-column
          prop = "userName"
          label= "姓名"
        ></el-table-column>
        <el-table-column
          prop = "email"
          label= "考试"
        ></el-table-column>
        <el-table-column
          prop = "department"
          label= "成绩"
        ></el-table-column>
      </el-table>
    </div>
    <footer id="id_footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="userList.length">
      </el-pagination>
    </footer>
  </div>
</template>

<script>
  import httpServer from '@/components/httpServer/httpServer.js'

  export default {
    data() {
      return {
        currentPage: 1,
        pagesize: 10,
        userList: {},
        dialogStatus: "",
        ruleForm: {
          id: '',
          email: "",
          department: '',
        },
        id: '',
        department: '',
        email: '',
        userList: {}
      };
    },
    mounted() {
      httpServer({
        url: '/achievement/getAchievements'
      }, {
      })
        .then((res) => {
          this.userList = res.data.data;
        })
    },
    methods: {
      handleSizeChange: function () {
        this.pagesize = 10
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            httpServer({
              url: '/achievement/getAchievements'
            }, {
              jobNo: this.ruleForm.id,
              userName: this.ruleForm.name,
              achievement: this.ruleForm.department
            })
              .then((res) => {
                this.userList = res.data.data;
              })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      updateUser: function(row) {
        this.dialogStatus = "update";
        this.dialogFormVisible = true;
        this.userList.id = row.id;
        this.userList.userName = row.userName;
        this.userList.email = row.email;
        this.userList.department = row.department;
      },
    }
  }
</script>

<style lang="css">
  .userManagement{
    width: 100%;
    margin: 0 auto;
    margin-top: 50px;
  }
  #id_footer{
    width: 100%;
    line-height: 40px;
    text-align: center
  }
</style>

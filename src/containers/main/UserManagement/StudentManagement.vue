<template lang="html">
  <div class="userManagement">
      <el-form :inline="true" model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="工号">
          <el-input v-model="ruleForm.id" placeholder="工号" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="ruleForm.name" placeholder="姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="ruleForm.department" placeholder="部门" clearable></el-input>
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
         label= "邮箱"
         ></el-table-column>
       <el-table-column
         prop = "department"
         label= "部门"
         ></el-table-column>
       <el-table-column
         prop = "Options"
         label= "操作"
         ><template slot-scope="scope">
         <el-button type="primary" @click="updateUser(scope.row)">修改</el-button>
         <el-button type="danger" @click="deleteUser(scope.row)">删除</el-button>
       </template></el-table-column>
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="userList" label-width="80px" ref="userList">
        <el-form-item label="工号">
          <el-input v-model="userList.id" auto-complete="off"></el-input></el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="userList.userName"></el-input></el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userList.email"></el-input></el-form-item>
        <el-form-item label="部门">
          <el-input v-model="userList.department"></el-input></el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="updateData">修改</el-button>
      </div>
    </el-dialog>
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
        textMap: {
          update: "Edit",
          create: "Create"
        },
        dialogFormVisible: false,
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
      url: '/user/userList'
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
            url: '/user/userList'
          }, {
            jobNo: this.ruleForm.id,
            userName: this.ruleForm.name,
            department: this.ruleForm.department
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
    updateData: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',})
            .then(({ value }) => {
              this.$message({
                type: 'success',
                message: '修改成功 '
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
    deleteUser(row) {
      this.$confirm('此操作将删除用户信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        httpServer({
          url: '/user/delete'
        }, {
          jobNo: row.id
        })
          .then((res) => {
            this.userList = res.data.data;
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
          })
      })
        .catch(() => {
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

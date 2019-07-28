<template lang="html">
  <div class="StudentManagement">
      <el-form :inline="true" model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="工号">
          <el-input v-model="ruleForm.ID" placeholder="工号" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="ruleForm.name" placeholder="姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="ruleForm.department" placeholder="部门" clearable></el-input>
        </el-form-item>
       <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" disabled>查询</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
   <div class="Info">
     <el-table
       :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
       border style="width:100%">
       <el-table-column
         prop = "ID"
         label= "工号"
         ></el-table-column>
       <el-table-column
         prop = "StudentName"
         label= "姓名"
         ></el-table-column>
       <el-table-column
         prop = "StudentEmail"
         label= "邮箱"
         ></el-table-column>
       <el-table-column
         prop = "department"
         label= "部门"
         ></el-table-column>
       <el-table-column
         prop = "Options"
         label= "操作"
         ><template>
         <el-button type="update" @click="updateUser">修改</el-button>

         <el-button type="delete" @click="deleteUser">删除</el-button>
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
      <el-form :model="userList" label-width="80px" :rules="rules" ref="userList">
        <el-form-item label="工号">
          <el-input v-model="userList.ID" auto-complete="off"></el-input></el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="userList.StudentName"></el-input></el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userList.StudentEmail"></el-input></el-form-item>
        <el-form-item label="部门">
          <el-input v-model="userList.department"></el-input></el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="updateData">修改</el-button>
        <!-- <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button> -->
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
        pagesize: 6,
        userList: [],
        dialogStatus: "",
        textMap: {
          update: "Edit",
          create: "Create"
        },
        dialogFormVisible: false,
        ruleForm: {
          ID: '',
          department: '',
        },
        ID:'',
        department:'',
        userList:[{
          ID:'A8443',
          StudentName:'张三',
          StudentEmail:'35324@qq.com',
          department:'金融科技部'
        },{
          ID:'A8445',
          StudentName:'张1',
          StudentEmail:'2356@qq.com',
          department:'金融科技部'
        },{
          ID:'A4443',
          StudentName:'张1',
          StudentEmail:'35323624@qq.com',
          department:'金融科技部'
        },{
          ID:'A4443',
          StudentName:'张1',
          StudentEmail:'35323624@qq.com',
          department:'金融科技部'
        },{
          ID:'A4443',
          StudentName:'张1',
          StudentEmail:'35323624@qq.com',
          department:'金融科技部'
        },{
          ID:'A4443',
          StudentName:'张1',
          StudentEmail:'35323624@qq.com',
          department:'金融科技部'
        },{
          ID:'A4443',
          StudentName:'张1',
          StudentEmail:'35323624@qq.com',
          department:'金融科技部'
        },{
          ID:'A4443',
          StudentName:'张1',
          StudentEmail:'35323624@qq.com',
          department:'金融科技部'
        },{
          ID:'A4443',
          StudentName:'张1',
          StudentEmail:'35323624@qq.com',
          department:'金融科技部'
        },{
          ID:'A4443',
          StudentName:'张1',
          StudentEmail:'35323624@qq.com',
          department:'金融科技部'
        },{
          ID:'A4443',
          StudentName:'张1',
          StudentEmail:'35323624@qq.com',
          department:'金融科技部'
        }]

      };
    },
  created() {
    this.handleUserList()
  },
  methods: {
    handleSizeChange: function (size) {
      this.pagesize = 6
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    // handleUserList() {
    //   this.$http.get('http://localhost:3000/userList').then(res => {  //这是从本地请求的数据接口，
    //     this.userList = res.body
    //   })
    // },
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
.StudentManagement{
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
}
  #id_footer{
    height: 40px; /*设定footer高度*/
    position: absolute; /*设定footer绝对位置在底部*/
    bottom: 0;
    width: 100%; /*展开footer宽度*/
    line-height: 40px;
    text-align: center
  }
</style>

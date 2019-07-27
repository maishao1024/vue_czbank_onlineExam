<template lang="html">
  <div class="changePass">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="工号" prop="jobNo"><span style="color:red;">* </span>
        <el-col :span="10">
        <el-input  v-model="ruleForm.jobNo" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="姓名" prop="username"><span style="color:red;">* </span>
        <el-col :span="10">
        <el-input v-model="ruleForm.username" auto-complete="off" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-col :span="10">
          <el-input v-model="ruleForm.phone" auto-complete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-col :span="10">
          <el-input v-model="ruleForm.email" auto-complete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="微信号" prop="wxNo">
        <el-col :span="10">
          <el-input v-model="ruleForm.wxNo" auto-complete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-col :span="10">
          <el-input v-model="ruleForm.department" auto-complete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import httpServer from '@/components/httpServer/httpServer.js'

  export default {
    data() {
      var checkOldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入工号'));
        }
        else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入姓名'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          jobNo: '',
          username: '',
          phone: '',
          email: '',
          wxNo: '',
          department: '',
        },
        rules: {
          username: [
            { validator: validatePass, trigger: 'blur' }
          ],
          jobNo: [
            { validator: checkOldPass, trigger: 'blur' }
          ],
        }
      };
    },
    mounted(){
      this.ruleForm.jobNo = sessionStorage.jobNo;
      this.ruleForm.username = sessionStorage.userName;
      this.ruleForm.phone = sessionStorage.tel;
      this.ruleForm.email = sessionStorage.email;
      this.ruleForm.wxNo = sessionStorage.wxNo;
      this.ruleForm.department = sessionStorage.department;
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            httpServer({
              url: '/user/updateInfo'
            }, {
              id: sessionStorage.id,
              jobNo: this.ruleForm.jobNo,
              userName: this.ruleForm.username,
              email: this.ruleForm.email,
              wxNo: this.ruleForm.wxNo,
              phone: this.ruleForm.phone,
              department: this.ruleForm.department,
            })
              .then((res) => {
                if (res.data.success == true){
                  sessionStorage.jobNo = this.ruleForm.jobNo;
                  sessionStorage.userName = this.ruleForm.username;
                  sessionStorage.tel = this.ruleForm.phone;
                  sessionStorage.email = this.ruleForm.email;
                  sessionStorage.wxNo = this.ruleForm.wxNo;
                  sessionStorage.department = this.ruleForm.department;
                this.$message({
                  type: 'success',
                  message: '添加成功',
                });
                this.$router.push('/main/homepage');
                // }
              }else {
                  this.$message({
                    type: 'info',
                    message: res.data.resMsg,
                  });
                }
              })
          } else {

          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="css">
  .changePass {
    width: 60%;
    margin: 0 auto;
    margin-top: 50px;
  }
</style>

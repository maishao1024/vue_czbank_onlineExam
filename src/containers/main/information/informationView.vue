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
      this.ruleForm.username = sessionStorage.username;
      this.ruleForm.phone = sessionStorage.tel;
      this.ruleForm.email = sessionStorage.email;
      this.ruleForm.wxNo = sessionStorage.weixin;
      this.ruleForm.department = sessionStorage.department;
    },
    methods: {
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

<template lang="html">
  <div class="specific">
  <div class="changePass">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="原密码" prop="oldPass">
        <el-col :span="10">
          <el-input type="password" v-model="ruleForm.oldPass" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-col :span="10">
          <el-input type="password" v-model="ruleForm.pass" auto-complete="off" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-col :span="10">
          <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
import httpServer from '@/components/httpServer/httpServer.js'

export default {
    data() {
      var checkOldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原密码'));
        }
        else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          oldPass: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          oldPass: [
            { validator: checkOldPass, trigger: 'blur' }
          ]
        }
      };
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
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="css" scope>
  .specific{
    background-image: url('../../../assets/images/background_checkin.jpg');
    background-size:cover;
    height: 500px;
  }
.changePass {
  width: 420px;
  /* margin: 0 auto; */
  padding-top: 100px;
  padding-left:520px;
}
</style>

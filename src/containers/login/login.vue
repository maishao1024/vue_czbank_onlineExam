<template>
<div class="login">
  <div class="login-content-wrap">
    <div class="login-content">
      <img class="logo" src="../../assets/images/logo.jpg" />
      <div class="login-from">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="50px" class="demo-ruleForm" size="mini">
          <el-form-item label="学号" prop="name">
            <el-input type="text" v-model="ruleForm2.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import httpServer from '@/components/httpServer/httpServer.js'

export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入学号'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        name: '',
        password: ''
      },
      rules2: {
        name: [{
          validator: validateName,
          trigger: 'blur'
        }],
        password: [{
          validator: validatePass,
          trigger: 'blur'
        }],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          httpServer({
              url: '/user/login'
            }, {
              username: this.ruleForm2.name,
              password: this.ruleForm2.password
            })
            .then((res) => {
              var data = res.data;
              if(data.success == true) {
                sessionStorage.jobNo = data.data[0].jobNo;
                sessionStorage.username = data.data[0].username;
                sessionStorage.tel = data.data[0].phone;
                sessionStorage.email = data.data[0].email;
                sessionStorage.weixin = data.data[0].qq;
                sessionStorage.department = data.data[0].description;
                this.$router.push('/main/homepage');
              }else {
                this.$message({
                  type: 'info',
                  message: data.message,
                });
              }
            })
        } else {

          return false;
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* 登录界面 */

.login {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url('../../assets/images/login-bg-small.jpg');
  background-size: cover;
  min-height: 580px;
}

.login .login-content-wrap {
  position: absolute;
  width: 460px;
  height: 100%;
  min-height: 580px;
  background: rgba(255, 255, 255, .4);
  top: 0;
  right: 0;
}

.login .login-content {
  width: 360px;
  height: 580px;
  margin: auto;
  background: rgba(255, 255, 255, 1);
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  font-size: 12px;
  transform: translateY(-50%);
}

.login .logo {
  display: block;
  margin: 0 auto;
  margin-top: 50px
}

.login .login-form-button {
  width: 100%;
}

.login .login-from {
  width: 80%;
  margin: 0 auto;
  margin-top: 50px
}
</style>

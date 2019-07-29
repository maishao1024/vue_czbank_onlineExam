<template>
  <div class="login">
    <h1 style="color:white;margin-left:250px;margin-top:200px">欢迎进入在线签考系统</h1>
    <p style="color:white;margin-left:250px;margin-top:200px">&emsp;&emsp;————签不到考不过有限公司出品</p >
    <div class="login-content-wrap">
      <div class="login-content">
        <img class="logo" src="../../assets/images/logo.jpg" />
        <div class="login-from">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="40px" class="demo-ruleForm">
            <el-form-item label="工号" prop="name">
              <el-input type="text" v-model="ruleForm2.name" auto-complete="off" placeholder="lqw"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="123456"></el-input>
            </el-form-item>
            <el-form-item style="float:right">
              <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
              <el-button  type="update" @click="register">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="400px">
      <el-form :model="userList" label-width="40px" :rules="rules" ref="userList">
        <el-col :span="20">
        <el-form-item label="工号">
          <el-input v-model="userList.ID" auto-complete="off"></el-input></el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="姓名">
          <el-input v-model="userList.username"></el-input></el-form-item>
        </el-col>
        <el-col :span="20">
        <el-form-item label="密码">
          <el-input type="password" v-model="userList.password"></el-input></el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="updateData">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import httpServer from '@/components/httpServer/httpServer.js'

  export default {
    data() {
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入工号'));
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
        userList: [],
        dialogStatus: "",
        dialogFormVisible: false,
        textMap: {
          update: "用户注册",
          create: "Create"
        },
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
                  sessionStorage.id = data.data[0].id;
                  sessionStorage.jobNo = data.data[0].jobNo;
                  sessionStorage.userName = data.data[0].username;
                  sessionStorage.tel = data.data[0].phone;
                  sessionStorage.email = data.data[0].email;
                  sessionStorage.wxNo = data.data[0].wxno;
                  sessionStorage.department = data.data[0].department;
                  sessionStorage.level = data.data[0].level;
                  this.$router.push('/main/homepage');
                }
              })
          } else {
            return false;
          }
        });
      },
      register: function(index, row) {
        this.dialogStatus = "update";
        this.dialogFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      updateData: function() {
        this.$confirm("确认提交吗？", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',})
          .then(({ value }) => {
            httpServer({
              url: '/user/register'
            }, {
              jobNo: this.userList.ID,
              userName: this.userList.username,
              passWord: this.userList.password
            })
              .then((res) => {
                if(res.data.success == true) {
                  this.$message({
                    type: 'success',
                    message: '注册成功'
                });
                  this.dialogFormVisible = false;
                }else {
                  this.$message({
                    type: 'info',
                    message: res.data.resMsg
                  });
                }
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
        });
      },
    }
  }
</script>

<style>

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
    width: 420px;
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

  .login .login-from {
    width: 80%;
    margin: 0 auto;
    margin-top: 50px
  }
</style>

<template lang="html">
  <div class="changePass">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="题目类型" prop="region">
        <el-col :span="5">
        <el-select v-model="value">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="题目描述" prop="description">
        <el-col :span="10">
          <el-input type="textarea"
                   :autosize="{ minRows: 2, maxRows: 4}"
                   v-model="ruleForm.description" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="选项A" prop="optionA" v-show="value == 2 || value == 3">
        <el-col :span="10">
          <el-input v-model="ruleForm.optionA" auto-complete="off" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="选项B" prop="optionB" v-show="value == 2 || value == 3">
        <el-col :span="10">
          <el-input v-model="ruleForm.optionB" auto-complete="off" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="选项C" prop="optionC" v-show="value == 2 || value == 3">
        <el-col :span="10">
          <el-input v-model="ruleForm.optionC" auto-complete="off" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="选项D" prop="optionD" v-show="value == 2 || value == 3">
        <el-col :span="10">
          <el-input v-model="ruleForm.optionD" auto-complete="off" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="单选答案" prop="singleAnswer" v-show="value == 2">
        <el-radio-group v-model="ruleForm.radio">
          <el-radio label="A" border size="medium"></el-radio>
          <el-radio label="B" border size="medium"></el-radio>
          <el-radio label="C" border size="medium"></el-radio>
          <el-radio label="D" border size="medium"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="多选答案" prop="multipleAnswer" v-show="value == 3">
        <el-checkbox-group v-model="ruleForm.checkBox">
          <el-checkbox label="A" border size="medium"></el-checkbox>
          <el-checkbox label="B" border size="medium"></el-checkbox>
          <el-checkbox label="C" border size="medium"></el-checkbox>
          <el-checkbox label="D" border size="medium"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="填空答案" prop="answer" v-show="value == 1">
        <el-col :span="10">
          <el-input v-model="ruleForm.fillIn" auto-complete="off" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="解析" prop="analysis">
        <el-col :span="10">
          <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    v-model="ruleForm.analysis" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="分值" prop="score">
        <el-col :span="3">
          <el-input v-model="ruleForm.score" auto-complete="off" clearable></el-input>
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
      var validateA = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入选项A'));
        }
        else {
          callback();
        }
      };
      var validateB = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入选项B'));
        }
        else {
          callback();
        }
      };
      var validateC = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入选项C'));
        }
        else {
          callback();
        }
      };
      var validateD = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入选项D'));
        }
        else {
          callback();
        }
      };
      var validateDescription = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入题目描述'));
        } else {
          callback();
        }
      };
      var validateScore = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入分值'));
        } else {
          callback();
        }
      };
      return {
        options: [{
          value: '2',
          label: '单选题'
        }, {
          value: '3',
          label: '不定项选题'
        }, {
          value: '1',
          label: '填空题'
        }],
        value: '2',
        ruleForm: {
          description: '',
          optionA: '',
          optionB: '',
          optionC: '',
          optionD: '',
          radio: '',
          checkBox: [],
          fillIn:'',
          analysis:'',
          score: ''
        },
        rules: {
          description: [
            { validator: validateDescription, trigger: 'blur' }
          ],
          optionA: [
            { validator: validateA, trigger: 'blur' }
          ],
          optionB: [
            { validator: validateB, trigger: 'blur' }
          ],
          optionC: [
            { validator: validateC, trigger: 'blur' }
          ],
          optionD: [
            { validator: validateD, trigger: 'blur' }
          ],
          score: [
            { validator: validateScore, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        if (this.value == '1' && this.ruleForm.radio == ''){
          this.$message({
            type: 'info',
            message: '请选择正确答案',
          });
          return;
        }
        if (this.value == '2' && this.ruleForm.checkBox == ''){
          this.$message({
            type: 'info',
            message: '请选择正确答案',
          });
          return;
        }
        var numReg = /^[0-9]+$/
        var numRe = new RegExp(numReg)
        if (!numRe.test(this.ruleForm.score)) {
          this.$message({
            type: 'info',
            message: '请输入数字 ',
          });
          return;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm.checkBox);
            httpServer({
                url: '/question/add'
              }, {
                type: this.value,
                description: this.ruleForm.description,
                optionA: this.ruleForm.optionA,
                optionB: this.ruleForm.optionB,
                optionC: this.ruleForm.optionC,
                optionD: this.ruleForm.optionD,
                radio: this.ruleForm.radio,
                checkBox: this.ruleForm.checkBox.join("-"),
                fillIn: this.ruleForm.fillIn,
                analysis: this.ruleForm.analysis,
                score: this.ruleForm.score
            })
              .then((res) => {
                // if() {
                  sessionStorage.removeItem('username');

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

<style lang="css">
.changePass {
  width: 60%;
  margin: 0 auto;
  margin-top: 50px;
}
</style>

<template>
<div>
  <div class="size">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
  <el-form-item label="アカウント" prop="acco">
    <el-input type="account" v-model="ruleForm.acco" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="パスワード" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="パスワード確認" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
    <el-button class="btn" type="primary" @click="submitForm('ruleForm')">登録</el-button>
  </el-form>
  </div>
</div>
</template>

<script>
export default {
    data() {
      var validateAcco = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('アカウントを入力してください'));
        }else{
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('パスワードを入力してください'));
        }else{
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('パスワードをもう一度入力してください'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('パスワードは一致しません'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          acco: '',
          pass: '',
          checkPass:''
        },
        rules: {
          acco: [
            { validator: validateAcco, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass:[
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios
                .post('localhost:8080/users/addUsers', this.ruleForm)
                .then((res) => {
                    if (res.data.code == 200) {
                        this.getData(this.pageparm);
                        this.$message({
                            type: 'success',
                            message: '登録成功'
                        });
                        this.editFormVisible = false;
                    } else {
                        this.$message({
                            type: 'info',
                            message: res.data.msg
                        });
                        this.editFormVisible = false;
                    }
                })
                .catch();
          } else {
            console.log('error submit');
            return false;
          }
        });
      }
    }
  }
</script>

<style>
</style>

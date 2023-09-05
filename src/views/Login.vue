<template>
<div>
  <div class="size">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="アカウント" prop="acco">
    <el-input type="account" v-model="ruleForm.acco" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="パスポート" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
    <el-button class="btn" type="primary" @click="submitForm('ruleForm')">登録</el-button>
  </el-form>
  </div>
</div>
</template>

<script>
export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('アカウントを入力してください'));
        }else{
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('パスワードを入力してください'));
        }else{
          callback();
        }
      };
      return {
        ruleForm: {
          acco: '',
          pass: '',
        },
        rules: {
          acco: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios
                .post('localhost:8080/users/loginUsers', this.ruleForm)
                .then((res) => {
                    if (res.data.code == 200) {
                        this.getData(this.pageparm);
                        this.$message({
                            type: 'success',
                            message: 'ログイン成功'
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

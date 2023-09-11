<template>

<div>
    <div id="app">
    <div id="nav">
      <router-link to="/">ログイン</router-link>|
      <router-link to="/register">登録</router-link>
    </div>
  </div>
  <div class="lbody">
  <div class="size">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
  <el-form-item label="アカウント" prop="account">
    <el-input type="account" v-model="ruleForm.account" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="パスワード" prop="password">
    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="パスワード確認" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
    <el-button class="btn" type="primary" @click="submitForm('ruleForm')">登録</el-button>
  </el-form>
  </div>
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
        } else if (value !== this.ruleForm.password) {
          callback(new Error('パスワードは一致しません'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          account: '',
          password: '',
          checkPass:''
        },
        rules: {
          account: [
            { validator: validateAcco, trigger: 'blur' },
            { max:16,message:"最大16桁を超えられないでください", trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' },
            { max:16,message:"最大16桁を超えられないでください", trigger: 'blur' }
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
                .post('api/users/addUsers', this.ruleForm)
                .then((res) => {
                    if (res.data.code == 200) {
                        this.$message({
                            type: 'success',
                            message: res.data.msg
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

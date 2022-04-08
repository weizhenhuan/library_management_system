<template>
  <div class="login_container">
    <div class="login_box">          
      <div class="title">
        <h2>Login </h2>
      </div>
     <!-- 登录表单区域 -->
      <el-form class="login-form"
        :model="loginForm"
        :rules="rules"
        ref="loginFormRel">        
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input placeholder="Username" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input placeholder="Password" v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button :loading="loading" type="primary" block @click="beginLogin">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
 
  <Footer/>
</template>
<script>

import {login} from "../../api/user"
import {ElMessage} from "element-plus"
import Footer from '../../components/Footer';

export default {
  components: { Footer },
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loading: false,
      rules: {
        username: [
          { required: true, message: 'Username is required', trigger: 'blur' },
          { 
            min: 4, 
            max: 20, 
            message: 'Username length should be at least 4 characters', 
            trigger: 'blur'
          }
        ], 

        password: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            min: 8,
            max: 20,
            message: "Password length should be at least 8 characters",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    beginLogin() {
      this.$refs.loginFormRel.validate(async valid=> {
        if (!valid) return;
        this.loading = true;
 
        let res = await login(this.loginForm);
        console.log(res)
        if (res.code === 0) {
          ElMessage.success("Login successfully");
          window.sessionStorage.setItem("token", res.data);
          this.$router.push("/dashboard");
        } else {
          ElMessage.success("Login failed");
        }
      });
    }
  }
}
</script>

<style scoped>
.welcome {
  color: #fff;
  top: 40%;
  position: absolute;
  transform: translateY(-50%);
}

.login_container {
  background-image: linear-gradient(-180deg, #1a1454 0%, #0e81a5 100%);
  /*background-image: url("../images/bg_login.png");*/
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}
.title {
  color: #fff;
  text-align: center;
  font-size: 20px;
  letter-spacing: 2px;
  margin-top: 80px;
}
.login_box {
  width: 390px;
  height: 380px;
  /* background-color: #fff; */
  background-color: #2e527bb3;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(50%, -50%);
}
.el-form {
  padding: 32px;
  top: 130px;
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
}
.el-button {
  width: 100%;
}
.code {
  width: 45%;
}
img {
  /* style="width: 100px; height: 30px; margin-left:5px;vertical-align: middle;" */
  display: line-inline;
  width: 45%;
  height: 28px;
  margin-left: 10px;
  vertical-align: middle;
  border-radius: 3px;
}
.rememberMe {
  color: #fff;
}
</style>
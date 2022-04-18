<template>
  <div class="login_container">
    <div class="login_box">
      <div class="title">
        <h2>Sign in</h2>
      </div>
      <!-- 登录表单区域 -->
      <el-form class="login-form"
               :model="loginForm"
               :rules="rules"
               ref="loginFormRel">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <div class="tishi">Username:</div>
          <el-input placeholder="Username"
                    v-model="loginForm.username"
                    prefix-icon="icon-login_user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <div class="tishi">Password:</div>
          <el-input placeholder="Password"
                    v-model="loginForm.password"
                    type="password"
                    prefix-icon="icon-login_pwd"
                    show-password></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item class="login_btn">
          <el-button :loading="loading"
                     type="primary"
                     block
                     @click="beginLogin">Login</el-button>
        </el-form-item>
        <div class="register">
          New to here?
          <router-link to="register"
                       class="router">Create an account.</router-link>
        </div>
      </el-form>
    </div>
  </div>

  <LoginFooter />
</template>
<script>
import { ElMessage } from "element-plus"
import LoginFooter from "@/components/LoginFooter"

export default {
  components: { LoginFooter },
  name: "Login",
  data() {
    return {
      loginForm: {
        // username: "customer",
        // password: "12345678",
        username: "Alice",
        password: "a12345678"
      },
      loading: false,
      rules: {
        username: [
          { required: true, message: "Username is required", trigger: "blur" }
        ],

        password: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            // min: 8,
            // max: 20,
            message: "Password length should be at least 8 characters",
            trigger: "blur"
          }
        ]
      }
    }
  },

  methods: {
    beginLogin() {
      this.$refs.loginFormRel.validate(async(valid) => {
        if (!valid) return
        this.loading = true

        this.$store.dispatch("user/login", this.loginForm).then(() => {
          console.dir(ElMessage)
          this.loading = false
          ElMessage.success({
            message: "Congrats, this is a success message.",
            type: "success"
          })
          this.$router.push("/dashboard")
        }).catch((res) => {
          ElMessage.error({
            showClose: false,
            message: res.message,
            center: true
          })
          this.loading = false
        })
      })
    }
  }
}
</script>

<style scoped>
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
  margin-top: 40px;
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
  transform: translate(-50%, -50%);
}
.el-form {
  padding: 32px;
  top: 60px;
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
}
.el-button {
  margin-top: 10px;
  width: 100%;
  font-size: 18 px;
  letter-spacing: 5px;
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
.register {
  color: #fff;
  text-align: center;
  font-size: 14px;
  letter-spacing: 1px;
  margin-top: 20px;
}
.router {
  color: #ffa500;
  text-decoration: none;
}
.tishi {
  font-size: 14px;
  letter-spacing: 1px;
  color: #fff;
  padding-left: 2px;
}
</style>

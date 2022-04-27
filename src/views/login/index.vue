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
          <div class="hint">Username:</div>
          <el-input placeholder="Username"
                    v-model="loginForm.username"
                    prefix-icon="icon-login_user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <div class="hint">Password:</div>
          <el-input placeholder="Password"
                    v-model="loginForm.password"
                    type="password"
                    prefix-icon="icon-login_pwd"
                    show-password></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item class="login_btn">
          <el-button :loading="loading"
                     id="log_in_button"
                     type="success"
                     block
                     @click="beginLogin">Sign in</el-button>
        </el-form-item>
        <div class="register">
          New to here?
          <router-link to="register"
                       class="router">Create an account.</router-link>
        </div>
        <div class="vister text-center">
          <router-link to="/"
                       class="router">To use without sign in, click here</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { ElMessage } from "element-plus"

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        // username: "customer",
        // password: "12345678",
        username: "customer",
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
  background-size: cover;
  height: 100%;
}
.title {
  color: black;
  text-align: center;
  font-size: 24px;
  letter-spacing: 2px;
  margin-top: 40px;
}
.login_box {
  width: 400px;
  height: 400px;
  margin: 145px auto;
  font-size: 14px;
  background-color: rgb(245, 246, 249);
  border: 1px solid rgb(219, 221, 227);
  /* border-top: 0; */
  border-radius: 6px;
}
.el-form {
  padding: 5px 12px;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-fg-default);
  vertical-align: middle;
  background-color: var(--color-canvas-default);
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid var(--color-border-default);
  border-radius: 6px;
  outline: none;
  box-shadow: var(--color-primer-shadow-inset);
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
  color: black;
  text-align: center;
  font-size: 14px;
  letter-spacing: 1px;
  margin-top: 20px;
}
.router {
  color: #0969da;
  text-decoration: none;
}
.hint {
  font-size: 14px;
  letter-spacing: 1px;
  color: black;
  padding-left: 2px;
}
#log_in_button {
  background-color: rgb(39, 151, 62) !important;
  border-color: rgb(39, 151, 62) !important;
}
</style>

<template>
  <div style="text-align:center">
    <img src="../../assets/book.svg"
         class="imgItem"
         alt="icon">
  </div>
  <div class="title">
    <h2>Sign in</h2>
  </div>
  <div class="login_container">
    <div class="login_box">
      <!-- 登录表单区域 -->
      <el-form class="login-form"
               :model="loginForm"
               :rules="rules"
               ref="loginFormRel">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <div class="hint">Username:</div>
          <el-input placeholder="Username"
                    @keyup.enter="beginLogin"
                    v-model="loginForm.username">
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <div class="hint">Password:</div>
          <el-input placeholder="Password"
                    v-model="loginForm.password"
                    type="password"
                    @keyup.enter="beginLogin"
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
        username: "",
        password: ""
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

<style scoped lang="less">
* {
  font-family: "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji";
}
.title {
  color: black;
  text-align: center;
  font-size: 24px;
  letter-spacing: 2px;
}
.imgItem {
  width: 80px;
  height: 80px;
  margin-top: 50px;
  margin-left: 0 !important;
}
.login_container {
  background-size: cover;
  .login_box {
    width: 400px;
    height: 300px;
    margin: 0 auto;
    font-size: 16px;
    background-color: rgb(245, 246, 249);
    border: 1.5px solid rgb(219, 221, 227);
    border-radius: 8px;

    .login-form {
      padding: 5px 12px;
      font-size: 16px;
      line-height: 20px;
      color: var(--color-fg-default);
      vertical-align: middle;
      background-color: var(--color-canvas-default);
      background-repeat: no-repeat;
      background-position: right 8px center;
      border: 1px solid var(--color-border-default);
      border-radius: 8px;
      outline: none;
      box-shadow: var(--color-primer-shadow-inset);
      .hint {
        font-size: 16px;
        letter-spacing: 1px;
        color: black;
        padding-left: 2px;
      }

      .register {
        color: black;
        text-align: center;
        font-size: 16px;
        letter-spacing: 1px;
        margin-top: 20px;
      }
      .router {
        color: #0969da;
        text-decoration: none;
      }
    }
  }
}

el-input {
  padding: 5px 5px !important;
  font-size: 16px !important;
  line-height: 20px !important;
}

.el-button {
  margin-top: 10px;
  width: 100%;
  font-size: 20 px;
  letter-spacing: 5px;
}

#log_in_button {
  background-color: rgb(39, 151, 62) !important;
  border-color: rgb(39, 151, 62) !important;
  font-size: 18px;
}
</style>

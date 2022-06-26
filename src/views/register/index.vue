<template>
  <div style="text-align:center"><img src="../../assets/book.svg"
         alt="icon"
         id="book"></div>
  <div class="title">
    <h2>Sign up</h2>
  </div>
  <div class="container">
    <div class="box">
      <el-form ref="formData"
               :model="formData"
               :rules="rules"
               label-width="80px"
               style="margin-top:30px">
        <el-form-item prop="userName"
                      label="Username">
          <el-input v-model="formData.userName"
                    placeholder="Username"
                    clearable></el-input>
        </el-form-item>
        <el-form-item prop="password"
                      label="Password">
          <el-input v-model="formData.password"
                    placeholder="Password"
                    type="password"
                    show-password></el-input>
        </el-form-item>
        <el-form-item prop="cheackPassword"
                      label="Confirm">
          <el-input v-model="formData.cheackPassword"
                    placeholder="Password again"
                    type="password"
                    show-password></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="success"
                     @click="register('formData')">sign up</el-button>
          <el-button type="primary"
                     @click="resetForm('formData')"
                     style="margin-left: 145px">reset</el-button>
        </el-form-item>
      </el-form>
      <div class="goLogin">
        Already got an account?
        <router-link to="login"
                     class="router">Login in</router-link>
      </div>
    </div>

  </div>
</template>
<script>
import { ElMessage } from "element-plus"
import { register, checkUserName } from "@/api/user/login"

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password again"))
      } else if (value !== this.formData.password) {
        callback(new Error("The password and confirm password are inconsistent"))
      } else {
        callback()
      }
    }
    const chekUserName = function(rule, value, callback) {
      checkUserName(value).catch(() => {
        callback(new Error("User name already exists!"))
      }).then(callback())
    }
    return {
      formData: {
        userName: "",
        password: "",
        cheackPassword: ""
      },
      rules: {
        userName: [
          { required: true, message: "Username is required", trigger: "blur" },
          {
            min: 4,
            max: 20,
            message: "Username length should be at least 4 characters",
            trigger: "blur"
          },
          { validator: chekUserName, trigger: "blur" }
        ],
        password: [
          { required: true, message: "Password is required!", trigger: "blur" },
          {
            min: 8,
            max: 20,
            message: "Password length should be at least 8 characters",
            trigger: "blur"
          }
        ],
        cheackPassword: [{ required: true, validator: validatePass, trigger: "blur" }]
      }
    }
  },
  methods: {
    register(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          register(this.formData).then((res) => {
            ElMessage.success("Successful registration!")
            this.$store.dispatch("user/login", {
              username: this.formData.userName,
              password: this.formData.password
            }).then(() => {
              ElMessage.success("Login successfully")
              this.$router.push("/dashboard")
            })
          }).catch((res) => {
            ElMessage.error(res.message)
          })
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
#book {
  width: 80px;
  height: 80px;
  margin-top: 50px;
  margin-left: 0 !important;
}
.box {
  width: 400px;
  height: 300px;
  margin: 0 auto;
  background-color: #f5f6f9;
  border: 1.5px solid rgb(219, 221, 227);
  border-radius: 8px;
}
.el-form {
  padding: 5px 12px;
  font-size: 16px;
  line-height: 20px;
  vertical-align: middle;
  border-radius: 8px;
  outline: none;
}

.title {
  color: #000000;
  text-align: center;
  font-size: 20px;
  letter-spacing: 2px;
  margin-top: 40px;
}
.goLogin {
  color: #000000;
  text-align: center;
  font-size: 14px;
  margin-top: 20px;
}

.router {
  color: blue;
}
</style>

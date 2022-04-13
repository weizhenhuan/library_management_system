<template>
  <div class="container">
    <div class="box">
      <div class="title">
        <h2>Sign up</h2>
      </div>
      <el-form ref="formData"
               :model="formData"
               :rules="rules"
               label-width="80px">
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
          <el-button type="primary"
                     @click="register('formData')">sign up</el-button>
          <el-button @click="resetForm('formData')"
                     style="margin-left: 145px">reset</el-button>
        </el-form-item>
      </el-form>
      <div class="goLogin">
        Already having an account? <router-link to="login"
                     class="router">Login in</router-link>
      </div>
    </div>

  </div>
  <LoginFooter />
</template>
<script>
import LoginFooter from "../../components/LoginFooter"
import { ElMessage } from "element-plus"
import { register, checkUserName } from "../../api/user"

export default {
  components: { LoginFooter },
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password again'));
      } else if (value !== this.formData.password) {
        callback(new Error('The password and confirm password are inconsistent'));
      } else {
        callback();
      }
    };
    let chekUserName = function (rule, value, callback) {
      checkUserName(value).catch(() => {
        callback(new Error('User name already exists!'))
      }).then(callback())
    }
    return {
      formData: {
        userName: '',
        password: '',
        cheackPassword: ''
      },
      rules: {
        userName: [
          { required: true, message: 'Username is required', trigger: 'blur' },
          {
            min: 4,
            max: 20,
            message: "Username length should be at least 4 characters",
            trigger: "blur",
          },
          { validator: chekUserName, trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Password is required!', trigger: 'blur' },
          {
            min: 8,
            max: 20,
            message: "Password length should be at least 8 characters",
            trigger: "blur",
          },
        ],
        cheackPassword: [{ required: true, validator: validatePass, trigger: 'blur' }]
      }
    };
  },
  methods: {
    register (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          ElMessage.success('Successful registration!');
          register(this.formData).then((res) => {
            if (res.code === 0) {
              this.$store.dispatch('user/login', {
                username: this.userName,
                password: this.password,
              }).then(() => {
                ElMessage.success("Login successfully");
                this.$router.push("/dashboard");
              })
            } else {
              ElMessage.error(res.data.msg);
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
  }
};
</script>

<style scoped>
.container {
  background-color: #f7f3f3;
  height: 100%;
  width: 100%;
}
.box {
  width: 390px;
  height: 390px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
<template>
  <el-row :gutter="20">

    <el-col :span="8" :xs="24">
      <user></user>
    </el-col>

    <el-col :span="16" :xs="24">
      <information></information>
    </el-col>
  </el-row>
</template>

<script>
import User from "./components/User.vue"
import Information from "./components/Information.vue"
export default {
  components: { User, Information },
  name: "CustomerDashboard",
  setup() {
  }
}
</script>


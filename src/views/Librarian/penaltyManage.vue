<template>
  <div class="pay-container">
    <input ref="uploadInput"
           class="upload-input"
           type="number"
           @blur="e => e.target.focus()"
           @input="handleCode">
    <el-row :gutter="8">
      <el-col :span="8">
        <el-input v-model="studentID"
                  placeholder="studentID"
                  :value=studentID
                  disabled>
          <template #prepend>StudentID</template>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="primary"
                   @click="query">Query</el-button>
        <el-button type="primary"
                   v-if="current_penalty.length"
                   @click="borrow">pay</el-button>
      </el-col>
    </el-row>
    <div v-if="current_penalty.length">
      <el-table :data=current_penalty
                v-loading="loading"
                class="bookInfo">
        <el-table-column prop="bID"
                        label="Book ID" />
        <el-table-column prop="bName"
                        label="Book Name" />
        <el-table-column prop="daysOfOverDue"
                        label="Days Of OverDue" />
        <el-table-column prop="penalty"
                        label="Fine" />
      </el-table>
      <h2>You owe a total of {{sum_penalty}}$ !</h2>
      <el-button type="primary"
                 class="pay-button"
                 @click="pay">Pay</el-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity"
import { ElMessage } from "element-plus"
import { onMounted } from "@vue/runtime-core"
import { onBeforeRouteLeave, useRoute } from "vue-router"
import { getPenaltyInfo } from "../../api/user"

export default {
  name: "PayFine",
  setup() {
    const loading = ref(false)
    const route = useRoute()
    onBeforeRouteLeave(async(to, from) => {
      current_penalty.length = 0
    })

    const current_penalty = reactive([])
    const sum_penalty = ref(0)
    const studentID = ref()
    const bookID = ref("")

    const uploadInput = ref(null)

    function query() {
      loading.value = true
      getPenaltyInfo(studentID.value).then((res) => {
        current_penalty.length = 0
        current_penalty.push(...res.data.bookInfo)
        sum_penalty.value = res.data.total
        loading.value = false
      }).catch((res) => {
        ElMessage.error(res.msg)
        loading.value = false
      })
    }
    function handleCode() {
      if (uploadInput.value.value.length === 11) {
        if (studentID.value) {
          ElMessage.error("You have already logined!")
        } else {
          studentID.value = uploadInput.value.value
          query()
        }
        uploadInput.value.value = ""
      }
    }
    onMounted(() => {
      uploadInput.value.focus()
    })

    return { current_penalty,
      sum_penalty,
      studentID,
      bookID,
      uploadInput,
      handleCode,
      route,
      loading,
      query
    }
  }

}
</script>

<style scoped lang="less">
.pay-container {
  padding-left: 30px;
}
.upload-input {
  //display: none;
  //visibility: hidden;
  position: relative;
  top: -100px;
  z-index: -9999;
}

.pay-button {
  margin-top: 10px;
}
</style>

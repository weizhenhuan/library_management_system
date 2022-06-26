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
                   v-if="current_penalty.length"
                   @click="()=>{showReturn=!showReturn}">pay</el-button>
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
      <h2>You owe a total of {{sum_penalty}}￥ !</h2>
    </div>

    <Return v-model:showReturn="showReturn"
            :book="{overdue:false, 'type':'all', id:studentID, sum:sum_penalty ,bookName:'some'}"
            v-if="showReturn" />
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity"
import { ElMessage } from "element-plus"
import { onMounted } from "@vue/runtime-core"
import { onBeforeRouteLeave, useRoute } from "vue-router"
import { getPenaltyInfo } from "@/api/admin/User"
import Return from "@/components/Return"

export default {
  name: "PayFine",
  components: { Return },
  setup() {
    const loading = ref(false)
    const route = useRoute()
    onBeforeRouteLeave(async(to, from) => {
      current_penalty.length = 0
    })
    const showReturn = ref(false)

    const current_penalty = reactive([])
    const sum_penalty = ref(0)
    const studentID = ref()
    const bookID = ref("")

    const uploadInput = ref(null)

    function query() {
      loading.value = true

      /* current_penalty.push({
        "bID": "83",
        "bName": "局儿色家林",
        "daysOfOverDue": 27,
        "penalty": 16
      }) */

      getPenaltyInfo(studentID.value).then((res) => {
        current_penalty.length = 0
        current_penalty.push(...res.data.bookInfo)
        sum_penalty.value = res.data.total
      }).catch((res) => {
        ElMessage.error(res.msg)
      }).finally(() => {
        loading.value = false
      })
    }

    function handleCode() {
      if (uploadInput.value.value.length === 9) {
        studentID.value = uploadInput.value.value
        query()

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
      query,
      showReturn
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
</style>

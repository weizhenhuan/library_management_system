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
                   @click="payFine">pay</el-button>
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
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity"
import { ElMessage } from "element-plus"
import { onMounted } from "@vue/runtime-core"
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router"
import { payAllFine, payStatus } from "@/api/user"
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

    const htmlcon = ref(null)
    const router = useRouter()
    function payFine() {
      payAllFine(studentID.value, sum_penalty).then((res) => {
        htmlcon.value.innerHTML = res.data
        const arr = ["https://user.payking.app/js/jquery.min.js", "https://user.payking.app/js/sweet-alert.min.js", "https://user.payking.app/js/cashier.js"]
        arr.map((item) => {
          const script = document.createElement("script")
          script.type = "text/javascript"
          script.src = item
          document.getElementsByTagName("body")[0].appendChild(script)
        })
        polling({ fid: res.headers.fid })
      })
    }

    function polling(fid) {
      setTimeout(() => {
        payStatus(fid).then(() => {
          query()
          router.replace({
            path: "/redirect" + route.fullPath
          })
        }).catch(() => {
          polling(fid)
        })
      }, 2000)
    }

    return { current_penalty,
      sum_penalty,
      studentID,
      bookID,
      uploadInput,
      handleCode,
      route,
      loading,
      query,
      payFine
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

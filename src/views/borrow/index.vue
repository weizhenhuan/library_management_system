<template>
  <div class="borrow-container">
    <input ref="uploadInput"
           class="upload-input"
           type="number"
           @blur="e => e.target.focus()"
           @input="handleCode">
    <h1>{{route.meta.title==="borrow"?"To borrow the book,":"To return the book,"}}</h1>
    <h2>please scan the barcode with a scanner.</h2>
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
        <el-input v-model="bookID"
                  disabled
                  placeholder="Book ID">
          <template #prepend>BookID</template>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="primary"
                   @click="borrow">{{route.meta.title==="borrow"?"Borrow":"Return"}}</el-button>
      </el-col>
    </el-row>
    <el-table :data=current_book
              v-loading="loading"
              v-if="current_book.length"
              class="bookInfo">
      <el-table-column prop="bID"
                       label="Book ID" />
      <el-table-column prop="bName"
                       label="Book Name" />
      <el-table-column prop="bAuthor"
                       label="Author" />
      <el-table-column prop="bLocation"
                       label="Location" />
      <el-table-column label="Status">
        <template #default="scope">
          {{bStatusMap.get(scope.row.bStatus)}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { useStore } from "vuex"
import { reactive, ref } from "@vue/reactivity"
import { getBookByID, returnBookByID, borrowBookByID } from "@/api/book"
import { getBorrowing } from "@/api/user/info"
import { ElMessage } from "element-plus"
import { onMounted } from "@vue/runtime-core"
import { onBeforeRouteLeave, useRoute } from "vue-router"

export default {
  name: "Borrrow",
  setup() {
    const loading = ref(false)
    const bStatusMap = new Map([[1, "available"], [0, "reserved"], [-1, "borrowed"], [-2, "lost"], [-3, "damaged"]])
    const route = useRoute()
    const store = useStore()
    onBeforeRouteLeave(async(to, from) => {
      current_book.length = 0
    })

    const current_book = reactive([])
    const limit = ref(-1)
    const studentID = store.getters.token > 900000000 ? ref(store.getters.token) : ref()
    const bookID = ref("")

    function borrow() {
      loading.value = true
      if (route.meta.title === "borrow") {
        const promises = []
        for (let i = 0; i < current_book.length; i++) {
          promises.push(borrowBookByID(current_book[i].bID, studentID.value))
        }
        Promise.all(promises).then(() => {
          ElMessage.success("borrow success")
          current_book.length = 0
          loading.value = false
        }).catch((res) => {
          ElMessage.error(res.message)
          loading.value = false
        })
      } else {
        const promises = []
        for (let i = 0; i < current_book.length; i++) {
          promises.push(returnBookByID(current_book[i].bID, studentID.value))
        }
        Promise.all(promises).then(() => {
          ElMessage.success("borrow success")
          current_book.length = 0
          loading.value = false
        }).catch((res) => {
          ElMessage.error(res.message)
          loading.value = false
        })
      }
    }
    const uploadInput = ref(null)

    function handleCode() {
      if (uploadInput.value.value.length === 9) {
        loading.value = true

        if (uploadInput.value.value[0] === "1") {
          if (!studentID.value) {
            ElMessage.error("please add studentID first")
          } else if (limit.value <= 0) {
            ElMessage.error("Book borrowing limit reached")
          } else {
            for (let i = 0; i < current_book.length; i++) {
              if (current_book[i].bID === uploadInput.value.valueAsNumber) {
                ElMessage.error("You have scan this book")
                loading.value = false
                return
              }
            }
            getBookByID(uploadInput.value.valueAsNumber).then(res => {
              bookID.value = res.data.bID
              current_book.push(res.data)
            }).catch((res) => {
              ElMessage.error(res.message)
            }).finally(() => {
              loading.value = false
            })
          }
        } else if (uploadInput.value.value[0] === "9") {
          if (studentID.value) {
            ElMessage.error("login already")
          } else {
            ElMessage.success("add rId success")
            studentID.value = uploadInput.value.valueAsNumber
          }

          if (limit.value === -1) {
            getBorrowing(studentID.value).then((res) => {
              limit.value = 5 - res.data.length
            })
          }

          loading.value = false
        } else {
          ElMessage.error("error id")
          loading.value = false
        }

        uploadInput.value.value = ""
      }
    }
    // 配合@blur实现input自动聚焦
    onMounted(() => {
      uploadInput.value.focus()
      if (studentID.value && studentID.value.length) {
        getBorrowing(studentID.value).then((res) => {
          limit.value = 5 - res.data.length
        })
      }
    })

    return { borrow, current_book,
      studentID,
      bookID,
      uploadInput,
      handleCode,
      route,
      bStatusMap,
      loading
    }
  }

}
</script>

<style scoped lang="less">
.borrow-container {
  padding-left: 30px;
}
.upload-input {
  //display: none;
  //visibility: hidden;
  position: relative;
  top: -100px;
  z-index: -9999;
}
.bookInfo {
  margin-top: 30px;
}
</style>

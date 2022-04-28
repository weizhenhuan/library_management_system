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
          {{bStatusMap[scope.row.bStatus+1]}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { useStore } from "vuex"
import { reactive, ref } from "@vue/reactivity"
import { getBookByID, returnBookByID } from "@/api/book"
import { ElMessage } from "element-plus"
import { borrowBookByID } from "@/api/book"
import { onMounted } from "@vue/runtime-core"
import { onBeforeRouteLeave, useRoute } from "vue-router"

export default {
  name: "Borrrow",
  setup() {
    const loading = ref(false)
    const bStatusMap = ["borrowed", "reserved", "available"]
    const route = useRoute()
    const store = useStore()
    onBeforeRouteLeave(async(to, from) => {
      current_book.length = 0
    })

    const current_book = reactive([])
    const studentID = store.getters.token > 900000000 ? ref(store.getters.token) : ref()
    const bookID = ref("")
    function borrow() {
      loading.value = true
      if (route.meta.title === "borrow") {
        for (let i = 0; i < current_book.length; i++) {
          if (current_book[i].bStatus !== -1 && studentID.value.length && i + 1 !== current_book.length) {
            borrowBookByID(current_book[i].bID, studentID.value).catch((res) => {
              ElMessage.error(res.message)
            })
          } else if (i + 1 === current_book.length) {
            borrowBookByID(current_book[i].bID, studentID.value).then(() => {
              ElMessage.success("borrow success")
              current_book.length = 0
              loading.value = false
            }).catch((res) => {
              ElMessage.error(res.message)
              loading.value = false
            })
          }
        }
      } else {
        for (let i = 0; i < current_book.length; i++) {
          if (current_book[i].bStatus === -1 && studentID.value.length && i + 1 !== current_book.length) {
            returnBookByID(current_book[i].bID, studentID.value).catch((res) => {
              ElMessage.error(res.message)
            })
          } else if (i + 1 === current_book.length) {
            returnBookByID(current_book[i].bID, studentID.value).then(() => {
              ElMessage.success("return success")
              current_book.length = 0
              loading.value = false
            }).catch((res) => {
              ElMessage.error(res.message)
              loading.value = false
            })
          }
        }
      }
    }
    const uploadInput = ref(null)

    function handleCode() {
      if (uploadInput.value.value.length === 9) {
        loading.value = true
        if (uploadInput.value.value[0] !== "9") {
          getBookByID(uploadInput.value.valueAsNumber).then(res => {
            bookID.value = res.data.bID
            current_book.push(res.data)
            loading.value = false
          }).catch((res) => {
            ElMessage.error(res.message)
            loading.value = false
          })
        } else {
          if (studentID.value) {
            ElMessage.error("login already")
          } else {
            ElMessage.success("add rId success")
            studentID.value = uploadInput.value.valueAsNumber
          }
          loading.value = false
        }
        uploadInput.value.value = ""
      }
    }
    // 配合@blur实现input自动聚焦
    onMounted(() => {
      uploadInput.value.focus()
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

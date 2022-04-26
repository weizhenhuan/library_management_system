<template>
  <div>
    <input ref="uploadInput"
           class="upload-input"
           type="number"
           @blur="e => e.target.focus()"
           @input="handleCode">
    <h1>{{route.meta.title==="borrow"?"Borrow Books":"Return Books"}}</h1>
    <h2>Please scan the code with a code scanner</h2>
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
      <el-table-column prop="bStatus"
                       label="Status" />
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
    const route = useRoute()
    const store = useStore()
    onBeforeRouteLeave(async(to, from) => {
      current_book.length = 0
    })

    const current_book = reactive([])
    const studentID = ref(store.getters.token)
    const bookID = ref("")
    function borrow() {
      if (route.meta.title === "borrow") {
        try {
          for (let i = 0; i < current_book.length; i++) {
            if (current_book[i].bStatus !== -1) {
              borrowBookByID(current_book[i].bID, studentID.value).catch((res) => {
                throw (new Error("error"))
              })
            }
          }
          ElMessage.success("borrow success")
        } catch {
          ElMessage.error("borrow failed")
        }
      } else {
        try {
          for (let i = 0; i < current_book.length; i++) {
            if (current_book[i].bStatus === -1) {
              returnBookByID(current_book[i].bID, studentID.value).catch((res) => {
                throw (new Error("error"))
              })
            }
          }
          ElMessage.success("borrow success")
        } catch {
          ElMessage.error("borrow failed")
        }
      }
      current_book.length = 0
    }
    const uploadInput = ref(null)

    function handleCode() {
      if (uploadInput.value.value.length === 9) {
        if (uploadInput.value.value[0] !== "9") {
          getBookByID(uploadInput.value.valueAsNumber).then(res => {
            uploadInput.value.value = ""
            bookID.value = res.data.bID
            current_book.push(res.data)
          }).catch((res) => {
            ElMessage.error(res.msg)
          })
        } else {
          if (store.getters.roles.length) {
            ElMessage.error("login already")
          } else {
            studentID.value = uploadInput.value.valueAsNumber
          }
        }
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
      route
    }
  }

}
</script>

<style scoped lang="less">
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

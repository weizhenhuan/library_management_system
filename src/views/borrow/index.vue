<template>
  <h1>Borrow Books</h1>
  <el-row :gutter="8">
    <el-col :span="8">
      <el-input v-model="studentID" placeholder="studentID" :value=studentID :disabled=customer_role>
        <template #prepend>StudentID</template>
      </el-input>
    </el-col>
    <el-col :span="8">
      <el-input v-model="bookID" placeholder="Book ID" @keyup.enter="scan_book(bookID)">
        <template #prepend>BookID</template>
      </el-input>
    </el-col>
    <el-col :span="8">
      <el-button type="primary" @click="borrow">Borrow</el-button>
    </el-col>
  </el-row>
  <el-table :data=current_book class="bookInfo">
    <el-table-column prop="bID" label="Book ID"  />
    <el-table-column prop="bName" label="Book Name"  />
    <el-table-column prop="bAuthor" label="Author"  />
    <el-table-column prop="bLacation" label="Location"  />
    <el-table-column prop="bStatus" label="Status"  />
  </el-table>

</template>

<script>
import { useStore } from "vuex"
import { reactive, ref } from "@vue/reactivity"
import { getBookById } from "@/api/book"
import { ElMessage } from "element-plus"
import { borrowBookByID } from "@/api/book"

export default {
  name: "Borrrow",
  setup() {
    const customer_role = useStore().getters.roles.includes("customer")
    const current_book = reactive([])
    current_book.push({
      bID: "1",
      bName: "1",
      bAuthor: "1",
      bLacation: "1",
      bStatus: "available"
    })
    const bookID = ref("")
    function scan_book(bookID) {
      getBookById(bookID).then(res => {
        if (res.code === 200) {
          current_book.push(res.data)
        } else {
          ElMessage.error(res.data.msg)
        }
      })
      bookID.value = ""
    }

    function borrow() {
      for (let i = 0; i < current_book.length; i++) {
        if (current_book[i].bStatus === "available") {
          borrowBookByID(current_book[i].bID, this.studentID).then(res => {
            if (res.data.code === 200) {
              ElMessage.success("borrow successfully")
            } else {
              ElMessage.error(res.data.msg)
            }
          })
        } else {
          ElMessage.error("borrow failed")
        }
      }
      this.current_book.length = 0
    }

    return { customer_role, scan_book, borrow, current_book,
      studentID: useStore().getters.token,
      bookID
    }
  }

}
</script>

<style scoped lang="less">
.bookInfo {
  margin-top: 30px;
}
</style>

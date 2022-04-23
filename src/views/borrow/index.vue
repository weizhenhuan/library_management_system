<template>
  <h1>Borrow Books</h1>
  <el-row :gutter="8">
    <el-col :span="8">
      <el-input v-model="studentID" placeholder="studentID" :value=studentID :disabled=customer_role>
        <template #prepend>StudentID</template>
      </el-input>
    </el-col>
    <el-col :span="8">
      <el-input v-model="bookID" placeholder="Book ID" >
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
import { getBookByID } from "@/api/book"
import { ElMessage } from "element-plus"
import { borrowBookByID } from "@/api/book"
export default {
  name: "Borrrow",
  created() {
    window.document.onkeypress = (e) => {
      if (window.event) { // IE
        this.nextCode = e.keyCode
      } else if (e.which) { // Netscape/Firefox/Opera
        this.nextCode = e.which
      }
      if (e.which === 13) { // 键盘回车事件
        if (this.code.length < 3) return // 扫码枪的速度很快，手动输入的时间不会让code的长度大于2，所以这里不会对扫码枪有效
        console.log("扫码结束。")
        console.log("条形码：", this.code)
        this.parseQRCode(this.code) // 获取到扫码枪输入的内容，做别的操作
        this.lastCode = ""
        this.lastTime = ""
        return
      }
      this.nextTime = new Date().getTime()
      if (!this.lastTime && !this.lastCode) {
        this.code = "" // 清空上次的条形码
        this.code += e.key
        console.log("扫码开始---", this.code)
      }
      if (this.lastCode && this.lastTime && this.nextTime - this.lastTime > 500) { // 当扫码前有keypress事件时,防止首字缺失
        this.code = e.key
        console.log("防止首字缺失。。。", this.code)
      } else if (this.lastCode && this.lastTime) {
        this.code += e.key
        console.log("扫码中。。。", this.code)
      }
      this.lastCode = this.nextCode
      this.lastTime = this.nextTime
    }
  },
  methods: {
    parseQRCode(code) {
      if (code === this.bookID) {
        this.bookID = ""
        getBookByID(code).then(res => {
          if (res.code === 200) {
            this.current_book.push(res.data)
          } else {
            ElMessage.error(res.data.msg)
          }
        })
        this.$emit("barCode", code) //  通知父组件
      }
      this.codeValue = code
    }
  },

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
    const studentID = ref(useStore().getters.token)
    const bookID = ref("")
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

    return { customer_role, borrow, current_book,
      studentID,
      bookID,
      codeValue: "",
      code: "",
      lastTime: "",
      nextTime: "",
      lastCode: "",
      nextCode: "",
      dtmainId: ""
    }
  }

}
</script>

<style scoped lang="less">
.bookInfo {
  margin-top: 30px;
}
</style>

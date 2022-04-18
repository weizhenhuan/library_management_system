<template>
  <el-dialog :title="type"
             width="30%"
             :model-value="isShow"
             :before-close="change"
             destroy-on-close>
    <div>
      <div>Book-Name:{{book.bookName}}</div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="change">Cancel</el-button>
        <el-button type="primary"
                   @click="borrowBook">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { toRef } from "@vue/reactivity"
import { renewBookByID, borrowBookByID } from "@/api/book"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from "element-plus"

export default {
  name: "Return",
  props: {
    book: {
      type: Object,
      required: true
    },
    showBorrow: {
      type: Boolean,
      required: true
    },
    type: {
      type: String,
      default: "borrow"
    }
  },
  emits: ["update:showBorrow"],
  setup(props, { emit }) {
    const isShow = toRef(props, "showBorrow")
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    function change() {
      emit("update:showBorrow", false)
    }
    function borrowBook() {
      if (props.type === "borrow") {
        borrowBookByID(props.book.id, store.getters.token, 10).then(() => {
          ElMessage.success({
            message: "borrow success!.",
            type: "success"
          })
          change()
          router.replace({
            path: "/redirect" + route.fullPath
          })
        }).catch((res) => {
          ElMessage.error({
            message: res.message,
            center: true
          })
        })
        // chaoyesaad
      } else {
        renewBookByID(props.book.id, store.getters.token, 10).then(() => {
          ElMessage.success({
            message: "renew success.",
            type: "success"
          })
          change()
          router.replace({
            path: "/redirect" + route.fullPath
          })
        }).catch((res) => {
          ElMessage.error({
            message: res.message,
            center: true
          })
        })
      }
    }
    return { isShow, change, borrowBook }
  }
}
</script>


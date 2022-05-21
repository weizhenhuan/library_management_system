<template>
  <el-dialog :title="type"
             width="30%"
             :model-value="isShow"
             :before-close="change"
             destroy-on-close>
    <div>
      <div>Book-Name:{{book.bookName}}</div>
      <el-button type="text"
                 style="margin-top:20px"
                 disabled>{{book.isReserved?'Are you sure to cancel the reservation?':'You need check out the book within four hours'}}</el-button>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary"
                   @click="reserveBook">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, toRef } from "@vue/reactivity"
import { reserveBookByID, cancelBookByID } from "@/api/book"
import { ElMessage } from "element-plus"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"

export default {
  name: "Return",
  props: {
    book: {
      type: Object,
      required: true
    },
    showReserve: {
      type: Boolean,
      required: true
    },
    type: {
      type: String,
      default: "reserve"
    }
  },
  emits: ["update:showReserve"],
  setup(props, { emit }) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const isShow = toRef(props, "showReserve")
    function change() {
      emit("update:showReserve", false)
    }
    function reserveBook() {
      if (props.type === "reserve") {
        reserveBookByID(store.getters.token, props.book.id).then((res) => {
          ElMessage.success("successfully reserved!")
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
      } else {
        cancelBookByID(props.book.id, store.getters.token).then((res) => {
          ElMessage.success("successfully canceled!")
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
    const input = ref()
    return { isShow, change, input, reserveBook }
  }
}
</script>


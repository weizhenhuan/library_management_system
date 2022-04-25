<template>
  <el-dialog :title="type"
             width="30%"
             :model-value="isShow"
             :before-close="change"
             destroy-on-close>
    <div>
      <div>Book-Name:{{book.bookName}}</div>
      <el-button type="text" @click="open" style="margin-top:20px" disabled>{{book.isReserved?'Are you sure to cancel the reservation?':'You need check out the book within four hours'}}</el-button>
    </div>
    <template #footer>
      <span class="dialog-footer">
<!--        <el-button @click="change">Cancel</el-button>-->
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
    const isShow = toRef(props, "showReserve")
    function change() {
      emit("update:showReserve", false)
    }
    function reserveBook() {
      if (!props.book.isReserved) {
        reserveBookByID(props.book.id, this.$store.getters.token).then((res) => {
          ElMessage.success({
            message: "successfully reserved!",
            type: "success"
          })
          change()
          location.reload()
        }).catch((res) => {
          ElMessage.error({
            message: "reservation failed...",
            center: true
          })
        })
      } else {
        cancelBookByID(props.book.id, this.$store.getters.token).then((res) => {
          if (res.isSuccess) {
            ElMessage.success({
              message: "successfully canceled!",
              type: "success"
            })
          } else {
            ElMessage.error({
              message: "cancellation failed...",
              center: true
            })
          }
          location.reload()
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


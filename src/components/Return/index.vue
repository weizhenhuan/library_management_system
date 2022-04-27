<template>
  <el-dialog title="Return Book"
             width="30%"
             :model-value="isShow"
             :before-close="change"
             destroy-on-close>
    <div>
      <span>Confirm return of the book?</span>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="change">Cancel</el-button>
        <el-button type="primary"
                   @click="returnBook">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { toRef } from "@vue/reactivity"
import { returnBookByID } from "@/api/book"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"

export default {
  name: "Return",
  props: {
    book: {
      type: Object,
      required: true
    },
    showReturn: {
      type: Boolean,
      required: true
    }
  },
  emits: ["update:showReturn"],
  setup(props, { emit }) {
    const isShow = toRef(props, "showReturn")
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    function change() {
      emit("update:showReturn", false)
    }
    function returnBook() {
      if (!props.book.overdue) {
        returnBookByID(props.book.id, store.getters.token).then(() => {
          change()
          router.replace({
            path: "/redirect" + route.fullPath
          })
        })
      }
    }
    return { isShow, change, returnBook }
  }
}
</script>


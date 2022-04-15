<template>
  <el-dialog title="Return Book"
             width="30%"
             :model-value="isShow"
             :before-close="change"
             destroy-on-close>
    <div>
      <span>书的价格是{{ book.price }}￥,是否确认买书？</span>
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
import { buyBookByID } from "@/api/book"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"

export default {
  name: "Return",
  props: {
    book: {
      type: Object,
      required: true
    },
    showBuy: {
      type: Boolean,
      required: true
    }
  },
  emits: ["update:showBuy"],
  setup(props, { emit }) {
    const isShow = toRef(props, "showBuy")
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    function change() {
      emit("update:showBuy", false)
    }
    function returnBook() {
      buyBookByID(props.book.id, store.getters.token).then(() => {
        change()
        router.replace({
          path: "/redirect" + route.fullPath
        })
      })
    }
    return { isShow, change, returnBook }
  }
}
</script>

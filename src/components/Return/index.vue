<template>
  <el-dialog title="Return Book"
             width="70%"
             :model-value="isShow"
             :before-close="change"
             destroy-on-close>
    <div ref="htmlcon">
      <div>
        <span>{{book}}</span>
      </div>
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
import { ref, toRef } from "@vue/reactivity"
import { payFine, payStatus } from "@/api/user"
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

    const htmlcon = ref(null)
    function returnBook() {
      if (props.book.overdue) {
        payFine({ bookID: props.book.id, userID: store.getters.token }).then((res) => {
          htmlcon.value.innerHTML = res.data
          polling({ fid: res.headers.fid })
        })
      }
    }

    function polling(fid) {
      setTimeout(() => {
        payStatus(fid).then(() => {
          change()
          router.replace({
            path: "/redirect" + route.fullPath
          })
        }).catch(() => {
          polling(fid)
        })
      }, 2000)
    }
    return { isShow, change, returnBook, htmlcon }
  }
}
</script>


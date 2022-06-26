<template>
  <el-dialog title="Return Book"
             width="70%"
             :model-value="isShow"
             :before-close="change"
             destroy-on-close>
    <div ref="htmlcon">
      <div>
        <span>《{{book.bookName}}》overdue, please pay a fine</span>
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
import { payFine, payAllFine } from "@/api/user/operation"
import { payStatus } from "@/api/user/info"
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
          const arr = ["https://user.payking.app/js/jquery.min.js", "https://user.payking.app/js/sweet-alert.min.js", "https://user.payking.app/js/cashier.js"]
          arr.map((item) => {
            const script = document.createElement("script")
            script.type = "text/javascript"
            script.src = item
            document.getElementsByTagName("body")[0].appendChild(script)
          })
          polling({ fid: res.headers.fid })
        })
      } else {
        payAllFine(props.book.id, props.book.sum).then((res) => {
          htmlcon.value.innerHTML = res.data
          const arr = ["https://user.payking.app/js/jquery.min.js", "https://user.payking.app/js/sweet-alert.min.js", "https://user.payking.app/js/cashier.js"]
          arr.map((item) => {
            const script = document.createElement("script")
            script.type = "text/javascript"
            script.src = item
            document.getElementsByTagName("body")[0].appendChild(script)
          })
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


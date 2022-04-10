<template>
  <el-dialog title="Return Book"
             width="30%"
             :model-value="isShow"
             :before-close="change"
             destroy-on-close>
    <div v-if="book.overdue">
      <span>您已逾期，请正确输入书名进行还书</span>
      <el-input v-model="input"
                style="margin-top:20px"
                placeholder="Please input" />
    </div>
    <div v-else>
      <span>是否确认还书？</span>
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
import { ref, toRef } from '@vue/reactivity'
import { returnBookByID } from '@/api/book'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'return',
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
  emits: ['update:showReturn'],
  setup (props, { emit }) {
    let isShow = toRef(props, 'showReturn')
    let store = useStore()
    let router = useRouter()
    let route = useRoute()
    function change () {
      emit('update:showReturn', false)
    }
    function returnBook () {
      if (props.book.overdue && input.value == props.book.bookName) {
        returnBookByID(props.book.id, store.getters.token).then(() => {
          change()
          router.replace({
            path: '/redirect' + route.fullPath
          })
        })
      } else if (!props.book.overdue) {
        returnBookByID(props.book.id, store.getters.token).then(() => {
          change()
          router.replace({
            path: '/redirect' + route.fullPath
          })
        })
      }
    }
    let input = ref('')
    return { isShow, change, input, returnBook }
  },
}
</script>


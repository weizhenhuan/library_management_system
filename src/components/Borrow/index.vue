<template>
  <el-dialog :title="type"
             width="30%"
             :model-value="isShow"
             :before-close="change"
             destroy-on-close>
    <div>
      <div>Book-Name:{{book.bookName}}</div>
      <el-input v-model="input"
                type="number"
                style="margin-top:20px"
                :placeholder="type==='borrow'?'Please enter the borrowing days':'Please enter the renewal days'" />
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
import { ref, toRef } from '@vue/reactivity'
import { renewBookByID, borrowBookByID } from '@/api/book'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'return',
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
      default: 'borrow'
    }
  },
  emits: ['update:showBorrow'],
  setup (props, { emit }) {
    let isShow = toRef(props, 'showBorrow')
    let store = useStore()
    let route = useRoute()
    let router = useRouter()
    function change () {
      emit('update:showBorrow', false)
    }
    function borrowBook () {
      if (props.type === 'borrow') {
        borrowBookByID(props.book.id, store.getters.token, input.value).then(() => {
          router.replace({
            path: '/redirect' + route.fullPath
          })
        })
      } else {
        renewBookByID(props.book.id, store.getters.token, input.value).then(() => {
          router.replace({
            path: '/redirect' + route.fullPath
          })
        })
      }
    }
    let input = ref()
    return { isShow, change, input, borrowBook }
  },
}
</script>


<template>
  <el-dialog :title="type"
             width="30%"
             :model-value="isShow"
             :before-close="change"
             destroy-on-close>
    <div>
      <el-input v-model="categoryName"
                placeholder="Input new category"
                :disabled="props.type==='delete'"/>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="change">Cancel</el-button>
        <el-button type="primary"
                   @click="addcategory">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, toRef } from "@vue/reactivity"
import { addCategory, updateCategory, deleteCategory } from "@/api/admin"
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from "element-plus"

export default {
  name: "Category",
  props: {
    curCategory: {
      type: Object,
      required: true
    },
    showAddCategory: {
      type: Boolean,
      required: true
    },
    type: {
      type: String,
      default: "add"
    }
  },
  emits: ["update:showAddCategory"],
  setup(props, { emit }) {
    const isShow = toRef(props, "showAddCategory")
    const route = useRoute()
    const router = useRouter()
    const categoryName = ref("")
    function change() {
      emit("update:showAddCategory", false)
    }
    function addcategory() {
      console.log("haha")
      if (props.type === "add") {
        addCategory(categoryName).then(() => {
          ElMessage.success({
            message: "add success!.",
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
      } else if (props.type === "edit") {
        updateCategory(props.curCategory.category, categoryName).then(() => {
          ElMessage.success({
            message: "update success.",
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
      } else {
        deleteCategory(props.curCategory.category).then(() => {
          ElMessage.success({
            message: "delete success.",
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
    return { isShow, change, categoryName, addcategory }
  }
}
</script>


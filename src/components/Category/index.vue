<template>
  <el-dialog :title="type"
             width="30%"
             :model-value="isShow"
             :before-close="change"
             destroy-on-close>
    <div>
      <el-input v-model="categoryName"
                v-if="props.type!=='delete'"
                placeholder="Input new category" />
    </div>
    <div>
      <el-button type="text"
                 v-if="props.type==='delete'"
                 diabled>
        Are you sure to delete the category?
      </el-button>
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
import { addCategory, updateCategory, deleteCategory } from "@/api/admin/Category"
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
    const router = useRouter()
    const route = useRoute()
    const categoryName = ref("")
    function change() {
      emit("update:showAddCategory", false)
    }
    function addcategory() {
      if (props.type === "add") {
        addCategory(categoryName.value).then(() => {
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
        updateCategory(props.curCategory.category, categoryName.value).then(() => {
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
    return { props, isShow, change, categoryName, addcategory }
  }
}
</script>


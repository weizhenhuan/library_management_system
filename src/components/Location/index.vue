<template>
  <el-dialog :title="type"
             width="30%"
             :model-value="isShow"
             :before-close="change"
             destroy-on-close>
    <div>
      <el-row>
        <el-col :span="10">
          <el-input v-model="locationArea"
                    v-if="props.type!=='delete'"
                    placeholder="Input new location area" />
        </el-col>
        <el-col :span="10">
          <el-input v-model="locationFloor"
                    v-if="props.type!=='delete'"
                    placeholder="Input new location floor" />
        </el-col>
      </el-row>
    </div>
    <div>
      <el-button type="text"
                 v-if="props.type==='delete'"
                 diabled>
        Are you sure to delete the location?
      </el-button>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="change">Cancel</el-button>
        <el-button type="primary"
                   @click="addlocation">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, toRef } from "@vue/reactivity"
import { addLocation, updateLocation, deleteLocation } from "@/api/admin/Location"
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from "element-plus"

export default {
  name: "Location",
  props: {
    curLocation: {
      type: Object,
      required: true
    },
    showAddLocation: {
      type: Boolean,
      required: true
    },
    type: {
      type: String,
      default: "add"
    }
  },
  emits: ["update:showAddLocation"],
  setup(props, { emit }) {
    const isShow = toRef(props, "showAddLocation")
    const route = useRoute()
    const router = useRouter()
    const locationArea = ref("")
    const locationFloor = ref("")
    function change() {
      emit("update:showAddLocation", false)
    }
    function addlocation() {
      if (props.type === "add") {
        addLocation(locationArea.value + "-" + locationFloor.value).then(() => {
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
        updateLocation(props.curLocation.location, locationArea.value + "-" + locationFloor.value).then(() => {
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
        deleteLocation(props.curLocation.location).then(() => {
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
    return { props, isShow, change, locationArea, locationFloor, addlocation }
  }
}
</script>


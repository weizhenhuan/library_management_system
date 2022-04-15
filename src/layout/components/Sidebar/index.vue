<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :collapse="isCollapse"
               :unique-opened="false"
               :collapse-transition="false"
               default-active="/dashboard"
               :background-color="variables.menuBg"
               :text-color="variables.menuText"
               mode="vertical">
        <sidebar-item v-for="route in routes"
                      :key="route.path"
                      :item="route"
                      :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core"
import { useStore } from "vuex"
import SidebarItem from "./SidebarItem"
import variables from "@/less/variables.less"
// import { useRouter } from "vue-router";
export default {
  components: { SidebarItem },
  setup() {
    const store = useStore()

    const routes = computed(() => store.getters.routes)
    const isCollapse = computed(() => {
      return store.getters.isCollapse
    })

    return { routes, isCollapse, variables }
  }
}
</script>


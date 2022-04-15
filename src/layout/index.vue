<template>
  <div :class="classObj"
       class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core"
import { useStore } from "vuex"
import { AppMain, Navbar, Sidebar } from "./components"

export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
    Sidebar
  },
  setup() {
    const store = useStore()
    const classObj = computed(() => {
      return {
        hideSidebar: store.getters.isCollapse,
        openSidebar: !store.getters.isCollapse
      }
    })
    // store.dispatch('permission/initRoutes')
    return { classObj }
  }

}
</script>


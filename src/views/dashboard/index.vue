<template>
  <component :is="dashboard" />
</template>

<script>
import { ref } from "@vue/reactivity"
import { useStore } from "vuex"
import { defineAsyncComponent } from "@vue/runtime-core"

export default {
  name: "Dashboard",
  components: {
    adminDashboard: defineAsyncComponent(() => import("./admin")),
    customerDashboard: defineAsyncComponent(() => import("./customer")),
    visitorDashboard: defineAsyncComponent(() => import("./visitor"))
  },
  setup() {
    const dashboard = ref("visitorDashboard")
    if (useStore().getters.roles.includes("customer")) {
      dashboard.value = "customerDashboard"
    } else if (useStore().getters.roles.includes("admin")) {
      dashboard.value = "adminDashboard"
    }
    return { dashboard }
  }
}
</script>

<template>
  <component :is="dashboard" />
</template>

<script>
import { ref } from "@vue/reactivity"
import { useStore } from "vuex"
import adminDashboard from "./admin"
import customerDashboard from "./customer"

export default {
  name: "Dashboard",
  components: { adminDashboard, customerDashboard },
  setup() {
    const dashboard = ref("customerDashboard")
    if (useStore().getters.roles.includes("admin")) {
      dashboard.value = "adminDashboard"
    }
    return { dashboard }
  }
}
</script>

<template>
  <div>
  </div>
</template>
<script>
import { useRoute, useRouter } from "vue-router"
export default {
  name: "Redirect",
  setup() {
    const route = useRoute()
    const router = useRouter()
    console.log("redirect:", route)
    const { params, query } = route
    const { path } = params
    console.log(path, params, query)
    router.replace({ path: "/" + path, query })
  }
}
</script>

<template>
  <div>
    <div class="text-center"
         v-if="isAdmin">
      <img src="@/assets/admin.svg"
           alt="user">
      <h1>Hi, Administrator</h1>
      <h3>Welcome</h3>
    </div>
    <div v-else
         class="text-center visitor">
      <div style="margin-right:90px">
        <img src="@/assets/borrow.svg"
             @click="jump('/book/borrow')"
             alt="user">
        <h1>Borrow</h1>
      </div>
      <div>
        <img src="@/assets/return.svg"
             @click="jump('/book/return')"
             alt="user">
        <h1>Return</h1>
      </div>
    </div>
  </div>

</template>

<script>
import { useRouter } from "vue-router"
import { useStore } from "vuex"

export default {
  name: "AdminDashboard",
  setup() {
    const store = useStore()
    const router = useRouter()
    const isAdmin = !!store.getters.roles.length

    function jump(path) {
      router.push({ path: path })
    }
    return { isAdmin, jump }
  }
}
</script>

<style scoped>
img {
  width: 250px;
  height: 250px;
  padding: 30px;
  margin-top: 50px;
  margin-bottom: 20px;
  border-radius: 25%;
  background-color: #f6f8fa;
  cursor: pointer;
}
.visitor {
  padding-top: 70px;
  display: flex;
  justify-content: center;
}
</style>


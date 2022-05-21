<template>
  <el-button @click="jump">jump</el-button>
</template>

<script>
import { useRouter } from "vue-router"
export default {
  name: "Profile",
  setup() {
    const cList = ["123456789", "982356789", "123454789"] // code信息
    const lList = ["1f-102", "12f-102", "14f-102"] // 位置信息 如果type是user，这里就传空数组

    const type = "book" // 是uid还是bid
    const router = useRouter()

    function jump() {
      router.push({ path: "/download", query: { cList: cList, lList: lList, type: type }})
    }
    return { jump }
  }

  /* vue2 写法
    data(){
        return{
            const cList = ["123456789", "982356789", "123454789"] // code信息
            const lList = ["1f-102", "12f-102", "14f-102"] // 位置信息
            const type = "book" // 是uid还是bid
        }
    },
    methods(){
        jump(){
            this.$router.push({ path: "/download", query: { cList: cList, lList: lList, type: type }})
        }
    } */

}
</script>

<style>
</style>


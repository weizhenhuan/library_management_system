<template>
  <div>
    <Barcode v-for="(item,index) in codeList"
             :key="index"
             :code=item.code
             :name="type === 'user' ? item.code : item.code + ' ' + item.location"
             :text="type === 'user' ? item.code : item.code + ' ' + item.location" />
    <el-button style="display:block"
               @click="download">download</el-button>
  </div>
</template>

<script>
import Barcode from "@/components/Barcode"
import { useRoute } from "vue-router"
import { ElMessage } from "element-plus"

export default {
  name: "Download",
  components: { Barcode },
  setup() {
    const route = useRoute()
    const cList = typeof route.query.cList === "string" ? [route.query.cList] : route.query.cList
    const lList = typeof route.query.lList === "string" ? [route.query.lList] : route.query.lList
    const codeList = []
    if (lList.length === 0) {
      cList.forEach((item) => {
        codeList.push({ code: item })
      })
    } else {
      cList.forEach((item, index) => {
        codeList.push({ code: item, location: lList[index] })
      })
    }
    const type = route.query.type

    function download() {
      try {
        const imgs = document.querySelectorAll(".barcode")
        imgs.forEach((item) => {
          downloadURI(item.src, item.name)
        })
      } catch {
        ElMessage.error({
          showClose: false,
          message: "download error!",
          center: true
        })
      }
    }
    async function downloadURI(uri, name) {
      var link = document.createElement("a")
      link.setAttribute("download", name)
      link.href = uri
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
    return { codeList, type, download }
  }
}
</script>

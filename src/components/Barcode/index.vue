<template>
  <img :class="'_'+code" />
</template>

<script>
import JsBarcode from "jsbarcode"
import { nextTick } from "@vue/runtime-core"

export default {
  name: "Barcode",
  props: {
    code: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // console.log("#" + props.code)
    nextTick(() => {
      // const t = document.querySelectorAll("." + props.code)
      // console.log(t, "ddd")
      JsBarcode("._" + props.code, props.code, {
        format: "MSI",
        width: 2, // 设置条之间的宽度
        height: 100, // 高度
        text: props.text
      })
    })
  }
}
</script>

<style scoped>
</style>


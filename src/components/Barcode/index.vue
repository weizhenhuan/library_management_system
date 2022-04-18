<template>
  <img id="barcode" />
</template>

<script>
import JsBarcode from "jsbarcode"
import { nextTick } from "@vue/runtime-core"

export default {
  name: "Barcode",
  props: {
    code: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  setup(props) {
    nextTick(() => {
      JsBarcode("#barcode", props.code, {
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


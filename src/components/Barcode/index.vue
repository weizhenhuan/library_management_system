<template>
  <img :id="'_'+code"
       class="barcode" />
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
    nextTick(() => {
      JsBarcode("#_" + props.code, props.code, {
        format: "CODE39",
        width: 2, // 设置条之间的宽度
        height: 100, // 高度
        text: props.text
      })
    })
  }
}
</script>

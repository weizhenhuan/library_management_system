<template>
  <div class="Line"
       :style="{height:height,width:width}">

  </div>
</template>

<script>
import { nextTick, onMounted } from "@vue/runtime-core"

import * as echarts from "echarts/core"
import { GridComponent } from "echarts/components"
import { LineChart } from "echarts/charts"
import { UniversalTransition } from "echarts/features"
import { CanvasRenderer } from "echarts/renderers"

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition])

export default {
  name: "PieChart",
  props: {
    width: {
      type: String,
      default: "800px"
    },
    height: {
      type: String,
      default: "300px"
    },
    dateList: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    onMounted(() => {
      nextTick(() => {
        var chartDom = document.querySelector(".Line")
        var myChart = echarts.init(chartDom)
        var option

        option = {
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: props.dateList,
              type: "line",
              smooth: true
            }
          ]
        }

        option && myChart.setOption(option)
      })
    })

    return {
    }
  }
}
</script>


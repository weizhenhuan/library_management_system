<template>
  <div class="Line"
       :style="{height:height,width:width}">

  </div>
</template>

<script>
import { nextTick, onMounted } from "@vue/runtime-core"
import { parseTime } from "@/utils/index.js"

import * as echarts from "echarts/core"
import { GridComponent } from "echarts/components"
import { LineChart } from "echarts/charts"
import { UniversalTransition } from "echarts/features"
import { CanvasRenderer } from "echarts/renderers"

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition])

export default {
  name: "LineChart",
  props: {
    width: {
      type: String,
      default: "100%"
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

        let now = Date.now()
        const date = []
        for (let i = 7; i > 0; i--) {
          date.push(parseTime(now, "{y}-{m}-{d}"))
          now = now - (24 * 3600 * 1000)
        }
        date.reverse()
        console.log(date)

        option = {
          xAxis: {
            type: "category",
            data: date,
            nameTextStyle: {
              fontSize: 4
            }
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


<template>
  <div class="Pie"
       :style="{height:height,width:width}">

  </div>
</template>

<script>
import { nextTick, onMounted } from "@vue/runtime-core"

import * as echarts from "echarts/core"
import { ToolboxComponent, LegendComponent } from "echarts/components"
import { PieChart } from "echarts/charts"
import { LabelLayout } from "echarts/features"
import { CanvasRenderer } from "echarts/renderers"

echarts.use([
  ToolboxComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
])

export default {
  name: "PieChart",
  props: {
    width: {
      type: String,
      default: "300px"
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
        var chartDom = document.querySelector(".Pie")
        var myChart = echarts.init(chartDom)
        var option

        option = {
          legend: {
            top: "bottom"
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true }
              // saveAsImage: { show: true }
            }
          },
          series: [
            {
              name: "PieChart",
              type: "pie",
              // radius: [50, 250],
              center: ["50%", "50%"],
              roseType: "area",
              itemStyle: {
                borderRadius: 8
              },
              data: props.dateList
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


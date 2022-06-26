<template>
  <div class="Bar"
       :style="{height:height,width:width}">
  </div>
</template>

<script>
import { nextTick, onMounted, watch, onBeforeUnmount } from "@vue/runtime-core"

import * as echarts from "echarts/core"
import { GridComponent } from "echarts/components"
import { BarChart } from "echarts/charts"
import { CanvasRenderer } from "echarts/renderers"
import { TooltipComponent } from "echarts/components"

echarts.use([GridComponent, BarChart, CanvasRenderer, TooltipComponent])

export default {
  name: "BarChart",
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
    var myChart

    watch(() => props.dateList, (count) => {
      setOption(count)
    }, { deep: true })

    function setOption(count) {
      const x = []
      const y = []
      count.forEach((item) => {
        x.push(item.name)
        y.push(item.value)
      })

      const option = {
        xAxis: {
          type: "category",
          data: x,
          axisLabel: {
            fontSize: 10
          }
        },
        yAxis: {
          type: "value"
        },
        grid: {},
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          triggerOn: "mousemove"
        },
        series: [
          {
            name: "count",
            data: y,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)"
            }
          }
        ]
      }
      option && myChart.setOption(option)
    }
    onMounted(() => {
      nextTick(() => {
        const chartDom = document.querySelector(".Bar")
        myChart = echarts.init(chartDom)
        setOption(props.dateList)
      })
    })
    onBeforeUnmount(() => {
      if (!myChart) {
        return
      }
      myChart.dispose()
      myChart = null
    })

    return {
    }
  }
}
</script>


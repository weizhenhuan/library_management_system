<template>
  <div class="admin-contianer"
       v-if="dashboard.visitors">
    <group :dateList="[dashboard.totalRegistered,
                        dashboard.totalBorrowed,
                        dashboard.totalLost,
                        dashboard.totalDamage,
                        dashboard.totalUnpaid,
                        dashboard.totalFine]" />
    <el-row style="background:#fff;margin-bottom:32px;">
      <line-chart :dateList="dashboard.visitors" />
    </el-row>

    <el-row :gutter="40"
            class="panel-group">
      <el-col :xs="12"
              :sm="12"
              :lg="8"
              class="card-panel-col">
        <div class="card-panel"
             @click="changeBarDate('totalBooks')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="add" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              totalBooks
            </div>
            <div class="card-panel-num">
              {{dashboard.totalBooks.total}}
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12"
              :sm="12"
              :lg="8"
              class="card-panel-col">
        <div class="card-panel"
             @click="changeBarDate('totalBookCopies')">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="add" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              totalBookCopies
            </div>
            <div class="card-panel-num">
              {{dashboard.totalBookCopies.total}}
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12"
              :sm="12"
              :lg="8"
              class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="add" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              Borrowing
            </div>
            <div class="card-panel-num">
              {{dashboard.totalBorrowing}}
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row style="background:#fff;margin-bottom:32px;justify-content: space-around;">
      <h1>totalBooks</h1>
      <bar-chart :dateList="classification" />
    </el-row>

  </div>

</template>

<script>
import { useRouter } from "vue-router"
import { getDashboard } from "@/api/admin/Dashboard"
import { reactive } from "@vue/reactivity"
import LineChart from "./components/LineChart.vue"
import Group from "./components/Group.vue"
import BarChart from "./components/BarChart.vue"

export default {
  name: "AdminDashboard",
  components: {
    LineChart, Group,
    BarChart
  },
  setup() {
    const router = useRouter()
    /* const dashboard = reactive({
      totalRegistered: 10,
      totalBooks: {
        total: 10,
        classification: [
          { "value": 40, "name": "jisuanji" },
          { "value": 38, "name": "youxi" },
          { "value": 32, "name": "hhh" }
        ]
      },
      totalBookCopies: {
        total: 10,
        classification: [
          { "value": 40, "name": "jisuanji" },
          { "value": 38, "name": "youxi" },
          { "value": 32, "name": "hhh" }
        ]
      },
      totalBorrowed: 100,
      totalBorrowing: 10,
      totalLost: 1,
      totalDamage: 2,
      totalUnpaid: 1,
      totalFine: 100,
      visitors: [100, 350, 125, 64, 121, 311, 210]
    }) */
    const dashboard = reactive({})
    const classification = reactive([])

    function jump(path) {
      router.push({ path: path })
    }

    getDashboard().then(res => {
      Object.keys(res.data).forEach((key) => {
        dashboard[key] = res.data[key]
      })
      classification.push(...dashboard.totalBooks.classification)
    })

    function changeBarDate(type) {
      classification.length = 0
      if (type === "totalBookCopies") {
        classification.push(...dashboard.totalBookCopies.classification)
      } else {
        classification.push(...dashboard.totalBooks.classification)
      }
    }
    return { jump, dashboard, changeBarDate, classification }
  }
}
</script>

<style scoped lang="less">
.admin-contianer {
  padding: 32px;
  min-height: calc(100vh - 50px);
  background-color: #f6f8fa;
}

.panel-group {
  padding-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 40px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>


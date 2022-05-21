<template>
  <div class="admin-contianer">

    <group />
    <el-row>
      <div class="chart-wrapper">
        <line-chart :dateList="dashboard.visitors" />
      </div>

    </el-row>

    <el-row :gutter="32">
      <div class="chart-wrapper">
        <pie-chart :dateList="dashboard.totalBooks.classification" />
      </div>

    </el-row>
  </div>

</template>

<script>
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { getDashboard } from "@/api/admin_dashboard"
import { reactive } from "@vue/reactivity"
import PieChart from "./components/PieChart"
import LineChart from "./components/LineChart.vue"
import Group from "./components/Group.vue"

export default {
  name: "AdminDashboard",
  components: {
    PieChart, LineChart, Group
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const dashboard = reactive({
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
    })

    function jump(path) {
      router.push({ path: path })
    }

    /* getDashboard().then(res => {

      console.log(res)
    }) */
    return { jump, dashboard }
  }
}
</script>

<style scoped lang="less">
.admin-contianer {
  min-height: calc(100vh - 50px);
  background-color: #f6f8fa;
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
img {
  width: 250px;
  height: 250px;
  padding: 30px;
  margin-top: 50px;
  margin-bottom: 20px;
  border-radius: 25%;
  background-color: #f6f8fa;
  cursor: pointer;
}
.visitor {
  padding-top: 70px;
  display: flex;
  justify-content: center;
}
</style>


<template>
  <el-card>
    <el-row class="search-container">
      <el-col :span="2">
        <el-button type="primary"
                   @click="() => {locationType = 'add';curLocation={location:input_location_area+'-'+input_location_floor}; showAddLocation = true}">
          <template v-slot:icon>
            <svg-icon icon-class="add" />
          </template>
        </el-button>
      </el-col>
    </el-row>

    <div class="locationlist-container"
         v-if="tableData.length">
      <el-table :data="tableData"
                border
                stripe
                size="large"
                v-loading="loading"
                :header-cell-style="{ color: '#606266' }">
        <el-table-column prop="location"
                         label="Location" />
        <el-table-column label="Operation">
          <template #default="props">
            <el-button-group>
              <el-button type="primary"
                         size="small"
                         @click="() => {locationType = 'edit';showAddLocation = true;curLocation=props.row }">
                <template v-slot:icon>
                  <svg-icon icon-class="edit" />
                </template>
              </el-button>
              <el-button type="danger"
                         size="small"
                         @click="() => {locationType = 'delete';showAddLocation = true;curLocation=props.row }">
                <template v-slot:icon>
                  <svg-icon icon-class="delete" />
                </template>
              </el-button>
            </el-button-group>
          </template>

        </el-table-column>
      </el-table>
    </div>

    <Location v-model:showAddLocation="showAddLocation"
              :type="locationType"
              v-if="showAddLocation"
              :curLocation="curLocation" />
  </el-card>
</template>

<script>
import { getLocationListByName } from "@/api/admin/Location"

import { ElMessage } from "element-plus"

export default {
  name: "LocationManagement",
  components: { Location: () => import("@/components/Location")
  },
  data() {
    return {
      tableData: [],
      input_location_area: "",
      input_location_floor: "",
      showAddLocation: false,
      locationType: "add",
      curLocation: {},
      loading: false
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.loading = true
      getLocationListByName().then((res) => {
        this.tableData = res.data.locationList
        this.loading = false
      }).catch((res) => {
        this.loading = false
        ElMessage.error({
          message: res.message
        })
      })
    },
    handleCurrentChange() {
      this.load()
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  margin: 20px auto 20px;
  justify-content: center;
  .el-button {
    color: white;
    height: 40px;
    font-size: 1.5em;
    padding-left: 15px;
    margin-left: 20px;
  }
  .el-input :deep(.el-input__inner) {
    height: 40px;
  }
}

.recommend {
  padding: 60px 0 0 60px;
}
</style>

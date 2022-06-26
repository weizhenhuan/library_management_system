<template>
  <el-card>
    <el-row class="search-container">
      <el-col :span="2">
        <el-button type="primary"
                   @click="() => {categoryType = 'add';curCategory={category:input_category}; showAddCategory = true}">
          <template v-slot:icon>
            <svg-icon icon-class="add" />
          </template>
        </el-button>
      </el-col>
    </el-row>

    <div class="categorylist-container"
         v-if="tableData.length">
      <el-table :data="tableData"
                border
                stripe
                size="large"
                v-loading="loading"
                :header-cell-style="{ color: '#606266' }">
        <el-table-column prop="category"
                         label="Category" />
        <el-table-column label="Operation">
          <template #default="props">
            <el-button-group>
              <el-button type="primary"
                         size="small"
                         @click="() => {categoryType = 'edit';showAddCategory = true;curCategory=props.row }">
                <template v-slot:icon>
                  <svg-icon icon-class="edit" />
                </template>
              </el-button>
              <el-button type="danger"
                         size="small"
                         @click="() => {categoryType = 'delete';showAddCategory = true;curCategory=props.row }">
                <template v-slot:icon>
                  <svg-icon icon-class="delete" />
                </template>
              </el-button>
            </el-button-group>
          </template>

        </el-table-column>
      </el-table>
    </div>

    <Category v-model:showAddCategory="showAddCategory"
              :type="categoryType"
              v-if="showAddCategory"
              :curCategory="curCategory" />
  </el-card>
</template>

<script>
import { getCategory } from "@/api/admin/Category"

import { ElMessage } from "element-plus"

export default {
  name: "CategoryManagement",
  components: { Category: () => import("@/components/Category")
  },
  data() {
    return {
      tableData: [],
      input_category: "",
      showAddCategory: false,
      categoryType: "add",
      curCategory: {},
      loading: false
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.loading = true
      getCategory().then((res) => {
        res.data.categoryList.forEach((item) => {
          this.tableData.push({ category: item })
        })
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

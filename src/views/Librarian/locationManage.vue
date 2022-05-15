<template>
  <el-card>
    <el-row class="search-container">
      <el-col :span="8">
        <el-input v-model="input_category"
                  placeholder="please input category message"
                  @keyup.enter="load"
                  class="search_input">
        </el-input>
      </el-col>
      <el-col :span="2"
              :offset="1">
        <el-button type="primary"
                   @click="load">
          <template v-slot:icon>
            <svg-icon icon-class="search_light" />
          </template>
        </el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary"
                   @click="() => {showAdminBook = true; adminBookType = 'add'}">
          <template v-slot:icon>
            <svg-icon icon-class="add" />
          </template>
        </el-button>
      </el-col>
    </el-row>

    <div class="booklist-container"
         v-if="tableData.length">
      <el-table :data="tableData"
                border
                stripe
                size="large"
                v-loading="loading"
                :header-cell-style="{ color: '#606266' }">
        <el-table-column prop="bId"
                         label="Book ID" />
        <el-table-column prop="bName"
                         label="Book Name"
                         width="250" />
        <el-table-column prop="ISBN"
                         label="ISBN"
                         width="150" />
        <el-table-column prop="bAuthor"
                         label="Book Author" />
        <el-table-column prop="bPublisher"
                         label="Publisher" />
        <el-table-column prop="bType"
                         label="Category" />
        <el-table-column label="Operation">
          <template #default="props">
            <el-button-group>
              <el-button type="primary"
                         size="small"
                         @click="() => {adminBookType = 'edit';showAdminBook = true;currBook=props.row }">
                <template v-slot:icon>
                  <svg-icon icon-class="edit" />
                </template>
              </el-button>
              <el-button type="danger"
                         size="small"
                         @click="() => {adminBookType = 'delete';showAdminBook = true;currBook=props.row }">
                <template v-slot:icon>
                  <svg-icon icon-class="delete" />
                </template>
              </el-button>
            </el-button-group>
          </template>

        </el-table-column>
      </el-table>
      <div class="demo-pagination-block">
        <el-pagination v-model:currentPage="pageNum"
                       :page-size="pageSize"
                       @current-change="handleCurrentChange"
                       layout="total, prev, pager, next, jumper"
                       :total="total"
                       hide-on-single-page />
      </div>
    </div>

    <AdminBook v-model:showAdminBook="showAdminBook"
               :type="adminBookType"
               v-if="showAdminBook"
               :book="currBook" />
  </el-card>
</template>

<script>
import { getCategoryListByName } from "@/api/admin"

import { ElMessage } from "element-plus"

export default {
  name: "LocationManagement",
  components: { AdminBook: () => import("@/components/AdminBook")
  },
  data() {
    return {
      searchTag: "",
      tableData: [],
      input_category: "",
      total: 100,
      pageSize: 10,
      pageNum: 1,
      showAdminBook: false,
      adminBookType: "add",
      currBook: {},
      loading: false
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.loading = true
      getCategoryListByName(
        this.input_category,
        this.pageSize,
        this.pageNum
      ).then((res) => {
        this.tableData = res.data.categoryList
        this.total = res.data.total
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
.booklist-container {
  .bookitem-wrapper {
    .bookinfo {
      li {
        margin-top: 10px;
      }
    }
  }

  .bookinfo-wrapper {
    .library-bookinfo {
      margin-top: 30px;
      li {
        margin-top: 10px;
      }
    }
  }

  .el-pagination {
    margin-top: 20px;
    justify-content: center;
  }
}

.recommend {
  padding: 60px 0 0 60px;
}
</style>

<template>
  <el-card>
    <el-row class="search-container">
      <el-col :span="8">
        <el-input v-model="input_book"
                  placeholder="please input book message"
                  @keyup.enter="load"
                  class="search_input">
          <template #append>
            <el-select v-model="searchTag"
                       placeholder="bookName"
                       style="width: 110px">
              <el-option label="booId"
                         value="0" />
              <el-option label="bookName"
                         value="1" />
              <el-option label="ISBN"
                         value="2" />
            </el-select>
          </template>
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
        <el-table-column type="expand">
          <template #default="props">
            <el-row class="bookitem-wrapper">
              <el-col :span="6"
                      :offset="2">
                <img :src="props.row.bPhoto"
                     alt="cover"
                     style="width: 200px; " />
                <ul class="bookinfo">
                  <li><span style="font-weight:bold">Title:</span>{{ props.row.bName }}</li>
                  <li><span style="font-weight:bold">Author:</span>{{ props.row.bAuthor }}</li>
                  <li><span style="font-weight:bold">Classification:</span>{{ props.row.bType }}</li>
                  <li><span style="font-weight:bold">ISBN:</span>{{ props.row.ISBN }}</li>
                  <li><span style="font-weight:bold">Price:</span>{{ props.row.bPrice }}</li>
                  <li><span style="font-weight:bold">Publisher:</span>{{ props.row.bPublisher }}</li>
                  <li><span style="font-weight:bold">PublishTime:</span>{{ props.row.bPublishTime }}</li>
                </ul>
              </el-col>
              <el-col :span="12"
                      class="bookinfo-wrapper">
                <ul class="library-bookinfo">
                  <li>
                    <span style="font-weight: bold">Location:</span>{{ props.row.bBookshelf }}
                  </li>
                  <li>
                    <span style="font-weight: bold">Info:</span>{{ props.row.bInfo }}
                  </li>
                </ul>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
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
              <el-button type="success"
                         size="small"
                         @click="jump(props.row.bId,props.row.bBookshelf)">
                <template v-slot:icon>
                  <svg-icon icon-class="download" />
                </template>
              </el-button>
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

    <div v-else
         class="recommend">
      Recommend queries according to your preferences:The Legend of Zelda:
      Breath of the Wild、Super Mario Galaxy
    </div>
    <AdminBook v-model:showAdminBook="showAdminBook"
               :type="adminBookType"
               v-if="showAdminBook"
               :book="currBook" />
  </el-card>
</template>

<script>
import { getBookList } from "@/api/admin/Book"

import { ElMessage } from "element-plus"

export default {
  name: "BookManagement",
  components: { AdminBook: () => import("@/components/AdminBook")
  },
  data() {
    return {
      searchTag: "",
      tableData: [],
      input_book: "",
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
      getBookList(
        this.searchTag === "" ? 1 : this.searchTag,
        this.input_book,
        this.pageSize,
        this.pageNum
      ).then((res) => {
        this.tableData = res.data.bookList
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
    },
    jump(bId, bBookshelf) {
      this.$router.push({ path: "/download", query: { cList: bId, lList: bBookshelf, type: "book" }})
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

<template>
  <div>
    <el-row class="search-container">
      <el-col :span="8">
        <el-input v-model="input_book_name"
                  placeholder="please input book name"
                  @keyup.enter="load"
                  class="search_input" />
      </el-col>
      &nbsp;&nbsp;&nbsp;
      <el-col :span="8">
        <el-input v-model="input_book_isbn"
                  placeholder="please input book ISBN"
                  @keyup.enter="load"
                  class="search_input" />
      </el-col>
      <el-col :span="3">
        <el-button type="primary"
                   @click="load">
          <template v-slot:icon>
            <svg-icon icon-class="search_light" />
          </template>
        </el-button>
      </el-col>
    </el-row>

    <div class="booklist-container"
         v-if="tableData.length">
      <el-table :data="tableData"
                v-loading="loading"
                border
                stripe
                size="large"
                :header-cell-style="{color:'#606266'}"
                :expand-row-keys="expands"
                :row-key="getRowKeys"
                @expand-change="expandChange">
        <el-table-column type="expand">
          <template #default="props">
            <el-row class="bookitem-wrapper">
              <el-col :span="6"
                      :offset="2">
                <img :src="props.row.bPhoto"
                     alt="cover"
                     style="width: 200px; " />
              </el-col>

              <el-col :span="6"
                      :offset="2">
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

              <el-scrollbar style="margin-left: 100px;">
                <div v-for="item in bookItems"
                     :key="item"
                     class="scrollbar-item">
                  <div>
                    <span class="innner-item"
                          style="font-weight:bold">Title:</span>{{ item.bName }}
                    <span class="innner-item"
                          style="font-weight:bold">book id:</span>{{ item.bID }}
                    <span class="innner-item"
                          style="font-weight:bold">Location:</span>{{ item.bLocation }}
                    <span class="innner-item"
                          style="font-weight:bold">status:
                      <el-tag :type="item.bStatus===1?'success':'info'">
                        {{ bStatusMap.get(item.bStatus) }}
                      </el-tag>
                    </span>

                  </div>
                  <span style="float: right;"
                        v-if="this.$store.getters.roles[0]==='customer'">
                    <el-button type="primary"
                               class="innner-item"
                               :disabled="item.bStatus !== 1"
                               @click="()=>{showReserve=true;currBook={'bookName':item.bName,'id':item.bID,'isReserved':(item.bStatus === 0)}}">
                      <svg-icon icon-class="book"></svg-icon>
                      <span>reserve</span>
                    </el-button>
                  </span>
                </div>
              </el-scrollbar>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column prop="bName"
                         label="book name"
                         width="350" />
        <el-table-column prop="ISBN"
                         label="ISBN"
                         width="350" />
        <el-table-column prop="bType"
                         label="Type"
                         width="250" />
        <el-table-column prop="bAuthor"
                         label="book author" />
      </el-table>

      <div class="demo-pagination-block">
        <el-pagination v-model:currentPage="pageNum"
                       v-model:page-size="pageSize"
                       @current-change="handleCurrentChange"
                       :page-sizes="[2, 5, 10, 20]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total"
                       hide-on-single-page />
      </div>
    </div>

    <div v-else
         class="recommend">
      Recommend queries according to your preferences:The Legend of Zelda:
      Breath of the Wild、Super Mario Galaxy
    </div>

    <Reserve v-model:showReserve="showReserve"
             type="reserve"
             v-if="showReserve"
             :book='currBook' />
  </div>
</template>

<script>
import { getBookByNameAndISBN, getBooksDetailByISBN } from "@/api/book"
import { ElMessage } from "element-plus"
export default {
  name: "BookList",
  components: {
    Reserve: () => import("@/components/Reserve")
  },
  data() {
    return {
      bStatusMap: null,
      tableData: [],
      bookItems: [],
      input_book_name: "",
      input_book_isbn: "",
      total: 100,
      pageSize: 10,
      pageNum: 1,
      showReserve: false,
      currBook: {},
      loading: false,
      expands: [1]
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.loading = true
      this.bStatusMap = new Map([[1, "available"], [0, "reserved"], [-1, "borrowed"], [-2, "lost"], [-3, "damaged"]])
      getBookByNameAndISBN(this.input_book_name, this.input_book_isbn, this.pageSize, this.pageNum).then((res) => {
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

    getRowKeys(row) {
      return row.ISBN
    },
    expandChange(row, expandedRows) {
      if (expandedRows.length > 0) {
        this.expands = [row.ISBN]

        getBooksDetailByISBN(row.ISBN).then((res) => {
          this.bookItems = res.bookItems
        }).catch((res) => {
          ElMessage.error({
            message: res.message
          })
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  margin: 20px auto;
  justify-content: center;

  .el-button {
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
  margin-left: 20px;
  margin-right: 20px;
}

.booklist-container {
  .bookitem-wrapper {
    .bookinfo {
      li {
        margin-top: 10px;
      }
    }

    .bookinfo-wrapper {
      border-style: solid;
      border-width: 5px;

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

  .scrollbar-item {
    display: flex;
    align-items: center;
    //justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    justify-content: space-between;
  }

  .innner-item {
    margin-left: 10px;
    margin-right: 10px;
  }

  .demo-pagination-block {
    margin-top: 20px;
  }
}
</style>

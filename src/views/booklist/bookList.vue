<template>
  <div>
    <el-row class="search-container">
      <el-col :span="8">
        <el-input
          v-model="input_book_name"
          placeholder="please input book name"
          class="search_input"
        />
      </el-col>
      <span
        style="
          display: block;
          line-height: 40px;
          text-align: center;
          width: 10px;
        "
        >|</span
      >
      <el-col :span="8">
        <el-input
          v-model="input_book_isbn"
          placeholder="please input book ISBN"
          class="search_input"
        />
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="load" :loading="loading">
          <template v-slot:icon>
            <svg-icon icon-class="search_light" />
          </template>
        </el-button>
      </el-col>
    </el-row>

    <div class="booklist-container" v-if="tableData.length">
      <el-table
        :data="tableData"
        border
        stripe
        size="large"
        :header-cell-style="{ color: '#606266' }"
      >
        <el-table-column type="expand">
          <template #default="props">
            <el-row class="bookitem-wrapper">
              <el-col :span="6" :offset="2">
                <img
                  :src="props.row.bPhoto"
                  alt="cover"
                  style="width: 200px; height: 200px"
                />
                <ul class="bookinfo">
                  <li>
                    <span style="font-weight: bold">Title:</span
                    >{{ props.row.bName }}
                  </li>
                  <li>
                    <span style="font-weight: bold">Author:</span
                    >{{ props.row.bAuthor }}
                  </li>
                  <li>
                    <span style="font-weight: bold">Classification:</span
                    >{{ props.row.bTypeid }}
                  </li>
                  <li>
                    <span style="font-weight: bold">ISBN:</span
                    >{{ props.row.ISBN }}
                  </li>
                </ul>
              </el-col>
              <el-col :span="12" class="bookinfo-wrapper">
                <ul class="library-bookinfo">
                  <li>
                    <span style="font-weight: bold">Location:</span
                    >{{ props.row.bBookshelf }}
                  </li>
                  <li>
                    <span style="font-weight: bold">Remainder:</span
                    >{{ props.row.bLeftNum }}
                  </li>
                </ul>
                <el-button
                  type="primary"
                  @click="
                    () => {
                      showBorrow = true;
                      currBook = {
                        bookName: props.row.bName,
                        id: props.row.bId,
                      };
                    }
                  "
                >
                  <svg-icon icon-class="book"></svg-icon>
                  <span>borrow</span>
                </el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column prop="bName" label="book name" width="350" />
        <el-table-column prop="ISBN" label="ISBN" width="350" />
        <el-table-column prop="bLeftNum" label="remainder" width="250" />
        <el-table-column prop="bAuthor" label="book author" />
      </el-table>

      <div class="demo-pagination-block">
        <el-pagination
          v-model:currentPage="pageNum"
          :page-size="pageSize"
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper"
          :total="total"
          hide-on-single-page
        />
      </div>
    </div>

    <div v-else class="recommend">
      Recommend queries according to your preferences:The Legend of Zelda:
      Breath of the Wild、Super Mario Galaxy
    </div>

    <Borrow v-model:showBorrow="showBorrow" type="borrow" :book="currBook" />
    <Buy v-model:showBuy="showBuy" :book="currBook" />
  </div>
</template>

<script>
import { getBookByNameAndISBN, buyBookByID } from "@/api/book";
import Borrow from "@/components/Borrow";
import Buy from "@/components/Buy";
import { ElMessage } from "element-plus";

export default {
  name: "BookList",
  components: { Borrow, Buy },
  data() {
    return {
      tableData: [],
      input_book_name: "",
      input_book_isbn: "",
      total: 100,
      pageSize: 10,
      pageNum: 1,
      showBorrow: false,
      showBuy: false,
      currBook: {},
      loading: false,
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.loading = true;
      getBookByNameAndISBN(
        this.input_book_name,
        this.input_book_isbn,
        this.pageSize,
        this.pageNum
      )
        .then((res) => {
          this.tableData = res.data.bookList.slice(0, 9);
          this.total = res.data.total;
          this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
          ElMessage.error({
            message: res.message,
          });
        });

      // bBookshelf
      // props.bPrice
      // props.bPhoto
      // props.bTypeid
    },
    handleCurrentChange() {
      this.load();
    },
    handleBuyBook(bookId, leftNum) {
      if (leftNum < 1) {
        alert("There's no book on sale");
      }
      buyBookByID(bookId, this.$store.getters.token).then();
    },
  },
};
</script>

<style scoped lang="less">
.search-container {
  margin: 10px auto 10px;
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

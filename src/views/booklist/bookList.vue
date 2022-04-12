<template>
  <div>
    <el-row class="search-container">
      <el-col :span="8">
        <el-input v-model="input_book_name"
                  placeholder="please input book name"
                  class="search_input" />
      </el-col>
      <span style="display: block;line-height: 40px;text-align: center;width:10px">|</span>
      <el-col :span="8">
        <el-input v-model="input_book_isbn"
                  placeholder="please input book ISBN"
                  class="search_input" />
      </el-col>
      <el-col :span="3">
        <el-button type="primary"
                   @click="load"
                   :loading="loading">
          <template v-slot:icon>
            <svg-icon icon-class="search" />
          </template>
        </el-button>
      </el-col>
    </el-row>

    <div class="booklist-container"
         v-if="tableData.length">
      <el-table :data="tableData"
                border
                stripe
                :header-cell-style="{color:'#606266'}">
        <el-table-column type="expand">
          <template v-slot="props">
            <el-form label-position="left"
                     inline
                     class="demo-table-expand"
                     style="color: #989fa5;background: #F0F5F6">
              <el-form-item label="book name"
                            style="width: 400px;height: 100px">
                <span style="margin-top: -65px; margin-left: 50px;">{{ props.row.bName }}</span>
              </el-form-item>
              <el-form-item label="author"
                            style="width: 400px;height: 100px;margin-left: 200px">
                <span style="margin-top: -65px; margin-left: 50px;">{{ props.row.bAuthor }}</span>
              </el-form-item>
              <el-form-item label="ISBN"
                            style="width: 400px;height: 100px">
                <span style="margin-top: -65px; margin-left: 90px;">{{ props.row.ISBN }}</span>
              </el-form-item>
              <el-form-item label="price"
                            style="width: 400px;height: 100px; margin-left: 200px">
                <span style="margin-top: -65px; margin-left: 61px;">￥{{ props.row.bPrice }}</span>
              </el-form-item>
              <el-form-item label="left num"
                            style="width: 400px;height: 100px">
                <span style="margin-top: -65px; margin-left: 66px;">{{ props.row.bLeftNum}}</span>
              </el-form-item>
              <el-form-item label="cover"
                            style="width: 200px;height: 220px; margin-left: 200px">
                <img :src="props.row.bPhoto"
                     :alt="props.row.bName"
                     class="book_image"
                     style="margin-left: 50px;">
              </el-form-item>
              <el-form-item style="position: relative; height: 80px;width: 300px;">
                <el-button type="primary"
                           @click="()=>{showBorrow=true;currBook={'bookName':props.row.bName,'id':props.row.bId}}">
                  <svg-icon icon-class="book"
                            style="vertical-align: middle;">
                  </svg-icon>
                  <span>borrow</span>
                </el-button>
                <el-button type="success"
                           @click="handleBuyBook(props.row.bId, props.row.bLeftNum)"
                           style="margin-left: 50px; width: 124px">
                  <svg-icon icon-class="book"
                            style="vertical-align: middle">
                  </svg-icon>
                  <span>buy</span>
                </el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column prop="bName"
                         label="book name"
                         width="280" />
        <el-table-column prop="ISBN"
                         label="ISBN"
                         width="280" />
        <el-table-column prop="bPrice"
                         label="price"
                         width="280" />
        <el-table-column prop="bAuthor"
                         label="book author" />
      </el-table>

      <div class="demo-pagination-block">
        <el-pagination v-model:currentPage="pageNum"
                       v-model:page-size="pageSize"
                       :page-sizes="[2, 5, 10, 20]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total" />
      </div>
    </div>

    <div v-else
         class="recommend">
      Recommend queries according to your preferences:The Legend of Zelda: Breath of the Wild、Super Mario Galaxy
    </div>

    <Borrow v-model:showBorrow="showBorrow"
            type="borrow"
            :book='currBook' />
  </div>
</template>

<script>
import { getBookByNameAndISBN, buyBookByID } from '@/api/book'
import Borrow from '@/components/Borrow'

export default {
  name: "bookList",
  components: { Borrow },
  data () {
    return {
      tableData: [],
      input_book_name: "",
      input_book_isbn: "",
      total: 100,
      pageSize: 2,
      pageNum: 1,
      showBorrow: false,
      currBook: {},
      loading: false
    }
  },
  created () {
    //this.load()
  },
  methods: {

    load () {
      this.loading = true
      getBookByNameAndISBN(this.input_book_name, this.input_book_isbn, 10, 1).then((res) => {
        this.tableData = res.data.bookList
        this.total = res.data.total
        console.log(this.tableData);
        this.loading = false
      })
    },
    handleSizeChange () {
      console.log(this.pageSize);
      this.load()
    },
    handleCurrentChange () {
      console.log(this.pageNum);
      this.load()
    },
    handleBuyBook (bookId, leftNum) {
      if (leftNum < 1) {
        alert("There's no book on sale")
      }
      console.log(this.$store);
      buyBookByID(bookId, this.$store.getters.token).then()
    },
  },

}
</script>

<style scoped lang="less">
.search-container {
  margin: 10px auto 10px;
  justify-content: center;
  .el-button {
    height: 40px;
    font-size: 2em;
    padding-left: 20px;
    margin-left: 20px;
  }
  .el-input /deep/ .el-input__inner {
    height: 40px;
  }
}
.booklist-container {
  .el-pagination {
    justify-content: center;
  }
}

.recommend {
  padding: 60px 0 0 60px;
}

span {
  font-size: large;
  font-weight: bolder;
  /*border-style: solid;*/
  /*border-width: 2px;*/
}

.svg-icon {
  margin-right: 10px;
  color: white;
  font-size: large;
  font-weight: bold;
}

.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}

.book_image {
  height: 200px;
  width: 140px;
}

.el-form-item {
  margin-left: 50px;
}
</style>
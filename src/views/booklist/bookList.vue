<template>
  <div>
    <el-main>
      <div class="search_book_line">
        <el-space :size="30"
                  spacer="|">
          <el-input v-model="input_book_name"
                    placeholder="please input book name"
                    class="search_input" />
          <el-input v-model="input_book_isbn"
                    placeholder="please input book ISBN"
                    class="search_input" />
        </el-space>
        <el-button type="primary"
                   @click="load">
          <svg-icon icon-class="search"
                    style="vertical-align: middle;">
          </svg-icon>
          <span style="vertical-align: middle;"> search </span>
        </el-button>
      </div>

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
                <span style="margin-top: -65px; margin-left: 50px;">{{ props.row.bookName }}</span>
              </el-form-item>
              <el-form-item label="author"
                            style="width: 400px;height: 100px;margin-left: 200px">
                <span style="margin-top: -65px; margin-left: 50px;">{{ props.row.bookAuthor }}</span>
              </el-form-item>
              <el-form-item label="ISBN"
                            style="width: 400px;height: 100px">
                <span style="margin-top: -65px; margin-left: 90px;">{{ props.row.ISBN }}</span>
              </el-form-item>
              <el-form-item label="price"
                            style="width: 400px;height: 100px; margin-left: 200px">
                <span style="margin-top: -65px; margin-left: 61px;">￥{{ props.row.bookPrice }}</span>
              </el-form-item>
              <el-form-item label="left num"
                            style="width: 400px;height: 100px">
                <span style="margin-top: -65px; margin-left: 66px;">{{ props.row.leftNum}}</span>
              </el-form-item>
              <el-form-item label="cover"
                            style="width: 200px;height: 220px; margin-left: 200px">
                <img :src="props.row.bookImg"
                     :alt="props.row.bookName"
                     class="book_image"
                     style="margin-left: 50px;">
              </el-form-item>
              <el-form-item style="position: relative; height: 80px;width: 300px;">
                <el-button type="primary"
                           @click="{showBorrow=true;currBook={'bookName':props.row.bookName,'id':props.row.bookId}}">
                  <svg-icon icon-class="book"
                            style="vertical-align: middle;">
                  </svg-icon>
                  <span>borrow</span>
                </el-button>
                <el-button type="success"
                           @click="handleBuyBook(props.row.bookId, props.row.leftNum)"
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

        <!--      <el-table-column prop="bookId" label="book id" width="150"/>-->
        <el-table-column prop="bookName"
                         label="book name"
                         width="280" />
        <el-table-column prop="ISBN"
                         label="ISBN"
                         width="280" />
        <el-table-column prop="bookPrice"
                         label="price"
                         width="280" />
        <el-table-column prop="bookAuthor"
                         label="book author" />
      </el-table>
      <div class="demo-pagination-block">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       v-model:currentPage="pageNum"
                       v-model:page-size="pageSize"
                       :page-sizes="[2, 5, 10, 20]"
                       small="small"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total" />
      </div>
    </el-main>
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
      currBook: {}
    }
  },
  created () {
    this.load()
  },
  methods: {

    load (searchCondition) {
      getBookByNameAndISBN(searchCondition).then(res => {
        this.tableData = res.data.bookList
        this.total = res.data.total
      })



      getBookByNameAndISBN(this.input_book_name, this.input_book_isbn).then()
    },
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange (pageNum) {
      this.pageNum = pageNum
      this.load()
    },
    handleBuyBook (bookId, leftNum) {
      if (leftNum < 1) {
        alert("There's no book on sale")
      }
      buyBookByID(bookId, this.$store.getter.token).then()
      /*TODO
      * check book state
      * change book state
      * reload page?
      * */

    },
  },

}
</script>

<style scoped>
.search_book_line {
  margin-bottom: 20px;
  margin-left: 300px;
}

.search_input {
  width: 300px;
  /*margin-left: 20px;*/
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
  /*border-style: solid;*/
  /*border-width: 5px;*/
}
</style>
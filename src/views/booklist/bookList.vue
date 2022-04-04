<template>
  <el-main>
    <div class="search_book_line">
      <el-space :size="30" spacer="|">
        <el-input v-model="input_book_name" placeholder="please input book name" class="search_input"/>
        <el-input v-model="input_book_isbn" placeholder="please input book ISBN" class="search_input"/>
      </el-space>
      <el-button type="primary" @click="load">
        <svg-icon icon-class="search" style="vertical-align: middle;">
          <search/>
        </svg-icon>
        <span style="vertical-align: middle;"> search </span>
      </el-button>
    </div>
    <el-table :data="tableData" border stripe :header-cell-style="{background:'#F2DC7C',color:'#606266'}">

      <el-table-column type="expand">
        <template v-slot="tableData">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="id">
              <span>{{ tableData.bookId }}</span>
            </el-form-item>
            <el-form-item label="book name">
              <span>{{ tableData.bookName }}</span>
            </el-form-item>
            <el-form-item label="ISBN">
              <span>{{ tableData.ISBN }}</span>
            </el-form-item>
            <el-form-item label="borrow times">
              <span>{{ tableData.borrowTimes }}</span>
            </el-form-item>
            <el-form-item label="book state">
              <span>{{ tableData.bookState }}</span>
            </el-form-item>
            <el-form-item label="price">
              <span>￥{{ tableData.bookPrice }}</span>
            </el-form-item>
            <el-form-item label="cover">
              <img :src="tableData.bookImg" :alt="tableData.bookName">
            </el-form-item>
            <el-form-item label="on sale">
              <span>{{ tableData.createTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column prop="bookId" label="book id" width="150"/>
      <el-table-column prop="bookName" label="book name" width="280"/>
      <el-table-column prop="ISBN" label="ISBN" width="280"/>
      <el-table-column prop="bookPrice" label="price" width="280"/>
      <el-table-column prop="bookState" label="book state"/>
      <el-table-column label="action">
        <!--        <el-popover placement="left" :width="160">-->
        <!--          <p>book details...</p>-->
        <!--          <template #reference>-->
        <!--            <el-button type="success">-->
        <!--              <svg-icon icon-class="details" style="vertical-align: middle;">-->
        <!--                <details/>-->
        <!--              </svg-icon>-->
        <!--              <span>details</span>-->
        <!--            </el-button>-->
        <!--          </template>-->
        <!--        </el-popover>-->

        <el-button type="success" v-on:click="handleBorrowBook">
          <svg-icon icon-class="book" style="vertical-align: middle;">
            <book/>
          </svg-icon>
          <span>borrow</span></el-button>
        <!--                      <el-button type="danger">-->
        <!--                        <svg-icon icon-class="delete" style="vertical-align: middle;"><delete/>></svg-icon>-->
        <!--                        <span>delete</span></el-button>-->
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          v-model:currentPage="pageNum"
          v-model:page-size="pageSize"
          :page-sizes="[2, 5, 10, 20]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
      />
    </div>
  </el-main>


</template>

<script>
export default {
  name: "bookList.vue",
  data() {
    return {
      tableData: [],
      input_book_name: "",
      input_book_isbn: "",
      total: 100,
      pageSize: 2,
      pageNum: 1,
    }
  },
  created() {
    this.load()

  },
  methods: {
    getBookData() {
      return {
        bookList: [
          {
            bookId: '1',
            bookName: 'vue从入门到入土',
            ISBN: '666',
            bookState: 'available',
            borrowTimes: 1,
            bookPrice: 78,
            bookImg: null,
            createTime: '2022-02-02',
          },
          {
            bookId: '2',
            bookName: '三十年精通vue',
            ISBN: '666',
            bookState: 'available',
            borrowTimes: 1,
            bookPrice: 78,
            bookImg: null,
            createTime: '2022-02-02',
          },
          {
            bookId: '3',
            bookName: 'vue底层源码解析',
            ISBN: '666',
            bookState: 'available',
            borrowTimes: 1,
            bookPrice: 78,
            bookImg: null,
            createTime: '2022-02-02',
          },
          {
            bookId: '4',
            bookName: 'vue设计与实现',
            ISBN: '666',
            bookState: 'available',
            borrowTimes: 1,
            bookPrice: 78,
            bookImg: null,
            createTime: '2022-02-02',
          },
          {
            bookId: '512',
            bookName: '中华养生宝典',
            ISBN: '666',
            borrowTimes: 1,
            bookPrice: 78,
            bookImg: null,
            bookState: 'available',
          },
          {
            bookName: '如何避免脱发',
            ISBN: '666',
            borrowTimes: 1,
            bookPrice: 78,
            bookImg: null,
            bookState: 'available',
          },
          {
            bookName: '活着',
            ISBN: '666',
            borrowTimes: 1,
            bookPrice: 78,
            bookImg: null,
            bookState: 'available',
          },
        ]
        , total: 20,
      }
    },
    load(searchCondition) {
      var res = this.getBookData(searchCondition)
      var start = this.pageSize * (this.pageNum - 1)
      var length = this.pageSize
      var _tableData = []
      for (let i = start; i < start + length; i++) {
        if ((this.input_book_name.length > 0 && res.bookList[i].bookName.indexOf(this.input_book_name) > -1)
            || (this.input_book_isbn.length > 0 && res.bookList[i].ISBN.indexOf(this.input_book_isbn) > -1)) {
          if (this.input_book_name.length > 0 && this.input_book_isbn.length > 0) {
            if (res.bookList[i].bookName.indexOf(this.input_book_name) > -1
                && res.bookList[i].ISBN.indexOf(this.input_book_isbn) > -1) {
              _tableData.push(res.bookList[i])
            }
          } else {
            _tableData.push(res.bookList[i])
          }
        }
        if (this.input_book_isbn.length === 0 && this.input_book_name.length === 0) {
          _tableData.push(res.bookList[i])
        }
      }
      this.tableData = _tableData
      this.total = res.total
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load()
    },
    handleBorrowBook(event) {
      //get bookId
      var bookId = event.currentTarget.parentElement.parentElement.parentElement.
          firstElementChild.nextElementSibling.firstElementChild.innerHTML.substr(7)
      console.log(bookId)
      /*TODO
      * check book state
      * change book state
      * reload page?
      * */

    },
  },

}
// const tableData = []

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
  font-size: medium;
  font-weight: bold;
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

</style>
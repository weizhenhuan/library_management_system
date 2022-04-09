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
        <template v-slot="props" >
          <el-form label-position="left" inline class="demo-table-expand" style="color: #989fa5;background: #F0F5F6" >
            <el-form-item label="book name" style="width: 400px;height: 100px">
              <span style="margin-top: -65px; margin-left: 50px;">{{ props.row.bookName }}</span>
            </el-form-item>
            <el-form-item label="author" style="width: 400px;height: 100px;margin-left: 200px">
              <span style="margin-top: -65px; margin-left: 50px;">{{ props.row.bookAuthor }}</span>
            </el-form-item>
            <el-form-item label="ISBN" style="width: 400px;height: 100px">
              <span style="margin-top: -65px; margin-left: 90px;">{{ props.row.ISBN }}</span>
            </el-form-item>
            <el-form-item label="price" style="width: 400px;height: 100px; margin-left: 200px">
              <span style="margin-top: -65px; margin-left: 61px;">￥{{ props.row.bookPrice }}</span>
            </el-form-item>
            <el-form-item label="left num" style="width: 400px;height: 100px">
              <span style="margin-top: -65px; margin-left: 66px;">{{ props.row.leftNum}}</span>
            </el-form-item>
            <el-form-item label="cover" style="width: 200px;height: 220px; margin-left: 200px">
              <img :src="props.row.bookImg" :alt="props.row.bookName" class="book_image" style="margin-left: 50px;">
            </el-form-item>
            <el-form-item style="position: relative; height: 80px;width: 300px;">
              <el-button type="primary" v-on:click="handleBorrowBook(props.row.bookId, props.row.leftNum)">
                <svg-icon icon-class="book" style="vertical-align: middle;">
                  <book/>
                </svg-icon>
                <span>borrow</span></el-button>
              <el-button type="success" v-on:click="handleBuyBook(props.row.bookId, props.row.leftNum)" style="margin-left: 50px; width: 124px">
                <svg-icon icon-class="book" style="vertical-align: middle">
                  <book/>
                </svg-icon>
                <span>buy</span></el-button>
            </el-form-item>
          </el-form>
        </template>

      </el-table-column>

      <!--      <el-table-column prop="bookId" label="book id" width="150"/>-->
      <el-table-column prop="bookName" label="book name" width="280"/>
      <el-table-column prop="ISBN" label="ISBN" width="280"/>
      <el-table-column prop="bookPrice" label="price" width="280"/>
      <el-table-column prop="bookAuthor" label="book author"/>
      <!--      <el-table-column label="action">-->
      <!--        &lt;!&ndash;        <el-popover placement="left" :width="160">&ndash;&gt;-->
      <!--        &lt;!&ndash;          <p>book details...</p>&ndash;&gt;-->
      <!--        &lt;!&ndash;          <template #reference>&ndash;&gt;-->
      <!--        &lt;!&ndash;            <el-button type="success">&ndash;&gt;-->
      <!--        &lt;!&ndash;              <svg-icon icon-class="details" style="vertical-align: middle;">&ndash;&gt;-->
      <!--        &lt;!&ndash;                <details/>&ndash;&gt;-->
      <!--        &lt;!&ndash;              </svg-icon>&ndash;&gt;-->
      <!--        &lt;!&ndash;              <span>details</span>&ndash;&gt;-->
      <!--        &lt;!&ndash;            </el-button>&ndash;&gt;-->
      <!--        &lt;!&ndash;          </template>&ndash;&gt;-->
      <!--        &lt;!&ndash;        </el-popover>&ndash;&gt;-->

      <!--        <el-button type="success" v-on:click="handleBorrowBook">-->
      <!--          <svg-icon icon-class="book" style="vertical-align: middle;">-->
      <!--            <book/>-->
      <!--          </svg-icon>-->
      <!--          <span>borrow</span></el-button>-->
      <!--        &lt;!&ndash;                      <el-button type="danger">&ndash;&gt;-->
      <!--        &lt;!&ndash;                        <svg-icon icon-class="delete" style="vertical-align: middle;"><delete/>></svg-icon>&ndash;&gt;-->
      <!--        &lt;!&ndash;                        <span>delete</span></el-button>&ndash;&gt;-->
      <!--      </el-table-column>-->
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
            bookAuthor: 'Mr.GGLS',
            leftNum: 10,
            ISBN: '666',
            // borrowTimes: 1,
            bookPrice: 78,
            bookImg: "https://img2.baidu.com/it/u=942228482,2348826349&fm=26&fmt=auto",
            createTime: '2022-02-02',
          },
          {
            bookId: '2',
            bookName: '三十年精通vue',
            bookAuthor: 'Mr.GGLS',
            leftNum: 0,
            ISBN: '666',
            bookState: 'available',
            // borrowTimes: 1,
            bookPrice: 78,
            bookImg: "https://64.media.tumblr.com/3a5e6d3ae5b48f51e7523c0451692de1/tumblr_p7pyh6VUfB1snerhxo4_400.jpg",
            createTime: '2022-02-02',
          },
          {
            bookId: '3',
            bookName: 'vue底层源码解析',
            ISBN: '666',
            bookState: 'available',
            // borrowTimes: 1,
            bookPrice: 78,
            bookImg: null,
            createTime: '2022-02-02',
          },
          {
            bookId: '4',
            bookName: 'vue设计与实现',
            ISBN: '666',
            bookState: 'available',
            // borrowTimes: 1,
            bookPrice: 78,
            bookImg: null,
            createTime: '2022-02-02',
          },
          {
            bookId: '512',
            bookName: '中华养生宝典',
            ISBN: '666',
            // borrowTimes: 1,
            bookPrice: 78,
            bookImg: null,
            bookState: 'available',
          },
          {
            bookName: '如何避免脱发',
            ISBN: '666',
            // borrowTimes: 1,
            bookPrice: 78,
            bookImg: null,
            bookState: 'available',
          },
          {
            bookName: '活着',
            ISBN: '666',
            // borrowTimes: 1,
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
    handleBorrowBook(bookId, leftNum) {
      if(leftNum<1){
        alert("There's no book available")
      }
      /*TODO
      * check book state
      * change book state
      * reload page?
      * */

    },
    handleBuyBook(bookId, leftNum) {
      if(leftNum<1){
        alert("There's no book on sale")
      }
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
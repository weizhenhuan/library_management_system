<template>
  <el-main>
    <div class="search_book_line">
      <el-space :size="30" spacer="|">
        <el-input v-model="input_book_name" placeholder="please input book name" class="search_input"/>
        <el-input v-model="input_book_isbn" placeholder="please input book ISBN" class="search_input"/>
      </el-space>
      <el-button type="primary">
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
              <img :src = "tableData.bookImg" :alt = "tableData.bookName">
            </el-form-item>
            <el-form-item label="on sale">
              <span>{{ tableData.createTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      
      <el-table-column prop="bookID" label="book id" width="150"/>
      <el-table-column prop="bookName" label="book name" width="280"/>
      <el-table-column prop="ISBN" label="ISBN" width="280"/>
      <el-table-column prop="price" label="price" width="280"/>
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

                <el-button type="danger">
                  <svg-icon icon-class="delete" style="vertical-align: middle;"><delete/>></svg-icon>
                  <span>delete</span></el-button>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <el-pagination
          v-model:currentPage="pageNum"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 15, 20]"
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
      tableData,
      input_book_name: "",
      input_book_isbn: "",
      total: 100,
      pageSize: 10,
      pageNum: 1,

    }
  },
  methods: {

  },

}
const tableData = [
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
    bookName: '三十年精通vue',
    ISBN: '666',
    bookState: 'available',
    borrowTimes: 1,
    bookPrice: 78,
    bookImg: null,
    createTime: '2022-02-02',
  },
  {
    bookName: 'vue底层源码解析',
    ISBN: '666',
    bookState: 'available',
    borrowTimes: 1,
    bookPrice: 78,
    bookImg: null,
    createTime: '2022-02-02',
  },
  {
    bookName: 'vue设计与实现',
    ISBN: '666',
    bookState: 'available',
    borrowTimes: 1,
    bookPrice: 78,
    bookImg: null,
    createTime: '2022-02-02',
  },
  {
    bookName: '中华养生宝典',
    ISBN: '666',
    bookState: 'available',
  },
  {
    bookName: '如何避免脱发',
    ISBN: '666',
    bookState: 'available',
  },
  {
    bookName: '活着',
    ISBN: '666',
    bookState: 'available',
  },
]

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
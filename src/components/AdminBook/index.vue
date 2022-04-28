<template>
  <el-dialog :title="type"
             width="70%"
             :model-value="isShow"
             :before-close="change"
             destroy-on-close>
    <div v-if="type !=='delete'">
      <el-form :inline="true"
               label-width="120px"
               :model="bookItem">
        <el-form-item label="ISBN">
          <el-input v-model="ISBN"
                    placeholder="Input ISBN"
                    :disabled="type==='edit'" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     :disabled="type==='edit'"
                     @click="getBookInfo">search</el-button>
        </el-form-item>
      </el-form>

      <el-form :model="bookItem"
               label-width="120px">
        <el-form-item label="Book Name">
          <el-input v-model="bookItem.bName"
                    placeholder="Book Name"
                    disabled />
        </el-form-item>
        <el-form-item label="Author">
          <el-input v-model="bookItem.bAuthor"
                    placeholder="Author"
                    disabled />
        </el-form-item>
        <el-form-item label="Publisher">
          <el-input v-model="bookItem.bPublisher"
                    placeholder="Publisher"
                    disabled />
        </el-form-item>
        <el-form-item label="PublishTime">
          <el-input v-model="bookItem.bPublishTime"
                    placeholder="PublishTime"
                    disabled />
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="bookItem.bInfo"
                    placeholder="Description"
                    type="textarea"
                    disabled />
        </el-form-item>
      </el-form>

      <el-form :inline="true"
               label-width="120px"
               :model="bookItem">
        <el-form-item label="Price">
          <el-input v-model="bookItem.bPrice"
                    placeholder="Input Price">
            <template #append>$</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="bookItem.bType"
                     placeholder="Select Category">
            <el-option v-for="(item,index) in categoryList"
                       :key="index"
                       :label="item"
                       :value="item" />
          </el-select>
        </el-form-item>
      </el-form>

      <el-form :inline="true"
               label-width="120px"
               :model="bookItem">
        <el-form-item label="Count">
          <el-input v-model="bookItem.bCount"
                    :disabled="type==='edit'"
                    placeholder="Input Count">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-cascader v-model="bookItem.bBookshelf"
                       placeholder="Select Location"
                       :options="locationList" />
        </el-form-item>
      </el-form>
    </div>
    <div v-else>
      <span>Are you sure?</span>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="change">Cancel</el-button>
        <el-button type="primary"
                   @click="manageBook">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref, toRef } from "@vue/reactivity"
import { addBookAdmin, getCategory, deleteBookAdmin, updataBookAdmin } from "@/api/admin"
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from "element-plus"
import axios from "axios"
import { onMounted } from "@vue/runtime-core"

export default {
  name: "AdminBook",
  props: {
    book: {
      type: Object,
      required: true
    },
    showAdminBook: {
      type: Boolean,
      required: true
    },
    type: {
      type: String,
      default: "add"
    }
  },
  emits: ["update:showAdminBook"],
  setup(props, { emit }) {
    const bookItem = reactive({
      bPrice: 0,
      bType: "jkl",
      bBookshelf: "",
      bCount: 0
    })

    const isShow = toRef(props, "showAdminBook")
    const route = useRoute()
    const router = useRouter()
    function change() {
      emit("update:showAdminBook", false)
    }

    const ISBN = ref("9787513333863")
    const categoryList = reactive([])
    const locationList = reactive([
      {
        value: "F1",
        label: "F1",
        children: [
          {
            value: "A03",
            label: "A03"
          },
          {
            value: "B04",
            label: "B04"
          }
        ]
      },
      {
        value: "F2",
        label: "F2",
        children: [
          {
            value: "C04",
            label: "C04"
          },
          {
            value: "G12",
            label: "G12"
          }
        ]
      },
      {
        value: "F3",
        label: "F3",
        children: [
          {
            value: "C04",
            label: "C04"
          },
          {
            value: "G12",
            label: "G12"
          }
        ]
      },
      {
        value: "F4",
        label: "F4",
        children: [
          {
            value: "C04",
            label: "C04"
          },
          {
            value: "G12",
            label: "G12"
          }
        ]
      }
    ])

    onMounted(() => {
      if (props.type === "edit") {
        ISBN.value = props.book.ISBN
        bookItem.bId = props.book.bId
        bookItem.bAuthor = props.book.bAuthor
        bookItem.bName = props.book.bName
        bookItem.ISBN = props.book.ISBN
        bookItem.bPhoto = props.book.bPhoto
        bookItem.bPublisher = props.book.bPublisher
        bookItem.bPublishTime = props.book.bPublishTime
        bookItem.bInfo = props.book.bInfo
        bookItem.bPrice = props.book.bPrice
        bookItem.bBookshelf = props.book.bBookshelf
        bookItem.bType = props.book.bType
      }
      getCategory().then((res) => {
        res.data.categoryList.forEach((item) => {
          categoryList.push(item)
        })
      })
    })

    function getBookInfo() {
      const geturl = "https://api.jike.xyz/situ/book/isbn/" + ISBN.value
      axios
        .get(geturl, {
          params: {
            apikey:
              "12475.7aaf04816a62955b4e0181c344a4b43d.f70ed7fedbcc42ed9035306f611655d7"
          }
        }).then(function(res) {
          const data = res.data.data
          bookItem.bAuthor = data.author
          bookItem.bName = data.name
          bookItem.ISBN = ISBN.value
          bookItem.bPhoto = data.photoUrl
          bookItem.bPublisher = data.publishing
          bookItem.bPublishTime = data.published
          bookItem.bInfo = data.description
        })
        .catch(function(e) {
          ElMessage.error({
            message: "ISBNapi error"
          })
        })
    }

    function manageBook() {
      let response
      if (props.type === "delete") {
        response = deleteBook()
      } else if (props.type === "add") {
        addBook()
        return
      } else {
        response = editBook()
      }
      response.then(() => {
        change()
        router.replace({
          path: "/redirect" + route.fullPath
        })
      }).catch((res) => {
        ElMessage.error({
          message: res.message
        })
      })
    }

    function jump(id, location) {
      const lList = []
      id.map(() => {
        lList.push(location)
      })
      router.push({ path: "/download", query: { cList: id, lList: lList, type: "book" }})
    }

    function addBook() {
      bookItem.bBookshelf = bookItem.bBookshelf.join("-")
      return addBookAdmin(bookItem).then((res) => {
        ElMessage.success({
          message: "add success!"
        })
        jump(res.data.idList, bookItem.bBookshelf)
      })
    }

    function deleteBook() {
      return deleteBookAdmin({ bId: props.book.bId }).then(() => {
        ElMessage.success({
          message: "delete success"
        })
      })
    }

    function editBook() {
      bookItem.bBookshelf = bookItem.bBookshelf.join("-")
      return updataBookAdmin(bookItem).then(() => {
        ElMessage.success({
          message: "delete success"
        })
      })
    }

    return {
      isShow,
      change,
      getBookInfo,
      addBook,
      bookItem,
      ISBN,
      categoryList,
      locationList,
      manageBook,
      jump }
  }
}
</script>


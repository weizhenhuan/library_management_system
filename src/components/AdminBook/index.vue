<template>
  <el-dialog :title="type"
             width="70%"
             :model-value="isShow"
             :before-close="change"
             destroy-on-close>
    <div v-if="type !=='delete'">
      <el-form :inline="true"
               label-width="120px"
               v-if="type==='add'"
               :model="bookItem">
        <el-form-item label="ISBN"
                      :rules="[{ required: true, message: 'User Name is required' },]">
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
               v-if="type==='add'"
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
        <el-form-item label="Status"
                      v-if="type!=='add'">
          <el-select v-model="bookItem.bStatus"
                     placeholder="Status"
                     style="width: 110px">
            <el-option label="damaged"
                       :value=-3 />
            <el-option label="lost"
                       :value=-2 />
            <el-option label="borrowed"
                       :value=-1 />
            <el-option label="reserved"
                       :value=0 />
            <el-option label="available"
                       :value=1 />
          </el-select>
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
import { addBookAdmin, deleteBookAdmin, updataBookAdmin } from "@/api/admin/Book"
import { getCategory } from "@/api/admin/Category"
import { getLocationListByName } from "@/api/admin/Location"
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
      bType: "",
      bBookshelf: [],
      bCount: 0
    })

    const isShow = toRef(props, "showAdminBook")
    const route = useRoute()
    const router = useRouter()
    function change() {
      emit("update:showAdminBook", false)
    }

    const ISBN = ref("")
    const categoryList = reactive([])
    const locationList = reactive([])

    onMounted(() => {
      if (props.type === "edit") {
        bookItem.bId = props.book.bId
        bookItem.bPrice = props.book.bPrice
        bookItem.bBookshelf = props.book.bBookshelf.split("-")
        bookItem.bType = props.book.bType
        bookItem.bStatus = props.book.bStatus
        // bookItem.bStatus = bStatusMap.get(props.book.bStatus)
      }
      getCategory().then((res) => {
        res.data.categoryList.forEach((item) => {
          categoryList.push(item)
        })
      })
      getLocationListByName().then((res) => {
        const tmpArr = res.data.locationList.map((item) => {
          return item.location.split("-")
        })
        const map = new Map()
        let p = 0
        tmpArr.forEach((item) => {
          if (map.has(item[0])) {
            const tmp = {
              value: item[1],
              label: item[1]
            }
            locationList[map.get(item[0])].children.push(tmp)
          } else {
            map.set(item[0], p++)
            const tmp = {
              value: item[0],
              label: item[0],
              children: [
                {
                  value: item[1],
                  label: item[1]
                }
              ]
            }
            locationList.push(tmp)
          }
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


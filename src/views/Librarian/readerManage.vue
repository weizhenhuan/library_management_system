<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <!-- 搜索与添加 -->
          <el-input placeholder="please input"
                    v-model="query"
                    clearable
                    @keyup.enter="load"
                    @clear="load">
            <template #append>
              <el-button @click="load"
                         :loading="loading">
                <svg-icon icon-class="search"></svg-icon>
              </el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"
                     @click="addDialogVisible = true">Add Readers</el-button>
        </el-col>
        <el-col :span="4">
          <upload-excel-component :on-success="handleSuccess"
                                  :before-upload="beforeUpload" />
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="userlist"
                border
                v-loading="loading"
                stripe>
        <el-table-column label="Number"
                         prop="rName"></el-table-column>
        <el-table-column label="Password"
                         prop="rPwd">
          *******
        </el-table-column>
        <el-table-column label="Contact"
                         prop="rContact"></el-table-column>
        <el-table-column label="Name"
                         prop="rRealName"></el-table-column>
        <el-table-column label="ID"
                         prop="rId">
        </el-table-column>
        <el-table-column label="Record">
          <el-popover placement="bottom"
                      title="History"
                      :width="400"
                      trigger="click">
            <template #reference>
              <el-button>
                <template v-slot:icon>
                  <svg-icon icon-class="detail" />
                </template>
              </el-button>
            </template>
            <el-timeline class="timeline"
                         v-if="dynamics.length">
              <el-timeline-item v-for="(activity, index) in dynamics"
                                :key="index"
                                :timestamp="parseTime(activity.time)"
                                :icon="icon(activity.action)"
                                placement='top'>
                <div v-if="activity.action==='borrow'">
                  <span>
                    borrow《{{ activity.bookName }}》{{activity.days}}days
                  </span>
                </div>
                <div v-else-if="activity.action==='renew'">
                  <span>
                    renew《{{ activity.bookName }}》{{activity.days}}days
                  </span>
                </div>
                <div v-else-if="activity.action==='return'">
                  <span>
                    return《{{ activity.bookName }}》
                  </span>
                </div>
                <div v-else-if="activity.action==='pay'">
                  <span>
                    pay《{{ activity.bookName }}》pine
                  </span>
                </div>
                <div v-else>
                  <span>
                    reserve《{{ activity.bookName }}》
                  </span>
                </div>
              </el-timeline-item>
            </el-timeline>
            <div v-else
                 class="prompt-wrapper">
              Haven't do anything yet.
            </div>
          </el-popover>
        </el-table-column>
        <el-table-column label="Operation"
                         width="200">
          <template #default="scope">
            <el-button type="primary"
                       @click="showEditDialog(scope.row)">
              <template v-slot:icon>
                <svg-icon icon-class="edit" />
              </template>
            </el-button>
            <el-button type="danger"
                       @click="_delete(scope.row.rName)">
              <template v-slot:icon>
                <svg-icon icon-class="delete" />
              </template>
            </el-button>
            <el-button type="success"
                       @click="jump(scope.row.rId)">
              <template v-slot:icon>
                <svg-icon icon-class="download" />
              </template>
            </el-button>
          </template>

        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @current-change="handleCurrentChange"
                     v-model:currentPage="pagenum"
                     :page-size="pagesize"
                     layout="total, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog title="Add Users"
               :model-value="addDialogVisible"
               width="40%"
               @close="addDialogClosed">
      <el-form :model="addForm"
               label-width="100px">
        <el-form-item label="User Name"
                      :rules="[{ required: true, message: 'User Name is required' },]"
                      prop="rName">
          <el-input v-model="addForm.rName"></el-input>
        </el-form-item>
        <el-form-item label="Name"
                      :rules="[{ required: true, message: 'User Name is required' },]"
                      prop="rRealName">
          <el-input v-model="addForm.rRealName"></el-input>
        </el-form-item>
        <el-form-item label="Contact"
                      prop="rContact">
          <el-input v-model="addForm.rContact"></el-input>
        </el-form-item>
        <el-form-item label="Intro"
                      prop="rIntro">
          <el-input v-model="addForm.rIntro"></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer
                class="dialog-footer">
        <el-button @click="addDialogVisible = false">cancel</el-button>
        <el-button type="primary"
                   @click="add">confirm</el-button>
      </template>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog title="Edit Users"
               :model-value="editDialogVisible"
               width="40%"
               @close="editDialogClosed">
      <el-form :model="editForm"
               label-width="100px">
        <el-form-item label="Username">
          <el-input v-model="editForm.rName"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="Password"
                      prop="rPwd">
          <el-input v-model="editForm.rPwd"></el-input>
        </el-form-item>
        <el-form-item label="Name"
                      prop="rRealName">
          <el-input v-model="editForm.rRealName"></el-input>
        </el-form-item>
        <el-form-item label="Contact"
                      prop="rContact">
          <el-input v-model="editForm.rContact"></el-input>
        </el-form-item>
        <el-form-item label="Photo"
                      prop="rPhoto">
          <el-input v-model="editForm.rPhoto"></el-input>
        </el-form-item>
        <el-form-item label="Intro"
                      prop="rIntro">
          <el-input v-model="editForm.rIntro"></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer
                class="dialog-footer">
        <el-button @click="editDialogVisible = false">cancel</el-button>
        <el-button type="primary"
                   @click="edit">confirm</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, addUser, editUser, deleteUser, addUserList } from "@/api/admin/User"
import { ElMessage } from "element-plus"
import { useRouter } from "vue-router"
import UploadExcelComponent from "@/components/UploadExcel/index.vue"

import { reactive } from "@vue/reactivity"
import { parseTime } from "@/utils/index.js"
import { dynamic } from "@/api/user"
import { useStore } from "vuex"
// import { ref } from "vue"

export default {
  components: { UploadExcelComponent },
  setup() {
    // const visible = ref(false)
    const store = useStore()
    const dynamics = reactive([])
    const router = useRouter()
    function jump(id) {
      router.push({ path: "/download", query: { cList: id, lList: [], type: "user" }})
    }

    function icon(action) {
      if (action === "borrow") {
        return <svg-icon icon-class='borrow' />
      } else if (action === "pay") {
        return <svg-icon icon-class='buy' />
      } else if (action === "renew") {
        return <svg-icon icon-class='renew' />
      } else if (action === "return") {
        return <svg-icon icon-class='return' />
      } else if (action === "reserve") {
        return <svg-icon icon-class='reserve' />
      }
    }

    dynamic(store.getters.token).then((res) => {
      res.data.forEach((item) => {
        item.time = new Date(item.time)
        dynamics.push(item)
      })
    })

    return { jump,
      parseTime,
      dynamics,
      icon }
  },

  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 10,

      total: 0,
      userlist: [],

      loading: false,

      addDialogVisible: false,
      editDialogVisible: false,

      addForm: {
        rName: "",
        rPwd: "123456",
        rContact: "",
        rRealName: "",
        rPhoto: "",
        rIntro: ""
      },
      editForm: {
        rName: "",
        rPwd: "",
        rContact: "",
        rRealName: "",
        rPhoto: "",
        rIntro: ""
      },
      deleteForm: {
        rName: ""
      }

    }
  },
  created() {
    this.load()
  },
  methods: {
    refresh() {
      this.$router.replace({
        path: "/redirect" + this.$route.fullPath
      })
    },
    load() {
      this.loading = true
      getUserList(
        this.query,
        this.pagenum,
        this.pagesize).then((res) => {
        this.userlist = res.data.users
        this.total = res.data.total
        this.loading = false
      }).catch((res) => {
        this.loading = false
        ElMessage.error({
          message: res.message
        })
      })
    },

    add() {
      this.loading = true
      addUser(this.addForm).then((res) => {
        this.rName = res.data.rName
        this.rPwd
        this.addDialogVisible = false
        ElMessage.success({
          message: "success"
        })
        this.loading = false
        this.refresh()
      }).catch((res) => {
        this.loading = false
        this.addDialogVisible = false
        ElMessage.error({
          message: res.message
        })
      })
    },

    edit() {
      this.loading = true
      editUser(this.editForm
      ).then((res) => {
        this.rName = res.data.rName
        this.rPwd = res.data.rPwd
        this.editDialogVisible = false
        ElMessage.success({
          message: "success"
        })
        this.loading = false
        this.refresh()
      }).catch((res) => {
        this.loading = false
        this.editDialogVisible = false
        ElMessage.error({
          message: res.message
        })
      })
    },

    _delete(item) {
      this.loading = true
      deleteUser({ username: item }).then(() => {
        ElMessage.success({
          message: "success"
        })
        this.loading = false
        this.refresh()
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
    showEditDialog(scope) {
      this.editDialogVisible = true
      Object.keys(scope).forEach(item => {
        this.editForm[item] = scope[item]
      })
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }
      ElMessage.error({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning"
      })

      return false
    },
    handleSuccess({ results, header }) {
      addUserList(results).then((res) => {
        ElMessage.success({
          message: "upload success"
        })
        this.loading = false
        this.jump(res.data.idList)
      }).catch((res) => {
        this.loading = false
        ElMessage.error({
          message: res.message
        })
      })
    },

    addDialogClosed() {
      this.addDialogVisible = false
    }, // 监听添加用户对话框关闭
    editDialogClosed() {
      this.editDialogVisible = false
    } // 监听编辑用户对话框关闭

  }
}
</script>

<style lang="less" scoped>
el-card {
  margin-left: 20px;
}

.el-table {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 20px;
}
</style>

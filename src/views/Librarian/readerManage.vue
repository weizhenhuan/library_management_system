<template>
  <div>
    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <!-- 搜索与添加 -->
          <el-input placeholder="please input"
                    v-model="query"
                    clearable
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
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="userlist"
                border
                stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="Name"
                         prop="username"></el-table-column>
        <el-table-column label="Password"
                         prop="password"></el-table-column>
        <el-table-column label="Barcode"
                         prop="id">
          <template #default="scope">
            <Barcode :code="scope.row.id"
                     :text="scope.row.username" />
          </template>
        </el-table-column>
        <el-table-column label="Operation">
          <el-button type="primary"
                     @click="showEditDialog(scope.row.username)">
            <template v-slot:icon>
              <svg-icon icon-class="edit" />
            </template>
          </el-button>
          <el-button type="danger"
                     @click="removeUserById(scope.row.username)">
            <template v-slot:icon>
              <svg-icon icon-class="delete" />
            </template>
          </el-button>
          <el-button type="success"
                     @click="jump">
            <template v-slot:icon>
              <svg-icon icon-class="download" />
            </template>
          </el-button>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @current-change="handleCurrentChange"
                     :currentPage="pagenum"
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
                      prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Password"
                      prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer
                class="dialog-footer">
        <el-button @click="addDialogVisible = false">cancel</el-button>
        <el-button type="primary"
                   @click="load1">confirm</el-button>
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
          <el-input v-model="editForm.username"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer
                class="dialog-footer">
        <el-button @click="editDialogVisible = false">cancel</el-button>
        <el-button type="primary"
                   @click="load2">confirm</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, addUser, editUser, deleteUser } from "@/api/admin"
import { ElMessage } from "element-plus"
import { Barcode } from "@/components/Barcode"
import { useRouter } from "vue-router"
export default {
  components: { Barcode },
  setup() {
    const cList = ["123456789"] // code信息
    const lList = [] // 位置信息 如果type是user，这里就传空数组
    const type = "user" // 是uid还是bid
    const router = useRouter()

    function jump() {
      router.push({ path: "/download", query: { cList: cList, lList: lList, type: type }})
    }
    return { jump }
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
        username: "",
        password: ""
      },

      editForm: {
        editFormRules: {
          password: [
            {
              required: true,
              message: "please input new password",
              trigger: "blur"
            }
          ]
        }
      }
    }
  },
  created() {
    this.load()
    // this.load1()
  },
  methods: {
    load() {
      this.loading = true
      getUserList(
        this.query,
        this.pagenum,
        this.pagesize
      ).then((res) => {
        this.userlist = res.data.users
        this.total = res.data.total
        this.pagenum = res.data.pagenum
        this.pagesize = res.data.pagesize
        this.loading = false
      }).catch((res) => {
        this.loading = false
        ElMessage.error({
          message: res.message
        })
      })
    },

    load1() {
      this.loading = true
      addUser(this.addForm
      ).then((res) => {
        console.log(res)
        this.username = res.data.username
        this.password = res.data.password
        this.addDialogVisible = false
        this.load()
        ElMessage.success({
          message: res.message
        })
      }).catch((res) => {
        console.log(res)
        this.loading = false
        this.addDialogVisible = false
        ElMessage.error({
          message: res.message
        })
      })
    },

    handleCurrentChange() {
      this.load()
    },

    addDialogClosed() {
      this.addDialogVisible = false
    }, // 监听添加用户对话框关闭
    editDialogClosed() {
      this.editDialogVisible = false
    }, // 监听编辑用户对话框关闭

    async showEditDialog(id) {
      const { data: res } = await this.$http.get("users/" + id)
      if (res.meta.status !== 200) {
        return this.$message.error("Failed to query user's information")
      }
      this.editForm = res.data
      this.editDialogVisible = true
    }, // 展示编辑用户对话框

    editUser() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$http.put(
          "users/" + this.editForm.id,
          {
            password: this.editForm.password
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error("Failed to edit user information")
        }
        this.editDialogVisible = false
        this.getUserList()
        this.$message.success("The user's information was edited successfully")
      })
    }, // 修改用户信息并提交

    async removeUserById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "This operation will permanently delete the user. Do you want to continue?",
        "Hint",
        {
          confirmButtonText: "confirm",
          cancelButtonText: "cancel",
          type: "warning"
        }
      ).catch((err) => err)
      // 若用户确认删除，则返回值为字符串confirm，反之为cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("Canceled")
      }
      const { data: res } = await this.$http.delete("admin/delete" + id)
      if (res.code !== 0) {
        return this.$message.error("Failed to delete the user")
      }
      this.$message.success("Successfully delete the user")
      this.load()
    } // 根据ID删除用户
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}

.el-pagination {
  margin-top: 15px;
}
</style>

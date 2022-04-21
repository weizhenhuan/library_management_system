<!--
 * @Author: zhaoshuchen
 * @Date: 2022-04-20 15:12:14
 * @LastEditors: zhaoshuchen
 * @LastEditTime: 2022-04-21 16:30:18
 * @FilePath: /online-library-management-system/src/views/Librarian/readerManage.vue
 * @Description: file content
-->
<template>
  <div>
    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <!-- 搜索与添加 -->
          <el-input
            placeholder="please input"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <template #append>
              <el-button @click="getUserList">
                <svg-icon icon-class="search"></svg-icon>
              </el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >Add Readers</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="Name" prop="username"></el-table-column>
        <el-table-column label="Password" prop="password"></el-table-column>
        <el-table-column label="Barcode" prop="barcode"> </el-table-column>
        <el-table-column label="Operation">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog
      title="Add Users"
      v-model:visible="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="ruleFormRef"
        label-width="70px"
      >
        <el-form-item label="User Name" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->

      <template v-slot:footer class="dialog-footer">
        <el-button @click="addDialogVisible = false">cancel</el-button>
        <el-button type="primary" @click="addUser">confirm</el-button>
      </template>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog
      title="Edit Users"
      v-model:visible="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="Username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer class="dialog-footer">
        <el-button @click="editDialogVisible = false">cancel</el-button>
        <el-button type="primary" @click="editUserInfo">confirm</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1, //当前页数
        pagesize: 2, //当前页面展示多少条数据
      }, //获取用户列表的参数对象
      userlist: [],
      total: 0,
      addDialogVisible: false, //控制添加用户对话框的显示
      addForm: {
        username: "",
        password: "",
      }, //添加用户的表单数据
      addFormRules: {
        username: [
          {
            required: true,
            message: "please input user name",
            trigger: "blur",
          },
          {
            min: 11,
            max: 11,
            message: "The user name contains 11 characters",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "please input password",
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            message: "The password contains 6 to 15 characters",
            trigger: "blur",
          },
        ],
      }, //添加表单的验证规则
      editDialogVisible: false, //控制修改用户对话框的显示
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.error("Failed to get user list");
      }
      this.userlist = res.data.users;
      this.total = res.data.total;

      console.log(res);
    }, //获取用户列表

    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    }, //监听pagesize改变

    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    }, //监听页码值改变

    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    }, //监听添加用户对话框关闭

    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        //可以发起添加用户的网络请求
        const { data: res } = await this.$http.post("users", this.addForm);
        if (res.meta.status !== 201) {
          this.$message.error("Failed to add user");
        }
        this.$messaage.success("The user was successfully added");
        this.addDialogVisible = false;
        this.getUserList();
      });
    }, //点击按钮，添加新用户

    async showEditDialog(id) {
      const { data: res } = await this.$http.get("users/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("Failed to query user's information");
      }
      this.editForm = res.data;
      this.editDialogVisible = true;
    }, //展示编辑用户对话框

    editDialogClosed() {
      this.$refs.edutFormRef.resetFields();
    }, //监听编辑用户对话框关闭

    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        //发起修改用户信息的数据请求
        const { data: res } = await this.$http.put(
          "users/" + this.editForm.id,
          {
            password: this.editForm.password,
          }
        );
        if (res.meta.status !== 200) {
          return this.$message.error("Failed to edit user information");
        }
        this.editDialogVisible = false;
        this.getUserList();
        this.$message.success("The user's information was edited successfully");
      });
    }, //修改用户信息并提交

    async removeUserById(id) {
      //弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "This operation will permanently delete the user. Do you want to continue?",
        "Hint",
        {
          confirmButtonText: "confirm",
          cancelButtonText: "cancel",
          type: "warning",
        }
      ).catch((err) => err);
      //若用户确认删除，则返回值为字符串confirm，反之为cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("Canceled");
      }
      const { data: res } = await this.$http.delete("users/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("Failed to delete the user");
      }
      this.$message.success("Successfully delete the user");
      this.getUserList();
    }, //根据ID删除用户
  },
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}

.el-pagination {
  margin-top: 15px;
}
</style>
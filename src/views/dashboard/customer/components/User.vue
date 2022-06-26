<template>
  <el-skeleton style="margin-top:20px"
               :loading="loading"
               animated>
    <template #template>
      <div style="text-align: center;">
        <el-skeleton-item variant="circle"
                          style="width: 140px; height: 140px" />
      </div>
      <div style="padding: 14px">
        <el-skeleton-item variant="h3"
                          style="width: 50%" />
        <div style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-top: 16px;
              height: 16px;
            ">
          <el-skeleton-item variant="text"
                            style="margin-right: 16px" />
          <el-skeleton-item variant="text"
                            style="width: 30%" />
        </div>
      </div>
    </template>

    <template #default>
      <transition name="user-card"
                  mode="out-in">
        <el-card v-if="page"
                 class="user-container">
          <template #header>
            <div class="card-header">
              <span>Information</span>
            </div>
          </template>
          <div class="user-info">
            <img :src="user.avatar?user.avatar:'https://pan.bilnn.cn/api/v3/file/sourcejump/MdKBx4cv/Ev_lgefYmENkIFXkGpDkNgw8BLcKgtxyf2Ky_0gBCMM*'"
                 alt="user"
                 class="avatar">
            <div class="user-name text-center">
              {{user.name}}
            </div>
            <div class="user-introduction text-center">
              <div class="intro-header">introduction</div>
              <div class="intro-body">{{user.introduction}}</div>
            </div>
          </div>
          <div class="user-statistics clearfix text-center">
            <div class="statistic"
                 v-for="statistic in user.statistics"
                 :key="statistic.title">
              {{statistic.number}}
              <span style="display:block;width:50px">{{statistic.title}}</span>
            </div>
          </div>
        </el-card>
        <el-card v-else
                 class="user-container">
          <template #header>
            <div class="card-header">
              <span>Edit</span>
            </div>
          </template>

          <el-upload class="avatar-uploader"
                     ref="upload"
                     action="123"
                     :http-request="()=>{}"
                     :show-file-list="false"
                     :limit="1"
                     :on-exceed="handleExceed"
                     :on-change="uploadChange">
            <img :src="imgUrl"
                 class="upload-avatar" />
          </el-upload>

          <el-form :model="userForm"
                   label-width="120px">
            <el-form-item label="Activity name">
              <el-input v-model="userForm.name" />
            </el-form-item>
            <el-form-item label="Introduction">
              <el-input v-model="userForm.introduction" />
            </el-form-item>
            <el-form-item label="Email">
              <el-input v-model="userForm.email" />
            </el-form-item>
            <el-form-item label="OldPassword">
              <el-input v-model="userForm.oldPassword"
                        @blur="confirm" />
            </el-form-item>
            <el-form-item label="Password">
              <el-input v-model="userForm.password"
                        :disabled="!userForm.confirm" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="Submit">Edit</el-button>
            </el-form-item>
          </el-form>

        </el-card>
      </transition>
      <div class="change-card">
        <svg-icon icon-class='fold2'
                  @click="changePage"></svg-icon>
      </div>
    </template>
  </el-skeleton>

</template>

<script>
import { reactive, ref } from "@vue/reactivity"
import { mapGetters, useStore } from "vuex"
import { computed } from "@vue/runtime-core"
import { getExinfo } from "@/api/user/info"
import { editInfo, uploadImg, confirmPassword } from "@/api/user/operation"
import { ElMessage } from "element-plus"

export default {
  setup() {
    const page = ref(true)
    const user = reactive({
      oldPassword: "",
      password: "",
      confirm: false
    })
    const store = useStore()
    const loading = ref(true)

    const mapget = mapGetters(["name", "introduction", "avatar", "email"])
    Object.keys(mapget).forEach((itemfn) => {
      const item = computed(mapget[itemfn].bind({ $store: store }))
      user[itemfn] = item
    })
    const imgUrl = ref("")
    const files = reactive([])
    imgUrl.value = user.avatar

    function changePage() {
      page.value = !page.value
    }

    getExinfo(store.getters.token).then((res) => {
      user.statistics = [{ title: "days", number: res.data.days }, { title: "books", number: res.data.books }, { title: "likes", number: res.data.likes }]
      loading.value = false
    })

    function confirm() {
      console.log(userForm.oldPassword)
      confirmPassword(userForm.oldPassword).then(() => {
        userForm.confirm = true
      }).catch((res) => {
        ElMessage.error(res.message)
      })
    }

    const userForm = reactive({
      oldPassword: "",
      password: "",
      confirm: false,
      name: user.name,
      introduction: user.introduction,
      avatar: user.avatar,
      email: user.email
    })
    function Submit() {
      if (imgUrl.value !== userForm.avatar) {
        const formData = new FormData()
        files.forEach((item) => {
          // console.log(item)
          formData.append("image", item.raw)
        })
        uploadImg(formData).then((res) => {
          userForm.avatar = res.data.url
          // console.log(user.avatar)
          editInfo(userForm).then(() => {
            ElMessage.success("edit success")
          }).catch((res) => {
            ElMessage.error(res.message)
          })
        })
      } else {
        editInfo(userForm).then(() => {
          ElMessage.success("edit success")
        }).catch((res) => {
          ElMessage.error(res.message)
        })
      }
    }

    const uploadChange = (file, fileList) => {
      if (file.raw.type !== "image/jpeg") {
        ElMessage.error("Avatar picture must be JPG format!")
        return false
      } else if (file.raw.type.size / 1024 / 1024 > 2) {
        ElMessage.error("Avatar picture size can not exceed 2MB!")
        return false
      }

      imgUrl.value = URL.createObjectURL(file.raw)
      while (files.length) files.pop()
      files.push(file)
    }

    const upload = ref(null)
    function handleExceed(files) {
      upload.value.clearFiles()
      const file = files[0]
      upload.value.handleStart(file)
    }

    return {
      loading,
      page,
      changePage,
      user,
      userForm,
      imgUrl,
      upload,
      uploadChange,
      Submit,
      handleExceed,
      confirm }
  }
}
</script>

<style scoped lang='less'>
.avatar-uploader {
  text-align: center;
  .upload-avatar {
    display: block;
    width: 100px;
    margin: 0 auto 10px;
    border-radius: 50px;
  }
}

.user-container {
  margin: 30px 0 0 10px;
  .user-info {
    .avatar {
      display: block;
      width: 100px;
      margin: 0 auto 10px;
      border-radius: 50px;
    }
    .user-name {
      margin: 0 auto;
      font-weight: bold;
    }
    .user-introduction {
      margin-top: 20px;
      .intro-header {
        line-height: 40px;
        border-bottom: 1px solid #dfe6ec;
      }
      .intro-body {
        height: 125px;
        line-height: 25px;
      }
    }
  }

  .user-statistics {
    display: flex;
    justify-content: center;
    .statistic {
      margin: 0 5px 30px;
      font-weight: bold;
      width: 50px;
      float: left;
      color: #005980;
      line-height: 30px;
    }
  }
}

.change-card {
  position: relative;
  top: -26px;
  left: 100%;
  margin-left: -28px;
  svg-icon {
    height: 1.5em;
    width: 1.5em;
    color: #7b84a0;
  }
}

.user-card-enter-active,
.user-card-leave-active {
  transition: opacity 0.3s ease;
}

.user-card-enter-from,
.user-card-leave-to {
  opacity: 0;
}
</style>


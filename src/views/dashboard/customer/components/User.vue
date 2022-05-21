<template>
  <el-skeleton style="margin-top:20px"
               :loading="loading"
               animated>
    <template #template>
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
import { getExinfo } from "@/api/user.js"

export default {
  setup() {
    const page = ref(true)
    const user = reactive({})
    const store = useStore()
    const loading = ref(true)

    const mapget = mapGetters(["name", "introduction", "avatar"])
    Object.keys(mapget).forEach((itemfn) => {
      const item = computed(mapget[itemfn].bind({ $store: store }))
      user[itemfn] = item
    })

    // user.statistics = [{ title: 'days', number: 256 }, { title: 'books', number: 123 }, { title: 'likes', number: 10 }]
    function changePage() {
      page.value = !page.value
    }

    getExinfo(store.getters.token).then((res) => {
      user.statistics = [{ title: "days", number: res.data.days }, { title: "books", number: res.data.books }, { title: "likes", number: res.data.likes }]
      loading.value = false
    })

    return { loading, page, changePage, user }
  }
}
</script>

<style scoped lang='less'>
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


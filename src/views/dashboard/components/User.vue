<template>
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
        <img src="../../../assets/avatar.jpg"
             alt="user"
             class="avatar">
        <div class="user-name text-center">
          {{user.name}}
        </div>
        <div class="user-introduction text-center">
          <div class="intro-header">introduction</div>
          <div class="intro-body">{{user.introduction}}我是用来凑行数的，不用在意我.乃琳嘉然卡比塞尔达奎托斯马里奥</div>
        </div>
      </div>
      <div class="user-statistics clearfix text-center">
        <div class="statistic"
             v-for="statistic in user.statistics"
             :key="statistic.title">
          {{statistic.number}}
          <span>{{statistic.title}}</span>
        </div>
      </div>

    </el-card>
    <el-card v-else
             class="user-container">
      gggggg
    </el-card>
  </transition>
  <div class="change-card">
    <svg-icon icon-class='change'
              @click="changePage"></svg-icon>
  </div>

</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { mapGetters, useStore } from 'vuex'
import { computed } from '@vue/runtime-core'

export default {
  setup () {
    let page = ref(true)
    let user = reactive({})
    let store = useStore()

    const mapget = mapGetters(['name', 'introduction'])
    Object.keys(mapget).forEach((itemfn) => {
      let item = computed(mapget[itemfn].bind({ $store: store }))
      user[itemfn] = item
    })
    user.statistics = [{ title: 'days', number: 256 }, { title: 'books', number: 123 }, { title: 'likes', number: 10 }]

    function changePage () {
      page.value = !page.value
    }


    return { page, changePage, user }
  }
}
</script>

<style scoped lang='less'>
.user-container {
  margin-top: 30px;
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



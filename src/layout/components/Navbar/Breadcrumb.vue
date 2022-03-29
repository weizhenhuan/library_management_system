<template>
  <el-breadcrumb class="app-breadcrumb"
                 separator="/">
    <transition-group name="breadcrumb"
                      tag="ul">
      <el-breadcrumb-item v-for="(item) in levelList.value"
                          :key="item.path"
                          :to="item.path">
        {{item.meta.title}}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
import { reactive, } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { onMounted } from '@vue/runtime-core'

export default {
  setup () {

    let levelList = reactive({
      value: []
    })
    let route = useRoute()

    function getBreadcrumb () {
      // only show routes with meta.title

      let matched = route.matched.filter(item => item.meta && item.meta.title)

      if (matched[0].path !== '/dashboard') {
        matched = [{ path: '/dashboard', meta: { title: '首页' } }].concat(matched)
      }
      levelList.value = matched
    }

    onMounted(() => {
      getBreadcrumb()
    })

    return { getBreadcrumb, levelList, }
  },
  watch: {
    $route (route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  methods: {
    pathCompile (path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink (item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="less" scoped>
.app-breadcrumb {
  height: 40px;
  display: inline-block;
  font-size: 14px;
  //line-height: 40px;
  margin-left: -20px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}

.breadcrumb-enter-active {
  animation: fadein 0.2s reverse;
}
.breadcrumb-leave-active {
  animation: fadein 0.2s;
}

@keyframes fadein {
  0% {
    opacity: 1;
    transform: translateX(0px);
  }
  50% {
    opacity: 0.5;
    transform: translateX(10px);
  }
  100% {
    opacity: 0;
    transform: translateX(30px);
  }
}
</style>


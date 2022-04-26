import router from "./router"
import store from "./store"
import NProgress from "nprogress" // progress bar
import "nprogress/nprogress.css" // progress bar style
import { getToken } from "@/utils/auth" // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ["/login", "/register"] // no redirect whitelist

router.beforeEach(async(to) => {
  NProgress.start()
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === "/login") {
      // next({ path: '/' })
      NProgress.done()
      return "/"
    } else {
      const hasGetUserInfo = store.getters.roles || []
      if (hasGetUserInfo.length) {
        return true
        // next(to.path)
      } else {
        try {
          await store.dispatch("user/getInfo").then(res => {
            const roles = res.data.roles
            store.dispatch("permission/generateRoutes", roles).then((accessedRoutes) => {
              accessedRoutes.map(item => {
                router.addRoute(item)
              })
              router.push(to.path)// hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              return true
            })
          })
        } catch (error) {
          // await store.dispatch('user/resetToken')
          NProgress.done()
          // router.push(`/login?redirect=${to.path}`)
          return true
        }
      }
    }
  } else {
    store.dispatch("permission/initRoutes")
    if (whiteList.indexOf(to.path) !== -1) {
      return true
    } else {
      NProgress.done()
      // router.push("/login")
      return true
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

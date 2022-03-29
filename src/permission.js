import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to) => {
  // start progress bar
  NProgress.start()
  console.log(router.options);
  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      //next({ path: '/' })
      
      NProgress.done()
      return '/'
    } else {
      const hasGetUserInfo = store.getters.roles || []
      if (hasGetUserInfo.length) {
        return true
        //next(to.path)
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo').then(res=>{
            const roles = res.data.roles
            store.dispatch('permission/generateRoutes',roles).then((accessedRoutes)=>{
              accessedRoutes.map(item=>{
                router.addRoute(item)
              })
              return to
              //next(to.path) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          //next(`/login?redirect=${to.path}`)
          //next()
          NProgress.done()
          return true
        }
      }
    }
  } else {
    store.dispatch('permission/initRoutes')
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      //next()
      return true
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      //next(`/login?redirect=${to.path}`)
      //next()
      NProgress.done()
      return true
    }
  }
  /* store.dispatch('permission/initRoutes')
  return true */

})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

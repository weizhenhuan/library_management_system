import { createRouter, createWebHistory } from "vue-router"
import Layout from "@/layout"

const routes = [{
  path: "/redirect",
  component: Layout,
  hidden: true,
  children: [{
    name: "redirect",
    path: "/redirect/:path(.*)",
    component: () => import ("@/views/redirect/index")
  }]
},
{
  path: "/download",
  component: Layout,
  redirect: "/download/index",
  hidden: true,
  children: [{
    name: "download",
    path: "index",
    component: () => import ("@/views/download/index")
  }]
},
{
  path: "/login",
  component: () => import ("@/views/login/index"),
  hidden: true
},
{
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/dashboard",
  children: [{
    name: "dashboard",
    path: "dashboard",
    component: () => import ("@/views/dashboard/index"),
    meta: { title: "Home", icon: "home" }
  }]
},
{
  path: "/test",
  name: "text",
  redirect: "/test/dashboard",
  component: Layout,
  meta: { title: "测试", icon: "link" },
  children: [
    {
      name: "xczc",
      path: "dashboard",
      component: () => import("@/views/profile/index"),
      meta: { title: "测试首页" }
    },
    {
      name: "sssss",
      path: "sssss",
      component: () => import("@/views/borrow/index"),
      meta: { title: "hhhh" }
    }
  ]
},
{
  path: "/profile",
  redirect: "/profile/index",
  component: Layout,
  hidden: true,
  children: [{
    name: "profile",
    path: "index",
    component: () => import ("@/views//profile/index"),
    meta: { title: "个人主页" }
  }]
},
{
  path: "/booklist",
  redirect: "/booklist/index",
  component: Layout,
  // hidden:true,
  children: [{
    name: "booklist",
    path: "index",
    component: () => import ("@/views/booklist/bookList"),
    meta: { title: "all books", icon: "book" }
  }]
},
{
  path: "/external-link",
  component: Layout,
  children: [{
    path: "https://gitee.com/violet-umberto/online-library-management-system",
    meta: { title: "External Link", icon: "link" }
  }]
},

{
  path: "/register",
  component: () => import ("@/views/register/index"),
  hidden: true
}
]

export const constantRoutes = routes

export const asyncRoutes = [{
  path: "/permissiontext",
  component: Layout,
  redirect: "/permissiontext/page",
  name: "Permissiontext",
  meta: {
    title: "Permissiontext",
    icon: "test",
    roles: ["admin"] // you can set roles in root nav
  },
  children: [{
    path: "page",
    component: () => import ("@/views/permissiontext/page"),
    name: "PagePermission",
    meta: {
      title: "Page Permission",
      roles: ["customer"]
    }
  },
  {
    path: "text1",
    component: () => import ("@/views/permissiontext/text1"),
    name: "DirectivePermission",
    meta: {
      title: "text1 Permission"
    }
  },
  {
    path: "admin",
    component: () => import ("@/views/permissiontext/admin"),
    name: "RolePermission",
    meta: {
      title: "admin Permission",
      roles: ["admin"]
    }
  }
  ]
}]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 重置路由
export function resetRouter() {
  const newRouter = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  router.matcher = newRouter.matcher // reset router
}

export default router

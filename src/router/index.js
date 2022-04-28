import { createRouter, createWebHistory } from "vue-router"
import Layout from "@/layout"

const routes = [{
  path: "/redirect",
  component: Layout,
  hidden: true,
  children: [{
    name: "redirect",
    path: "/redirect/:path(.*)",
    component: () =>
      import ("@/views/redirect/index")
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
    component: () =>
      import ("@/views/download/index")
  }]
},
{
  path: "/login",
  component: () =>
    import ("@/views/login/index"),
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
    component: () =>
      import ("@/views/dashboard/index"),
    meta: { title: "Home", icon: "home" }
  }]
},
{
  path: "/book",
  name: "Bookxzcz",
  component: Layout,
  redirect: "/book/borrow",
  meta: { title: "Borrow｜Buy", icon: "scan" },
  children: [{
    name: "borrow",
    path: "borrow",
    component: () => import ("@/views/borrow/index"),
    meta: { title: "borrow" }
  },
  {
    name: "reture",
    path: "return",
    component: () => import ("@/views/borrow/index"),
    meta: { title: "return" }
  }
  ]
},
{
  path: "/booklist",
  redirect: "/booklist/index",
  component: Layout,
  // hidden:true,
  children: [{
    name: "booklist",
    path: "index",
    component: () =>
      import ("@/views/booklist/bookList"),
    meta: { title: "Bookshelf", icon: "bookshelf" }
  }]
},
{
  path: "/profile",
  redirect: "/profile/index",
  component: Layout,
  hidden: true,
  children: [{
    name: "profile",
    path: "index",
    component: () =>
      import ("@/views//profile/index"),
    meta: { title: "个人主页" }
  }]
},
{
  path: "/external-link",
  component: Layout,
  children: [{
    path: "https://gitee.com/violet-umberto/online-library-management-system",
    meta: { title: "Repository", icon: "gitee" }
  }]
},
/* {
  path: "/test",
  name: "text",
  redirect: "/test/dashboard",
  component: Layout,
  meta: { title: "Test", icon: "test" },
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
}, */
{
  path: "/register",
  component: () =>
    import ("@/views/register/index"),
  hidden: true
}
]

export const constantRoutes = routes

export const asyncRoutes = [{
  path: "/Librarian",
  component: Layout,
  redirect: "/Librarian/bookManage",
  name: "Librarian",
  meta: {
    title: "Librarian",
    icon: "admin",
    roles: ["admin"] // you can set roles in root nav
  },
  children: [{
    path: "bookManage",
    component: () =>
      import ("@/views/Librarian/bookmanagement/index"),
    name: "PagePermission",
    meta: {
      title: "Book Manage",
      roles: ["admin"]
    }
  },
  {
    path: "readerManage",
    component: () =>
      import ("@/views/Librarian/readerManage"),
    name: "DirectivePermission",
    meta: {
      title: "Reader Manage",
      roles: ["admin"]
    }
  },
  {
    path: "categoryManage",
    component: () =>
      import ("@/views/Librarian/categoryManage"),
    name: "RolePermission",
    meta: {
      title: "Category Manage",
      roles: ["admin"]
    }
  }]
}]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: "/app",
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

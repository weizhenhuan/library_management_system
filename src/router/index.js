import { createRouter, createWebHistory, } from 'vue-router'
import Layout from '@/layout'

const routes = [
  {
    path: '/redirect',
    component: Layout,
    hidden:true,
    children:[
      {
        name:'redirect',
        path:'/redirect/:path(.*)',
        component:() => import('@/views/redirect/index'),
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/dashboard',
    children:[
      {
        name:'dashboard',
        path:'dashboard',
        component:() => import('@/views/dashboard/index'),
        meta:{ title: '首页', icon: 'wansheng'}
      }
    ]
  },
  {
    path:'/test',
    name:'text',
    redirect: '/test/dashboard',
    component: Layout,
    meta:{ title: '测试', icon: 'rili'},
    children:[
      {
        name:'xczc',
        path:'dashboard',
        component:() => import('@/views/profile/index'),
        meta:{ title: '测试首页'}
      },
      {
        name:'sssss',
        path:'sssss',
        component:() => import('@/views/dashboard/index'),
        meta:{ title: 'hhhh'}
      },
    ]
  },
  {
    path:'/profile',
    redirect: '/profile/index',
    component: Layout,
    hidden:true,
    children:[
      {
        name:'profile',
        path:'index',
        component:() => import('@/views//profile/index'),
        meta:{ title: '个人主页'}
      },
    ]
  },

  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://www.bilibili.com/',
        meta: { title: 'External Link', icon: 'rili' }
      }
    ]
  },

  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  }
]

export const constantRoutes = routes

export const asyncRoutes = [
  {
    path: '/permissiontext',
    component: Layout,
    redirect: '/permissiontext/page',
    name: 'Permissiontext',
    meta: {
      title: 'Permissiontext',
      icon: 'rili',
      roles: ['admin', 'customer'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permissiontext/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['customer']
        }
      },
      {
        path: 'text1',
        component: () => import('@/views/permissiontext/text1'),
        name: 'DirectivePermission',
        meta: {
          title: 'text1 Permission'
        }
      },
      {
        path: 'admin',
        component: () => import('@/views/permissiontext/admin'),
        name: 'RolePermission',
        meta: {
          title: 'admin Permission',
          roles: ['admin']
        }
      }
    ]
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//重置路由
export function resetRouter() {
  const newRouter = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  router.matcher = newRouter.matcher // reset router
}


export default router

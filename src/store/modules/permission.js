import { asyncRoutes, constantRoutes } from "@/router"

/**
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
  },
  INIT_ROUTES: (state) => {
    state.routes = constantRoutes
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve) => {
      const addRoutes = filterAsyncRoutes(asyncRoutes, roles) || []
      commit("SET_ROUTES", addRoutes)
      resolve(addRoutes)
    })
  },

  initRoutes({ commit }) {
    return new Promise((resolve) => {
      commit("INIT_ROUTES")
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

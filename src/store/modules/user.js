import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({commit},userFrom){
    const {username,password} = userFrom
    return new Promise((resolve,reject)=>{
      login({username,password}).then(res=>{
        commit('SET_TOKEN',res.data.token)
        setToken(res.data.token)
        resolve()
      }).catch(error=>reject(error))
    })
  },

  getInfo({state,commit}){
    return new Promise((resolve,reject)=>{
      getInfo(state.token).then(res=>{
        const { data } = res
 
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        commit('SET_ROLES', data.roles)
        commit('SET_NAME', data.name)
        commit('SET_AVATAR', data.avatar)
        commit('SET_INTRODUCTION', data.introduction)
        resolve(res)
      }).catch(error=>reject(error))
    })
  },
  // user logout
  logout({state,commit}){
    return new Promise((resolve,reject)=>{
      logout(state.token).then(()=>{
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        resolve()
      }).catch(error=>reject(error))
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()

      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

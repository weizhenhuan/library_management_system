import { login, logout } from "@/api/user/login"
import { getInfo } from "@/api/user/info"
import { getToken, setToken, removeToken } from "@/utils/auth"
import { resetRouter } from "@/router"

const state = {
  token: getToken(),
  name: "",
  avatar: "",
  introduction: "",
  roles: [],
  email: ""
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
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  }
}

const actions = {
  // user login
  login({ commit }, userFrom) {
    const { username, password } = userFrom
    return new Promise((resolve, reject) => {
      login({ username, password }).then(res => {
        commit("SET_TOKEN", res.data.token)
        setToken(res.data.token)
        resolve()
      }).catch(error => reject(error))
    })
  },

  getInfo({ state, commit }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(res => {
        const { data } = res
        if (!data) {
          reject("Verification failed, please Login again.")
        }
        commit("SET_EMAIL", data.contact)
        commit("SET_ROLES", data.roles)
        commit("SET_NAME", data.name)
        commit("SET_AVATAR", data.avatar)
        commit("SET_INTRODUCTION", data.introduction)
        resolve(res)
      }).catch(error => reject(error))
    })
  },
  // user logout
  logout({ state, commit }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit("SET_TOKEN", "")
        commit("SET_ROLES", [])
        removeToken()
        resetRouter()

        resolve()
      }).catch(error => reject(error))
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "")
      commit("SET_ROLES", [])
      removeToken()
      resetRouter()

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

import Cookies from "js-cookie"

const state = {
  sidebarOpened: Cookies.get("sidebarStatus") ? !!+Cookies.get("sidebarStatus") : false,
  size: Cookies.get("size") || "medium"
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebarOpened = !state.sidebarOpened
    if (state.sidebarOpened) {
      Cookies.set("sidebarStatus", 1)
    } else {
      Cookies.set("sidebarStatus", 0)
    }
  },
  CLOSE_SIDEBAR: (state) => {
    Cookies.set("sidebarStatus", 0)
    state.sidebarOpened = false
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set("size", size)
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit("TOGGLE_SIDEBAR")
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit("CLOSE_SIDEBAR", withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit("TOGGLE_DEVICE", device)
  },
  setSize({ commit }, size) {
    commit("SET_SIZE", size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

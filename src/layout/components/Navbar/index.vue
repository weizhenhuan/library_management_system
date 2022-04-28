<template>
  <div class="navbar">
    <div style="padding: 0 15px"
         @click="toggleSideBar"
         class="hamburger-container">
      <svg-icon icon-class="fold"
                :class="{ 'is-collapse': isCollapse }"
                class="hamburger"></svg-icon>
    </div>
    <breadcrumb />

    <div class="right-menu">
      <svg-icon icon-class="refresh"
                class="refresh"
                @click="refresh" />
      <el-dropdown class="avatar-container right-menu-item hover-effect">
        <div class="avatar-wrapper">
          <img src="@/assets/avatar.jpg"
               class="user-avatar"
               style="padding:0" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="login">
              <span style="display: block">Log In</span>
            </el-dropdown-item>
            <!-- <el-dropdown-item @click="loginadmin">
              <span style="display: block">Log In|admin</span>
            </el-dropdown-item>
            <el-dropdown-item @click="logincus">
              <span style="display: block">Log In|customer</span>
            </el-dropdown-item> -->
            <router-link to="/profile/index">
              <el-dropdown-item divided>Profile</el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item>Dashboard</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided
                              @click="logout">
              <span style="display: block">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core"
import { useStore } from "vuex"
import Breadcrumb from "./Breadcrumb"
import { useRoute, useRouter } from "vue-router"

export default {
  name: "Navbar",
  components: { Breadcrumb },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const isCollapse = computed(() => {
      return store.getters.isCollapse
    })

    function toggleSideBar() {
      store.dispatch("app/toggleSideBar")
    }

    function refresh() {
      router.replace({
        path: "/redirect" + route.fullPath
      })
    }

    function login() {
      router.push("/login")
    }
    /* function logincus() {
      store
        .dispatch("user/login", { username: "customer", password: "sss" })
        .then(() => {
          router.replace({
            path: "/redirect" + "/"
          })
        })
    }
    function loginadmin() {
      store
        .dispatch("user/login", { username: "admin", password: "sss" })
        .then(() => {
          router.replace({
            path: "/redirect" + "/"
          })
        })
    } */

    function logout() {
      store.dispatch("user/logout").then(() => {
        router.replace({
          path: "/login"
        })
      })
    }
    return { toggleSideBar, isCollapse, refresh, logout,
    // loginadmin, logincus,
      login }
  }
}
</script>

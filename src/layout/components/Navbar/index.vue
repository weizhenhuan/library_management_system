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
      <div class="noti-box"
           v-if="messages.length">
        {{messages.length}}
      </div>
      <el-popover :width="350"
                  class="notification"
                  title="Notification:">
        <template #reference>
          <svg-icon icon-class="bell"
                    class="refresh" />
        </template>
        <div v-if="messages.length">
          <div v-for="(event,index) in messages"
               :key="event.id"
               style="margin-bottom:10px">
            <span>{{event.info}}</span>
            <div style="float:right;cursor:pointer"
                 @click="removeMessage(index)">×</div>
          </div>
          <div @click="removeUnread"
               style="border-top: 1px solid black;cursor:pointer">
            clear all
          </div>
        </div>
        <div v-else>No message yet.</div>
      </el-popover>

      <svg-icon icon-class="refresh"
                class="refresh"
                @click="refresh" />
      <svg-icon icon-class="back"
                class="refresh"
                @click="back" />

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
            </el-dropdown-item>
            <router-link to="/profile/index">
              <el-dropdown-item divided>Profile</el-dropdown-item>
            </router-link> -->
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
import { reactive } from "@vue/reactivity"
import { getMessage } from "@/api/user/info"
import { readMessage, readAllMessage } from "@/api/user/operation"

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
    const messages = reactive([])

    getMessage().then((res) => {
      res.data.forEach((item) => {
        messages.push(item)
      })
    })
    function removeUnread() {
      readAllMessage().then(() => {
        messages.length = 0
      })
    }
    function removeMessage(index) {
      readMessage(messages[index].id).then(() => {
        messages.splice(index, 1)
      })
    }

    function toggleSideBar() {
      store.dispatch("app/toggleSideBar")
    }

    function back() {
      router.back()
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
      login,
      back,
      messages,
      removeMessage,
      removeUnread }
  }
}
</script>

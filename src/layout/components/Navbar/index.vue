<template>
  <div class="navbar">
    <div style="padding: 0 15px;"
         @click="toggleSideBar"
         class="hamburger-container">
      <svg-icon icon-class="zhedie"
                :class="{'is-collapse':isCollapse}"
                class="hamburger"></svg-icon>
    </div>
    <breadcrumb />

    <div class="right-menu">
      <svg-icon icon-class='refresh'
                class="refresh"
                @click="refresh" />
      <el-dropdown class="avatar-container right-menu-item hover-effect">
        <div class="avatar-wrapper">
          <img src="@/assets/avatar.jpg"
               class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="login">
              <span style="display:block;">Log In</span>
            </el-dropdown-item>
            <router-link to="/profile/index">
              <el-dropdown-item divided>Profile</el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item>Dashboard</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided
                              @click="logout">
              <span style="display:block;">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
import Breadcrumb from './Breadcrumb'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'Navbar',
  components: { Breadcrumb },
  setup () {
    let store = useStore()
    let route = useRoute()
    let router = useRouter()
    let isCollapse = computed(() => {
      return store.getters.isCollapse
    })

    function toggleSideBar () {
      store.dispatch('app/toggleSideBar')
    }


    function refresh () {
      router.replace({
        path: '/redirect' + route.fullPath
      })
    }

    function login () {
      store.dispatch('user/login', { username: 'admin', password: 'sss' }).then(() => {
        router.replace({
          path: '/redirect' + '/'
        })
      })


    }

    function logout () {
      store.dispatch('user/logout').then(() => {
        router.replace({
          path: '/redirect' + '/'
        })
      })

    }
    return { toggleSideBar, isCollapse, refresh, logout, login }
  }

}
</script>

<style lang="less" scoped>
.navbar {
  height: 40px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 36px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }

    .hamburger {
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 20px;
    }

    .is-collapse {
      transform: rotate(180deg);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 40px;

    .refresh {
      display: inline-block;
      cursor: pointer;
      fill: #5a5e66;
      width: 20px;
      height: 20px;
      vertical-align: 10px;
    }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        //margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>


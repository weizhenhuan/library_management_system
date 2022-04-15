<template>
  <div v-if="!item.hidden">
    <template v-if='onlyHasOneShowing(item)&&(!onlyOneChild.date.children||onlyOneChild.date.noShowChild)'>
      <component :is="isHttp(onlyOneChild.date.path)"
                 v-bind="attrObj(onlyOneChild.date.path)">
        <el-menu-item :index='pathResolve(onlyOneChild.date.path)'
                      :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.date.meta.icon"
                :title="onlyOneChild.date.meta.title" />
        </el-menu-item>
      </component>
    </template>
    <el-sub-menu v-else
                 :index="pathResolve(item.path)"
                 popper-append-to-body>
      <template #title>
        <item v-if="item.meta"
              :icon="item.meta && item.meta.icon"
              :title="item.meta.title" />
      </template>
      <sidebar-item v-for="child in item.children"
                    :key="child.path"
                    :is-nest="true"
                    :item="child"
                    :base-path="pathResolve(child.path)"
                    class="nest-menu" />
    </el-sub-menu>
  </div>
</template>

<script>
import path from "path"
import { reactive } from "@vue/reactivity"
import Item from "./Item"

export default {
  name: "SidebarItem",
  components: { Item },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const onlyOneChild = reactive({
      date: {}
    })

    function onlyHasOneShowing(item) {
      if (item.children) {
        const children = item.children
        const showChild = []
        children.map(item => {
          if (item.hidden) {
            return false
          } else {
            showChild.push(item)
          }
        })
        if (showChild.length === 0) {
          onlyOneChild.date = { ...item, path: "", noShowChild: true }
          return true
        }
        if (showChild.length === 1) {
          onlyOneChild.date = showChild[0]
          return true
        }
      } else {
        onlyOneChild.date = { ...item, path: "", noShowChild: true }
        return true
      }
      return false
    }

    function pathResolve(routePath) {
      return path.resolve(props.basePath, routePath)
    }

    function isHttp(path) {
      if (path.includes("http")) {
        return "a"
      } else {
        return "router-link"
      }
    }

    function attrObj(path) {
      if (path.includes("http")) {
        return {
          href: path,
          target: "_blank"
        }
      }
      return {
        to: pathResolve(path)
      }
    }

    return { onlyOneChild, onlyHasOneShowing, pathResolve, isHttp, attrObj }
  }
}
</script>

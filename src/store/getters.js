const getters = {
  isCollapse: state => state.app.sidebarOpened,
  token: state => state.user.token, // 用户token
  avatar: state => state.user.avatar, // 用户头像
  name: state => state.user.name, // 用户名字
  introduction: state => state.user.introduction, // 用户介绍
  roles: state => state.user.roles, // 用户权限
  routes: state => state.permission.routes
}
export default getters

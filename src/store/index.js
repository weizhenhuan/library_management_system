import { createStore } from "vuex"
import getters from "./getters"

const Files = require.context("./modules", false, /\.js/)

const modules = Files.keys().reduce((modules, path) => {
  const name = path.replace(/^\.\/(.*)\.js$/, "$1")
  modules[name] = Files(path).default
  return modules
}, {})

export default createStore({
  modules,
  getters
})

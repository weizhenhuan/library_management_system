import axios from "axios"
import store from "@/store"
import { getToken } from "@/utils/auth"

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: '/',
  // baseURL: "http://127.0.0.1:4523/mock/841301",
  baseURL: "http://124.221.124.132:8080",
  // baseURL: "http://10.181.217.183:8080",
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers["X-Token"] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      if (response.config.url === "/pay") return response
      return Promise.reject(new Error(res.message || "Error"))
    } else {
      return res
    }
  },
  error => {
    console.log("err" + error) // for debug
    return Promise.reject(error)
  }
)

export default service

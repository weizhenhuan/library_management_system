import request from "@/utils/request"
import qs from "qs"

export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data: qs.stringify(data),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

export function checkUserName(userName) {
  return request({
    url: "/user/checkUserName",
    method: "get",
    params: { userName }
  })
}

export function register(data) {
  return request({
    url: "/user/register",
    method: "post",
    data: qs.stringify(data),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "post"
  })
}

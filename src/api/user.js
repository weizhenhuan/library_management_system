import request from "@/utils/request"
import qs from "qs"
export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    // data,
    data: qs.stringify(data),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
  /* return new Promise((res,rej)=>{
    res({
      code: 0,
      data: {'admin-token':'admin-token'}
    })
  }) */
}

export function register(data) {
  return request({
    url: "/user/register",
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

export function getInfo(token) {
  return request({
    url: "/user/getInfo",
    method: "get",
    params: { token: token }
  })
  /* return new Promise((res,rej)=>{
    res({
      code: 0,
      data: {'admin-token':'admin-token'}
    })
  }) */
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "post"
  })
}

export function getExinfo(token) {
  return request({
    url: "/user/getExinfo",
    method: "get",
    params: { userToken: token }
  })
}

export function getBorrowing(token) {
  return request({
    url: "/user/borrowing",
    method: "get",
    params: { userToken: token }
  })
}

export function getReserving(token) {
  return request({
    url: "/user/reserving",
    method: "get",
    params: { token: token }
  })
}

export function dynamic(token) {
  return request({
    url: "/user/dynamic",
    method: "get",
    params: { userToken: token }
  })
}

export function payFine(data) {
  return request({
    url: "/pay",
    method: "post",
    data: qs.stringify(data),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

export function payStatus(data) {
  return request({
    url: "/pay/status",
    method: "post",
    data: qs.stringify(data),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

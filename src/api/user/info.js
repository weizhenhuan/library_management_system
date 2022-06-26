import request from "@/utils/request"
import qs from "qs"

export function getInfo(token) {
  return request({
    url: "/user/getInfo",
    method: "get",
    params: { token: token }
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

export function payStatus(data) {
  return request({
    url: "/pay/status",
    method: "post",
    data: qs.stringify(data),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

export function getMessage() {
  return request({
    url: "/user/message",
    method: "get"
  })
}


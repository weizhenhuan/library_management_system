import request from "@/utils/request"
import qs from "qs"

export function payFine(data) {
  return request({
    url: "/pay",
    method: "post",
    data: qs.stringify(data),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

export function confirmPassword(password) {
  return request({
    url: "/user/confirmPassword",
    method: "post",
    data: qs.stringify({ password }),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

export function editInfo(data) {
  return request({
    url: "/user/editInfo",
    method: "post",
    data: qs.stringify(data),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

export function uploadImg(forms) {
  return request({
    url: "/user/upload",
    method: "post",
    data: forms
  })
}

export function payAllFine(token, sum_penalty) {
  return request({
    url: "/user/payAllFine",
    method: "post",
    data: qs.stringify({ "token": token, "sum_penalty": sum_penalty }),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

export function readMessage(id) {
  return request({
    url: "/user/readMessage",
    method: "post",
    data: qs.stringify({ id }),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

export function readAllMessage() {
  return request({
    url: "/user/readAllMessage",
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}


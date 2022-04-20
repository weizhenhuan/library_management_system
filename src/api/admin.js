import request from "@/utils/request"
import qs from "qs"

export function addBookAdmin(bookItem) {
  return request({
    url: "/admin/addBook",
    method: "post",
    data: qs.stringify(bookItem),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

export function updataBookAdmin(bookItem) {
  return request({
    url: "/admin/updateBook",
    method: "post",
    data: qs.stringify(bookItem),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

export function editBookAdmin(bookItem) {
  return request({
    url: "/admin/editBook",
    method: "post",
    data: qs.stringify(bookItem),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

export function getCategory() {
  return request({
    url: "/admin/getCategory",
    method: "get"
  })
}

export function deleteBookAdmin(bID) {
  return request({
    url: "/admin/deleteBook",
    method: "post",
    data: qs.stringify(bID),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}


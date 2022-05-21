import request from "@/utils/request"
import qs from "qs"

export function getBookList(type, info, pageSize, pageNum) {
  return request({
    url: "/admin/bookList",
    method: "get",
    params: { info, type, pageSize, pageNum }
  })
}

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
export function deleteBookAdmin(bID) {
  return request({
    url: "/admin/deleteBook",
    method: "delete",
    data: qs.stringify(bID),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

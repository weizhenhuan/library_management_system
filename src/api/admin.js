import request from "@/utils/request"
import qs from "qs"

export function getUserList(query, pagenum, pagesize) {
  return request({
    url: "/admin/getUserList",
    method: "get",
    params: { query, pagenum, pagesize }
  })
}
export function addUser(addForm) {
  return request({
    url: "/admin/add",
    method: "post",
    data: qs.stringify(addForm),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}
export function addUserList(addForm) {
  return request({
    url: "/admin/addUserList",
    method: "post",
    data: addForm
  })
}

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

export function editUser(editForm) {
  return request({
    url: "/admin/edit",
    method: "post",
    data: qs.stringify(editForm),
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

export function deleteUser(deleteForm) {
  return request({
    url: "/admin/deleteRead",
    method: "delete",
    data: qs.stringify(deleteForm),
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
    method: "delete",
    data: qs.stringify(bID),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}


import request from "@/utils/request"
import qs from "qs"

export function getUserList(query, pagenum, pagesize) {
  return request({
    url: "/users/getUserList",
    method: "get",
    params: { query, pagenum, pagesize }
  })
}
export function addUser(addForm) {
  return request({
    url: "/admin/add",
    method: "post",
    // params: { addForm.username, password },
    data: qs.stringify(addForm),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

export function editUser(username) {
  return request({
    url: "/admin/edit",
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

export function deleteUser(username) {
  return request({
    url: "/admin/delete",
    method: "delete",
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

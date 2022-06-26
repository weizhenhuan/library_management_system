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

export function editUser(editForm) {
  return request({
    url: "/admin/edit",
    method: "post",
    data: qs.stringify(editForm),
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

export function getPenaltyInfo(rId) {
  return request({
    url: "/user/penalty",
    method: "get",
    params: { rId }
  })
}

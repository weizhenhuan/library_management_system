import request from "@/utils/request"
import qs from "qs"

export function getCategory() {
  return request({
    url: "/admin/getCategory",
    method: "get"
  })
}
export function getCategoryListByName(categoryName, pageSize, pageNum) {
  return request({
    url: "/admin/categorylistByName",
    method: "get",
    params: { categoryName, pageSize, pageNum }
  })
}

export function addCategory(categoryName) {
  return request({
    url: "/admin/addCategory",
    method: "post",
    data: qs.stringify({ categoryName })
  })
}
export function updateCategory(oldCategoryName, newCategoryName) {
  return request({
    url: "/admin/updateCategory",
    method: "post",
    data: qs.stringify({ oldCategoryName, newCategoryName })
  })
}

export function deleteCategory(categoryName) {
  return request({
    url: "/admin/deleteCategory",
    method: "delete",
    data: qs.stringify({ categoryName }),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

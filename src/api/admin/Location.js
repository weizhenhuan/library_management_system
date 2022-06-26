import request from "@/utils/request"
import qs from "qs"

export function getLocationListByName(locationName = "", pageSize = 100, pageNum = 0) {
  return request({
    url: "/admin/locationlistByName",
    method: "get",
    params: { locationName, pageSize, pageNum }
  })
}

export function addLocation(locationName) {
  return request({
    url: "/admin/addLocation",
    method: "post",
    data: qs.stringify({ locationName })
  })
}
export function updateLocation(oldLocationName, newLocationName) {
  return request({
    url: "/admin/updateLocation",
    method: "post",
    data: qs.stringify({ oldLocationName, newLocationName })
  })
}
export function deleteLocation(locationName) {
  return request({
    url: "/admin/deleteLocation",
    method: "delete",
    data: qs.stringify({ locationName }),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}


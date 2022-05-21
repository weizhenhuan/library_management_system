import request from "@/utils/request"
import qs from "qs"

export function getLocationListByName(locationName, pageSize, pageNum) {
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
    data: qs.stringify({ locationName })
  })
}


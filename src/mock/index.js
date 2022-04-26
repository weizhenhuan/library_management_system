import { param2Obj, body2Obj } from "@/utils"
const Mock = require("mockjs")

const User = require("./user")
const Book = require("./book")
const Admin = require("./admin")

const reqs = [...User, ...Book, ...Admin]

// mock的两处返回形式处理：函数或者json数据模板
function twoMockData(response) {
  return function(options) {
    if (response instanceof Function) {
      const { type, url, body } = options
      return response({
        method: type,
        // body: JSON.parse(body),
        body: body2Obj(body),
        query: param2Obj(url)
      })
    }
    return response
  }
}

reqs.forEach((item) => {
  Mock.mock(item.url, item.type, twoMockData(item.response))
})

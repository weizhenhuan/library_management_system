import request from "@/utils/request"

/**
 * @param bookName 书名
 * @param pageSize 每页大小
 * @param pageNum 页数
 * @returns data{bookdata, total}
 */
export function getBookByNameAndISBN(bookName, ISBN, pageSize, pageNum) {
  return request({
    url: "/book/booklist/bookname",
    method: "get",
    params: { bookName, ISBN, pageSize, pageNum }
  })
}

/**
 *
 * @param bookID
 * @param userToken
 * @returns {isSuccess}
 */
export function borrowBookByID(bookID, userToken, days) {
  return request({
    url: "/user/borrow",
    method: "get",
    params: { bookID, userToken, days }
  })
}

export function buyBookByID(bookID, userToken) {
  return request({
    url: "/user/buybook",
    method: "get",
    params: { bookID, userToken }
  })
}

export function returnBookByID(bookID, userToken) {
  return request({
    url: "/user/returnbook",
    method: "get",
    params: { bookID, userToken }
  })
}

export function renewBookByID(bookID, userToken, days) {
  return request({
    url: "/user/renewbook",
    method: "get",
    params: { bookID, userToken, days }
  })
}

export function getBookByID(bookID) {
  return request({
    url: "/book/borrow/bookID",
    // url: "http://127.0.0.1:4523/mock/841301/book/borrow/bookID",
    method: "get",
    params: { bookID }
  })
}

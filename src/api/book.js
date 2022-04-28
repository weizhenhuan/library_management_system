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
 * @param ISBN
 * @returns data{book_detail_data}
 */
export function getBooksDetailByISBN(ISBN) {
  return request({
    url: "/book/booklist/bookdetail",
    method: "get",
    params: { ISBN }
  })
}

/**
 * @param userID
 * @param bookID
 * @returns {isSuccess}
 */
export function reserveBookByID(userID, bookID) {
  return request({
    url: "/book/booklist/reserve",
    method: "get",
    params: { userID, bookID }
  })
}

/**
 * @param userID
 * @param bookID
 * @returns {isSuccess}
 */
export function cancelBookByID(bookID, userID) {
  return request({
    url: "/book/booklist/cancelreserve",
    method: "get",
    params: { bookID, userID }
  })
}

/**
 *
 * @param bookID
 * @param userToken
 * @returns {isSuccess}
 */
export function borrowBookByID(bookID, userToken) {
  return request({
    url: "/user/borrow",
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
    method: "get",
    params: { bookID }
  })
}

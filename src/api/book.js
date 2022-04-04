import request from '@/utils/request'

/**
 * @param bookName 书名
 * @param pageSize 每页大小
 * @param pageNum 页数
 * @returns data{bookdata, total}
 */
export function getBookBybookName(bookName, pageSize, pageNum) {
    return request({
        url: '/book/booklist/bookname',
        method: 'get',
        params: {bookName, pageSize, pageNum}
    })
}

/**
 * @param ISBN
 * @param pageSize 每页大小
 * @param pageNum 页数
 * @returns data{bookdata, total}
 */
export function getBookByISBN(ISBN, pageSize, pageNum) {
    return request({
        url: '/book/booklist/isbn',
        method: 'get',
        params: {ISBN, pageSize, pageNum}
    })
}

/**
 *
 * @param bookID 图书ID
 * @returns bookdata
 */
export function getBookByID(bookID) {
    return request({
        url: '/book/booklist/bookid',
        method: 'get',
        params: {bookID}
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
        url: '/user/borrow',
        method: 'get',
        params: {bookID, userToken}
    })
}

module.exports = [
  {
    url: /\/book\/booklist\/bookname\.*/,
    type: "get",
    response: () => {
      return {
        code: 0,
        data: {
          bookList: [
            {
              bId: 1,
              bName: "vue从入门到入土",
              bAuthor: "Mr.GGLS",
              bLeftNum: 10,
              ISBN: "666",
              bPrice: 78,
              bPhoto: "https://zs.xianmaigu.com/hbzjk_book/api/bookCover/getBookCover.html?isbn=978-7-115-52163-7",
              bBookshelf: "b203-3-2-1",
              bTotalNum: 30,
              bTypeid: "jisuan"
            },
            {
              bId: 2,
              bName: "三十年精通vue",
              bAuthor: "Mr.GGLS",
              bLeftNum: 0,
              ISBN: "666",
              bPrice: 78,
              bPhoto: "https://img2.baidu.com/it/u=942228482,2348826349&fm=26&fmt=auto",
              bBookshelf: "b203-3-2-1",
              bTotalNum: 30,
              bTypeid: "jisuan"
            },
            {
              bId: 3,
              bName: "vue底层源码解析",
              bAuthor: "Mr.GGLS",
              bLeftNum: 0,
              ISBN: "666",
              bPrice: 78,
              bPhoto: "https://img2.baidu.com/it/u=942228482,2348826349&fm=26&fmt=auto",
              bBookshelf: "b203-3-2-1",
              bTotalNum: 30,
              bTypeid: "jisuan"
            },
            {
              bId: 4,
              bName: "vue设计与实现",
              bAuthor: "Mr.GGLS",
              bLeftNum: 0,
              ISBN: "666",
              bPrice: 78,
              bPhoto: "https://img2.baidu.com/it/u=942228482,2348826349&fm=26&fmt=auto",
              bBookshelf: "b203-3-2-1",
              bTotalNum: 30,
              bTypeid: "jisuan"
            },
            {
              bId: 512,
              bName: "中华养生宝典",
              bAuthor: "Mr.GGLS",
              bLeftNum: 0,
              ISBN: "666",
              bPrice: 78,
              bPhoto: "https://img2.baidu.com/it/u=942228482,2348826349&fm=26&fmt=auto",
              bBookshelf: "b203-3-2-1",
              bTotalNum: 30,
              bTypeid: "jisuan"
            },
            {
              bId: 5112,
              bName: "如何避免脱发",
              bAuthor: "Mr.GGLS",
              bLeftNum: 0,
              ISBN: "666",
              bPrice: 78,
              bPhoto: "https://img2.baidu.com/it/u=942228482,2348826349&fm=26&fmt=auto",
              bBookshelf: "b203-3-2-1",
              bTotalNum: 30,
              bTypeid: "jisuan"
            },
            {
              bId: 5102,
              bName: "活着",
              bAuthor: "Mr.GGLS",
              bLeftNum: 0,
              ISBN: "666",
              bPrice: 78,
              bPhoto: "https://img2.baidu.com/it/u=942228482,2348826349&fm=26&fmt=auto",
              bBookshelf: "b203-3-2-1",
              bTotalNum: 30,
              bTypeid: "jisuan"
            }
          ],
          total: 20
        }
      }
    }
  },

  {
    url: /\/user\/borrow\.*/,
    type: "get",
    response: () => {
      return {
        code: 0,
        data: 1 // 成功或者失败
      }
    }
  },

  {
    url: /\/user\/buybook\.*/,
    type: "get",
    response: () => {
      return {
        code: 0,
        data: 1 // 成功或者失败
      }
    }
  },

  {
    url: /\/user\/returnbook\.*/,
    type: "get",
    response: () => {
      return {
        code: 0,
        data: 1 // 成功或者失败
      }
    }
  },

  {
    url: /\/user\/renewbook\.*/,
    type: "get",
    response: () => {
      return {
        code: 0,
        data: 1 // 成功或者失败
      }
    }
  }
]


module.exports = [
  {
    url: /\/book\/booklist\/bookname\.*/,
    type: 'get',
    response: () => {
      return {
        code: 0,
        data:{
          bookList: [
            {
              bookId: 1,
              bookName: 'vue从入门到入土',
              bookAuthor: 'Mr.GGLS',
              leftNum: 10,
              ISBN: '666',
              bookPrice: 78,
              bookImg: "https://img2.baidu.com/it/u=942228482,2348826349&fm=26&fmt=auto",
              createTime: '2022-02-02',
            },
            {
              bookId: 2,
              bookName: '三十年精通vue',
              bookAuthor: 'Mr.GGLS',
              leftNum: 0,
              ISBN: '666',
              bookState: 'available',
              // borrowTimes: 1,
              bookPrice: 78,
              bookImg: "https://64.media.tumblr.com/3a5e6d3ae5b48f51e7523c0451692de1/tumblr_p7pyh6VUfB1snerhxo4_400.jpg",
              createTime: '2022-02-02',
            },
            {
              bookId: 3,
              bookName: 'vue底层源码解析',
              ISBN: '666',
              bookState: 'available',
              // borrowTimes: 1,
              bookPrice: 78,
              bookImg: null,
              createTime: '2022-02-02',
            },
            {
              bookId: 4,
              bookName: 'vue设计与实现',
              ISBN: '666',
              bookState: 'available',
              // borrowTimes: 1,
              bookPrice: 78,
              bookImg: null,
              createTime: '2022-02-02',
            },
            {
              bookId: 512,
              bookName: '中华养生宝典',
              ISBN: '666',
              // borrowTimes: 1,
              bookPrice: 78,
              bookImg: null,
              bookState: 'available',
            },
            {
              bookId: 5112,
              bookName: '如何避免脱发',
              ISBN: '666',
              // borrowTimes: 1,
              bookPrice: 78,
              bookImg: null,
              bookState: 'available',
            },
            {
              bookId: 5102,
              bookName: '活着',
              ISBN: '666',
              // borrowTimes: 1,
              bookPrice: 78,
              bookImg: null,
              bookState: 'available',
            },
          ], 
          total: 20,
        }
      }
    }
  },

  {
    url: /\/user\/borrow\.*/,
    type: 'get',
    response: () => {
      return {
        code: 0,
        data: 1 //成功或者失败
      }
    }
  },

  {
    url: /\/user\/buybook\.*/,
    type: 'get',
    response: () => {
      return {
        code: 0,
        data: 1 //成功或者失败
      }
    }
  },

  {
    url: /\/user\/returnbook\.*/,
    type: 'get',
    response: () => {
      return {
        code: 0,
        data: 1 //成功或者失败
      }
    }
  },

  {
    url: /\/user\/renewbook\.*/,
    type: 'get',
    response: () => {
      return {
        code: 0,
        data: 1 //成功或者失败
        }
    }
  },
]

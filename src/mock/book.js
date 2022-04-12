
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
              bId: 1,
              bName: 'vue从入门到入土',
              bAuthor: 'Mr.GGLS',
              bLeftNum: 10,
              ISBN: '666',
              bPrice: 78,
              bPhoto: "https://img2.baidu.com/it/u=942228482,2348826349&fm=26&fmt=auto",
              createTime: '2022-02-02',
            },
            {
              bId: 2,
              bName: '三十年精通vue',
              bAuthor: 'Mr.GGLS',
              bLeftNum: 0,
              ISBN: '666',
              bookState: 'available',
              // borrowTimes: 1,
              bPrice: 78,
              bPhoto: "https://64.media.tumblr.com/3a5e6d3ae5b48f51e7523c0451692de1/tumblr_p7pyh6VUfB1snerhxo4_400.jpg",
              createTime: '2022-02-02',
            },
            {
              bId: 3,
              bName: 'vue底层源码解析',
              ISBN: '666',
              bookState: 'available',
              // borrowTimes: 1,
              bPrice: 78,
              bPhoto: null,
              createTime: '2022-02-02',
            },
            {
              bId: 4,
              bName: 'vue设计与实现',
              ISBN: '666',
              bookState: 'available',
              // borrowTimes: 1,
              bPrice: 78,
              bPhoto: null,
              createTime: '2022-02-02',
            },
            {
              bId: 512,
              bName: '中华养生宝典',
              ISBN: '666',
              // borrowTimes: 1,
              bPrice: 78,
              bPhoto: null,
              bookState: 'available',
            },
            {
              bId: 5112,
              bName: '如何避免脱发',
              ISBN: '666',
              // borrowTimes: 1,
              bPrice: 78,
              bPhoto: null,
              bookState: 'available',
            },
            {
              bId: 5102,
              bName: '活着',
              ISBN: '666',
              // borrowTimes: 1,
              bPrice: 78,
              bPhoto: null,
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

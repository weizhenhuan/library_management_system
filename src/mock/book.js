
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
              bId: 510251020,
              ISBN: 9787513333863,
              bAuthor: "日本任天堂",
              bBookshelf: "F4-G12",
              bInfo: "经过长达五年的开发，《塞尔达传说：旷野。本价的作品，一精\n十沿革历程",
              bName: "《塞尔达传说：旷野之息》大师之书",
              bPhoto: "https://img9.doubanio.com/view/subject/m/public/s33300235.jpg",
              bPrice: "10",
              bPublishTime: "2019-7",
              bPublisher: "新星出版社",
              bType: "nulla"
            },
            {
              bId: 5102,
              ISBN: 9787513333863,
              bAuthor: "日本任天堂",
              bBookshelf: "F4-G12",
              bInfo: "经过长达五年的开发，《塞尔达传说：旷野。本价的作品，一精\n十沿革历程",
              bName: "《塞尔达传说：旷野之息》大师之书",
              bPhoto: "https:\/\/img2.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p480747492.jpg",
              bPrice: "10",
              bPublishTime: "2019-7",
              bPublisher: "新星出版社",
              bType: "nulla"
            },
            {
              bId: 5102,
              ISBN: 9787513333863,
              bAuthor: "日本任天堂",
              bBookshelf: "F4-G12",
              bInfo: "经过长达五年的开发，《塞尔达传说：旷野。本价的作品，一精\n十沿革历程",
              bName: "《塞尔达传说：旷野之息》大师之书",
              bPhoto: "https://img9.doubanio.com/view/subject/m/public/s33300235.jpg",
              bPrice: "10",
              bPublishTime: "2019-7",
              bPublisher: "新星出版社",
              bType: "nulla"
            },
            {
              bId: 5102,
              ISBN: 9787513333863,
              bAuthor: "日本任天堂",
              bBookshelf: "F4-G12",
              bInfo: "经过长达五年的开发，《塞尔达传说：旷野。本价的作品，一精\n十沿革历程",
              bName: "《塞尔达传说：旷野之息》大师之书",
              bPhoto: "https://img9.doubanio.com/view/subject/m/public/s33300235.jpg",
              bPrice: "10",
              bPublishTime: "2019-7",
              bPublisher: "新星出版社",
              bType: "nulla"
            },
            {
              bId: 5102,
              ISBN: 9787513333863,
              bAuthor: "日本任天堂",
              bBookshelf: "F4-G12",
              bInfo: "经过长达五年的开发，《塞尔达传说：旷野。本价的作品，一精\n十沿革历程",
              bName: "《塞尔达传说：旷野之息》大师之书",
              bPhoto: "https://img9.doubanio.com/view/subject/m/public/s33300235.jpg",
              bPrice: "10",
              bPublishTime: "2019-7",
              bPublisher: "新星出版社",
              bType: "nulla"
            },
            {
              bId: 5102,
              ISBN: 9787513333863,
              bAuthor: "日本任天堂",
              bBookshelf: "F4-G12",
              bInfo: "经过长达五年的开发，《塞尔达传说：旷野。本价的作品，一精\n十沿革历程",
              bName: "《塞尔达传说：旷野之息》大师之书",
              bPhoto: "https://img9.doubanio.com/view/subject/m/public/s33300235.jpg",
              bPrice: "10",
              bPublishTime: "2019-7",
              bPublisher: "新星出版社",
              bType: "nulla"
            },
            {
              bId: 5102,
              ISBN: 9787513333863,
              bAuthor: "日本任天堂",
              bBookshelf: "F4-G12",
              bInfo: "经过长达五年的开发，《塞尔达传说：旷野。本价的作品，一精\n十沿革历程",
              bName: "《塞尔达传说：旷野之息》大师之书",
              bPhoto: "https://img9.doubanio.com/view/subject/m/public/s33300235.jpg",
              bPrice: "10",
              bPublishTime: "2019-7",
              bPublisher: "新星出版社",
              bType: "nulla"
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
        message: "1 "// 成功或者失败
      }
    }
  },

  {
    url: /\/user\/returnbook\.*/,
    type: "get",
    response: () => {
      return {
        code: 0,
        message: "1 " // 成功或者失败
      }
    }
  },
  {
    url: /\/user\/renewbook\.*/,
    type: "get",
    response: () => {
      return {
        code: 0,
        message: "1 " // 成功或者失败
      }
    }
  },
  {
    url: /\/book\/borrow\/bookID\.*/,
    type: "get",
    response: () => {
      return {
        "code": 0,
        "data": {
          "bID": 123426589,
          "bName": "局青到只山",
          "bAuthor": "do non dolore",
          "bLocation": "Excepteur mollit ut eiusmod",
          "bStatus": 1
        }
      }
    }
  },
  {
    url: /\/book\/booklist\/bookdetail\.*/,
    type: "get",
    response: () => {
      return {
        "code": 0,
        "bookItems": [
          {
            "bName": "zxczc",
            "bID": 5381333,
            "bLocation": "武侯区",
            "bStatus": 1
          },
          {
            "bName": "zxczc",
            "bID": 80824768,
            "bLocation": "-",
            "bStatus": -1
          },
          {
            "bName": "zxczc",
            "bID": 5734326599,
            "bLocation": "庆城县",
            "bStatus": 0
          },
          {
            "bName": "zxczc",
            "bID": 43168056,
            "bLocation": "长宁区",
            "bStatus": 1
          },
          {
            "bName": "zxczc",
            "bID": 4287174,
            "bLocation": "米脂县",
            "bStatus": 0
          },
          {
            "bName": "zxczc",
            "bID": 482465982,
            "bLocation": "兰溪市",
            "bStatus": 1
          },
          {
            "bName": "zxczc",
            "bID": 8443910525,
            "bLocation": "-",
            "bStatus": -1
          },
          {
            "bName": "zxczc",
            "bID": 769852747,
            "bLocation": "宁县",
            "bStatus": 0
          },
          {
            "bName": "zxczc",
            "bID": 51277,
            "bLocation": "措勤县",
            "bStatus": 0
          }
        ]
      }
    }
  }

]

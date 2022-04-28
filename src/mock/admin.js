
module.exports = [
  {
    url: /\/admin\/bookList\.*/,
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
    url: "/admin/addBook",
    type: "post",
    response: () => {
      return {
        code: 0,
        data: {
          idList: [
            100004008, 100004038, 100004009
          ]
        }
      }
    }
  },

  {
    url: "/admin/updateBook",
    type: "post",
    response: () => {
      return {
        code: 0,
        message: "hhhhhh"
      }
    }
  },

  {
    url: "/admin/getCategory",
    type: "get",
    response: () => {
      return {
        code: 0,
        data: {
          categoryList: [
            "nulla",
            "labore",
            "nulla"
          ]
        }
      }
    }
  },

  {
    url: "/admin/deleteBook",
    type: "delete",
    response: () => {
      return {
        code: 0,
        message: "sed fugiat dolor irure ipsum"
      }
    }
  },

  {
    url: /\/admin\/getUserList\.*/,
    type: "get",
    response: () => {
      return {
        code: 0,
        data: {
          total: 70,
          users: [
            {
              "rName": "12345678",
              "rPwd": "ut cillum minim",
              "rId": 223179323,
              "rContact": "labore in ad esse officia",
              "rPhoto": "http://dummyimage.com/400x400",
              "rIntro": "sint esse amet Duis",
              "rRealName": "得书布老"
            },
            {
              "rName": "12345268",
              "rPwd": "cillum",
              "rId": 220488171,
              "rContact": "ea commodo",
              "rPhoto": "http://dummyimage.com/400x400",
              "rIntro": "velit",
              "rRealName": "得便动需号空"
            }
          ]
        }
      }
    }
  },

  {
    url: "/admin/deleteRead",
    type: "delete",
    response: () => {
      return {
        code: 0,
        message: "sed fugiat dolor irure ipsum"
      }
    }
  },

  {
    url: "/admin/edit",
    type: "post",
    response: () => {
      return {
        code: 0,
        data: {
          username: "崔芳",
          password: "anim"
        }
      }
    }
  },

  {
    url: "/admin/add",
    type: "post",
    response: () => {
      return {
        data: {
          userId: 900000007
        },
        code: 0
      }
    }
  },
  {
    url: "/admin/addUserList",
    type: "post",
    response: () => {
      return {
        data: {
          idList: [
            900000007,
            900000011,
            900000088,
            900000099
          ]
        },
        code: 0
      }
    }
  }

]



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
          bId: 123456789
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
    type: "post",
    response: () => {
      return {
        code: 0,
        message: "sed fugiat dolor irure ipsum"
      }
    }
  }
]


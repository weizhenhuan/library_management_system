
module.exports = [
  // user login
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


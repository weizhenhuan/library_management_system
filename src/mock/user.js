
const tokens = {
  admin: {
    token: 'admin-token'
  },
  customer: {
    token: 'customer-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'customer-token': {
    roles: ['customer'],
    introduction: 'I am an customer',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal customer'
  }
}

module.exports = [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 0,
        data: token
      }
    }
  },

  // get user info
  {
    url: /\/user\/getInfo\.*/,
    type: 'get',
    response: config => {
      
      const { userToken } = config.query
      const info = users[userToken]
      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }
      return {
        code: 0,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: () => {
      return {
        code: 0,
        data: 'success'
      }
    }
  },
  {
    url: '/user/register',
    type: 'post',
    response: () => {
      return {
        code: 0,
        data: '****'
      }
    }
  },
  {
    url: /\/user\/checkUserName\.*/,
    type: 'get',
    response: () => {
      return {
        code: 0/1,
        data: '****'
      }
    }
  },
  {
    url: /\/user\/getExinfo\.*/,
    type: 'get',
    response: () => {
      return {
        code:0,
        data:{
        days: 123,
        books: 147,
        likes: 10
      }
    }
    }
  },
  {
    url: /\/user\/borrowing\.*/,
    type: 'get',
    response: () => {
      return {
        code:0,
        data: [
          {
            start: new Date('2021-3-2'),
            end: new Date('2022-5-15'),
            bookName: '算法从入门到入土',
            id: 'xcdfa1324',
            overdue: false,
          },
          {
            start: new Date('2022-4-1'),
            end: new Date('2022-4-3'),
            bookName: '计网从入门到入土',
            id: 'xcdfac1324',
            overdue: true,
          },
          {
            start: new Date('2022-4-1'),
            end: new Date('2022-5-19'),
            bookName: '前端从入门到入土',
            id: 'xcdfa13s24',
            overdue: false,
          },
          {
            start: new Date('2022-3-1'),
            end: new Date('2022-5-18'),
            bookName: '后端从入门到入土',
            id: 'xcdfaz1324',
            overdue: false,
          }
        ]
      }
    }
  },
  {
    url: /\/user\/dynamic\.*/,
    type: 'get',
    response: () => {
      return {
        code:0,
        data: [
            {
              time: '2018-02-19 12:00:00',
              bookName: '前端从入门到入土',
              action: 'borrow',
              days: '10',
            },
            {
              time: '2018-02-19 12:00:00',
              bookName: '前端从入门到入土',
              action: 'renew',
              days: '10',
            },
            {
              time: '2018-02-19 12:00:00',
              bookName: '前端从入门到入土',
              action: 'return',
      
            },
            {
              time: '2018-02-19 12:00:00',
              bookName: '前端从入门到入土',
              action: 'buy',
            },]
      }
    }
  },
]

import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  }) 
 /* return new Promise((res,rej)=>{
    res({
      code: 20000,
      data: {'admin-token':'admin-token'}
    })
  }) */
  
}

export function getInfo(token) {
  return request({
    url: '/user/getInfo',
    method: 'get',
    params: { token }
  })
  /* return new Promise((res,rej)=>{
    res({
      code: 20000,
      data: {'admin-token':'admin-token'}
    })
  }) */
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
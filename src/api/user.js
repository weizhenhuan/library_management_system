import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  }) 
 /* return new Promise((res,rej)=>{
    res({
      code: 0,
      data: {'admin-token':'admin-token'}
    })
  }) */
  
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function checkUserName(userName){
  return request({
    url: '/user/checkUserName',
    method: 'get',
    params: { userName }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/getInfo',
    method: 'get',
    params: { token }
  })
  /* return new Promise((res,rej)=>{
    res({
      code: 0,
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

export function getExinfo(token){
  return request({
    url:'/user/getExinfo',
    method: 'get',
    params: { token }
  })
}

export function borrowing(token){
  return request({
    url:'/user/borrowing',
    method: 'get',
    params: { token }
  })
}

export function dynamic(token){
  return request({
    url:'/user/dynamic',
    method: 'get',
    params: { token }
  })
}
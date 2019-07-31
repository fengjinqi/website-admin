import axios from '@/libs/api.request'

export const login = ({ username, password }) => {
  const data = {
    username,
    password
  }
  return axios.request({
    url: '/api/login/',
    data,
    method: 'post'
  })
}
/**
 * 查询个人用户
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const getUserInfo = (token) => {
  return axios.request({
    url: '/api/info/',
    headers: {
      'Authorization': 'JWT ' + token
    },
    method: 'get'
  })
}
export const setUserInfo = (id,data,token) => {
  return axios.request({
    url: '/api/info/'+id+'/',
    headers: {
      'Authorization': 'JWT ' + token
    },
    data:data,
    method: 'put'
  })
}


/**
 * 查询所有用户
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const getUserallInfo = (token) => {
  return axios.request({
    url: '/api/all_info/',
    headers: {
      'Authorization': 'JWT ' + token
    },
    method: 'get'
  })
}
/**
 * 查看用户详情
 * @param id
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const getDetailUserallInfo = (id,token) => {
  return axios.request({
    url: '/api/all_info/'+id+'/',
    headers: {
      'Authorization': 'JWT ' + token
    },
    method: 'get'
  })
}
/**
 * 修改用户信息
 * @param id
 * @param data
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const setUserallInfo = (id,data,token) => {
  return axios.request({
    url: '/api/all_info/'+id+'/',
    headers: {
      'Authorization': 'JWT ' + token
    },
    data:data,
    method: 'put'
  })
}

/**
 * 退出登录
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

/**
 * 获取未读消息个数
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const getUnreadCount = (token) => {
  return axios.request({
    url: '/api/UserMessages/?type=unread',
    headers: {
      'Authorization': 'JWT ' + token
    },
    method: 'get'
  })
}
/**
 * 获取未读消息
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const getMessage = (token) => {
  return axios.request({
    url: '/api/UserMessages/?type=unread',
    headers: {
      'Authorization': 'JWT ' + token
    },
    method: 'get'
  })
}
/**
 * 获取已读
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const getMessageRead = (token) => {
  return axios.request({
    url: '/api/UserMessages/?type=read',
    headers: {
      'Authorization': 'JWT ' + token
    },
    method: 'get'
  })
}

/**
 * 获取消息详情
 * @param id
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const getContentByMsgId = (id,token) => {
  return axios.request({
    url: "/api/UserMessages/"+id+"/?type=unread",
    method: 'get',
    params: {
      msg_id
    }
  })
}
/**
 * 设置消息已读
 * @param id
 * @param data
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const setContentByMsgId = (id,data,token) => {
  return axios.request({
    url: "/api/UserMessages/"+id+"/?type=unread",
    method: 'put',
    headers: {
      'Authorization': 'JWT ' + token
    },
    data:data
  })
}

export const removeMsgId = (id,token) => {
  return axios.request({
    url: "/api/UserMessages/"+id+"/?type=read",
    method: 'delete',
    headers: {
      'Authorization': 'JWT ' + token
    },
  })
}



import axios from '@/libs/api.request'

/**
 * 获取邮箱
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const getEmail = (token)=>{
  return axios.request({
    url: '/api/EmailsList/',
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'get'
  })
}
/**
 * 获取邮箱详细信息
 * @param id
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const getEmailDetail = (id,token)=>{
  return axios.request({
    url: '/api/EmailsList/'+id+'/',
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'get'
  })
}
/**
 * 修改
 * @param id
 * @param data
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const putEmailDetail = (id,data,token)=>{
  return axios.request({
    url: '/api/EmailsList/'+id+'/',
    headers: {
      'Authorization':'JWT '+token
    },
    data:data,
    method: 'put'
  })
}
/**
 * 创建
 * @param data
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const addEmail = (data,token)=>{
  return axios.request({
    url: '/api/EmailsList/',
    headers: {
      'Authorization':'JWT '+token
    },
    data:data,
    method: 'post'
  })
}

/**
 * 获取友情链接
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 * @constructor
 */
export const Friendship = (token)=>{
  return axios.request({
    url: '/api/LinkList/',
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'get'
  })
}

/**
 * 新增链接
 * @param data
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const addFriendship = (data,token)=>{
  return axios.request({
    url: '/api/LinkList/',
    headers: {
      'Authorization':'JWT '+token
    },
    data:data,
    method: 'post'
  })
}
/**
 * 获取链接详情页
 * @param id
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const getFriendship = (id,token)=>{
  return axios.request({
    url: '/api/LinkList/'+id+'/',
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'get'
  })
}
/**
 * 修改链接
 * @param id
 * @param data
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const putFriendship = (id,data,token)=>{
  return axios.request({
    url: '/api/LinkList/'+id+'/',
    headers: {
      'Authorization':'JWT '+token
    },
    data:data,
    method: 'put'
  })
}
/**
 * 删除链接
 * @param id
 * @param token
 * @returns {*}
 */
export const delFriendship = (id,token)=>{
  return axios.request({
    url: '/api/LinkList/'+id+'/',
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'delete'
  })
}
/**
 * 获取bannerList
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const bannerList = (token)=>{
  return axios.request({
    url: '/api/BannerList/',
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'get'
  })
}
/**
 * 删除banner
 * @param token
 * @param id
 * @returns {*|void|never|AxiosPromise<any>}
 * @constructor
 */
export const RemoveBanners = (token,id)=>{
  return axios.request({
    url: '/api/BannerList/'+id+'/',
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'delete'
  })
}
/**
 * 新增banner
 * @param token
 * @param data
 * @returns {*}
 * @constructor
 */
export const AddBanners = (token,data)=>{
  return axios.request({
    url: '/api/BannerList/',
    headers: {
      'Authorization':'JWT '+token
    },
    data,
    method: 'post'
  })
}
/**
 * 获取交流群
 * @param token
 * @returns {*}
 */
export const getQQList = (token) =>{
  return axios.request({
    url: '/api/get-list/',
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'get'
  })
}
/**
 * 获取详情
 * @param id
 * @param token
 * @returns {*}
 */
export const getQQDetail = (id,token) =>{
  return axios.request({
    url: '/api/get-list/'+id+'/',
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'get'
  })
}
/**
 * 修改
 * @param id
 * @param data
 * @param token
 * @returns {*}
 */
export const setQQDetail = (id,data,token) =>{
  return axios.request({
    url: '/api/get-list/'+id+'/',
    headers: {
      'Authorization':'JWT '+token
    },
    data,
    method: 'put'
  })
}
/**
 * 删除
 * @param id
 * @param token
 * @returns {*}
 */
export const delQQDetail = (id,token) =>{
  return axios.request({
    url: '/api/get-list/'+id+'/',
    headers: {
      'Authorization':'JWT '+token
    },

    method: 'delete'
  })
}
/**
 * 新增
 * @param data
 * @param token
 * @returns {*}
 */
export const addQQDetail = (data,token) =>{
  return axios.request({
    url: '/api/get-list/',
    headers: {
      'Authorization':'JWT '+token
    },
    data,
    method: 'post'
  })
}
export const addSEO = (data,token) =>{
  return axios.request({
    url: '/api/get-list/',
    headers: {
      'Authorization':'JWT '+token
    },
    data,
    method: 'post'
  })
}
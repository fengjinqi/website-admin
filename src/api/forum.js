import axios from '@/libs/api.request'

/**
 * 帖子分类
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const getListCategory = (token) => {
  return axios.request({
    url: '/api/forum/category/',
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'get'
  })
}
/**
 * 分类详情
 * @param id
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const putListCategory = (id,token) => {
  return axios.request({
    url: '/api/forum/category/'+id+'/',
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
export const putListCategorys = (id,data,token) => {
  return axios.request({
    url: '/api/forum/category/'+id+'/',
    headers: {
      'Authorization':'JWT '+token
    },
    data,
    method: 'put'
  })
}
/**
 * 新增
 * @param data
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const addListCategorys = (data,token) => {
  return axios.request({
    url: '/api/forum/category/',
    headers: {
      'Authorization':'JWT '+token
    },
    data:data,
    method: 'post'
  })
}
/**
 * 帖子列表
 * @param token
 * @param title
 * @param category
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const getList = (token,title='',category='') => {
  return axios.request({
    url: '/api/forum/?title='+title+'&category='+category,
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'get'
  })
}
/**
 * 删除
 * @param token
 * @param id
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const removeList = (token,id) => {
  return axios.request({
    url: '/api/forum/'+id+'/',
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'delete'
  })
}

export const putList = (token,id,data) => {
  return axios.request({
    url: '/api/forum/'+id+'/',
    headers: {
      'Authorization':'JWT '+token
    },
    data,
    method: 'PATCH'
  })
}

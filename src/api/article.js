import axios from '@/libs/api.request'
/**
 * 文章列表
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const getList = (token) => {
  return axios.request({
    url: '/api/article_list/',
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'get'
  })
}
/**
 * 我的文章
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const megetList = (token) => {
  return axios.request({
    url: '/api/me_article_list/',
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'get'
  })
}



/**
 * 创建文章
 * @param data
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const addArticle = (data,token) =>{
  return axios.request({
    url: '/api/article/',
    headers: {
      'Authorization':'JWT '+token
    },
    data:data,
    method: 'post'
  })
}
/***
 * 是否删除文章
 * @param data
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const setArticle = (data) =>{
  return axios.request({
    //url: '/api/article/'+id+'/',
    url: '/article/delete/',
    data:data,
    method: 'post'
  })
}
/**
 * 获取文章详情页
 * @param id
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const getArticleList = (id,token) =>{
  return axios.request({
    url:'/api/article_list/'+id+'/',
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'get'
  })
}

/**
 * 修改文章
 * @param data
 * @param id
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export  const putArticle = (data,id,token) =>{
  return axios.request({
    url:'/api/article/'+id+'/',
    headers: {
      'Authorization':'JWT '+token
    },
    data:data,
    method: 'put'
  })
}

/**
 * 超级管理员文章列表搜索
 * @param category
 * @param title
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const serachArticle = (category,title, token) =>{
  return axios.request({
    url:'/api/article_list/?category='+category+'&title='+title,
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'get'
  })
}

export const meserachArticle = (category,title, token) =>{
  return axios.request({
    url:'/api/me_article_list/?category='+category+'&title='+title,
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'get'
  })
}

/**
 * 分类列表
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const getCategory = (token) => {
  return axios.request({
    url: '/api/category/',
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'get'
  })
}

/**
 * 分类修改
 * @param id
 * @param data
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const updateCategory = (id, data, token) => {
  return axios.request({
    url: '/api/category/'+id+'/',
    headers: {
      'Authorization':'JWT '+token
    },
    data:{name:data},
    method: 'put'
  })
}


export const addCategory = (data, token) =>{
  return axios.request({
    url: '/api/category/',
    headers: {
      'Authorization':'JWT '+token
    },
    data:{name:data},
    method: 'post'
  })
}

/**
 * 删除分类
 * @param id
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const removeCategory = (id, token) =>{
  return axios.request({
    url: '/api/category/'+id+'/',
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'delete'
  })
}

import axios from '@/libs/api.request'

/**
 * 获取所有课程列表
 * admin权限
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const getCourseList = (token) => {
  return axios.request({
    url: '/api/courseList/',
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'get'
  })
}
/**
 * 获取我的课程列表
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const getMeCourseList = (token) => {
  return axios.request({
    url: '/api/mecourseList/',
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'get'
  })
}
/**
 * 获取课程详情页
 * @param id
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const getCourseDetaile = (id,token) =>{
  return axios.request({
    url: '/api/courseList/'+id+'/',
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'get'
  })
}

/**
 * 修改教程
 * @param id
 * @param data
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const updateCourse = (id,data,token) =>{
  return axios.request({
    url: '/api/course/'+id+'/',
    headers: {
      'Authorization':'JWT '+token
    },
    data:data,
    method: 'put'
  })
}
/**
 * 创建课程
 * @param data
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const createdCourse = (data,token) =>{
  return axios.request({
    url: '/api/course/',
    headers: {
      'Authorization':'JWT '+token
    },
    data:data,
    method: 'post'
  })
}
/**
 * 课程搜索
 * @param data
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const serachCourse = (data,token) =>{
  return axios.request({
    url: '/api/course/?title='+data,
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'get'
  })
}

/**
 * 删除 未做
 * @param id
 * @param data
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const setCourseList = (id,data,token) =>{
  return axios.request({
    url: '/api/courseList/'+id+"/",
    headers: {
      'Authorization':'JWT '+token
    },
    data:data,
    method: 'put'
  })
}

/**
 * 获取章节详情页
 * @param id
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const detailTutorial = (id,token) =>{
  return axios.request({
    url: '/api/Addtutorial/'+id+"/",
    headers: {
      'Authorization':'JWT '+token
    },
    method: 'get'
  })
}

/**
 * 修改内容
 * @param id
 * @param data
 * @param token
 * @returns {*|void|never|AxiosPromise<any>}
 */
export const updateTutorial = (id,data,token) =>{
  return axios.request({
    url: '/api/Addtutorial/'+id+"/",
    headers: {
      'Authorization':'JWT '+token
    },
    data:data,
    method: 'put'
  })
}


export const addTutorial = (data,token) =>{
  return axios.request({
    url: '/api/Addtutorial/',
    headers: {
      'Authorization':'JWT '+token
    },
    data:data,
    method: 'post'
  })
}

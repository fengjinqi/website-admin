import { detailTutorial } from '@/api/course'
import { setToken, getToken } from '@/libs/util'
export default {
  state: {
    id: '',
    title: '',
    content:''

  },
  mutations: {
    setTitle (state, title) {
      state.title = title
    },
    setContent (state, content) {
      state.content = content
    },
    setId (state,id){
      state.id = id
    }
  },
  getters: {
  },
  actions: {
    getCourse ({commit},id) {
      return new Promise((resolve, reject)=>{
        try {
          detailTutorial(id,getToken('token')).then(res=>{
            commit('setTitle',res.data.titles)
            commit('setContent',res.data.conent)
            resolve(res)
          })
        } catch (e) {
          reject(e)
        }
      })
    },
  }
}

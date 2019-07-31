import { getCategory } from '@/api/article'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    cargortyName: '', // 分类名
    cargortyNameId: '', // id

  },
  mutations: {
    setCargortyName (state, cargortyName) {
      state.cargortyName = cargortyName
    },
  },
  getters: {
  },
  actions: {
    /**
     * 获取分类
     * @param state
     * @param commit
     * @returns {Promise<any>}
     */
    getCargorty ({state, commit}) {

      return new Promise((resolve, reject)=>{
        try {
          getCategory(getToken('token')).then(res=>{
            commit('setCargortyName',res.data)
            resolve(res)

          })
        } catch (e) {
          reject(e)
        }
      })
    },
  }
}

import {
  login,
  logout,
  getUserInfo,
  getMessage,
  getContentByMsgId,
  getMessageRead,
  getUnreadCount
} from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    userName: '', // 姓名
    userId: '', // id
    avatorImgPath: '', // 头像
    mobile: '', // 手机号码
    email: '',
    is_staff: false,
    is_superuser: false,
    is_active: false,
    position:'',
    info:'',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    unreadCount: 10,
    read:0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {}
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setIs_staff(sate,is_staff){
      sate.is_staff=is_staff
    },
    setPosition(sate,position){
      sate.position=position
    },
    setInfo(sate,info){
      sate.info=info
    },
    setIs_superuser(state,superuser){
      state.is_superuser=superuser
    },
    setIs_active(state,active){
      state.is_active=active
    },
    setMobile(state,mobile){
      state.mobile=mobile
    },
    setEmail(state,email){
      state.email=email
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setMessageCount (state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList (state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList (state, list) {
      state.messageReadedList = list
    },
    setRead (state, list) {
      state.read = list
    },
    setMessageTrashList (state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore (state, { msg_id, content }) {
      state.messageContentStore[msg_id] = content
    },
    moveMsg (state, { from, to, msg_id }) {
      const index = state[from].findIndex(_ => _.msg_id === msg_id)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    }
  },
  getters: {

    messageUnreadCount: state => state.unreadCount,
    messageReadedCount: state => state.read,
    messageTrashCount: state => state.messageTrashList.length
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { username, password }) {
      username = username.trim()
      return new Promise((resolve, reject) => {
        login({
          username,
          password
        }).then(res => {
          const data = res.data
          commit('setToken', data.token)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('setToken', '')
        //   commit('setAccess', [])
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            const data = res.data[0]
            let image = data.user_imag?data.user_imag:data.user_image
            commit('setAvator', image)
            commit('setEmail', data.email)
            commit('setMobile', data.mobile)
            commit('setUserName', data.username)
            commit('setUserId', data.id)
            commit('setIs_staff', data.is_staff)
            commit('setPosition', data.position)
            commit('setInfo', data.info)
            commit('setIs_active', data.is_active)
            commit('setIs_superuser', data.is_superuser)
            commit('setAccess', data.access)
            commit('setHasGetInfo', true)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    getUnreadMessageCount ({ state, commit }) {
      getUnreadCount(getToken('token')).then(res => {


        commit('setMessageCount', res.data.count)
      })
    },
    // 获取消息列表，其中包含未读、已读、回收站三个列表
    getMessageList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getMessage(getToken('token')).then(res => {
          commit('setMessageUnreadList',res.data.results)
          // const { unread, readed, trash } = res.data
          // commit('setMessageUnreadList', unread.sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          // commit('setMessageReadedList', readed.map(_ => {
          //   _.loading = false
          //   return _
          // }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          // commit('setMessageTrashList', trash.map(_ => {
          //   _.loading = false
          //   return _
          // }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getMessage ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getMessageRead(getToken('token')).then(res => {
          commit('setMessageReadedList',res.data.results)
          commit('setRead',res.data.count)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

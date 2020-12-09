export default {

  state: {
    userInfo: {}
  },

  getters: {
    getUserInfo: state => state.userInfo
  },

  mutations: {
    // set方法
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  }
}

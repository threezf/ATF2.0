export default {
  changeFlag(state, payload) {
    state.flag = payload
    localStorage.setItem('userType', state.flag)
  },
  setLoginInfo(state, payload) {
    state.loginInfo.companyId = payload.companyId
    state.loginInfo.companyName = payload.companyName
    state.loginInfo.userId = payload.userId
    localStorage.setItem('loginInfo', JSON.stringify(state.loginInfo))
  }
}
export default {
  changeFlag(state, payload) {
    state.flag = payload
    localStorage.setItem('userType', state.flag)
  }
}
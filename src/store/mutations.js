/*
 * @Author: your name
 * @Date: 2020-11-04 16:37:46
 * @LastEditTime: 2020-12-15 21:49:41
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ATF2.0\src\store\mutations.js
 */
export default {
  changeFlag(state, payload) {
    state.flag = payload
    console.log('userType mutations', state.flag)
    localStorage.setItem('userType', state.flag)
  },
  setLoginInfo(state, payload) {
    state.loginInfo.companyId = payload.companyId
    state.loginInfo.companyName = payload.companyName
    state.loginInfo.userId = payload.userId
    localStorage.setItem('loginInfo', JSON.stringify(state.loginInfo))
  },
  updateTotalScore(state, payload) {
    state.totalScore = state.totalScore + payload.totalScore
  },
  setTotalScore(state, payload) {
    state.totalScore = payload.totalScore
  },
  setUrlList(state, payload) {
    console.log('设置url', payload)
    state.urlList = payload.urlList
    localStorage.setItem('urls', state.urlList)
  }
}
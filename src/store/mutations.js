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
  },
  setAssertionCheckType(state, payload){
		console.log('保存选择返回值类型', payload)
		state.assertionCheckType = payload
	},
	setAssertionRootType(state, payload){
		console.log('保存选择JSON根类型', payload)
		state.assertionRootType = payload
	},
	setAssertionBody(state, payload){
		console.log('保存校验规则', payload)
		state.assertionBody = payload
	},
	setCustomCode(state, payload){
		console.log('保存自定义返回码', payload)
		state.customCode = payload
	},
	setSelectedArrayType(state, payload){
		console.log('保存Array类型', payload)
		state.selectedArrayType = payload
	},
	setAssertionType(state, payload){
		console.log('保存选项类型', payload)
		state.assertionType = payload
	},
	setAllParams(state, payload){
		console.log('编辑时更新所有数据', payload)
		state.assertionType = payload.assertionType
		state.selectedArrayType = payload.assertionArrayBody
		state.customCode = payload.customCode
		state.assertionRootType = payload.assertionRootType
		state.assertionCheckType = payload.assertionCheckType
		state.assertionBody = payload.assertionBody
	},
	setCheckResHeader(state, payload) {
		state.checkResHeader = payload.value
	}
}

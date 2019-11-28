/**
 * 公共请求
 * 返回值为Promise
 * 
 * 使用方式
 * import Request from '{pwd}/libs/request'
 * 
 * Request({
      url: '/cgi-bin/poisearch',
      method: 'get',
      params: {}
    }).then((res) => {
    	
  	}).catch((err) => {
	
  	})
 */
import ElementUI from "element-ui"
import axios from 'axios'
import ErrorCode from '../const/errorCode'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.paramsSerializer = (params) => {
	return Qs.stringify(params, {arrayFormat: 'brackets'});
}
// axios.interceptors.response.use(function (response) {
//     if (response.data && response.data.errcode !== 0) {
//         let message = `【${response.data.errcode}】${ErrorCode[response.data.errcode] || response.data.errmsg}`
//         ElementUI.Message.warning(message)
//         return Promise.reject(message)
//     }
//     return response
// }, function (error) {
//     ElementUI.Message.error('请求失败，请重试')
//     return Promise.reject(error)
// })

//扩展Promise的finally方法
Promise.prototype.finally = function (callback) {
	let P = this.constructor;
	return this.then(
		value => P.resolve(callback()).then(() => value),
		reason => P.resolve(callback()).then(() => {
			throw reason
		})
	)
}

const Request = function (options) {
    return new Promise((resolve, reject) => {
        let headerUrl = 'http://10.101.167.184:8080/atfcloud2.0a'
        let axiosParams = {
            url: headerUrl + options.url,
            method: options.method,
        }
        if (options.method == 'get') {
            axiosParams.params = options.params
        } else {
            axiosParams.data = options.params
        }
        axios(axiosParams).then((res) => {
            res = res.data
            if (res.respCode.toString() === '0000') {
                ElementUI.Message.info(res.respMsg)
                resolve(res)
            } else {
                reject(res)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

export default Request
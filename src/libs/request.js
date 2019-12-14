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
// interceptors 执行时间：在axios().then(f,f)  之前
// api文档 : You can intercept requests or responses before they are handled by then or catch.
// 如果判断条件不通过就直接return Promise.reject(message) 不执行后边的内容
axios.interceptors.response.use(function (response) {
    console.log('response1111111111111',response)
    if (!response.data) {
        let message = `网络开小差！`
        return Promise.reject(message)
    }
    // if (response.data.respCode !== '0000') {
    //     let message = `【${response.data.respCode} || ${response.data.respMsg} }`
    //     return Promise.reject(message)
    // }
    return response
}, function (error) {
    ElementUI.Message.warning(error)
    return Promise.reject(error)
})

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
        let axiosParams = {
            url:  options.url,
            method: options.method,
        }
        if (options.method == 'get') {
            axiosParams.params = options.params
        } else {
            axiosParams.data = options.params
        }
        axios(axiosParams).then((res) => {
            res = res.data
            resolve(res)
        },(err)=>{
            reject(err)

        })
    })
}

export default Request
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
import Vue from 'vue'
import ErrorCode from '../const/errorCode'

const _Vue = new Vue({
    el: "#app",
  })

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.paramsSerializer = (params) => {
	return Qs.stringify(params, {arrayFormat: 'brackets'});
}
// interceptors 执行时间：在axios().then(f,f)  之前
// api文档 : You can intercept requests or responses before they are handled by then or catch.
// 如果判断条件不通过就直接return Promise.reject(message) 不执行后边的内容
axios.interceptors.response.use(function (response) {
    console.log('response1111111111111',response)
    if (! +response.status === 200) {
        console.log('11111111111')
        let message = "http请求失败：失败码：" + response.status+ "；失败信息："+response.statusText
        return Promise.reject(message)
    }
    if (response.data.respCode === '0000'||response.statusText==='OK') {
        console.log('222222222222')
        return response
    }
    console.log('3333333333333')
    let message =  `接口请求失败：失败码：${response.data.respCode}；失败信息：${response.data.respMsg}` 
    return Promise.reject(message)
}, function (error) {
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
            console.log('request',res.data)
            res = res.data;
            console.log('type',typeof res)
            //修改部分request内容，用于Mock API获取
            if(res.msg === ""||res.msg === '验证码正确'||res.success === true){
                // ElementUI.Message.info(res.obj);
                resolve(res)
            }else if (res.respCode.toString() === '0000') {
                // ElementUI.Message.info(res.respMsg)
                resolve(res)
            }
            else {
                reject(res)
            }
            
            
        }).catch((err) => {
            reject(err)
        })
    })
}

export default Request

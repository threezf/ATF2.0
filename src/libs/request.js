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
import Qs from 'qs'
import ErrorCode from '../const/errorCode'
import isDownload from '../const/urlDownload'

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
    console.log(response.request.responseURL)
    console.log(response, '响应内容')
    // if(isDownload(response.request.responseURL)){
    //     console.log(response)
    //     return response
    // }
    console.log('返回',response, response.status)
    if(+response.status === 201) {
        console.log('返回码201', response)
        return response
    }
    if(+response.data.respCode === 401) {
        // alert('异地账号登录')
        // window.location = "/#/login"
    }
    if (! (+response.status === 200)) {
        let message = "http请求失败：失败码：" + response.status+ "；失败信息："+response.statusText
        return Promise.reject(message)
    }
    if (response.data.respCode === '0000') {
        return response
    }
    if(response.data.success) {
        return response
    }
    let message = `接口请求失败：失败码：${response.data.respCode}；失败信息：${response.data.respMsg}`
    console.log('拦截器捕获了错误' + message)
    return Promise.reject(message)
}, function (error) {
    // window.location = '/#/error'
    console.log('发生错误拦截', error, _Vue)
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
            url:  '/atfcloud2.0a' + options.url,
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
            resolve(res)

        }).catch((err) => {
            reject(err)
        })
    })
}

export default Request

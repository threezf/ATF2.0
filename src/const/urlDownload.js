/**
 * 系统错误码统一返回值
 */
const urlDownload = [
    'dataCenter/downloadDataFile'
]
function isDownload (url){
    let flag = false
    urlDownload.forEach(item => {
        if(url.indexOf(item) !== -1){
            flag = true
        }
    })
    return flag
}
export default isDownload
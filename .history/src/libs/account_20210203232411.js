import $axiosJson from './axiosJson'; // 引入封装的axios实例
// 获取本地json数据
export const getJsonDataApi = () => {
    return $axiosJson({
        url: `./static/functions.json`, // json文件地址
        method: 'GET',
    }).then((res) => {
        return res.data
    }).then((value) => {
        return value;
    });
}
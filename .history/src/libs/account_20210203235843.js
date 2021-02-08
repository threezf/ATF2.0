import $axiosJson from './axiosJson'; // 引入封装的axios实例
// 获取本地json数据
export const getJsonDataApi = async () => {
    return  $axiosJson({
        url: `./static/functions.json`, // json文件地址
        method: 'GET',
    });
}
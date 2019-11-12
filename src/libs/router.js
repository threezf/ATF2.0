/**
 * 获取pathName对应的Sidebar的path和children，用于Sidebar组件的构建数据
 */
const GetSideBarList = function(pathName) {
    let routes = this.$router.options.routes
    let children = []
    let path = ''
    routes.forEach((item) => {
        if(item.name === pathName) {
            children = item.children
            path = item.path
        }
    })
    return {
        path: path,
        children: children
    }
}

export {
    GetSideBarList
}
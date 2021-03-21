<template>
    <div class="side-bar">
        <el-menu
                default-active="1"
                class="el-menu-vertical-demo side-bar-menu">
            <!-- 引入组件 -->
            <MenuTree :menuData="menuList"></MenuTree>
        </el-menu>
    </div>
</template>
 
<script>
    import MenuTree from "@/components/interfaceTest/MenuTree";
 
export default {
        name: "Nav",
        components: {
            MenuTree: MenuTree
        },
        data() {
            return {
                menuData : [],
                menuList : [{
                    index: "1",
                    name: "用户模块",
                    icon: 'el-icon-s-order',
                    children: [{
                        index: "2",
                        name: "账号相关",
                        icon: 'el-icon-s-order',
                        children: [{
                            index: "3",
                            name: "用户登录",
                            icon: 'el-icon-s-order',
                        }, {
                            index: "4",
                            name: "用户注销",
                            icon: 'el-icon-s-order',
                        }],
                    }]
                }, {
                    index: "5",
                    name: "企业模块",
                    icon: 'el-icon-s-order',
                }, {
                    index: "6",
                    name: "测试模块",
                    icon: 'el-icon-s-order',
                }, {
                    index: "7",
                    name: "日志模块",
                    icon: 'el-icon-s-order',
                }]
            }
        }
};
</script>

<style lang="less" scoped>
.side-bar {
    width: 240px;
    flex-shrink: 0;
    .side-bar-menu {
        background-color:"#E6E6E6";
        height: 100%;
    }
}
</style>
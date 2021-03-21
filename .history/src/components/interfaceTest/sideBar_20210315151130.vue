<template>
    <div>
        <el-menu
                default-active="1"
                class="el-menu-vertical-demo">
            <!-- 引入组件 -->
            <MenuTree :menuData="menuList"></MenuTree>
        </el-menu>
    </div>
</template>
 
<script>
    import {reactive, ref, isRef, toRefs, onMounted, watch, onUnmounted} from '@vue/composition-api';
    import MenuTree from "@/components/interfaceTest/MenuTree";
 
    export default {
        name: "Nav",
        components: {
            MenuTree: MenuTree
        },
        setup({root, refs,}, props) {
            const isCollapse = ref(true);
 
            const menuData = reactive('menuData')
            const menuList = reactive([{
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
            }])
 
 
            const handleOpen = ((key, keyPath) => {
                console.log(key, keyPath);
            })
 
            const handleClose = ((key, keyPath) => {
                console.log(key, keyPath)
            })
 
 
            return {
                menuList,
                handleOpen,
                handleClose,
                menuData
            }
        }
    }
</script>
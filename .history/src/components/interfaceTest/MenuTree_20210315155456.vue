<template>
    <div>
        <template v-for="(menu,index) in menuData">
            <el-submenu :key="menu.index" :index="menu.index" v-if="menu.children" >
                <template slot="title">
                        <span slot="title">{{menu.name}}</span>
                </template>
                <MenuTree :menuData="menu.children" ></MenuTree>
            </el-submenu>
            <el-menu-item :key="menu.index" :index="menu.index"   v-else>
                    <span slot="title">{{menu.name}}</span>
            </el-menu-item>
        </template>
    </div>
</template>
 
<script>

    export default {
        name: "MenuTree",
        props:{
            menuData: {
                type: Array,
                default: []
            },
        },
        components:{
        },

    }
</script>
 
<style lang="less" scoped>
    .el-menu-item {
        font-size: 14px  !important;
    }
 
 
</style>
 
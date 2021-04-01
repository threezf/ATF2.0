<template>
    <div>
        <template v-for="menu in menuData">
            <el-submenu :key="menu.index" :index="menu.index" style="text-align:center;" v-if="menu.children">
                <template slot="title">
                        <span slot="title" :class="isCollapse? 'isisCollapse-span':'open-span'">{{menu.name}}</span>
                </template>
                <template>
                    <el-dropdown  trigger="click">
                        <span class="el-dropdown-link" >
                            <i class="el-icon-arrow-down el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-circle-plus-outline">新建子分组</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-edit-outline">编辑</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-delete">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
                <MenuTree :menuData="menu.children" ></MenuTree>
            </el-submenu>
            <el-menu-item :key="menu.index" :index="menu.index" style="text-align:center" v-else>
                    <span slot="title">{{menu.name}}
                    </span>
                    <el-dropdown  trigger="click">
                        <span class="el-dropdown-link">
                            <i class="el-icon-arrow-down el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-circle-plus-outline">新建子分组</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-edit-outline">编辑</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-delete">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
            </el-menu-item>
        </template>
    </div>
</template>
 
<script>
import Template from '../transactDetail/template.vue'

    export default {
        name: "MenuTree",
        props:{
            menuData: {
                type: Array,
                default: []
            },
            isCollapse: {
                type: Boolean,
                default: false
            }
        },
        components:{
        },

                Template
    }
</script>
 
<style lang="less" scoped>
    .el-menu-item {
        font-size: 14px  !important;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 14px;
    }
    .el-dropdown {
        position: absolute !important;
        right: 20px;
    }
    .isisCollapse-span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
    }
    .open-span {
        width: auto;
        visibility: visible;
    }
 
</style>
 
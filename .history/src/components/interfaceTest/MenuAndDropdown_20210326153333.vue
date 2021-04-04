<template>
    <div>
        <template v-for="menu in menuData">
            <el-submenu :key="menu.index" :index="menu.index" style="text-align:center;" v-if="menu.children">
                <template slot="title">
                    <span slot="title" :class="isCollapse? 'isisCollapse-span':'open-span'">{{menu.name}}</span>
                    <span>
                <el-dropdown>
                        <el-button type="text" >
                            <i class="el-icon-arrow-down el-icon-more"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="Map(0,menu.index)" icon="el-icon-circle-plus-outline">新建子分组</el-dropdown-item>
                            <el-dropdown-item :command="Map(1,menu.index)" icon="el-icon-edit-outline">编辑</el-dropdown-item>
                            <el-dropdown-item :command="Map(2,menu.index)" icon="el-icon-delete">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
                </template>
                
                <MenuTree :menuData="menu.children" ></MenuTree>
            </el-submenu>
            <el-menu-item :key="menu.index" :index="menu.index" style="text-align:center" v-else>
                    <span slot="title">{{menu.name}}
                    </span>
                    <el-dropdown>
                        <el-button type="text" >
                            <i class="el-icon-arrow-down el-icon-more"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="Map(0,menu.index)" icon="el-icon-circle-plus-outline">新建子分组</el-dropdown-item>
                            <el-dropdown-item :command="Map(1,menu.index)" icon="el-icon-edit-outline">编辑</el-dropdown-item>
                            <el-dropdown-item :command="Map(2,menu.index)" icon="el-icon-delete">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
            </el-menu-item>
        </template>
    </div>
</template>
 
<script>
import Template from '../transactDetail/template.vue'
import MenuTree from './MenuTree.vue'

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
                MenuTree,
                dropdownMenu: {
                    type: 0,
                    index: 0
                }
        },
        methods: {
             handleCommand(command) {
                this.$message(command);
            }
        }
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
 
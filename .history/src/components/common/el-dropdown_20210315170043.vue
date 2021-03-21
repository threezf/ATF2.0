<template>
    <el-dropdown  trigger="click">
        <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">新建子分组</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">编辑</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline">删除</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<style lang="less" scoped>
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
 
 
</style>
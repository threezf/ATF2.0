<template>
<div :class="isCollapse?'narrow-side-bar':'side-bar'">
    <!--        <el-radio-group v-model="isCollapse" style="background-image: url(../assets/images/timg.jpg);"  size="small">-->
    <!--            <el-radio-button :label="true"><i class="el-icon-d-arrow-left"></i></el-radio-button>-->
    <!--            <el-radio-button :label="false"><i class="el-icon-d-arrow-right"></i></el-radio-button>-->
    <!--        </el-radio-group>-->
    <el-menu ref="menu" router :default-active="activedPath" class="side-bar-menu" :collapse="isCollapse">
        <!-- 一级导航 -->
        <template v-for="(menu, index) in menuList">
            <el-submenu :index="fullPath + '/' + menu.path" :key="index" v-if="(menu.children && !needHideAllChildren(menu)) && !menu.meta.hide">
                <template slot="title">
                    <i v-if="menu.meta.icon" :class="menu.meta.icon"></i>
                    <span>{{menu.meta.name}}</span>
                </template>
                <!-- 二级导航 -->
                <template v-for="(submenu, subindex) in menu.children">
                    <el-menu-item :index="fullPath + '/' + menu.path + '/' + submenu.path" :key="subindex" v-if="!submenu.meta.hide">{{submenu.meta.name}}</el-menu-item>
                </template>
            </el-submenu>
            <el-menu-item :index="fullPath + '/' + menu.path" :key="index" v-if="(!menu.children || needHideAllChildren(menu)) && !menu.meta.hide">
                <i v-if="menu.meta.icon" :class="menu.meta.icon"></i>
                <span slot="title">{{menu.meta.name}}</span>
            </el-menu-item>
        </template>
    </el-menu>
</div>
</template>

<script>
import {
    GetSideBarList
} from '@/libs/router.js'
export default {
    props: {
        pathName: String,
        // 第一个导航名字将会被替换成该字段
        firstPathName: String
    },
    data() {
        return {
            menuList: [],
            fullPath: '',
            isCollapse: false,
            activedPath: this.$route.path,
            flag: true,
        }
    },
    watch: {
        '$route'(newVal, oldVal) {
            this.activedPath = this.$route.path
        }
    },
    computed: {},
    methods: {
        /**
         * 获取侧边栏应该展示的数据
         */
        getSideBarList() {
            let routes = this.$router.options.routes
            console.log('sidebar', this.$router.options)
            let children = []
            let path = ''
            routes.forEach((item) => {
                if (item.name === this.pathName) {
                    children = item.children
                    path = item.path
                }
            })
            if (this.firstPathName) {
                console.log('-------------------------------------------------------------******************-')
                console.log(path[0])
                children[0].meta.name = this.firstPathName
            }
            this.fullPath = path
            this.menuList = children
        },
        needHideAllChildren(menu) {
            let needHide = true

            if (menu.children) {
                for (let i in menu.children) {
                    if (!menu.children[i].meta.hide) {
                        needHide = false
                        break
                    }
                }
            }
            return needHide
        }
    },
    mounted() {
        this.getSideBarList()
    }
};
</script>

<style lang="less" scoped>
.side-bar {
    width: 240px;
    flex-shrink: 0;

    .side-bar-menu {
        background-image: linear-gradient(157deg, #1060b3 10%, #b5d1ef 101%);
        color: white !important;
        height: 100%;
    }
}

.narrow-side-bar {
    width: 90px;
    flex-shrink: 0;

    .side-bar-menu {
        background-image: linear-gradient(157deg, #1060b3 10%, #b5d1ef 101%);
        color: white !important;
        height: 100%;
    }
}

.el-menu-item {
    color: #FFF !important;
}

.el-menu-item:focus,
.el-menu-item:hover {
    background-color: #66a7ca;
}

.el-menu-item i {
    color: #FFF !important;
}
</style>

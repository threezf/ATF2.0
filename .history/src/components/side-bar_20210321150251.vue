<template>
<div :class="isCollapse?'narrow-side-bar':'side-bar'">

    <el-menu ref="menu" router :default-active="activedPath" class="side-bar-menu radioGroup" :collapse="isCollapse">
			<el-radio-group v-model="isCollapse"   size="small">
				<el-radio-button :label="true" v-show="!isCollapse" style="margin-left: 200px"><i class="el-icon-s-fold"></i></el-radio-button>
				<el-radio-button :label="false"  v-show="isCollapse" style="margin-left: 9px"><i class="el-icon-s-unfold"></i></el-radio-button>
<!--				<el-divider></el-divider>-->
			</el-radio-group>
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
<!--					<el-divider></el-divider>-->
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
            fullPath: '',
            isCollapse: false,
            activedPath: this.$route.path,
            flag: true,
            urls: []
        }
    },
    watch: {
        '$route'(newVal, oldVal) {
            this.activedPath = this.$route.path
        }
    },
    computed: {
        menuList() {
            let routes = this.$router.options.routes
            console.log('sidebar', this.$router.options)
            console.log('路由地址', this.$route.path)
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
            if(this.pathName === 'SystemManagement') {
                return children.filter(item => {
                    return this.urls.indexOf(item.meta.another) > -1
                })
            }else {
                return children
            }
        }
    },
    methods: {
        /**
         * 获取侧边栏应该展示的数据
         */
        getSideBarList() {

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
    created() {
        this.$bus.on('setUrls', (url) => {
            this.urls = url.urlList
            console.log('sidebar创建 urls', this.urls)
        })
    },
    mounted() {
        this.urls = localStorage.getItem('urls').split(',')
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

.radioGroup .el-divider--horizontal{
	margin:0 !important;
}
	.radioGroup label{
		margin-bottom: 0;
	}
    .radioGroup .el-radio-button--small .el-radio-button__inner{
        padding:6px 8px !important;
    }

</style>


<template>
    <div :class="isCollapse?'narrow-side-bar':'side-bar'">
        <!-- 展开与折叠样式 -->
        <el-radio-group v-model="isCollapse" style=""  size="small">
            <el-radio-button :label="true"><i class="el-icon-d-arrow-left"></i></el-radio-button>
            <el-radio-button :label="false"><i class="el-icon-d-arrow-right"></i></el-radio-button>
        </el-radio-group>
        <el-menu ref="menu" router :default-active="activedPath" class="side-bar-menu"  :collapse="isCollapse">
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
    import {GetSideBarList} from '@/libs/router.js'
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
                urls: [], //登录时或缺的当前页面路由权限
            }
        },
        watch: {
        	'$route'(newVal, oldVal){
        		this.activedPath = this.$route.path
			}
		},
        computed: {},
        methods: {
            /**
             * 获取侧边栏应该展示的数据
             */
            getSideBarList() {
                console.log(this.firstPathName, this.pathName, 'side')
                let routes = this.$router.options.routes
                let children = []
                let path = ''
                routes.forEach((item) => {
                    if(item.name === this.pathName) {
                        children = item.children
                        path = item.path
                    }
                    console.log('side item过滤', children, this.urls)
                })
                if(this.firstPathName){
                    children[0].meta.name = this.firstPathName
                }
                if(this.pathName === 'SystemManagement') {
                    children = children.filter(item => {
                        if(this.urls.indexOf(item.meta.another) > -1) {
                            return item
                        }
                    })
                }else {
                    children = children
                }
                this.fullPath = path
                this.menuList = children
                console.log('side获取侧边栏', this.menuList)
            },
			needHideAllChildren(menu) {
            	let needHide = true

				if(menu.children) {
					for(let i in menu.children) {
						if(!menu.children[i].meta.hide) {
							needHide  = false
							break
						}
					}
				}
            	return needHide
			}
        },
        created() {
            this.getSideBarList()
        },
        mounted() {
            this.$bus.on('setUrls', (urls) => {
                this.urls = urls
                this.getSideBarList()
            })
        },
        activated() {
            // console.log('urls系统管理当前路由', localStorage.getItem('urls').split(','))
            this.urls = localStorage.getItem('urls').split(',')
            this.getSideBarList()
        },
    };
</script>
<style lang="less" scoped>
    .side-bar {
        width: 240px;
        flex-shrink: 0;

        .side-bar-menu {
            background: #f4f5f7;
            height: 100%;
        }
    }
    .narrow-side-bar{
        width: 90px;
        flex-shrink: 0;

        .side-bar-menu {
            background: #f4f5f7;
            height: 100%;
        }
    }
</style>

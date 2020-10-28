/**
系统管理页面，作为二级路由主页面
 */
<template>
    <div class="page-outer">
        <side-bar path-name="SystemManagement"></side-bar>
        <div class="right-content">
            <router-view />
        </div>
    </div>
</template>

<script>
    import SideBar from '@/components/side-bar'
    export default {
    	name: 'index',
        components: {
            SideBar
        },
        data() {
            return {
                urls: []
            }
        },
        created() {
            this.urls = localStorage.getItem('urls').split(',')
        },
        mounted() {
            this.$bus.on('setUrls', urls => {
                this.urls = urls.urls
                console.log('all事件监听', this.urls)
            })
            const children = this.$router.options.routes.find(item => item.name == 'SystemManagement').children
            console.log('all', this.urls)
            for(let i = 0 ; i < children.length; i++) {
                console.log('all', children[i], this.urls.indexOf(children[i].meta.another) > -1)
                if(this.urls.indexOf(children[i].meta.another) > -1) {
                    this.$router.push({
                        name: children[i].name
                    })
                    break
                } 
            }
        },
        methods: {
            
        }
    }
</script>

<style lang="less" scoped>
    .page-outer {
        display: flex;
        .right-content {
            flex: 1;
        }
    }
</style>

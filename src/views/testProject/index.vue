/**
系统管理页面，作为二级路由主页面
 */
<template>
    <div class="page-outer">
        <side-bar v-if='pathShow' path-name="TestProject" :first-path-name='projectName'></side-bar>
        <div class="right-content">
            <progress-bar v-show="isShow"></progress-bar>
            <div >
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
    import SideBar from '@/components/side-bar'
    import progressBar from '@/components/progressBar'
    import {SessionStorage} from 'wii-fe-utils'
    export default {
        components: {
            SideBar,
            progressBar
        },
        data() {
            return {
                isShow: true,
                pathShow: false,
                projectName: undefined,
            }
        },
        methods: {
            
        },
        watch:{
            '$route': {
                handler (to, from) {
                    if(to.name === 'testProject'){
                        this.pathShow = false
                    }
                    else{
                        this.pathShow = true
                        this.projectName = undefined
                    }
                        console.log('999999999999999999')
                        
                        console.log(sessionStorage.getItem("projectNameStorage"))
                        this.projectName = sessionStorage.getItem("projectNameStorage")
                },
                immediate: true
            }
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
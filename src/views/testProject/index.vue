/**
系统管理页面，作为二级路由主页面
 */
<template>
    <div class="page-outer">
        <side-bar path-name="TestProject"></side-bar>
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
    export default {
        components: {
            SideBar,
            progressBar
        },
        data() {
            return {
                isShow: true
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
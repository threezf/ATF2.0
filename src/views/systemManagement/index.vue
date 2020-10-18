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

            }
        },
        mounted() {
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

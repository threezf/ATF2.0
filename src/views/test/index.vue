/**
测试页面，作为二级路由主页面
 */
<template>
    <div class="page-outer">
        <side-bar path-name="TestIndex"></side-bar>
        <div class="right-content">
            <router-view />
        </div>
    </div>
</template>

<script>
    import SideBar from '@/components/side-bar'
    export default {
        components: {
            SideBar
        },
        data() {
            return {

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
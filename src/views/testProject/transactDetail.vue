/**
功能点详情界面
 */
<template>
    <div class="page-outer">
        <side-bar path-name="TestIndex"></side-bar>
        <div class="right-content">
            1111111111111222222222222222222222222222222
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
/**
系统管理页面，作为二级路由主页面
 */
<template>
    <div class="page-outer">
        <div class="right-content">
            <router-view />
        </div>
    </div>
</template>

<script>
    export default {
    	name: 'index',
        data() {
            return {
                urls: []
            }
        },
        created() {
            this.urls = localStorage.getItem('urls').split(',')
        },
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

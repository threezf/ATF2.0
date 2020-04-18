/**
快速开始页面，作为二级路由主页面
 */
<template>
    <div class="contain">
        <div class="next-content">
            <router-view />
        </div>
    </div>
</template>

<script>
    export default {
    	name: 'index',
        data() {
            return {
                active: 0
            }
        },
        methods: {
            next() {
                if (this.active++ > 5) this.active = 0;
            }
        }
    }
</script>

<style lang="less" scoped>
    .contain {
        margin:10px 20px
    }
</style>

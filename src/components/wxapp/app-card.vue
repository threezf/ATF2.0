<template>
    <div class="app-card">
        <el-card>
            <div @click="gotoWxappDetail">
                <div class="app-item name">{{info.name}}</div>
                <div class="app-item developer">appId: {{info.appId}}</div>
                <div class="bottom clearfix">
                    <slot name="bottom"></slot>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'AppCard',
        props: {
            info: {
                type: Object
            }
        },
        data() {
            return {}
        },
        watch: {},
        computed: {},
        methods: {
            gotoWxappDetail() {
                this.$router.push({ name: 'WxappAppManage', params: { appId: this.info.appId} })
            }
        },
        created() {},
        mounted() {}
    };
</script>
<style lang="less" scoped>
    .app-card {
        width: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        .name {
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 5px;
        }

        .app-item {
            padding: 2px 0;
        }
    }
</style>
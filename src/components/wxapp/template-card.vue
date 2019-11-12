<template>
    <div class="template-card">
        <el-card>
            <div>
                <div class="template-item name">{{info.source_miniprogram}}</div>
                <div class="template-item developer">开发者: {{info.developer}}</div>
                <div class="template-item desc">描述: {{info.user_desc}}</div>
                <div class="template-item version">版本: {{info.user_version}}</div>
                <div class="bottom clearfix">
                    <slot name="bottom"></slot>
                    <!-- <el-button @click="publishTemplate(info)" type="text" class="button">设为正式模板</el-button> -->
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'TemplateCard',
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
        methods: {},
        created() {},
        mounted() {}
    };
</script>
<style lang="less" scoped>
    .template-card {
        width: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        .name {
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 5px;
        }

        .template-item {
            padding: 2px 0;
        }
    }
</style>
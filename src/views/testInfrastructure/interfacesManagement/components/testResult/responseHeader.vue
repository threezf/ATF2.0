<template>
    <div class="tab-response-header">
        <p>
            暂无任何返回头部
        </p>
    </div>
</template>

<script>
export default {
    name: 'ResponseHeader',
    data() {
        return {

        }
    }
}
</script>

<style lang="less" scoped>
    .tab-response-header {
        min-height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
            text-align: center;
            color: gray;
            font-size: 13px;
        }
    }
</style>
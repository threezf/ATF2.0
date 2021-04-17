<template>
    <div class="tab-header">
        <span class="test-header-key">Content-Type : </span>
        <span class="common-value-span">{{type}}</span>
    </div>
</template>

<script>
export default {
    name: 'RequestHeader',
    data() {
        return {
            type: 'application/json'
        }
    }
}
</script>

<style lang="less" scoped>
    .tab-header {
        min-height: 200px;
        display: flex;
        .test-header-key {
            color: #999;
        }
        .common-value-span {
            font-size: 12px;
        }
        .test-header-key,
        .common-value-span {
            line-height: 20px;
        }
    }
</style>
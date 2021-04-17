<template>
    <div class="tab-time">
        <p>
            暂无时间分析信息
        </p>
    </div>
</template>

<script>
export default {
    name: 'Time',
    data() {
        return {

        }
    }
}
</script>

<style lang="less" scoped>
    .tab-time {
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
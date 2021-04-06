<template>
    <div class="project">
        <el-tabs type="border-card">
            <el-tab-pane label="接口详情"></el-tab-pane>
            <el-tab-pane label="接口测试"></el-tab-pane>
            <el-tab-pane label="测试用例"></el-tab-pane>
            <el-tab-pane label="Mock API"></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
export default {
    mixins: [VueMixins], // 时间格式转化
    name: 'InterfaceDetail',
}
</script>
<style scoped>
.border-card {
    flex: 1;

    height: 100%;
}
</style>
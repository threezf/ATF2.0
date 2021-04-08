<template>
    <div class="project">

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
.project {
        height: 100%;
        display: flex;
    }
</style>
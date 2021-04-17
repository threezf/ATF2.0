<template>
    <div>
        <RequestContent :params="params"></RequestContent>
    </div>
</template>

<script>
import RequestContent from './requestContent'
export default {
    name: 'Request',
    components: {
        RequestContent
    },
    props: {
        params: {
            type: [Object, String],
        }
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="less" scoped>

</style>
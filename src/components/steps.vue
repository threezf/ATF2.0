<template>
    <div class='stepsContain'>
        <el-steps :active="active" finish-status="success">
            <el-step title="添加功能点"></el-step>
            <el-step title="维护元素库"></el-step>
            <el-step title="配置用例"></el-step>
            <el-step title="执行用例"></el-step>
            <el-step title="查看结果"></el-step>
        </el-steps>
    </div>
</template>

<script>
import Request from '@/libs/request.js'
import VueMixins from '@/libs/vueMixins.js'
export default {
  components: {},
  mixins: [VueMixins],
  props: {
      active: Number
  },
  data() {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
    .stepsContain{
        margin-bottom: 10px;
    }
</style>
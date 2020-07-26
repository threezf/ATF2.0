/**
*快速开始——第二步维护元素库
*/
<template>
  <div class="contain">
    <div class="header-content">
      <steps :active="1"></steps>
    </div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="24">
        <element-library :transId="String(transId)" :autId="String(autId)"></element-library>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-button type="primary" @click="next()">添加并进入下一步</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Request from '@/libs/request.js'
import elementLibrary from "@/components/transactDetail/elementLibrary";
import steps from "@/components/steps";
export default {
  components: { steps, elementLibrary },
  data() {
    return {
      userId: "",
      transId: "",
      autId: "",
    };
  },
  created() {
    this.userId = sessionStorage.getItem("userId") || "3";
    this.transId = this.$route.query.transactId;
    this.autId = this.$route.query.autId;
  },
  methods: {
    next() {
      this.$router.push({ name: "QuicklyTemplate", query: this.$route.query });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
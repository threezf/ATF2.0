/**
*快速开始——第三步配置脚本
*/
<template>
  <div class="contain">
    <div class="header-content">
      <steps :active="2"></steps>
    </div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="24">
        <template-manage :transId="String(transId)" :autId="String(autId)" name="用例"></template-manage>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-button type="primary" @click="next()">配置完成并进入下一步</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import templateManage from "@/components/transactDetail/template";
import steps from "@/components/steps";
export default {
  components: { steps, templateManage },
  data() {
    return {
      transId: "",
      autId: "",
    };
  },
  created() {
    console.log("this.$router");
    console.log(this.$route);
    console.log("this.$router.query");
    console.log(this.$route.query);
    this.transId = this.$route.query.transactId;
    this.autId = this.$route.query.autId;
  },
  methods: {
    next() {
      this.$router.push({ name: "QuicklyRun", query: this.$route.query });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
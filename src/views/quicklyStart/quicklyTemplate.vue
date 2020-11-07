/**
*快速开始——第三步配置脚本
*/
<template>
  <div class="contain">
    <div class="header-content">
      <steps :active="2"></steps>
    </div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="23">
        <template-manage :transId="String(transId)" :showFlag="false" :autId="String(autId)" name="用例" :isQuick="true"></template-manage>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="fixButton">
        <el-button size="small" type="primary" @click="next()">配置完成并进入下一步</el-button>
				<el-button size="small" @click="back()">返回上一步</el-button>
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
		this.testPlanId = this.$route.query.testPlanId;
  },
  methods: {
    next() {
      this.$router.push({ name: "QuicklyRun", query: this.$route.query });
    },
		back() {
			this.$router.push({ name: "QuicklyElement", query: {
					autId: this.autId,
					transactId: this.transId,
					// sceneId: this.formData.sceneId,
					creatorId: sessionStorage.getItem("userId"),
					testPlanId: this.testPlanId,
				},});
		},
  },
};
</script>

<style lang="less" scoped>
	.fixButton{
		position:fixed;
		bottom:0;
		width:100%
	}
</style>

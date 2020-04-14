<template>

</template>

<script>
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
export default {
  name: "queryExecutionRecord",
  mixins: [VueMixins],
  data() {
    return {};
    
  },
  created() {
    this.selectAllTestround();
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      console.log(`当前${val}条`);
    },
    handleCurrentChange(val) {
      console.log(`当前${val}页`);
    },
    selectAllTestround() {
      Request({
        url: "/testroundController/selectAllTestround",
        method: "GET"
      })
        .then(res => {
          console.log("获取测试轮次成功", res);
          this.testRounds = res.testroundEntityList;
          this.selectedTestRound = res.testroundEntityList[0].name;
        })
        .catch(error => {
          console.log("获取测试轮次失败", error);
        });
    }
  }
};
</script>

<style scoped>
.queryMehod,
.testPlan,
.recordStatus {
  margin-left: 10px;
}
.methodSpan,
.testSpan,
.statusSpan {
  color: gray;
  font-size: 16px;
  margin-left: 30px;
}
.selectStatus {
  color: gray;
  font-size: 16px;
  width: 95px;
}
.inputStyle {
  width: 233px;
}
.rowStyle {
  margin-top: 15px;
}
.paginationDiv {
  text-align: center;
  margin-top: 15px;
}
</style>

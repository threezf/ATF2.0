<template>
  <div class="contain">
    <el-table
      width="100%"
      class="table"
      style="margin-top: 15px"
      border
      scrope
      :highlight-current-row="true"
      :data="tableData">
      <el-table-column min-width="4.95%" align="center" type="selection"></el-table-column>
      <el-table-column min-width="12.95%" align="center" prop="sceneName" label="场景名称"></el-table-column>
      <el-table-column min-width="6.46%" align="center" prop="executeRound" label="执行轮次"></el-table-column>
      <el-table-column min-width="12.5%" align="center" prop="casecode" label="用例编号" sortable></el-table-column>
      <el-table-column min-width="8.46%" align="center" prop="flownodeName" label="节点名称"></el-table-column>
      <el-table-column min-width="10.06%" align="center" prop="recorderStatus" label="记录单状态"></el-table-column>
      <el-table-column min-width="7.51%" align="center" label="执行结果状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.executeStatus == '成功'?'success':scope.row.executeStatus == '部分成功'?'primary':scope.row.executeStatus == '跳过执行'?'warning':scope.row.executeStatus == '失败' || scope.row.executeStatus == null?'danger':'info'"
            v-text="scope.row.executeStatus?scope.row.executeStatus:'未知'"
          ></el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="20.4%" align="center" prop="sourceChannel" label="来源渠道"></el-table-column>
      <el-table-column min-width="9.61%" align="center" label="执行报告">
        <template slot-scope="scope">
          <span v-if="scope.row.recorderData === null" class="noRecord">无记录</span>
          <a
            class="showRecordA"
            v-else
            type="primary"
            size="mini"
            @click.prevent="viewReport(scope.row)"
          >点击查看</a>
        </template>
      </el-table-column>
      <el-table-column min-width="7.1%" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "TableResult",
  data() {
    return {};
  },
  props: {
    tableData: {
      type: Array,
      default: []
    }
  },
  created() {},
  methods: {
    // 查看报告
    viewReport(row) {
      // 空白页打开
      window.open("http://140.143.16.21:9090/" + row.resourcePath);
    //   window.open("http://10.101.167.184:8080/" + row.resourcePath);
    },
    // 执行操作
    showDetail(row) {
      console.log("显示详情", row);
      this.$router.push({
        name: "CaseOperation",
        query: {
          batchId: row.runId,
          testPlanId: row.testPlanId,
          testcaseId: row.caseId,
          sceneId: row.sceneId,
          flag: true
        },
      });
    },
  },
};
</script>

<style>
</style>
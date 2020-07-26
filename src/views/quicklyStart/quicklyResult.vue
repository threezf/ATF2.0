<template>
  <div class="contain">
    <div class="header-content">
      <steps :active="4"></steps>
    </div>
    <table-result :tableData="tableData"></table-result>
    <el-row type="flex" class="row-bg" justify="center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :total="total"
        :current-page="currentPage"
        layout="total, sizes, prev, pager, next, jumper"
        >
      </el-pagination>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-button type="primary">执行完毕查看结果</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Request from "@/libs/request.js";
import steps from '@/components/steps';
import TableResult from '@/components/record/TableResult'
export default {
  name: 'QuicklyResult',
  data() {
    return {
      tableData: [],
      pageSizes: [5,10,20,50],
      pageSize: 10,
      total: 100,
      currentPage: 1
    }
  },
  created() {
    this.getResult(this.currentPage, this.pageSize)
  },
  watch: {
    currentPage() {
      this.getResult(this.currentPage, this.pageSize)
    },
    pageSize() {
      this.getResult(this.currentPage, this.pageSize)
    },
  },
  methods: {
    getResult(currentPage, pageSize) {
      Request({
      url: "/testRecordController/pagedBatchQueryTestRecordByTestRound",
      method: "POST",
      params: {
        casecode: "",
        currentPage,
        executeStatus: "",
        orderColumns: "casecode",
        orderType: "asc",
        pageSize,
        recorderStatus: "",
        sceneId: "",
        testRound: ""
      }}).then(res => {
        this.tableData = res.list;
        this.total = res.totalCount
      }).catch(error => {
        console.log("查询失败", error);
        // this.$message.warning("无此类数据");
      });
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  },
  components: {
    steps,
    TableResult
  }
}
</script>

<style scoped lang="less">

</style>
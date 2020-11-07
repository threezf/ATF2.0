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
    <el-row type="flex" justify="center" class="fixButton">
<!--        <el-button type="primary">执行完毕查看结果</el-button>-->
				<el-button
          size="small"
					@click="back"
				>返回上一步
				</el-button>
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
      total: 0,
      currentPage: 1
    }
  },
  created() {
    this.pagedBatchQueryTestRecordByRunId(this.currentPage, this.pageSize)
  },
  watch: {
    currentPage() {
      this.pagedBatchQueryTestRecordByRunId(this.currentPage, this.pageSize)
    },
    pageSize() {
      this.pagedBatchQueryTestRecordByRunId(this.currentPage, this.pageSize)
    },
  },
  methods: {
    // pagedBatchQueryTestRecordByRunId
    pagedBatchQueryTestRecordByRunId(currentPage, pageSize) {
      let _this = this
      Request({
        url: '/testRecordController/pagedBatchQueryTestRecordByRunId',
        method: 'POST',
        params: {
          currentPage: currentPage,
          orderColumns: "casecode",
          orderType: "asc",
          pageSize: pageSize,
          runId: _this.$route.query.runId,
          testPlanId: _this.$route.query.data.testPlanId
        }
      }).then(res => {
          _this.total = res.totalCount
          _this.tableData = res.list
      }).catch(err => {
        console.log('查詢失敗')
      })
    },
		back() {
			this.$router.push({ name: "QuicklyRun", query: this.$route.query.data });
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
	.fixButton{
		position:fixed;
		bottom:0;
		width:100%
	}
</style>

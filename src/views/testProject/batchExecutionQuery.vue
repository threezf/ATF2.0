<template>
  <div class="page-inner">
    <el-container>
      <el-main>
        <el-row>
          <el-col 
            class="timeCol" 
            :span="1" 
            :offset="0">
            <span>起始日期:</span>
          </el-col>
          <el-col 
            style="margin-right:10px" 
            class="timePicker" 
            :span="3.5" 
            :offset="0">
            <el-date-picker
              v-model="startTime"
              type="datetime"
              placeholder="开始日期"
              :disabled="dateDisabled"
            ></el-date-picker>
          </el-col>
          <el-col class="toStyle" :span="0.1" :offset="0">
            <span>至</span>
          </el-col>
          <el-col class="timePicker" :span="5" :offset="0">
            <el-date-picker
              v-model="endTime"
              type="datetime"
              placeholder="结束日期"
              :disabled="dateDisabled"
            ></el-date-picker>
          </el-col>
          <el-col class="timeRange" :span="1" :offset="0">
            <span>时间段</span>
          </el-col>
          <el-col class="timePicker" :span="6" :offset="0">
            <el-select v-model="timeSlot" @change="timeSlotSelect">
              <el-option value="左侧日历表选择"></el-option>
              <el-option value="近一天"></el-option>
              <el-option value="近一周"></el-option>
              <el-option value="近一月"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="rowStyle">
          <el-col class="timeCol" :span="1.2" :offset="0">
            <span>用例来源:</span>
          </el-col>
          <el-col class="timePicker" :span="4" :offset="0">
            <el-select v-model="selectedCaseSource">
              <el-option v-for="(item,index) in caseSources" :key="index" :value="item"></el-option>
            </el-select>
          </el-col>
          <el-col class="timeCol" :span="1" :offset="0">
            <span>测试计划</span>
          </el-col>
          <el-col class="timePicker" :span="4" :offset="0">
            <el-select v-model="params.testPlanId" @change="handleTestPlanChange">
              <el-option
                v-for="(item,index) in testPlans"
                :key="index"
                v-bind:value="item.id"
              >{{item.nameMedium}}</el-option>
            </el-select>
          </el-col>
          <el-col class="executionStatus" :span="1" :offset="0">
            <span>执行状态</span>
          </el-col>
          <el-col class="timePicker" :span="4" :offset="0">
            <el-select v-model="selectedExecutionStatus" @change="handleRunStatusChange">
              <el-option v-for="(item,index) in executionStatuses" :key="index" :value="item"></el-option>
            </el-select>
          </el-col>
          <el-button type="primary" size="small" icon="el-icon-search" @click="executeQuery">查询</el-button>
        </el-row>
        <el-table scripe border class="tableStyle" :data="tableData">
          <el-table-column align="center" width="162px" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="queryRecord(scope.row)">查看记录单</el-button>
              <el-button type="primary" size="mini" @click="archive(scope.row)">归档</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" width="90px" label="发起用户" prop="startUser"></el-table-column>
          <el-table-column width="90px" label="用例来源" align="center" prop="instanceSource"></el-table-column>
          <el-table-column width="149px" align="center" label="测试计划">
            <template slot-scope="scope">
              <el-button type="primary" size="mini">{{scope.row.testPlanName}}</el-button>
            </template>
          </el-table-column>
          <el-table-column width="90px" label="执行轮次" align="center" prop="executionRound"></el-table-column>
          <el-table-column width="90px" label="用例总数" align="center" prop="totalInsCount"></el-table-column>
          <el-table-column width="103px" label="成功用例数" align="center" prop="successInsCount"></el-table-column>
          <el-table-column width="105px" label="失败用例数" align="center">
            <template slot-scope="scope">
              <span class="failedStyle">{{scope.row.failedInsCount}}</span>
            </template>
          </el-table-column>
          <el-table-column width="104px" label="跳过用例数" align="center" prop="notRunInsCount"></el-table-column>
          <el-table-column width="111px" align="center" label="用例饼状图">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="openCakePic(scope.row)">查看饼状图</el-button>
            </template>
          </el-table-column>
          <el-table-column width="95px" label="执行状态" align="center" prop="executingStatus"></el-table-column>
          <el-table-column width="95px" label="执行结果" align="center">
            <template slot-scope="scope">
              <span
                :class="scope.row.executedResult==='全部失败'?'failedStyle':''"
              >{{scope.row.executedResult}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="160px"
            label="创建时间"
            align="center"
            prop="createTime"
            :formatter="transTime"
          ></el-table-column>
          <el-table-column
            width="160px"
            label="完成时间"
            align="center"
            prop="finishTime"
            :formatter="transTime"
          ></el-table-column>
        </el-table>
        <div class="paginationStyle">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="params.pageSize"
            :page-sizes="[5,10,20,50]"
            :current-page="params.currentPage"
            :total="total"
            layout="total,sizes,prev,pager,next,jumper"
          ></el-pagination>
        </div>
        <el-dialog
          width="40%"
          :title="cakeTitle"
          :visible.sync="cakePicVisable"
          :before-close="handleBeforeClose"
        >
          <div class="mainCakeDiv">
            <div id="leftCake" class="leftCakeDiv">
              <ve-pie :data="chartData" :colors="useColor"></ve-pie>
            </div>
            <div class="rightCakeDiv">
              <table>
                <tr>
                  <td>
                    <div class="colorSuccess"></div>
                  </td>
                  <td class="statusDes">成功用例数</td>
                </tr>
                <tr>
                  <td>
                    <div class="colorFail"></div>
                  </td>
                  <td class="statusDes">失败用例数</td>
                </tr>
                <tr>
                  <td>
                    <div class="colorJump"></div>
                  </td>
                  <td class="statusDes">跳过用例数</td>
                </tr>
              </table>
            </div>
          </div>
          <hr class="hrDiv" />
          <el-row class="cancelRowStyle">
            <el-col :span="22" :offset="0"></el-col>
            <el-col :span="1" :offset="0">
              <el-button type="danger" size="small" @click="cancelPicDialog">取消</el-button>
            </el-col>
          </el-row>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
export default {
  name: "batchExecutionQuery",
  mixins: [VueMixins],
  data() {
    return {
      selectedTime: "", //选择的日
      startTime: "", //开始时间
      endTime: "", //结束时间
      timeSlot: "左侧日历表选择", //时间段
      dateDisabled: false, //日期是否可用
      params: {
        caseSourceChannel: "",
        currentPage: 1, //当前页码
        pageSize: 20, //每页数据量
        queryEndTime: "", //结束日期
        queryStartTime: "", //开始日期
        runStatus: "", //执行状态
        testPlanId: ""
      },
      caseSources: ["测试计划", "场景", "数据编写", "模块调试"], //用例来源
      selectedCaseSource: "",
      testPlans: [], //测试计划
      selectedNameMedium: "", //选中的测试计划名字
      selectedExecutionStatus: "", //选择的执行状态值
      executionStatuses: ["初始", "执行中", "执行完毕", "错误终止", "人工终止"],
      tableData: [], //表格数据
      total: 0,
      cakePicVisable: false, //饼状图可见
      cakeTitle: "饼状图详情",
      chartData: {},
      useColor: ["#22ee55", "#e72210", "#53becc"]
    };
  },
  created() {
    this.selectAllTestPlan();
    this.params.queryEndTime = Date.now();
    this.params.queryStartTime =
      this.params.queryEndTime - 1 * 24 * 60 * 60 * 1000;
    this.startTime = new Date(this.params.queryStartTime);
    this.endTime = new Date(this.params.queryEndTime);
    this.executeQuery();
  },
  mounted() {},
  methods: {
    //获取测试计划
    selectAllTestPlan() {
      Request({
        url: "testPlanController/selectAllTestPlan",
        method: "POST",
        params: {}
      })
        .then(res => {
          console.log("获取成功", res);
          this.testPlans = res.testPlanEntityList;
        })
        .catch(error => {
          console.log("获取失败", error);
        });
    },
    //时间戳选择时执行
    timeSlotSelect() {
      console.log("时间段", this.timeSlot);
      if (this.timeSlot != "左侧日历表选择") {
        this.dateDisabled = true;
        let today = Date.now();
        this.params.queryEndTime = today;
        if (this.timeSlot === "近一天") {
          this.params.queryStartTime =
            this.params.queryEndTime - 1 * 24 * 60 * 60 * 1000;
        } else if (this.timeSlot === "近一周") {
          this.params.queryStartTime =
            this.params.queryEndTime - 7 * 24 * 60 * 60 * 1000;
        } else {
          this.params.queryStartTime =
            this.params.queryEndTime - 30 * 24 * 60 * 60 * 1000;
        }
        console.log("今天", today);
        console.log(
          "开始时间：",
          this.params.queryStartTime,
          "结束时间",
          this.params.queryEndTime
        );
        let start = new Date(this.params.queryStartTime);
        let end = new Date(this.params.queryEndTime);
        console.log("开始时间：", start, "结束时间", end);
        this.startTime = start;
        this.endTime = end;
      } else {
        this.dateDisabled = false;
        this.params.queryStartTime = "";
        this.params.queryEndTime = "";
        this.startTime = "";
        this.endTime = "";
      }
    },
    executeQuery() {
      console.log("params", this.params);
      this.params.queryStartTime = new Date(this.startTime).getTime();
      this.params.queryEndTime = new Date(this.endTime).getTime();
      Request({
        url: "/batchRunCtrlController/pagedBatchQueryBatchRunCtrl",
        method: "POST",
        params: this.params
      })
        .then(res => {
          console.log("查询成功", res);
          this.tableData = res.batchRunCtrlList;
          this.total = res.totalCount;
          console.log("total", this.total);
        })
        .catch(error => {
          console.log("查询失败", error);
        });
    },
    handleSizeChange(val) {
      console.log(`每页${val}条`);
      this.params.pageSize = val;
      this.executeQuery();
    },
    handleCurrentChange(val) {
      console.log(`当前${val}页`);
      this.params.currentPage = val;
      this.executeQuery();
    },
    //运行状态选择
    handleRunStatusChange() {
      this.params.runStatus = this.executionStatuses.indexOf(
        this.selectedExecutionStatus
      );
      console.log("selectedExecutionStatus", this.params.runStatus);
    },
    //测试计划选择
    handleTestPlanChange() {},
    //查询记录单
    queryRecord(row) {
      this.$message.success(`查询:${row.testPlanName}`);
    },
    //归档
    archive(row) {
      this.$message.success(`归档:${row.testPlanName}`);
    },
    //查看饼状图
    openCakePic(row) {
      this.$message.success("查看饼状图");
      console.log(row);
      let cakeContent = document.getElementById("leftCake");
      // if(cakeContent!=null){
      //    cakeContent.innerHTML = '';
      //     console.log('绘制饼状图之前清空div')
      // }
      let width = 300;
      let height = 300;
      let successInsCount = parseInt(row.successInsCount);
      let failedInsCount = parseInt(row.failedInsCount);
      let notRunInsCount = parseInt(row.notRunInsCount);
      let totalCount = successInsCount + failedInsCount + notRunInsCount;
      this.cakePicVisable = true;
      this.chartData = {
        columns: ["name", "number"],
        rows: [
          { name: "成功用例", number: successInsCount },
          { name: "失败用例", number: failedInsCount },
          { name: "跳过用例", number: notRunInsCount }
        ]
      };
    },
    handleBeforeClose(done) {
      done();
      return true;
    },
    cancelPicDialog() {
      this.cakePicVisable = false;
    }
  }
};
</script>
<style scoped>
.timeCol,
.executionStatus,
.toStyle,
.timeRange {
  padding-top: 8px;
  color: gray;
  font-size: 16px;
}
.timeRange {
  margin-left: 30px;
}
.timePicker {
  margin-left: 10px;
}
.rowStyle,
.cancelRowStyle {
  margin-top: 10px;
}
.cancelRowStyle {
  margin-bottom: -15px;
  margin-left: 5px;
}
.tableStyle {
  margin-top: 15px;
}
.paginationStyle {
  margin-top: 10px;
  width: 100%;
  text-align: center;
}
.failedStyle {
  color: red;
}
.mainCakeDiv {
  overflow: hidden;
  width: 100%;
  height: fit-content;
}
.leftCakeDiv,
.rightCakeDiv {
  float: left;
  width: 49%;
  height: 330px;
}
.rightCakeDiv {
  margin-left: 13px;
}
.hrDiv {
  width: 100%;
  color: #f5f5f5;
  margin-top: 15px;
}
.colorSuccess,
.colorFail,
.colorJump {
  width: 90px;
  height: 50px;
  margin: auto;
}
.colorSuccess {
  background: #22ee55;
}
.colorFail {
  background: #e72210;
}
.colorJump {
  background: #53becc;
}
.statusDes {
  text-align: center;
  line-height: 80px;
  font-weight: 500;
  font-size: 15px;
}
table {
  margin: 33px auto;
  border-collapse: collapse;
}
td {
  width: 150px;
  border: 2px solid #add8e6;
}
</style>
<template>
  <div class="page-inner">
    <el-container>
      <el-main>
        <el-form
          class="formTop"
          label-width="94px">
          <el-row
            :gutter="20">
            <el-col 
              :span="5" 
              :offset="0">
              <el-form-item
                label="查询方式">
                <el-select 
                  v-model="selectedQueryMethod">
                  <el-option 
                    v-for="(item,index) in queryMethods" 
                    :key="index" 
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col 
              :span="5">
              <el-form-item
                :label="selectedQueryMethod === '按测试轮次'?'测试轮次':'测试计划'">
                <el-select 
                  v-if="selectedQueryMethod === '按测试轮次'" 
                  v-model="selectedTestRound">
                  <el-option 
                    v-for="(item,index) in testRounds" 
                    :key="index" 
                    :value="item.name">
                  </el-option>
                </el-select>
                <el-select 
                  v-else 
                  v-model="selectedTestPlan">
                  <el-option 
                    v-for="(item,index) in testPlans" 
                    :key="index" 
                    :label="item.nameMedium"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="5">
              <el-form-item
                label-width="90px"
                :label="selectedQueryMethod === '按测试轮次'?'记录单状态':'执行轮次'">
                <el-select 
                  v-if="selectedQueryMethod === '按测试轮次'" 
                  v-model="selectedStatus"
                  @clear="queryByTestRound"
                  clearable>
                  <el-option 
                    v-for="(item,index) in recordStatus" 
                    :key="index" 
                    :value="item.value"
                    :label="item.label">
                  </el-option>
                </el-select>
                <el-input 
                  v-else 
                  v-model="inTestRound" 
                  placeholder="请输入测试轮次">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col
              class="buttons"
              :span="9"
              :offset="0">
              <el-button 
                type="primary" 
                size="small"
                icon="el-icon-search"
                v-if="selectedQueryMethod === '按测试轮次'"
                @click="queryByTestRound"
                >查询
              </el-button>
              <el-button
                type="primary" 
                size="small"
                icon="el-icon-search"
                v-else
                @click="queryByBatch"
                >查询
              </el-button>
              <el-button 
                type="danger" 
                size="small" 
                icon="el-icon-delete"
                @click="throwAway"
                >丢弃
              </el-button>
            </el-col>
          </el-row>
          <el-row
            :gutter="20">
            <el-col 
              :span="5">
              <el-form-item
                label="执行状态(选)">
                <el-select 
                  v-model="selectedExecutionStatus"
                  @clear="queryByTestRound"
                  clearable>
                  <el-option 
                    v-for="(item,index) in executionStatus" 
                    :key="index" 
                    :value="item.value"
                    :label="item.label">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col 
              :span="5">
              <el-form-item
                label="场景列表(选)">
                <el-select 
                  v-model="selectedSceneList">
                  <el-option 
                    v-for="(item,index) in sceneList" :key="index" 
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col 
              :span="5">
              <el-form-item
                label="用例编号(选)">
                <el-input 
                  placeholder="填写用例编号" 
                  v-model="casecode"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-table 
          width="100%" 
          border
          scrope
          :highlight-current-row="true"
          :data="tableData">
          <el-table-column 
            min-width="4.95%" 
            align="center"  
            type="selection">
          </el-table-column>
          <el-table-column 
            min-width="12.95%" 
            align="center" 
            prop="sceneName" 
            label="场景名称">
          </el-table-column>
          <el-table-column 
            min-width="6.46%" 
            align="center" 
            prop="executeRound" 
            label="执行轮次">
          </el-table-column>
          <el-table-column 
            min-width="12.5%" 
            align="center" 
            prop="casecode" 
            label="用例编号" 
            sortable>
          </el-table-column>
          <el-table-column
            min-width="8.46%" 
            align="center" 
            prop="flownodeName" 
            label="节点名称">
          </el-table-column>
          <el-table-column 
            min-width="10.06%" 
            align="center" 
            prop="recorderStatus" 
            label="记录单状态">
          </el-table-column>
          <el-table-column 
            min-width="7.51%" 
            align="center" 
            label="执行结果状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.executeStatus == '成功'?'success':scope.row.executeStatus == '部分成功'?'primary':scope.row.executeStatus == '跳过执行'?'warning':scope.row.executeStatus == '失败'?'danger':'info'"
                v-text='scope.row.executeStatus'>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column 
            min-width="20.4%" 
            align="center" 
            prop="sourceChannel" 
            label="来源渠道">
          </el-table-column>
          <el-table-column 
            min-width="9.61%" 
            align="center" 
            label="执行报告">
            <template slot-scope="scope">
              <el-button 
                type="primary" 
                size="mini" 
                @click="viewReport(scope.row)"
                >点击查看
              </el-button>
            </template>
          </el-table-column>
          <el-table-column 
            min-width="7.1%" 
            align="center" 
            label="操作">
            <template slot-scope="scope">
              <el-button 
                type="primary" 
                size="mini" 
                @click="showDetail(scope.row)"
                >详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :page-sizes="[5,10,20,50]"
          :current-page="currentPage"
          :total="totalCount"
          layout="total,sizes,prev,pager,next,jumper">
        </el-pagination>
        <el-dialog
          title="提示"
          width="30%"
          :visible.sync="dialogVisible">
          <h2 class="dialogText">空记录！请尝试查询！</h2>
          <el-divider></el-divider>
          <div class="buttonBottom">
            <el-button
              type="primary"
              @click="dialogVisible = false"
              >确定
            </el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
export default {
  // 组件name属性
  name: "testrecord",
  mixins: [VueMixins],
  data() {
    return {
      queryMethods: ["按测试轮次", "按批量执行"], //查询方式
      selectedQueryMethod: "按测试轮次", //选中的查询方式
      testRounds: [], //测试轮次
      selectedTestRound: "", //选中的测试轮次
      testPlans: [], //测试计划
      selectedTestPlan: "", //选择的测试计划
      recordStatus: [
        {label:"全部",value:""}, 
        {label:"激活",value:"2"}, 
        {label:"未激活",value:"1"}, 
        {label:"已删除",value:"3"}
        ], //记录单状态
      selectedStatus: "", //已选择的记录单状态
      inTestRound: "", //输入的测试轮次
      executionStatus: [
        {label:"初始未执行",value:'10'},
        {label:"已分配等待执行",value:'12'},
        {label:"正在执行",value:'13'},
        {label:"成功",value:'2'},
        {label:"失败",value:'3'},
        {label:"跳过执行",value:'9'},
        {label:"部分成功",value:'4'}
      ], //(选)执行状态
      selectedExecutionStatus: "", //选择
      sceneList: [], //场景列表
      selectedSceneList: "", //选择的场景
      tableData: [], //表格数据
      casecode: "", //用例编号
      pageSize: 20, //页面数
      currentPage: 1, //当前页面
      totalCount: 0, //总数
      dialogVisible: true, //对话框是否可视
      formByBatch: {},//批量执行查询的表单 
    };
  },
  created() {
    this.selectAllTestround();
    this.selectAllScene();
    this.selectAllTestPlan();
    this.pagedBatchQueryScene();
    this.checkTableData();
  },
  methods: {
    checkTableData() {
      this.dialogVisible = (this.tableData.length === 0)
    },
    //测试轮次查询更新数据
    queryByTestRound() {
      Request({
        url: "/testRecordController/pagedBatchQueryTestRecordByTestRound",
        method: "POST",
        params: {
          casecode: this.casecode,
          currentPage: this.currentPage,
          executeStatus: this.selectedExecutionStatus,
          orderColumns: "casecode",
          orderType: "asc",
          pageSize: this.pageSize,
          recorderStatus: this.selectedStatus,
          sceneId: "",
          testRound: this.selectedTestRound
        }
      }).then(res => {
          console.log("查询成功", res);
          if(res.totalCount == 0) {
            this.tableData = []
            this.totalCount = res.totalCount
            this.$message.success(res.respMsg);
          }else {
            this.tableData = res.list
            this.totalCount = res.totalCount
          }
        })
        .catch(error => {
          console.log("查询失败", error);
          this.$message.warning('无此类数据')
          this.tableData = []
          this.totalCount = 0
        });
    },
    // 按批量执行查询
    queryByBatch() {
      this.formByBatch = {
        casecode: 0,
        currentPage: this.currentPage,
        executeRound: this.inTestRound,
        executeStatus: this.selectedExecutionStatus,
        orderColumns: "casecode",
        orderType: "asc",
        pageSize: this.pageSize,
        sceneId: 0,
        testPlanId: this.selectedTestPlan,
      }//批量执行查询的表单
      console.log('参数',this.formByBatch)
      Request({
        url: '/testRecordController/pagedBatchQueryTestRecordByTestPlan',
        method: 'POST',
        params: this.formByBatch
      }).then(res => {
        console.log('数据获取成功',res)
      }).catch(error => {
        this.$message.error('数据获取失败')
      })
    },
    //丢弃
    throwAway() {
      this.$message.warning("丢弃");
    },
    // 查看报告
    viewReport(row) {
      this.$message.success("查看报告");
      // console.log("行信息", row);
    },
    // 执行操作
    showDetail(row) {
      this.$message.success("操作详情");
      // console.log("操作行信息", row);
    },
    // 切换页数
    handleSizeChange(val) {
      console.log(`当前${val}条`);
      this.pageSize = val;
      this.queryByTestRound();
    },
    // 切换当前页码数
    handleCurrentChange(val) {
      // console.log(`当前${val}页`);
      this.currentPage = val;
      this.queryByTestRound();
    },
    //查询所有的轮次
    selectAllTestround() {
      Request({
        url: "/testroundController/selectAllTestround",
        method: "GET"
      })
        .then(res => {
          // console.log("获取测试轮次成功", res);
          this.testRounds = res.testroundEntityList;
          this.selectedTestRound = res.testroundEntityList[0].name;
        })
        .catch(error => {
          // console.log("获取测试轮次失败", error);
        });
    },
    //查询所有的场景
    selectAllScene() {
      Request({
        url: "/sceneController/selectAllScene",
        method: "GET"
      })
        .then(res => {
          // console.log("场景列表获取成功", res);
        })
        .catch(error => {
          // console.log("场景列表获取失败", error);
        });
    },
    //查询所有的测试计划
    selectAllTestPlan() {
      Request({
        url: "/testPlanController/selectAllTestPlan",
        method: "POST",
        params: {}
      })
        .then(res => {
          console.log("测试计划列表获取成功", res);
          this.testPlans = res.testPlanEntityList;
        })
        .catch(error => {
          // console.log("测试计划列表获取失败", error);
        });
    },
    pagedBatchQueryScene() {
      Request({
        url: "/sceneController/pagedBatchQueryScene",
        method: "POST",
        params: {
          caseLibId: "1241",
          currentPage: this.currentPage,
          orderColumns: "modified_time",
          orderType: "DESC",
          pageSize: this.pageSize
        }
      })
        .then(res => {
          // console.log("pagedBatchQueryScene查询成功", res);
        })
        .catch(error => {
          // console.log("pagedBatchQueryScene查询失败", error);
        });
    },
  }
};
</script>
<style scoped>
  .formTop {
    text-align: left;
  }
  .el-col {
    height: 40px !important;
  }
  .buttons {
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .failedStatus {
    color: red;
  }
  .pagination {
    text-align: center;
    margin-top: 20px;
  }
  .dialogText {
    margin-bottom: 30px;
    padding-left: 20px;
  }
  .buttonBottom {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    margin-bottom: -15px;
  }
</style>
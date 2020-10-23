<template>
  <div class="contain">
    <div class="header-content">
      <steps :active="3"></steps>
    </div>
    <el-card class="usercaseCard">
      <el-row>
        <h3 class="title">用例列表</h3>
      </el-row>
      <el-table
        :data="testcaseList"
        @selection-change="handleSelectionChange"
        class="table"
        stripe
        border
        highlight-current-row >
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          prop="testpoint"
          label="用例">
        </el-table-column>
        <el-table-column
          prop="note"
          label="描述">
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="executeInfoCard">
      <el-row>
        <h3 class="title">执行信息</h3>
      </el-row>
      <el-row class="selectRunner">
        <el-form
          label-width="90px"
          :inline="true">
          <el-form-item label="执行机选择">
            <el-select
              v-model="runnerselected"
              :disabled="isRunning"
              placeholder="选择执行机"
              multiple>
              <el-option
                v-for="(item,index) in runners"
                :key="index"
                :label="item.identifiableName"
                :value="item.runnerName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button
            class="executeRunner"
            type="primary"
            icon="el-icon-video-play"
            plain
            :disabled="isRunning"
            @click="executeAll"
            >用例执行
          </el-button>
        </el-form>
      </el-row>
    </el-card>
    <el-row type="flex" justify="center" class="fixButton">
      <el-button
        type="primary"
        @click="next"
        >执行完毕查看结果
      </el-button>
			<el-button
				@click="back"
			>返回上一步
			</el-button>
    </el-row>
  </div>
</template>

<script>
import steps from "@/components/steps";
import Request from '../../libs/request'
import $ from 'jquery'
import jQuery from 'jquery'
import Vac from '../../libs/vac-functions.es'
export default {
  name: "QuicklyRun",
  data() {
    return {
      runnerselected: [], // 选择的执行机
      runners: [], //执行机列表
      transId: '',
      runId: '',
      testcaseList: [], //查询到的用例列表
      userId: '',
      testPlanId: '', // 测试计划id
      sceneId: '',
      // isFinished: false,
      isRunning: false,
      selectedExeInstances: [], //选择的执行
       //出错查询的时间
      interruptTime : 5,
      //是否通过界面点击进行执行了,0:用户不动 1：点击执行 2：点击取消
      interruptExe : 0,
      //出错时的断点保存循环查询的data
      interruptData: {},
    };
  },
  created() {
    let query = this.$route.query;
    this.userId = sessionStorage.getItem('userId') || '3'
    this.transId = query.transactId
    this.testPlanId = query.testPlanId
    this.sceneId = query.sceneId
    console.log('query', query)
    this.queryRunner()
    this.queryQuickStartTestCaseByTransId(this.transId)
  },
  methods: {
    // 界面跳转
    next() {
      this.$router.push({
        name: "QuicklyResult",
        query: {
          data: this.$route.query,
          runId: this.runId
        },
      });
    },
		back() {
			this.$router.push({ name: "QuicklyTemplate", query: this.$route.query });
		},
    // 查询用例
    queryQuickStartTestCaseByTransId(transId) {
      Request({
        url: '/testcase/queryQuickStartTestCaseByTransId',
        method: 'POST',
        params: {
          transId
        }
      }).then(res => {
        if(!res.respCode === '0000') {
          return console.log('获取失败')
        }
        console.log(res)
        this.testcaseList = res.testcaseList
      }).catch(error => {
        return console.log(error)
      })
    },
    // 处理选择
    handleSelectionChange(val) {
      let _this = this
      _this.selectedExeInstances = []
      console.log('handleSelectionChange', val)
      val.forEach(item => {
        let obj = {}
        obj.sceneId = _this.$route.query.sceneId
        obj.caseId = item.id
        this.selectedExeInstances.push(obj)
      })
      console.log(this.selectedExeInstances)
    },
    // 查询执行机
    queryRunner() {
      let _this = this
      Request({
        url: '/executeController/queryRunners',
        method: 'POST',
        params: {
          serviceName: "web.ui",
          userId: sessionStorage.getItem('userId')
        }
      }).then(res => {
        if(res.respCode !== "0000") {
          return console.log('获取执行机失败')
        }
        _this.runners = res.runners
        console.log('runners', _this.runners)
      }).catch(error => {
        console.log(error)
      })
    },
    // 用例执行
    executeAll() {
      let _this = this
      console.log(_this.runnerselected)
      if(_this.runnerselected.length === 0) {
        return this.$message.warning('请选择执行机')
      }
      _this.isRunning = true
      // _this.isFinished = false
      Vac.ajax({
          url: '/executeController/t1',
          type: 'post',
          contentType: 'application/json',
          data: JSON.stringify({
            userId: _this.userId,
            // recordflag: "2",
            exeScope: "0",
            selectState: "",
            selectedExeInstances: _this.selectedExeInstances,
            testPlanId: _this.testPlanId,
            identifiableRunnerName: "appointed",
            appointedRunners : _this.runnerselected
          }),
          success: function(data) {
            if (data.respCode === '0000') {
              Vac.ajax({//因为查询执行信息需要最近执行的批量号因此需要查询批次
                url:  '/batchRunCtrlController/queryLatestBatchIdForTestPlan',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                  "testPlanId": _this.testPlanId,
                }),
                success: function(data) {
                  _this.batchId = data.batchId;
                  _this.startQueryResult();
                  /**
                   * 执行完成
                   */
                  // this.isFinished = true
                  this.isRunning = true
                },
                error: function(){
                  Vac.alert('网络错误，执行失败！');
                }
              })
          } else {
            Vac.alert(data.respMsg);
          }},
          error: function(){
            Vac.alert('网络错误，执行失败！');
          }
       })
    },
    startQueryResult: function() {
      var _this = this;
      Vac.ajax({
        url: '/batchRunCtrlController/syncQueryIncInsStatus',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
          batchId: _this.batchId,
          reqSyncNo: null,
          sessionId:null,
        }),
        success: function(data) {
          console.log('startQueryResult', data)
          if(data.respCode == "0000"){
            if(data.respSyncNo == -1){
              _this.runId = data.batchId
              _this.$message.success(data.respMsg)
              // _this.isFinished = true
              _this.isRunning = false
            }
            else{
              _this.syncQueryIncInsStatus(data)
            }
          }
          else{
            Vac.alert(data.respMsg);
          }
        },
        error: function() {
          Vac.alert('网络错误！请点击重新查询！');
        }
      });
    },
    syncQueryIncInsStatus (values){
      var _this = this;
      Vac.ajax({
        url: '/batchRunCtrlController/syncQueryIncInsStatus',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
          "batchId": values.batchId,
          "reqSyncNo": values.respSyncNo,
          "sessionId":values.sessionId,
        }),
        success: function(data) {
          if(data.respSyncNo==-1){
          }
          else if(data.respSyncNo==-2){
            _this.syncQueryIncInsStatus(values)
          }
          else{
            //若出错  则弹框询问
            if(data.insStatuses[0].manualChooseErrExecuting == true && data.insStatuses[0].status==3){
              _this.interruptData = data;
              _this.runInterrupt();
            }
            else{
              _this.syncQueryIncInsStatus(data)
            }
          }
        },
        error: function() {
          Vac.alert('网络错误！请点击重新查询！');
        }
      });
    },
    runInterrupt(){
      var _this = this;
      var name = setInterval(
        function(){
          if(_this.interruptExe == 2){
            clearInterval(name);
            _this.interruptTime = 5;
            _this.interruptExe = 0;
            _this.instanceErrorChoice(2);
            return false;
          }
          //如果秒数大于0
          if(_this.interruptTime < 1 || _this.interruptExe == 1){
            //清除定时任务
            _this.interruptExe=0;
            clearInterval(name);
            _this.interruptTime = 5;
            _this.instanceErrorChoice(1);
            //跳转
            return true
          }else{
              //将秒数写入到页面并将秒数减一
              _this.interruptTime-- ;
          }
        },
        //每秒执行一次
        1000
      );
    },
    instanceErrorChoice(status){
      var _this = this;
      let errorContinuing = status == 2 ? false : true;
      Vac.ajax({
        url:  '/batchRunCtrlController/instanceErrorChoice',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
          batchId: _this.interruptData.batchId,
          sceneId: _this.interruptData.insStatuses[0].sceneId,
          caseId: _this.interruptData.insStatuses[0].testcaseId,
          errorContinuing: errorContinuing,
        }),
        success: function(data) {
          if(data.respCode=="0000"){
            if(errorContinuing){
              _this.syncQueryIncInsStatus(_this.interruptData)
            }
          }
          else{
            Vac.alert(data.respMsg);
          }
        },
        error: function() {
          Vac.alert('网络错误！请点击重新查询！');
        }
      });
    },
    // 添加用例
    insertTestcaseToScene(id) {
      let _this = this
      Request({
        url: '/sceneController/insertTestcaseToScene',
        method: 'POST',
        params: {
          id: _this.sceneId,
          creatorId: _this.userId,
          caseIds: [id]
        }
      }).then(res => {
        if(res.respCode !== '0000') {
          return console.log('出现错误')
        }
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    },
    // 删除用例
    deleteTestcaseFromScene(id) {
      let _this = this
      Request({
        url: '/sceneController/deleteTestcaseFromScene',
        method: 'POST',
        params: {
          id: _this.sceneId,
          caseIds: [id]
        }
      }).then(res => {
        if(res.respCode !== '0000') {
          return console.log('出现错误')
        }
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  components: {
    steps,
  },
};
</script>

<style lang="less" scoped>
  .usercaseCard,
  .executeInfoCard {
    .title {
      font-size: 17px;
      color: #868886;
      border-bottom: 1px solid #d3d3d3;
      padding-bottom: 5px;
    }
  }
  .executeInfoCard {
    .selectRunner {
      margin-top: 20px;
      margin-bottom: -10px;
      padding-left: 20px;
      .executeRunner {
        margin-left: 20px;
      }
    }
  }
	.fixButton{
		position:fixed;
		bottom:0;
		width:100%
	}
</style>

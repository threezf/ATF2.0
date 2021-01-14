<!--用例执行结果查询-->
<template>
  <div class="page-inner">
    <el-row class="topRow">
      <el-form label-width="120px">
        <el-form-item label="测试项目">
          <el-input size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="用例编号">
          <el-input size="small" v-model="testcaseViewRespDTO.casecode" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-tabs class="tabsStyle" type="border-card">
      <el-tab-pane label="执行结果" class="recordPane">
        <el-table 
          :data="recordTableData"
          stripe 
          border 
          highlight-current-row>
          <el-table-column
             prop="sceneId"
            label="场景ID" 
            min-width="12%">
          </el-table-column>
          <el-table-column 
            prop="testPlan"
            label="测试计划" 
            min-width="13%">
          </el-table-column>
          <el-table-column 
            prop="usecaseId"
            label="用例编号" 
            min-width="13%">
          </el-table-column>
          <el-table-column 
            prop="nodeName"
            label="节点名称" 
            min-width="10%">
          </el-table-column>
          <el-table-column 
            prop="recorderStatus"
            label="记录单状态" 
            min-width="8%">
          </el-table-column>
          <el-table-column 
            prop="executeStatus"
            label="执行结果状态" 
            min-width="7%">
          </el-table-column>
          <el-table-column 
            prop="sourceChannel"
            label="来源渠道" 
            min-width="12%">
          </el-table-column>
          <el-table-column 
            prop="resourcePath"
            label="资源路径" 
            min-width="22%">
          </el-table-column>
        </el-table>
        <iframe :class="resourcePath !== ''? 'mainResource' :'noResorce'" :src="resourcePath"></iframe>
      </el-tab-pane>
      <el-tab-pane label="元素库">
        <element-lib
          :testCaseId="Number(testcaseId)"
          :objects="objects"
        ></element-lib>
      </el-tab-pane>
      <el-tab-pane label="对象库">
        <object-lib
          :testCaseId="Number(testcaseId)"
        ></object-lib>
      </el-tab-pane>
      <el-tab-pane class="scriptPane" label="查看脚本">
        <div class="scriptDiv">
          <el-table
            :data="scriptList"
            class="table"
            border
            stripe
            highlight-currnt-row>
            <el-table-column
              align="center"
              label="#"
              type="index"
              width="100px">
            </el-table-column>
            <el-table-column
              align="center"
              label="操作项"
              min-width="40%">
              <template slot-scope="scope">
                <span v-if="scope.row.ui === ''"><b>{{scope.row.classType}}</b></span>
                <span v-else>
                  <b>UI：</b>{{scope.row.ui}}&nbsp;
                  <b>元素：</b>{{scope.row.element}}
                </span> 
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="方法"
              prop="method"
              width="100px">
            </el-table-column>
            <el-table-column
              align="center"
              label="参数"
              min-width="40%">
              <template slot-scope="scope">
                <span v-for="(item, index) in scope.row.parameters" :key="index">
                  参数{{index + 1}}：<b>{{item}}</b>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane class="userDataPane" label="用例数据">
        <el-row hidden>
          <el-col :span="10">
            <el-checkbox
              class="checkboxAll"
              v-model="checkAll"
              :indeterminate="indeterminate"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <el-checkbox-group
              class="checkboxGroup"
              v-model="checkedData"
              @change="handleCheckedDataChange"
            >
              <el-checkbox
                v-for="(item,index) in datas"
                :key="index"
                :label="item"
                :value="item"
              >{{item}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col :span="14">
            <el-button type="primary" size="mini" icon="el-icon-search">搜索</el-button>
            <el-button type="primary" size="mini" icon="el-icon-refresh">刷新</el-button>
            <el-button type="primary" size="mini" icon="el-icon-folder">保存</el-button>
          </el-col>
        </el-row>
        <el-table :data="dataPoolList" class="useDataStyle" border stripe highlight-current-row>
          <el-table-column
            prop="dataName"
            label="数据名称" 
            min-width="15.4%">
          </el-table-column>
          <el-table-column 
            prop="dataValue"
            label="数据值" 
            min-width="12.7%">
          </el-table-column>
          <el-table-column 
            prop="poolName"
            label="数据池名" 
            min-width="15.5%">
          </el-table-column>
          <el-table-column 
            label="流程节点名称" 
            min-width="20.9%">
            无
          </el-table-column>
          <el-table-column 
            label="对象名称" 
            min-width="15.5%">
            无
          </el-table-column>
          <el-table-column 
            label="描述" 
            min-width="10%">
            无
          </el-table-column>
          <el-table-column 
            label="操作" 
            min-width="10%">
            无
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane class="detailTabPane" label="用例详情">
        <div class="detailDiv">流程用例</div>
        <el-form class="detailFormStyle" label-width="100px">
          <el-row>
            <el-form-item label="用例编号">
              <el-input size="small" v-model="testcaseViewRespDTO.casecode" disabled></el-input>
            </el-form-item>
          </el-row>
          <div class="threeDiv">
            <el-form-item
              v-for="(item,index) in threeLabelInput"
              :key="item.id"
              :label="item.value"
            >
              <el-input size="small" v-model="threeInputParams[index]" disabled></el-input>
            </el-form-item>

            <el-form-item
              v-for="(item,index) in threeLabelSelect"
              :key="item.id"
              :label="item.value"
            >
              <el-select size="small" v-model="selectParams[index]" disabled>
                <el-option
                  v-for="(item) in selectParamsList[index]"
                  :key="item.type"
                  :label="item.type"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="twoDiv">
            <el-form-item
              v-for="(item,index) in twoLabel"
              :key="item.id"
              :label="item"
              :value="index"
            >
              <el-input type="textarea" v-model="twoInputParams[index]" disabled></el-input>
            </el-form-item>
          </div>
          <el-form-item class="remarkFormItem" label="备注">
            <el-input type="textarea" v-model="testcaseViewRespDTO.note" disabled></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <div class="copyright">
        Copyright © 1998－2019 BUPT All Rights Reserved
        教育部信息网络工程研究中心 版权所有
      </div>
    </el-tabs>
  </div>
</template>

<script>
import Request from "../../../libs/request";
import VueMixins from "@/libs/vueMixins.js";
import ElementLib from "../../../components/caseOpeartion/ElementLib/ElementLib";
import ObjectLib from "../../../components/caseOpeartion/ObjectLib/ObjectLib";
export default {
  mixin: [VueMixins],
  name: "caseOperation",
  data() {
    return {
      //查询所需要的数据
      batchId: "", // 测试轮次编号
      testPlanId: "", // 测试计划编号
      testcaseId: "", // 测试用例编号
      sceneId: 1,
      caseCompositeType: "1", //
      transId: '',
      autId: '',
      caseId: "1", // 用例编号
      repositoryId: "12",
			// 执行结果
      recordEntity: [],
      recordTableData: [], // 查询结果表格
      flowNodeId: '',
      resourcePath: '', //结果路径
      // 元素库
      transactId: "135",
      uis: [], // 元素库数据列表
      // 对象库
      objects: [], //对象库列表数据
			// 查看脚本
			bodyContent: [],
			scriptList: [],
      //用例数据
      indeterminate: true,
      checkAll: true,
      checkedData: [], //选择的数据类型
      dataPoolList: [], // 查询的数据池列表数据
      datas: ["输入数据", "流程数据", "场景数据", "全局数据"],
      // 用例详情
      testcaseViewRespDTO: {
        casecode: "", // 用例编号
        testPoint: "", // 测试点
        missionName: "", // 测试任务
        version: "", // 版本号
        autName: "", // 被测系统
        transName: "", // 功能点
        scriptTemplateName: "", // 基础脚本
        authorName: "", // 作者
        reviewerName: "", // 评审者
        executorName: "", // 执行者
        caseProperty: "", // 用例性质
        caseType: "", // 用例类型
        caseCompositeType: "", // 测试用例类型
        priority: "", // 优先级
        useStatus: "", // 用例使用状态
        executeMethod: "", //执行方式
        scriptMode: "", //脚本管理方式
        testDesign: "", // 测试意图
        preRequisites: "", // 前置条件
        testStep: "", // 测试步骤
        dataRequest: "", // 数据需求
        expectResult: "", // 预计结果
        checkPoint: "", //附加检查点
        note: "" // 备注
      }, // 获取的用例数据
      threeLabelInput: [
        { id: 1, value: "测试点" },
        { id: 2, value: "测试任务" },
        { id: 3, value: "版本号" },
        { id: 4, value: "被测系统" },
        { id: 5, value: "功能点" },
        { id: 6, value: "基础脚本" },
        { id: 7, value: "作者" },
        { id: 8, value: "评审者" },
        { id: 9, value: "执行者" }
      ],
      threeLabelSelect: [
        { id: 10, value: "用例性质" },
        { id: 11, value: "测试用例类型" },
        { id: 12, value: "优先级" },
        { id: 13, value: "用例使用状态" },
        { id: 14, value: "执行方式" },
        { id: 15, value: "脚本管理方式" }
      ],
      twoLabel: [
        "测试意图",
        "前置条件",
        "测试步骤",
        "数据需求",
        "预计结果",
        "附加检查点"
      ],
      // 用例性质
      usecaseType: [
        { id: 1, type: "正常值" },
        { id: 2, type: "错误值" },
        { id: 3, type: "边界值" },
        { id: 4, type: "要素级" },
        { id: 5, type: "流程级" }
      ],
      //测试用例类型
      testUsecaseType: [
        { id: 1, type: "联机" },
        { id: 1, type: "批量" },
        { id: 1, type: "接口" }
      ],
      //优先级
      properties: [
        { id: 1, type: "1级" },
        { id: 2, type: "2级" },
        { id: 3, type: "3级" },
        { id: 4, type: "4级" },
        { id: 5, type: "5级" },
        { id: 6, type: "6级" },
        { id: 7, type: "7级" },
        { id: 8, type: "8级" },
        { id: 9, type: "9级" }
      ],
      //用例使用状态
      useType: [
        { id: 1, type: "新增" },
        { id: 2, type: "评审通过" }
      ],
      //执行方式
      executeMethod: [
        { id: 1, type: "自动化" },
        { id: 2, type: "手工" },
        { id: 3, type: "配合" }
      ],
      //脚本管理方式
      scriptMangeType: [{ id: 1, type: "脚本" }]
    };
  },
  created() {
    let isShow = this.$route.query.flag 
    if(isShow) {
      this.$parent.isShow = false
    }
    console.log('父组件', this.$parent.isShow)
    // 获取跳转传递的数据
    this.batchId = this.$route.query.batchId
    this.testPlanId = this.$route.query.testPlanId
    this.testcaseId = this.$route.query.testcaseId
    this.sceneId = this.$route.query.sceneId
    this.flowNodeId = this.$route.query.flowNodeId
    console.log(this.batchId, this.testPlanId, this.testcaseId, this.sceneId)
    this.getFlowDataByTestPlanId()
    this.queryInputData();
    this.getSingleTestCaseInfo();
    this.querySingleRecordByCaseId();
    this.getTestcaseScript()
  },
  computed: {
    threeInputParams() {
      return [
        this.testcaseViewRespDTO.testPoint,
        this.testcaseViewRespDTO.missionName,
        this.testcaseViewRespDTO.version,
        this.testcaseViewRespDTO.autName,
        this.testcaseViewRespDTO.transName,
        this.testcaseViewRespDTO.scriptTemplateName,
        this.testcaseViewRespDTO.authorName,
        this.testcaseViewRespDTO.reviewerName,
        this.testcaseViewRespDTO.executorName
      ];
    },
    twoInputParams() {
      return [
        this.testcaseViewRespDTO.testDesign, // 测试意图
        this.testcaseViewRespDTO.preRequisites, // 前置条件
        this.testcaseViewRespDTO.testStep, // 测试步骤
        this.testcaseViewRespDTO.dataRequest, // 数据需求
        this.testcaseViewRespDTO.expectResult, // 预计结果
        this.testcaseViewRespDTO.checkPoint //附加检查点
      ];
    },
    selectParams() {
      return [
        this.testcaseViewRespDTO.caseType, // 用例性质
        this.testcaseViewRespDTO.caseCompositeType, // 测试用例类型
        this.testcaseViewRespDTO.priority, // 优先级
        this.testcaseViewRespDTO.useStatus, // 用例使用状态
        this.testcaseViewRespDTO.executeMethod, // 执行方式
        this.testcaseViewRespDTO.scriptMode // 脚本管理方式
      ];
    },
    selectParamsList() {
      return [
        this.usecaseType, // 用例性质
        this.testUsecaseType, // 测试用例类型
        this.properties, // 优先级
        this.useType, // 用例使用状态
        this.executeMethod, // 执行方式
        this.scriptMangeType // 脚本管理方式
      ];
    }
  },
  methods: {
    // 全选操作，默认方法存在参数
    handleCheckAllChange(val) {
      console.log("handleCheck", val);
      this.checkedData = val ? this.datas : [];
      this.indeterminate = false;
    },
    // 选择的数据类型
    handleCheckedDataChange(value) {
      console.log("handleCheck", value);
      this.checkAll = this.datas.length === value.length;
      this.indeterminate = value.length > 0 && value.length < this.datas.length;
    },
    // 通过测试计划Id获取流程节点数据
    getFlowDataByTestPlanId() {
			Request({
			  url: "/flowDataController/getFlowDataByTestPlanId",
			  method: "POST",
			  params: {
			    batchId: this.batchId,
			    testPlanId: this.testPlanId,
			    testcaseId: this.testcaseId
			  }
			}).then(res => {
			  if (res.respCode === "0000") {
          // this.$message.success(res.respMsg)
			  } else {
			    console.log("查询失败");
        }
			})
			.catch(err => {
			  console.log("获取失败");
			});
		},
    // 查询输入数据
    queryInputData() {
      Request({
        url: "/testRecordController/queryInputData",
        method: "POST",
        params: {
          batchId: this.batchId,
          caseCompositeType: this.caseCompositeType,
          caseId: this.testcaseId,
          testPlanId: this.testPlanId
        }
      })
        .then(res => {
          if (res.respCode === "0000") {
						this.bodyContent = res.bodyContent
						this.scriptList = res.scriptList
          } else {
            // this.$message.warning(res.respMsg);
          }
        })
        .catch(err => {
          this.$message.error("用例组成类型只能为1(单用例)或3(流程节点)");
        });
      },
    
    // 获取单个用例详情数据
    getSingleTestCaseInfo() {
      Request({
        url: "/testcase/getSingleTestCaseInfo",
        method: "POST",
        params: {
          id: this.testcaseId
        }
      })
        .then(res => {
          if (res.respCode === "0000") {
            this.testcaseViewRespDTO = res.testcaseViewRespDTO;
            this.transId = res.testcaseViewRespDTO.transId
            this.autId = res.testcaseViewRespDTO.autId
            this.queryAutVisibleOmClasses(this.autId)
            this.queryAllObjectForATransact(this.transId)
            this.batchQueryDataPool(this.autId)
            console.log('传递的数据', this.transId, this.autId)
          } else {
            this.$message.warning(res.respMsg);
          }
        })
        .catch(err => {
          this.$message.error("连接失败");
        });
    },
    //
    querySingleRecordByCaseId() {
      Request({
        url: "/testRecordController/querySingleRecordByCaseId",
        method: "POST",
        params: {
          batchId: this.batchId,
          caseId: this.testcaseId,
          sceneId: this.sceneId,
          flowNodeId: this.flowNodeId
        }
      })
        .then(res => {
          if (res.respCode === "0000") {
            this.recordEntity = res.recordEntity
            let data = {}
            data.sceneId = res.recordEntity.sceneName
            data.testPlan = res.recordEntity.testPlanName
            data.usecaseId = res.recordEntity.casecode
            data.nodeName = res.recordEntity.flownodeName
            data.recorderStatus = res.recordEntity.recorderStatus == 1? '未激活': '已激活'
            data.executeStatus = res.recordEntity.executeStatus == 1? '失败': '成功'
            data.sourceChannel = res.recordEntity.sourceChannel
            data.resourcePath = res.recordEntity.resourcePath === null? '无执行报告': res.recordEntity.resourcePath
            this.resourcePath = res.recordEntity.resourcePath === null? "": "http://140.143.16.21:9090/" + res.recordEntity.resourcePath
            // this.resourcePath = res.recordEntity.resourcePath === null? "": "http://10.101.167.184:8080/" + res.recordEntity.resourcePath
            this.recordTableData.push(data)
          } else {
            this.$message.warning(res.respMsg);
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    //获取测试脚本
    getTestcaseScript() {
      Request({
        url: "/dataCenter/getTestcaseScript",
        method: "POST",
        params: {
          caseCompositeType: 1,
          testcaseId: this.testcaseId
        }
      })
        .then(res => {
          if (res.respCode === "0000") {
          } else {
            this.$message.warning(res.respMsg);
          }
        })
        .catch(err => {
          this.$message.error(err.respMsg);
        });
    },
    queryAutVisibleOmClasses(id) {
      Request({
        url: "/aut/queryAutVisibleOmClasses",
        method: "POST",
        params: {
          autId:id,
          companyId: JSON.parse(localStorage.getItem('loginInfo')).companyId
        }
      })
        .then(res => {
          if (res.respCode === "0000") {
          } else {
            this.$message.warning(res.respMsg);
          }
        })
        .catch(err => {
          this.$message.error(err.respMsg);
        });
    },
    // 被测系统池数据
    batchQueryDataPool(id) {
      Request({
        url: "/dataPool/batchQueryDataPool",
        method: "POST",
        params: {
          poolName: "被测系统数据池",
          poolObjId: id
        }
      })
        .then(res => {
          if (res.respCode === "0000") {
						this.dataPoolList = res.dataPoolList
          } else {
            this.$message.warning(res.respMsg);
          }
        })
        .catch(err => {
          this.$message.error(err.respMsg);
        });
    },
    // 对象库数据
    queryAllObjectForATransact(id) {
      Request({
        url: "/objectRepository/queryAllObjectForATransact",
        method: "POST",
        params: {
          transactId: id
        }
      }).then(res => {
        if (res.respCode === "0000") {
          this.objects = res.objects;
          this.repositoryId = res.repositoryId;
          console.log('对象数据')
        } else {
          this.$message.warning(res.respMsg);
        }
      })
      .catch(err => {
        this.$message.error(err.message);
      });
    }
  },
  components: {
    ElementLib,
    ObjectLib
  }
};
</script>

<style lang="less" scoped>
.topRow {
  overflow: hidden;
  .el-form-item {
    float: left;
    margin-left: 20px;
    .el-input {
      width: 230px;
    }
  }
}
.tabsStyle {
  
  .recordPane {
    width: 100%;
    background: #f7f6f4;
    .mainResource {
      width: 60%;
      border: none;
      position: relative;
      top: -10px;
      left: 50%;
      margin-bottom: -10px;
      transform: translateX(-50%);
      min-height: 870px;
    }
    .noResorce {
      display: none;
    }
  }
  .scriptPane {
    text-align: center;
    .scriptDiv {
      font-size: 14px;
      margin-bottom: 20px;
      color: rgb(121, 121, 121);
    }
  }
  .userDataPane {
    overflow: hidden;
    .checkboxAll {
      float: left;
    }
    .checkboxGroup {
      float: left;
      margin-left: 30px;
    }
    .useDataStyle {
      width: 98%;
      margin: 3px auto;
    }
  }
  .detailTabPane {
    .detailDiv {
      font-size: 24px;
      color: #8c7979;
    }
    .detailFormStyle {
      margin: 10px 0 10px 10px;
      .el-form-item {
        width: 400px;
      }
      .threeDiv {
        .el-form-item {
          float: left;
          margin-right: 20px;
          width: 400px;
        }
      }
      .twoDiv {
        .el-form-item {
          float: left;
          width: 600px;
          margin-right: 40px;
        }
      }
      .remarkFormItem {
        width: 1240px;
      }
    }
  }
  .copyright {
    margin: 20px auto;
    width: 300px;
    line-height: 20px;
    font-size: 13px;
    color: #7979a2;
    text-align: center;
  }
}
</style>

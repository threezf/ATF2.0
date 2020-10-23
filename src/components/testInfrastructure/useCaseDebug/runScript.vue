<!--
  scriptId：脚本id
  caseId：测试用例id
  autId；被测系统id

-->
<template>
<div>
    <hr>
    <el-card>
        <p class="runTitle">脚本执行</p>
        <el-row class="menuRow" :gutter="20">
            <el-form label-width="100px">
                <el-col :lg="7" :md="10" :sm="12" :xs="12">
                    <!-- <el-form-item
              label="当前测试计划">
              <el-tag type="primary">{{testPlanEntity.nameMedium}}</el-tag>
            </el-form-item> -->
                    <el-form-item label="执行机选择">
                        <el-select class="runnerSelect" placeholder="请选择执行机" v-model="runnersSelected">
                            <el-option v-for="(item, index) in runners" :key="'runner'+index" :label="item.runnerName" :value="item.identifiableName">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="7" :md="10" :sm="12" :xs="12">
                    <el-form-item label="" label-width="20px">
                        <p class="executeStatus" v-html="exeStautShow"></p>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
        <el-row class="buttonRow">
            <el-button size="small" type="primary" @click="startExecution">
                <i class="fa fa-play"></i>
                开始执行
            </el-button>
            <el-button size="small" type="primary" @click="stopExecute">
                <i class="fa fa-stop"></i>
                终止执行
            </el-button>
            <el-button size="small" type="primary" @click="queryCaseExecuteInstance(1)">
                <i class="fa fa-eye"></i>
                查询
            </el-button>
            <el-button size="small" type="primary">
                <i class="fa fa-refresh"></i>
                重新查询执行结果
            </el-button>
        </el-row>
        <el-row class="tipRow">
            <span>场景列表</span>
            <span class="infoTip">
                <i class="fa fa-info-circle"></i>
                场景内的用例串行执行，场景之间并行执行
            </span>
        </el-row>
        <div id="runBody">
            <div class="logcontainer">
                <el-card class="box-card" v-if="logShow">
                    <div slot="header" class="clearfix">
                        <span>日志信息</span>
                        <el-button style="float: right; margin-right: 5px; padding: 0px" type="text" @click="updateScreen()">
                            <i class="fa fa-angle-double-right"></i>
                        </el-button>
                        <el-button class="el-icon-full-screen" v-if="fullFlag" style="float: right; margin-right: 5px; padding: 0px" type="text" @click="fullScreen()">
                        </el-button>
                        <el-button v-else style="float: right; margin-right: 5px; padding: 0px" type="text" @click="subScreen()">
                            <i class="fa fa-compress"></i>
                        </el-button>
                    </div>
                    <div id="area">
                        <pre class="pre">
                <code  
                  id="logarea" 
                  class="javascript">
                </code>
              </pre>
                    </div>
                </el-card>
                <div v-else id="loghidden">
                    <div id="hidden">
                        <el-button size="small" @click="showScreen">
                            <i class="fa fa-angle-double-left">
                                <font color="black" style="margin-left: 3px">展开日志</font>
                            </i>
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="sceneslist" style="margin-top: 20px">
            <div class="scene-list-wrapper" style="padding: 0px 20px 10px 20px" v-for="(scene, index) in testSceneList" :key="index">
                <el-row class="sceneTitleRow">
                    <i class="fa fa-arrows" style="color: #5a3c3c">
                    </i>&nbsp;&nbsp;
                    <span class="sceneNameStyle">{{scene.sceneName}}</span>
                    <el-button class="showHidden" size="mini" type="primary" @click="operateRow">
                        <div v-if="isExpanding">
                            <span>折叠</span>
                            <i class="fa fa-caret-left" style="margin-left: 1px"></i>
                        </div>
                        <div v-else>
                            <span>展开</span>
                            <i class="fa fa-caret-right" style="margin-left: 1px"></i>
                        </div>
                    </el-button>
                </el-row>
                <div v-show="isExpanding" class="case-lib case-lib-pad" v-for="(case_wrapper, index) in scene.testCaseList" :key="case_wrapper.caseId + index">
                    <template v-if="case_wrapper.caseCompositeType == 1">
                        <div class="case-wrapper">
                            <div class="case" @mousedown.stop="1">
                                <div class="case-header">
                                    <img :src="exeImgs[0]" :id="'img' +'-' +scene.sceneId +'-' +case_wrapper.caseId" />
                                    <p class="width-limit" :title="case_wrapper.caseCode">
                                        {{ case_wrapper.caseCode }}
                                    </p>
                                    <p class="case-main">
                                        <a class="view-case">
                                            <span>查看</span>
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </el-card>
</div>
</template>

<script>
import 'font-awesome/css/font-awesome.css'
import Request from '@/libs/request.js'
import Vac from '@/libs/vac-functions.es'
export default {
    name: 'RunScript',
    data() {
        return {
            runners: [], // 执行机列表
            runnersSelected: '', // 查询到的执行机
            testPlanEntity: {}, // 查询到的测试计划
            caselibId: '', // 用例库id
            testPlanId: '', // 测试计划id
            fullFlag: true,
            logShow: false,
            testSceneList: [], //测试场景列表
            isExpanding: false,
            exeImgs: {
                0: "/index/static/img/waiting.png",
                10: "/index/static/img/init.png",
                2: "/index/static/img/success.png",
                3: "/index/static/img/error.png",
                13: "/index/static/img/running.gif",
                4: "/index/static/img/success.png",
                5: "/index/static/img/jump.png",
                11: "/index/static/img/warn.png",
                12: "/index/static/img/warn.png",
            }, // 图标
            userId: sessionStorage.getItem('userId') || '3',
            exeStauts: true, //执行状态,用与判断该测试计划是否在执行中，确定是否调用执行接口
            batchId: null, // 批次id
            selectedSceneCases: [], // 选择的场景用例
            exeStautShow: '执行状态：<i class="el-icon-info""></i>无计划', // 设置执行状态
            tagType: "primary",
            interruptData: {}
        }
    },
    props: {
        caseId: {
            type: Number,
            default: 0
        },
        autId: {
            type: Number,
            default: 0
        },
        scriptId: {
            type: Number,
            default: 0
        }
    },
    mounted() {
        // 获取脚本测试计划
        this.queryScriptDebugTestPlan(this.caseId)
        // 查询执行机
        this.queryRunners()
    },
    methods: {
        // 查询脚本调试对应的测试计划
        queryScriptDebugTestPlan(caseId) {
            Request({
                url: '/testPlanController/queryScriptDebugTestPlan',
                method: 'POST',
                params: {
                    caseId
                }
            }).then(res => {
                if (res.respCode === '0000') {
                    this.testPlanEntity = res.testPlanEntity
                    console.log('测试计划获取成功run', this.testPlanEntity)
                    this.caselibId = this.testPlanEntity.caseLibId
                    this.testPlanId = this.testPlanEntity.id
                    this.queryCaseExecuteInstance()
                    this.getBatchIdForTestPlan(res.testPlanEntity.id)
                }
            }).catch(error => {
                console.log('run查询测试计划失败', error)
                this.$message.warning('该测试计划尚未发起执行')
            })
        },
        // 查询测试计划下的场景用例
        queryCaseExecuteInstance(num) {
            Request({
                url: '/caseExecuteInstance/queryCaseExecuteInstance',
                method: 'post',
                params: {
                    caselibId: this.caselibId,
                    testPlanId: this.testPlanId,
                    roundFlag: 2,
                    scopeFlag: 1
                }
            }).then(res => {
                if (num === 1) {
                    this.$message.success('查询成功')
                }
                this.testSceneList = res.executeInstanceResult.testSceneList
                console.log('run', this.testSceneList)
            }).catch(error => {
                console.log('场景用例获取失败')
            })
        },
        // 查询执行机
        queryRunners() {
            Request({
                url: '/executeController/queryRunners',
                method: 'post',
                params: {
                    serviceName: "web.ui",
                    userId: sessionStorage.getItem('userId')
                }
            }).then(res => {
                if (res.respCode === '0000') {
                    console.log('run执行机获取', res)
                    this.runners = res.runners
                    if (this.runners.length === 0) {
                        return Vac.alert('执行机查询为空')
                    }
                }
            }).catch(error => {
                console.log('执行机查询出错', error)
            })
        },
        // 执行代码
        startExecution() {
            if (this.runnersSelected.length === 0) {
                Vac.alert('请选择执行机')
            }
            if (!this.exeStauts) {
                Vac.alert("该测试计划正在执行中，若想再次执行，请终止当前执行")
                return;
            }
            let selectedExeInstances = []
            Request({
                url: '/executeController/t1',
                method: 'POST',
                params: {
                    userId: this.userId,
                    recordflag: this.recordFlag,
                    exeScope: 1,
                    selectState: "",
                    selectedExeInstances: [],
                    testPlanId: this.testPlanId,
                    identifiableRunnerName: "appointed",
                    appointedRunners: [this.runnersSelected],
                }
            }).then(res => {
                if (res.respCode === '0000') {
                    this.$message.success('操作成功!准备发起执行')
                    this.startQueryLog()
                    //因为查询执行信息需要最近执行的批量号因此需要查询批次
                    Request({
                        url: '/batchRunCtrlController/queryLatestBatchIdForTestPlan',
                        method: 'POST',
                        params: {
                            testPlanId: this.testPlanId
                        }
                    }).then(res => {
                        if (res.respCode === '0000') {
                            console.log("run queryLatestBatchIdForTestPlan", res)
                            this.batchId = res.batchId
                            this.startQueryResult();
                        }
                    }).catch(error => {
                        console.log('run网络失败')
                        this.setResultIcon()
                    })
                } else {
                    return this.$message.warning('发起执行失败')
                }
            }).catch(error => {
                console.log('run发起执行失败')
            })
        },
        // 终止执行
        stopExecute() {
            Request({
                url: '/batchRunCtrlController/terminateBatch',
                method: 'POST',
                params: {
                    batchId: this.batchId
                }
            }).then(res => {
                if (res.respCode === '0000') {
                    this.$message.success("终止执行成功")
                    this.syncQueryIncInsStatus()
                }
            }).catch(error => {
                console.log('终止失败', error)
                this.$message.info('批次已结束')
            })
        },
        // 获取最近的执行批次id
        getBatchIdForTestPlan(testPlanId) {
            var _this = this;
            Vac.ajax({
                url: "/batchRunCtrlController/queryLatestBatchIdForTestPlan",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify({
                    testPlanId: testPlanId,
                }),
                success: function (data) {
                    if (data.respCode == "0000") {
                        _this.batchId = data.batchId;
                        _this.getSinglebranchStatus();
                    } else if (data.respCode == "10012000") {
                        _this.exeStautShow =
                            '执行状态：<i class="el-icon-video-play"></i>尚未执行';
                        _this.tagType = "warning";
                        _this.exeStauts = true;
                        Vac.alert(data.respMsg);
                    } else Vac.alert("查询branchId出错啦");
                },
                error: function () {
                    Vac.alert("网络错误");
                },
            });
        },
        getSinglebranchStatus() {
            //查询单个批次结果 并展示执行状态
            var _this = this;
            Vac.ajax({
                url: "/batchRunCtrlController/syncQueryIncInsStatus",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify({
                    batchId: _this.batchId,
                    reqSyncNo: null,
                    sessionId: null,
                }),
                success: function (data) {
                    if (data.respCode == "0000") {
                        if (data.respSyncNo == -1) {
                            _this.setResultIcon(data.insStatuses);
                            _this.exeStautShow =
                                '执行状态：<i class="el-icon-circle-check"></i>已执行';
                            _this.tagType = "success";
                            _this.exeStauts = true;
                        } else {
                            _this.setResultIcon(data.insStatuses);
                            _this.exeStautShow =
                                '执行状态：<i class="el-icon-loading"></i>执行中';
                            _this.tagType = "primary";
                            _this.exeStauts = false;
                        }
                    } else {
                        _this.exeStautShow =
                            '执行状态：<i class="el-icon-question"></i>未知';
                        _this.tagType = "info";
                        _this.exeStauts = false;
                        Vac.alert(data.respMsg);
                    }
                },
                error: function () {
                    Vac.alert("网络错误！请点击重新查询！");
                },
            });
        },
        // 异步查询状态
        syncQueryIncInsStatus(res) {
            let _this = this
            Request({
                url: '/batchRunCtrlController/syncQueryIncInsStatus',
                method: 'POST',
                params: {
                    batchId: res.batchId,
                    reqSyncNo: res.respSyncNo,
                    sessionId: res.sessionId
                }
            }).then(res => {
                if (res.respCode === '0000') {
                    if (res.respSyncNo === -1) {
                        _this.exeStautShow = '执行状态：<i class="el-icon-circle-check"></i>已执行'
                        _this.tagType = "success"
                        console.log('run log', res)
                        this.setResultIcon(res.insStatuses)
                    } else if (res.reqSyncNo === -2) {
                        this.syncQueryIncInsStatus(res)
                    } else {
                        this.setResultIcon(res.insStatuses)
                        if (res.insStatuses[0].manualChooseErrExecuting == true && res.insStatuses[0].status == 3) {
                            this.interruptData = res
                            // this.runInterrupt()
                        } else {
                            this.syncQueryIncInsStatus(res)
                        }
                    }
                }
            }).catch(error => {
                console.log('异步查询失败')
            })
        },
        // 异步查询日志
        startQueryLog() {
            Request({
                url: '/executeController/syncQueryLog',
                method: 'POST',
                params: {
                    logType: 2,
                    reqSyncNo: null,
                    sessionId: null,
                    testPlanId: this.testPlanId,
                    latestLineNum: 50
                }
            }).then(res => {
                if (res.respCode === '0000') {
                    let textarea = $("#textarea")
                    textarea.text(res.logSeg)
                    const logarea = document.getElementById("logarea")
                    textarea.scrollTop(99999)
                    syncQueryIncLog(res)
                }
            }).catch(error => {
                console.log('异步查询失败', error)
                this.$message.warning("消息队列获取失败")
            })

            function syncQueryIncLog(values) {
                Vac.ajax({
                    url: "executeController/syncQueryLog",
                    type: "post",
                    contentType: "application/json",
                    data: JSON.stringify({
                        logType: 2,
                        reqSyncNo: values.respSyncNo,
                        sessionId: values.sessionId,
                        testPlanId: values.testPlanId,
                        latestLineNum: 50,
                    }),
                    success: function (data) {
                        if (data.respCode == "0000") {
                            let textarea = $("#logarea");
                            if (data.logSeg != null) {
                                textarea.text(textarea.text() + data.logSeg);
                                var logarea = document.getElementById("logarea");
                            }
                            textarea.scrollTop(99999999999);
                            syncQueryIncLog(data);
                        } else {
                            Vac.alert(data.respMsg);
                        }
                    },
                    error: function () {
                        Vac.alert("网络错误！请点击重新查询！");
                    },
                });
            }
        },
        /**
         * 日志相关
         */
        // 展开日志
        showScreen() {
            this.logShow = !this.logShow;
            this.subScreen();
        },
        // 最大化日志
        fullScreen() {
            let logDiv = document.getElementsByClassName("logcontainer")[0];
            logDiv.style.width = "100%";
            logDiv.style.height = "200vh";
            this.fullFlag = false;
        },
        // 日志样式还原
        subScreen() {
            let logDiv = document.getElementsByClassName("logcontainer")[0];
            logDiv.style.width = "500px";
            logDiv.style.height = "500px";
            this.fullFlag = true;
        },
        // 更新日志
        updateScreen() {
            let _this = this;
            let logDiv = document.getElementsByClassName("logcontainer")[0];
            logDiv.style.width = "auto";
            logDiv.style.height = "auto";
            _this.logShow = !_this.logShow;
        },
        // 展开或者折叠
        operateRow() {
            this.isExpanding = !this.isExpanding
        },
        // 设置图标样式
        setResultIcon(data) {
            console.log('run 设置图标', data)
            if (!data) {
                console.log('run 图标变量', data);
                [...document.querySelectorAll('img[id^="img-"]')].forEach((item) => {
                    item.src = this.exeImgs["0"];
                });
                return;
            }
            for (let d of data) {
                console.log('run 获取', d)
                if (d.flowNodeId) {
                    if (
                        document.querySelector(
                            `#img-${d.sceneId}-${d.testcaseId}-${d.flowNodeId}`
                        ) != null
                    ) {
                        document.querySelector(
                            `#img-${d.sceneId}-${d.testcaseId}-${d.flowNodeId}`
                        ).src = this.exeImgs[d.status];
                    }
                } else {
                    if (
                        document.querySelector(`#img-${d.sceneId}-${d.testcaseId}`) != null
                    ) {
                        document.querySelector(
                            `#img-${d.sceneId}-${d.testcaseId}`
                        ).src = this.exeImgs[d.status];
                    }
                }
                let selectNode = "#runner-" + d.sceneId + "-" + d.testcaseId;
                if ($(selectNode) != null) {
                    console.log(d.runnerName);
                    if (d.runnerName != null) {
                        let runner = d.runnerName.replace(/-/g, "_");
                        let runnerpors = runner.split("/");
                        console.log(
                            $(selectNode)
                            .children()
                            .text("分配执行机为：" + runnerpors[0])
                        );
                    }
                }
            }
        },
        // 查询结果
        startQueryResult() {
            Request({
                url: '/batchRunCtrlController/syncQueryIncInsStatus',
                method: 'post',
                params: {
                    batchId: this.batchId,
                    reqSyncNo: null,
                    sessionId: null
                }
            }).then(res => {
                if (res.respCode === '0000') {
                    console.log('run startQueryResult异步查询结果', res)
                    if (res.respSyncNo === -1) {
                        this.setResultIcon(res.insStatuses)
                        this.exeStautShow = '执行状态：<i class="el-icon-circle-check"></i>已执行'
                        this.tagType = 'success'
                    }
                } else {
                    this.setResultIcon(res.insStatuses);
                    this.syncQueryIncInsStatus(res);
                }
            }).catch(error => {
                this.$message.warning("网络错误，请重新查询")
            })
        },
    }
}
</script>

<style lang="less" scoped>
.runTitle {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 0px;
}

.menuRow {
    line-height: 40px;
    margin-top: 15px;
    margin-bottom: 10px !important;
    padding-left: 0px;

    .runnerSelect {
        width: 200px;
    }
}

.buttonRow {
    margin-top: -15px;
    padding-left: 10px;
}

.tipRow {
    margin-top: 15px;
    padding-left: 10px;
    line-height: 30px;
    display: flex;
    align-items: center;

    .saveSort {
        margin-left: 10px;
    }

    .infoTip {
        margin-left: 20px;

        .fa-info-circle {
            color: #5dc9f3;
        }
    }
}

#runBody {
    .logcontainer {
        width: auto;
        height: auto;
        position: fixed;
        right: 0px;
        top: 15%;
        z-index: 9999;
    }

    #log {
        opacity: 0.75;
        position: absolute;
        right: 0%;
        height: 100%;
        width: 100%;
    }

    #loghidden {
        right: 0%;
        height: auto;
        width: auto;
        z-index: 9999;
    }

    .box-card {
        height: 100%;
    }

    .el-card__header {
        padding: 10px 20px 8px 20px;
    }

    .clearfix {
        font-size: 17px;
    }

    #logcontent {
        border: 1px solid #000;
        float: left;
        height: 100%;
        width: 95%;
    }

    #logShowBtn {
        float: right;
    }

    #logtext {
        float: left !important;
        height: 100%;
        width: 100%;
        overflow: hidden;
        z-index: 3;
    }

    .el-card__body {
        height: 100%;
    }

    #logarea {
        resize: none;
        color: white;
        background: #000;
        float: left !important;
        height: 100%;
        width: 100%;
        overflow: auto;
        z-index: 3;
        min-height: 1000px;
    }

    #area {
        height: 90%;
        width: 100%;
    }

    .pre {
        width: 100%;
        height: 100%;
        z-index: 100;
        overflow: hidden;
    }
}

.sceneslist {
    margin-top: 0px;

    .scene-list-wrapper {
        position: relative;
    }

    .sceneTitleRow {
        margin-bottom: 10px;

        .sceneNameStyle {
            font-size: 14px;
        }

        .showHidden {
            position: absolute;
            margin-left: 5px;
        }
    }
}

.case-lib {
    padding: 5px;
    background-color: #fafafa;
    min-width: 100%;
    display: flex;
    flex-direction: row;
    font-size: 14px;

    .checkbox-wrapper {
        display: flex;
        height: 100%;
        width: 50px;
        vertical-align: top;
        padding: 9px 5px 0px 5px;
    }
}

.case-lib:last-child {
    margin-bottom: 0;
}

.case {
    margin-right: 5px;
    @caseWidth: 200px;
    display: inline-block;
    margin-bottom: 0px;
    margin-right: 20px;
    min-width: 50px;
    width: @caseWidth;
    border: 1px solid #ddd5d5;
    border-radius: 5px;
    @caseHeaderheight: 30px;
    height: 30px;

    &:first-of-type {
        margin-left: 0;
    }

    .case-header {
        height: @caseHeaderheight;
        padding: 0 0px 0px 3px;
        position: relative;
        background: transparent;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        flex: 0 0 auto;

        img {
            display: inline-block;
            position: relative;
            top: -11px;
            left: 2px;
            width: 16px;
            height: 16px;
            margin: 0 auto;
            vertical-align: middle;
            margin-right: 3px;
        }

        p {
            display: inline-block;
            line-height: @caseHeaderheight;
            margin: 0px 0 0 0px;
            overflow-x: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .width-limit {
            width: 130px;
            font-size: 12px;
        }
    }

    .case-main {
        .view-case {
            position: relative;
            cursor: pointer;
            width: 3000px;
            margin-left: 3px;
            color: #428bca;
        }
    }
}
</style>

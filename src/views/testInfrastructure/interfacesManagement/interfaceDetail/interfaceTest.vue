<template>
    <div class="interface-test">
        <search-bar
            size="small"
            searchBtnIcon="el-icon-caret-right"
            :loading="isRunning"
            searchBtnText="执行"
            :conf="conf"
            @submit="handleSubmit">
            <template v-slot:presearch>
                <el-select
                    size="small"
                    v-model="runnerselected"
                    :disabled="isRunning"
                    placeholder="选择执行机"
                    style="width: 200px"
                    multiple>
                    <el-option
                        v-for="(item,index) in runners"
                        :key="index"
                        :label="item.runnerName"
                        :value="item.identifiableName">
                    </el-option>
                </el-select>
            </template>
        </search-bar>
        <!-- <test-tabs isRunModel :header="originData.header" :body="originData.bodyContent" :params="originData.params" :bodyFormat="originData.bodyFormat" :authType="originData.authType">
            <template v-slot:append>
                <el-button type="text" size="mini" @click="cookieVisible = true">cookie管理</el-button>
                <el-tooltip placement="top" content="根据当前语言信息生成各种测试代码">
                    <el-button type="text" size="mini" style="margin-left: -10px" @click="codeVisible = true">生成测试代码</el-button>
                </el-tooltip>
            </template>
        </test-tabs> -->
        <el-divider>返回结果</el-divider>
        <json-editor style="height: 60vh" :readOnly="true" v-model="runResult"></json-editor>
        <!-- <test-result :runResult="runResult"></test-result> -->
        <el-dialog title="管理Cookie" :visible.sync="cookieVisible" width="40vw" :append-to-body="true">
            <el-row :gutter="20">
                <el-col :span="20">
                    <el-input v-model="domainName" placeholder="请输入域名"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加</el-button>
                </el-col>
            </el-row>
        </el-dialog>
        <el-dialog title="预览测试代码" :visible.sync="codeVisible" width="40vw" :append-to-body="true"></el-dialog>
    </div>
</template>

<script>
import TestTabs from '@/components/interfaceTest/testTabs.vue'
import TestResult from '../components/testResult'
import JsonEditor from '@/components/common/json-editor.vue'

import {
    mapState
} from 'vuex'
import {
    InterfaceTestConf
} from '@/config/testInfrastructure/interfacesManagement/interfaceDetailConf'
import Vac from '@/libs/vac-functions.es'

import Request from '../../../../libs/request'
export default {
    name: 'InterfaceTest',
    components: {
        TestTabs,
        TestResult,
        JsonEditor
    },
    props: {
        protocals: {
            type: Array,
            default: () => []
        },
        methods: {
            type: Array,
            default: () => []
        },
        path: {
            type: String,
            default: ''
        },
        getId: {
            type: [String, Number],
        },
        enviromentPre: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            conf: InterfaceTestConf,
            cookieVisible: false,
            domainName: '',
            codeVisible: false,
            runners: [], // 执行机
            runnerselected: '选择的执行机',
            testPlanId: '', // 测试计划id
            userId: '',
            batchId: '', // 批次id
            runId: '', // 执行id
            interruptExe: '',
            interruptTime: '',
            selectedExeInstances: '',
            interruptData: null, // 中断数据
            isRunning: false,
            originData: {},
            runResult: {}
        }
    },
    computed: {
        ...mapState('interface', {
            authType: 'authType',
            transactId: 'transactId',
            id: 'id',
            interfaceGroupId: 'interfaceGroupId',
            interfaceName: 'interfaceName',
            protocol: 'protocol',
            urlPath: 'urlPath',
            status: 'status',
            method: 'method',
            params: 'params',
            header: 'header',
            bodyFormat: 'bodyFormat',
            bodyContent: 'bodyContent',
            bodyResponseType: 'bodyResponseType',
            bodyResponse: 'bodyResponse',
            headerResponse: 'headerResponse',
            tags: 'tags',
            createTime: 'createTime',
            updateTime: 'updateTime',
        })
    },
    watch: {
        path: {
            handler(newVal) {
                this.conf[2].value = newVal
            },
            immediate: true
        },
        protocals: {
            handler(newVal) {
                if(newVal.length > 0) {
                    this.conf[0].options = []
                    newVal.forEach(item => {
                        this.conf[0].options.push({
                            label: item.protocol,
                            value: item.value
                        })
                    })
                }
            },
            immediate: true
        },
        methods: {
            handler(newVal) {
                if(newVal.length > 0) {
                    this.conf[1].options = []
                    newVal.forEach(item => {
                        this.conf[1].options.push({
                            label: item.method,
                            value: item.value
                        })
                    })
                }
            },
            immediate: true
        },
        protocol: {
            handler(newVal) {
                this.conf[0].value  = newVal
            },
            immediate: true
        },
        method: {
            handler(newVal) {
                this.conf[1].value = newVal
            },
            immediate: true
        },
        enviromentPre: {
            handler(newVal) {
                this.conf[2].value = newVal.slice(0, newVal.length) + this.path
            },
            immediate: true
        }
    },
    created() {
        this.getOriginData();
        this.initUsecaseList();
        this.queryRunner()
    },
    methods: {
        getOriginData() {
            Request({
                url: '/interfaceNewController/selectInterfaceById',
                method: 'post',
                params: {
                    id: this.getId || sessionStorage.getItem('interfaceId')
                }
            }).then((res) => {
                this.originData = res.interfaceSelectDto
            })
        },
        handleSubmit(event) {
            Request({
                url: '/interfaceNewController/AddScriptTemplateDebug',
                method: 'POST',
                params: {
                    autId: sessionStorage.getItem('autId'),
                    transId: '2433',
                    // scriptId: sessionStorage.getItem('transId'),
                    creatorId: sessionStorage.getItem("userId")
                }
            }).then(res => {
                if (res.respCode === "0000") {
                    // 这里会返回caseId
                    this.queryInterfaceScriptDebugTestPlan(res.caseId)
                } else {
                    return console.log('获取失败')
                }
            }).catch(error => {
                this.$message.warning(error)
            })
        },
        // 获取接口调试的测试计划
        queryInterfaceScriptDebugTestPlan() {
            Request({
                url: '/testPlanController/queryInterfaceScriptDebugTestPlan',
                method: 'post',
                params: {
                      "scriptId": '2433'
                }
            }).then(res => {
                console.log(res)
                if(res.testPlanEntity) {
                    this.executeAll(res.testPlanEntity.id)
                }else {
                    this.$message.warning('无测试计划生成')
                }
            })
        },
        initUsecaseList() {
            Request({
                url: '/interfaceNewController/interfaceTestProjectSelect',
                method: 'post',
                params: {
                    interfaceId: sessionStorage.getItem('interfaceId')
                }
            }).then(res => {
                console.log('获取用例列表', res)
                this.conf[3].options = res.list.map(item => {
                    return {
                        label: item.projectName,
                        value: item.id,
                        ...item
                    };
                });
                this.conf[3].value = res.list[0].id;
                this.conf[3].options.unshift({
                    label: '管理用例',
                    value: 'manage',
                })
                this.$watch(
                    () => this.conf[3].value,
                    (newVal) => {
                        if(newVal === 'manage') {
                            this.$emit('caseChange')
                        }else {
                            const item = this.conf[3].options.find(item => item.id === newVal)
                            console.log('用例改变', newVal, item)
                            if(item) {
                                this.originData.header = item.requestHeader
                                this.originData.body = item.bodyContent
                                this.originData.params = item.params
                                this.originData.bodyFormat = item.bodyFormat
                                this.originData.authType = item.authType
                            }
                        }
                    }, {
                        immediate: true
                    }
                )
            })
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
                this.runnerselected = [res.runners[0].identifiableName]
                console.log('runners', _this.runners)
            }).catch(error => {
                console.log(error)
            })
        },
        // 用例执行
        executeAll(testPlanId) {
            let _this = this
            if(_this.runnerselected.length === 0) {
                return this.$message.warning('请选择执行机')
            }
            _this.isRunning = true
            Vac.ajax({
                url: '/executeController/t1',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    userId: sessionStorage.getItem('userId'),
                    exeScope: "1",
                    selectState: "",
                    selectedExeInstances: [],
                    testPlanId: `${testPlanId}`,
                    identifiableRunnerName: "appointed",
                    appointedRunners : _this.runnerselected,
                    sendMail: false
                }),
                success: function(data) {
                    if (data.respCode === '0000') {
                    Vac.ajax({//因为查询执行信息需要最近执行的批量号因此需要查询批次
                        url:  '/batchRunCtrlController/queryLatestBatchIdForTestPlan',
                        type: 'post',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            "testPlanId": 1595,
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
                            _this.$alert(data.respMsg)
                            // _this.isFinished = true
                            _this.isRunning = false
                            _this.runResult = data.insStatuses[0]?data.insStatuses[0]: {}
                            delete _this.runResult.id
                            delete _this.runResult.sceneId
                            delete _this.runResult.testcaseId
                            delete _this.runResult.flowNodeId
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
        syncQueryIncInsStatus(values) {
            var _this = this;
            Vac.ajax({
                url: '/batchRunCtrlController/syncQueryIncInsStatus',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    batchId: values.batchId,
                    reqSyncNo: values.respSyncNo,
                    sessionId: values.sessionId,
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
    }
}
</script>

<style lang="less" scoped>
    .interface-test {
        padding: 5px;
        .select-row {
            display: flex;
        }
    }
</style>

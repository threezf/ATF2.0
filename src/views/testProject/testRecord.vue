<template>
    <div
        class="page-inner">
        <el-container>
            <el-main>
                <el-row
                    class="">
                    <el-col
                        class="methodSpan"
                        :span='1'
                        :offset='0'>
                        <span>
                            查询方式
                        </span>
                    </el-col>
                    <el-col
                        :span='4'
                        :offset='0'
                        class="queryMehod">
                        <el-select
                            v-model="selectedQueryMethod">
                            <el-option
                                v-for="(item,index) in queryMethods"
                                :key="index"
                                :value='item'>
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col
                        class="testSpan"
                        :span='1'
                        :offset='0'>
                        <span
                            v-if="selectedQueryMethod === '按测试轮次'">
                            测试轮次
                        </span>
                        <sapn
                            v-else>
                            测试计划
                        </sapn>
                    </el-col>
                    <el-col
                        class="testPlan"
                        :span='4'
                        :offset='0'>
                        <el-select
                            v-if="selectedQueryMethod === '按测试轮次'"
                            v-model="selectedTestRound">
                            <el-option
                                v-for="(item,index) in testRounds"
                                :key="index"
                                :value='item.name'>
                            </el-option>
                        </el-select>
                        <el-select
                            v-else
                            v-model="selectedTestPlan">
                            <el-option
                                v-for="(item,index) in testPlans"
                                :key="index"
                                :value="item.nameMedium">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col
                        class="statusSpan"
                        :span='1.5'
                        :offset='0'>
                        <span
                            v-if="selectedQueryMethod === '按测试轮次'">
                            记录单状态
                        </span>
                        <span
                            v-else>
                            执行轮次
                        </span>
                    </el-col>
                    <el-col
                        class="recordStatus"
                        :span='4'
                        :offset='0'>
                        <el-select
                            v-if="selectedQueryMethod === '按测试轮次'"
                            v-model="selectedStatus">
                            <el-option
                                v-for="(item,index) in recordStatus"
                                :key='index'
                                :value='item'>
                            </el-option>
                        </el-select>
                        <el-input
                            v-else
                            class="inputStyle"
                            v-model="inTestRound"
                            placeholder='请输入测试轮次'>
                        </el-input>
                    </el-col>
                    <el-button
                        type='primary'
                        size='small'
                        @click="query">
                        查询
                    </el-button>
                    <el-button
                        type='danger'
                        size='small'
                        @click="throwAway">
                        丢弃
                    </el-button>
                </el-row>
                <el-row
                    class="rowStyle">
                    <el-col
                        class="selectStatus"
                        :span='1'
                        :offset='0'>
                        <span>
                            (选)执行状态
                        </span>
                    </el-col>
                    <el-col
                        class="queryMehod"
                        :span='4'
                        :offset='0'>
                        <el-select
                            v-model="selectedExecutionStatus">
                            <el-option
                                v-for="(item,index) in executionStatus"
                                :key="index"
                                :value='item'>
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col
                        class="selectStatus"
                        :span='1'
                        :offset='0'>
                        <span>
                            (选)场景列表
                        </span>
                    </el-col>
                    <el-col
                        class="queryMehod"
                        :span='4'
                        :offset='0'>
                        <el-select
                            v-model="selectedSceneList">
                            <el-option
                                v-for="(item,index) in sceneList"
                                :key="index"
                                :value='item'>
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col
                        class="caseNumberSpan"
                        :span='1'
                        :offset='0'>
                        <span>
                            (选)用例编号
                        </span>
                    </el-col>
                    <el-col
                        class="queryMehod"
                        :span='4'
                        :offset='0'>
                        <el-input
                            class="inputStyle"
                            placeholder='填写用例编号'
                            v-model="Span"/>
                    </el-col>
                </el-row>
                <el-table
                    width='100%'
                    border
                    scrope
                    :data='tableData'>
                    <el-table-column
                        width='58px'
                        align='center'
                        label=''
                        type='selection'>
                    </el-table-column>
                    <el-table-column
                        width='226px'
                        align='center'
                        prop='sceneName'
                        label='场景名称'>
                    </el-table-column>
                    <el-table-column
                        width='147px'
                        align='center'
                        prop='executeRound'
                        label='执行轮次'>
                    </el-table-column>
                    <el-table-column
                        width='171px'
                        align='center'
                        prop='casecode'
                        label='用例编号'
                        sortable>
                    </el-table-column>
                    <el-table-column
                        width='147px'
                        align='center'
                        prop='flownodeName'
                        label='节点名称'>
                    </el-table-column>
                    <el-table-column
                        width='173px'
                        align='center'
                        prop='recorderStatus'
                        label='记录单状态'>
                    </el-table-column>
                    <el-table-column
                        width='150px'
                        align='center'
                        label='执行结果状态'>
                        <template
                            slot-scope="scope">
                            <span
                                :class="scope.row.executeStatus == '失败'? 'failedStatus':''">
                                {{scope.row.executeStatus}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width='304px'
                        align='center'
                        prop='sourceChannel'
                        label='来源渠道'>
                    </el-table-column>
                    <el-table-column
                        width='148px'
                        align='center'
                        label='执行报告'>
                        <template
                            slot-scope="scope">
                            <el-button
                                type='primary'
                                size='mini'
                                @click="viewReport(scope.row)">
                                点击查看
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width='80px'
                        align='center'
                        label='操作'>
                        <template
                            slot-scope="scope">
                            <el-button
                                type='primary'
                                size='mini'
                                @click="showDetail(scope.row)">
                                详情
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div
                    class="paginationDiv">
                    <el-pagination
                        @size-change='handleSizeChange'
                        @current-change='handleCurrentChange'
                        :page-size='pageSize'
                        :page-sizes='[5,10,20,50]'
                        :current-page='currentPage'
                        :total='totalCount'
                        layout='total,sizes,prev,pager,next,jumper'>
                    </el-pagination>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import Request from '@/libs/request.js'
    import VueMixins from '@/libs/vueMixins.js'
    export default {
        name: 'testRecord',
        mixins: [VueMixins],
        data() {
            return {
                queryMethods: ['按测试轮次','按批量执行'],//查询方式
                selectedQueryMethod: '按测试轮次',//选中的查询方式
                testRounds: [],//测试轮次
                selectedTestRound: '',//选中的测试轮次
                testPlans: [],//测试计划
                selectedTestPlan: '',//选择的测试计划
                recordStatus: [
                    '全部',
                    '激活',
                    '未激活',
                    '已删除'                
                ],//记录单状态
                selectedStatus: '全部',//已选择的记录单状态
                inTestRound: '',//输入的测试轮次
                executionStatus: [
                    '初始未执行',
                    '已分配等待执行',
                    '正在执行',
                    '成功',
                    '失败',
                    '跳过执行',
                    '部分成功'
                ],//(选)执行状态
                selectedExecutionStatus: '',//选择
                sceneList: [],//场景列表
                selectedSceneList: '',//选择的场景
                tableData: [],//表格数据
                Span:'',//用例编号
                pageSize: 20,//页面数
                currentPage: 1,//当前页面
                totalCount: 100,//总数
            }
        },
        created() {
            this.selectAllTestround();
            this.selectAllScene();
            this.selectAllTestPlan();
            this.pagedBatchQueryScene();
            this.pagedBatchQueryTestRecordByRunId();
        },
        mounted() {
            
        },
        methods: {
            //查询
            query(){
                this.$message.success('查询');
                Request({
                    url: '/testRecordController/pagedBatchQueryTestRecordByTestRound',
                    meythos: 'POST',
                    params: {
                        casecode: "",
                        currentPage: this.currentPage,
                        executeStatus: this.recordStatus.indexOf(this.selectedStatus),
                        orderColumns: "casecode",
                        orderType: "asc",
                        pageSize: this.pageSize,
                        recorderStatus: "",
                        sceneId: "",
                        testRound: this.selectedTestRound
                    }
                }).then(res =>{
                    console.log('查询成功',res);
                }).catch(error =>{
                    console.log('查询失败',error);
                });
            },
            //丢弃
            throwAway(){
                this.$message.warning('丢弃');
            },
            viewReport(row){
                this.$message.success('查看报告');
                console.log('行信息',row)
            },
            showDetail(row){
                this.$message.success('操作详情');
                console.log('操作行信息',row)
            },
            handleSizeChange(val){
                console.log(`当前${val}条`)
                this.pageSize = val;
                this.pagedBatchQueryTestRecordByRunId();
            },
            handleCurrentChange(val){
                console.log(`当前${val}页`)
                this.currentPage = val;
                this.pagedBatchQueryTestRecordByRunId();
            },
            //查询所有的轮次
            selectAllTestround() {
                Request({
                    url:'/testroundController/selectAllTestround',
                    method:'GET'
                }).then(res =>{
                    console.log('获取测试轮次成功',res);
                    this.testRounds = res.testroundEntityList;
                    this.selectedTestRound = res.testroundEntityList[0].name;
                }).catch(error => {
                    console.log('获取测试轮次失败',error)
                });
            },
            //查询所有的场景
            selectAllScene() {
                Request({
                    url: '/sceneController/selectAllScene',
                    method: 'GET'
                }).then(res => {
                    console.log('场景列表获取成功',res)
                }).catch(error => {
                    console.log('场景列表获取失败',error)
                })
            },
            //查询所有的测试计划
            selectAllTestPlan() {
                Request({
                    url: '/testPlanController/selectAllTestPlan',
                    method: 'POST',
                    params: {}
                }).then(res => {
                    console.log('测试计划列表获取成功',res);
                    this.testPlans = res.testPlanEntityList;
                }).catch(error => {
                    console.log('测试计划列表获取失败',error)
                });
            },
            pagedBatchQueryScene() {
                Request({
                    url: '/sceneController/pagedBatchQueryScene',
                    method: 'POST',
                    params: {
                        caseLibId: "1241",
                        currentPage: this.currentPage,
                        orderColumns: "modified_time",
                        orderType: "DESC",
                        pageSize: this.pageSize
                    }
                }).then(res => {
                    console.log('pagedBatchQueryScene查询成功',res)
                }).catch(error => {
                    console.log('pagedBatchQueryScene查询失败',error)
                })
            },
            pagedBatchQueryTestRecordByRunId() {
                Request({
                    url: '/testRecordController/pagedBatchQueryTestRecordByRunId',
                    method: 'POST',
                    params: {
                        currentPage: this.currentPage,
                        orderColumns: "casecode",
                        orderType: "asc",
                        pageSize: this.pageSize,
                        runId: "7425",
                        testPlanId: "1210"
                    }
                }).then(res => {
                    console.log('pagedBatchQueryTestRecordByRunId成功',res)
                    this.tableData = res.list;
                    this.totalCount = res.totalCount;
                }).catch(error => {
                    console.log('pagedBatchQueryTestRecordByRunId失败',error)
                });
            }
        },
    }
</script>
<style scoped>
    .queryMehod,.testPlan, .recordStatus { 
        margin-left: 10px;
    }
    .caseNumberSpan{
        margin-left: 5px;
    }
    .methodSpan, .testSpan, .statusSpan{
        color: gray;
        font-size: 16px;
        margin-left: 30px;
    }
    .selectStatus,.caseNumberSpan {
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
    .paginationDiv{
        text-align: center;
        margin-top: 15px;
    }
    .failedStatus {
        color: red
    }
</style>
<template>
    <div>
        <div style="height:30px"></div>
        <page style="height:420px">
            <el-row>
                <el-col :offset="1" :span="6">
                    <a href="#/quicklyStart/quicklyTransact" class="blueButton big blue">
                        <p>快速开始入口</p>
                        <p style="font-size: 16px">快速学习，10分钟学会自动化测试流程</p>
                        <div class="littleButton" style="color: #3a6afa">去测试</div>
                    </a>
                </el-col>
                <el-col :span="6" style="margin-left: 2%">
                    <a href="#/testProjectIndext/testProject" class="blueButton big green">
                        <p>标准流程入口</p>
                        <p style="font-size: 16px">适用于已熟悉自动化测试流程的用户</p>
                        <div class="littleButton" style="color: #89d228">去测试</div>
                    </a>
                </el-col>
                <el-col :offset="1" :span="9">
                    <div style="font-size: 28px;color:#3a6afa;">
                        <i class="el-icon-cloudy"></i>
                        ATF测试云工具
                    </div>
                    <div style="margin-top: 20px;margin-left: 5px">ATF是一个适用范围涵盖了整个测试工作的生命周期的自动化测试工具，包括测试各阶段的管理、资源分配、测试执行等模块。</div>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row style="margin-top: 25px">
                <div class="social-btns">
                    <el-col style="width:12%;margin-left: 2% ">
                        <a href="#/systemManagement/automatedComponentManagement" class="skype btn"><i class="fa fa-pencil-square-o"></i></a>
                    </el-col>
                    <el-col class="marginButton">
                        <a href="#/testInfrastructure/TestedSystemManagementRouter/testedSystemManagement" class="skype btn"><i class="fa fa-cogs"></i></a>
                    </el-col>
                    <el-col class="marginButton">
                        <a href="#/testProjectIndext/testProject" class="skype btn"><i class="fa fa-desktop"></i></a>
                    </el-col>
                    <el-col class="marginButton">
                        <a href="#/testProjectIndext/testCase" class="skype btn"><i class="fa  fa-file-text-o"></i></a>
                    </el-col>
                    <el-col class="marginButton">
                        <a href="#/testProjectIndext/datatable" class="skype btn"><i class="fa fa-bar-chart"></i></a>
                    </el-col>
                    <el-col class="marginButton">
                        <a href="#/systemManagement/runnerManagement" class="skype btn"><i class="fa fa-wrench"></i></a>
                    </el-col>
                    <el-col class="marginButton">
                        <a href="#/systemManagement/userManagement" class="skype btn"><i class="fa fa-address-book-o"></i></a>
                    </el-col>
                    <el-col class="marginButton">
                        <a href="#/quicklyStart/quicklyTransact" class="skype btn"><i class="fa fa-files-o"></i></a>
                    </el-col>
                </div>
            </el-row>
            <el-row>
                <el-col style="width:12%;margin-left: 2%;text-align: center ">
                    <p style="color:black">自动化构件管理</p>
                </el-col>
                <el-col class="marginButton">
                    <p style="color:black">被测系统管理</p>
                </el-col>
                <el-col class="marginButton">
                    <p style="color:black">测试项目管理</p>
                </el-col>
                <el-col class="marginButton">
                    <p style="color:black">测试用例管理</p>
                </el-col>
                <el-col class="marginButton">
                    <p style="color:black">测试资源管理</p>
                </el-col>
                <el-col class="marginButton">
                    <p style="color:black">执行机管理</p>
                </el-col>
                <el-col class="marginButton">
                    <p style="color:black">用户管理</p>
                </el-col>
                <el-col class="marginButton">
                    <p style="color:black">快速开始</p>
                </el-col>
            </el-row>
        </page>
        <page style="margin-top: 30px;height:500px">
            <!-- <el-tabs class="activeIndex" v-model="activeNames">
                <el-tab-pane label="自动化构件" name="first">
                    <el-row>
                        <el-col :span="13">
                            <video width="600px" height="400px" controls>
                                <source src="../assets/videos/architecture2.mp4" type="video/mp4">
                            </video>
                        </el-col>
                        <el-col :span="10" style="margin-top: 2%;" class="fileStyles">
                            <p>自动化构件又称为原子构件，用于识别被测系统中的某类型元素，并对其进行操作，是对被测系统进行的操作步骤的最小单位。例如Web网页中的下拉框，可以封装成一个WebList下拉框构件，构件方法支持对Web中的下拉框进行选择、点击等操作。调用自动化构件并配以合适的数据，就得到自动化脚本。自动化构件是编写脚本的基础。</p>
                            <p>由于开发使用的语言、架构不同，开发出来的程序也千差万别。我们每种开发语言和框架称为一个开发架构，各开发架构分开处理、编写自动化构件。开发架构又区分为抽象架构和具体被测系统架构。</p>
                            <p>具体被测系统架构与具体被测系统关联，其中的控件类型和操作方法用于实现具体被测系统的自动化，这样可以满足具体被测系统更复杂的定制化需求。</p>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="测试基础设施" name="second">
                    <el-col :span="13">
                        <video width="600px" height="400px" controls>
                            <source src="../assets/videos/testInfrastructure.mp4" type="video/mp4">
                        </video>
                    </el-col>
                    <el-col :span="10" style="margin-top: 2%;" class="fileStyles">
                        <p>被测系统是要进行测试的软件对象。测试基础设施包括对被测系统本身的管理，
                            对被测系统中的功能点进行管理，对各功能点的自动化资源进行管理，对后面
                            的自动化执行提供支持作用。
                        </p>
                        <p>
                            测试时需要知道被测软件系统的各种可能输入，以及
                            针对不用的输入，校验系统的输出是否符合需求预期。对于UI自动化测试，
                            被测系统的输入包括对可输入项输入值，点击界面中的元素等操作；对于
                            接口自动化测试，输入为用不同的参数数据调用接口，然后校验接口的返回值。
                        </p>
                    </el-col>
                </el-tab-pane>
                <el-tab-pane label="项目管理" name="third">
                    <el-col :span="13">
                        <video width="600px" height="400px" controls>
                            <source src="../assets/videos/testProject.mp4" type="video/mp4">
                        </video>
                    </el-col>
                    <el-col :span="10" style="margin-top: 2%;" class="fileStyles">
                        <p>
                                                按照测试步骤的顺序，项目测试可分为测试项目管理，测试用例管理，测试资源管理，
                                                测试场景管理，测试计划及执行，批次执行查询六个部分。
                                            </p>
                    </el-col>
                </el-tab-pane>
            </el-tabs> -->
            <div class="charts">
                <el-divider></el-divider>
                <el-popover
                    class="more-info"
                    placement="right"
                    width="400"
                    trigger="hover">
                    <el-date-picker
                        v-model="dateRange"
                        type="daterange"
                        align="right"
                        unlink-panels
                        value-format="timestamp"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                    <i slot="reference" class="el-icon-s-unfold"></i>
                </el-popover>
                <el-row class="commonInfo" :gutter="20">
                    <el-col :span="6">
                        <el-card class="card">
                            <h2>
                                {{systemNumber}}
                                <p>(<i class="el-icon-caret-top"></i>{{lastSystemNumber}})</p>
                            </h2>
                            <p>ATF中的被测系统数目</p>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card class="card">
                            <h2>
                                {{projectNumber}}
                                <p>(<i class="el-icon-caret-top"></i>{{lastProjectNumber}})</p>
                            </h2>
                            <p>ATF中的测试项目数目</p>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card class="card">
                            <h2>
                                {{uiTestCaseNumber}}
                                <p>(<i class="el-icon-caret-top"></i>{{lastUiTestCaseNumber}})</p>
                            </h2>
                            <p>ATF中的UI测试用例数目</p>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card class="card">
                            <h2>
                                {{apiTestCaseNumber}}
                                <p>(<i class="el-icon-caret-top"></i>{{lastApiTestCaseNumber}})</p>
                            </h2>
                            <p>ATF中的接口测试用例数目</p>
                        </el-card>
                    </el-col>
                </el-row>
                <el-divider style="font-size: 16px">统计报表<span style="font-size: 12px">{{dateStr}}</span></el-divider>
                <ManageCharts v-loading="loading" :originData="originData"></ManageCharts>
            </div>
        </page>
    </div>
</template>
<script>
    import Request from '@/libs/request.js'
    import VueMixins from '@/libs/vueMixins.js'
    import ManageCharts from './main/manageCharts'
    export default {
        components: {
            ManageCharts
        },
        mixins: [VueMixins],
        data() {
            return {
                currentDate: new Date(),
                activeNames: "first",
                systemNumber: 0,
                projectNumber: 0,
                uiTestCaseNumber: 0,
                apiTestCaseNumber: 0,
                lastSystemNumber: 0,
                lastProjectNumber: 0,
                lastUiTestCaseNumber: 0,
                lastApiTestCaseNumber: 0,
                originData: [],
                loading: false,
                dateRange: [Date.now() - 12 * 30 * 24 * 60 * 60 * 1000, Date.now()-  30 * 24 * 60 * 60 * 1000],
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近半年',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 6);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一年',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 12);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                selectMonth: []
            }
        },
        computed: {
            timestampArray() {
                let arr = []
                let years = [2018, 2019, 2020, 2021]
                years.forEach(year => {
                    for(let i = 0; i < 12; i++) {
                        arr.push((new Date(year, i, 0).getTime() + 24 * 60 * 60 * 1000))
                    }
                })
                return arr
            },
            dateStr() {
                let startTimestamp = new Date(this.dateRange[0])
                let endTimestamp = new Date(this.dateRange[1])
                let start = `${startTimestamp.getFullYear()}-${(startTimestamp.getMonth() + 1).toString().padStart(2, '0')}`
                let end = `${endTimestamp.getFullYear()}-${(endTimestamp.getMonth() + 1).toString().padStart(2, '0')}`
                return `[${start} 至 ${end}]`
            }
        },
        watch: {
            dateRange: {
                handler(newVal) {
                    let startYear = new Date(newVal[0]).getFullYear()
                    let startMonth = new Date(newVal[0]).getMonth()
                    let endYear = new Date(newVal[1]).getFullYear()
                    let endMonth = new Date(newVal[1]).getMonth()
                    let startTimestamp = (new Date(startYear, startMonth, 0).getTime() + 24 * 60 * 60 * 1000)
                    let endTimestamp = (new Date(endYear, endMonth + 1, 0).getTime() + 24 * 60 * 60 * 1000)
                    let startIndex = this.timestampArray.findIndex(item => item === startTimestamp)
                    let endIndex = this.timestampArray.findIndex(item => item === endTimestamp)
                    console.log('1221', startIndex, endIndex, startTimestamp, endTimestamp)
                    let requestList = []
                    let self = this
                    this.selectMonth = this.timestampArray.slice(startIndex, endIndex).map(item => self.getTime(item, 'yyyy-MM'))
                    requestList.push(Request({
                            url: '/statement/summarizationData',
                            method: 'post',
                            params: {
                                startTime: parseInt(newVal[0]/ 1000),
                                endTime: parseInt(this.timestampArray[startIndex + 1] / 1000),
                            }
                        }))
                    for(let index = startIndex + 1; index < endIndex; index ++) {
                        requestList.push(Request({
                            url: '/statement/summarizationData',
                            method: 'post',
                            params: {
                                startTime: parseInt(this.timestampArray[index] / 1000),
                                endTime: parseInt(this.timestampArray[index + 1] / 1000),
                            }
                        }))
                    }
                    this.getConfData(requestList)
                },
                immediate: true
            }
        },
        created() {
            this.getBaseInfo()
            this.getLastDayInfo()
        },
        mounted() {

        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            getBaseInfo() {
                Request({
                    url: '/statement/summarizationData',
                    method: 'post',
                    params: {}
                }).then(res => {
                    this.systemNumber = res.autCount
                    this.projectNumber = res.testProjectCount
                    this.uiTestCaseNumber = res.uiTestCaseCount
                    this.apiTestCaseNumber = res.apiTestCaseCount
                }).finally(_ => {
                })
            },
            getLastDayInfo() {
                Request({
                    url: '/statement/summarizationData',
                    method: 'post',
                    params: {
                        startTime: parseInt((Date.now() - 24 * 60 * 60 * 1000) / 1000),
                        endTime: parseInt(Date.now() / 1000)
                    }
                }).then(res => {
                    console.log('lastDay', res)
                    this.lastSystemNumber = res.autCount
                    this.lastProjectNumber = res.testProjectCount
                    this.lastUiTestCaseNumber = res.uiTestCaseCount
                    this.lastApiTestCaseNumber = res.apiTestCaseCount
                }).finally(_ => {
                })
            },
            getConfData(requestList) {
                this.loading = true
                Promise.all(requestList).then(res => {
                    this.originData = res.map((item, index) => {
                        item.time = this.selectMonth[index]
                        return item
                    })
                }).finally(_ => {
                    this.loading = false
                })
            },
        }
    }
</script>
<style lang="less" scoped>
    .home-page {
        width: 1200px;
        margin: 0 auto;
        padding-top: 25px;
    }

    .marginButton {
        width: 11.55%;
        text-align: center
    }

    #quicklyStart {
        position: relative;
        ;
        top: 30px;
        left: 40px;

    }

    .fileStyles p {
        margin-bottom: 0.5rem;
        line-height:200%
    }

    .blue {
        color: #FFF !important;
        border: 1px solid #84acc3 !important;
        background-color: #007bffe3;
        background-image: url(../assets/images/bubble.png), url(../assets/images/bubble.png),
            -webkit-gradient(radial, 50% 100%, 0, 50% 100%, 100,
                from(rgba(89, 208, 244, 1)), to(rgba(89, 208, 244, 0))),
            -webkit-gradient(linear, 0% 0%, 0% 100%, from(#4fbbf7), to(#3faeeb));
        font-size: 30px;

    }

    .green {
        color: #FFF !important;
        border: 1px solid #96a37b !important;
        background-color: #79be1e;
        background-image: url(../assets/images/bubble.png), url(../assets/images/bubble.png),
            -webkit-gradient(radial, 50% 100%, 0, 50% 100%, 100, from(rgba(162, 211, 30, 1)),
                to(rgba(162, 211, 30, 0))),
            -webkit-gradient(linear, 0% 0%, 0% 100%, from(#82cc27), to(#74b317));
    }

    .blue:hover {
        background-color: #63c7fe;
        background-image: url(../assets/images/bubble.png), url(../assets/images/bubble.png),
            -webkit-gradient(radial, 50% 100%, 0, 50% 100%, 100,
                from(rgba(109, 217, 250, 1)), to(rgba(109, 217, 250, 0))),
            -webkit-gradient(linear, 0% 0%, 0% 100%, from(#63c7fe), to(#58bef7));
    }

    .green:hover {
        background-color: #89d228;
        background-image: url(../assets/images/bubble.png), url(../assets/images/bubble.png),
            -webkit-gradient(radial, 50% 100%, 0, 50% 100%, 100, from(rgba(183, 229, 45, 1)), to(rgba(183, 229, 45, 0))),
            -webkit-gradient(linear, 0% 0%, 0% 100%, from(#90de31), to(#7fc01e));
    }

    .blueButton {
        width: 100%;
        font: 30px 微软雅黑;
        /*text-shadow: 1px 1px 0 rgb(255,255,255,0.4);*/
        text-decoration: none !important;
        white-space: nowrap;
        display: inline-block;
        vertical-align: baseline;
        position: relative;
        cursor: pointer;
        padding: 30px 30px;
        background-repeat: no-repeat;
        background-position: bottom left;
        background-image: url(../assets/images/bubble.png);
        background-position: bottom left, top right, 0 0, 0 0;
        background-clip: border-box;
        -moz-border-radius: 8px;
        -webkit-border-radius: 8px;
        border-radius: 8px;
        -moz-box-shadow: 0 0 1px #fff inset;
        -webkit-box-shadow: 0 0 1px #fff inset;
        box-shadow: 0 0 1px #fff inset;
        -webkit-transition: background-position 1s;
        -moz-transition: background-position 1s;
        transition: background-position 1s;
    }

    .blueButton:hover {
        background-position: top left, bottom right, 0 0, 0 0;
    }

    .blueButton:active {
        bottom: -1px;
    }

    .littleButton {
        width: 80px;
        height: 30px;
        background-color: #FFF;
        font-size: 16px;
        padding: 4px 15px;
        opacity: .9;
        border-radius: 20px;
    }

    .social-btns .btn,
    .social-btns .btn:before,
    .social-btns .btn .fa {
        -webkit-transition: all 0.35s;
        transition: all 0.35s;
        -webkit-transition-timing-function: cubic-bezier(0.31, -0.105, 0.43, 1.59);
        transition-timing-function: cubic-bezier(0.31, -0.105, 0.43, 1.59);
    }

    .social-btns .btn:before {
        top: 90%;
        left: -110%;
    }

    .social-btns .btn .fa {
        -webkit-transform: scale(0.8);
        transform: scale(0.8);
    }

    .social-btns .btn.facebook:before {
        background-color: #3b5998;
    }

    .social-btns .btn.facebook .fa {
        color: #3b5998;
    }

    .social-btns .btn.twitter:before {
        background-color: #3cf;
    }

    .social-btns .btn.twitter .fa {
        color: #3cf;
    }

    .social-btns .btn.google:before {
        background-color: #dc4a38;
    }

    .social-btns .btn.google .fa {
        color: #dc4a38;
    }

    .social-btns .btn.dribbble:before {
        background-color: #f26798;
    }

    .social-btns .btn.dribbble .fa {
        color: #f26798;
    }

    .social-btns .btn.skype:before {
        background-color: #00aff0;
    }

    .social-btns .btn.skype .fa {
        color: #00aff0;
    }

    .social-btns .btn:focus:before,
    .social-btns .btn:hover:before {
        top: -10%;
        left: -10%;
        border: 1px solid #2bb4e8;
    }

    .social-btns .btn:focus .fa,
    .social-btns .btn:hover .fa {
        color: #fff;
        -webkit-transform: scale(1);
        transform: scale(1);
    }

    .social-btns {
        height: 70px;
        margin: 10px auto;
        font-size: 0;
        text-align: center;
    }

    .social-btns .btn {
        display: inline-block;
        background-color: transparent;
        width: 70px;
        height: 70px;
        line-height: 50px;
        margin: 0 10px;
        text-align: center;
        position: relative;
        overflow: hidden;
        border-radius: 28%;
        -webkit-box-shadow: 0 5px 15px -5px #00aff0;
        box-shadow: 0 5px 15px -5px #00aff0;
        opacity: 0.99;
    }

    .social-btns .btn:before {
        content: '';
        width: 120%;
        height: 120%;
        position: absolute;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .social-btns .btn .fa {
        font-size: 38px;
        vertical-align: middle;
    }
	.activeIndex{
		margin-left:4.2%;
		/*font-size: 18px;*/
	}
    .charts {
        margin-top: 10px;
        width: 100%;
        height: 600px;
        position: relative;
        .more-info {
            position: absolute;
            z-index: 999;
            top: 200px;
            left: 10px;
            cursor: pointer;
        }
    }
    .commonInfo {
        height: 140px;
        padding: 0 10px;
        .card {
            height: 120px;
            h2 {
                font-size: 30px;
                margin: 10px 0;
                display: flex;
                margin-bottom: -5px;
                p {
                    margin-top: 8px;
                    bottom: 0;
                    font-size: 20px;
                    letter-spacing: 3px;
                    display: flex;
                }
            }
            p {
                font-size: 15px;
            }
        }
    }
</style>

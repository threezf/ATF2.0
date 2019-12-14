<template>
    <div class="page-inner">
        <el-container>

            <el-header>
                <el-button
                    @click='reFresh'
                    type="primary"
                    icon="el-icon-refresh">
                    刷新
                </el-button>
                <el-button
                    @click='downloadRunner'
                    type="primary"
                    icon="el-icon-download">
                    执行机安装包下载
                </el-button>
            </el-header>
            <el-main>
                <el-table
                    stripe
                    :data="tableData"
                    class='table'>
                    <el-table-column
                        label="名称"
                        property="identifiableName"
                        width="180"/>
                    <el-table-column
                        label="IP"
                        property="runnerIp"
                        width="180"/>
                    <el-table-column
                        label="端口号"
                        property='runnerPort'
                        width="120"/>
                    <el-table-column
                        label="描述"
                        property="runnerName"
                        width="200"/>
                    <el-table-column label="日志查看">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleDetail(scope.$index, scope.row)">日志查看</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <el-card class="box-card"  shadow="always" v-show='logVisible'>
                    <div slot="header" class="clearfix">
                        <span>执行机日志</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="logVisible=false">隐藏</el-button>
                    </div>
                    <div  class="text item">
                        <el-input
                            id='textarea_id'
                            type="textarea"
                            :rows="15"
                            placeholder="请输入内容"
                            v-model="log"
                            disabled>
                        </el-input>
                    </div>
                </el-card>
            </el-main>
            <el-footer>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import Request from '@/libs/request.js'
    import VueMixins from '@/libs/vueMixins.js'
    export default {
        mixins: [VueMixins], // 混入
        data() {
            return {
                tableData: [],
                log:'',
                logVisible: false

            }
        },
        computed:{

        },
        created(){
            this.getRunners()
        },
        mounted() {
            this.getRunners()
        },
        methods: {
            // 刷新当前展示的执行机
            reFresh(){
                this.getRunners()
            },
            // 执行机查询
            getRunners(){
                Request({
                    url: '/executeController/queryRunners',
                    method: 'post',
                    params: {"serviceName":"web.ui"}
                }).then((res) => {
                    this.tableData = res.runners
                },(err) => {
                    console.log(err)
                }).catch((err) => {
                    console.log(err)
                })
            },
            // 执行机安装包下载
            downloadRunner(){
                window.location.href = this.address4 + "atf-data/atf-runner.zip";
            },
            handleDetail(index, row) {
                console.log(index)
                console.log(row)
                Request({
                    url: '/executeController/syncQueryLog',
                    method: 'post',
                    params: {
                    "logType": 1,
                    "identifiableName":row.identifiableName+'/'+ row.runnerIp +':'+ row.runnerPort,
					"reqSyncNo": null,
					"sessionId":null,
                    "latestLineNum":50,
				}
                }).then((res) => {
                    this.log = res.logSeg
                    const textarea = document.getElementById('textarea_id');
                    textarea.scrollTop = textarea.scrollHeight;
                    syncQueryIncLog(res)
                },(err) => {
                    console.log(err)
                }).catch((err) => {
                    console.log(err)
                })
                this.logVisible = true
            },
            syncQueryIncLog(data){
                Request({
                    url: '/executeController/syncQueryLog',
                    method: 'post',
                    params: {
                    "logType": 1,
                    "identifiableName":data.identifiableName+'/'+ data.runnerIp +':'+ data.runnerPort,
					"reqSyncNo": null,
					"sessionId":null,
                    "latestLineNum":50,
				}
                }).then((res) => {
                    this.log = res.logSeg
                    const textarea = document.getElementById('textarea_id');
                    textarea.scrollTop = textarea.scrollHeight;
                    syncQueryIncLog(res)
                },(err) => {
                    console.log(err)
                }).catch((err) => {
                    console.log(err)
                })
            }
        },
    }
</script>

<style lang="less" scoped>
.box-card{
    z-index: 10;
    width:500px;
    position: absolute;
    top:170px;
    right:10px
}
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

.box-card {
    width: 480px;
}
</style>

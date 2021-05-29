<template>
    <div class="result">
        <el-divider>返回结果</el-divider>
        <!-- <el-tabs class="tabs" v-model="currentTab" type="border-card">
            <el-tab-pane class="tab-panel" v-for="(tab, index) in tabs" :key="tab.name + index" :label="tab.label" :name="tab.name">
                <div v-if="currentTab === 'time'" class="tab-time">
                    <Time></Time>
                </div>
                <div v-else-if="currentTab === 'result'">
                    <Result :tested="isTested" @test="handeleTest"></Result>
                </div>
                <div v-else-if="currentTab === 'responseHeader'">
                    <ResponseHeader></ResponseHeader>
                </div>
                <div v-else-if="currentTab === 'request'">
                    <Request :params="originData.params"></Request>
                </div>
                <div v-else-if="currentTab === 'requestHeader'">
                    <RequestHeader></RequestHeader>
                </div>
                <div v-else class="tab-history">
                    <History></History>
                </div>
            </el-tab-pane>
        </el-tabs> -->
        <json-editor :readOnly="true" v-model="runResult"></json-editor>
    </div>
</template>

<script>
import Time from './testResult/time'
import Result from './testResult/result'
import JsonEditor from '@/components/common/json-editor.vue'

import ResponseHeader from './testResult/responseHeader'
import Request from './testResult/request'
import RequestHeader from './testResult/requestHeader'
import History from './testResult/history'
export default {
    name: 'TestResult',
    components: {
        Time,
        Result,
        ResponseHeader,
        Request,
        RequestHeader,
        History,
        JsonEditor
    },
    props: {
        originData: {
            type: Object,
            default:() => {}
        },
        runResult: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            currentTab: 'result',
            isTested: false,
        }
    },
    computed: {
        tabs() {
            if(this.isTested) {
                return [{
                    label: '时间分析',
                    name: 'time'
                }, {
                    label: '返回结果',
                    name: 'result'
                }, {
                    label: '返回头部',
                    name: 'responseHeader'
                }, {
                    label: '请求内容',
                    name: 'request'
                }, {
                    label: '请求头部',
                    name: 'requestHeader'
                }, {
                    label: '测试历史',
                    name: 'history'
                }]
            }else {
                return [{
                    label: '返回结果',
                    name: 'result'
                }, {
                    label: '测试历史',
                    name: 'history'
                }]
            }
        }
    },
    methods: {
        handeleTest(val) {
            console.log(val, '111')
            this.isTested = val
        }
    }

}
</script>

<style lang="less" scoped>
    .result {
        margin-top: 15px;
        /deep/ .el-tabs--border-card {
            -webkit-box-shadow: none;
            box-shadow: none;   
        }
    }
</style>
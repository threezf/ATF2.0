<template>
    <div class="result">
        <el-tabs class="tabs" v-model="currentTab" type="border-card">
            <el-tab-pane class="tab-panel" v-for="(tab, index) in tabs" :key="tab.name + index" :label="tab.label" :name="tab.name">
                <div v-if="currentTab === 'noCheck'" class="tab-time">
                    <NoCheck></NoCheck>
                </div>
                <div v-else-if="currentTab === 'checkCode'">
                    <CheckCode></CheckCode>
                </div>
                <div v-else-if="currentTab === 'checkJSON'">
                    <CheckJSON></CheckJSON>
                </div>
                <div v-else-if="currentTab === 'checkXML'">
											<CheckXML></CheckXML>
                </div>
                <div v-else-if="currentTab === 'checkMatch'">
                    <CheckMatch></CheckMatch>
                </div>
                <div v-else class="tab-history">
                    <CheckMatch></CheckMatch>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import NoCheck from './checkResult/noCheck'
import CheckCode from './checkResult/checkCode'
import CheckJSON from './checkResult/checkJSON'
import CheckXML from './checkResult/checkXML'
import CheckMatch from './checkResult/checkMatch'
export default {
    name: 'TestResult',
    components: {
				NoCheck,
				CheckCode,
				CheckJSON,
				CheckXML,
				CheckMatch,
    },
    props: {
        originData: {
            type: Object,
            default:() => {}
        }
    },
    data() {
        return {
            currentTab: 'noCheck',
        }
    },
    computed: {
        tabs() {
                return [{
                    label: '不校验',
                    name: 'noCheck'
                }, {
                    label: '校验状态码',
                    name: 'checkCode'
                }, {
                    label: '校验JSON',
                    name: 'checkJSON'
                }, {
                    label: '校验XML',
                    name: 'checkXML'
                }, {
                    label: '全文匹配',
                    name: 'checkMatch'
                }, {
                    label: '正则匹配',
                    name: 'checkRMatch'
                }]
        }
    },
    methods: {

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

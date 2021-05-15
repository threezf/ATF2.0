<template>
    <div class="result">
        <!-- <el-tabs class="tabs" v-model="currentTab" type="border-card">
            <el-tab-pane class="tab-panel" v-for="(tab, index) in tabs" :key="tab.name + index" :label="tab.label" :name="tab.id">
            </el-tab-pane>
        </el-tabs> -->
        <h4 style="font-size: 18px; margin: 10px">校验方式</h4>
        <p style="margin: 10px 10px -10px">
            <el-select v-model="currentTab" size="mini">
                <el-option v-for="(tab, index) in tabs" :key="tab.name + index" :label="tab.label" :value="tab.id">
                </el-option>
            </el-select>
        </p>
        <div v-if="currentTab === '1'" class="tab-time">
            <NoCheck></NoCheck>
        </div>
        <div v-else-if="currentTab === '2'">
            <CheckCode ref="checkCode"></CheckCode>
        </div>
        <div v-else-if="currentTab === '3'">
            <CheckJSON ref="checkJSON"></CheckJSON>
        </div>
        <div v-else-if="currentTab === '4'">
            <CheckXML ref="checkXML"></CheckXML>
        </div>
        <div v-else-if="currentTab === '5'">
            <CheckMatch ref="checkMatch1"></CheckMatch>
        </div>
        <div v-else class="tab-history">
            <CheckMatch ref="checkMatch2"></CheckMatch>
        </div>
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
    data() {
        return {
            // currentTab: '1',
        }
    },
    computed: {
				currentTab: {
					get(){
						return this.$store.state.assertionType.toString()
					},
					set(value){
						console.log('currentTab changed')
						this.$store.commit('setAssertionType',Number(value))
					}
				},
        tabs() {
                return [{
                		id:'1',
                    label: '不校验',
                    name: 'noCheck'
                }, {
										id:'2',
                    label: '校验状态码',
                    name: 'checkCode'
                }, {
										id:'3',
                    label: '校验JSON',
                    name: 'checkJSON'
                }, {
										id:'4',
                    label: '校验XML',
                    name: 'checkXML'
                }, {
										id:'5',
                    label: '全文匹配',
                    name: 'checkMatch'
                }, {
										id:'6',
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

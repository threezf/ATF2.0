<template>
    <div class="result">
        <el-tabs class="tabs" v-model="currentTab" type="border-card">
            <el-tab-pane class="tab-panel" v-for="(tab, index) in tabs" :key="tab.name + index" :label="tab.label" :name="tab.name">
                <div v-if="currentTab === 'header'" class="tab-time">
                    <HeaderTab :headers="headers"></HeaderTab>
                </div>
                <div v-else-if="currentTab === 'body'">
                    <BodyTab :bodys="bodys" :body-type="bodyType" :json-variable="jsonVariable"></BodyTab>
                </div>
                <div v-else-if="currentTab === 'params'">
                    <ParamsTab :params="params"></ParamsTab>
                </div>
                <div v-else class="tab-history">
                    <AuthTab :selected-auth-type="selectedAuthType"></AuthTab>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import HeaderTab from './requestTabs/headerTab'
import BodyTab from './requestTabs/bodyTab'
import ParamsTab from './requestTabs/paramsTab'
import AuthTab from './requestTabs/authTab'
export default {
    name: 'TestResult',
    components: {
			HeaderTab,
			BodyTab,
			ParamsTab,
			AuthTab,
    },
    props: {
        originData: {
            type: Object,
            default:() => {}
        },
				header: {
					type: String,
					default: '[]'
				},
				body: {
					type: String,
					default: '[]'
				},
				param: {
					type: String,
					default: '[]'
				},
				bodyFormat: {
					type: Number,
					default: 0
				},
				authType: {
					type: Number,
				}
    },
    data() {
        return {
            currentTab: 'noCheck',
						headers: [],
						bodys: [],
						jsonVariable: '',
						bodyType: String(this.bodyFormat),
						params: [],
						selectedAuthType: 0,
        }
    },
		created() {
			if(this.authType === 0) {
				this.initApiMsgData()
			}else {
				this.handlerParams()
			}

		},
    computed: {
        tabs() {
                return [{
                    label: '请求头部',
                    name: 'header'
                }, {
                    label: '请求体',
                    name: 'body'
                }, {
                    label: '请求参数',
                    name: 'params'
                }, {
                    label: '权限验证',
                    name: 'auth'
                }]
        }
    },
    methods: {
			initApiMsgData() {
				console.log("测试")
				this.bodyType = '0'
				this.headers = Array();
				this.bodys = Array();
				this.jsonVariable = '';
				this.params = Array();
				this.selectedAuthType = 1
			},
			handlerParams() {
				if (this.bodyFormat === 1) {
					this.bodys.push({
						name: '',
						val: '',
						desc: ''
					})
					this.jsonVariable = this.body
				} else {
					this.bodys.push(...JSON.parse(this.body))
				}
				if (this.header === '[]' || this.header === null) {
					this.headers.push({
						name: '',
						val: '',
						desc: ''
					})
				} else {
					this.headers.push(...JSON.parse(this.header))
				}
				if (this.param === '[]' || this.param === null) {
					this.params.push({
						name: '',
						val: '',
						desc: ''
					})
				} else {
					this.params.push(...JSON.parse(this.param))
				}
			},
    },
	watch:{
		header: {
			handler(newVal) {
				let arr = JSON.parse(newVal)
				if(arr) {
					this.headers = JSON.parse(newVal).filter(item => {
						return item.name !== null || item.val !== null || item.desc !== null
					})
				}
			},
			immediate: true
		},
		body: {
			handler(newVal) {
				let arr = JSON.parse(newVal)
				if(arr) {
					this.bodys = JSON.parse(newVal)
				}
			},
			immediate: true
		},
		param: {
			handler(newVal) {
				let arr = JSON.parse(newVal)
				if(arr) {
					this.params = JSON.parse(newVal)
				}
			},
			immediate: true
		},
		authType: {
			handler(newVal) {
				this.selectedAuthType = newVal
			},
			immediate: true
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

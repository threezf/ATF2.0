<template>
    <div class="interface-test">
        <search-bar 
            size="small" 
            searchBtnIcon="el-icon-caret-right" 
            searchBtnText="执行"
            :conf="conf"
            @submit="handleSubmit">
        </search-bar>
        <test-tabs :header="originData.header" :body="originData.body" :params="originData.params" :bodyFormat="originData.bodyFormat" :authType="originData.authType">
            <template v-slot:append>
                <el-button type="text" size="mini" @click="cookieVisible = true">cookie管理</el-button>
                <el-tooltip placement="top" content="根据当前语言信息生成各种测试代码">
                    <el-button type="text" size="mini" style="margin-left: -10px" @click="codeVisible = true">生成测试代码</el-button>
                </el-tooltip>
            </template>
        </test-tabs>
        <test-result :originData="originData"></test-result>
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
import {
    mapState
} from 'vuex'
import {
    InterfaceTestConf
} from '@/config/testInfrastructure/interfacesManagement/interfaceDetailConf'
import Request from '../../../../libs/request'
export default {
    name: 'InterfaceTest',
    components: {
        TestTabs,
        TestResult
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
        originData: {
            type: Object,
            default: () => {}
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
            codeVisible: false
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
                this.conf[2].value = newVal.slice(0, newVal.length - 1) + this.conf[2].value
            },
            immediate: true
        }
    },
    created() {
        this.initUsecaseList();
    },
    methods: {
        handleSubmit(event) {
            console.log(event)
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
        }
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
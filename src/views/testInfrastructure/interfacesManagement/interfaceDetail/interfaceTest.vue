<template>
    <div class="interface-test">
        <search-bar 
            size="small" 
            searchBtnIcon="el-icon-caret-right" 
            searchBtnText="执行"
            :conf="conf"
            @submit="handleSubmit">
        </search-bar>
        <test-tabs>
            <template v-slot:append>
                <el-button type="text" size="mini" @click="cookieVisible = true">cookie管理</el-button>
                <el-tooltip placement="top" content="根据当前语言信息生成各种测试代码">
                    <el-button type="text" size="mini" style="margin-left: -10px" @click="codeVisible = true">生成测试代码</el-button>
                </el-tooltip>
            </template>
        </test-tabs>
        <test-result></test-result>
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
    InterfaceTestConf
} from '@/config/testInfrastructure/interfacesManagement/interfaceDetailConf'
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
    watch: {
        protocals: {
            handler(newVal) {
                if(newVal.length > 0) {
                    this.conf[0].value = newVal[0].value
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
                    this.conf[1].value = newVal[0].value
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
        }
    },
    methods: {
        handleSubmit(event) {
            console.log(event)
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
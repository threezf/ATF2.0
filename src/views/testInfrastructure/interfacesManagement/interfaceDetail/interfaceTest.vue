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
                <el-button type="text" size="mini">cookie管理</el-button>
                <el-button type="text" size="mini" style="margin-left: -10px">生成测试代码</el-button>
            </template>
        </test-tabs>
        <el-divider>测试结果</el-divider>
        <test-result></test-result>
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
            conf: InterfaceTestConf
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
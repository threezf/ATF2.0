<template>
    <div class="tab-history">
        <el-button type="danger" size="small">清空历史记录</el-button>
        <table-comp
            :tableHeader="resultHeader"
            :table-data="tableObj"
            :needPagination="false">
            <template v-slot:addressSlot="scoped">
                <p class="address">
                        <el-tag class="inner-tag" type="primary" effect="dark" size="small">GET</el-tag>{{scoped.row.address}}
                </p>
            </template>
            <template v-slot:operationSlot="scoped">
                <el-button type="text" size="small" @click="deleteResult(scoped.row)">删除</el-button>
            </template>
        </table-comp>
    </div>
</template>

<script>
import {
    ResultHeader
} from '@/config/testInfrastructure/interfacesManagement/interfaceDetailConf'
export default {
    name: 'History',
    data() {
        return {
            resultHeader: ResultHeader,
            resultData: [{
                time: '2021-04-17 09:03:57',
                address: 'http:///user/points.php',
                status: 500,
                len: '0.00ms'
            }, {
                time: '2021-04-16 22:48:36',
                address: 'http:///user/points.php',
                status: 500,
                len: '0.00ms'
            }]
        }
    },
    computed: {
        tableObj() {
            return {
                data: this.resultData
            }
        },
    },
    methods: {
         deleteResult(row) {
            console.log(row)
        },
    }
}
</script>

<style lang="less" scoped>
    .tab-history {
        min-height: 200px;
        .address {
            width: 100%;
            text-align: left; 
            margin-bottom: 0px;
            .inner-tag {
                margin-right: 5px;
            }
        }
    }
</style>
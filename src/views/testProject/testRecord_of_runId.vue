<!--
 * @Author: your name
 * @Date: 2020-05-18 09:49:18
 * @LastEditTime: 2020-05-18 11:22:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ATF2.0\src\views\testProject\testRecord-of-runId.vue
 -->
<template>
    <div>
        <el-table
                stripe
                border
                :data="tableData"
                class='table tableAuto'>
                <el-table-column
                    label="场景ID"
                    property="sceneId"
                   />
                <el-table-column
                    label="执行轮次"
                    property="executeRound"
                   />
                <el-table-column
                    label="用例编号"
                    property='caseId'
                    :formatter="roleSwitch"
                   />
                <el-table-column
                    label="节点名称"
                    property="flownodeName"
                    />
                <el-table-column
                    label="记录单状态"
                    property="recorderStatus"
                    />
                <el-table-column
                    label="执行结果状态"
                    property="executeStatus"
                   />
                <el-table-column
                    label="来源渠道"
                    property="sourceChannel"
                   />
                <el-table-column
                    label="资源路径"
                    property="resourcePath"
                   />
                <el-table-column
                    label="执行实例ID"
                    property="testexeinsId"
                   />
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                </template>
                </el-table-column>
            </el-table>
    </div>
</template>
<script>
import Request from '@/libs/request.js'
import VueMixins from '@/libs/vueMixins.js'
export default {
    mixins: [VueMixins], // 混入
    name:"testRecord-of-runId",
        data() {
            return{
                tableData:[],
            }
        },
        created() {
            
        },
        methods: {
            getRecords(){
              
            }
        },
}
</script>
<style lang="less">
    .tableAuto{
        width:90%;
        margin-left:40px;
    }
</style>
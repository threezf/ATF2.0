<template>
    <div class="response-header">
        <table-comp 
            :table-header="tableHeader"
            :table-data="{data: tableData}"
            :need-pagination="false">
            <template v-slot:labelSlot="scoped">
                <el-select v-model="scoped.row.name" size="mini">
                    <el-option v-for="(item) in options"
                        :key="item.id"
                        :label="item.value"
                        :value="item.value">

                    </el-option>
                </el-select>
            </template>
            <!-- <template v-slot:contentSlot="scoped">
            </template> -->
            <template v-slot:resultSlot="scoped">
                <el-input v-model="scoped.row.val" size="mini"></el-input>
            </template>
            <template v-slot:desctSlot="scoped">
                <el-input v-model="scoped.row.desc" size="mini"></el-input>
            </template>
            <template v-slot:operationSlot="scoped">
                <el-button type="text" size="mini" @click="addRow(scoped.index)">新增</el-button>
                <el-button type="text" size="mini" @click="deleteRow(scoped.index)">删除</el-button>
            </template>
        </table-comp>
    </div>
</template>

<script>
import {ResponseTableHeader, LabelOptions} from '@/config/testInfrastructure/checkResult/checkResultConf'

export default {
    name: 'ResponseHeader',
    data() {
        return {
            tableHeader: ResponseTableHeader,
            options: LabelOptions
        }
    },
    computed: {
        tableData: {
            get() {
                console.log('111q1',typeof this.$store.state.checkResHeader)
                return this.$store.state.checkResHeader
            },
            set(newVal) {
                this.$store.commit('setCheckResHeader', {
                    value: JSON.stringify(newVal)
                })
            }
        }
    },
    methods: {
        addRow(index) {
            this.tableData.splice(index + 1, 0, {
                name: "Content-Type",
                val: "",
                desc: ''
            })
        },
        deleteRow(index) {
            if(this.tableData.length > 1) {
                this.tableData.splice(index, 1)
            }else {
                this.$message.warning('至少有一个')
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>
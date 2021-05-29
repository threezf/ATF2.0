<template>
    <div>
        <el-button
            size="mini"
            type="primary"
            icon="el-icon-plus"
            circle
            @click="addRule"
            >
        </el-button>
        <el-table
            :data="tableData"
            row-key="selfId"
            border
            size="mini"
            default-expand-all
            :tree-props="{children: 'childs', hasChildren: 'hasChildren'}">
            <el-table-column
                label="关键字"
                prop="key">
                <template slot-scope="scoped">
                    <div class="input">
                        <el-input style="width: 130px;" size="mini" v-model="scoped.row.key"></el-input>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="断言词"
                prop="assertValue">
                <template slot-scope="scoped">
                    <el-input size="mini" v-model="scoped.row.assertValue"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                label="断言类型"
                prop="assertType">
                <template slot-scope="scoped">
                    <el-select
                        size="mini" 
                        v-model="scoped.row.assertType">
                        <el-option 
                            v-for="(item, index) in assertTypes"
                            :key="index + ''"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
             <el-table-column
                label="规则"
                prop="rule">
                <template slot-scope="scoped">
                    <el-select
                        size="mini" 
                        v-model="scoped.row.rule"
                        :disabled="scoped.row.assertType !== 3 && scoped.row.assertType !== 4">
                        <el-option 
                            v-for="(item, index) in valueTypes"
                            :key="index + ''"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                label="数组模式"
                prop="isArray">
                <template slot-scope="scoped">
                    <el-select
                        size="mini"
                        :disabled="scoped.row.assertType !== 3"
                        v-model="scoped.row.isArray">
                        <el-option 
                            v-for="(item, index) in selectOptions"
                            :key="index + ''"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                label="是否首项"
                prop="isFirst">
                <template slot-scope="scoped">
                    <el-select
                        size="mini"
                        :disabled="scoped.row.assertType !== 3"
                        v-model="scoped.row.isFirst">
                        <el-option 
                            v-for="(item, index) in selectOptions"
                            :key="index + ''"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="200">
                <template slot-scope="scoped">
                    <el-button
                        type="text"
                        size="mini"
                        @click="addSubRule(scoped.row, scoped.$index)"
                        >添加子规则
                    </el-button>
                    <el-button
                        type="text"
                        size="mini"
                        @click="removeRule(scoped.row)"
                        >删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import lodash from 'lodash';
export default {
    name: 'Assert',
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    model: {
        mode: 'data',
        event: 'onchange'
    },
    data() {
        return {
            tableData: [{
                key: "root",
                assertValue: "test",
                rule: "include =",
                isArray: false,
                isFirst: true,
                assertType: 3,
                childs: [{
                    "key": "test",
                    "assertValue": "2",
                    "rule": "value <=",
                    "isArray": true,
                    "isFirst": true,
                    "assertType": 3,
                    "childs": [{
                        "key": "test",
                        "assertValue": "2",
                        "rule": "value <=",
                        "isArray": true,
                        "isFirst": true,
                        "assertType": 3,
                        "childs": null
                    }]
                }]
            },
            {
                key: "root1",
                assertValue: "test",
                rule: "include =",
                isArray: false,
                isFirst: true,
                assertType: 3,
                childs: [{
                    "key": "test",
                    "assertValue": "2",
                    "rule": "value <=",
                    "isArray": true,
                    "isFirst": true,
                    "assertType": 3,
                    "childs": [{
                        "key": "test",
                        "assertValue": "2",
                        "rule": "value <=",
                        "isArray": true,
                        "isFirst": true,
                        "assertType": 3,
                        "childs": null
                    }]
                }]
            }],
            selectOptions: [{
                label: '是',
                value: true,
            }, {
                label: '否',
                value: false
            }],
            assertTypes: [
                {
                    name: '校验状态码',
                    value: 0,
                },
                {
                    name: '校验全文返回',
                    value: 1,
                },
                {
                    name: '校验正则匹配',
                    value: 2,
                },
                {
                    name: '校验JSON',
                    value: 3,
                },
                {
                    name: '校验XML',
                    value: 4,
                }
            ],
            valueTypes: [
                {
                    name: '相等',
                    value: 'value =',
                },
                {
                    name: '不相等',
                    value: 'value !=',
                },
                {
                    name: '大于',
                    value: 'value >',
                },
                {
                    name: '大于等于',
                    value: 'value >=',
                },
                {
                    name: '小于',
                    value: 'value <',
                },
                {
                    name: '小于等于',
                    value: 'value <=',
                },
                {
                    name: '包含',
                    value: 'include =',
                },
                {
                    name: '长度等于',
                    value: 'length =',
                },
                {
                    name: '长度不等于',
                    value: 'length !=',
                },
                {
                    name: '长度大于',
                    value: 'length >',
                },
                {
                    name: '长度大于等于',
                    value: 'length >=',
                },
                {
                    name: '长度小于',
                    value: 'length <',
                },
                {
                    name: '长度小于等于',
                    value: 'length <=',
                },
                {
                    name: '满足正则匹配',
                    value: 'reg ='
                }
            ]
        }
    },
    computed: {
        copyData() {
            return this.addKey(this.tableData)
        }
    },
    watch: {
        tableData: {
            handler(newVal) {
                if(newVal) {
                    console.log(newVal, 'new')
                    const deepCloneTable = lodash.cloneDeep(newVal);
                    this.deleteKey(deepCloneTable)
                    console.log(deepCloneTable, 'new')
                }
            },
            immediate: true,
            deep: true
        }
    },
    created() {
        this.addKey(this.tableData)
    },
    methods: {
        addRule() {
            this.tableData.push({
                selfId: parseInt(Math.random() * 100000000000),
                key: "",
                assertValue: "",
                rule: "",
                isArray: false,
                isFirst: true,
                assertType: 0,
                childs: []
            })
        },
        addSubRule(row, index) {
           console.log(row, index)
           if(row.childs === null || row.childs.length === 0) {
               row.childs = []
            }
            row.childs.push({
                selfId: parseInt(Math.random() * 100000000000),
                key: "",
                assertValue: "",
                rule: "",
                isArray: false,
                isFirst: true,
                assertType: 0,
                childs: []
            })
        },
        addKey(data) {
            let time = Date.now();
            console.log(time)
            data.forEach(item => {
                item.selfId = parseInt(Math.random() * 100000000000)
                if(item.childs) {
                    this.addKey(item.childs);
                }
            })
            return data
        },
        deleteKey(data) {
            data.forEach(item => {
                delete item.selfId
                if(item.childs) {
                    this.deleteKey(item.childs)
                }
            })
        },
        removeRule(row) {
            console.log(row)
            this.filterSub(this.tableData, row.selfId)
        },
        filterSub(data, id) {
            data.filter(item => {
                if(item.childs) {
                    console.log('filter', item, item.selfId, id)
                    this.filterSub(item.childs, id);
                }else {
                    return item.selfId != id
                }
            })
        },
        getParentArr(id) {
            this.tableData.forEach(item => {
                if(item.childs && item.childs.length > 0) {

                }else {
                    if(item.selfId === id) {

                    }
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .input {
        position: absolute;
        right: 10px;
        top: 6px;
    }
</style>
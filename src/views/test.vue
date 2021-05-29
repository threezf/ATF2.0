<template>
    <div>
        <el-table
            :data="copyData"
            row-key="selfId"
            border
            size="mini"
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
                label="规则"
                prop="rule">
                <template slot-scope="scoped">
                    {{scoped.row.rule}}
                </template>
            </el-table-column>
            <el-table-column
                label="数组模式"
                prop="isArray">
                <template slot-scope="scoped">
                    {{scoped.row.isArray}}
                </template>
            </el-table-column>
            <el-table-column
                label="是否首项"
                prop="isFirst">
                <template slot-scope="scoped">
                    {{scoped.row.isFirst}}
                </template>
            </el-table-column>
            <el-table-column
                label="assertType"
                prop="assertType">
                <template slot-scope="scoped">
                    {{scoped.row.assertType}}
                </template>
            </el-table-column>
            <el-table-column
                label="expand"
                prop="assertValue">
                <template slot-scope="scoped">
                    {{scoped.row.key}}
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
export default {
    name: 'Assert',
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        copyData() {
            return this.addKey(this.tableData)
        }
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
                        "childs": [{
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
    methods: {
        addSubRule(row, index) {
           console.log(row, index) 
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
        removeRule(row) {
            console.log(row)
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
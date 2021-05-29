<template>
    <div>
        <div class="func-top">
            <template v-if="mode === 'add'" style="display: flex;">
                <span>断言名称：</span>
                <el-input style="width: 200px" v-model="name" size="mini" placeholder="请输入断言名称"></el-input>
            </template>
            <el-button v-if="mode ==='edit'" type="text" size="small" @click="deleteInterfaceAssert">删除规则</el-button>
        </div>
        <div class="assert-tree-content">
            <div class="tree-part">
                <el-tree
                    :data="originData"
                    :props="defaultProps"
                    default-expand-all
                    :expand-on-click-node="false"
                    @node-click="handleNodeClick">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ data.key }}</span>
                        <span>
                            <el-button
                                type="text"
                                size="mini"
                                @click="() => append(data)">
                                添加子规则
                            </el-button>
                            <el-button
                                type="text"
                                size="mini"
                                @click="() => remove(node, data)">
                                删除
                            </el-button>
                        </span>
                    </span>
                </el-tree>
            </div>
            <div class="form-part">
                <el-form :model="selectedForm" ref="selectedForm" label-width="100px" class="demo-selectedForm">
                    <el-form-item label="关键字">
                        <el-input style="width: 250px;" size="small" v-model="selectedForm.key"></el-input>
                    </el-form-item>
                    <el-form-item label="断言类型">
                        <el-select
                            size="small" 
                            style="width: 250px;"
                            v-model="selectedForm.assertType">
                            <el-option 
                                v-for="(item, index) in assertTypes"
                                :key="index + ''"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="断言值">
                        <el-input style="width: 250px;" size="small" v-model="selectedForm.assertValue"></el-input>
                    </el-form-item>
                    <el-form-item label="规则">
                        <el-select
                            size="small" 
                            style="width: 250px;"
                            v-model="selectedForm.rule"
                            :disabled="selectedForm.assertType !== 3 && selectedForm.assertType !== 4">
                            <el-option 
                                v-for="(item, index) in valueTypes"
                                :key="index + ''"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数组">
                        <el-select
                            size="mini"
                            style="width: 250px;"
                            :disabled="selectedForm.assertType !== 3"
                            v-model="selectedForm.isArray">
                            <el-option 
                                v-for="(item, index) in selectOptions"
                                :key="index + ''"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="首项">
                        <el-select
                            size="mini"
                            style="width: 250px;"
                            :disabled="selectedForm.assertType !== 3"
                            v-model="selectedForm.isFirst">
                            <el-option 
                                v-for="(item, index) in selectOptions"
                                :key="index + ''"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div style="display: flex; justify-content: center; margin-top: 20px">
            <el-button size="small" @click="handleCancel">取消</el-button>
            <el-button type="primary" size="small" @click="handleSubmit">确定</el-button>
        </div>
    </div>
</template>

<script>
import Request from "@/libs/request.js";
export default {
    name: 'AssertTree',
    data() {
        return {
            defaultProps: {
                children: 'childs',
                label: 'key'
            },
            originData: [{
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
            name: '',
            selectedForm: {
                key: "",
                assertValue: "",
                rule: "",
                isArray: false,
                isFirst: true,
                assertType: 0,
            },
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
    props: {
        mode: {
            type: String,
            default: 'add'
        },
        data: {
            type: Object,
            default: () => {}
        },
        ruleName: {
            type: String,
            default: ''
        },
        caseId: {
            type: Number,
            default: 0
        }
    },
    created() {
        if(this.mode === 'add') {
            this.originData = [
                {
                    key: "key",
                    assertValue: "",
                    rule: "",
                    isArray: false,
                    isFirst: true,
                    assertType: 0,
                    childs: []
                }
            ]
        }
        this.selectedForm = this.originData[0];
    },
    methods: {
        handleCancel() {
            this.$emit('cancel')
        },
        handleSubmit() {
            Request({
                url: '/interfaceNewController/putInterfaceAssert',
                method: 'post',
                params: {
                    caseId: this.caseId,
                    ruleName: this.name,
                    caseType: '1',
                    assertNode: this.originData[0]
                }
            }).then(res => {
                console.log('管理断言', res)
                if(res.respCode === '0000') {
                    this.$message.success('新增成功')
                    this.$emit('cancel')
                }
            })
        },
        handleNodeClick(nodeData) {
            this.selectedForm = nodeData
        },
        append(data) {
            console.log(data)
            let newChild = {
                key: "new",
                assertValue: "",
                rule: "",
                isArray: false,
                isFirst: true,
                assertType: 0,
                childs: []
            }
            if(!data.childs) {
                this.$set(data, 'childs', []);
            }
            data.childs.push(newChild)
        },
        remove(node, data) {
            console.log(node, data)
            const parent = node.parent;
            const children = parent.data.childs || parent.data;
            const index = children.findIndex(d => d.id === data.id)
            children.splice(index, 1)
        },
        addRule() {
            this.originData.push({
                id: parseInt(Math.random() * 100000000000),
                key: "",
                assertValue: "",
                rule: "",
                isArray: false,
                isFirst: true,
                assertType: 0,
                childs: []
            })
        },
        deleteInterfaceAssert() {
            Request({
                url: '/interfaceNewController/deleteInterfaceAssert',
                method: 'post',
                params: {
                    caseId: this.caseId,
                    caseType: '1',
                    ruleName: this.ruleName
                }
            }).then(res => {
                console.log('管理断言', res)
                if(res.respCode === '0000') {
                    this.$message.success('删除成功')
                    this.$emit('cancel')
                }
            })
        }
    },
}
</script>

<style lang="less" scoped>
    .func-top {
        
    }
    .assert-tree-content {
        border: 1px solid #eee;
        width: 100%;
        margin-top: 10px;
        padding: 10px;
        display: flex;
        .tree-part {
            width: 350px;
            border-right: 1px solid #eee;
        }
        .form-part {
            flex: 1;
        }
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    /deep/.el-form-item {
        margin-bottom: 0px;
    }
</style>
<template>
    <div class="page-inner">
        <el-row class="border">
            <el-col :span="3">
                <el-button
                    size="small" 
                    @click='search'
                    type="primary" 
                    :icon="'el-icon-arrow-'+(searchFlag?'up':'down')">
                    {{searchInfo}}
                </el-button>
            </el-col>
            <el-col :span="4" :offset='1'>
                <el-button
                    size="small" 
                    @click='checkout'
                    type="primary">
                    切换流程用例展示
                </el-button>
            </el-col>
        </el-row>
        
        <div class='ele-container'>
            <div class="ele-left">
                <el-tree 
                    accordion
                    :data="filterTree" 
                    :props="defaultProps"
                    @node-click="handleNodeClick">
                </el-tree>
            </div>
            <div class="ele-right">
                <el-row class="itemCenter">
                    <el-col :span="3">
                        <el-button
                            size="small" 
                            @click='save'
                            type="primary" 
                            :icon="'el-icon-arrow-'+(searchFlag?'up':'down')">
                            保存
                        </el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-button
                            size="small" 
                            @click='dataTemplate'
                            type="primary">
                            下载数据模板
                        </el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-button
                            size="small" 
                            @click='exportData'
                            type="primary">
                            导出数据
                        </el-button>
                    </el-col>
                    <el-col :span="5" :offset='3'>
                        <el-select v-model="selectValue" placeholder="请选择">
                            <el-option
                            v-for="item in selectOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3" :offset='1'>
                        <el-button
                            size="small" 
                            @click='exportData'
                            type="primary">
                            用例筛选
                        </el-button>
                    </el-col>
                </el-row>
                <el-table
                    highlight-current-row
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        label="查看脚本"
                        width="180">
                        <template>
                            <el-button
                                size="small" 
                                @click='showScript(data)'
                                type="primary">
                                查看脚本
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="用例编号"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="testpoint"
                        label="测试点">
                    </el-table-column>
                    <el-table-column
                        prop="testreason"
                        label="测试意图">
                    </el-table-column>
                    <el-table-column
                        prop="testprocess"
                        label="测试步骤">
                    </el-table-column>
                    <el-table-column
                        prop="result"
                        label="预期结果">
                    </el-table-column>
                    <el-table-column
                        prop="checkpoint"
                        label="检查点">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import Request from '@/libs/request.js'
    import VueMixins from '@/libs/vueMixins.js'
    export default {
        mixins: [VueMixins],
        computed:{
            searchInfo(){
                return this.searchFlag?"收起筛选":"显示筛选"
            }
        },
        data() {
            return {
                selectValue: '',
                selectOptions: [
                    {
                        label:'测试点',
                        value:'0'
                    },
                    {
                        label:'测试意图',
                        value:'1'
                    },
                    {
                        label:'测试步骤',
                        value:'2'
                    },
                    {
                        label:'预期结果',
                        value:'3'
                    },
                    {
                        label:'检查点',
                        value:'4'
                    },
                ],
                searchFlag: false,
                filterTree: [{
                        label: '一级 1',
                        children: [{
                            label: '二级 1-1',
                            children: [{
                            label: '三级 1-1-1',
                            id:1
                            }]
                        }]
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                tableData: [{
                    date: '2016-05-02',
                    name: '登录功能点',
                    testpoint: '测试点1',
                    testreason: '是否登陆成功',
                    testprocess:'输入用户名密码',
                    result:'登录成功',
                    checkpoint:'是否有确认按钮'
                }, {
                    date: '2016-05-04',
                    name: '登录功能点',
                    testreason: '是否登陆成功',
                    testpoint: '测试点1',
                    testprocess:'输入用户名密码',
                    result:'登录失败',
                    checkpoint:'是否有确认按钮'
                }, {
                    date: '2016-05-01',
                    name: '登录功能点',
                    testreason: '是否登陆成功',
                    testpoint: '测试点1',
                    testprocess:'输入用户名密码',
                    result:'登录成功',
                    checkpoint:'是否有取消按钮'
                }, {
                    date: '2016-05-03',
                    name: '登录功能点',
                    testreason: '是否登陆成功',
                    testpoint: '测试点1',
                    testprocess:'输入用户名密码',
                    result:'登录失败',
                    checkpoint:'是否有确认按钮'
                }],
            }
        },
        mounted(){
            this.getFilterTree()
        },
        methods: {
            save(){
                console.log('save')
            },
            dataTemplate(){
                console.log('dataTemplate')
            },
            exportData(){
                console.log('exportData')
            },
            showScript(data){
                console.log(data)
            },
            search(){
                this.searchFlag = !this.searchFlag
            },
            checkout(){

            },
            handleNodeClick(data) {
                console.log(data);
            },
            //获取该测试系统下 所有的控件类型
            getFilterTree(){
                    Request({
                        url: '/dataCenter/queryFilterTree',
                        method: 'post',
                        params:{
                                "conditionList": [{
                                    "propertyName": "executor",
                                    "compareType": "=",
                                    "propertyValueList": ["3"]
                                }, {
                                    "propertyName": "executeMethod",
                                    "compareType": "=",
                                    "propertyValueList": ["2"]
                                }, {
                                    "propertyName": "scriptMode",
                                    "compareType": "=",
                                    "propertyValueList": ["1"]
                                }, {
                                    "propertyName": "caseLibId",
                                    "compareType": "=",
                                    "propertyValueList": ["1241"]
                                }]
                            }
                    }).then((res) => {
                        this.filterTree = []
                        let filterTree = res.filterTree
                        for(let i = 0; i <filterTree.length ;i++){
                            let aut = {
                                label: filterTree[i].autName,
                                id:  filterTree[i].autId,
                                children : []
                            }
                            let transactList = filterTree[i].transactList
                            for(let l = 0; l <transactList.length ;l++){
                                let trans = {
                                    label: transactList[l].transName,
                                    id:  transactList[l].transId,
                                    children : []
                                }
                                let scriptTemplateList = transactList[i].scriptTemplateList
                                for(let j = 0; j <scriptTemplateList.length ; j++){
                                    let scriptTemplate = {
                                        label: scriptTemplateList[j].scriptName,
                                        id:  scriptTemplateList[j].scriptId,
                                    }
                                    trans.children.push(scriptTemplate)
                                }
                                aut.children.push(trans)
                            }
                            this.filterTree.push(aut)
                        }
                    },(err) => {
                        console.log(err)
                    })
            },
        }
    }
</script>

<style lang="less" scoped>
.ele-container{
    display:flex;
    padding-top:15px
}
.ele-left{
    width:20%;
    min-height: 500px;
    padding:10px;
    margin-right:10px;
    background: #f4f5f7
}
.ele-right{
    width:80%;
    padding:10px;
    min-height: 500px;
    margin-right:10px;
}
.itemCenter{
    display: flex;
    align-items: center
}
</style>

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
                <div @contextmenu.prevent>
                    <el-table
                        height ="80vh"
                        border
                        highlight-current-row
                        :data="tableData"
                        @row-contextmenu="rightMenu"
                        @cell-dblclick='tdedit'
                        style="width: 100%">
                        <el-table-column
                            type="index"
                            width="50">
                        </el-table-column>
                        <el-table-column
                            label="查看脚本"
                            width="100">
                            <template  slot-scope="scope">
                                <el-button
                                    size="small" 
                                    @click='showScript(scope.row.id,scope.row.caseCompositeType)'
                                    type="primary">
                                    查看脚本
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="caseCode"
                            label="用例编号"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="testPoint"
                            label="测试点">
                        </el-table-column>
                        <el-table-column
                            prop="testDesign"
                            label="测试意图">
                        </el-table-column>
                        <el-table-column
                            fit
                            prop="testStep"
                            label="测试步骤"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="expectResult"
                            label="预期结果"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            width="150"
                            prop="checkPoint"
                            label="检查点">
                        </el-table-column>
                        <el-table-column
                            :class="item.flag?'111':'222'"
                            v-for="(item,index) in tableHead"
                            :key="index"
                            :label="item[0] + item[1]"
                            width="180">
                            <template slot-scope="scope">
                                {{ scope.row['data_'+item[1]] }}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div v-show="menuVisible">
                    <ul id="menu" class="menu">
                        <li class="menu__item">复制</li>
                        <li class="menu__item">剪切</li>
                        <li class="menu__item">粘贴</li>
                        <li class="menu__item">清除</li>
                        <li class="menu__item">查找与替换</li>
                        <li class="menu__item" @click='editData'>编辑数据</li>
                    </ul>
                </div>
            </div>
        </div>
            <el-dialog  
                title="查看脚本"
                :visible.sync="templateInfoFlag"
                width="50%">
                 <el-table
                    border
                    :data="templateInfoData"
                    style="width: 100%">
                    <el-table-column
                    type="index"
                    width="50">
                    </el-table-column>
                    <el-table-column
                        prop="operationItem"
                        label="操作项"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="classType"
                        label="控件名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="method"
                        label="方法名">
                    </el-table-column>
                    <el-table-column
                        prop="parameters"
                        label="参数">
                    </el-table-column>
                    </el-table>
            </el-dialog>
            <el-dialog  
                title="编辑数据"
                :visible.sync="editDataFlag"
                width="50%">
                 <el-table
                    border
                    :data="templateInfoData"
                    style="width: 100%">
                    <el-table-column
                        label="排序"
                        type="index"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        prop="operationItem"
                        label="操作项"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="method"
                        label="方法名">
                    </el-table-column>
                    <el-table-column
                        prop="parameters"
                        label="参数">
                    </el-table-column>
                    </el-table>
            </el-dialog>
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
                executorId: 3,// 用户Id
                caseLibId: 1241,// 用例库Id
                menuVisible:false,// 右击菜单弹窗弹窗
                templateInfoFlag: false,// 查看脚本弹窗
                editDataFlag: false,// 编辑数据弹窗
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
                filterTree: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                tableData: [],
                tableHead: [],
                templateInfoData: [], // 用来展示查看脚本弹窗table的数据
                // 筛选条件
                conditionList: [{
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
        },
        mounted(){
            this.getFilterTree()
        },
        methods: {
            //双击编辑数据
            tdedit(row, column, cell, event){
                console.log(row)
                console.log(column)
                console.log(cell)
                console.log(event)
            },
            // 编辑数据弹框
            editData(){
                this.editDataFlag = true
            },
            save(){
                console.log('save')
            },
            dataTemplate(){
                console.log('dataTemplate')
            },
            exportData(){
                console.log('exportData')
            },
            showScript(id,caseCompositeType){
                this.templateInfoFlag = true
                Request({
                    url: '/dataCenter/getTestcaseScript',
                    method: 'post',
                    params:{
                        caseCompositeType,
                        testcaseId:id
                        }
                }).then((res) => {
                    this.templateInfoData = []
                    for(let i = 0 ; i < res.scriptList.length; i++ ){
                        let info = res.scriptList[i]
                        let templateInfo = {}
                        templateInfo.operationItem = "UI: "+ info.ui +"  元素: "+ info.element
                        templateInfo.classType = info.classType
                        templateInfo.method = info.method
                        templateInfo.parameters = ''
                        for(let j = 0 ; j < info.parameters.length ; j++){
                            templateInfo.parameters += "参数"+ j +": "+info.parameters[j]+";"
                        }
                        this.templateInfoData.push( templateInfo )
                    }
                    },(err) => {
                        console.log(err)
                    })
            },
            search(){
                this.searchFlag = !this.searchFlag
            },
            checkout(){

            },
            handleNodeClick(data) {
                if(data.flag){
                    this.getTestcaseInfo(data.autId, data.transId, data.id)
                }
            },
            //获取该测试系统下 所有的控件类型
            getFilterTree(){
                    Request({
                        url: '/dataCenter/queryFilterTree',
                        method: 'post',
                        params:{
                                "conditionList": this.conditionList
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
                                let scriptTemplateList = transactList[l].scriptTemplateList
                                for(let j = 0; j <scriptTemplateList.length ; j++){
                                    let scriptTemplate = {
                                        label: scriptTemplateList[j].scriptName,
                                        id:  scriptTemplateList[j].scriptId,
                                        transId: trans.id,
                                        autId: aut.id,
                                        flag: true,
                                    }
                                    trans.children.push(scriptTemplate)
                                }
                                aut.children.push(trans)
                            }
                            console.log(aut)
                            this.filterTree.push(aut)
                        }
                    },(err) => {
                        console.log(err)
                    })
            },
            getTestcaseInfo( autId , transId , scriptId){
                Request({
                    url: '/dataCenter/queryTestcaseInfo',
                    method: 'post',
                    params:{
                            "conditionList": this.conditionList,
                            "executorId": this.executorId,
                            "caseLibId": this.caseLibId,
                            "autId": autId,
                            "transId": transId,
                            "scriptId": scriptId
                        }
                }).then((res) => {
                    this.tableData = []
                    this.tableHead = []
                    
                    for(let j = 0; j <res.tableData.length ; j++){
                        res.tableData[j].flag = false
                    }
                    this.tableData= res.tableData
                    this.tableHead= res.tableHead
                    },(err) => {
                        console.log(err)
                    })
            },
            // 右键事件
            rightMenu(	row, column, event){
                console.log( row )
                console.log( column )
                console.log( event )
                this.menuVisible = false; // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
                this.menuVisible = true; // 显示模态窗口，跳出自定义菜单栏
                var menu = document.querySelector('#menu');
                this.styleMenu(menu)
                return false
            },
            // 菜单出现位置
            styleMenu(menu) {
                menu.style.left = event.clientX + 1 + 'px';
                menu.style.top = event.clientY - 10 + 'px';
                document.addEventListener('click', this.noclick);
                // if (event.clientX > 1800) {
                //     menu.style.left = event.clientX - 100 + 'px';
                // } else {
                //     menu.style.left = event.clientX + 1 + 'px';
                // }
                // document.addEventListener('click', this.foo); // 给整个document新增监听鼠标事件，点击任何位置执行foo方法
                // if (event.clientY > 700) {
                //     menu.style.top = event.clientY - 30 + 'px';
                // } else {
                //     menu.style.top = event.clientY - 10 + 'px';
                // }
            },
            noclick() {
                // 取消鼠标监听事件 菜单栏
                this.menuVisible = false;
                document.removeEventListener('click', this.noclick); // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
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
.page-outer{
    display: block!important;
}.menu__item {
	display: block;
	line-height: 20px;
	text-align: center;
	margin:10px;
	cursor: default;
}
.menu__item:hover{
	color: #FF0000;
}

.menu {
 	height: auto;
 	width: auto;
 	position: fixed;
 	font-size: 14px;
 	text-align: left;
 	border-radius: 10px;
 	border: 1px solid #c1c1c1;
 	background-color: #ffffff;
}

li:hover {
  background-color: #E0E0E2;
  color: white;
}
</style>

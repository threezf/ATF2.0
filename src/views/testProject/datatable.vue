<template>
<div class="page-inner">
    <el-row class="border">
        <el-col :span="4">
<!--            <el-button size="small" v-popover:showSearch>筛选用例</el-button>-->
<!--            <el-popover ref="showSearch" placement="right" width="800" trigger="click">-->
<!--                <searchtestcase @condition-list='changeCondition'></searchtestcase>-->
<!--            </el-popover>-->
<!--            <el-button size="small" @click='search' type="primary">-->
<!--                查询-->
<!--            </el-button>-->
<!--        </el-col>-->
<!--        <el-col :span="4">-->
            <el-button size="small" @click='checkout' type="primary">
                切换流程用例展示
            </el-button>
        </el-col>
    </el-row>

    <div class='ele-container'>
        <div :class="'ele-left '+(saidBarShow?'':'narrow-ele-left')">
            <div class='treeDiv' v-show='saidBarShow'>
                <el-tree accordion :data="filterTree" :props="defaultProps" @node-click="handleNodeClick">
                </el-tree>
            </div>
            <div class='treeHideIcon' v-if="saidBarShow">
                <el-button size="mini" @click="saidBarShow=!saidBarShow"><i class="el-icon-d-arrow-left"></i></el-button>
            </div>
            <div class='treeShowIcon' v-else>
                <el-button size="mini" @click="saidBarShow=!saidBarShow"><i class="el-icon-d-arrow-right"></i></el-button>
            </div>
        </div>
        <div :class="'ele-right '+(saidBarShow?'':'wide-ele-right') + (fullScreen? ' full-screen' : '')">
            <el-row class="itemCenter" :gutter="20">
                <el-col :span="9">
                    <el-button size="small" @click='save' type="primary" icon="el-icon-document">
                        保存
                    </el-button>
                    <el-button v-if='selectedTemplate !== -1' size="small" @click='dataTemplate' type="primary">
                        下载数据模板
                    </el-button>
                    <el-button v-if='selectedTemplate !== -1' size="small" @click='exportData' type="primary">
                        导入数据
                    </el-button>
                </el-col>
                <el-col :span="15" v-if='selectedTemplate !== -1'>
                    <el-button v-if='!fullScreen' size="small" @click='fullScreen = true' type="primary">
                        表格全屏
                    </el-button>
                    <el-button v-else size="small" @click='fullScreen = false' type="primary">
                        取消全屏
                    </el-button>
                    <el-select style="margin-left:20px" size="small" multiple v-model="columnHidden" placeholder="请选择隐藏列">
                        <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                    <el-button size="small" @click='searchTemplate' type="primary">
                        用例筛选
                    </el-button>
                </el-col>
            </el-row>

            <div @contextmenu.prevent>
                <el-table border stripe highlight-current-row :data="tableData" :cell-class-name='cellClassName' @row-contextmenu="rightMenu" @cell-dblclick='tdedit' @cell-click='tdchoose' style="width: 100%">
                    <el-table-column type="index" width="50">
                    </el-table-column>
                    <el-table-column label="查看脚本" width="100">
                        <template slot-scope="scope">
                            <el-button size="small" @click='showScript(scope.row.id,scope.row.caseCompositeType)' type="primary">
                                查看脚本
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="caseCode" label="用例编号" width="100">
                    </el-table-column>
                    <el-table-column v-if="!columnHidden.includes('测试点')" prop="testPoint" label="测试点">
                    </el-table-column>
                    <el-table-column v-if="!columnHidden.includes('测试意图')" prop="testDesign" label="测试意图">
                    </el-table-column>
                    <el-table-column v-if="!columnHidden.includes('测试步骤')" prop="testStep" label="测试步骤" width="200">
                    </el-table-column>
                    <el-table-column v-if="!columnHidden.includes('预期结果')" prop="expectResult" label="预期结果" width="150">
                    </el-table-column>
                    <el-table-column v-if="!columnHidden.includes('检查点')" width="150" prop="checkPoint" label="检查点">
                    </el-table-column>
                    <el-table-column v-for="(item,index) in tableHead" :key="index" :label="item[0] +'-'+ item[1]" width="180">
                        <template slot-scope="scope">
                            <div v-if='scope.row.index === rowIndex && scope.column.index === columnIndex && dbeditFlag'>
                                <el-input class='editArea' type="textarea" :ref='"_"+scope.row.index+"_"+scope.column.index' @blur='loseblur(scope.row,scope.column)' @click.stop.prevent="return false" @change="handlechange(scope.row,scope.column)" :autosize="{ minRows: 2, maxRows: 5}" v-model="scope.row['data_'+item[1]]">
                                </el-input>
                            </div>
                            <div v-else style='white-space: break-spaces;'>{{ scope.row['data_'+item[1]] }}</div>

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
    <el-dialog :close-on-click-modal="false"  title="查看脚本" :visible.sync="templateInfoFlag" width="50%">
        <el-table border :data="templateInfoData" style="width: 100%" height="600">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="operationItem" label="操作项" width="180">
            </el-table-column>
            <el-table-column prop="classType" label="控件名" width="180">
            </el-table-column>
            <el-table-column prop="method" label="方法名">
            </el-table-column>
            <el-table-column prop="parameters" label="参数">
            </el-table-column>
        </el-table>
    </el-dialog>
    <el-dialog title="接口参数" :visible.sync="interFaceVisible">
        <table-comp :table-header="scriptHeader" :table-data="tableObj" :height="300">
            <template v-slot:scriptSlot="scoped">
                <span>
                    {{scoped.row.bodyTemplate | jsonParser}}
                </span>
            </template>
        </table-comp>
    </el-dialog>
    <el-dialog :close-on-click-modal="false"  title="编辑数据" :visible.sync="editDataFlag" width="50%">
        <el-row class="itemCenter">
            <el-radio v-model="dataType" label="1">文本</el-radio>
            <el-radio v-model="dataType" label="2">空文本</el-radio>
            <el-radio v-model="dataType" label="3">去除语句</el-radio>
            <el-radio v-model="dataType" label="4">表达式</el-radio>
        </el-row>
        <el-row v-show='dataType==1'>
            <el-input size="small" v-model="input1" placeholder="请输入内容"></el-input>
        </el-row>
        <el-row v-show='dataType==2'>
            <el-input size="small" placeholder="nil" disabled></el-input>
        </el-row>
        <el-row v-show='dataType==3'>
            <el-input size="small" placeholder="" disabled></el-input>
        </el-row>
        <el-row v-show='dataType==4'>
            <el-col :span="14">
                <el-input size="small" placeholder="请输入内容" v-model="input4">
                    <template slot="prepend">{expr=</template>
                    <template slot="append">}</template>
                </el-input>
            </el-col>
            <el-col :span="8" :offset="1">
                <el-button size="small" @click='插入数据' type="primary">
                    插入数据
                </el-button>
                <el-button size="small" @click='插入函数' type="primary">
                    插入函数
                </el-button>
            </el-col>
        </el-row>

        <div>
            <el-row>
                <h4> 前置操作</h4>
            </el-row>
            <el-row>
                <el-button size="small" type="primary" icon="el-icon-plus" @click='addItemShowFunction(1)'>
                    添加多项
                </el-button>
                <el-button icon="el-icon-delete" size="small" type="primary" @click='deleteTemplateInfo(1)'>
                    删除
                </el-button>
                <el-button icon="el-icon-arrow-up" size="small" type="primary" @click='eleUp(1)'>
                    上移
                </el-button>
                <el-button icon="el-icon-arrow-down" size="small" type="primary" @click='eleDown(1)'>
                    下移
                </el-button>
            </el-row>
            <el-table border ref="multipleTable" :data="beforeOperationRows" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange1" row-key="id" class="sortable1">
                <el-table-column label="排序" width="55">
                    <template slot-scope="scope">
                        <i :id='scope.row.date' class="el-icon-sort" style="color:#F56C6C;font-size:16px;cursor: pointer"></i>
                    </template>
                </el-table-column>
                <el-table-column label="选择" type="selection" width="55">
                </el-table-column>
                <el-table-column label="操作项" width="200" prop="name">
                </el-table-column>
                <el-table-column label="方法" width="180">
                    <template slot-scope="scope">
                        <el-select size="small" v-model="scope.row.functions[0].name" placeholder="请选择" @change="changeMethod(scope.row)">
                            <el-option v-for="item in funtionDic" :key="item.id" :label="item.name" :value="item.name">
                            </el-option>
                        </el-select>
                        <!-- {{scope.row.functions[0].name}} -->
                    </template>
                </el-table-column>
                <el-table-column prop="arguments" label="参数">
                    <template slot-scope="scope">
                        <div v-if='scope.row.arguShow'>
                            <el-row>
                                <el-col :span="12">
                                    <span>
                                        名称
                                    </span>
                                </el-col>
                                <el-col :span="12">
                                    <span>
                                        参数值
                                    </span>
                                </el-col>
                            </el-row>
                            <el-row v-for='item in scope.row.parameters' :key='item.name'>
                                <el-col :span="12" class='fixedHeight'>
                                    <span>
                                        {{ item.Name }}
                                    </span>
                                </el-col>
                                <el-col :span="12">
                                    <span>
                                        {{ item.Value }}
                                    </span>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-button size="mini" type="primary" icon="el-icon-edit" @click='scope.row.arguShow = false'>
                                    编辑
                                </el-button>
                            </el-row>
                        </div>
                        <div v-else>
                            <el-row>
                                <el-col :span="12">
                                    <span>
                                        名称
                                    </span>
                                </el-col>
                                <el-col :span="12">
                                    <span>
                                        参数值
                                    </span>
                                </el-col>
                            </el-row>
                            <el-row v-for='item in scope.row.parameters' :key='item.name'>
                                <el-col :span="12" class='fixedHeight'>
                                    <span>
                                        {{ item.Name }}
                                    </span>
                                </el-col>
                                <el-col :span="12">
                                    <el-input size="mini" @dragenter.stop.prevent="return false" @dragover.stop.prevent="return false" v-model="item.newValue"></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-button @click='scope.row.parameters && scope.row.parameters.forEach(v=>{v.newValue =v.Value});scope.row.arguShow = true' size="mini">
                                        取消
                                    </el-button>
                                </el-col>
                                <el-col :span="12">
                                    <el-button type="primary" size="mini" @click='scope.row.parameters && scope.row.parameters.forEach(v=>{v.Value=v.newValue}) ;scope.row.arguShow = true'>
                                        确认
                                    </el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </template>
                </el-table-column>
                <div slot="empty">
                    暂无前置数据
                </div>
            </el-table>
        </div>

        <div>
            <el-row>
                <h4> 后置操作</h4>
            </el-row>
            <el-row>
                <el-button size="small" type="primary" icon="el-icon-plus" @click='addItemShowFunction(2)'>
                    添加多项
                </el-button>
                <el-button icon="el-icon-delete" size="small" type="primary" @click='deleteTemplateInfo(2)'>
                    删除
                </el-button>
                <el-button icon="el-icon-arrow-up" size="small" type="primary" @click='eleUp(2)'>
                    上移
                </el-button>
                <el-button icon="el-icon-arrow-down" size="small" type="primary" @click='eleDown(2)'>
                    下移
                </el-button>
            </el-row>
            <el-table border ref="multipleTable" :data="afterOperationRows" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange2" row-key="id" class="sortable2">
                <el-table-column label="排序" width="55">
                    <template slot-scope="scope">
                        <i :id='scope.row.date' class="el-icon-sort" style="color:#F56C6C;font-size:16px;cursor: pointer"></i>
                    </template>
                </el-table-column>
                <el-table-column label="选择" type="selection" width="55">
                </el-table-column>
                <el-table-column label="操作项" width="200" prop="name">
                </el-table-column>
                <el-table-column label="方法" width="180">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.functions[0].name" placeholder="请选择" @change="changeMethod(scope.row)">
                            <el-option v-for="item in funtionDic" :key="item.id" :label="item.name" :value="item.name">
                            </el-option>
                        </el-select>
                        <!-- {{scope.row.functions[0].name}} -->
                    </template>
                </el-table-column>
                <el-table-column prop="arguments" label="参数">
                    <template slot-scope="scope">
                        <div v-if='scope.row.arguShow'>
                            <el-row>
                                <el-col :span="12">
                                    <span>
                                        名称
                                    </span>
                                </el-col>
                                <el-col :span="12">
                                    <span>
                                        参数值
                                    </span>
                                </el-col>
                            </el-row>
                            <el-row v-for='item in scope.row.parameters' :key='item.name'>
                                <el-col :span="12" class='fixedHeight'>
                                    <span>
                                        {{ item.Name }}
                                    </span>
                                </el-col>
                                <el-col :span="12">
                                    <span>
                                        {{ item.Value }}
                                    </span>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-button size="mini" type="primary" icon="el-icon-edit" @click='scope.row.arguShow = false'>
                                    编辑
                                </el-button>
                            </el-row>
                        </div>
                        <div v-else>
                            <el-row>
                                <el-col :span="12">
                                    <span>
                                        名称
                                    </span>
                                </el-col>
                                <el-col :span="12">
                                    <span>
                                        参数值
                                    </span>
                                </el-col>
                            </el-row>
                            <el-row v-for='item in scope.row.parameters' :key='item.name'>
                                <el-col :span="12" class='fixedHeight'>
                                    <span>
                                        {{ item.Name }}
                                    </span>
                                </el-col>
                                <el-col :span="12">
                                    <el-input size="mini" @dragenter.stop.prevent="return false" @dragover.stop.prevent="return false" v-model="item.newValue"></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-button @click='scope.row.parameters.forEach(v=>{v.newValue =v.Value});scope.row.arguShow = true' size="mini">
                                        取消
                                    </el-button>
                                </el-col>
                                <el-col :span="12">
                                    <el-button type="primary" size="mini" @click='scope.row.parameters.forEach(v=>{v.Value=v.newValue}) ;scope.row.arguShow = true'>
                                        确认
                                    </el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </template>
                </el-table-column>
                <div slot="empty">
                    暂无后置数据
                </div>
            </el-table>
        </div>

        <div>
            <el-row>
                <h4> 数据校验</h4>
            </el-row>
            <el-row>
                <el-button size="small" type="primary" icon="el-icon-plus" @click='addItemShowFunction(3)'>
                    添加多项
                </el-button>
                <el-button icon="el-icon-delete" size="small" type="primary" @click='deleteTemplateInfo(3)'>
                    删除
                </el-button>
                <el-button icon="el-icon-arrow-up" size="small" type="primary" @click='eleUp(3)'>
                    上移
                </el-button>
                <el-button icon="el-icon-arrow-down" size="small" type="primary" @click='eleDown(3)'>
                    下移
                </el-button>
            </el-row>
            <el-table border ref="multipleTable" :data="dataOperationRows" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" class="sortable3" row-key="name">
                <el-table-column label="排序" width="55">
                    <template slot-scope="scope">
                        <i :id='scope.row.date' class="el-icon-sort" style="cursor:pointer"></i>
                    </template>
                </el-table-column>
                <el-table-column label="选择" type="selection" width="55">
                </el-table-column>
                <el-table-column label="操作项" width="200" prop="name">
                </el-table-column>
                <el-table-column label="方法" width="180">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.id" placeholder="请选择" @change="changeMethod(scope.row,true)">
                            <el-option v-for="item in dataCheckFunList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="arguments" label="参数">
                    <template slot-scope="scope">
                        <div v-if='scope.row.arguShow'>
                            <el-row>
                                <el-col :span="12">
                                    <span>
                                        名称
                                    </span>
                                </el-col>
                                <el-col :span="12">
                                    <span>
                                        参数值
                                    </span>
                                </el-col>
                            </el-row>
                            <el-row v-for='item in scope.row.parameters' :key='item.name'>
                                <el-col :span="12" class='fixedHeight'>
                                    <span>
                                        {{ item.Name }}
                                    </span>
                                </el-col>
                                <el-col :span="12">
                                    <span>
                                        {{ item.Value }}
                                    </span>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-button size="mini" type="primary" icon="el-icon-edit" @click='scope.row.arguShow = false'>
                                    编辑
                                </el-button>
                            </el-row>
                        </div>
                        <div v-else>
                            <el-row>
                                <el-col :span="12">
                                    <span>
                                        名称
                                    </span>
                                </el-col>
                                <el-col :span="12">
                                    <span>
                                        参数值
                                    </span>
                                </el-col>
                            </el-row>
                            <el-row v-for='item in scope.row.parameters' :key='item.name'>
                                <el-col :span="12" class='fixedHeight'>
                                    <span>
                                        {{ item.name }}
                                    </span>
                                </el-col>
                                <el-col :span="12">
                                    <el-input size="mini" @dragenter.stop.prevent="return false" @dragover.stop.prevent="return false" v-model="item.newvalue"></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-button @click='scope.row.parameters.forEach(v=>{v.newValue =v.Value});scope.row.arguShow = true' size="mini">
                                        取消
                                    </el-button>
                                </el-col>
                                <el-col :span="12">
                                    <el-button type="primary" size="mini" @click='scope.row.parameters.forEach(v=>{v.Value=v.newValue}) ;scope.row.arguShow = true'>
                                        确认
                                    </el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </template>
                </el-table-column>
                <div slot="empty">
                    暂无数据校验
                </div>
            </el-table>
        </div>
        <el-row type="flex" justify="center">
            <el-button size="small" type='primary' @click="transData">保存</el-button>
            <el-button size="small" type='primary' @click="editDataFlag = false">取消</el-button>
        </el-row>
    </el-dialog>
    <el-dialog title="添加多项" :visible.sync="addItemShow" width="30%">
        <uiEleFunTree @closeDialog="addItemShow = false" @throwTreeInfo="addTreeInfo" :transId='selectedTemplate.transId + ""' :autId='selectedTemplate.autId + ""' :addItemFlag='addItemFlag' :multiselection='true'>
        </uiEleFunTree>
    </el-dialog>
    <el-dialog title="用例筛选" :visible.sync="searchTemplateDailog" width="30%">
        <searchtestcase @condition-list='changeCondition'></searchtestcase>
    </el-dialog>
    <el-dialog title="批量添加元素" :visible.sync="exportDialog" width='30%'>
        <el-upload class="upload-demo" ref="upload" :action="actionUrl" :on-success='tempSuccess' :on-error='tempError' :limit="1" :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </el-upload>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="exportDialog = false">关闭</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import Request from '@/libs/request.js'
import VueMixins from '@/libs/vueMixins.js'
import uiEleFunTree from '@/components/transactDetail/uiEleFunTree'
import searchtestcase from '@/components/searchTestcase/index'
import TableComp from '@/components/frames/table/index'
import draggable from 'vuedraggable'
import Sortable from 'sortablejs';
import {TableHeader} from '@/config/testProject/datableConfig'
export default {
    mixins: [VueMixins],
    components: {
        uiEleFunTree,
        searchtestcase,
        draggable,
        TableComp
    },
    computed: {
        searchInfo() {
            return this.searchFlag ? "收起筛选" : "显示筛选"
        },
        actionUrl() {
            return this.publishActionUrl + '?' + 'caseLibId=' + this.caseLibId + '&' + 'uploadUserId=3'
        },
        tableObj() {
            return {
                data: this.scriptTableData,
                pageTotal: 1
            }
        }
    },
    data() {
        let caseLibId = sessionStorage.getItem('caselibId')
        return {
            scriptHeader: TableHeader,
            publishActionUrl: 'http://140.143.16.21:8080/atfcloud2.0a/dataCenter/importDataFromFile',
            columnHidden: [], // 隐藏的列
            selectedTemplate: -1, // 选中的行
            editedData: {},
            rowIndex: -1, //选中的行
            columnIndex: -1, //选中的列
            dbeditFlag: false, //双击可编辑标志
            executorId: 3, // 用户Id
            caseLibId: caseLibId, // 用例库Id
            menuVisible: false, // 右击菜单弹窗弹窗
            templateInfoFlag: false, // 查看脚本弹窗
            editDataFlag: false, // 编辑数据弹窗
            selectOptions: [{
                    label: '测试点',
                    value: '0'
                },
                {
                    label: '测试意图',
                    value: '1'
                },
                {
                    label: '测试步骤',
                    value: '2'
                },
                {
                    label: '预期结果',
                    value: '3'
                },
                {
                    label: '检查点',
                    value: '4'
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
                "propertyValueList": [caseLibId]
            }],
            rowdata: {},
            columndata: undefined,
            rowColumn: '',
            beforeOperationRows: [],
            afterOperationRows: [],
            dataOperationRows: [],
            dataType: '1',
            addItemShow: false,
            input4: '',
            input1: '',
            saidBarShow: true,
            searchTemplateDailog: false,
            exportDialog: false,
            funtionDic: {},
            // 区分是添加哪个 前置操作后置操作
            addItemFlag: -1,
            timer: '',
            multipleSelection: [],
            multipleSelection1: [],
            multipleSelection2: [],
            dataCheckFunList: [],
            fullScreen: false,
            // 接口参数化
            interFaceVisible: false,
            scriptTableData: []
        }
    },
    mounted() {
        if (!sessionStorage.getItem('caselibId')) {
            console.log('123')
            this.$message({
                type: 'warning',
                message: '请选择测试项目！'
            })
            setTimeout(_ => {
                this.$router.push({
                    name: 'testProject'
                })
            }, 0)
            return
        }
        this.getFilterTree()
    },
    filters: {
        jsonParser(val) {
            console.log('格式化', val)
            return JSON.stringify(JSON.parse(val), null, "\n")
        }
    },
    methods: {
        getFunction() {
            this.funtionDic = []
            // selectedTemplate.transId
            // selectedTemplate.autId
            Request({
                url: '/aut/selectFunctionSet',
                method: 'post',
                params: {
                    autId: this.selectedTemplate.autId,
                    companyId: JSON.parse(localStorage.getItem('loginInfo')).companyId
                }
            }).then(resp => {
                this.funtionDic = resp.omMethodRespDTOList
            })
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        tempError(response, file, fileList) {
            this.$message.error({
                message: response.respMsg
            })
        },
        tempSuccess(response, file, fileList) {
            if (response.respCode !== '0000') {
                this.$message.error({
                    message: response.respMsg
                })
                return
            }
            this.exportDialog = false
            this.$message.success('上传成功')

            this.getTestcaseInfo()
        },
        // 接受添加多项的
        async addTreeInfo(tree) {
            console.log("qqqqq" + this.beforeOperationRows)
            let treeInfo = tree.elementTree
            let functionInfo = tree.functionTree
            console.log('treeInfo', treeInfo)
            console.log('functionInfo', functionInfo)

            let rows = undefined
            if (this.addItemFlag == 1) {
                rows = this.beforeOperationRows
                for (let i = 0; i < functionInfo.length; i++) {
                    var beforeItem = {
                        arguShow: true,
                        name: "UI：" + treeInfo[0].uiname + " 元素：" + treeInfo[0].elementName,
                        functions: [{
                            name: functionInfo[i].name,
                            parameterlist: ""
                        }],
                        id: functionInfo[i].id,
                        operation: {
                            classType: "",
                            element: "",
                            ui: ""
                        },
                        parameters: functionInfo[i].arguments ? functionInfo[i].arguments.map(item => ({
                            Name: item.name,
                            Value: '',
                            newValue: '',
                        })) : [],
                        selected: false,
                    }
                    this.beforeOperationRows.push(beforeItem)
                    console.log("wwwww" + beforeItem)
                    console.log("wwwww" + this.beforeOperationRows)
                }

            }
            if (this.addItemFlag == 2) {
                rows = this.afterOperationRows
                for (let i = 0; i < functionInfo.length; i++) {
                    var afterItem = {
                        arguShow: true,
                        // name: "UI：" + treeInfo[0].uiname + " 元素：" + treeInfo[0].elementName,
                        functions: [{
                            name: functionInfo[i].name,
                            parameterlist: ""
                        }],
                        id: functionInfo[i].id,
                        operation: {
                            classType: "",
                            element: "",
                            ui: ""
                        },
                        parameters: functionInfo[i].arguments ? functionInfo[i].arguments.map(item => ({
                            Name: item.name,
                            Value: '',
                            newValue: '',
                        })) : [],
                        selected: false,
                    }
                    this.afterOperationRows.push(afterItem)
                }
            }
            if (this.addItemFlag == 3) {
                rows = this.dataOperationRows
                for (let i = 0; i < functionInfo.length; i++) {
                    var addItem = {
                        arguShow: true,
                        name: "UI：" + treeInfo[0].uiname + " 元素：" + treeInfo[0].elementName,
                        functions: {
                            name: functionInfo[i].name,
                            parameterlist: ""
                        },
                        id: functionInfo[i].id,
                        operation: {
                            classType: "",
                            element: "",
                            ui: ""
                        },
                        parameters: functionInfo[i].arguments ? functionInfo[i].arguments.map(item => ({
                            Name: item.name,
                            Value: '',
                            newValue: '',
                        })) : [],
                        selected: false,
                    }
                    this.dataOperationRows.push(addItem)
                }
            }

            // 获取方法信息 并且将信息渲染到afer或者befor上

            return
        },
        changeMethod(item, flag) {
            console.log(item)
            let functionName = item.functions[0].name
            let theFunction = {}
            if (flag) {
                theFunction = this.dataCheckFunList
            } else {
                theFunction = this.funtionDic.filter(item => {
                    return item.name === functionName
                })[0]
            }
            item.parameters = theFunction.arguments ? JSON.parse(theFunction.arguments).map(item => ({
                    Name: item.name,
                    Value: '',
                    newValue: ''
                })) :
                []
            theFunction
        },
        addItemShowFunction(flag) {
            this.addItemFlag = flag
            this.addItemShow = true
        },
        deleteTemplateInfo(flag) {
            if (flag == 1) {
                console.log(this.beforeOperationRows.filter(item => !item.selected))
                this.beforeOperationRows = this.beforeOperationRows.filter(item => !item.selected)
            }
            if (flag == 2) {
                console.log(this.afterOperationRows.filter(item => !item.selected))
                this.afterOperationRows = this.afterOperationRows.filter(item => !item.selected)
            }
            if (flag == 3) {
                console.log(this.dataOperationRows.filter(item => !item.selected))
                this.dataOperationRows = this.dataOperationRows.filter(item => !item.selected)
            }
        },
        eleUp(type) {
            if (type == 1) {
                let flag2 = false
                for (let i = 0; i < this.beforeOperationRows.length; i++) {
                    if (this.multipleSelection1.some(v => (v.id === this.beforeOperationRows[i].id))) {
                        if (flag2) {
                            let tmp = this.beforeOperationRows.splice(i, 1)[0]
                            this.beforeOperationRows.splice(i - 1, 0, tmp)
                        }
                    } else {
                        flag2 = true
                    }
                }
            } else if (type == 2) {
                let flag3 = false
                for (let i = 0; i < this.afterOperationRows.length; i++) {
                    if (this.multipleSelection2.some(v => (v.id === this.afterOperationRows[i].id))) {
                        if (flag3) {
                            let tmp = this.afterOperationRows.splice(i, 1)[0]
                            this.afterOperationRows.splice(i - 1, 0, tmp)
                        }
                    } else {
                        flag3 = true
                    }
                }
            } else if (type == 3) {
                let flag3 = false
                for (let i = 0; i < this.dataOperationRows.length; i++) {
                    if (this.multipleSelection.some(v => (v.id === this.dataOperationRows[i].id))) {
                        if (flag3) {
                            let tmp = this.dataOperationRows.splice(i, 1)[0]
                            this.dataOperationRows.splice(i - 1, 0, tmp)
                        }
                    } else {
                        flag3 = true
                    }
                }
            }

        },
        eleDown(type) {
            if (type === 1) {
                let flag = false
                for (let i = this.beforeOperationRows.length - 1; i > -1; i--) {

                    if (this.multipleSelection1.some(v => (v.id === this.beforeOperationRows[i].id))) {
                        if (flag) {
                            let tmp = this.beforeOperationRows.splice(i, 1)[0]
                            this.beforeOperationRows.splice(i + 1, 0, tmp)
                        }
                    } else {
                        flag = true
                    }
                }
            } else if (type == 2) {
                let flag3 = false
                for (let i = this.afterOperationRows.length - 1; i > -1; i--) {

                    if (this.multipleSelection2.some(v => (v.id === this.afterOperationRows[i].id))) {
                        if (flag3) {
                            let tmp = this.afterOperationRows.splice(i, 1)[0]
                            this.afterOperationRows.splice(i + 1, 0, tmp)
                        }
                    } else {
                        flag3 = true
                    }
                }
            } else if (type == 3) {
                let flag3 = false
                for (let i = this.dataOperationRows.length - 1; i > -1; i--) {

                    if (this.multipleSelection.some(v => (v.id === this.dataOperationRows[i].id))) {
                        if (flag3) {
                            let tmp = this.dataOperationRows.splice(i, 1)[0]
                            this.dataOperationRows.splice(i + 1, 0, tmp)
                        }
                    } else {
                        flag3 = true
                    }
                }
            }

        },
        //拖拽行
        rowDrop() {
            const tbody = document.querySelector('.sortable1 tbody')
            const _this = this
            console.log("偶吼吼", tbody)
            Sortable.create(tbody, {
                filter: ".el-input__inner", // 不需要拖动的元素
                preventOnFilter: false, //默认true 是否禁用默认绑定的方法
                animation: 180, // 0.18s 动画时间
                delay: 0, // 按住、松开0毫秒后触发效果
                onEnd({
                    newIndex,
                    oldIndex
                }) {
                    const currRow = _this.beforeOperationRows.splice(oldIndex, 1)[0]
                    _this.beforeOperationRows.splice(newIndex, 0, currRow)
                    _this.beforeOperationRows.push(_this.beforeOperationRows.pop())
                }
            })
            const tbody2 = document.querySelector('.sortable2 tbody')
            console.log("偶吼吼", tbody2)
            Sortable.create(tbody2, {
                filter: ".el-input__inner", // 不需要拖动的元素
                preventOnFilter: false, //默认true 是否禁用默认绑定的方法
                animation: 180, // 0.18s 动画时间
                delay: 0, // 按住、松开0毫秒后触发效果
                onEnd({
                    newIndex,
                    oldIndex
                }) {
                    const currRow = _this.afterOperationRows.splice(oldIndex, 1)[0]
                    _this.afterOperationRows.splice(newIndex, 0, currRow)
                    _this.afterOperationRows.push(_this.afterOperationRows.pop())
                }
            })
            const tbody3 = document.querySelector('.sortable3 tbody')
            console.log("偶吼吼", tbody3)
            Sortable.create(tbody3, {
                filter: ".el-input__inner", // 不需要拖动的元素
                preventOnFilter: false, //默认true 是否禁用默认绑定的方法
                animation: 180, // 0.18s 动画时间
                delay: 0, // 按住、松开0毫秒后触发效果
                onEnd({
                    newIndex,
                    oldIndex
                }) {
                    const currRow = _this.dataOperationRows.splice(oldIndex, 1)[0]
                    _this.dataOperationRows.splice(newIndex, 0, currRow)
                    _this.dataOperationRows.push(_this.dataOperationRows.pop())
                }
            })

        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            for (var i = 0; i < this.multipleSelection.length; i++) {
                this.multipleSelection[i].selected = true
            }
            console.log('multipleSelection3', this.multipleSelection)
        },
        handleSelectionChange1(val) {
            this.multipleSelection1 = val;
            for (var i = 0; i < this.multipleSelection1.length; i++) {
                this.multipleSelection1[i].selected = true
            }
            console.log('multipleSelection1', this.multipleSelection1)
        },
        handleSelectionChange2(val) {
            this.multipleSelection2 = val;
            for (var i = 0; i < this.multipleSelection2.length; i++) {
                this.multipleSelection2[i].selected = true
            }
            console.log('multipleSelection2', this.multipleSelection2)
        },
        // 编辑数据弹框
        editData(row, column) {
            console.log(row)
            console.log(column)
            // handlechange(scope.row,scope.column)
            this.editDataFlag = true
            console.log(this.rowdata['data_' + this.rowColumn])
            let cellData = this.rowdata['data_' + this.rowColumn]
            if (cellData) {
                this.beforeOperationRows = [];
                this.afterOperationRows = [];
                this.dataOperationRows = [];
                if (cellData.includes('@before')) {
                    var beforeStr = cellData.slice(cellData.indexOf('@before\n') + 7, cellData.indexOf('@value'));
                    console.log("beforeSte:" + beforeStr);
                    var beforeArr = beforeStr.split(';\n');
                    console.log("beforeArr:" + beforeArr);
                    this.parseScript(beforeArr, this.beforeOperationRows, 1)
                }
                if (cellData.includes('@after')) {
                    var afterStr = cellData.slice(cellData.indexOf('@after\n') + 6, cellData.indexOf('@display') === -1 ? undefined : cellData.indexOf('@display'));
                    var afterArr = afterStr.split(';\n');
                    this.parseScript(afterArr, this.afterOperationRows, 2);
                }
                if (cellData.includes('@display')) {
                    var checkStr = cellData.slice(cellData.indexOf('@display\n') + 6);
                    var checkArr = checkStr.split(';\n');
                    this.parseScript(checkArr, this.dataOperationRows, 2);
                }
                var valueStr;
                if (cellData.includes('@value')) {
                    var endIndex = cellData.includes('@after') ? cellData.indexOf('@after') : cellData.length;
                    valueStr = cellData.slice(cellData.indexOf('@value') + 6, endIndex).replace(/^\s$/g, '');
                } else {
                    valueStr = cellData;
                }
                if (valueStr.replace(/^\s$/g, '') == '') {
                    this.dataType = 3;
                } else if (valueStr.replace(/^\s$/g, '') == 'nil') {
                    this.dataType = 2;
                } else if (valueStr.includes('{expr=')) {
                    this.dataType = 4;
                    let str = valueStr.split('{expr=')[1]
                    var value = str.slice(0, str.indexOf('}'));
                    this.input4 = valueStr
                } else {
                    this.dataType = 1;
                    this.input1 = valueStr
                }
            }
            clearTimeout(this.timer); //清除延迟执行
            this.timer = setTimeout(() => { //设置延迟执行
                this.rowDrop()
            }, 1000);

        },
        parseScript(strArray, operationRows, type) {
            var length = type === 1 ? strArray.length - 1 : strArray.length;
            if (strArray.length) {
                for (let i = 0; i < length; i++) {
                    let str = strArray[i].trim()
                    if (!str.length) return;
                    // @before\nUI('aa').WebElement('bb').click('a','b','c');UI('a2').WebElement('b2').click('a','b','c');\n@value\n{expr= }\n@after\nUI('aa').WebElement('bb').click('a','b','c');UI('a2').WebElement('b2').click('a','b','c');
                    if (str.includes('UI(')) {
                        var script = str.split(').');
                        var operation = {};
                        var arr = script[1].split('(');
                        // UI('aa'  --> aa
                        operation.ui = script[0].slice(script[0].indexOf('UI(') + 4, -1);
                        // WebElement('bb' --> WebElement  &  bb
                        operation.classType = arr[0];
                        operation.element = arr[1].slice(1, -1);
                        // click('a','b','c') --> click
                        var functions = [];
                        functions.push({
                            name: script[2].slice(0, script[2].indexOf('(')),
                            parameterlist: ''
                        });
                        // click('a','b','c') --> 'a','b','c' --> ['a', 'b', 'c'] --> parameters: [{ Name: 'para1', Value: 'a' }]
                        var paraArr = script[2].slice(script[2].indexOf('(') + 1, -1).split(',');
                        var parameters = [];
                        for (let j = 0; j < paraArr.length; j++) {
                            var o = {}
                            o.Name = 'para' + (j + 1)
                            o.Value = paraArr[j].slice(1, -1)
                            o.newValue = paraArr[j].slice(1, -1)
                            parameters.push(o)
                        }
                    } else {
                        var operation = {};
                        operation.ui = '';
                        operation.classType = '';
                        operation.element = '';
                        var index = str.indexOf('(');
                        var functions = [{
                            name: str.slice(0, index),
                            parameterlist: ''
                        }];
                        var paraStr = str.slice(index + 1, -1);
                        var parameters = [];
                        var paraArr = paraStr.split(',');
                        for (let j = 0; j < paraArr.length; j++) {
                            var o = {}
                            o.Name = 'para' + (j + 1)
                            o.Value = paraArr[j].slice(1, -1)
                            o.newValue = paraArr[j].slice(1, -1)
                            parameters.push(o)
                        }
                    }

                    operationRows.push({
                        id: Symbol(),
                        operation,
                        functions,
                        parameters,
                        arguShow: true,
                        selected: false,
                    })
                }
            }
        },
        handlechange(row, column) {
            console.log(column)
            let widgetName = column.label.split('-')[0],
                colName = column.label.split('-')[1]
            if (this.editedData[row.id]) {
                this.editedData[row.id].dataList.push({
                    widgetName,
                    colName,
                    data: row['data_' + colName]
                })
            } else {
                this.editedData[row.id] = {
                    testcaseId: row.id,
                    caseCompositeType: row.caseCompositeType,
                    dataList: [{
                        widgetName,
                        colName,
                        data: row['data_' + colName]
                    }]
                }
            }
        },
        loseblur() {
            this.dbeditFlag = false
        },
        // 给row 和 column 添加数据
        cellClassName({
            row,
            column,
            rowIndex,
            columnIndex
        }) {
            row.index = rowIndex
            column.index = columnIndex
            if (rowIndex === this.rowIndex && columnIndex === this.columnIndex) {
                return 'choosed'
            }
        },
        tdedit(row, column, cell, event) {
            console.log("dbclick")
            this.dbeditFlag = true
            const _this = this
            console.log(row.index + '_' + column.index)
            let rowColumn = "_" + row.index + '_' + column.index
            // 当输入框渲染出时，获得焦点
            setTimeout(function () {
                _this.$refs[rowColumn][0].focus()
            }, 1)

        },
        //单击选中单元格
        tdchoose(row, column, cell, event) {
            console.log(row)
            console.log(column)
            console.log(cell)
            console.log(event)
            this.rowIndex = row.index
            this.columnIndex = column.index
        },
        save() {
            console.log('object.values(editedData)', Object.values(this.editedData))
            if (this.editedData.length === 0) {
                return
            }
            Request({
                url: '/dataCenter/saveTableData',
                method: 'post',
                params: {
                    data: Object.values(this.editedData)
                }
            }).then((res) => {
                console.log("nimalegebasihdlia;jksjdfhhakfhj")
                console.log(res)
                this.$message(res.respMsg)
                this.editedData = []
            }, (err) => {
                console.log(err)
            })
        },
        dataTemplate() {
            console.log('this.selectedTemplate.id', this.selectedTemplate.id)
            console.log(this.selectedTemplate)
            let qs = require('qs');
            console.log(this.conditionList)
            Request({
                url: '/dataCenter/newDownloadDataFile',
                // headers: { 'content-type': 'application/x-www-form-urlencoded' },
                method: 'post',
                params: {
                    "conditionList": this.conditionList,
                    "autId": this.selectedTemplate.autId,
                    "transId": this.selectedTemplate.transId,
                    "scriptId": this.selectedTemplate.id
                },
                // _type: 'file'
            }).then(res => {

                let url = 'http://140.143.16.21:8080/' + res.filePath.split('/webapps/')[1]
                //console.log( url)
                window.location.href = url
                // let url = window.URL.createObjectURL(new Blob([res]))
                //download(url);

                // const blob = new Blob([res])
                // console.log(blob)
                // return blob
            })

        },
        exportData() {
            this.exportDialog = true
        },
        searchTemplate() {
            this.searchTemplateDailog = true
        },
        showScript(id, caseCompositeType) {
            Request({
                url: '/dataCenter/getTestcaseScript',
                method: 'post',
                params: {
                    caseCompositeType,
                    testcaseId: id
                }
            }).then((res) => {
                console.log('查看娇嫩',res)
                this.scriptTableData = []
                if(res.hasOwnProperty('urlPath')) {
                    this.interFaceVisible = true
                    let obj = {}
                    obj.path = res.urlPath,
                    obj.method = res.method
                    obj.protocol = res.protocol
                    obj.bodyTemplate = res.bodyTemplate
                    this.scriptTableData.push(obj)
                    console.log('查看娇嫩', "接口")
                }else {
                    this.templateInfoFlag = true
                    this.templateInfoData = []
                    for (let i = 0; i < res.scriptList.length; i++) {
                        let info = res.scriptList[i]
                        let templateInfo = {}
                        templateInfo.operationItem = "UI: " + info.ui + "  元素: " + info.element
                        templateInfo.classType = info.classType
                        templateInfo.method = info.method
                        templateInfo.parameters = ''
                        for (let j = 0; j < info.parameters.length; j++) {
                            templateInfo.parameters += "参数" + j + ": " + info.parameters[j] + ";"
                        }
                        this.templateInfoData.push(templateInfo)
                    }
                }
            }, (err) => {
                this.$message.warning(err)
            })
        },
        search() {
            this.getFilterTree()
        },
        checkout() {
            this.$router.push({
                name: 'DatatableFlowcase'
            })
        },
        handleNodeClick(data) {
            console.log('data======================================')
            console.log(data)
            if (data.flag) {
                this.selectedTemplate = data
                this.getTestcaseInfo()
                this.getFunction()
                this.getCheckFunTree()
            }
        },
        //获取该测试系统下 所有的控件类型
        getFilterTree() {
            Request({
                url: '/dataCenter/queryFilterTree',
                method: 'post',
                params: {
                    "conditionList": this.conditionList
                }
            }).then((res) => {
                this.filterTree = []
                let filterTree = res.filterTree
                for (let i = 0; i < filterTree.length; i++) {
                    let aut = {
                        label: filterTree[i].autName,
                        id: filterTree[i].autId,
                        children: []
                    }
                    let transactList = filterTree[i].transactList
                    for (let l = 0; l < transactList.length; l++) {
                        let trans = {
                            label: transactList[l].transName,
                            id: transactList[l].transId,
                            children: []
                        }
                        let scriptTemplateList = transactList[l].scriptTemplateList
                        for (let j = 0; j < scriptTemplateList.length; j++) {
                            let scriptTemplate = {
                                label: scriptTemplateList[j].scriptName,
                                id: scriptTemplateList[j].scriptId,
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
            }, (err) => {
                console.log(err)
            })
        },
        getTestcaseInfo() {
            console.log(this.selectedTemplate)
            Request({
                url: '/dataCenter/queryTestcaseInfo',
                method: 'post',
                params: {
                    "conditionList": this.conditionList,
                    "executorId": this.executorId,
                    "caseLibId": this.caseLibId,
                    "autId": this.selectedTemplate.autId,
                    "transId": this.selectedTemplate.transId,
                    "scriptId": this.selectedTemplate.id
                }
            }).then((res) => {
                this.tableData = []
                this.tableHead = []
                this.rowIndex = -1 //选中的行清空状态
                this.columnIndex = -1 //选中的列清空状态
                for (let j = 0; j < res.tableData.length; j++) {
                    res.tableData[j].flag = false
                }
                this.tableData = res.tableData
                this.tableHead = res.tableHead
            }, (err) => {
                console.log(err)
            })
        },
        // 右键事件
        rightMenu(row, column, event) {
            this.rowdata = row
            this.columndata = column
            this.rowColumn = column.label.split('-')[1]
            this.rowIndex = row.index
            this.columnIndex = column.index
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
        },
        noclick() {
            // 取消鼠标监听事件 菜单栏
            this.menuVisible = false;
            document.removeEventListener('click', this.noclick); // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
        },
        changeCondition(conditionlist) {
            console.log(conditionlist)
            this.conditionList.splice(4)
            this.conditionList = this.conditionList.concat(conditionlist)
        },
        transData() {
            let str = ''
            if (this.beforeOperationRows.length > 0) {
                str = str + '@before\n'
                for (let i = 0; i < this.beforeOperationRows.length; i++) {
                    if (this.beforeOperationRows[i].parameters.length !== 0) {
                        str += `${this.beforeOperationRows[i].functions[0].name}("${this.beforeOperationRows[i].parameters[0].Value}"`
                        for (let j = 1; j < this.beforeOperationRows[i].parameters.length; j++) {
                            str += `,"${this.beforeOperationRows[i].parameters[j].Value}"`
                        }
                        str += ');\n'
                    } else {
                        str += `${this.afterOperationRows[i].functions[0].name}()"`
                    }
                }
            }
            str += `@value ${this.input1}\n`
            if (this.afterOperationRows.length > 0) {
                str = str + '@after\n'
                for (let i = 0; i < this.afterOperationRows.length; i++) {
                    if (this.afterOperationRows[i].parameters.length !== 0) {
                        str += `${this.afterOperationRows[i].functions[0].name}("${this.afterOperationRows[i].parameters[0].Value}"`
                        for (let j = 1; j < this.afterOperationRows[i].parameters.length; j++) {
                            str += `,"${this.afterOperationRows[i].parameters[j].Value}"`
                        }
                        str += ');\n'
                    } else {
                        str += `${this.afterOperationRows[i].functions[0].name}()`
                    }
                }
            }
            if (this.dataOperationRows.length > 0) {
                str = str + '@display\n'
                for (let i = 0; i < this.dataOperationRows.length; i++) {
                    if (this.dataOperationRows[i].parameters.length !== 0) {
                        str += `${this.dataOperationRows[i].functions.name}("${this.dataOperationRows[i].parameters[0].Value}"`
                        for (let j = 1; j < this.dataOperationRows[i].parameters.length; j++) {
                            str += `,"${this.dataOperationRows[i].parameters[j].Value}"`
                        }
                        str += ');\n'
                    } else {
                        str += `${this.dataOperationRows[i].functions.name}()`
                    }
                }
            }
            this.rowdata['data_' + this.rowColumn] = str
            this.editDataFlag = false
            // console.log(str)
            this.handlechange(this.rowdata, this.columndata)
        },
        getCheckFunTree() {
            Request({
                url: '/aut/selectCheckFunctionSet',
                method: 'post',
                params: {
                    'id': +this.selectedTemplate.autId
                }
            }).then((res) => {
                this.dataCheckFunList = res.omMethodRespDTOList
            }, (err) => {
                console.log(err)
            }).catch((err) => {
                console.log(err)
            })
        },
    }
}
</script>

<style lang="less" scoped>
.ele-container {
    display: flex;
    padding-top: 15px
}

.ele-left {
    width: 20%;
    min-height: 500px;
    padding: 10px;
    margin-right: 10px;
    background: #f4f5f7
}

.ele-right {
    width: 80%;
    padding: 10px;
    min-height: 500px;
    margin-right: 10px;
}

.full-screen {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #eee;
    z-index: 99;
}

.itemCenter {
    display: flex;
    align-items: center
}

.page-outer {
    display: block !important;
}

.menu__item {
    display: block;
    line-height: 20px;
    text-align: center;
    margin: 10px;
    cursor: default;
}

.menu__item:hover {
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

.el-col {
    height: 40px;
    line-height: 40px;
}
</style><style>
.choosed {
    background: #aad2fb !important;
}

.editArea {
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0;
}

.treeDiv {
    width: 100%;
    display: inline-block;
}

.treeHideIcon {
    width: 10%;
    display: inline-block;
    position: absolute;
    right: 12px;
    top: 10px;
}

.treeShowIcon {
    width: 100%;
    display: inline-block;
    position: absolute;
    right: -3px;
}

.ele-left {
    position: relative;
}

.narrow-ele-left {
    width: 3% !important;
}

.wide-ele-right {
    width: 96% !important;
}
</style>

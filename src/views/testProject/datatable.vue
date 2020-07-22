<template>
    <div class="page-inner">
        <el-row class="border">
            <el-col :span="4">
                <el-button v-popover:showSearch>筛选用例</el-button>
                <el-popover
                ref="showSearch"
                placement="right"
                width="800"
                trigger="click">
                    <searchtestcase @condition-list='changeCondition'></searchtestcase>
                </el-popover>
                <el-button
                    @click='search'
                    type="primary" >
                    查询
                </el-button>
            </el-col>
            <el-col :span="4" >
                <el-button
                    @click='checkout'
                    type="primary">
                    切换流程用例展示
                </el-button>
            </el-col>
        </el-row>
        
        <div class='ele-container'>
            <div :class="'ele-left '+(saidBarShow?'':'narrow-ele-left')">
                <div class='treeDiv' v-show = 'saidBarShow'>
                <el-tree 
                    accordion
                    :data="filterTree" 
                    :props="defaultProps"
                    @node-click="handleNodeClick">
                </el-tree>
                </div>
                <div class='treeHideIcon'  v-if="saidBarShow"> 
                    <el-button size="mini" @click="saidBarShow=!saidBarShow"><i class="el-icon-d-arrow-left"></i></el-button>
                </div>
                <div class='treeShowIcon' v-else> 
                    <el-button size="mini"  @click="saidBarShow=!saidBarShow"><i class="el-icon-d-arrow-right"></i></el-button>
                </div>
            </div>
            <div :class="'ele-right '+(saidBarShow?'':'wide-ele-right')">
                <el-row class="itemCenter" :gutter="20">
                    <el-col :span="8">
                        <el-button
                            size="small" 
                            @click='save'
                            type="primary" 
                            icon="el-icon-document">
                            保存
                        </el-button>
                        <el-button
                            v-if='selectedTemplate !== -1'
                            size="small" 
                            @click='dataTemplate'
                            type="primary">
                            下载数据模板
                        </el-button>
                        <el-button
                            v-if='selectedTemplate !== -1'
                            size="small" 
                            @click='exportData'
                            type="primary">
                            导入数据
                        </el-button>
                    </el-col>
                    <el-col :span="8" v-if='selectedTemplate !== -1'>
                        <el-select multiple v-model="columnHidden" placeholder="请选择隐藏列">
                            <el-option
                                v-for="item in selectOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label">
                            </el-option>
                        </el-select>
                        <el-button
                            size="small" 
                            @click='searchTemplate'
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
                        :cell-class-name='cellClassName'
                        @row-contextmenu="rightMenu"
                        @cell-dblclick='tdedit'
                        @cell-click='tdchoose'
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
                            v-if="!columnHidden.includes('测试点')"
                            prop="testPoint"
                            label="测试点">
                        </el-table-column>
                        <el-table-column
                            v-if="!columnHidden.includes('测试意图')"
                            prop="testDesign"
                            label="测试意图">
                        </el-table-column>
                        <el-table-column
                            v-if="!columnHidden.includes('测试步骤')"
                            prop="testStep"
                            label="测试步骤"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            v-if="!columnHidden.includes('预期结果')"
                            prop="expectResult"
                            label="预期结果"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            v-if="!columnHidden.includes('检查点')"
                            width="150"
                            prop="checkPoint"
                            label="检查点">
                        </el-table-column>
                        <el-table-column
                            v-for="(item,index) in tableHead"
                            :key="index"
                            :label="item[0] +'-'+ item[1]"
                            width="180">
                            <template slot-scope="scope">
                                <div v-if='scope.row.index === rowIndex && scope.column.index === columnIndex && dbeditFlag'>
                                    <el-input
                                        class='editArea'
                                        type="textarea"
                                        :ref='"_"+scope.row.index+"_"+scope.column.index'
                                        @blur='loseblur(scope.row,scope.column)'
                                        @click.stop.prevent="return false"
                                        @change="handlechange(scope.row,scope.column)"
                                        :autosize="{ minRows: 2, maxRows: 5}"
                                         v-model="scope.row['data_'+item[1]]">
                                    </el-input>
                                </div>
                                <div v-else>{{ scope.row['data_'+item[1]] }}</div>

                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div v-show="menuVisible">
                    <ul id="menu" class="menu">
                        <li class="menu__item" >复制</li>
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
                <el-row class="itemCenter">
                        <el-radio v-model="dataType" label="1">文本</el-radio>
                        <el-radio v-model="dataType" label="2">空文本</el-radio>
                        <el-radio v-model="dataType" label="3">去除语句</el-radio>
                        <el-radio v-model="dataType" label="4">表达式</el-radio>
                </el-row>
                <el-row v-show='dataType==1'>
                    <el-input v-model="input1" placeholder="请输入内容"></el-input>
                </el-row>
                <el-row v-show='dataType==2'>
                    <el-input placeholder="nil" disabled></el-input>
                </el-row>
                <el-row v-show='dataType==3'>
                    <el-input placeholder="" disabled></el-input>
                </el-row>
                <el-row v-show='dataType==4'>
                    <el-col :span="14">
                        <el-input placeholder="请输入内容" v-model="input4">
                            <template slot="prepend">{expr=</template>
                            <template slot="append">}</template>
                        </el-input>
                    </el-col>
                    <el-col :span="8" :offset="1">
                        <el-button
                            size="small" 
                            @click='插入数据'
                            type="primary">
                            插入数据
                        </el-button>
                        <el-button
                            size="small" 
                            @click='插入函数'
                            type="primary">
                            插入函数
                        </el-button>
                    </el-col>
                </el-row>
                
                <div>
                    <el-row>
                        <h4> 前置操作</h4>
                    </el-row>
                    <el-row>
                        <el-button
                            size="small" 
                            type="primary"
                            icon="el-icon-plus"
                            @click='addItemShowFunction(1)'>
                            添加多项
                        </el-button>
                        <el-button
                            icon="el-icon-delete"
                            size="small" 
                            type="primary"
                            @click='deleteTemplateInfo(1)'>
                            删除
                        </el-button>
                        <el-button
                            icon="el-icon-arrow-up"
                            size="small" 
                            type="primary"
                            @click='eleUp(1)'>
                            上移
                        </el-button>
                        <el-button
                            icon="el-icon-arrow-down"
                            size="small" 
                            type="primary"
                            @click='eleDown(1)'>
                            下移
                        </el-button>
                    </el-row>
                      <el-table
                        border
                        ref="multipleTable"
                        :data="beforeOperationRows"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        row-key="name"
                        class="sortable">
                        <el-table-column
                            label="排序"
                            width="55">
                            <template slot-scope="scope">
                                <i :id ='scope.row.date' class="el-icon-sort"></i>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="选择"
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            label="操作项"
                            width="200"
                            prop="name">
                        </el-table-column>
                        <el-table-column
                            label="方法"
                            width="180">
                            <template slot-scope="scope">
                                <el-select 
                                    v-model="scope.row.methodName" 
                                    placeholder="请选择"
                                    @change="changeMethod(scope.row)">
                                    <el-option
                                    v-for="item in methods[scope.row.elementWidget]"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.name">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="arguments"
                            label="参数">
                            <template slot-scope="scope">
                                <div v-if='scope.row.arguShow'>
                                    <el-row v-for='item in scope.row.arguments' :key='item.index'>
                                        <el-col :span="5">
                                            <span>
                                                名称
                                            </span>
                                        </el-col>
                                        <el-col :span="10">
                                            <span>
                                                参数值
                                            </span>
                                        </el-col>
                                    </el-row>
                                    <el-row v-for='item in scope.row.arguments' :key='item.name'>
                                        <el-col :span="5" class='fixedHeight'>
                                            <span>
                                                 {{ item.name }} 
                                            </span>
                                        </el-col>
                                        <el-col :span="10">
                                            <span>
                                                 {{ item.value }} 
                                            </span>
                                        </el-col>
                                    </el-row>
                                    <el-row >
                                        <el-button 
                                            size="mini" 
                                            type="primary"
                                            icon="el-icon-edit" 
                                            @click='scope.row.arguShow = false'>
                                            编辑
                                        </el-button>
                                    </el-row>
                                </div>
                                <div v-else>
                                    <el-row v-for='item in scope.row.arguments' :key='item.index'>
                                        <el-col :span="5">
                                            <span>
                                                名称
                                            </span>
                                        </el-col>
                                        <el-col :span="10">
                                            <span>
                                                参数值
                                            </span>
                                        </el-col>
                                    </el-row>
                                    <el-row v-for='item in scope.row.arguments' :key='item.name'>
                                        <el-col :span="5" class='fixedHeight'>
                                            <span>
                                                 {{ item.name }} 
                                            </span>
                                        </el-col>
                                        <el-col :span="10">
                                            <el-input 
                                                size="mini"
                                                @dragenter.stop.prevent="return false"
                                                @dragover.stop.prevent="return false"
                                                v-model="item.newvalue" ></el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row >
                                        <el-col :span="5">
                                            <el-button  
                                                @click='scope.row.arguments.forEach(v=>{v.newvalue =v.value});scope.row.arguShow = true'
                                                size="mini">
                                                 取消
                                            </el-button>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-button 
                                                type="primary" 
                                                size="mini"  
                                                @click=' scope.row.arguments.forEach(v=>{v.value=v.newvalue}) ;scope.row.arguShow = true'>
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
                        <el-button
                            size="small" 
                            type="primary"
                            icon="el-icon-plus"
                            @click='addItemShowFunction(2)'>
                            添加多项
                        </el-button>
                        <el-button
                            icon="el-icon-delete"
                            size="small" 
                            type="primary"
                            @click='deleteTemplateInfo(2)'>
                            删除
                        </el-button>
                        <el-button
                            icon="el-icon-arrow-up"
                            size="small" 
                            type="primary"
                            @click='eleUp(2)'>
                            上移
                        </el-button>
                        <el-button
                            icon="el-icon-arrow-down"
                            size="small" 
                            type="primary"
                            @click='eleDown(2)'>
                            下移
                        </el-button>
                    </el-row>
                      <el-table
                        border
                        ref="multipleTable"
                        :data="beforeOperationRows"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        row-key="name"
                        class="sortable">
                        <el-table-column
                            label="排序"
                            width="55">
                            <template slot-scope="scope">
                                <i :id ='scope.row.date' class="el-icon-sort"></i>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="选择"
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            label="操作项"
                            width="200"
                            prop="name">
                        </el-table-column>
                        <el-table-column
                            label="方法"
                            width="180">
                            <template slot-scope="scope">
                                <el-select 
                                    v-model="scope.row.methodName" 
                                    placeholder="请选择"
                                    @change="changeMethod(scope.row)">
                                    <el-option
                                    v-for="item in methods[scope.row.elementWidget]"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.name">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="arguments"
                            label="参数">
                            <template slot-scope="scope">
                                <div v-if='scope.row.arguShow'>
                                    <el-row v-for='item in scope.row.arguments' :key='item.index'>
                                        <el-col :span="5">
                                            <span>
                                                名称
                                            </span>
                                        </el-col>
                                        <el-col :span="10">
                                            <span>
                                                参数值
                                            </span>
                                        </el-col>
                                    </el-row>
                                    <el-row v-for='item in scope.row.arguments' :key='item.name'>
                                        <el-col :span="5" class='fixedHeight'>
                                            <span>
                                                 {{ item.name }} 
                                            </span>
                                        </el-col>
                                        <el-col :span="10">
                                            <span>
                                                 {{ item.value }} 
                                            </span>
                                        </el-col>
                                    </el-row>
                                    <el-row >
                                        <el-button 
                                            size="mini" 
                                            type="primary"
                                            icon="el-icon-edit" 
                                            @click='scope.row.arguShow = false'>
                                            编辑
                                        </el-button>
                                    </el-row>
                                </div>
                                <div v-else>
                                    <el-row v-for='item in scope.row.arguments' :key='item.index'>
                                        <el-col :span="5">
                                            <span>
                                                名称
                                            </span>
                                        </el-col>
                                        <el-col :span="10">
                                            <span>
                                                参数值
                                            </span>
                                        </el-col>
                                    </el-row>
                                    <el-row v-for='item in scope.row.arguments' :key='item.name'>
                                        <el-col :span="5" class='fixedHeight'>
                                            <span>
                                                 {{ item.name }} 
                                            </span>
                                        </el-col>
                                        <el-col :span="10">
                                            <el-input 
                                                size="mini"
                                                @dragenter.stop.prevent="return false"
                                                @dragover.stop.prevent="return false"
                                                v-model="item.newvalue" ></el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row >
                                        <el-col :span="5">
                                            <el-button  
                                                @click='scope.row.arguments.forEach(v=>{v.newvalue =v.value});scope.row.arguShow = true'
                                                size="mini">
                                                 取消
                                            </el-button>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-button 
                                                type="primary" 
                                                size="mini"  
                                                @click=' scope.row.arguments.forEach(v=>{v.value=v.newvalue}) ;scope.row.arguShow = true'>
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
                        <el-button
                            size="small" 
                            type="primary"
                            icon="el-icon-plus"
                            @click='addItemShowFunction(3)'>
                            添加多项
                        </el-button>
                        <el-button
                            icon="el-icon-delete"
                            size="small" 
                            type="primary"
                            @click='deleteTemplateInfo(3)'>
                            删除
                        </el-button>
                        <el-button
                            icon="el-icon-arrow-up"
                            size="small" 
                            type="primary"
                            @click='eleUp(3)'>
                            上移
                        </el-button>
                        <el-button
                            icon="el-icon-arrow-down"
                            size="small" 
                            type="primary"
                            @click='eleDown(3)'>
                            下移
                        </el-button>
                    </el-row>
                      <el-table
                        border
                        ref="multipleTable"
                        :data="beforeOperationRows"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        row-key="name"
                        class="sortable">
                        <el-table-column
                            label="排序"
                            width="55">
                            <template slot-scope="scope">
                                <i :id ='scope.row.date' class="el-icon-sort"></i>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="选择"
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            label="操作项"
                            width="200"
                            prop="name">
                        </el-table-column>
                        <el-table-column
                            label="方法"
                            width="180">
                            <template slot-scope="scope">
                                <el-select 
                                    v-model="scope.row.methodName" 
                                    placeholder="请选择"
                                    @change="changeMethod(scope.row)">
                                    <el-option
                                    v-for="item in methods[scope.row.elementWidget]"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.name">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="arguments"
                            label="参数">
                            <template slot-scope="scope">
                                <div v-if='scope.row.arguShow'>
                                    <el-row v-for='item in scope.row.arguments' :key='item.index'>
                                        <el-col :span="5">
                                            <span>
                                                名称
                                            </span>
                                        </el-col>
                                        <el-col :span="10">
                                            <span>
                                                参数值
                                            </span>
                                        </el-col>
                                    </el-row>
                                    <el-row v-for='item in scope.row.arguments' :key='item.name'>
                                        <el-col :span="5" class='fixedHeight'>
                                            <span>
                                                 {{ item.name }} 
                                            </span>
                                        </el-col>
                                        <el-col :span="10">
                                            <span>
                                                 {{ item.value }} 
                                            </span>
                                        </el-col>
                                    </el-row>
                                    <el-row >
                                        <el-button 
                                            size="mini" 
                                            type="primary"
                                            icon="el-icon-edit" 
                                            @click='scope.row.arguShow = false'>
                                            编辑
                                        </el-button>
                                    </el-row>
                                </div>
                                <div v-else>
                                    <el-row v-for='item in scope.row.arguments' :key='item.index'>
                                        <el-col :span="5">
                                            <span>
                                                名称
                                            </span>
                                        </el-col>
                                        <el-col :span="10">
                                            <span>
                                                参数值
                                            </span>
                                        </el-col>
                                    </el-row>
                                    <el-row v-for='item in scope.row.arguments' :key='item.name'>
                                        <el-col :span="5" class='fixedHeight'>
                                            <span>
                                                 {{ item.name }} 
                                            </span>
                                        </el-col>
                                        <el-col :span="10">
                                            <el-input 
                                                size="mini"
                                                @dragenter.stop.prevent="return false"
                                                @dragover.stop.prevent="return false"
                                                v-model="item.newvalue" ></el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row >
                                        <el-col :span="5">
                                            <el-button  
                                                @click='scope.row.arguments.forEach(v=>{v.newvalue =v.value});scope.row.arguShow = true'
                                                size="mini">
                                                 取消
                                            </el-button>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-button 
                                                type="primary" 
                                                size="mini"  
                                                @click=' scope.row.arguments.forEach(v=>{v.value=v.newvalue}) ;scope.row.arguShow = true'>
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
            </el-dialog>
        <el-dialog title="添加多项" :visible.sync="addItemShow" width	="30%">
            <uiEleFunTree 
                @closeDialog = "addItemShow = false"
                @throwTreeInfo = "addTreeInfo"
                :multiselection='true'>
            </uiEleFunTree>
        </el-dialog>
        <el-dialog title="用例筛选" :visible.sync="searchTemplateDailog" width	="30%">
            <searchtestcase @condition-list='changeCondition'></searchtestcase>
        </el-dialog>
        <el-dialog title="批量添加元素" :visible.sync="exportDialog" width='30%'>
            <el-upload
                class="upload-demo"
                ref="upload"
                :action="actionUrl"
                :on-success='tempSuccess'
                :on-error='tempError'
                :limit="1"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button @click="exportDialog = false">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Request from '@/libs/request.js'
    import VueMixins from '@/libs/vueMixins.js'
    import uiEleFunTree from '@/components/transactDetail/uiEleFunTree'
    import searchtestcase from '@/components/searchTestcase/index'
    export default {
        mixins: [VueMixins],
        components: {
            uiEleFunTree,
            searchtestcase,
        },
        computed:{
            searchInfo(){
                return this.searchFlag?"收起筛选":"显示筛选"
            },
            actionUrl(){
                return this.publishActionUrl + '?'+'caseLibId=' + this.caseLibId + '&' + 'uploadUserId=3' 
            }
        },
        data() {
            let caseLibId = sessionStorage.getItem('caselibId')
            return {
                publishActionUrl: 'http://140.143.16.21:8080/atfcloud2.0a/dataCenter/importDataFromFile',
                columnHidden:[], // 隐藏的列
                selectedTemplate: -1 , // 选中的行
                editedData: {},
                rowIndex:-1, //选中的行
                columnIndex:-1, //选中的列
                dbeditFlag:false, //双击可编辑标志
                executorId: 3,// 用户Id
                caseLibId: caseLibId,// 用例库Id
                menuVisible:false,// 右击菜单弹窗弹窗
                templateInfoFlag: false,// 查看脚本弹窗
                editDataFlag: false,// 编辑数据弹窗
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
                    "propertyValueList": [caseLibId]
                }],
                rowdata:{},
                rowColumn:'',
                beforeOperationRows:[],
                afterOperationRows:[],
                dataType:'1',
                addItemShow:false,
                input4:'',
                input1:'',
                saidBarShow:true,
                searchTemplateDailog: false,
                exportDialog: false,
            }
        },
        mounted(){
            if(!sessionStorage.getItem('caselibId')){
                console.log('123')
                this.$message({
                    type: 'warning',
                    message: '请选择测试项目！'
                })
                setTimeout(_=>{
                    this.$router.push({
                        name: 'testProject'
                    })
                },0)
                return
            }
            this.getFilterTree()
        },
        methods: {
            submitUpload() {
                this.$refs.upload.submit();
            },
            tempError(response, file, fileList){
                this.$message.error(response.respMsg)
            },
            tempSuccess(response, file, fileList){
                if(response.respCode !== '0000'){
                    this.$message.error(response.respMsg)
                    return
                }
                this.exportDialog = false
                this.$message.success('上传成功')
            },
            // 接受添加多项的
            async addTreeInfo(treeInfo){
                console.log('treeInfo',treeInfo)

                for(let i = 0;i<treeInfo.length;i++){
                    const a = await this.getMethods(treeInfo[i].elementWidget)
                    console.log("this.methods[treeInfo[i].elementWidget]",this.methods[treeInfo[i].elementWidget])
                    console.log("this.methods[treeInfo[i].elementWidget]",a)
                    let arguString = this.methods[treeInfo[i].elementWidget][0].arguments
                    let arguObj = JSON.parse(arguString)
                    let argu = []
                    for(let j = 0 ; j < arguObj.length ; j++){
                        argu.push({
                            index:0,
                            name:arguObj[j].name ,
                            newvalue:"",
                            value:""
                        })
                    }
                    console.log('list[i].arguments',treeInfo[i].arguments)
                    this.templateInfo.push({
                        sortid:this.sortidNum++,
                        name: 'UI:'+treeInfo[i].uiname+" 元素:"+treeInfo[i].elementName,
                        uiname: treeInfo[i].uiname,
                        elementName: treeInfo[i].elementName,
                        elementWidget: treeInfo[i].elementWidget,
                        methodName: this.methods[treeInfo[i].elementWidget][0].name,
                        arguments: argu,
                        arguShow: true,// 参数一列的展示方式 ( arguShow ? 展示 : 可编辑 )
                    })
                }
            },
            addItemShowFunction(flag){
                this.addItemShow=true
            },
            eleUp(flag){
                let flag2 = false
                for(let i = 0 ; i < this.templateInfo.length ; i++){
                    if(this.multipleSelection.some( v => (v.sortid === this.templateInfo[i].sortid)) ){
                        if(flag2){
                            let tmp = this.templateInfo.splice(i,1)[0]
                            this.templateInfo.splice(i-1,0,tmp)
                        }
                    }
                    else{
                        flag2 = true
                    }
                }
            },
            eleDown(type){
                let flag = false
                for(let i = this.templateInfo.length-1 ; i >-1 ; i--){
                    
                    if(this.multipleSelection.some( v =>(v.sortid === this.templateInfo[i].sortid)) ){
                        if(flag){
                            let tmp = this.templateInfo.splice(i,1)[0]
                            this.templateInfo.splice(i+1,0,tmp)
                        }
                    }
                    else{
                        flag = true
                    }
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log('multipleSelection',this.multipleSelection)
            },
            // 编辑数据弹框
            editData(){
                
                this.editDataFlag = true
                console.log(this.rowdata['data_'+ this.rowColumn])
                let cellData = this.rowdata['data_'+ this.rowColumn]
                this.beforeOperationRows = [];
                this.afterOperationRows = [];
                if (cellData.includes('@before')) {
                    var beforeStr = cellData.slice(cellData.indexOf('@before\n') + 7, cellData.indexOf('@value'));
                    console.log("beforeSte:"+beforeStr);
                    var beforeArr = beforeStr.split(';\n');
                    console.log("beforeArr:"+beforeArr);
                    this.parseScript(beforeArr, this.beforeOperationRows, 1)
                }
                if (cellData.includes('@after')) {
                    var afterStr = cellData.slice(cellData.indexOf('@after\n') + 6);
                    var afterArr = afterStr.split(';\n');
                    this.parseScript(afterArr, this.afterOperationRows, 2);
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
            },
            parseScript(strArray, operationRows, type) {
                var length = type === 1 ? strArray.length - 1 : strArray.length;
                if(strArray.length) {
                    for (let i = 0; i < length; i++) {
                        let str = strArray[i].trim()
                        if(!str.length) return;
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
                            functions.push({name: script[2].slice(0, script[2].indexOf('(')), parameterlist: ''});
                            // click('a','b','c') --> 'a','b','c' --> ['a', 'b', 'c'] --> parameters: [{ Name: 'para1', Value: 'a' }]
                            var paraArr = script[2].slice(script[2].indexOf('(')+1, -1).split(',');
                            var parameters = [];
                            for (let j = 0; j < paraArr.length; j++) {
                                var o = {}
                                o.Name = 'para' + (j + 1)
                                o.Value = paraArr[j].slice(1, -1)
                                parameters.push(o)
                            }
                        } else {
                            var operation = {};
                            operation.ui = '';
                            operation.classType = '';
                            operation.element = '';
                            var index = str.indexOf('(');
                            var functions = [{name: str.slice(0, index), parameterlist: ''}];
                            var paraStr = str.slice(index + 1, -1);
                            var parameters = [];
                            var paraArr = paraStr.split(',');
                            for (let j = 0; j < paraArr.length; j++) {
                                var o = {}
                                o.Name = 'para' + (j + 1)
                                o.Value = paraArr[j].slice(1, -1)
                                parameters.push(o)
                            }
                        }

                        operationRows.push({
                            id: Symbol(),
                            operation,
                            functions,
                            parameters
                        })
                    }
                }
            },
            handlechange(row,column){
                console.log(column)
                let widgetName = column.label.split('-')[0],
                    colName = column.label.split('-')[1]
                if( this.editedData[row.id] ){
                    this.editedData[row.id].dataList.push({
                        widgetName ,
                        colName ,
                        data: row['data_'+colName]
                    })
                }
                else{
                    this.editedData[row.id]={
                        testcaseId: row.id,
                        caseCompositeType: row.caseCompositeType,
                        dataList: [{
                            widgetName ,
                            colName ,
                            data: row['data_'+colName]
                        }]
                    }
                }
            },
            loseblur(){
                this.dbeditFlag = false
            },
            // 给row 和 column 添加数据
            cellClassName({row, column, rowIndex, columnIndex}){
                row.index = rowIndex
                column.index = columnIndex
                if (rowIndex === this.rowIndex && columnIndex === this.columnIndex) {
                    return 'choosed'
                }
            },
            tdedit(row, column, cell, event){
                console.log("dbclick")
                this.dbeditFlag = true
                const _this = this
                console.log(row.index +'_'+ column.index)
                let rowColumn = "_"+row.index +'_'+ column.index
                // 当输入框渲染出时，获得焦点
                setTimeout(function () {
                    _this.$refs[rowColumn][0].focus()
                }, 1)

            },
            //单击选中单元格
            tdchoose(row, column, cell, event){
                console.log(row)
                console.log(column)
                console.log(cell)
                console.log(event)
                this.rowIndex = row.index
                this.columnIndex = column.index
            },
            save(){
                console.log('object.values(editedData)',Object.values(this.editedData))
                if(this.editedData.length === 0){
                    
                }
                Request({
                    url: '/dataCenter/saveTableData',
                    method: 'post',
                    params:{data:Object.values(this.editedData)}
                }).then((res) => {
                        console.log("nimalegebasihdlia;jksjdfhhakfhj")
                        console.log(res)
                        this.$message(res.respMsg)
                        this.editedData = []
                    },(err) => {
                        console.log(err)
                    })
            },
            dataTemplate(){
                console.log('this.selectedTemplate.id',this.selectedTemplate.id)
                console.log(this.selectedTemplate)
                let qs = require('qs');
                console.log(this.conditionList)
                Request({
                    url: '/dataCenter/newDownloadDataFile',
                    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    method: 'post',
                    params:{
                        "conditionList": this.conditionList,
                        "autId": this.selectedTemplate.autId,
                        "transId": this.selectedTemplate.transId,
                        "scriptId": this.selectedTemplate.id
                    },
                    // _type: 'file'
                }).then(res => {
                    let url = 'http://140.143.16.21:8080/' + res.filePath.split('/webapps/')[1]
                    window.location.href = url
                    // let url = window.URL.createObjectURL(new Blob([res]))
                    // download(url);
                    
                    // const blob = new Blob([res])
                    // console.log(blob)
                    // return blob
                })
                // .then(data => {
                //     let blobUrl = window.URL.createObjectURL(data);
                //     download(blobUrl);
                // })
                // function download(blobUrl) {
                //     const a = document.createElement('a');
                //     a.style.display = 'none';
                //     a.download = '数据模板.xlsx';
                //     a.href = blobUrl;
                //     a.click();
                //     document.body.removeChild(a);
                // }
            },
            exportData(){
                this.exportDialog = true
            },
            searchTemplate(){
                this.searchTemplateDailog = true
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
                this.getFilterTree()
            },
            checkout(){
                this.$router.push({
                    name: 'DatatableFlowcase'
                })
            },
            handleNodeClick(data) {
                if(data.flag){
                    this.selectedTemplate = data
                    this.getTestcaseInfo()
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
            getTestcaseInfo(){
                console.log(this.selectedTemplate)
                Request({
                    url: '/dataCenter/queryTestcaseInfo',
                    method: 'post',
                    params:{
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
                this.rowdata  = row
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
            changeCondition(conditionlist){
                console.log(conditionlist)
                this.conditionList.splice(4)
                this.conditionList = this.conditionList.concat(conditionlist)
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
.el-col{
    height: 40px;
    line-height: 40px;
}
</style>


<style>
.choosed{
    background: #aad2fb!important;
}
.editArea{
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0;
}
.treeDiv{
    width:80%;
    display: inline-block;
}
.treeHideIcon{
    width: 10%;
    display: inline-block;
    position: absolute;
    right: 12px;
    top: 10px;
}
.treeShowIcon{
    width: 100%;
    display: inline-block;
    position: absolute;
    right: -3px;
}
.ele-left{
    position: relative;
}
.narrow-ele-left{
    width: 3%!important;
}
.wide-ele-right{
    width: 96%!important;
}
</style>

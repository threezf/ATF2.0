<template>
<div class="page-outer">
    <div class="page-inner">
        <div class="ele-container">
            <el-row style="margin-bottom: 10px">
                <el-button icon="el-icon-plus" size="small" :disabled="showFlag" type="primary" @click="addTemplateShow">
                    添加{{ name }}
                </el-button>
                <el-button icon="el-icon-delete" size="small" :disabled="showFlag" type="primary" @click="deleteTemplateShow">
                    删除{{ name }}
                </el-button>
                <el-tooltip content="每点击一次添加一个调试用例" effect="dark" placement="top"  v-if="isUseDebug && isScriptClicked">
                    <el-button type="primary" size="small" @click="addScript" icon="el-icon-plus">添加调试脚本</el-button>
                </el-tooltip>
                <el-tooltip  v-if="caseNotNeedAdd" placement="top" content="进入脚本调试模式">
                    <!-- <el-button type="primary" size="small" icon="el-icon-setting" @click="debugScript">调试执行</el-button> -->
                    <el-switch v-model="isUseDebug" inactive-text="配置脚本数据模式" active-text="脚本调试模式" :disabled="isScriptSelcted"></el-switch>
                </el-tooltip>
                <el-button type="primary" size="small" @click="addScriptTemplateDebug" v-else>
                    <i class="fa fa-plus-circle"></i>
                    添加脚本用例
                </el-button>
            </el-row>
            <div style=" overflow: scroll;">
                <el-table v-loading="templateLoading" border ref="singleTable" :data="templateList" highlight-current-row row-key="id" @row-click="chooseTemplate" style="width: 100%">
                    <el-table-column lable="选择" width="35">
                        <template slot-scope="scope">
                            <div class="radioMask" />
                            <el-radio-group v-model="templateRadio">
                                <el-radio :label="scope.row.id">.</el-radio>
                            </el-radio-group>
                        </template>
                    </el-table-column>
                    <el-table-column property="name" :label="name + '名称'">
                    </el-table-column>
                    <el-table-column property="desc" label="描述"> </el-table-column>
                </el-table>
            </div>
            
            <div class="templatInfo" v-if="isUseDebug">
                <el-tabs v-model="currentTab" type="border-card">
                    <el-tab-pane 
                        v-for="(item, index) in tabs" 
                        :key="index" :label="item.label" 
                        :name="item.name" 
                        :disabled="index != 0 && !caseNotNeedAdd"
                        style="margin-top: -10px; max-height: 500px; overflow: scroll">
                        <template v-if="item.name === 'params'">
                            <el-row hidden>
                                <span> {{ name }}数据 </span>
                            </el-row>
                            <div>
                                <el-row v-if="templateRadio !== ''">
                                    <el-button size="small" type="primary" icon="el-icon-plus" @click="addItemShow = true" :disabled="showFlag">
                                        添加多项
                                    </el-button>
                                    <el-button icon="el-icon-delete" size="small" type="primary" @click="deleteTemplateInfo" :disabled="showFlag">
                                        删除
                                    </el-button>
                                    <el-button icon="el-icon-arrow-up" size="small" type="primary" @click="eleUp" :disabled="showFlag">
                                        上移
                                    </el-button>
                                    <el-button icon="el-icon-arrow-down" size="small" type="primary" @click="eleDown" :disabled="showFlag">
                                        下移
                                    </el-button>
                                    <el-button icon="el-icon-document" size="small" type="primary" @click="saveInfo" :disabled="showFlag">
                                        保存
                                    </el-button>
                                    <el-button icon="el-icon-printer" size="small" type="primary" @click="giveParam" :disabled="showFlag">
                                        参数化
                                    </el-button>
                                </el-row>
                                <el-table border ref="multipleTable" v-loading="templateLoading" :data="templateInfo" tooltip-effect="dark" style="width: 100%" height="500" @selection-change="handleSelectionChange" row-key="name" class="sortable">
                                    <el-table-column label="排序" width="55">
                                        <template slot-scope="scope">
                                            <i :id="scope.row.date" class="el-icon-sort"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="选择" type="selection" width="55">
                                    </el-table-column>
                                    <el-table-column label="操作项" width="260" prop="name">
                                    </el-table-column>
                                    <el-table-column label="方法" width="180">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.methodName" placeholder="请选择" @change="changeMethod(scope.row)" :disabled="(scope.row.name.indexOf('公共函数') > -1)">
                                                <el-option v-for="item in methods[scope.row.elementWidget]" :key="item.id" :label="item.name" :value="item.name">
                                                </el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="arguments" label="参数">
                                        <template slot-scope="scope">
                                            <div v-if="scope.row.arguShow">
                                                <el-row v-for="(item, index) in scope.row.arguments" :key="'show' + index">
                                                    <el-col :span="5">
                                                        <span> 名称 </span>
                                                    </el-col>
                                                    <el-col :span="10">
                                                        <span> 参数值 </span>
                                                    </el-col>
                                                </el-row>
                                                <el-row v-for="(item, index) in scope.row.arguments" :key="'edit' + index">
                                                    <el-col :span="5" class="fixedHeight">
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
                                                <el-row v-if="scope.row.arguments.length > 0">
                                                    <el-button size="mini" type="primary" icon="el-icon-edit" @click="scope.row.arguShow = false" :disabled="showFlag">
                                                        编辑
                                                    </el-button>
                                                </el-row>
                                            </div>
                                            <div v-else>
                                                <el-row v-for="item in scope.row.arguments" :key="item.index">
                                                    <el-col :span="5">
                                                        <span> 名称 </span>
                                                    </el-col>
                                                    <el-col :span="10">
                                                        <span> 参数值 </span>
                                                    </el-col>
                                                </el-row>
                                                <el-row v-for="(item, index) in scope.row.arguments" :key="'eidting' + index">
                                                    <el-col :span="5" class="fixedHeight">
                                                        <span>
                                                            {{ item.name }}
                                                        </span>
                                                    </el-col>
                                                    <el-col :span="10">
                                                        <el-input size="mini" @dragenter.stop.prevent="return false;" @dragover.stop.prevent="return false;" v-model="item.newvalue"></el-input>
                                                    </el-col>
                                                </el-row>
                                                <el-row>
                                                    <el-col :span="5">
                                                        <el-button @click="
                                                            scope.row.arguments.forEach((v) => {
                                                            v.newvalue = v.value;
                                                            });
                                                            scope.row.arguShow = true;
                                                        " size="mini">
                                                            取消
                                                        </el-button>
                                                    </el-col>
                                                    <el-col :span="5">
                                                        <el-button type="primary" size="mini" @click="
                                                            scope.row.arguments.forEach((v) => {
                                                            v.value = v.newvalue;
                                                            });
                                                            scope.row.arguShow = true;
                                                        ">
                                                            确认
                                                        </el-button>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <div slot="empty">暂无数据,请选择{{ name }}</div>
                                </el-table>
                            </div>
                        </template>
                        <template v-if="item.name === 'script' && currentTab === 'script'">
                             <set-datable ref="debugConfData"></set-datable>
                        </template>
                        <template v-if="item.name === 'result' && currentTab === 'result'">
                             <run-script :aut-id="Number(autId)" :case-id="Number(caseId)" :script-id="Number(scriptId)"></run-script>
                        </template>
                    </el-tab-pane>
                </el-tabs>
            </div>

            <div class="templatInfo" v-else>
                <el-row>
                    <span> {{ name }}数据 </span>
                </el-row>
                <hr />
                <div>
                    <el-row v-if="templateRadio !== ''">
                        <el-button size="small" type="primary" icon="el-icon-plus" @click="addItemShow = true" :disabled="showFlag">
                            添加多项
                        </el-button>
                        <el-button icon="el-icon-delete" size="small" type="primary" @click="deleteTemplateInfo" :disabled="showFlag">
                            删除
                        </el-button>
                        <el-button icon="el-icon-arrow-up" size="small" type="primary" @click="eleUp" :disabled="showFlag">
                            上移
                        </el-button>
                        <el-button icon="el-icon-arrow-down" size="small" type="primary" @click="eleDown" :disabled="showFlag">
                            下移
                        </el-button>
                        <el-button icon="el-icon-document" size="small" type="primary" @click="saveInfo" :disabled="showFlag">
                            保存
                        </el-button>
                        <el-button icon="el-icon-printer" size="small" type="primary" @click="giveParam" :disabled="showFlag">
                            参数化
                        </el-button>
                    </el-row>
                    <el-table border ref="multipleTable" v-loading="templateLoading" :data="templateInfo" tooltip-effect="dark" style="width: 100%" height="500" @selection-change="handleSelectionChange" row-key="name" class="sortable">
                        <el-table-column label="排序" width="55">
                            <template slot-scope="scope">
                                <i :id="scope.row.date" class="el-icon-sort"></i>
                            </template>
                        </el-table-column>
                        <el-table-column label="选择" type="selection" width="55">
                        </el-table-column>
                        <el-table-column label="操作项" width="260" prop="name">
                        </el-table-column>
                        <el-table-column label="方法" width="180">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.methodName" placeholder="请选择" @change="changeMethod(scope.row)" :disabled="(scope.row.name.indexOf('公共函数') > -1)">
                                    <el-option v-for="item in methods[scope.row.elementWidget]" :key="item.id" :label="item.name" :value="item.name">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="arguments" label="参数">
                            <template slot-scope="scope">
                                <div v-if="scope.row.arguShow">
                                    <el-row v-for="(item, index) in scope.row.arguments" :key="'show' + index">
                                        <el-col :span="5">
                                            <span> 名称 </span>
                                        </el-col>
                                        <el-col :span="10">
                                            <span> 参数值 </span>
                                        </el-col>
                                    </el-row>
                                    <el-row v-for="(item, index) in scope.row.arguments" :key="'edit' + index">
                                        <el-col :span="5" class="fixedHeight">
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
                                    <el-row v-if="scope.row.arguments.length > 0">
                                        <el-button size="mini" type="primary" icon="el-icon-edit" @click="scope.row.arguShow = false" :disabled="showFlag">
                                            编辑
                                        </el-button>
                                    </el-row>
                                </div>
                                <div v-else>
                                    <el-row v-for="item in scope.row.arguments" :key="item.index">
                                        <el-col :span="5">
                                            <span> 名称 </span>
                                        </el-col>
                                        <el-col :span="10">
                                            <span> 参数值 </span>
                                        </el-col>
                                    </el-row>
                                    <el-row v-for="(item, index) in scope.row.arguments" :key="'eidting' + index">
                                        <el-col :span="5" class="fixedHeight">
                                            <span>
                                                {{ item.name }}
                                            </span>
                                        </el-col>
                                        <el-col :span="10">
                                            <el-input size="mini" @dragenter.stop.prevent="return false;" @dragover.stop.prevent="return false;" v-model="item.newvalue"></el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="5">
                                            <el-button @click="
                                                scope.row.arguments.forEach((v) => {
                                                v.newvalue = v.value;
                                                });
                                                scope.row.arguShow = true;
                                            " size="mini">
                                                取消
                                            </el-button>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-button type="primary" size="mini" @click="
                                                scope.row.arguments.forEach((v) => {
                                                v.value = v.newvalue;
                                                });
                                                scope.row.arguShow = true;
                                            ">
                                                确认
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                </div>
                            </template>
                        </el-table-column>
                        <div slot="empty">暂无数据,请选择{{ name }}</div>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
    <el-dialog :title="'新增' + name" :visible.sync="addTemplateDialog" width="30%">
        <el-form style="margin-bottom: -20px" :model="addTemplateForm" label-width="80px">
            <el-form-item :label="name + '名称'">
                <el-input size="small" v-model="addTemplateForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="name + '描述'">
                <el-input size="small" v-model="addTemplateForm.description" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="addTemplate">确 定</el-button>
            <el-button size="small" @click="addTemplateDialog = false">取 消</el-button>
        </div>
    </el-dialog>
    <el-dialog :title="'删除' + name" :visible.sync="deleteTemplateDialog" width="30%">
        <span :offset="2">确定要删除该{{ name }}吗？</span>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="deleteTemplate">确 定</el-button>
            <el-button size="small" @click="deleteTemplateDialog = false">取 消</el-button>
        </div>
    </el-dialog>
    <el-dialog title="添加多项" :visible.sync="addItemShow" width="30%">
        <uiEleFunTree @closeDialog="addItemShow = false" @throwTreeInfo="addTreeInfo" :multiselection="true" :transId="transId.toString()" :autId="autId.toString()">
        </uiEleFunTree>
    </el-dialog>
</div>
</template>

<script>
import 'font-awesome/css/font-awesome.css'
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
import draggable from "vuedraggable";
import Sortable from "sortablejs";
import uiEleFunTree from "./uiEleFunTree";
import SetDatable from '@/components/testInfrastructure/useCaseDebug/setDatable'
import RunScript from '@/components/testInfrastructure/useCaseDebug/runScript'

export default {
    name: "TemplateManage",
    components: {
        draggable,
        uiEleFunTree,
        SetDatable,
        RunScript
    },
    mixins: [VueMixins],
    props: {
        transId: {
            default: undefined,
        },
        autId: {
            default: undefined,
        },
        // 因为在快速开始时，脚本称之为用例，因此使用变量控制其显示
        name: {
            type: String,
            default: "脚本",
        },
        isQuick: {
            type: Boolean,
            default: false,
        },
        showFlag: {
            type: Boolean,
            default: false
        },
        creatorName: {
            type: String,
        },
        sceneId: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            sortidNum: 0, //每个脚本数据中 脚本的唯一标志
            methods: {}, //用于存放查询出的控件方法 { 控件名1：{信息}[，控件名2：{信息}]}
            addTemplateForm: {
                name: "",
                description: "",
                transId: this.transId,
            },
            templateRadio: "", //选择的template
            addTemplateDialog: false,
            deleteTemplateDialog: false,
            templateList: [],
            templateInfo: [],
            currentRow: null,
            multipleSelection: "",
            addItemShow: false,
            templateLoading: false,
            caseId: '', //创建测试用例的id
            caseNotNeedAdd: true, //脚本需要添加
            selectCase: '',
            isScriptClicked: false,
            currentTab: 'params',
            tabs: [{
                label: '脚本参数',
                name: 'params', 
            }, {
                label: '配置数据',
                name: 'script'
            }, {
                label: '执行结果',
                name: 'result'
            }],


            // 脚本调试数据
            scripId: "",
            caselibId: "",
            testPlanId: "",
            scriptable: false,
            resultable: false,
            isUseDebug: false
        };
    },
    watch: {
        transId() {
            if (this.transId && this.autId) {
                this.getTemplates();
            }
        },
        templateRadio: {
            handler(newVal) {
                this.scriptId = newVal
            },
            immediate: true
        },
        isUseDebug: {
            handler(newVal) {
                if(newVal) {
                    this.debugScript()
                }
            },
            immediate: true
        },
    },
    created() {},
    computed: {
        isScriptSelcted() {
            console.log(this.scriptId)
            return this.templateRadio == ""
        }
    },
    methods: {
        handleSelectRadio(row) {
            Request({
                url: "/testcase/getTestcaseId",
                method: "post",
                params: {
                    scriptId: this.templateRadio,
                    autId: this.autId
                },
            }).then(
                (res) => {
                    this.selectCase = res.caseId
                },
                (err) => {
                    this.$message(err);
                }
            );
        },
        log(info) {
            console.log(info);
        },
        changeMethod(row) {
            console.log("row", row);
            for (let i = 0; i < this.templateInfo.length; i++) {
                if (this.templateInfo[i].sortid === row.sortid) {
                    let arguString = this.methods[row.elementWidget].filter(
                        (v) => v.name === row.methodName
                    )[0].arguments;
                    let arguObj = JSON.parse(arguString);
                    this.templateInfo[i].arguments = [];
                    for (let j = 0; j < arguObj.length; j++) {
                        this.templateInfo[i].arguments.push({
                            index: 0,
                            name: arguObj[j].name,
                            newvalue: "",
                            value: "",
                        });
                    }
                }
            }
        },
        // 接受添加多项的
        async addTreeInfo(tree) {
            console.log("treeInfo", tree);
            let treeInfo = tree.elementTree;
            let functionInfo = tree.functionTree;
            for (let i = 0; i < treeInfo.length; i++) {
                const a = await this.getMethods(treeInfo[i].elementWidget);
                console.log(
                    "this.methods[treeInfo[i].elementWidget]",
                    this.methods[treeInfo[i].elementWidget]
                );
                console.log("this.methods[treeInfo[i].elementWidget]", a);
                let arguString = this.methods[treeInfo[i].elementWidget][0].arguments;
                let arguObj = JSON.parse(arguString);
                let argu = [];
                if (arguObj != undefined) {
                    for (let j = 0; j < arguObj.length; j++) {
                        argu.push({
                            index: j,
                            name: arguObj[j].name,
                            newvalue: "",
                            value: "",
                        });
                    }
                }
                console.log("list[i].arguments", treeInfo[i].arguments);
                this.templateInfo.push({
                    sortid: this.sortidNum++,
                    name: "UI:" + treeInfo[i].uiname + " 元素:" + treeInfo[i].elementName,
                    uiname: treeInfo[i].uiname,
                    elementName: treeInfo[i].elementName,
                    elementWidget: treeInfo[i].elementWidget,
                    methodName: this.methods[treeInfo[i].elementWidget][0].name,
                    arguments: argu,
                    arguShow: true, // 参数一列的展示方式 ( arguShow ? 展示 : 可编辑 )
                    selectable: true
                });
            }
            console.log('gghsj', functionInfo)
            for(let i = 0; i < functionInfo.length; i ++) {
                let argument;
                if(functionInfo[i].arguments.length > 0) {
                    argument = functionInfo[i].arguments.map((item, index) => {
                        return {
                            ...item,
                            index
                        }
                    })
                } else {
                    argument = []
                }
                if(!(this.templateInfo.findIndex(info => info.name === '公共函数：' + functionInfo[i].name) > -1)) {
                    this.templateInfo.push({
                        sortid: this.sortidNum ++,
                        name: '公共函数：' + functionInfo[i].name,
                        uiname: "",
                        elementName: functionInfo[i].name,
                        methodName: functionInfo[i].name,
                        elementWidget: [{name: functionInfo[i].name, id: functionInfo[i].name + '1'}],
                        arguShow: true,
                        arguments: argument,
                        selectable: false
                    })
                }else {
                    break;
                }
            }
            functionInfo.forEach(item => {
                
            })
        },
        // 删除脚本
        deleteTemplateInfo() {
            this.templateInfo = this.templateInfo.filter(
                (templateInfo) =>
                !this.multipleSelection.some(
                    (selected) => templateInfo.sortid === selected.sortid
                )
            );
        },
        //保存脚本
        saveInfo() {
            Request({
                url: "/scriptTemplate/saveScriptTemplate",
                method: "post",
                params: {
                    scriptId: this.templateRadio,
                    content: this.generateScriptString(),
                    userId: parseInt(sessionStorage.getItem("userId")),
                    transId: parseInt(this.transId),
                },
            }).then(
                (res) => {
                    this.$message(res.respMsg);
                },
                (err) => {
                    this.$message(err);
                }
            );
        },
        //遍历数据 生成保存脚本内容传参
        generateScriptString() {
            let sendDataArray = [];
            console.log("111", this.templateInfo);
            for (let i = 0; i < this.templateInfo.length; i++) {
                let template = this.templateInfo[i];
                console.log("111___" + i, template.uiname);
                let UI = template.uiname.replace(/^\"+|\"+$/g, '"');
                let element = template.elementName.replace(/^\"+|\"+$/g, '"');
                let classType = template.elementWidget;
                let method = template.methodName;
                let parguments = template.arguments;
                if (!UI && !method) {
                    console.log("_UI__" + UI);
                    console.log("method" + method);
                    continue;
                }
                let paramValues = [];
                let type = 1; // record the type  --  1: normal  2: canshuhua biaozhu
                for (var paramRow of parguments) {
                    var paramName = paramRow.name;
                    if (paramName.includes("参数化标注")) {
                        type = 2;
                    }
                    var paramTr = paramRow.value;
                    if (paramTr !== "") {
                        paramValues.push(`${paramTr}`);
                    } else {
                        // paramValues.push(`"${paramTr.innerHTML}"`);
                        paramValues.push(`""`);
                    }
                }
                if (paramValues.length === 0) {
                    paramValues = ['""'];
                }
                let parameterString = paramValues.toString();
                console.log("parameterString" + parameterString);
                let string = "";
                if (type === 1) {
                    if (UI == "" && classType == "" && element == "") {
                        string = `${method}(${parameterString});\n`;
                        // string = `${method}();\n`;
                    } else {
                        string = `UI("${UI}").${classType}("${element}").${method}(${parameterString});\n`;
                        // string = `UI("${UI}").${classType}("${element}").${method}();\n`;
                    }
                } else {
                    if (UI == "" && classType == "" && element == "") {
                        string = `${method}();#${parameterString}\n`;
                    } else {
                        string = `UI("${UI}").${classType}("${element}").${method}();#${parameterString}\n`;
                        // string = `UI("${UI}").${classType}("${element}").${method}();#${parameterString}\n`;
                    }
                }
                sendDataArray.push(string);
            }
            console.log("sendDataArray" + sendDataArray);
            return sendDataArray.join("");
        },
        giveParam() {
            Request({
                url: "/scriptTemplate/scriptParameterized",
                method: "post",
                params: {
                    autId: parseInt(this.autId),
                    scriptId: this.templateRadio,
                    content: this.generateScriptString(),
                    userId: sessionStorage.getItem("userId"),
                },
            }).then(
                (res) => {
                    this.$message(res.respMsg);
                    this.getTemplateInfo();
                },
                (err) => {
                    this.$message(err);
                }
            );
        },
        //行拖拽
        rowDrop() {
            const tbody = document.querySelector(".sortable tbody");
            const _this = this;
            Sortable.create(tbody, {
                filter: ".el-input__inner", // 不需要拖动的元素
                preventOnFilter: false, //默认true 是否禁用默认绑定的方法
                animation: 180, // 0.18s 动画时间
                delay: 0, // 按住、松开0毫秒后触发效果
                onEnd({
                    newIndex,
                    oldIndex
                }) {
                    const currRow = _this.templateInfo.splice(oldIndex, 1)[0];
                    _this.templateInfo.splice(newIndex, 0, currRow);
                    _this.templateInfo.push(_this.templateInfo.pop());
                },
            });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log("multipleSelection", this.multipleSelection);
        },
        // 表格中选中元素的上移
        eleUp() {
            let flag = false;
            for (let i = 0; i < this.templateInfo.length; i++) {
                if (
                    this.multipleSelection.some(
                        (v) => v.sortid === this.templateInfo[i].sortid
                    )
                ) {
                    if (flag) {
                        let tmp = this.templateInfo.splice(i, 1)[0];
                        this.templateInfo.splice(i - 1, 0, tmp);
                    }
                } else {
                    flag = true;
                }
            }
        },
        eleDown() {
            let flag = false;
            for (let i = this.templateInfo.length - 1; i > -1; i--) {
                if (
                    this.multipleSelection.some(
                        (v) => v.sortid === this.templateInfo[i].sortid
                    )
                ) {
                    if (flag) {
                        let tmp = this.templateInfo.splice(i, 1)[0];
                        this.templateInfo.splice(i + 1, 0, tmp);
                    }
                } else {
                    flag = true;
                }
            }
        },
        //各个模态框的展示
        addTemplateShow() {
            this.addTemplateDialog = true;
        },
        deleteTemplateShow() {
            if (!this.templateRadio) {
                this.$message("请选择要删除的" + this.name);
                return;
            }
            this.deleteTemplateDialog = true;
        },
        // 添加用例到场景
        insertTestcaseToScene(id) {
            let _this = this
            Request({
                url: '/sceneController/insertTestcaseToScene',
                method: 'POST',
                params: {
                    id: _this.sceneId,
                    creatorId: sessionStorage.getItem("userId"),
                    caseIds: [id]
                }
            }).then(res => {
                if (res.respCode !== '0000') {
                    return console.log('出现错误')
                }
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
        },
        // 添加template
        addTemplate() {
            Request({
                url: "/scriptTemplate/insert",
                method: "post",
                params: {
                    ...this.addTemplateForm,
                    transId: this.transId,
                    userId: sessionStorage.getItem("userId"),
                },
            }).then(
                (res) => {
                    this.$message(res.respMsg);
                    this.addTemplateDialog = false;
                    let _this = this;
                    if (this.isQuick) {
                        Request({
                            url: "/testcase/addTestcase",
                            method: "POST",
                            params: {
                                actionList: [],
                                autId: _this.autId,
                                author: sessionStorage.getItem("userId") || "3",
                                automaton: "",
                                caseCompositeType: "1",
                                caseLibId: "253",
                                casecode: "casecode" + Date.now(),
                                caseproperty: "1",
                                casetype: "1",
                                categoryTeam: "",
                                checkpoint: "",
                                datarequest: "",
                                executeMethod: "2",
                                executor: "3",
                                expectresult: "1",
                                functionModule: "",
                                modifyChannel: "",
                                modifyChannelNo: "",
                                note: _this.addTemplateForm.description,
                                prerequisites: "",
                                priority: "1",
                                reviewer: "3",
                                scriptMode: "1",
                                scriptModeFlag: res.scriptId,
                                submissionId: "49",
                                tags: "",
                                testdesign: 1,
                                testpoint: _this.addTemplateForm.name,
                                teststep: "1",
                                transId: _this.transId,
                                useStatus: "1",
                                version: "",
                            },
                        })
                        .then((res) => {
                            if (this.isQuick == true) {
                                this.insertTestcaseToScene(res.caseId)
                            }
                        })
                        .catch((err) => {});
                    }
                    this.getTemplates();
                },
                (err) => {
                    this.$message(res.respMsg);
                }
            );
        },
        // 删除场景中的用例
        deleteTestcaseFromScene(id) {
            let _this = this
            Request({
                url: '/sceneController/deleteTestcaseFromScene',
                method: 'POST',
                params: {
                    id: _this.sceneId,
                    caseIds: [id]
                }
            }).then(res => {
                if (res.respCode !== '0000') {
                    return console.log('出现错误')
                }
                this.getTemplates();
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
        },
        //删除脚本
        deleteTemplate() {
            console.log("" + this.templateRadio);
            Request({
                url: "/scriptTemplate/delete",
                method: "post",
                params: {
                    id: this.templateRadio,
                    userId: sessionStorage.getItem("userId"),
                    transId: this.transId,
                    scriptId: this.templateRadio,
                },
            }).then(
                (res) => {
                    this.deleteTemplateDialog = false;
                    this.$message(res.respMsg);
                    this.deleteTestcaseFromScene(this.selectCase)
                    //this.getTemplates();

                },
                (err) => {
                    this.$message(err);
                }
            );
        },
        // 获取脚本
        getTemplates() {
            console.log("getTemplates");
            this.templateLoading = true;
            Request({
                    url: "/scriptTemplate/queryTemplateByTransId",
                    method: "post",
                    params: {
                        id: this.transId,
                    },
                })
                .then(
                    (res) => {
                        this.templateList = [];
                        console.log("getTemplates", res);
                        let list = res.scriptTemplateList;
                        for (let i = 0; i < list.length; i++) {
                            this.templateList.push({
                                name: list[i].name,
                                desc: list[i].description,
                                id: list[i].id,
                            });
                        }
                    },
                    (err) => {
                        this.$message(res.respMsg);
                    }
                )
                .catch((err) => {
                    this.$message("网络开小差啦！");
                })
                .finally((_) => {
                    this.templateLoading = false;
                });
        },
        // 获取脚本详情，用于表格展示
        getTemplateInfo() {
            this.templateLoading = true;
            Request({
                    url: "/scriptTemplate/queryScriptInfo",
                    method: "post",
                    params: {
                        scriptId: this.templateRadio,
                        autId: this.autId,
                    },
                })
                .then(
                    (res) => {
                        this.templateInfo = [];
                        let list = res.data;
                        for (let i = 0; i < list.length; i++) {
                            this.getMethods(list[i].elementWidget);
                            for (let j = 0; j < list[i].arguments.length; j++) {
                                list[i].arguments[j].index = i;
                                list[i].arguments[j].newvalue = list[i].arguments[j].value;
                            }
                            console.log("list[i].arguments", list[i].arguments);
                            this.templateInfo.push({
                                sortid: this.sortidNum++,
                                name: "UI:" + list[i].uiname + " 元素:" + list[i].elementName,
                                uiname: list[i].uiname,
                                elementName: list[i].elementName,
                                elementWidget: list[i].elementWidget,
                                methodName: list[i].methodName,
                                arguments: list[i].arguments,
                                arguShow: true, // 参数一列的展示方式 ( arguShow ? 展示 : 可编辑 )
                            });
                        }
                    },
                    (err) => {
                        this.templateInfo = [];
                    }
                )
                .finally((_) => {
                    this.templateLoading = false;
                });
        },
        // 获取控件方法
        getMethods(classname) {
            if (this.methods[classname]) {
                //如果存在 则返回
                return;
            }
            return Request({
                url: "/aut/selectMethod",
                method: "post",
                params: {
                    id: this.autId,
                    classname: classname,
                    companyId: JSON.parse(localStorage.getItem("loginInfo")).companyId,
                },
            }).then(
                (res) => {
                    let list = res.omMethodRespDTOList;
                    this.$set(this.methods, classname, list);
                },
                (err) => {
                    this.$message(err);
                }
            );
        },
        //选择脚本
        chooseTemplate(row, column, event) {
            this.templateRadio = row.id;
            this.isScriptClicked = true
            this.getTemplateInfo();
            this.handleSelectRadio(row)
        },
        // 调试脚本
        debugScript() {
            this.isUseDebug = true
            if (this.templateRadio) {
                this.queryScriptTemplateDebugTestCaseByScriptId()
            } else {
                this.$message.warning("请选择调试脚本");
            }
        },
        // 添加新的调试脚本
        addScript() {
            console.log('添加新的调试脚本')
            this.addScriptTemplateDebug('添加成功', true)
        },
        // 添加脚本调试接口
        addScriptTemplateDebug(msg, flag) {
            if (flag != undefined || this.templateRadio) {
                Request({
                    url: '/scriptTemplate/addScriptTemplateDebug',
                    method: 'POST',
                    params: {
                        autId: this.autId,
                        scriptId: this.templateRadio,
                        transId: this.transId,
                        creatorId: sessionStorage.getItem("userId")
                    }
                }).then(res => {
                    if (res.respCode === "0000") {
                        // 这里会返回caseId
                        this.$message.success('操作成功，请配置数据')
                        if(this.currentTab != 'script') {
                            this.currentTab = 'script'
                        }else {
                            console.log(this.$refs.debugConfData)
                            this.$refs.debugConfData[0].reload()
                        }
                        this.caseId = res.caseId
                        this.caseNotNeedAdd = true
                    } else {
                        return console.log('获取失败')
                    }
                }).catch(error => {
                    this.$message.warning(error)
                })
            } else {
                this.$message.warning("请选择要调试的脚本")
            }
        },
        // 根据脚本id查询
        queryScriptTemplateDebugTestCaseByScriptId() {
            Request({
                url: '/testcase/queryScriptTemplateDebugTestCaseByScriptId',
                method: 'POST',
                params: {
                    scriptId: this.templateRadio,
                }
            }).then(res => {
                if (res.respCode === '0000') {
                    this.caseId = res.testcaseEntities[0].id
                    console.log('debugRes', {
                        scriptId: this.templateRadio,
                        autId: this.autId,
                        caseId: res.testcaseEntities[0].id
                    })
                    this.queryScriptDebugTestPlan(this.caseId)
                    sessionStorage.setItem('scriptId', this.scriptId)
                } else {
                    return console.log('数据获取失败')
                }
            }).catch(error => {
                console.log('debug脚本数据查询失败', error)
                this.$message.warning('请添加脚本执行用例')
                this.caseNotNeedAdd = false
            })
        },
        // 查询脚本调试测试计划
        queryScriptDebugTestPlan(caseId) {
            Request({
                url: '/testPlanController/queryScriptDebugTestPlan',
                method: 'POST',
                params: {
                    caseId,
                    scriptId: this.scriptId
                }
            }).then(res => {
                if(res.respCode === '0000') {
                    this.caselibId = res.testPlanEntity.caseLibId
                    this.testPlanId = res.testPlanEntity.id
                    sessionStorage.setItem("caselibId", res.testPlanEntity.caseLibId)
                    console.log(res, '---------')
                }
            }).catch(error => {
                this.$message.warning('该测试计划尚未发起执行')
            })
            
        }
    },
    created() {},
    mounted() {
        if (this.autId && this.transId) {
            console.log(this.transId);
            console.log(this.transId === "undefined");
            console.log("1112");
            this.getTemplates();
        }
        this.rowDrop();
        document.body.ondrop = function (event) {
            event.preventDefault();
            event.stopPropagation();
        };
    },
};
</script>

<style lang="less" scoped>
.templatInfo {
    margin: 10px 0px;
    border-radius: 5px;
}

.radioMask {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 9;
}

.el-radio__label {
    margin-left: -40px;
}

.fixedHeight {
    height: 28px;
}
.ele-container {

}
</style>

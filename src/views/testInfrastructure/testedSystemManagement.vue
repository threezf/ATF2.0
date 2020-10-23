/**
 * 被测系统管理
 */
<template>
<div class="page-base-inner">
    <el-container>
        <el-main class="el-main-base-inner">
            <el-row class="rowMargin">
                <el-col :span="5">
                    <el-input size="small" class="searchInput" placeholder="请输入系统编号或系统名称" v-model="selectInfo" clearable @clear="searchSystemClear" @keyup.enter.native="getAllSystem(1)">
                        <el-button size="small" slot="append" icon="el-icon-search" @click="getAllSystem(1)"></el-button>
                    </el-input>
                </el-col>
                <el-button type="primary" icon="el-icon-plus" size="small" @click="addButton">添加</el-button>
            <el-button type="primary" icon="el-icon-edit" size="small" @click="updateButton">修改</el-button>
            <span id="advancedFunctions" type="primary" class="highFunction" v-if="!highIsActive" @click="showHighFunction">{{showFun}}</span>
            <span class="high" v-if="highIsActive">
                <el-button type="primary" icon="el-icon-s-tools" size="small" @click="manageFunctionButton" plain>管理功能点</el-button>
                <el-button type="primary" icon="el-icon-edit-outline" size="small" @click="configureData" plain>配置系统数据</el-button>
                <el-button type="primary" icon="el-icon-s-tools" size="small" @click="automatedComponentMaintenance" plain>自动化构件维护</el-button>
                <el-button type="primary" icon="el-icon-s-management" size="small" @click="codeManagement" plain>执行代码管理</el-button>
                <el-button type="primary" icon="el-icon-setting" size="small" plain @click="configMobile">移动端设备配置</el-button>
            </span>
            <span id="el-panelHidden" class="highFunction" type="primary" v-if="highIsActive" icon="el-icon-d-arrow-left" @click="showHighFunction">{{hideFun}}</span>
            </el-row>

            <el-table class="table" ref="singleTable" border stripe highlight-current-row :default-sort="{prop:'modifiedTime',order:'descending'}" :data="tableData">
                <!--highlight-current-row:当前选中行保持高亮	type='index'显示当前行号-->
                <el-table-column label="" width="34px" align="center">
                    <template slot-scope="scope">
                        <el-radio v-model="radio" :label="scope.$index" @change="handleRadioChange(scope.$index,scope.row)">
                        </el-radio>
                        <!--调用时使用的是scope.row和scope.$index-->
                    </template>
                </el-table-column>
                <el-table-column sortable type="index" label="序号" width="60px" align="center"></el-table-column>
                <el-table-column prop="code" label="被测系统编号" min-width="20%" align="center">
                    <template slot-scope="scope">
                        <a @click="toTransact(scope.$index,scope.row)" class="link" target="_self">{{scope.row.code}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="nameMedium" label="被测系统名称" min-width="15%"></el-table-column>
                <el-table-column prop="inheriteArcName" label="开发架构" min-width="15%"></el-table-column>
                <el-table-column prop="descShort" label="被测系统描述" min-width="20%"></el-table-column>
                <el-table-column prop="creatorName" label="创建者" min-width="20%"></el-table-column>
                <el-table-column sortable prop="createTime" label="创建时间" :formatter="transTime" min-width="15%"></el-table-column>
                <el-table-column sortable prop="modifiedTime" label="修改时间" min-width="15%" :formatter="transTime"></el-table-column>
            </el-table>
        </el-main>
                    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :before-close="handleBeforeClose" width="30%">
                <el-form :rules="rules" :model="form" ref="form" label-width="80px" status-icon>
                    <el-form-item label="系统名称" prop="nameMedium">
                        <el-input style="width:100%" size="small" placeholder="请输入被测系统名称" v-model.lazy="form.nameMedium"></el-input>
                    </el-form-item>
                    <el-form-item label="系统编号">
                        <el-input style="width:100%" size="small" placeholder="为空时自动生成" v-model.lazy="form.code"></el-input>
                    </el-form-item>
                    <el-form-item label="开发架构">
                        <el-select style="width:110%" size="small" class="addSelect" placeholder="--选择开发架构--" v-model="selectedAbstractArchitectureName" @change="setInheriteArcId">
                            <el-option v-for=" (value,key) in abstractArchitectureInfo" :value="value" :key="key">{{value}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="描述" prop="descShort">
                        <el-input size="small" type="textarea" rows="8" v-model.trim="form.descShort"></el-input>
                    </el-form-item>
                    <el-form-item class="buttons_row">
                        <el-button id="clickButton" type="primary" size="small" @click="submitForm('form')">{{dialogOperateButton}}</el-button>
                        <el-button size="small" @click="cancelButtonClicked">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--操作成功对话框-->
            <el-dialog width="25%" title="提示" :visible.sync="successDialogVisible" :before-close="handleBeforeClose">
                <el-form>
                    <el-form-item label-width="30px">
                        <h4 class="successTitle">操作成功</h4>
                    </el-form-item>
                    <hr width="100%" color="#F5F5F5" />
                    <el-form-item class="buttons_row">
                        <el-button type="primary" size="small" @click="cancelButtonClicked">确定</el-button>
                        <el-button type="success" size="small" @click="manageFunction">管理功能点</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        <el-footer class="dialog-footer">
            <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5,10,20,50]" :page-size="pageSize" :total="totalCount" layout="total,sizes,prev,pager,next,jumper">
            </el-pagination>
        </el-footer>
    </el-container>
</div>
</template>

<script>
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
export default {
    components: {
        ElSlPanel
    },
    mixins: [VueMixins], // 混入
    name: "testedSystemManagement",
    data() {
        return {
            //高级按钮显示
            highIsActive: false, //此处需要校正
            //切换页面时
            currentPage: 1,
            pageSize: 10,
            totalCount: 50,
            //表格数据渲染
            tableData: [],
            radio: false, // 单选框默认
            //搜索相关
            selectInfo: "", //搜索输入内容
            //对话框及相关内容
            dialogModelFlag: 0,
            dialogVisible: false,
            //新建用户时添加的数据,表单相关数据
            form: {
                code: "",
                nameMedium: "",
                inheriteArcId: 9,
                descShort: "",
                createId: sessionStorage.getItem('userId'),
            },
            id: "", //修改被测系统信息时使用的id
            abstractArchitectureInfo: {},
            selectedAbstractArchitectureName: "截图",
            rules: {
                nameMedium: [{
                    required: true,
                    message: "系统名称是必填项",
                    trigger: "blur"
                }]
            },
            successDialogVisible: false,
            //被测系统信息
            autId: -1,
            index: 0,
            row: {},
            sendCode: "",
            manageId: "", // 跳转管理功能点需要的编号,
            manageCode: "", // 跳转管理功能点需要的code
            hideFun: '<< 隐藏高级功能', // 隐藏高级功能
            showFun: '展示高级功能 >>',
            nameMedium: '',
            creatorId: '', // 创建者id
            creatorName: '',
        };
    },
    computed: {
        //查询被测系统的参数对象，因为实现过程中受到搜索条件的影响，因此将此参数放在computed中
        params() {
            let obj = {
                currentPage: this.currentPage,
                orderColumns: "modified_time",
                orderType: "DESC",
                pageSize: this.pageSize
            };
            if (this.selectInfo !== "") {
                obj.codeAndName = this.selectInfo;
            }
            return obj;
        },
        dialogTitle() {
            let obj = {
                0: "添加被测系统",
                1: "修改被测系统",
                2: "操作失败"
            };
            return obj[this.dialogModelFlag];
        },
        dialogOperateButton() {
            let arr = ["添加", "修改"];
            return arr[this.dialogModelFlag];
        }
    },
    created() {
        this.getAllSystem();
        this.getAbstractArchitectureList();
    },
    methods: {
        //点击展示和隐藏高级功能
        showHighFunction: function () {
            this.highIsActive = !this.highIsActive;
        },
        //添加按钮
        addButton() {
            this.form.code = "";
            this.form.nameMedium = "";
            this.form.inheriteArcId = 9;
            this.form.descShort = "";
            this.dialogModelFlag = 0;
            this.dialogVisible = true;
        },
        //修改按钮
        updateButton() {
            if (this.creatorId == sessionStorage.getItem("userId")) {
                let _this = this;
                if (_this.radio === false) {
                    this.$message.warning("请选择一条数据！！");
                } else {
                    console.log("修改", _this.index, _this.row);
                    _this.dialogModelFlag = 1;
                    const {
                        code,
                        nameMedium,
                        inheriteArcId,
                        descShort,
                        creatorId
                    } = _this.row; //注意此处是_this.row，调用的是操作过的row
                    this.form = {
                        code,
                        nameMedium,
                        inheriteArcId,
                        descShort,
                        creatorId
                    };
                    _this.selectedAbstractArchitectureName =
                        _this.abstractArchitectureInfo[this.form.inheriteArcId];
                    console.log(inheriteArcId);
                    _this.dialogVisible = true;
                }
            } else {
                this.$alert("该被测项目由" + this.creatorName + "创建，你没有权限修改本被测项目")
            }
        },
        //管理功能点
        manageFunctionButton() {
            console.log("管理功能点", this.radio)
            let _this = this
            if (_this.radio === false) {
                _this.$message.warning("请选择一条数据！！");
            } else {
                sessionStorage.setItem("testSysNameStorage", "(" + this.row.nameMedium + ")")
                sessionStorage.setItem('toTransact', JSON.stringify({
                    id: this.id,
                    creatorName: this.row.creatorName,
                    creatorId: this.row.creatorId,
                    nameMedium: this.row.nameMedium,
                    companyId: JSON.parse(localStorage.getItem("loginInfo")).companyId
                }));
                _this.$router.push({
                    path: "transact",
                    query: {
                        id: this.id,
                        nameMedium: this.row.nameMedium
                    }
                });
            }
        },
        //配置系统数据
        configureData() {
            if (this.radio === false) {
                this.$message.warning("请选择一条数据！！");
            } else {
                this.sendCode = this.row.code;
                this.$router.push({
                    path: "autData",
                    query: {
                        id: this.id,
                        code: this.sendCode
                    }
                });
            }
        },
        //自动化构件管理
        automatedComponentMaintenance() {
            if (this.radio === false) {
                this.$message.warning("请选择一条数据！！");
            } else {
                this.$router.push({
                    path: "automatedComponentMaintenance",
                    query: {
                        arcId: this.row.inheriteArcId,
                        inheriteArcName: this.row.inheriteArcName
                    }
                });
            }
        },
        //执行代码管理
        codeManagement() {
            if (this.radio === false) {
                this.$message.warning("请选择一条数据！！");
            } else {
                console.log("执行代码管理", this.id);
                this.$router.push({
                    path: "execCode",
                    query: {
                        id: this.id
                    }
                });
            }
        },
        cancelButtonClicked() {
            this.dialogVisible = false;
            this.successDialogVisible = false;
        },
        // 移动端配置
        configMobile() {
            if (this.radio === false) {
                this.$message.warning('请选择一条数据')
            } else {
                this.queryMobile(this.id)
            }
        },
        // 查询移动端()
        queryMobile(id) {
            Request({
                url: '/mobileController/queryMobile',
                method: 'POST',
                params: {
                    sceneId: id
                }
            }).then(res => {
                console.log('queryMobile', res)
                if (res.respCode === '0000') {

                } else {
                    this.$message.warning(res.respMsg)
                }
            }).catch(err => {
                this.$message.error(err.split('；')[err.split('；').length - 1])
            })
        },
        /**
         * 表格事件处理
         * handleRadioChange：监听Radio变化处理事件
         * toTransact：选择系统编号跳转
         */
        handleRadioChange(index, row) {
            console.log("Radio改变", index, row);
            this.index = index;
            this.row = row;
            this.id = row.id;
            this.nameMedium = row.nameMedium
            this.creatorName = row.creatorName
            this.creatorId = row.creatorId
            sessionStorage.setItem("testSysNameStorage", "(" + this.row.nameMedium + ")")
        },
        toTransact(index, row) {
            // sessionStorage.setItem('case')
            let _this = this;
            _this.id = row.id;
            console.log("id", _this.id);
            sessionStorage.setItem("testSysNameStorage", "(" + row.nameMedium + ")") //把项目名称存入缓存中
            sessionStorage.setItem('toTransact', JSON.stringify({
                id: _this.id,
                code: row.code,
                nameMedium: row.nameMedium,
                creatorName: row.creatorName,
                companyId: JSON.parse(localStorage.getItem("loginInfo")).companyId,
                creatorId: row.creatorId
            }))
            this.$router.push({
                path: "transact",
                query: {
                    id: _this.id,
                    code: row.code,
                    nameMedium: row.nameMedium
                }
            }); //界面跳转
            console.log("code", row.code);
        },
        //对话框处理事件，非区域隐藏
        handleBeforeClose(done) {
            if (this.dialogModelFlag == 1) {
                done();
                return true;
            }
            done();
            return true;
        },
        //切换开发框架更换id
        setInheriteArcId() {
            let _this = this;
            console.log("信息", _this.abstractArchitectureInfo);
            Object.keys(_this.abstractArchitectureInfo).forEach(key => {
                if (
                    _this.abstractArchitectureInfo[key] ===
                    _this.selectedAbstractArchitectureName
                ) {
                    _this.form.inheriteArcId = key;
                    console.log(
                        "迭代",
                        _this.form.inheriteArcId,
                        _this.abstractArchitectureInfo[_this.form.inheriteArcId]
                    );
                } else {
                    console.log("我啥也不知道", key, _this.abstractArchitectureInfo[key]);
                }
            });
        },
        /**
         * 处理底部换页标记
         */
        handleSizeChange(val) {
            console.log(`每页 ${{ val }}条`);
            this.pageSize = val;
            this.getAllSystem();
        },
        handleCurrentChange(val) {
            console.log(`当前页：${{ val }}`);
            this.currentPage = val;
            this.getAllSystem();
        },
        // 查询被测系统  为点击查询按钮调用 此时将当前页置为一
        getAllSystem(type) {
            if (type == 1) {
                this.currentPage = 1;
            }
            const loginInfo = JSON.parse(localStorage.getItem("loginInfo"))
            this.params.companyId = loginInfo.companyId
            Request({
                    url: "/aut/pagedBatchQueryAut",
                    method: "post",
                    params: this.params
                })
                .then(
                    res => {
                        this.tableData = res.autRespDTOList;
                        this.tableData = this.tableData.reverse();
                        this.totalCount = res.totalCount;
                        // console.log(this.tableData);
                    },
                    err => {
                        console.log(err);
                    }
                )
                .catch(err => {
                    console.log(err);
                });
        },
        // input清空重新查询
        searchSystemClear() {
            this.getAllSystem();
        },
        //查询存在的开发架构
        getAbstractArchitectureList() {
            let _this = this;
            Request({
                    url: "/abstractArchitecture/queryArchitectureList",
                    method: "POST",
                    params: {
                        companyId: JSON.parse(localStorage.getItem('loginInfo')).companyId
                    }
                })
                .then(res => {
                    let needData = res.architectureRespDTOList;
                    for (let i = 0; i < needData.length; i++) {
                        let id = needData[i].id;
                        let name1 = needData[i].name;
                        _this.abstractArchitectureInfo[id] = name1;
                    }
                    console.log("全局信息", res.architectureRespDTOList);
                })
                .catch(err => {
                    console.log("查询开发架构失败", err);
                });
        },
        // 表单提交
        submitForm(formName) {
            let _this = this;
            _this.form.code = _this.form.code === "" ? '被测系统' + Date.now() : _this.form.code
            let status = _this.form.nameMedium === "";
            if (status) {
                this.$message.warning("*为必选项");
            } else {
                _this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (document.getElementById("clickButton").innerText == "添加") {
                            Request({
                                    url: "/aut/addSingleAut",
                                    method: "POST",
                                    params: {
                                        creatorId: sessionStorage.getItem("userId"),
                                        companyId: JSON.parse(localStorage.getItem("loginInfo")).companyId,
                                        ..._this.form
                                    }
                                })
                                .then(res => {
                                    if (res.respCode === "0000") {
                                        _this.autId = res.autId;
                                        console.log("获取新加成功的autId", _this.autId, res);
                                        this.dialogVisible = false;
                                        _this.successDialogVisible = true;
                                        _this.manageId = res.autId;
                                        _this.manageCode = _this.form.code;
                                        console.log("添加成功", res);
                                        _this.getAllSystem();
                                    } else {
                                        console.log('获取新加成功的autId', '添加失败')
                                        _this.$message.error(res.respMsg)
                                    }
                                })
                                .catch(err => {
                                    if (err.respCode === '"10011111"') {
                                        this.$message.warning("系统名称已经存在");
                                    }
                                    _this.$message.error(err.respMsg)
                                });
                        } else {
                            console.log(
                                document.getElementById("clickButton").innerText,
                                _this.id
                            );
                            Request({
                                    url: "/aut/modifySingleAut",
                                    method: "POST",
                                    params: {
                                        code: _this.form.code,
                                        descShort: _this.form.descShort,
                                        id: _this.id,
                                        inheriteArcId: _this.form.inheriteArcId,
                                        nameMedium: _this.form.nameMedium,
                                        creatorId: _this.form.creatorId,
                                        userId: sessionStorage.getItem("userId"),
                                    }
                                })
                                .then(res => {
                                    console.log("修改成功", res);
                                    this.$message.success("修改成功");
                                    _this.dialogVisible = false;
                                    _this.getAllSystem();
                                }, (err) => {
                                    this.dialogVisible = false
                                }).catch((err) => {
                                    console.log(err)
                                })
                        }
                    } else {
                        this.$message.warning("信息格式有误");
                        return false;
                    }
                });
            }
        },
        // 管理功能点
        manageFunction() {
            console.log("code:" + this.manageCode, "id:" + this.manageId, 'creatorId: ' + this.creatorId);
            this.$router.push({
                path: "transact",
                query: {
                    id: this.manageId,
                    code: this.manageCode
                }
            }); //界面跳转
        }
    },
    activated() {
        let dialog = this.$route.query.dialog
        console.log('测试', dialog)
        if (dialog) {
            this.$message.warning('请选择被测系统！')
            console.log('选择被测系统')
            this.$router.push({
                name: 'TestedSystemManagementRouter'
            })
        }
    }
};
</script>

<style scoped>
.el-radio__label {
    display: none important;
}

.spanTextColor {
    color: red;
    font-size: 25px;
    margin-top: 10px;
}

.high {
    margin-left: 10px;
}

/** 搜索框样式 */
.searchInput {
    width: 260px;
}

.successTitle {
    margin-top: -20px;
    margin-bottom: -5px;
}

.footSelect,
.formFoot {
    display: flex;
    justify-content: flex-end;
    text-align: center;
    overflow: hidden;
    margin-top: 10px;
    margin-bottom: -10px;
}

.formFoot {
    margin-bottom: -10px;
}

.buttonRowManage {
    margin-top: -10px;
    margin-bottom: -20px;
}

span.spanRow {
    margin-left: 10px;
}

div.row {
    border-color: lightgray;
    border-width: 1px;
    border-bottom-style: solid;
    width: 100%;
    height: 35px;
    margin-bottom: 10px;
}

/*表格相关样式*/
.tableStyle {
    width: 100%;
    margin: 10px auto;
}

/*高级功能样式*/
.highFunction {
    font-size: 13px;
    margin-left: 10px;
    cursor: pointer;
    color: gray;
}

.highFunction:hover {
    color: rgb(64, 158, 255);
}

/*链接样式*/
.link {
    color: #3e61aa;
    text-decoration: none;
    cursor: pointer;
}

.link:hover {
    color: blue;
}

.rowMargin {
    width: calc(100% - 40px);
    margin: 10px 0px;
}

/**添加对话框选择样式 */
.addSelect {
    width: 100%;
}

/**添加取消按钮样式 */
.buttons_row {
    display: flex;
    justify-content: center;
    margin-top: -10px;
    margin-bottom: -15px;
}

/**底部分页*/
.pagination {

    text-align: center;
}

.inputStyle {
    width: 93%;
  }
</style>

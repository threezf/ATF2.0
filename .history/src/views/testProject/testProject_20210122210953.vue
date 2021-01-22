<template>
<div class="page-inner">
    <el-container>
        <el-main>
            <el-row style="margin-bottom:10px">
                <el-col :span="4">
                    <el-input size="small" v-model="searchInput" placeholder="请输入项目编号或名称"></el-input>
                </el-col>
                <el-col :span="20">
                    <el-button @click='getTestProject(1)' icon="el-icon-setting" size="small" type="primary">
                        搜索
                    </el-button>
                    <el-button @click='addProjectButton' type="primary" size="small" icon="el-icon-plus">
                        添加
                    </el-button>
                    <el-button @click='manageProject' type="primary" size="small" icon="el-icon-setting">
                        管理功能点
                    </el-button>
                </el-col>
            </el-row>
            <el-table stripe :data="testProjectList" border class='table'>
                <el-table-column label="" width="34px" align="center">
                    <template slot-scope="scope">
                        <el-radio v-model="radio" :label="scope.row.id" @change="handleRadioChange(scope.row)">
                        </el-radio>
                        <!--调用时使用的是scope.row和scope.$index-->
                    </template>
                </el-table-column>
                <el-table-column label="测试项目编号" property="codeLong">
                </el-table-column>
                <el-table-column label="测试项目名称" property="nameMedium" />
                <el-table-column label="测试项目描述" property='descMedium' />
                <el-table-column label="创建者" property='creatorName' />
                <el-table-column label="开始时间" property="planedStartDate" :formatter="transTime" />
                <el-table-column label="结束时间" property='planedEndDate' :formatter="transTime" />
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="small" @click="toCase(scope.row.id,scope.row.caseLibId,scope.row.nameMedium, scope.row)">进入</el-button>
                        <el-button size="small" type="info" @click="updateProjectButton(scope.$index, scope.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer class="dialog-footer">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
        </el-footer>
    </el-container>
    <el-dialog :title="modelName" :visible.sync="dialogVisible" :before-close="handleClose" width="55%">
        <el-form ref="addForm" :model="addForm" :rules="rules" label-width="25%">
            <el-form-item label="测试项目编号" prop="codeLong">
                <el-input size="small" v-model="addForm.codeLong" placeholder="选填"></el-input>
            </el-form-item>
            <el-form-item label="测试项目名称" prop="nameMedium" required>
                <el-input size="small" v-model="addForm.nameMedium"></el-input>
            </el-form-item>
            <el-form-item label="项目时间" required>
                <el-date-picker size="small" v-model="timeValue" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:90%" align="right" @change="dateChangeVal" value-format="timestamp">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="描述" prop="projectDesc">
                <el-input size="small" v-model="addForm.descMedium" placeholder="选填"></el-input>
            </el-form-item>
            <el-row type="flex" justify="center" style="margin-bottom:-10px">
                <el-button size="small" type="primary" @click="submitForm('addForm')">{{buttonName}}</el-button>
                <el-button size="small" @click="resetForm()">重置</el-button>
            </el-row>
        </el-form>
    </el-dialog>
</div>
</template>

<script>
import Request from '@/libs/request.js'
import VueMixins from '@/libs/vueMixins.js'
import testCaseManagement from "./testCaseManagement";
export default {
    mixins: [VueMixins], // 混入
    data() {
        return {
            testProjectList: [],
            // apiUrl: '',
            tt: 0, //总条数
            pageSize: 10, //页面大小
            currentPage: 1, //当前页
            totalPage: 1, //总页数
            listnum: 5, //页面大小
            row: {},
            radio: false,
            codeLongAndName: 'codeLongAndName',
            addForm: {
                codeLong: "",
                nameMedium: "",
                descMedium: "",
                creatorId: sessionStorage.getItem("userId"),
                creatorName: '',
                companyId: JSON.parse(localStorage.getItem('loginInfo')).companyId,
                planedStartDate: '',
                planedEndDate: '',
                modifierId: ''
            },
            timeValue: [],
            rules: {
                nameMedium: [{
                        required: true,
                        message: '请输入项目名称',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 10,
                        message: '长度在 1 到 10 个字符',
                        trigger: 'blur'
                    }
                ],
            },
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            dialogVisible: false,
            selectedId: -1,
            searchInput: "",
            totalCount: 0,
            modelFlag: 0,
        }
    },
    computed: {
        params() {
            let obj = {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                codeLongAndName: "",
                orderColumns: "modified_time",
                orderType: "DESC",
                userId: sessionStorage.getItem("userId")
            }
            if (this.searchInput !== '') {
                obj[this.codeLongAndName] = this.searchInput
            }
            return obj
        },
        //根据modelFlag 展示弹窗的名字
        modelName() {
            var obj = {
                1: '添加测试项目',
                2: '修改测试项目信息'
            }
            return obj[this.modelFlag]
        },
        //用于展示弹窗按钮的文字
        buttonName() {
            var obj = {
                1: '添加',
                2: '确认'
            }
            return obj[this.modelFlag]
        }
    },
    created() {
        this.getTestProject();
    },
    mounted() {},
    methods: {
        handleRadioChange(val) {
            this.row = val
        },
        handleClose(done) {
            if (this.modelFlag == 1) {
                done()
                return true
            }
            this.$refs['addForm'].resetFields()
            done()
            return true
        },
        // 提交表单进行验证
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 如果是修改则调用 updateProject 方法 否则调用 addProject
                    console.log(this.modelFlag)
                    if (this.modelFlag === 2) {
                        this.updateProject()
                    } else {
                        this.addProject()
                    }
                } else {
                    this.$message('信息格式有误，请检查')
                    return false;
                }
            });
        },
        // 清空form表单
        resetForm() {
            this.$refs.addForm.resetFields();
        },
        //管理测试项目
        manageProject() {
            if (!this.row.id) {
                this.$alert("请选择要管理的测试项目")
            } else {
                var userId = sessionStorage.getItem("userId")
                if (this.row.creatorId == userId) {
                    this.$router.push({
                        path: "manageTestProject",
                        query: {
                            projectId: this.row.id
                        }
                    });
                } else {
                    this.$alert("此用户没有权限管理项目")
                }
            }
        },
        //添加测试项目表单
        addProjectButton() {
            this.modelFlag = 1
            this.dialogVisible = true
        },
        //修改测试项目表单
        updateProjectButton(index, row) {
            this.modelFlag = 2
            this.selectedId = row.id
            console.log('row', row)
            const {
                codeLong,
                nameMedium,
                descMedium,
                planedEndDate,
                planedStartDate
            } = row

            this.addForm = {
                codeLong,
                nameMedium,
                descMedium,
            }
            this.timeValue.push(planedStartDate, planedEndDate)
            this.dialogVisible = true
        },
        // 添加测试项目
        addProject() {
            this.addForm.codeLong = this.addForm.codeLong == "" ? "测试项目" + new Date().valueOf() : this.addForm.codeLong
            this.addForm.descMedium = this.addForm.descMedium == "" ? "空" : this.addForm.descMedium
            this.addForm.planedStartDate = this.timeValue[0]
            this.addForm.planedEndDate = this.timeValue[1]
            Request({
                url: '/testProjectController/addSingleTestProject',
                method: 'post',
                params: this.addForm
            }).then((res) => {

                this.dialogVisible = false
                this.insertTestPlan(res.caseLibId)
                this.getTestProject()

            }, (err) => {
                this.$alert("该测试项目名称已存在")
                this.dialogVisible = false
                console.log(err)
            }).catch((err) => {
                this.$alert(err.respMsg)
                console.log(err)
            })
        },
        dateChangeVal(val) {
            console.log('row', this.timeValue)
        },
        insertTestPlan(caseLibId) {
            Request({
                url: '/testPlanController/insertTestPlan',
                method: 'post',
                params: {
                    caseLibId,
                    testPhaseId: 3,
                    testRoundId: 11,
                    creatorId: sessionStorage.getItem("userId"),
                    descMedium: this.addForm.descMedium,
                    nameMedium: this.addForm.nameMedium,
                }
            })
        },
        // 修改测试项目
        updateProject() {
            Request({
                url: '/testProjectController/modifySingleTestProject',
                method: 'post',
                params: {
                    id: this.selectedId,
                    ...this.addForm
                }
            }).then((res) => {
                this.dialogVisible = false
                this.getTestProject()
                this.$alert('修改项目成功', '成功', {
                confirmButtonText: '确定',
            });
            }, (err) => {
                this.$message(res.respMsg)
                this.dialogVisible = false
                console.log(err)
            }).catch((err) => {
                console.log(err)
            })
        },
        //进入测试项目
        toCase(id, caseLibId, name, row) {
            sessionStorage.setItem("caselibId", caseLibId) //存储测试项目id到sessionstorage
            sessionStorage.setItem("nameMediumStorage", "(" + name + ")") //把项目名称存入缓存中
            sessionStorage.setItem("selectId", id)
            console.log('cccc', row)
            sessionStorage.setItem('executorId', row.creatorId)
            console.log('toCase', id, caseLibId)
            this.$router.push({
                path: 'testCase'
            })
        },
        // 页码大小变化
        handleSizeChange(val) {
            this.pageSize = val
            this.getTestProject(0)
        },
        //当前页码数变化
        handleCurrentChange(val) {
            this.currentPage = val
            this.getTestProject(0)
        },
        //展示所有测试项目
        getTestProject(type) {
            if (type === 1) {
                this.currentPage = 1
            }
            this.params.userId = sessionStorage.getItem("userId")
            Request({
                url: '/testProjectController/pagedBatchQueryTestProject',
                method: 'post',
                params: this.params
            }).then((res) => {
                this.testProjectList = res.pagedProjectDtoList
                this.totalCount = res.totalCount
                console.log(this.testProjectList)
            }, (err) => {
                console.log(err)
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .el-table__body-wrapper {
        height: 100% !important;
    }
</style>
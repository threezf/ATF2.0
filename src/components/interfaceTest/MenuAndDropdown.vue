<template>
    <div>
        <template v-for="menu in menuData">
            <el-submenu :key="menu.id" :index="String(menu.id)" style="text-align:center;" v-if="menu.childNodeList">
                <template slot="title">
                    <span slot="title" :class="isCollapse? 'isisCollapse-span':'open-span'">{{menu.groupName}}</span>
                    <span>
                <el-dropdown @command="handleCommand">
                        <el-button type="text" >
                            <i class="el-icon-arrow-down el-icon-more"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="'0,'+menu.id+','+menu.groupName+','+menu.parentId"  icon="el-icon-circle-plus-outline">新建子分组</el-dropdown-item>
                            <el-dropdown-item :command="'1,'+menu.id+','+menu.groupName+','+menu.parentId" icon="el-icon-edit-outline">编辑</el-dropdown-item>
                            <el-dropdown-item :command="'2,'+menu.id+','+menu.groupName+','+menu.parentId" icon="el-icon-delete">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
                </template>

                <MenuAndDropdown v-ref="c => setChildrenRef('menuchild',c)" :menuData="menu.childNodeList" :case-need="caseNeed"></MenuAndDropdown>
            </el-submenu>
            <el-menu-item :key="menu.id" :index="String(menu.id)" style="text-align:center" v-else>
                    <span slot="title">{{menu.groupName}}
                    </span>
                    <el-dropdown @command="handleCommand">
                        <el-button type="text" >
                            <i class="el-icon-arrow-down el-icon-more"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="'0,'+menu.id+','+menu.groupName+','+menu.parentId" icon="el-icon-circle-plus-outline">新建子分组</el-dropdown-item>
                            <el-dropdown-item :command="'1,'+menu.id+','+menu.groupName+','+menu.parentId" icon="el-icon-edit-outline">编辑</el-dropdown-item>
                            <el-dropdown-item :command="'2,'+menu.id+','+menu.groupName+','+menu.parentId" icon="el-icon-delete">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
            </el-menu-item>
        </template>
        <el-dialog :title="getTitleName" :visible.sync="isDialogVisible" :before-close="handleClose" width="30%">
            <el-form :rules="rules" :model="groupForm" ref="groupForm" label-width="80px" status-icon>
                <el-form-item label="分组名称" prop="groupName">
                    <el-input style="width:100%" size="small" placeholder="请输入分组名称" v-model.lazy="groupForm.groupName"></el-input>
                </el-form-item>
                <el-row class="buttons_row">
                    <el-button type="primary" size="small" @click="submitForm('groupForm')">{{getButtonName}}</el-button>
                    <el-button size="small" @click="cancelButtonClicked">取消</el-button>
                </el-row>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import MenuAndDropdown from './MenuTree.vue'
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";

    export default {
        name: "MenuAndDropdown",
        mixins: [VueMixins], // 时间格式转化
        props:{
            menuData: {
                type: Array,
                default: []
            },
            isCollapse: {
                type: Boolean,
                default: false
            },
						caseNeed: {
							type: Boolean,
							default: false
						}
        },
        data() {
            return {
                dialogFlag: 0,
                isDialogVisible: false,
                groupForm: {
                    parentId: 0,
                    groupName:"",
										autId:"",
                    createUser:"",
                },
                updateGroupForm: {
                    id:0,
                    groupName:"",
										autId:"",
                    modifiedUser:"",
                },
                rules: {
                    groupName: [{
                        required: true,
                        message: "分组名称是必填项",
                        trigger: "blur"
                    }]
                },
                autId: sessionStorage.getItem('autId'),
								caseLibId: sessionStorage.getItem('caselibId')
            }
        },
        components:{
                MenuAndDropdown,
        },
        inject: {
            setChildrenRef: {
                default:()=>{}
            },
            getParentRef: {
                from: 'getRef'
            },
            getParentChildrenRef: {
                from: 'getChildrenRef',
                default:()=>{}
            }
        },
        computed: {
            //根据dialogFlag 展示弹窗的名字
            getTitleName() {
                var obj = {
                    1: '新建子分组',
                    2: '修改分组'
                }
                return obj[this.dialogFlag]
            },
            //用于展示弹窗按钮的文字
            getButtonName() {
                var obj = {
                    1: '添加',
                    2: '确认'
                }
                return obj[this.dialogFlag]
            },
        },
        methods: {
             handleCommand(command) {
                let type = command.split(',')[0]
                let groupIndex = command.split(',')[1]
                let name = command.split(',')[2]
                let parentIndex = command.split(',')[3]
                if(type=='0'){
                    this.groupForm.parentId = groupIndex
                    this.groupForm.groupName = ''
                    this.dialogFlag = 1
                    this.isDialogVisible = true;
                }else if(type=='1'){
                    this.updateGroupForm.id = groupIndex
                    this.groupForm.groupName = name
                    this.dialogFlag = 2
                    this.isDialogVisible = true;
                }else {
                    this.deleteGroup(groupIndex)
                }
            },
            handleClose(done) {
                if (this.dialogFlag == 1) {
                    done()
                    return true
                }
                this.$refs['groupForm'].resetFields()
                done()
                return true
            },
            //取消按钮
            cancelButtonClicked() {
                this.isDialogVisible = false
            },
            // 提交表单进行验证
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 如果是修改则调用 updateGroup 方法 否则调用 addGroup
                        console.log(this.dialogFlag)
                        if (this.dialogFlag === 2) {
                            this.updateGroup()
                        } else {
													if(this.caseNeed){
														this.addGroupInCase()
													}else {
														this.addGroup()
													}
                        }
                    } else {
                        this.$message('信息格式有误，请检查')
                        return false;
                    }
                });
            },
            // 添加分组
            addGroup() {
                this.groupForm.createUser = sessionStorage.getItem("username")
								this.groupForm.autId = this.autId
								this.groupForm.caseId = undefined
                console.log('parentId：'+this.groupForm.parentId+',createUser:'+this.groupForm.createUser+
                ',autId:'+this.groupForm.autId)
                Request({
                    url: '/interfaceNewController/addSingleInterfaceGroup',
                    method: 'post',
                    params: this.groupForm
                }).then((res) => {
                    if(res.respCode == '0000'){
                        this.isDialogVisible = false
                        this.$message.success('添加成功')
                        this.getParentChildrenRef('sidebar').getGroup()
                    }else {
                        this.$message.error(res.respMsg)
                        this.isDialogVisible = false
                        console.log(err)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
						addGroupInCase(){
							this.groupForm.createUser = sessionStorage.getItem("username")
							this.groupForm.autId = undefined
							this.groupForm.caseId = this.caseLibId
							console.log('groupForm',this.groupForm)
							Request({
								url: '/interfaceNewController/addSingleInterfaceGroupByCaseId',
								method: 'post',
								params: this.groupForm
							}).then((res) => {
								if(res.respCode === "0000"){
									this.isDialogVisible = false
									this.$message.success('添加成功')
									this.getParentChildrenRef('sidebar').getGroup()
								} else {
									this.dialogVisible = false
									console.log(res.respMsg)
								}
							}).catch((err) => {
								this.$alert(err.respMsg)
								console.log(err)
							})
						},
            // 修改分组
            updateGroup() {
                this.updateGroupForm.modifiedUser = sessionStorage.getItem("username")
								if(this.caseNeed){
									this.updateGroupForm.autId = undefined
									this.updateGroupForm.caseLibId = this.caseLibId
								}else {
									this.updateGroupForm.autId = this.autId
									this.updateGroupForm.caseLibId = undefined
								}
                this.updateGroupForm.groupName = this.groupForm.groupName
                console.log(this.updateGroupForm)
                Request({
                    url: '/interfaceNewController/updateInterfaceGroup',
                    method: 'post',
                    params: this.updateGroupForm
                }).then((res) => {
                    if(res.respCode == '0000'){
                        this.isDialogVisible = false
                        this.$message.success('修改成功')
                        console.log('测试1')
                        this.getParentChildrenRef('sidebar').getGroup()
                    }else {
                        this.$message.error(res.respMsg)
                        this.isDialogVisible = false
                        console.log(err)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            deleteGroup(id) {
                Request({
                    url: '/interfaceNewController/deleteInterfaceGroup',
                    method: 'post',
                    params: {
                        id :id
                    }
                }).then((res) => {
                    this.isDialogVisible = false
                    this.$message.success('删除成功')
                    this.getParentChildrenRef('sidebar').getGroup()
                }, (err) => {
                    this.$message(res.respMsg)
                    this.isDialogVisible = false
                    console.log(err)
                }).catch((err) => {
                    console.log(err)
                })
            },

        }
    }
</script>

<style lang="less" scoped>
    .el-menu-item {
        font-size: 14px  !important;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 14px;
    }
    .el-dropdown {
        position: absolute !important;
        right: 20px;
    }
    .isisCollapse-span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
    }
    .open-span {
        width: auto;
        visibility: visible;
    }
    /**添加取消按钮样式 */
    .buttons_row {
        text-align: center;
        margin-bottom: -15px;
    }

</style>

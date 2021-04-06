<template>
    <div :class="isCollapse?'narrow-side-bar':'side-bar'">
        <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @select="handleSelect"
                background-color="#E7E7E7"
                :collapse="isCollapse">
                <el-row>
                    <el-button v-show="!isCollapse" class="newInterface-button"  @click="newGroup" type="primary" size="small">
                        <i class="el-icon-plus"></i>创建分组
                    </el-button>
                    <el-button class="isCollapse-button" @click="isCollapse=!isCollapse" icon="el-icon-open"></el-button>
                </el-row>
                <el-menu-item index="0" style="text-align:center;padding-right:40px" @click.native="getAllTableData">
                    <i class="el-icon-s-operation"></i>
                    <span slot="title">所有接口</span>
                </el-menu-item>
            <!-- 引入组件 -->
            <MenuAndDropdown :menuData="menuList" :isCollapse="isCollapse"></MenuAndDropdown>
        </el-menu>
         <el-dialog :title="getTitle" :visible.sync="dialogVisible" :before-close="handleClose" width="30%">
        <el-form :rules="rules" :model="form" ref="form" label-width="80px" status-icon>
            <el-form-item label="分组名称" prop="groupName">
                <el-input style="width:100%" size="small" placeholder="请输入分组名称" v-model.lazy="form.groupName"></el-input>
            </el-form-item>
            <el-row class="buttons_row">
                <el-button type="primary" size="small" @click="submitForm('form')">{{buttonName}}</el-button>
                <el-button size="small" @click="cancelButtonClicked">取消</el-button>
            </el-row>
        </el-form>
    </el-dialog>
    </div>
</template>
 
<script>
    import MenuTree from "@/components/interfaceTest/MenuTree";
    import MenuAndDropdown from "@/components/interfaceTest/MenuAndDropdown";
 
export default {
        name: "Nav",
        components: {
            MenuTree: MenuTree,
            MenuAndDropdown: MenuAndDropdown
        },
        data() {
            return {
                menuData : [],
                isCollapse: false,
                menuList : [{
                    index: "1",
                    name: "用户模块",
                    children: [{
                        index: "2",
                        name: "账号相关",
                        children: [{
                            index: "3",
                            name: "用户登录",
                        }, {
                            index: "4",
                            name: "用户注销",
                        }],
                    }]
                }, {
                    index: "5",
                    name: "企业模块",
                }, {
                    index: "6",
                    name: "测试模块",
                }, {
                    index: "7",
                    name: "日志模块",
                }],
                dialogVisible: false,
                form: {
                    groupName:"",
                },
                modelFlag: 1,
                rules: {
                    groupName: [{
                        required: true,
                        message: "分组名称是必填项",
                        trigger: "blur"
                    }]
                },
                autId: Number(localStorage.getItem('transactAutId'))
            }
        },
        props:{
            getTableData: {
                type: Function,
            },
            getAllTableData: {
                type: Function,
            },
            getGroupByAutId: {
                type: Function,
            },
        },
        computed: {
            //根据modelFlag 展示弹窗的名字
            getTitle() {
                var obj = {
                    1: '新建分组',
                    2: '修改分组'
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
            },
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                this.getTableData(keyPath)
            },
            newGroup(){
                this.modelFlag = 1
                this.dialogVisible = true;
            },
            handleClose(done) {
                if (this.modelFlag == 1) {
                    done()
                    return true
                }
                this.$refs['form'].resetFields()
                done()
                return true
            },
            //取消按钮
            cancelButtonClicked() {
                this.dialogVisible = false
            },
            //修改分组表单
            updateGroupButton(index, row) {
                this.modelFlag = 2
                console.log('row', row)
                const {
                    groupName
                } = row

                this.form = {
                    groupName,
                }
                this.dialogVisible = true
            },
            // 提交表单进行验证
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 如果是修改则调用 updateGroup 方法 否则调用 addGroup
                        console.log(this.modelFlag)
                        if (this.modelFlag === 2) {
                            this.updateGroup()
                        } else {
                            this.addGroup()
                        }
                    } else {
                        this.$message('信息格式有误，请检查')
                        return false;
                    }
                });
            },
            // 添加分组
            addGroup() {
                Request({
                    url: '/testProjectController/addSingleTestProject',
                    method: 'post',
                    params: this.form
                }).then((res) => {

                    this.dialogVisible = false
                    this.getGroupByAutId(autId)

                }, (err) => {
                    this.$alert("该分组名称已存在")
                    this.dialogVisible = false
                    console.log(err)
                }).catch((err) => {
                    this.$alert(err.respMsg)
                    console.log(err)
                })
            },
            // 修改分组
            updateGroup() {
                Request({
                    url: '/testProjectController/modifySingleTestProject',
                    method: 'post',
                    params: {
                    }
                }).then((res) => {
                    this.dialogVisible = false
                    this.$message.success('修改成功')
                    this.getGroupByAutId(autId)
                }, (err) => {
                    this.$message(res.respMsg)
                    this.dialogVisible = false
                    console.log(err)
                }).catch((err) => {
                    console.log(err)
                })
            },
        
    }
};
</script>

<style lang="less" scoped>
.side-bar {
    width: 240px;
    flex-shrink: 0;
    min-height: calc(100vh - 90px);
    .el-menu-vertical-demo {
        min-height: 400px;
        height: 100%;
    }
}

.narrow-side-bar {
    width: 90px;
    flex-shrink: 0;
    min-height: calc(100vh - 90px);
    .el-menu-vertical-demo {
        min-height: 400px;
        height: 100%;
    }
}
.radioGroup .el-divider--horizontal{
	margin:0 !important;
}
	.radioGroup label{
		margin-bottom: 0;
        margin-left: 150px !important;
	}
    .radioGroup .el-radio-button--small .el-radio-button__inner{
        padding:6px 8px !important;
}
.el-menu-item {
    font-size: 14px;
}
.isCollapse-button{
    border: 0;
    background-color: #E7E7E7;
    float: right;
    font-size: 20px;
    margin-top: 5px;
}
.newInterface-button{
    margin:10px 0 0 30px
}
/**添加取消按钮样式 */
.buttons_row {
    text-align: center;
    margin-bottom: -15px;
}
</style>
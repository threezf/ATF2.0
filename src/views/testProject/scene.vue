<template>
    <div class="page-inner">
        <el-container>
            <el-main>
                <el-row :gutter="20">
                    <el-col :span="4">
                        <el-input  v-model="selectInfo" placeholder="请输入内容"></el-input>
                    </el-col>
                    <el-col :span="5" >
                        <el-button
                            size="small"
                            @click='getScenes(1)'
                            icon="el-icon-search"
                            :loading="tableLoading"
                            type="primary">
                            搜索
                        </el-button>
                        <el-button  
                            size="small"
                            @click='addSceneButtom'
                            type="primary"
                            icon="el-icon-plus">
                            添加
                        </el-button>
                    </el-col>
                </el-row>
                <el-table
                    stripe
                    :data="tableData"
                    :loading='tableLoading'
                    class='table'>
                    <el-table-column
                        label="场景名称"
                        property="nameMedium"
                        width="120"/>
                    <el-table-column
                        label="场景描述"
                        property="descShort"
                        width="120"/>
                    <el-table-column
                        label="创建时间"
                        property='createTime'
                        :formatter="transTime"
                        width="180"/>
                    <el-table-column
                        label="修改时间"
                        property="modifiedTime"
                        :formatter="transTime"
                        width="180"/>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleDetail(scope.$index, scope.row)">管理</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-col :span="10" :offset='4'>
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 10, 20, 50]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount">
                        </el-pagination>
                    </el-col>
                </div>
                <el-dialog
                    :title="modelName"
                    :visible.sync="dialogVisible"
                    :before-close="handleClose"
                    width="30%">
                    <el-form ref="form"  :model="form" label-width="80px">
                        <el-form-item   label="场景名称" prop="senceName" required >
                            <el-input   v-model="form.senceName"></el-input>
                        </el-form-item>
                        <el-form-item   label="场景描述" prop="senceDesc" >
                            <el-input   v-model="form.senceDesc"></el-input>
                        </el-form-item>
                        <el-form-item >
                            <el-button    type="primary" @click="submitForm()">{{buttonName}}</el-button>
                            <el-button   @click="resetForm('form')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
            </el-main>
            <el-footer>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import Request from '@/libs/request.js'
    import VueMixins from '@/libs/vueMixins.js'
    export default {
        mixins: [VueMixins], // 混入
        data() {
            let caseLibId = sessionStorage.getItem('caselibId')
            let currentUserId = sessionStorage.getItem('userId') || '3'
            return {
                form: {
                    senceName: "",
                    senceDesc: ""
                },
                selectInfo: '', // 搜索输入
                tableData: [],
                totalCount: 0,
                currentPage: 1,
                pageSize: 5,
                dialogVisible: false,
                modelFlag: 0,
                //场景ID
                selectedId: -1,
                // 用例库ID
                caseLibId: caseLibId,
                currentUserId: currentUserId,
                tableLoading: false
            }
        },
        computed:{
            // 发送的 查询场景的接口参数，因为受搜索条件影响，所以使用computed属性
            params() {
                let obj = {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                orderColumns: "modified_time",
                orderType: "DESC",
                caseLibId: this.caseLibId
                }
                return obj
            },
            //根据modelFlag 展示弹窗的名字
            modelName(){
                var obj ={
                    0: '场景',
                    1: '添加场景',
                    2: '修改场景信息'
                }
                return obj[this.modelFlag]
            },
            //用于展示弹窗按钮的文字
            buttonName(){
                var obj ={
                    0: '确认',
                    1: '添加',
                    2: '修改信息'
                }
                return obj[this.modelFlag]
            }
        },
        created(){
            this.getScenes()
        },
        mounted() {
        },
        methods: {
            handleClose(done){
                if(this.modelFlag ==1){
                    done()
                    return true
                }
                this.$refs['form'].resetFields()
                done()
                return true
            },
            // 提交表单进行验证
            submitForm() {
                if (this.form.senceName.trim() !=='' ) {
                    // 如果是修改则调用 updateScene 方法 否则调用 addScene
                    if(this.modelFlag === 2){
                        this.updateScene()
                    }
                    else{
                        this.addScene()
                    }
                } else {
                    this.$message('场景名称不能为空')
                    return false;
                }
            },
            // 清空form表单
            resetForm(formName) {
                 this.$refs[formName].resetFields();
            },
            // 掉起form表单 并将modelFlag标志置为2 且将选中的一列数据存放于
            handleDetail(index, row) {
                this.modelFlag = 2
                const {
                    senceName,
                    senceDesc
                } = row

                this.form = {
                    senceName,
                    senceDesc
                }
                this.dialogVisible = true
                const sceneId = row.id;
                console.log('管理',sceneId);
                this.$router.push({path: 'sceneSetting',query: {id: sceneId, caseLibId: row.caseLibId}})
            },
            // 掉起form表单 并将modelFlag标志置为 3
            handleEdit(index, row) {
                this.form = {
                    senceName : row.nameMedium,
                    senceDesc : row.descShort
                }
                this.dialogVisible = true
                this.modelFlag = 2
                this.selectedId = row.id
            },
            handleDelete(index,row){
                this.selectedId = row.id
                this.$confirm('此操作将永久删除该场景, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteScene()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            //角色一栏处理函数
            roleSwitch(row, column) {
                return row.role && this.roles[row.role];
            },
            //状态一栏处理函数
            statusSwitch(row, column) {
                return  this.status[row.status];
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.getScenes()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getScenes()
            },
            // 查询场景函数 type时 为点击查询按钮调用 此时将当前页置为一
            getScenes(type){
                if(type === 1){
                    this.currentPage = 1
                }
                this.tableLoading = true
                Request({
                    url: '/sceneController/pagedBatchQueryScene',
                    method: 'post',
                    params: this.params
                }).then((res) => {
                    this.tableData = res.sceneEntityList
                    this.totalCount = res.totalCount
                },(err) => {
                    console.log(err)
                }).catch((err) => {
                    console.log(err)
                }).finally(_=>{
                    this.tableLoading = false
                })
            },
            // 掉起form表单 并将modelFlag标志置为 1
            addSceneButtom(){
                this.modelFlag=1
                this.dialogVisible=true
                this.disabled = false
            },
            // 添加场景
            addScene(){
                Request({
                    url: '/sceneController/insertScene',
                    method: 'post',
                    params: {
                        nameMedium:this.form.senceName ,
                        descShort: this.form.senceDesc,
                        caseLibId: this.caseLibId,
                        creatorId: this.currentUserId
                    }
                }).then((res) => {
                    this.$message(res.respMsg)
                    this.dialogVisible = false
                    this.getScenes()
                },(err) => {
                    this.$message(res.respMsg)
                    this.dialogVisible = false;
                    console.log('error occur')
                    console.log(err)
                    this.$message(err.respMsg)
                    this.dialogVisible = false
                }).catch((err) => {
                    console.log(err)
                })
            },
            // 修改场景
            updateScene(){
                Request({
                    url: '/sceneController/updateScene',
                    method: 'post',
                    params: {
                        modifierId: this.currentUserId,
                        id: this.selectedId,
                        ...this.form
                        }
                }).then((res) => {
                    this.$message(res.respMsg)
                    this.dialogVisible = false
                    this.getScenes()
                },(err) => {
                    this.$message(res.respMsg)
                    this.dialogVisible = false
                    console.log(err)
                }).catch((err) => {
                    console.log(err)
                })
                this.form.checkPassword=''
            },
            // 删除场景
            deleteScene(){
                Request({
                    url: '/sceneController/deleteScene',
                    method: 'post',
                    params: {
                        id: this.selectedId
                        }
                }).then((res) => {
                    this.$message(res.respMsg)
                    this.dialogVisible = false
                    this.getScenes()
                },(err) => {
                    this.$message(res.respMsg)
                    this.dialogVisible = false
                    console.log(err)
                }).catch((err) => {
                    console.log(err)
                })
                this.form.checkPassword=''
            }
        },
    }
</script>

<style lang="less" scoped>
    .block{
        margin: 10px auto
    }
    .table{
        padding-top:10px
    }
</style>

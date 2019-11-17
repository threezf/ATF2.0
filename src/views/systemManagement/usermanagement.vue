<template>
    <div class="page-inner">
        <el-container>
            <el-header>
                <el-button
                    @click='addUserButtom'
                    type="primary"
                    icon="el-icon-plus">
                    添加用户
                </el-button>
            </el-header>
            <el-main>
                <el-col :span="3">
                    <el-select v-model="selectValue" placeholder="请选择">
                        <el-option
                        v-for="item in selectOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4" :offset='1'>
                    <el-input :disabled='disabled'  v-model="selectInfo" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="4" :offset='1'>
                    <el-button 
                        @click='getUsers(1)'
                        type="primary">
                        搜索
                    </el-button>
                </el-col>
                <el-table
                    stripe
                    :data="tableData"
                    class='table'>
                    <el-table-column
                        label="用户名"
                        property="username"
                        width="120"/>
                    <el-table-column
                        label="姓名"
                        property="reallyname"
                        width="120"/>
                    <el-table-column
                        label="角色"
                        property='role'
                        :formatter="roleSwitch"
                        width="120"/>
                    <el-table-column
                        label="所属部门"
                        property="dept"
                        width="120"/>
                    <el-table-column
                        label="固定电话"
                        property="tel"
                        width="120"/>
                    <el-table-column
                        label="状态"
                        property="status"
                        :formatter="statusSwitch"
                        width="120"/>
                    <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleDetail(scope.$index, scope.row)">详情</el-button>
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
                    width="30%">
                    <el-form ref="form"  :rules="rules" :model="form" label-width="80px">
                        <el-form-item   label="用户名" prop="username"  >
                            <el-input :disabled='disabled'  v-model="form.username"></el-input>
                        </el-form-item>
                        <el-form-item   label="真实姓名" prop="reallyname" required>
                            <el-input :disabled='disabled'  v-model="form.reallyname"></el-input>
                        </el-form-item>
                        <el-form-item   label="密码" prop="password" required>
                            <el-input :disabled='disabled'  type="password" v-model="form.password" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item   label="确认密码" prop="checkPassword" required>
                            <el-input :disabled='disabled'  type="password" v-model="form.checkPassword" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item   label="用户状态" prop="status"  required>
                            <el-select :disabled='disabled'  v-model="form.status" placeholder="请选择用户状态">
                                <el-option label="正常" value="0"></el-option>
                                <el-option label="异常" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item   label="用户角色" prop="role"   required>
                            <el-select :disabled='disabled'  v-model="form.role" placeholder="请选择用户角色">
                                <el-option label="测试主管" value="1"></el-option>
                                <el-option label="测试经理" value="2"></el-option>
                                <el-option label="测试组长" value="3"></el-option>
                                <el-option label="自动化技术人员" value="4"></el-option>
                                <el-option label="功能测试人员" value="5"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item   label="部门" prop="dept"  >
                            <el-input :disabled='disabled'  v-model="form.dept"></el-input>
                        </el-form-item>
                        <el-form-item   label="手机号" prop="tel">
                            <el-input :disabled='disabled'  v-model="form.tel"  ></el-input>
                        </el-form-item>
                        <el-form-item   label="固定电话" prop="phone" >
                            <el-input :disabled='disabled'  v-model="form.phone"></el-input>
                        </el-form-item>
                        <el-form-item   label="邮箱" prop="email">
                            <el-input :disabled='disabled'  v-model="form.email" ></el-input>
                        </el-form-item>
                        <el-form-item >
                            <el-button  :disabled='disabled'  type="primary" @click="submitForm('form')">{{buttonName}}</el-button>
                            <el-button :disabled='disabled'  @click="resetForm('form')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
            </el-main>
            <el-footer>
                底部
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import Request from '@/libs/request.js'
    import VueMixins from '@/libs/vueMixins.js'
    export default {
        mixins: [VueMixins],
        data() {
                const validatePass = (rule, value, callback) => {
                    if (value === '') {
                    callback(new Error('请输入密码'));
                    } else {
                    if (this.form.checkPassword !== '') {
                        this.$refs.form.validateField('checkPassword');
                    }
                    callback();
                    }
                };
                const validatePass2 = (rule, value, callback) => {
                    if (value === '') {
                    callback(new Error('请再次输入密码'));
                    } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                    } else {
                    callback();
                    }
                };
            return {
                form: {
                    username: "",
                    reallyname: "",
                    password: "",
                    checkPassword:'',
                    role: "",
                    status: "",
                    dept: "",
                    tel: "",
                    phone: "",
                    email: "",
                    roleCn: ""
                },
                rules:{
                    username:[
                        { required: true, message: '请输入用户名称', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                    reallyname:[
                        { required: true, message: '请输入真实姓名', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ],
                    role:[
                        { required: true, message: '请选择用户角色', trigger: 'change' }
                    ],
                    status:[
                        { required: true, message: '请选择用户状态', trigger: 'change' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPassword: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    dept: [
                        { required: false, message: '请选择用户状态', trigger: 'blur' }
                    ],
                    tel: [
                        { required: false, message: '请选择用户状态', trigger: 'blur' }
                    ],
                    phone:[
                        { required: false, message: '请选择用户状态', trigger: 'blur' }
                    ],
                    email: [
                        { required: false, message: '请选择用户状态', trigger: 'blur' }
                    ],
                },
                roles : {
                    1: "测试主管", 
                    2: "测试经理", 
                    3: "测试组长", 
                    4: "自动化技术人员", 
                    5: "功能测试人员"
                    }, // 角色类型
                status : {0: '正常', 1: '异常'},// 角色状态
                selectOptions:[
                    {
                        label:'用户名',
                        value:'username'
                    },
                    {
                        label:'姓名',
                        value:'reallyname'
                    },
                    {
                        label:'角色',
                        value:'role'
                    },
                    {
                        label:'固定电话',
                        value:'tel'
                    },
                    {
                        label:'部门',
                        value:'dept'
                    }
                ],
                selectValue:'', // 搜索选项
                selectInfo:'', // 搜索输入
                tableData: [],
                totalCount: 0,
                currentPage:1,
                pageSize:5,
                dialogVisible:false,
                disabled:false,
                modelFlag:0,
                selectedId:-1
            }
        },
        computed:{
            params() {
                let obj = {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                orderColumns: "id",
                orderType: "asc",
                dept: "",
                reallyname: "",
                role: "",
                tel: "",
                username: "",
                }
                if(this.selectInfo !== '' && this.selectValue){
                    obj[this.selectValue] = this.selectInfo
                }
                return obj
            },
            modelName(){
                var obj ={
                    0: '用户',
                    1: '添加用户',
                    2: '用户详情',
                    3: '修改用户信息'
                }
                return obj[this.modelFlag]
            },
            buttonName(){
                var obj ={
                    0: '确认',
                    1: '立即创建',
                    2: '确认',
                    3: '修改信息'
                }
                return obj[this.modelFlag]
            }
        },
        created(){
            this.getUsers()
        },
        mounted() {
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.modelFlag === 3){
                        this.updateUser()
                    }
                    else{
                        this.addUser()
                    }
                } else {
                    this.$message('信息格式有误，请检查')
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleDetail(index, row) {
                console.log(row)
                this.disabled = true
                this.modelFlag = 2
                const {
                    username,
                    reallyname,
                    password,
                    role,
                    status,
                    dept,
                    tel,
                    phone,
                    email,
                    roleCn
                } = row

                this.form = {
                    username,
                    reallyname,
                    password,
                    checkPassword:password,
                    role: role===null ? '' : role+'',
                    status: status===null ? '' : status+'',
                    dept,
                    tel,
                    phone,
                    email,
                    roleCn
                }
                this.dialogVisible = true
            },
            handleEdit(index, row) {
                this.handleDetail(index, row);
                this.modelFlag = 3
                this.disabled = false
                this.selectedId = row.id
            },
            roleSwitch(row, column) {
                return row.role && this.roles[row.role];
            },
            statusSwitch(row, column) {
                return  this.status[row.status];
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.getUsers()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getUsers()
            },
            getUsers(type){
                if(type === 1){
                    this.currentPage = 1
                }
                Request({
                    url: '/userController/pagedBatchQueryUser',
                    method: 'post',
                    params: this.params
                }).then((res) => {
                    this.tableData = res.list
                    this.totalCount = res.totalCount
                },(err) => {
                    console.log('-*-*-*-*-*-')
                    console.log(err)
                }).catch((err) => {
                    console.log(err)
                })
            },
            addUserButtom(){
                this.dialogVisible=true
                this.resetForm('form')
                this.modelFlag=1
            },
            addUser(){
                Request({
                    url: '/userController/insert',
                    method: 'post',
                    params: this.form
                }).then((res) => {
                    this.$message(res.respMsg)
                    this.dialogVisible = false
                    this.getUsers()
                },(err) => {
                    this.$message(res.respMsg)
                    this.dialogVisible = false
                    console.log(err)
                }).catch((err) => {
                    console.log(err)
                })
            },
            updateUser(){
                delete this.form.checkPassword
                Request({
                    url: '/userController/updateByPrimaryKey',
                    method: 'post',
                    params: {
                        id: this.selectedId,
                        ...this.form
                        }
                }).then((res) => {
                    this.$message(res.respMsg)
                    this.dialogVisible = false
                    this.getUsers()
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
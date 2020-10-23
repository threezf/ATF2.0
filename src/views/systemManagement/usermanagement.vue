<template>
<page>
    <el-row>
        <el-button size="small" @click='addUserButtom' type="primary" icon="el-icon-plus">
            添加用户
        </el-button>
    </el-row>
    <el-row :gutter="15">
        <el-col :span="3">
            <el-select size="small" v-model="selectValue" placeholder="请选择" @change="handleSelectChange">
                <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="4" style="margin-left: 10px">
            <el-input size="small" v-model="selectInfo" placeholder="请输入内容" clearable>
                <el-button icon="el-icon-search" @click='getUsers(1)' slot="append">
                </el-button>
            </el-input>
        </el-col>
    </el-row>
    <el-table stripe border :data="tableData" class='table'>
        <el-table-column label="用户名" property="username" min-width="16%" />
        <el-table-column label="真实姓名" property="reallyname" min-width="16%" />
        <el-table-column label="公司名称" property="companyName" min-width="20%" />
        <el-table-column label="手机号" property="telephone" min-width="20%" />
        <el-table-column label="邮箱" property="email" min-width="15%" />
        <el-table-column label="修改时间" min-width="20%" prop="modifiedTime" :formatter="transTime" />
        <el-table-column label="状态" width="80px" align="center">
            <template slot-scope="scope">
                <el-tag v-if="scope.row.status === 1" type="primary">正常
                </el-tag>
                <el-tag v-else type="warning">锁定
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="启用" width="100px" align="center">
            <template slot-scope="scope">
                <el-switch v-model="switches[scope.$index]" active-color="#13ce66" inactive-color="#ff4949" @change="doSwitchChange(scope.row)">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column v-if="params.userId != 3" label="操作" width="140px" align="center">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="block">
        <el-col :span="10" :offset='4'>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
        </el-col>
    </div>
    <el-dialog :title="modelName" :visible.sync="dialogVisible" :before-close="handleClose" width="30%" style="margin-top: -60px">
        <el-form class="demo-ruleForm" ref="form" prop="form" :rules="rules" :model="form" label-width="80px">
            <el-form-item label="用户名" prop="username">
                <el-input size="small" :disabled='disabled' v-model="form.username">
                </el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="reallyname" required>
                <el-input size="small" :disabled='disabled' v-model="form.reallyname">
                </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" required>
                <el-input size="small" :disabled='disabled' type="password" v-model="form.password" show-password auto-complete="off">
                </el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="againPassward" required>
                <el-input size="small" :disabled='disabled' type="password" show-password v-model="form.againPassward" auto-complete="off">
                </el-input>
            </el-form-item>
            <el-form-item label="用户状态" prop="status" v-if="false" required>
                <el-select size="small" :disabled='disabled' v-model="form.status" placeholder="请选择用户状态">
                    <el-option label="锁定" :value="0">
                    </el-option>
                    <el-option label="正常" :value="1">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户角色" prop="roleList" required>
                <el-checkbox-group :disabled='disabled' v-model="form.roleList">
                    <el-checkbox v-for="(item, index) in roles" :key="index" :value="Number(item.id)" :label="Number(item.id)">{{item.roleName}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="手机号" prop="telephone">
                <el-input size="small" :disabled='disabled' v-model="form.telephone">
                </el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input size="small" :disabled='disabled' v-model="form.email">
                </el-input>
            </el-form-item>
            <el-row class="el-button-margin" type="flex" justify="center">
                <el-button size="small" :disabled='disabled' type="primary" @click="submitForm('form')">{{buttonName}}
                </el-button>
                <el-button size="small" :disabled='disabled' @click="resetForm('form')">重置
                </el-button>
            </el-row>
        </el-form>
    </el-dialog>
    <el-dialog title="展示详情" :visible.sync="detailVisible" width="16%">
        <el-form :model="showForm" class="showDialogForm" label-width="85px">
            <el-form-item label="用户名：">
                <span>{{showForm.username}}</span>
            </el-form-item>
            <el-form-item label="真实姓名：">
                <span>{{showForm.reallyname}}</span>
            </el-form-item>
            <el-form-item label="手机号：">
                <span>{{showForm.telephone}}</span>
            </el-form-item>
            <el-form-item label="邮箱：">
                <span>{{showForm.email}}</span>
            </el-form-item>
            <el-form-item class="roleForm" label="用户角色">
                <el-checkbox v-for="(item, index) in showForm.roleList" :key="index" :value="item" :label="item.roleName" v-model="showForm.checked" disabled>{{item.roleName}}
                </el-checkbox>
                <span v-if="showForm.roleList.length === 0">
                    暂未分配角色
                </span>
            </el-form-item>
            <br>
        </el-form>
        <el-row class="el-button-margin" type="flex" justify="center">
            <el-button type="warning" size="small" plain style="margin: 0 auto -10px" @click="detailVisible = false">关闭
            </el-button>
        </el-row>
    </el-dialog>
    <el-dialog title="修改用户" width="30%" :visible.sync="updateDialogShow">
        <el-form label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="updateForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
                <el-input v-model="updateForm.reallyname" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户角色">
                <el-checkbox-group v-model="updateForm.roleList">
                    <el-checkbox v-for="(item, index) in roles" :key="index" :value="Number(item.id)" :label="Number(item.id)">{{item.roleName}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-row class="updateDialogRow">
                <el-button type="primary" size="small" @click="updateSure">确认
                </el-button>
                <el-button type="warning" size="small" plain @click="updateCancel">取消
                </el-button>
            </el-row>
        </el-form>
    </el-dialog>

    <el-footer>
        <div class="block">
            <el-col :span="10" :offset='4'>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                </el-pagination>
            </el-col>
        </div>
    </el-footer>
</page>
</template>

<script>
import Request from '@/libs/request.js'
import VueMixins from '@/libs/vueMixins.js'
import moment, {
    now
} from 'moment';
export default {
    mixins: [VueMixins], // 混入
    data() {
        const phoneExp = /^1[3|4|5|7|8]\d{9}$/
        const emailExp = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/
        const validUsername = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error('请输入用户名'))
            } else if (!(phoneExp.test(value) || emailExp.test(value))) {
                return callback(new Error("用户名必须是手机号或者邮箱"))
            } else {
                return callback()
            }
        }
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
        const validAgainPassward = (rule, value, callback) => {
            if (value === "") {
                return callback(new Error("请输入确认密码"))
            } else if (value !== this.form.password) {
                return callback(new Error('两次密码不一致'))
            } else {
                return callback()
            }
        }
        const validPhone = (rule, value, callback) => {
            if (!(phoneExp.test(value))) {
                return callback(new Error('请输入规范的手机号'))
            } else {
                return callback()
            }
        }
        const validEmail = (rule, value, callback) => {
            if (!(emailExp.test(value))) {
                return callback(new Error('请输入规范的邮箱'))
            } else {
                return callback()
            }
        }
        return {
            form: {
                username: "", // 用户姓名
                password: "", // 密码
                reallyname: "", // 真实姓名
                email: "", // 邮箱
                telephone: "", // 联系方式
                totalScore: 0, // 新老用户认证积分（新加）
                mark: 0, // 用户标识 0:企业 / 1: 个人
                roleList: [], // 角色名称
                companyName: '', // 企业名称
                status: 1, // 状态
                lastLoginDate: '', // 上次登录时间
                lastLoginIp: '', // 上次登录ip
                createTime: '', // 创建时间
                modifiedTime: '', // 修改时间
                modifierId: '', // 修改者id
                creatorId: '', // 创建者id
                againPassward: '',
            },
            rules: {
                username: [{
                    validator: validUsername,
                    trigger: 'blur'
                }],
                reallyname: [{
                        required: true,
                        message: '请输入真实姓名',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 5,
                        message: '长度在 2 到 5 个字符',
                        trigger: 'blur'
                    }
                ],
                roleList: [{
                    type: "array",
                    required: true,
                    message: '请选择至少一个用户角色',
                    trigger: 'change'
                }],
                status: [{
                    required: true,
                    message: '请选择用户状态',
                    trigger: 'change'
                }],
                password: [{
                    validator: validatePass,
                    message: '请输入密码',
                    trigger: 'blur'
                }],
                againPassward: [{
                    validator: validAgainPassward,
                    trigger: 'blur'
                }],
                telephone: [{
                    validator: validPhone,
                    trigger: 'blur'
                }],
                email: [{
                    validator: validEmail,
                    trigger: 'blur'
                }],
            },
            roles: [], // 角色类型
            status: {
                0: '锁定',
                1: '正常'
            }, // 角色状态
            selectOptions: [{
                    label: '用户名',
                    value: 'username'
                },
                {
                    label: '真实姓名',
                    value: 'reallyname'
                }
            ],
            selectValue: 'username', // 搜索选项
            selectInfo: '', // 搜索输入
            tableData: [],
            totalCount: 0,
            currentPage: 1,
            pageSize: 10,
            dialogVisible: false,
            disabled: false,
            modelFlag: 0,
            selectedId: -1,
            loginInfo: {},
            switches: [], // switch的数据
            // 查看用户数据
            detailVisible: false,
            showForm: {
                username: "", // 用户姓名
                reallyname: "", // 真实姓名
                email: "", // 邮箱
                telephone: "", // 联系方式
                roleList: [],
                checked: true, // 展示详情时展示的checkbox状态
            },
            // 修改用户的数据
            updateDialogShow: false,
            updateForm: {
                username: '',
                reallyname: '',
                roleList: [],
                userId: ''
            },

        }
    },
    computed: {
        // 发送的 查询用户的接口参数，因为受搜索条件影响，所以使用computed属性
        params() {
            let obj = {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                orderColumns: "id",
                orderType: "asc",
                reallyname: "",
                username: "",
                userId: sessionStorage.getItem('userId')
            }
            if (this.selectInfo !== '' && this.selectValue) {
                obj[this.selectValue] = this.selectInfo
            }
            return obj
        },
        //根据modelFlag 展示弹窗的名字
        modelName() {
            var obj = {
                0: '用户',
                1: '添加用户',
                2: '用户详情',
                3: '修改用户信息'
            }
            return obj[this.modelFlag]
        },
        //用于展示弹窗按钮的文字
        buttonName() {
            var obj = {
                0: '确认',
                1: '立即创建',
                2: '确认',
                3: '修改信息'
            }
            return obj[this.modelFlag]
        }
    },
    created() {
        this.loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
        this.getUsers()
        console.log('loginInfo', this.loginInfo)
        this.selectLimitedRoles()
        this.selectAll()
    },
    mounted() {},
    methods: {
        // 获取用户列表
        selectLimitedRoles() {
            Request({
                url: '/roleController/selectLimitedRoles',
                method: 'POST',
                params: {
                    userId: sessionStorage.getItem("userId"),
                    companyId: this.loginInfo.companyId
                }
            }).then(res => {
                this.roles = res.list.map(item => item)
                console.log('roles', this.roles)
            }).catch(error => {
                console.log(error)
            })
        },
        handleClose(done) {
            if (this.modelFlag === 1) {
                done()
                return true
            }
            done()
            return true
        },
        // 下拉框选择
        handleSelectChange() {
            this.selectInfo = ""
        },
        // 提交表单进行验证
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 如果是修改则调用 updateUser 方法 否则调用 addUser
                    if (this.modelFlag === 3) {
                        this.updateUser()
                    } else {
                        this.addUser()
                    }
                } else {
                    this.$message('信息格式有误，请检查')
                    return false;
                }
            });
        },
        // 清空form表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 掉起form表单 并将modelFlag标志置为2 且将选中的一列数据存放于
        handleDetail(index, row) {
            this.disabled = true
            this.modelFlag = 2
            this.detailVisible = true
            this.showForm.username = row.username
            this.showForm.reallyname = row.reallyname
            this.showForm.email = row.email
            this.showForm.telephone = row.telephone
            this.showForm.roleList = this.roles.filter(item => {
                return row.roleList.includes(item.id)
            })
            console.log(this.roles, row, this.showForm.roleList)
        },
        // 掉起form表单 并将modelFlag标志置为 3
        handleEdit(index, row) {
            this.modelFlag = 3
            this.disabled = false
            this.selectedId = row.id
            console.log("updateDialogShow", row)
            // this.setForm(row)
            this.updateDialogShow = true
            this.updateForm.username = row.username
            this.updateForm.reallyname = row.reallyname
            this.updateForm.roleList = row.roleList
            this.updateForm.userId = row.id
            console.log(this.updateForm, row, '修改')
        },
        //角色一栏处理函数
        roleSwitch(row, column) {
            return row.role && this.roles[row.role];
        },
        //状态一栏处理函数
        statusSwitch(row, column) {
            return this.status[row.status];
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.getUsers()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getUsers()
        },
        // 查询用户函数 type时 为点击查询按钮调用 此时将当前页置为一
        getUsers(type) {
            if (type === 1) {
                this.currentPage = 1
            }
            Request({
                url: '/userController/pagedBatchQueryUser',
                method: 'post',
                params: this.params
            }).then((res) => {
                this.tableData = res.userList
                this.totalCount = res.totalCount
                this.switches = this.tableData.map(obj => (obj.status == 1))
            }, (err) => {
                console.log(err)
                this.tableData = []
            }).catch((err) => {
                console.log(err)
            })
        },
        // 掉起form表单 并将modelFlag标志置为 1
        addUserButtom() {
            this.modelFlag = 1
            this.dialogVisible = true
            this.disabled = false
            this.$refs['form'] && this.$refs['form'].resetFields()
        },
        // 添加用户
        addUser() {
            this.form.createTime = Date.now()
            this.form.modifiedTime = Date.now()
            this.form.creatorId = sessionStorage.getItem('userId')
            this.form.companyId = this.loginInfo.companyId
            console.log(this.form)
            Request({
                url: '/userController/insert',
                method: 'post',
                params: this.form
            }).then((res) => {
                this.$message(res.respMsg)
                this.dialogVisible = false
                this.userRoleController(res.userId, this.form.companyId)
                this.getUsers()
            }, (err) => {
                this.$message(res.respMsg)
                this.dialogVisible = false
                console.log(err)
            }).catch((err) => {
                console.log(err)
            })
        },
        // 插入user
        userRoleController(userId, companyId) {
            Request({
                url: "/userRoleController/insert",
                method: 'POST',
                params: {
                    userId,
                    companyId,
                    roleList: this.form.roleList
                }
            }).then(res => {
                this.$message.success('插入成功')
            }).catch(error => {
                console.log(error)
            })
        },
        // 修改用户
        updateUser() {
            delete this.form.againPassward
            delete this.form.userPriority
            this.form.modifiedTime = Date.now()
            this.form.modifierId = sessionStorage.getItem('userId')
            console.log({
                id: this.selectedId,
                ...this.form
            })
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
                this.$refs['form'].resetFields()
                this.getUsers()
            }, (err) => {
                this.$message(res.respMsg)
                this.dialogVisible = false
                console.log(err)
            }).catch((err) => {
                console.log(err)
            })
            this.form.checkPassword = ''
        },
        // switch状态数据改变
        doSwitchChange(row) {
            row.status = (row.status == 1 ? 0 : 1)
            if (row.status == 1) {
                this.enableUserStatus(row.id)
            } else {
                this.disableUserStatus(row.id)
            }
        },
        enableUserStatus(id) {
            Request({
                url: '/userController/enableUserStatus',
                method: 'POST',
                params: {
                    id
                }
            }).then(res => {
                this.$message.success('启用成功')
            }).catch(error => {
                console.log(error)
            })
        },
        disableUserStatus(id) {
            Request({
                url: '/userController/disableUserStatus',
                method: 'POST',
                params: {
                    id
                }
            }).then(res => {
                this.$message.info('锁定成功')
            }).catch(error => {
                console.log(error)
            })
        },
        /**
         * 修改用户角色
         */
        updateSure() {
            Request({
                url: '/userRoleController/updateUserRole',
                method: 'POST',
                params: {
                    currentUserId: sessionStorage.getItem('userId'),
                    userId: this.updateForm.userId,
                    roleList: this.updateForm.roleList,
                    companyId: this.loginInfo.companyId
                }
            }).then(res => {
                if (res.respCode === "0000") {
                    this.$message.success("修改成功")
                    this.getUsers()
                }
            }).catch(error => {
                console.log('修改失败')
            })
            this.updateDialogShow = false
        },
        updateCancel() {
            this.updateDialogShow = false
        },
        selectAll() {
            Request({
                url: '/roleController/selectAll',
                method: 'post',
                params: {
                    companyId: this.loginInfo.companyId
                }
            }).then(res => {
                console.log('selectAll', res)
            }).catch(error => {
                console.log('失败')
            })
        }
    },
}
</script>

<style lang="less" scoped>
.block {
    margin: 10px auto
}

.showDialogForm {
    margin-bottom: -30px;

    .el-form-item {
        margin-bottom: 10px;
        height: 40px;
        font-weight: bold;

        span {
            font-weight: 100;
        }
    }

    .roleForm {
        height: 100%;
    }
}

.updateDialogRow {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
}

.searchRow {
    margin-bottom: 10px;

    .el-input {
        width: 200px;
    }
}
</style>

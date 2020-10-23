<template>
<div id="app">
    <el-header style="background-color: #FFF " v-if="activeMenu!= 'Login' && activeMenu != 'Rigester' && activeMenu != 'Error'">
        <el-row class="header">
            <el-col :span="3" class="logo">
                <!--		<img src="icon.jpg" alt="" style="width:50px;height:50px" />-->
                <span><i class="el-icon-cloudy" style="font-size: 32px;color:var(--blue);padding-right:2px;font-weight: bolder"></i></span>
                <span style="color:var(--blue);font-size:32px ">ATF</span>
            </el-col>
            <el-col :span="18" :offset="1">
                <el-menu v-if="menuList.length!=0" :default-active="activeMenu" class="el-menu-demo" mode="horizontal" background-color="#FFF " text-color="#fff" active-text-color="#44b549">
                    <el-menu-item v-for="route in menuList" :index="route.name" :key="route.name">
                        <router-link :to="{name: route.name}">{{route.meta.name}}</router-link>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="2" class="button">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <i class="el-icon-user-solid"></i>
                        <span style="font-weight: bold">{{currentUser}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon='el-icon-setting' @click.native="changePass">修改密码</el-dropdown-item>
                        <el-dropdown-item icon='el-icon-s-custom' @click.native="changeUser">用户状态设定</el-dropdown-item>
                        <el-dropdown-item icon='el-icon-circle-close' @click.native="logout">登出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </el-header>
    <keep-alive>
        <router-view />
    </keep-alive>
    <el-dialog :visible.sync="dialogVisible" width="25%" title="修改密码">
        <el-form :rules="rules" label-width="100px" :model="ruleForm" ref="ruleForm">
            <el-form-item prop="oldPass" label="原密码">
                <el-input v-model="ruleForm.oldPass" type="password" placeholder="请输入原密码" show-password clearable>
                </el-input>
            </el-form-item>
            <el-form-item prop="newPass" label="新密码">
                <el-input v-model="ruleForm.newPass" placeholder="请输入新密码" show-password type="password" clearable>
                </el-input>
            </el-form-item>
            <el-form-item prop="surePass" label="确认密码">
                <el-input v-model="ruleForm.surePass" type="password" placeholder="确认密码" show-password clearable>
                </el-input>
            </el-form-item>
        </el-form>
        <el-row class="buttonRows">
            <el-button type="primary" size="small" @click="submitForm('ruleForm')">修改
            </el-button>
            <el-button type="warning" size="small" plain @click="cancel">取消
            </el-button>
        </el-row>
    </el-dialog>
    <el-dialog title="用户状态设定" width="18%" :visible.sync="statusVisible">
        <el-form label-width="100px">
            <el-form-item label="当前用户状态">
                <el-select @change="handleStatusChange" v-model="userStatus">
                    <el-option :value="1" label="老用户">
                    </el-option>
                    <el-option :value="2" label="新用户">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-dialog>
</div>
</template>

<script>
import Request from "@/libs/request.js";
export default {
    name: "App",
    data() {
        let activeMenu = window.activeMenu;
        const validPassSure = (rule, value, callback) => {
            if (value == '') return callback(new Error('请输入确认密码'))
            else if (value !== this.ruleForm.newPass) return callback(new Error('两次密码不一致'))
            else return callback()
        }
        return {
            routes: this.$router.options.routes,
            activeMenu: activeMenu,
            dialogVisible: false,
            statusVisible: false,
            ruleForm: {
                oldPass: '',
                newPass: '',
                surePass: ''
            },
            rules: {
                oldPass: [{
                    required: true,
                    trigger: 'blur',
                    message: '请输入原密码'
                }],
                newPass: [{
                    required: true,
                    trigger: 'blur',
                    message: '请输入新密码'
                }],
                surePass: [{
                    validator: validPassSure,
                    trigger: 'blur'
                }],

            },
            userStatus: 1,
            isStepsShow: true,
            loginInfo: {},
            currentUser: '', // 当前用户
            totalScore: '',
            urls: []
        };
    },
    watch: {
			$route: {
				handler(to, from) {
					this.activeMenu = to.meta.parent || to.name;
					if (this.activeMenu == 'TestProjectIndex') {
						this.activeMenu = "TestProject";
					}
				},
			},
		},
        computed: {
            menuList() {
                let menuList = [];
                this.$router.options.routes.forEach((item, index) => {
                    if (item.path != "/" && !item.meta.hide) {
                        if (index === 2) {
                            menuList.push(item)
                        } else {
                            if (this.urls.indexOf(item.meta.another) > -1) {
                                menuList.push(item)
                            }
                        }
                    }
                });
                return menuList;
            }
        },
        methods: {
            logout() {
                this.$confirm('是否注销登录', '警告', {
                    confirmButton: '确定',
                    cancelButton: '取消',
                    type: 'warning'
                }).then(() => {
                    Request({
                        url: '/limitLoginNumberController/minusCompanyRedisKey',
                        method: 'post',
                        params: {
                            companyId: JSON.parse(localStorage.getItem('loginInfo')).companyId
                        }
                    }).then(res => {
                        if(res.respCode === '0000') {
                            this.$message.success(res.respMsg)
                            this.$router.push({
                                path: "/login",
                            });
                        }
                    }).catch(err => {

                    })
                }).catch(() => {})
            },
            // 修改密码
            changePass() {
                this.dialogVisible = true
            },
            submitForm(ruleForm) {
                let params = {
                    userId: this.loginInfo.userId,
                    oldPassword: this.ruleForm.oldPass,
                    newPassword: this.ruleForm.newPass
                }
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        Request({
                            url: '/userController/updatePassword',
                            method: 'POST',
                            params: params
                        }).then(res => {
                            if (res.respCode === "0000") {
                                this.$message.success(res.respMsg)
                                this.dialogVisible = false
                                this.$refs['ruleForm'].resetFields()
                            } else {
                                this.$message.warning(res.respMsg)
                            }
                        }).catch(error => {
                            this.$message.warning("原密码错误")
                        })
                    } else {
                        return false
                    }
                })
            },
            cancel() {
                this.dialogVisible = false
            },
            changeUser() {
                this.statusVisible = true
            },
            handleStatusChange(val) {
                this.$store.commit('changeFlag', val == 2)
                localStorage.setItem("userType", val == 2)
            },
            // 初始化用户状态
            initUserState() {
                this.totalScore = sessionStorage.getItem("totalScore")
                const userType = localStorage.getItem('userType')
                this.$store.commit("changeFlag", userType === 'true')
                if (this.totalScore <= 100) {
                    // localStorage.setItem('userType', 'true')
                } else {
                    // localStorage.setItem('userType', 'false')
                    // this.$store.state.commit("changeFlag", 'false')
                }
            },
        },
        created() {
            const flag = localStorage.getItem("userType")
            this.loginInfo = JSON.parse(localStorage.getItem('loginInfo')) ? JSON.parse(localStorage.getItem('loginInfo')) : {}
            this.urls = localStorage.getItem("urls").split(',')
            this.currentUser = sessionStorage.getItem("username")
            if (flag == 'false') {
                this.userStatus = 1
            } else {
                this.userStatus = 2
            }
            this.initUserState()
        },
        mounted() {
            this.$bus.on('setUrls', (urls) => {
                this.urls = urls.urlList
                this.currentUser = urls.currentName
                localStorage.setItem('username', urls.currentName)
            })
        }
    }
</script>

<style lang="less">
@import "./styles/base.less";

.el-menu.el-menu--horizontal {
    border-bottom: solid 0px;
}

.header .logo {
    background-color: #FFF !important;
}

.mainTitle {
    line-height: 60px;
    max-width: 0;
}

.logout {
    background: transparent !important;
    border: none;
    height: 60px;
}

.el-icon-switch-button {
    font-size: 26px;
}

.logo,
.button {
    height: 60px !important;
}

.el-dropdown-link {
    color: white;
    cursor: pointer;
}

.el-dropdown-menu {
    top: 40px !important;
}

.el-input {
    width: 90%;
}

.buttonRows {
    display: flex;
    justify-content: flex-end;
    padding-right: 35px;
}

.el-menu-item {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.currentUser {
    font-size: 16px;
    font-weight: normal;
}

.currentUser:hover {
    background: white;
}

.header a {
    padding: 0 !important;
}

.el-menu--horizontal>.el-menu-item a,
.el-menu--horizontal>.el-menu-item a:hover {
    color: #011425;
    font-size: 17px;
}

.el-menu--horizontal>.el-menu-item {
    width: 125px
}

.el-dropdown-link {
    color: #011425;
    font-size: 17px;
}

.el-header {
    padding: 0 5px
}
</style>

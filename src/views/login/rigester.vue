<!--
  companyId
-->
<template>
<div class="rigesterPageStyle">
    <el-row class="headRow">
        <span class="titleSpan">{{title}}</span>
        <span class="subtitleSpan">{{subtitle}}</span>
    </el-row>
    <!-- <el-steps :active="currentStep" simple>
        <el-step title="填写帐户信息" icon="el-icon-edit"></el-step>
        <el-step title="注册成功" icon="el-icon-success"></el-step>
    </el-steps> -->
    <div v-if="currentStep === 1">
        <!-- <el-row class="titleRow">
            <span class="formTitle">请填写信息</span>
        </el-row> -->
        <el-form ref="ruleForm" status-icon :model="ruleForm" :rules="rules">
            <el-form-item label="用户名" label-width="200px" prop="username">
                <el-input class="normalInput" placeholder="请输入4-16位英文字母或数字" autocomplete="off" v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="姓名" label-width="200px" prop="reallyname">
                <el-input class="normalInput" placeholder="请输入姓名" autocomplete="off" v-model="ruleForm.reallyname"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="200px" prop="password">
                <el-input class="normalInput" placeholder="请输入6-16位密码" autocomplete="off" :type="passw" v-model="ruleForm.password">
                    <i slot="suffix" :class="icon" @click="showPass"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="确认密码" label-width="200px" prop="surePassword">
                <el-input class="normalInput" placeholder="请确认密码" autocomplete="off" :type="passw" v-model="ruleForm.surePassword">
                    <i slot="suffix" :class="icon" @click="showPass"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="身份" label-width="200px" prop="userIndetify">
                <el-radio-group v-model="ruleForm.mark" @change="handleCurrentChange">
                    <!-- <el-radio label="1" value="1">个人</el-radio> -->
                    <el-radio label="0" value="0">企业</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号" label-width="200px" prop="telephone">
                <el-input class="normalInput" placeholder="请输入手机号(必填)" v-model="ruleForm.telephone"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" label-width="200px" prop="email">
                <el-input class="normalInput" placeholder="请填写电子邮箱(必填)" v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="企业名称" label-width="200px" v-show="ruleForm.mark==0">
                <el-input class="normalInput" placeholder="请填写企业名称(必填)" v-model="ruleForm.companyName"></el-input>
            </el-form-item>
            <el-form-item label="企业描述" label-width="200px" v-if="ruleForm.mark==0">
                <el-input type="textarea" class="normalInput" placeholder="请填写企业描述(必填)" v-model="ruleForm.descShort"></el-input>
            </el-form-item>
            <el-form-item label="人数限制" label-width="200px" v-show="ruleForm.mark==0">
                <el-input class="normalInput" placeholder="请设置最大使用人数(必填)" v-model="ruleForm.maximumNumber"></el-input>
            </el-form-item>
            <el-form-item label="用户期限" label-width="200px" v-show="ruleForm.mark==0">
                <el-input class="normalInput" placeholder="填写数字(如2代表两年)(必填)" v-model="ruleForm.purchaseYear"></el-input>
            </el-form-item>
            <!-- <el-form-item label-width="200px" v-if="ruleForm.mark==0" label="最大注册人数">
                <el-input class="normalInput" v-model="ruleForm.maximumNumber" placeholder="请设置最大注册人数">
                </el-input>
            </el-form-item>
            <el-form-item label-width="200px" v-if="ruleForm.mark==0" label="使用期限">
                <el-input class="normalInput" v-model="ruleForm.purchaseYear" placeholder="示例：2即表示两年">
                </el-input>
            </el-form-item> -->
            <el-form-item label="验证码" label-width="200px">
                <el-input class="codeInput" placeholder="请填写验证码" prop="authCode" v-model="authCode"></el-input>
                <abbr title="图片看不清？点击重新得到验证码" @click="getSessionId">
                    <img id="sessionIdImage" class="codeStyle" type="image" alt="这里将换验证码" :src="url" />
                </abbr>
            </el-form-item>
            <el-row class="buttonRow">
                <el-button type="danger" class="buttonStyle" @click="cancelEvent('ruleForm')">
                    <!--此处需要''-->
                    取消
                </el-button>
                <el-button type="primary" class="buttonStyle" @click="commitEvent('ruleForm')">提交</el-button>
            </el-row>
        </el-form>
    </div>
    <div v-else>
        <el-row class="finishedRow">
            <img class="imgStyle" src="../../assets/OK.png" />
            <span class="finishedSpan">
                完成注册,点击
                <a class="finishedA" @click="toLogin">这里</a>
                进入
            </span>
        </el-row>
    </div>
</div>
</template>

<script>
import Request from "@/libs/request.js";
import {
    SessionStorage
} from "wii-fe-utils";
import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
export default {
    name: "rigester",
    components: {
        ElSlPanel
    },
    data() {
        // 手机号验证规则
        const phoneExp = /^1[3|4|5|7|8]\d{9}$/
        // 邮箱验证规则
        const emailExp = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/
        const checkUsername = (rule, value, callback) => {
            const pattern = /[a-z0-9]{4,16}/g;
            if (!value) {
                return callback("用户名不可为空");
            } else if (!pattern.exec(value)) {
                return callback("请输入4-16位英文字母或数字");
            }
            callback();
        };
        const checkName = (rule, value, callback) => {
            if (!value) {
                return callback("姓名不可为空");
            }
            callback();
        };
        const checkPassword = (rule, value, callback) => {
            const pattern = /\w{4,16}/g;
            if (!value) {
                return callback("密码不可为空");
            } else if (!pattern.exec(value)) {
                return callback("字母、数字、下划线组成长度为4-16的密码");
            }
            return callback();
        };
        const checkPasswordAgain = (rule, value, callback) => {
            if (!value) {
                return callback("请输入确认密码");
            } else if (this.ruleForm.surePassword !== this.ruleForm.password) {
                return callback("确认密码必须和密码保持一致");
            }
            return callback();
        };
        const checkAuthCode = (rule, value, callback) => {
            if (!value) {
                return callback("请输入验证码");
            }
            return callback();
        };
        const checkPhone = (rule, value, callback) => {
            if (!phoneExp.test(value)) {
                callback(new Error('请输入合适的手机号'))
            } else {
                return callback()
            }
        }
        const checkEmail = (rule, value, callback) => {
            if (!emailExp.test(value)) {
                callback(new Error('请输入合适的邮箱'))
            } else {
                return callback()
            }
        }
        const checkMaximumNumber = (rule, value, callback) => {
            if (!value) {
                return callback('请设置最大注册人数')
            }
            return callback()
        }
        const checkPurcharseYear = (rule, value, callback) => {
            if (!value) {
                return callback('请设置使用期限')
            }
            return callback()
        }
        return {
            title: "ATF",
            subtitle: "用户注册",
            currentStep: 1, //默认注册在填写信息栏
            url: "", //验证码地址
            sessionId: "", //验证码
            validatorSession: false,
            passw: "password", //显示密码
            icon: "el-input__icon el-icon-view",
            /*
             * 表单信息
             */
            ruleForm: {
                username: "", // 管理员名称
                password: "", // 管理员密码
                reallyname: "", // 管理员真实姓名
                surePassword: "", //确认密码
                mark: "0", // 个人和企业的标识
                telephone: '', // 联系方式
                companyName: "", // 企业名称
                email: '', // 邮箱
                descShort: "", //企业描述
                status: 1, // 企业状态
                creatorId: '', // 创建者id
                modifierId: '', // 修改者id
                maximumNumber: '', // 企业注册最大人数限制
                purchaseYear: '', // 使用期限
            },
            authCode: "", //填写的验证码
            rules: {
                username: [{
                    validator: checkUsername,
                    trigger: "blur"
                }],
                reallyname: [{
                    validator: checkName,
                    trigger: "blur"
                }],
                password: [{
                    validator: checkPassword,
                    trigger: "blur"
                }],
                surePassword: [{
                    validator: checkPasswordAgain,
                    trigger: "blur"
                }],
                authCode: [{
                    validator: checkAuthCode,
                    trigger: "blur"
                }],
                telephone: [{
                    validator: checkPhone,
                    trigger: 'blur'
                }],
                email: [{
                    validator: checkEmail,
                    trigger: 'blur'
                }]
            }
        };
    },
    created() {
        this.getSessionId();
    },
    mounted() {
        this.getSessionId();
    },
    computed: {},
    methods: {
        // 获取验证码
        getSessionId() {
            let _this = this;
            Request({
                    url: "/userController/getSessionId",
                    method: "POST",
                    params: {}
                })
                .then(res => {
                    console.log("验证码获取成功", res);
                    sessionStorage.setItem("sessionId", res.sessionId);
                    _this.sessionId = sessionStorage.getItem("sessionId");
                    _this.url =
                        "http://140.143.16.21:9090/atfcloud2.0a/userController/authCode?abc=" +
                        // "http://10.101.167.184:8080/atfcloud2.0a/userController/authCode?abc=" +
                        Math.random() +
                        "&sessionId=" +
                        sessionStorage.getItem("sessionId");
                    console.log("url");
                })
                .catch(err => {
                    console.log("验证码获取失败", err);
                });
        },
        //取消清空表单
        cancelEvent(formName) {
            this.$refs[formName].resetFields();
            this.$router.push({
                name: 'Login'
            })
        },
        //先进行表单验证，然后提交请求
        commitEvent(formName) {
            console.log(this.ruleForm)
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.ruleForm.mark == 1) {
                        this.sendToPost(this.ruleForm)
                    } else {
                        if (this.ruleForm.companyName != "" && this.ruleForm.descShort != "" && this.ruleForm.maximumNumber != "" && this.ruleForm.purchaseYear != "") {
                            this.sendToPost(this.ruleForm)
                        } else {
                            this.$message.warning('请输入企业必填信息')
                        }
                    }
                } else {
                    this.$message.error("表单验证失败");
                }
            });
        },
        // 数据发送到服务器
        sendToPost(params) {
            params.sessionId = this.sessionId;
            params.authCode = this.authCode
            let qs = require("qs");
            Request({
                    url: "/userController/register",
                    method: "POST",
                    params: qs.stringify(params)
                })
                .then(res => {
                    console.log("注册成功", res);
                    if (this.ruleForm.mark == 0) {
                        Request({
                            url: '/userRoleController/insert',
                            method: 'POST',
                            params: {
                                companyId: res.companyId,
                                userId: res.userId,
                                // 待验证
                                roleList: [7]
                            }
                        }).then(res => {
                            this.$alert("注册成功,待审核");
                        }).catch(error => {
                            console.log('insert 失败')
                        })
                    }
                })
                .catch(err => {
                    this.$message.warning(err)
                    console.log("注册失败", err);
                });
        },
        insert(userId) {
            
        },
        // 检查验证码
        checkAuthCode() {
            let qs = require("qs");
            console.log("authCode:", this.authCode);
            console.log("sessionId:", this.sessionId);
            Request({
                    url: "/userController/checkauthcode",
                    method: "POST",
                    params: qs.stringify({
                        authCode: this.authCode,
                        sessionId: this.sessionId
                    })
                })
                .then(res => {
                    console.log("验证码验证通过", res);
                    this.validatorSession = true;
                })
                .catch(err => {
                    console.log("验证码验证失败", err);
                });
        },
        // 展示密码
        showPass() {
            if (this.passw === "text") {
                this.passw = "password";
                this.icon = "el-input__icon el-icon-view";
            } else {
                this.passw = "text";
                this.icon = "el-input__icon el-icon-loading";
            }
        },
        toLogin() {
            this.$router.push({
                path: "/login"
            });
        },
        // 处理用户状态
        handleCurrentChange(val) {
            if (val == 1) {
                this.ruleForm.companyName = ""
                this.ruleForm.descShort = ""
            } else {
                this.ruleForm.email = ""
                this.ruleForm.telephone = ""
            }
        }
    }
};
</script>

<style scoped>
.rigesterPageStyle {
    margin: 15px auto;
    width: 60%;
    height: 100%;
}

/* 顶部样式 */
.headRow {
    margin-top: 30px;
    margin-left: 10px;
    margin-bottom: 30px;
}

.titleSpan {
    color: red;
    font-weight: 700;
    font-family: "Verdana, Geneva, sans-serif";
    font-size: 24px;
}

.subtitleSpan {
    font-family: Verdana, Geneva, sans-serif;
    font-weight: 600;
    font-size: 18px;
    color: #000;
    margin-left: 10px;
}

.titleRow {
    margin-top: 20px;
    margin-bottom: 10px;
}

.formTitle {
    margin-left: 100px;
    font-weight: 500;
    font-size: 18px;
}

.normalInput {
    width: 400px;
}

.codeInput {
    width: 150px;
}

.codeStyle {
    width: 150px;
    height: 38px;
    margin-left: 20px;
    margin-bottom: -15px;
    margin-top: -18px;
}

.buttonRow {
    margin-left: 200px;
}

.buttonStyle {
    width: 150px;
    margin-left: 10px;
}

.imgStyle {
    width: 60px;
    height: 60px;
    margin-top: 20px;
}

.finishedRow {
    width: fit-content;
    margin: 30px auto auto auto;
}

.finishedSpan {
    font-size: 18px;
}

.finishedA {
    color: rgb(0, 102, 255);
    cursor: pointer;
}

.el-radio-group {
    line-height: 48px;
}
</style>

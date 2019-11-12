<template>
    <div class="search-main page-outer">
        <el-card class="login-box">
            <h3>系 统 登 录</h3>
            <el-form class="demo-ruleForm">
                <el-form-item label="用户名">
                    <el-input type="text" v-model="uid" @keyup.enter.native="submitForm"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="password" @keyup.enter.native="submitForm"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button :disabled="password===''||uid===''" type="primary" @click="submitForm">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import Request from '@/libs/request.js'
    import { SessionStorage } from 'wii-fe-utils'
    export default {
        name: 'Login',
        data() {
            return {
                uid: '',
                password: '',
                submitLoading: false
            }
        },
        methods: {
            submitForm() {
                if (this.uid === '' || this.password === '') {
                    return false
                }
                if (this.submitLoading) {
                    return false
                }
                this.submitLoading = true
                Request({
                    url: '/cgi-bin/ugcheckauth',
                    method: 'get',
                    params: {
                        uid: this.uid,
                        passwd: this.password
                    }
                }).then((res) => {
                    this.submitLoading = false
                    SessionStorage.set('unigroupuid', res.data.verify_id),
                        SessionStorage.set('unigrouprtx', this.uid)
                    this.$router.push('/emotion-list')
                }).catch((err) => {
                    console.log(err)
                    this.submitLoading = false
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .login-box {
        width: 400px;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding-left: 20px;
        padding-right: 20px;

        h3 {
            text-align: center;
            margin-bottom: 15px;
        }
    }
</style>
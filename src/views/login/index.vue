<template >
    <div class="search-main page-outer loginBackground">
        <el-card class="login-box">
            <h3>系 统 登 录</h3>
            <el-form class="demo-ruleForm">
                <el-form-item label-width='20px'>
                    <el-input
						class='inputLoginStyle'
						type="text"
						placeholde='请输入用户名'
						suffix-icon='el-icon-user-solid'
						v-model="uid"
						></el-input>
<!--					@keyup.enter.native="submitForm"-->
                </el-form-item>
                <el-form-item label-width='20px'>
                    <el-input
						class='inputLoginStyle'
						type="password"
						placeholde='请输入密码'
						suffix-icon='el-icon-lock'
						v-model="password"
					></el-input>
                </el-form-item>
				<el-form-item  label-width='20px'>
					<el-input
						type='text'
						class='inputLoginCodeStyle'
						placeholder='请输入验证码'
					></el-input>
					<abbr title='这里将换验证码'>
						<img
							class='codeStyle'
							src='../../assets/logo.png'
							alt='这里将换验证码'
						/>
					</abbr>

				</el-form-item>
                <el-form-item>
                    <el-button
						class='btnLogin'
						type="success"
						:disabled="password===''||uid===''"
						@click="submitForm"
					>登录</el-button>
					<span class='spanAccount'>
						<a href= '#'>忘记密码 </a>|
						<a href= '#'>注册</a>

					</span>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import Request from '@/libs/request.js'
    import { SessionStorage } from 'wii-fe-utils'
	import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
    export default {
        name: 'Login',
		components: {ElSlPanel},
		data() {
            return {
                uid: '1',
                password: '1',
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
        top: 57%;
        left: 68.5%;
		background: transparent;
        transform: translate(-50%, -50%);
        padding-left: 20px;
        padding-right: 20px;
        h3 {
            text-align: center;
            margin-bottom: 15px;
        }
    }
	.loginBackground{
		background-image: url("../../assets/login.png");
		background-size: 100%;
	}
	.inputLoginStyle{
		width: 280px;
	}
	.inputLoginCodeStyle{
		width: 160px;
	}
	.codeStyle{
		margin-bottom: -15px;
		margin-left: 30px;
		width: 80px;
		height: 40px;
	}
	.btnLogin{
		width: 150px;
		margin-left: 20px;
	}
	.spanAccount{
		margin-left: 30px;
	}
	a{
		text-decoration: none;
		color: blue;
	}
</style>

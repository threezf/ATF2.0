<template >
    <div class="search-main page-outer loginBackground">
        <el-card class="login-box">
            <h3>系 统 登 录</h3>
            <el-form class="demo-ruleForm" :rules='rules' :model='ruleForm' ref='ruleForm' status-icon>
                <el-form-item label-width='20px' prop='uid'>
                    <el-input
						class='inputLoginStyle'
						type="text"
						placeholde='请输入用户名'
						suffix-icon='el-icon-user-solid'
						v-model="ruleForm.uid"
						></el-input>
<!--					@keyup.enter.native="submitForm"-->
                </el-form-item>
                <el-form-item label-width='20px' prop='password'>
                    <el-input
						class='inputLoginStyle'
						type="password"
						placeholde='请输入密码'
						suffix-icon='el-icon-lock'
						v-model="ruleForm.password"
					></el-input>
                </el-form-item>
				<el-form-item  label-width='20px' prop='sessionIdIn'>
					<el-input
						type='text'
						class='inputLoginCodeStyle'
						placeholder='请输入验证码'
						v-model='ruleForm.sessionIdIn'
					></el-input>
					<abbr
						title='图片看不清？点击重新得到验证码'
						@click='getSessionId'>
						<img
							id='sessionIdImage'
							class='codeStyle'
							type='image'
							alt='这里将换验证码'
							:src = 'url'
						/>
					</abbr>

				</el-form-item>
                <el-form-item>
                    <el-button
						class='btnLogin'
						type="success"
						:disabled="ruleForm.password===''||ruleForm.uid===''"
						@click="submitForm('ruleForm')"
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
    import {SessionStorage}  from 'wii-fe-utils'
	import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
    export default {
        name: 'Login',
		components: {ElSlPanel},
		data() {
        	let checkAccount = (rule,value,callback)=>{
        		if (String(value)===''){
        			return callback(new Error('请输入账号'));
				}
			};
        	let checkPassword = (rule,value,callback) =>{
				let qs = require('qs');
        		if (String(value) === ''){
        			return callback(new Error('请输入密码'));
				}else if (this.uid === '1'){
        			this.$message.success('欢迎使用ATF测试');
				} else {
        			Request({
						url: '/userController/login',
						method: 'post',
						params: qs.stringify(this.loginParams)
					}).then(res =>{
						console.log('登录成功',res);
					}).catch(e=>{
						console.log('错误信息',e);
					})
				}
			};
        	let checkSessionId = (rule,value,callback) =>{
        		console.log("获取本地验证码",sessionStorage.getItem('sessionId'));
        		if (String(value) === ''){
        			return callback(new Error('请输入验证码'));
				} else {
        			Request({
						url: '/userController/checkauthcode',
						method: 'POST',
						params:{
							authCode: this.ruleForm.sessionIdIn,
							sessionId: this.storedSessionId
						}
					}).then(res=>{
						console.log('成功',res)
					}).catch(e=>{
        				console.log('校验错误',e)
					})
				}
			};
            return {
				ruleForm: {
					uid: 1,
					password: 1,
					sessionIdIn: 1
				},
				rules: {
					uid: [{validator: checkAccount,trigger: 'blur'}],
					password: [{validator: checkPassword, trigger: 'blur'}],
					sessionIdIn: [{validator: checkSessionId, trigger: 'blur'}]

				},
                loginInfo: {
					isAccountAndPasswordMatched: false,
					isSessionIdMatched: false
				},
				url: '',
				storedSessionId: 0
            }
        },
		computed:{
        	loginParams() {
        		let obj = {
					username: this.ruleForm.uid,
					password: this.ruleForm.password,
					authCode: this.ruleForm.sessionIdIn,
					sessionId: this.storedSessionId
				};
        		return obj;

			}
		},
		created() {
        	let _this = this;
			_this.getSessionId();
		},
        methods: {
        	//提交表单，点击登陆
            submitForm(FormName) {
            	let _this = this;
              	this.$refs[FormName].validate((valid)=>{
              		console.log('进入验证',valid);
					if (valid){
						if (_this.loginInfo.isAccountAndPasswordMatched && _this.loginInfo.isSessionIdMatched){
							this.$message.success('登录成功');
						} else {
							this.$message.error('登录信息错误');
						}
						//this.$router.push({path: '/home'});
					}else {
						this.$message.error('请输入信息');
					}
			 	 });
                // Request({
                //     url: '/cgi-bin/ugcheckauth',
                //     method: 'get',
                //     params: {
                //         uid: this.uid,
                //         passwd: this.password
                //     }
                // }).then((res) => {
                //     this.submitLoading = false
                //     SessionStorage.set('unigroupuid', res.data.verify_id),
                //         SessionStorage.set('unigrouprtx', this.uid)
                //     this.$router.push('/emotion-list')
                // }).catch((err) => {
                //     console.log(err)
                //     this.submitLoading = false
                // })
            },
            //获取验证码
			getSessionId(){
            	let _this = this;
            	Request({
					url: '/userController/getSessionId',
					method: 'POST',
					params: {}
				}).then(res => {
					console.log('获取验证码成功',res.obj.sessionId);
					sessionStorage.setItem('sessionId',res.obj.sessionId);
					_this.storedSessionId = sessionStorage.getItem('sessionId');
					_this.url = 'http://10.101.167.184:8080/atfcloud2.0a/userController/authCode?abc=' + Math.random() +
						'&sessionId=' + sessionStorage.getItem('sessionId');

				}).catch(e =>{
					console.log('登录出错',e)
				})
			},
			//验证验证码：

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
		background-attachment: fixed;
		background-repeat: no-repeat;
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
		height: 39px;
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

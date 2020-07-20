<template >
  <div class="search-main page-outer loginBackground">
    <div id="particles-js">
      <canvas 
        class="particles-js-canvas-el">
      </canvas>
		</div>
    <div class="mainBody">
      <h1 class="title">ATF云测试平台</h1>
      <el-form 
        :rules="rules"
        :model="ruleForm" 
        ref="ruleForm"
        label-width="100px" 
        class="loginForm"
        status-icon>
        <el-form-item 
          prop="uid"
          label="账号" >
          <el-input 
            v-model="ruleForm.uid"
            placeholder="请输入账号"
            suffix-icon="el-icon-user-solid"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item 
          prop="password"
          label="密码" >
          <el-input 
            v-model="ruleForm.password"
            placeholder="请输入密码"
            type="password"
            suffix-icon="el-icon-lock"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item 
          prop="sessionIdIn"
          label="验证码" >
          <el-input 
            v-model="ruleForm.sessionIdIn"
            placeholder="请输入验证码"
            type="text"
            suffix-icon="el-icon-lock"
            class="verCodeInput"
            clearable>
          </el-input>
          <img
            id="sessionIdImage" 
            class="codeStyle" 
            type="image" 
            alt="这里将换验证码"
            @click="getSessionId"
            :src="imageURL" >
        </el-form-item>
        <el-row>
          <el-button 
            :disabled="ruleForm.password===''||ruleForm.uid===''"
            @click="submitForm('ruleForm')"
            type="info"
            plain
            >登录
          </el-button>
          <span class="spanAccount">
            <a href="#">忘记密码</a>&nbsp;|&nbsp;<a @click.prevent="toRigester">注册</a>
          </span>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Request from "@/libs/request.js";
  import { SessionStorage } from "wii-fe-utils";
  import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
  import {setCanvas} from '@/libs/login/login.js';
  import {setCanvasApp} from '@/libs/login/loginApp.js'
  export default {
    name: "Login",
    components: { ElSlPanel },
    data() {
      let checkAccount = (rule, value, callback) => {
        if (String(value) === "") {
          return callback(new Error("请输入账号"));
        } else if (value === "1") {
          this.$message.success("欢迎使用ATF测试");
          this.$router.push({ path: "/index" });
        }
        return callback();
      };
      let checkPassword = (rule, value, callback) => {
        let qs = require("qs");
        if (String(value) === "") {
          return callback(new Error("请输入密码"));
        }
        return callback();
      };
      let checkSessionId = (rule, value, callback) => {
        if (String(value) === "") {
          return callback(new Error("请输入验证码"));
        } else {
        }
        return callback();
      };
      return {
        ruleForm: {
          uid: 1,
          password: 1,
          sessionIdIn: 1
        },
        rules: {
          uid: [{ validator: checkAccount, trigger: "blur" }],
          password: [{ validator: checkPassword, trigger: "blur" }],
          sessionIdIn: [{ validator: checkSessionId, trigger: "blur" }]
        },
        loginInfo: {
          isAccountAndPasswordMatched: false,
          isSessionIdMatched: false
        },
        imageURL: "http://140.143.16.21:8080/atfcloud2.0a/userController/authCode?abc=0.11636858629067781&sessionId=567E4A18483202100E1782F55EBCED23",
        storedSessionId: 0
      };
    },
    computed: {},
    created() {
      let _this = this;
      _this.getSessionId();
    },
    mounted() {
      setCanvas()
      setCanvasApp()
    },
    methods: {
      //提交表单，点击登陆
      submitForm(FormName) {
        let _this = this;
        if (_this.ruleForm.uid == "1") {
          sessionStorage.setItem("userId",_this.ruleForm.uid)
          this.$router.push({ path: "/index" });

        } else {
          this.$refs[FormName].validate(valid => {
            console.log("进入验证", valid);
            if (valid) {
              let qs = require("qs");
              Request({
                url: "/userController/checkauthcode",
                method: "POST",
                params: qs.stringify({
                  authCode: this.ruleForm.sessionIdIn,
                  sessionId: this.storedSessionId
                })
              })
                .then(res => {
                  console.log("验证成功", res);
                  Request({
                    url: "/userController/login",
                    method: "post",
                    params: qs.stringify({
                      username: this.ruleForm.uid,
                      password: this.ruleForm.password,
                      authCode: this.ruleForm.sessionIdIn,
                      sessionId: this.storedSessionId
                    })
                  })
                    .then(res => {
                      console.log("登录成功", res);
                      this.$router.push({ path: "/index" });
                    })
                    .catch(e => {
                      console.log("错误信息", e);
                      this.$message.error("用户名或密码错误");
                    });
                })
                .catch(e => {
                  console.log("校验错误", e);
                  this.$message.error("验证码错误");
                });
            } else {
              this.$message.error("请输入信息");
            }
          });
        }
      },
      //获取验证码
      getSessionId() {
        console.log("获取验证码");
        let _this = this;
        Request({
          url: "/userController/getSessionId",
          method: "POST"
        })
          .then(res => {
            _this.storedSessionId = res.obj.sessionId;
            _this.imageURL =
              "http://140.143.16.21:8080/atfcloud2.0a/userController/authCode?abc=" +
              Math.random() +
              "&sessionId=" +
              res.obj.sessionId;
          })
          .catch(e => {
            console.log("登录出错", e);
          });
      },
      //注册
      toRigester() {
        this.$router.push("/rigester");
      }
    }
  };
</script>

<style lang="less">
  /*
    canvas相关背景样式 
  */
  canvas {
    display: block;
    width: 100%; 
    height: 100%;  
  }
  #particles-js {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: url('../../assets/images/login/login_background.png');
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .mainBody {
    width: 100%;
    height: 420px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    .title {
      color: white;
      text-align: center;
      font-size: 40px;
      margin-left: 60px;
    }
    .loginForm {
      width: 500px;
      margin: 0px auto;
      margin-top: 60px;
      .el-form-item__label {
        color: white !important;
        font-size: 18px;
        margin-right: 10px;
      }
      .el-input {
        width: 360px;
      }
      .codeStyle {
        color: white;
        width: 120px;
        margin-left: 30px;
        height: 40px;
        cursor: pointer;
      }
      .verCodeInput {
        width: 200px;
      }
      .el-row {
        width: 100%;
        padding: 0 70px;
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        .el-button {
          width: 130px;
        }
        .spanAccount {
          color: #EEE;
          display: block;
          line-height: 40px;
          a {
            text-decoration: none;
            cursor: pointer;
          }
          a:visited {
            color: #EEE;
          }
          a:hover {
            color: aqua;
          }
        }
      }
    }
  }
</style>

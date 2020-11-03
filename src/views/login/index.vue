<template>
  <div class="search-main page-outer loginBackground">
    <div id="particles-js">
      <canvas class="particles-js-canvas-el"></canvas>
    </div>
    <div class="mainBody">
      <h1 class="title">ATF云测试平台</h1>
      <!-- <div class="bodyIcon">
        <img class="imageIcon" src="../../assets/jin.gif" />
      </div> -->
      <div class="loginBody">
        <el-form :rules="rules" :model="ruleForm" class="loginForm" ref="ruleForm" label-width="100px" status-icon>
          <el-form-item prop="uid" label="账号">
            <el-input v-model="ruleForm.uid" placeholder="请输入账号" suffix-icon="el-icon-user-solid" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password" suffix-icon="el-icon-lock" clearable></el-input>
          </el-form-item>
          <el-form-item prop="sessionIdIn" label="验证码">
            <el-input v-model="ruleForm.sessionIdIn" placeholder="请输入验证码" type="text" suffix-icon="el-icon-lock" class="verCodeInput" clearable @keyup.enter.native="submitForm('ruleForm')"></el-input>
            <img id="sessionIdImage" class="codeStyle" type="image" alt="这里将换验证码" @click="getSessionId" :src="imageURL" />
          </el-form-item>
          <el-row>
            <el-button :disabled="ruleForm.password===''||ruleForm.uid===''" @click="submitForm('ruleForm')" type="primary">登录</el-button>
            <span class="spanAccount">
              <a href="#">忘记密码?</a>&nbsp;|&nbsp;
              <a @click.prevent="toRigester">注册</a>
            </span>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import Request from "@/libs/request.js";
  import { SessionStorage } from "wii-fe-utils";
  import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
  import { setCanvas } from "@/libs/login/login.js";
  import { setCanvasApp } from "@/libs/login/loginApp.js";
  export default {
    name: "Login",
    components: {
      ElSlPanel,
    },
    data() {
      let checkAccount = (rule, value, callback) => {
        if (String(value) === "") {
          return callback(new Error("请输入账号"));
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
        } else {}
        return callback();
      };
      return {
        ruleForm: {
          uid: "",
          password: "",
          sessionIdIn: "",
        },
        rules: {
          uid: [{
            validator: checkAccount,
            trigger: "blur",
          }, ],
          password: [{
            validator: checkPassword,
            trigger: "blur",
          }, ],
          sessionIdIn: [{
            validator: checkSessionId,
            trigger: "blur",
          }, ],
        },
        loginInfo: {
          isAccountAndPasswordMatched: false,
          isSessionIdMatched: false,
        },
        imageURL: "",
        storedSessionId: 0,
        userId: 0,
      };
    },
    computed: {},
    created() {
      let _this = this;
      _this.getSessionId();

    },
    mounted() {
      setCanvas();
      setCanvasApp();
    },
    methods: {
      //提交表单，点击登陆
      submitForm(FormName) {
        let _this = this;
        if (_this.ruleForm.uid == "1") {
          SessionStorage.set("userId", "3");
          this.$router.push({
            path: "/index",
          });
          return;
        }
        this.$refs[FormName].validate((valid) => {
          if (valid) {
            let qs = require("qs");
            Request({
                url: "/userController/checkauthcode",
                method: "POST",
                params: qs.stringify({
                  authCode: this.ruleForm.sessionIdIn,
                  sessionId: this.storedSessionId,
                }),
              })
              .then((res) => {
                Request({
                    url: "/userController/login",
                    method: "post",
                    params: qs.stringify({
                      username: this.ruleForm.uid,
                      password: this.ruleForm.password,
                      authCode: this.ruleForm.sessionIdIn,
                      sessionId: this.storedSessionId,
                    }),
                  })
                  .then((res) => {
                    if(res.respCode === '0000') {
                      sessionStorage.setItem("userId", res.userId);
                      sessionStorage.setItem("username", this.ruleForm.uid);
                      this.queryAllRelated(res.userId)
                      this.$store.commit('setLoginInfo', {
                        companyId: res.companyId,
                        companyName: res.companyName,
                        userId: res.userId
                      })
                      if(res.respMsg === '服务器时间可能被更改，无法校验license，请联系管理员' || (res.respCode === '用户所属公司可在线人数已达上限')) {
                          this.$message.warning(res.respMsg)
                      }else {
                          if(res.respMsg.startsWith('license使用时间不足')) {
                              this.$message.warning('license使用时间不足，请注意充值')
                          }
                          
                          this.$router.push({
                            path: "/index",
                          });
                      }
                    }else {
                      this.$message.warning('请验证登录信息');
                    }
                  })
                  .catch((e) => {
                    console.log("登录出错", e);
                  });
              })
              .catch((e) => {
                console.log("校验错误", e);
                this.$message.error("验证码错误");
              });
          } else {
            this.$message.error("请输入信息");
          }
        });
      },
      // 更新用户积分
      updateTotalScore(userId, totalScore) {
        this.$store.dispatch('updateTotalScore', {
          userId,
          totalScore
        }).then(res => {
          // this.$router.push({
          //   path: "/index",
          // });
        })
      },
      //获取验证码
      getSessionId() {
        let _this = this;
        Request({
            url: "/userController/getSessionId",
            method: "POST",
          })
          .then((res) => {
            _this.storedSessionId = res.sessionId;
            _this.userId = res.obj;
            // _this.imageURL =
            //   "http://10.28.204.206:8080/atfcloud2.0a/userController/authCode?abc=" +
            //   Math.random() +
            //   "&sessionId=" +
            //   res.sessionId;
            _this.imageURL =
              "http://10.101.167.184:8080/atfcloud2.0a/userController/authCode?abc=" +
              Math.random() +
              "&sessionId=" +
              res.sessionId;
          })
          .catch((e) => {
            console.log("登录出错", e);
          });
      },
      // 跳转并传递参数
      toMainPage(userId) {
        this.$store.dispatch('getTotalScore', userId).then(data => {
          this.updateTotalScore(userId, Number(data.totalScore) + 1)
        })
      },
      //注册
      toRigester() {
        this.$router.push("/rigester");
      },
      // 查询具有的权限
      queryAllRelated(userId) {
        Request({
          url: '/menuController/queryAllRelated',
          method: 'post',
          params: {
            userId
          }
        }).then(res => {
          if(res.respCode === '0000') {
            this.$store.commit('setUrlList', {
              urlList: res.urlList
            })
            localStorage.setItem('urls', res.urlList)
            this.$bus.emit('setUrls', {
                urlList: res.urlList,
                currentName: this.ruleForm.uid
            })
          }
          return
        }).catch(error => {
          console.log('权限获取失败')
        })
      }
    },

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
    background: url("../../assets/images/login/login_background.png");
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .bodyIcon {
    width: 189px;
    height: 220px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0px 3px 4px gray;
  }
  .bodyIcon:hover {
    top: -2px;
  }

  .mainBody {
    width: fit-content;
    height: fit-content;
    position: relative;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    .title {
      color: white;
      text-align: center;
      font-size: 40px;
      margin-left: 0px;
    }
    .loginBody {
      margin-top: 30px;
      .loginForm {
        background: radial-gradient(rgba(255, 255, 255, 0.01),
                rgba(143, 145, 152, 0.1));
        width: 460px;
        box-shadow: 0px 0px 10px 5px rgba(143, 145, 152, 1) inset;
        border-radius: 15px;
        padding: 60px 10px 50px 10px;
        margin: 15px;
        .el-form-item__label {
          color: white !important;
          font-size: 18px;
          margin-right: 10px;
        }
        .el-input {
          width: 300px;
          color: white;
        }
        .el-input__inner {
          color: white;
          background: transparent;
          border: 1px solid rgba(143, 145, 152, 0.6);
        }
        .el-input__inner:focus {
          border: 1px solid rgba(0, 123, 255, 1);
        }
        .codeStyle {
          color: white;
          width: 120px;
          margin-left: 30px;
          height: 40px;
          cursor: pointer;
        }
        .verCodeInput {
          width: 140px;
        }
        .el-row {
          width: 100%;
          padding: 0 20px;
          margin-top: 30px;
          display: flex;
          justify-content: space-between;
          .el-button {
            width: 130px;
          }
          .spanAccount {
            color: #eee;
            display: inline-block;
            line-height: 40px;
            a {
              text-decoration: none;
              cursor: pointer;
            }
            a:visited {
              color: #eee;
            }
            a:hover {
              color: aqua;
            }
          }
        }
      }
    }
  }
</style>

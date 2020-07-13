<template>
  <div class="cardEdit">
    <el-row>
      <el-col :span="20" :offset="0">
        <span class="baseInfo">基本设置</span>
      </el-col>
      <el-col :span="1" :offset="0">
        <el-button type="primary" size="small" icon="el-icon-video-play" plain @click="runMock">运行</el-button>
      </el-col>
    </el-row>
    <div class="contentDiv">
      <el-form>
        <el-form-item class="basicSettingRow" label="接口路径" label-width="100px">
          <el-select v-model="selectedParseMethod">
            <el-option v-for="(item,index) in parseMethods" :key="index" :value="item"></el-option>
          </el-select>
          <el-input class="path" v-model="path"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <span class="requestParams">请求参数设置</span>
    </el-row>
    <el-row class="settingTitleRow">
      <div>
        <el-radio-group
          size="small"
          v-model="requestParamsTitle"
          @change="handleTitleChange(requestParamsTitle)"
        >
          <el-radio-button label="body"></el-radio-button>
          <el-radio-button label="query"></el-radio-button>
          <el-radio-button label="headers"></el-radio-button>
          <el-radio-button label="cookies"></el-radio-button>
          <el-radio-button label="高级"></el-radio-button>
        </el-radio-group>
      </div>
    </el-row>
    <!--body-->
    <div class="contentDiv" v-if="bodyVisible">
      <el-row class="radioButtonRow">
        <el-radio-group v-model="messageFormat" @change="printFormat">
          <el-radio label="JSON"></el-radio>
          <el-radio label="XML"></el-radio>
          <el-radio label="STRING"></el-radio>
        </el-radio-group>
      </el-row>
      <pre class="textareaStyle">{{messageInfo}}
            </pre>
    </div>
    <!--query-->
    <div class="contentDiv" v-if="queryVisible">
      <ul class="ulRadioButton">
        <li v-for="(item,index) in paramsQuery" :key="index">
          <el-row class="liRadioButtonRow">
            <el-col :span="15">
              <el-form>
                <el-form-item label="请求参数" label-width="100px">
                  <el-input style="width: 200px" placeholder="参数名称" v-model="paramsQueryKey[index]"></el-input>
                  <el-input
                    style="width: 400px;margin-left: 10px"
                    placeholder="参数值"
                    v-model="paramsQueryValue[index]"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="2" style="margin-left:-10px;margin-top:-25px">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-plus"
                circle
                @click="addParamsQueryNewRow"
              ></el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                circle
                @click="deleteParamsQueryNewRow"
              ></el-button>
            </el-col>
          </el-row>
        </li>
      </ul>
    </div>
    <!--headers-->
    <div class="contentDiv" v-if="headersVisible">
      <ul class="ulRadioButton">
        <li v-for="(item,index) in paramsHeaders" :key="index">
          <el-row class="liRadioButtonRow">
            <el-form class="paramsForm">
              <el-col :span="15">
                <el-form>
                  <el-form-item label="请求头部" label-width="100px">
                    <el-input
                      style="width: 200px"
                      placeholder="参数名称"
                      v-model="paramsHeadersKey[index]"
                    ></el-input>
                    <el-input
                      style="width: 400px;margin-left: 10px"
                      placeholder="参数值"
                      v-model="paramsHeadersValue[index]"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="2" style="margin-left:0px;margin-top:5px">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-plus"
                  circle
                  @click="addParamsHeadersNewRow"
                ></el-button>
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  circle
                  @click="deleteParamsHeadersNewRow"
                ></el-button>
              </el-col>
            </el-form>
          </el-row>
        </li>
      </ul>
    </div>
    <!--cookies-->
    <div class="contentDiv" v-if="cookiesVisible">
      <ul class="ulRadioButton">
        <li v-for="(item,index) in paramsCookies" :key="index">
          <el-row class="liRadioButtonRow">
            <el-form class="paramsForm">
              <el-col :span="15">
                <el-form>
                  <el-form-item label="cookies" label-width="100px">
                    <el-input
                      style="width: 200px"
                      placeholder="参数名称"
                      v-model="paramsCookiesKey[index]"
                    ></el-input>
                    <el-input
                      style="width: 400px;margin-left: 10px"
                      placeholder="参数值"
                      v-model="paramsCookiesValue[index]"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="2" style="margin-left:0px;margin-top:5px">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-plus"
                  circle
                  @click="addParamsCookiesNewRow"
                ></el-button>
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  circle
                  @click="deleteParamsCookiesNewRow"
                ></el-button>
              </el-col>
            </el-form>
          </el-row>
        </li>
      </ul>
    </div>
    <!--高级-->
    <div class="contentDiv" v-if="highVisible">
      <el-row class="radioButtonRowHigh">
        <el-form>
          <el-col :span="11">
            <el-form-item label="secure" label-width="100px">
              <el-select v-model="selectedSecure">
                <el-option v-for="(item,index) in secures" :key="index" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="keepalive" label-width="100px">
              <el-select v-model="selectedKeepalive">
                <el-option v-for="(item,index) in keepalives" :key="index" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div>
      <el-row>
        <span class="forwardSetting">返回结果</span>
      </el-row>
      <div class="contentDiv">
        <pre class="beforeRunStyle" v-if="runResult === ''">请运行后查看结果
                </pre>
        <pre class="runResultStyle" disabled v-else>{{runResult}}
                </pre>
      </div>
    </div>
  </div>
</template>

<script>
  import Request from "@/libs/request.js";
  import VueMixins from "@/libs/vueMixins.js";
  import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
  export default {
    name: "run",
    components: { ElSlPanel },
    mixins: [VueMixins], // 混入
    data() {
      return {
        id: "", //获取数据所需要的id
        expectationName: "", //期望名称
        parseMethods: [
          "POST",
          "GET",
          "PUT",
          "DELETE",
          "HEAD",
          "OPTIONS",
          "PATCH"
        ], //接口解析方法
        selectedParseMethod: "POST", //默认选中的接口解析方法
        path: "", //接口路径
        requestParamsTitle: "body",
        bodyVisible: true,
        queryVisible: false,
        headersVisible: false,
        cookiesVisible: false,
        highVisible: false,
        messageFormat: "JSON", //报文体格式
        returnDataType: "JSON", //返回数据报文形式
        messageInfo: "", //报文体内容
        returnDataInfo: "", //返回数据报文体内容
        portContent: "8080", //端口号
        secures: ["true", "false"],
        selectedSecure: "", //选择的secure
        keepalives: ["true", "false"],
        selectedKeepalive: false, //选择的keepalive
        type: "", //返回的动作类型
        creator: "", //创建者
        httpRequest: "", //解析得到的httpRequest
        httpResponse: "", //解析得到的httpResponse
        /**
        * 数据字段长度
        */
        //params——query
        queryParameters: "", //queryParams的数据
        queryParametersObj: {}, //queryParams的数据转化对象
        paramsQueryKey: [], //请求参数的query
        paramsQueryValue: [], //请求参数的query
        paramsQuery: [], //请求参数的query
        //params——headers
        headersParameters: "", //headersParams的数据
        headersParametersObj: {}, //headersParams的数据转化对象
        paramsHeadersKey: [], //请求参数的headers
        paramsHeadersValue: [], //请求参数的headers
        paramsHeaders: [], //请求参数的headers
        //params——cookies
        cookiesParameters: "", //cookiesParams的数据
        cookiesParametersObj: {}, //cookiesParams的数据转化对象
        paramsCookiesKey: [], //请求参数的cookies
        paramsCookiesValue: [], //请求参数的cookies
        paramsCookies: [], //请求参数的cookies
        runRequestId: "", //运行时的请求id
        methodType: false, //getRunRequest获取的methodType
        pathType: false, //getRequest获取的pathType
        runResult: "", //运行返回结果
        expectationId: "" //runRequest获取的expectationId
      };
    },
    computed: {},
    created() {},
    mounted() {
      this.id = this.$route.query.id;
      console.log("id：", this.id);
      this.getExpectationById(this.id);
    },
    methods: {
      //根据id获取信息
      getExpectationById(id) {
        let qs = require("qs");
        Request({
          url: "/mockServer/getExpectationById",
          method: "POST",
          params: qs.stringify({
            id: this.id
          })
        })
          .then(res => {
            console.log("res", res);
            let _this = this;
            _this.runRequestId = res.runRequestId;
            console.log("runRequestId",_this.runRequestId,res)
            if (_this.runRequestId != null) {
              console.log("runRequestId", _this.runRequestId);
              Request({
                url: "/mockServer/getRunRequest",
                method: "POST",
                params: qs.stringify({
                  id: this.runRequestId
                })
              })
                .then(res => {
                  console.log("11111获取成功", res);
                  _this.messageInfo = res.body;
                  _this.selectedParseMethod = res.method;
                  _this.methodType = res.methodType? true: false;
                  _this.path = res.path;
                  _this.pathType = res.pathType? true: false;
                  _this.queryParameters = res.queryParameters;
                  _this.queryParametersObj = JSON.parse(_this.queryParameters);
                  _this.headersParameters = res.headers;
                  _this.headersParametersObj = JSON.parse(
                    _this.headersParameters
                  );
                  _this.cookiesParameters = res.cookies;
                  _this.cookiesParametersObj = JSON.parse(
                    _this.cookiesParameters
                  );
                  _this.messageFormat = res.type;
                  _this.selectedKeepalive = res.keepAlive? true: false;
                  _this.selectedSecure = res.secure;
                  _this.expectationId = res.expectationId;
                  this.setDatas();
                })
                .catch(error => {
                  console.log("出现错误", error);
                });
            } else {
              console.log("id为空",res);
              _this.expectationName = res.expectationName;
              _this.type = res.type;
              _this.creator = res.creator;
              _this.httpRequest = res.httpRequest;
              _this.httpResponse = res.httpResponse;
              _this.path = res.httpRequest.path;
              _this.selectedParseMethod = res.httpRequest.method;
              _this.messageInfo = res.httpRequest.body;
              _this.messageFormat = res.httpRequest.type;
              _this.queryParameters = res.httpRequest.queryParameters;
              _this.queryParametersObj = JSON.parse(_this.queryParameters);
              _this.headersParameters = res.httpRequest.headers;
              _this.headersParametersObj = JSON.parse(_this.headersParameters);
              _this.cookiesParameters = res.httpRequest.cookies;
              _this.cookiesParametersObj = JSON.parse(_this.cookiesParameters);
              //高级部分数据
              _this.selectedKeepalive = res.httpRequest.keepAlive? true: false;
              _this.selectedSecure = res.httpRequest.secure;
              _this.setDatas();
            }
          })
          .catch(err => {
            console.log("getExpectationById失败", err);
          });
      },
      setDatas() {
        let _this = this;
        if (_this.queryParameters === null || _this.queryParameters === "{}") {
          this.paramsQuery[0] = "";
          this.paramsQueryKey[0] = "";
          this.paramsQueryValue[0] = "";
        }
        if (_this.headers === null || _this.headers === "{}") {
          this.paramsHeaders[0] = "";
          this.paramsHeadersKey[0] = "";
          this.paramsHeadersValue[0] = "";
        }
        if (_this.cookies === null || _this.cookies === "{}") {
          this.paramsCookies[0] = "";
          this.paramsCookiesKey[0] = "";
          this.paramsCookiesValue[0] = "";
        }

        /**
        * 数据初始化
        */
        //queryParams
        for (let key in _this.queryParametersObj) {
          console.log(key, this.queryParametersObj[key]);
          this.paramsQueryKey.push(key);
          this.paramsQueryValue.push(this.queryParametersObj[key]);
          let getObj = new Object();
          getObj[key] = this.queryParametersObj[key];
          this.paramsQuery.push(getObj);
        }
        //headersParams
        for (let key in this.headersParametersObj) {
          console.log(key, this.headersParametersObj[key]);
          this.paramsHeadersKey.push(key);
          this.paramsHeadersValue.push(this.headersParametersObj[key]);
          let getObj = new Object();
          getObj[key] = this.headersParametersObj[key];
          this.paramsHeaders.push(getObj);
        }
        //queryParams
        for (let key in this.cookiesParametersObj) {
          console.log(key, this.cookiesParametersObj[key]);
          this.paramsCookiesKey.push(key);
          this.paramsCookiesValue.push(this.cookiesParametersObj[key]);
          let getObj = new Object();
          getObj[key] = this.cookiesParametersObj[key];
          this.paramsCookies.push(getObj);
        }
      },
      runMock() {
        //请求参数query
        let paramsQueryObj = new Object();
        //请求参数headers
        let paramsHeadersObj = new Object();
        //请求参数cookies
        let paramsCookiesObj = new Object();
        for (let i = 0; i < this.paramsQueryKey.length; i++) {
          paramsQueryObj[this.paramsQueryKey[i]] = this.paramsQueryValue[i];
        }
        for (let i = 0; i < this.paramsHeadersKey.length; i++) {
          paramsHeadersObj[this.paramsHeadersKey[i]] = this.paramsHeadersValue[i];
        }
        for (let i = 0; i < this.paramsCookiesKey.length; i++) {
          paramsCookiesObj[this.paramsCookiesKey[i]] = this.paramsCookiesValue[i];
        }
        console.log("this.selectedKeepalive",this.messageInfo, typeof this.messageInfo)
        Request({
          url: "/mockServer/runExpectation",
          method: "POST",
          params: {
            body: `${this.messageInfo}`,
            cookies: JSON.stringify(paramsCookiesObj),
            headers: JSON.stringify(paramsHeadersObj),
            keepAlive: this.keepAlive? true: false,
            method: this.selectedParseMethod,
            methodType: this.methodType? true: false,
            path: this.path,
            pathType: this.pathType? true: false,
            queryParameters: JSON.stringify(paramsQueryObj),
            secure: this.selectedSecure,
            type: this.messageFormat
          }
        })
          .then(res => {
            console.log("运行成功", res);
            this.runResult = res;
            Request({
              url: "/mockServer/saveRunRequest",
              method: "POST",
              params: {
                body: this.messageInfo,
                cookies: JSON.stringify(paramsCookiesObj),
                expectationId: this.expectationId,
                headers: JSON.stringify(paramsHeadersObj),
                id: "38",
                keepAlive: this.selectedKeepalive,
                method: this.selectedParseMethod,
                methodType: this.methodType,
                path: this.path,
                pathType: this.pathType,
                queryParameters: JSON.stringify(paramsQueryObj),
                secure: this.selectedSecure,
                type: this.messageFormat
              }
            })
              .then(res => {
                console.log("保存成功", res);
              })
              .catch(err => {
                console.log("保存错误", err);
              });
          })
          .catch(err => {
            console.log("提交出现错误", err);
          });
      },
      handleTitleChange(requestParamsTitle) {
        let _this = this;
        //  _this.$message.success('handle：' + requestParamsTitle)
        if (requestParamsTitle === "body") {
          _this.bodyVisible = true;
          _this.queryVisible = false;
          _this.headersVisible = false;
          _this.cookiesVisible = false;
          _this.highVisible = false;
        } else if (requestParamsTitle === "query") {
          _this.bodyVisible = false;
          _this.queryVisible = true;
          _this.headersVisible = false;
          _this.cookiesVisible = false;
          _this.highVisible = false;
        } else if (requestParamsTitle === "headers") {
          _this.bodyVisible = false;
          _this.queryVisible = false;
          _this.headersVisible = true;
          _this.cookiesVisible = false;
          _this.highVisible = false;
        } else if (requestParamsTitle === "cookies") {
          _this.bodyVisible = false;
          _this.queryVisible = false;
          _this.headersVisible = false;
          _this.cookiesVisible = true;
          _this.highVisible = false;
        } else {
          _this.bodyVisible = false;
          _this.queryVisible = false;
          _this.headersVisible = false;
          _this.cookiesVisible = false;
          _this.highVisible = true;
        }
      },
      printFormat() {
        console.log("报文体格式", this.messageFormat);
        console.log("返回数据格式", this.returnDataType);
      },
      //添加按钮事件
      addParamsQueryNewRow() {
        this.$message.success("添加参数query事件");
        let obj = new Object();
        this.paramsQueryKey.push("");
        this.paramsQueryValue.push("");
        this.paramsQuery.push(obj);
      },
      addParamsHeadersNewRow() {
        this.$message.success("添加参数headers事件");
        let obj = new Object();
        this.paramsHeadersKey.push("");
        this.paramsHeadersValue.push("");
        this.paramsHeaders.push(obj);
      },
      addParamsCookiesNewRow() {
        this.$message.success("添加参数cookies事件");
        let obj = new Object();
        this.paramsCookiesKey.push("");
        this.paramsCookiesValue.push("");
        this.paramsCookies.push(obj);
      },
      //删除按钮事件
      deleteParamsQueryNewRow() {
        this.$message.error("删除参数query事件");
        if (this.paramsQuery.length === 1) {
        } else {
          this.paramsQuery.pop();
          let obj = new Object();
          this.paramsQuery[this.paramsQuery.length - 1] = obj;
        }
      },
      deleteParamsHeadersNewRow() {
        this.$message.error("删除参数headers事件");
        if (this.paramsHeaders.length === 1) {
        } else {
          this.paramsHeaders.pop();
        }
      },
      deleteParamsCookiesNewRow() {
        this.$message.error("删除参数cookies事件");
        if (this.paramsCookies.length === 1) {
        } else {
          this.paramsCookies.pop();
        }
      }
    }
  };
</script>
<style scoped>
  .cardEdit {
    padding: 5px;
  }
  .baseInfo,
  .requestParams,
  .forwardSetting {
    width: 110px;
    height: 38px;
    margin-top: -10px;
    display: inline-block;
    background: #409eff;
    padding-top: 6px;
    font-size: 18px;
    font-weight: bolder;
    border-radius: 0.25em;
    white-space: nowrap;
    color: #fff;
    text-align: center;
    margin-bottom: -10px;
  }
  .requestParams,
  .forwardSetting {
    width: 130px;
    margin-top: 20px;
  }
  .contentDiv,
  .returnDataDiv,
  .dataSetting {
    width: 99%;
    height: fit-content;
    padding: 10px;
    margin: 10px auto auto auto;
    border: 1px solid lightgrey;
    border-radius: 8px;
    background: #f5f5f5;
  }
  .returnDataDiv {
    margin-top: -15px;
  }
  .dataSetting {
    height: 140px;
  }
  .expectInput {
    width: 230px;
  }
  .path {
    width: 400px;
  }
  .basicSettingRow {
    margin-top: 15px;
    font-size: 17px;
  }
  .settingTitleRow {
    margin: -10px auto;
    width: fit-content;
  }
  .radioButtonRow {
    margin: 0px auto 10px 20px;
  }
  .returnDataRadioButtonRow {
    margin: -10px auto 10px 20px;
  }
  .radioButtonRowHigh {
    margin: 0px auto -20px 20px;
  }
  .liRadioButtonRow {
    margin: 0px auto -20px 0px;
    width: 99%;
  }
  .ulRadioButton {
    margin-top: 10px;
    margin-left: 10px;
  }
  .Error {
    margin-bottom: -15px;
  }
  .formRow {
    margin: 5px auto;
  }
  /* 控制文字域样式 */
  .textareaStyle,
  .runResultStyle {
    border: 1px solid gray;
    border-radius: 8px;
    background: #ffffff;
    width: 96%;
    height: 300px;
    margin: 10px auto 10px auto;
    display: block;
    padding: 15px 12px 5px 12px;
    font-size: 17px;
    font-family: "Times New Roman";
  }
  .runResultStyle {
    height: fit-content;
  }
  .msLabel {
    height: 40px;
    padding-top: 10px;
  }
  .radioGroupStyle {
    margin-top: 13px;
  }
  .paramsForm {
    width: 99%;
  }
  .rowForward {
    margin: -15px auto;
  }
  .beforeRunStyle {
    margin-left: 20px;
    padding-top: 10px;
    font-size: 14px;
  }
</style>
<template>
  <div class="cardEdit">
    <el-row>
      <el-col :span="20" :offset="0">
        <span class="baseInfo">基本设置</span>
      </el-col>
      <el-col :span="1" :offset="0">
        <el-button type="primary" size="small" icon="el-icon-upload" plain @click="submitInfo">提交</el-button>
      </el-col>
    </el-row>
    <div class="contentDiv">
      <el-form>
        <el-form-item class="basicSettingRow" label="期望名称" label-width="100px">
          <el-input class="expectInput" v-model="expectationName"></el-input>
        </el-form-item>
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
          @change="handleTitleChange(requestParamsTitle)">
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
      <textarea class="textareaStyle" v-model="messageInfo"></textarea>
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
    <div v-if="type === 'forward'">
      <el-row>
        <span class="forwardSetting">转发数据设置</span>
      </el-row>
      <div class="dataSetting">
        <el-form>
          <el-row class="rowForward">
            <el-col :span="11">
              <el-form-item class="basicSettingRow" label="host" label-width="100px">
                <el-input class="expectInput" v-model="hostContent"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item class="basicSettingRow" label="port" label-width="100px">
                <el-input class="expectInput" v-model="portContent"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="协议" label-width="100px">
            <el-select v-model="selectedProtocol">
              <el-option v-for="(item,index) in protocols" :key="index" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-else>
      <el-row>
        <span class="forwardSetting">返回数据设置</span>
      </el-row>
      <el-row class="settingTitleRow">
        <div>
          <el-radio-group
            size="small"
            v-model="returnDataTitle"
            @change="handleReturnDataTitleChange(returnDataTitle)"
          >
            <el-radio-button label="body"></el-radio-button>
            <el-radio-button label="headers"></el-radio-button>
            <el-radio-button label="cookies"></el-radio-button>
          </el-radio-group>
        </div>
      </el-row>
      <el-row class="formRow">
        <el-form>
          <el-col :span="10">
            <el-form-item label="状态码" label-width="100px">
              <el-input v-model="statusCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item label="延时时间" label-width="100px">
              <el-input v-model="delayTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" style="margin-left: 3px">
            <el-form-item label="ms"></el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <!--body-->
      <div class="returnDataDiv" v-if="returnBodyVisible">
        <el-row class="returnDataRadioButtonRow">
          <el-form>
            <el-col :span="12">
              <el-radio-group
                class="radioGroupStyle"
                v-model="returnDataType"
                @change="printFormat"
              >
                <el-radio label="JSON"></el-radio>
                <el-radio label="XML"></el-radio>
                <el-radio label="STRING"></el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="8">
              <el-form-item class="Error" label="报错信息：" label-width="100px">
                <el-input class="expectInput" v-model="reasonPhrase"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <textarea class="textareaStyle" v-model="returnDataInfo"></textarea>
      </div>
      <!--headers-->
      <div class="returnDataDiv" v-if="returnHeadersVisible">
        <ul class="ulRadioButton">
          <li v-for="(item,index) in returnHeaders" :key="index">
            <el-row class="liRadioButtonRow">
              <el-col :span="15">
                <el-form>
                  <el-form-item label="请求参数" label-width="100px">
                    <el-input
                      style="width: 200px"
                      placeholder="参数名称"
                      v-model="returnHeadersKey[index]"
                    ></el-input>
                    <el-input
                      style="width: 400px;margin-left: 10px"
                      placeholder="参数值"
                      v-model="returnHeadersValue[index]"
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
                  @click="addReturnHeadersNewRow"
                ></el-button>
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  circle
                  @click="deleteReturnHeadersNewRow"
                ></el-button>
              </el-col>
            </el-row>
          </li>
        </ul>
      </div>
      <!--cookies-->
      <div class="returnDataDiv" v-if="returnCookiesVisible">
        <ul class="ulRadioButton">
          <li v-for="(item,index) in returnCookies" :key="index">
            <el-row class="liRadioButtonRow">
              <el-col :span="15">
                <el-form>
                  <el-form-item label="请求头部" label-width="100px">
                    <el-input
                      style="width: 200px"
                      placeholder="参数名称"
                      v-model="returnCookiesKey[index]"
                    ></el-input>
                    <el-input
                      style="width: 400px;margin-left: 10px"
                      placeholder="参数值"
                      v-model="returnCookiesValue[index]"
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
                  @click="addReturnCookiesNewRow"
                ></el-button>
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  circle
                  @click="deleteReturnCookiesNewRow"
                ></el-button>
              </el-col>
            </el-row>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Request from "@/libs/request.js";
  import VueMixins from "@/libs/vueMixins.js";
  import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
  export default {
    name: "edit",
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
        returnDataTitle: "body", //底部返回数据设置的标题
        returnBodyVisible: true,
        returnHeadersVisible: false,
        returnCookiesVisible: false,
        messageFormat: "JSON", //报文体格式
        returnDataType: "JSON", //返回数据报文形式
        messageInfo: "", //报文体内容
        returnDataInfo: "", //返回数据报文体内容
        hostContent: "localhost", //host
        protocols: ["HTTP", "HTTPS"], //协议
        selectedProtocol: "HTTP", //选中的协议
        portContent: "8080", //端口号
        secures: ["true", "false"],
        selectedSecure: "", //选择的secure
        keepalives: ["true", "false"],
        selectedKeepalive: "", //选择的keepalive
        type: "", //返回的动作类型
        statusCode: "200", //状态码
        delayTime: "0", //延误时间
        creator: "", //创建者
        httpRequest: {}, //解析得到的httpRequest
        httpResponse: {}, //解析得到的httpResponse
        httpForwardEntity: {
          id: 5,
          host: "",
          port: "",
          scheme: ""
        }, //请求时所需要的httpForwardEntity
        reasonPhrase: "", //错误原因
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
        //return——headers
        headersReturn: "", //headersReturn的数据
        headersReturnObj: {}, //headersReturn的数据转化对象
        returnHeadersKey: [], //返回数据的headers
        returnHeadersValue: [], //返回数据的headers
        returnHeaders: [], //返回数据的headers
        //return——cookies
        cookiesReturn: "", //cookiesReturn的数据
        cookiesReturnObj: {}, //cookiesReturn的数据转化对象
        returnCookiesKey: [], //返回数据的cookies
        returnCookiesValue: [], //返回数据的cookies
        returnCookies: [] //返回数据的cookies
      };
    },
    computed: {},
    mounted() {
      this.id = this.$route.query.id;
      console.log("id：", this.id);
      this.getExpectationById(this.id);
    },
    methods: {
      //根据id获取信息
      getExpectationById(id) {
        let _this = this;
        console.log("getExpectationById")
        let qs = require("qs");
        Request({
          url: "/mockServer/getExpectationById",
          method: "POST",
          params: qs.stringify({
            id: this.id
          })
        })
          .then(res => {
            console.log("getExpectationById", res.type);
            _this.expectationName = res.expectationName;
            _this.type = res.type;
            _this.creator = res.creator;
            _this.httpRequest = res.httpRequest? res.httpRequest: {};
            _this.httpResponse = res.httpResponse? res.httpResponse: {};
            if(res.httpForwardEntity) {
              _this.hostContent = res.httpForwardEntity.host
              _this.portContent = res.httpForwardEntity.port
              _this.selectedProtocol = res.httpForwardEntity.scheme
            }
            if (res.httpResponse !== null) {
              _this.reasonPhrase = res.httpResponse.reasonPhrase;
              _this.statusCode = res.httpResponse.statusCode;
              _this.delayTime = res.httpResponse.delayTime;
              //返回数据内容
              _this.returnDataInfo = res.httpResponse.body;
              _this.returnDataType = res.httpResponse.type;
              _this.headersReturn = res.httpResponse.headers;
              _this.headersReturnObj = JSON.parse(_this.headersReturn);
              _this.cookiesReturn = res.httpResponse.cookies;
              _this.cookiesReturnObj = JSON.parse(_this.cookiesReturn);
              if (
                res.httpResponse.headers === null ||
                res.httpResponse.headers === "{}"
              ) {
                this.returnHeaders[0] = "";
                this.returnHeadersKey[0] = "";
                this.returnHeadersValue[0] = "";
              }
              if (
                res.httpResponse.cookies === null ||
                res.httpResponse.cookies === "{}"
              ) {
                this.returnCookies[0] = "";
                this.returnCookiesKey[0] = "";
                this.returnCookiesValue[0] = "";
              }
            }
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
            if (
              res.httpRequest.queryParameters === null ||
              res.httpRequest.queryParameters === "{}"
            ) {
              this.paramsQuery[0] = "";
              this.paramsQueryKey[0] = "";
              this.paramsQueryValue[0] = "";
            }
            if (
              res.httpRequest.headers === null ||
              res.httpRequest.headers === "{}"
            ) {
              this.paramsHeaders[0] = "";
              this.paramsHeadersKey[0] = "";
              this.paramsHeadersValue[0] = "";
            }
            if (
              res.httpRequest.cookies === null ||
              res.httpRequest.cookies === "{}"
            ) {
              this.paramsCookies[0] = "";
              this.paramsCookiesKey[0] = "";
              this.paramsCookiesValue[0] = "";
            }

            //高级部分数据
            _this.selectedKeepalive = res.httpRequest.keepAlive;
            _this.selectedSecure = res.httpRequest.secure;

            /**
             * 数据初始化
             */
            //queryParams
            for (let key in this.queryParametersObj) {
              console.log('key', this.queryParametersObj[key]);
              this.paramsQueryKey.push(key);
              this.paramsQueryValue.push(this.queryParametersObj[key]);
              let getObj = new Object();
              getObj[key] = this.queryParametersObj[key];
              this.paramsQuery.push(getObj);
            }
            console.log("数组转换", this.paramsQuery);
            //headersParams
            for (let key in this.headersParametersObj) {
              console.log(key, this.headersParametersObj[key]);
              this.paramsHeadersKey.push(key);
              this.paramsHeadersValue.push(this.headersParametersObj[key]);
              let getObj = new Object();
              getObj[key] = this.headersParametersObj[key];
              this.paramsHeaders.push(getObj);
            }
            console.log("数组转换", this.paramsHeaders);
            //queryParams
            for (let key in this.cookiesParametersObj) {
              console.log(key, this.cookiesParametersObj[key]);
              this.paramsCookiesKey.push(key);
              this.paramsCookiesValue.push(this.cookiesParametersObj[key]);
              let getObj = new Object();
              getObj[key] = this.cookiesParametersObj[key];
              this.paramsCookies.push(getObj);
            }
            console.log("数组转换", this.paramsCookies);
            //headersReturn
            for (let key in this.headersReturnObj) {
              console.log(key, this.headersReturnObj[key]);
              this.returnHeadersKey.push(key);
              this.returnHeadersValue.push(this.headersReturnObj[key]);
              let getObj = new Object();
              getObj[key] = this.headersReturnObj[key];
              this.returnHeaders.push(getObj);
            }
            console.log("数组转换", this.returnHeaders);
            //cookiesReturn
            for (let key in this.cookiesReturnObj) {
              console.log(key, this.cookiesReturnObj[key]);
              this.returnCookiesKey.push(key);
              this.returnCookiesValue.push(this.cookiesReturnObj[key]);
              let getObj = new Object();
              getObj[key] = this.cookiesReturnObj[key];
              this.returnCookies.push(getObj);
            }
            console.log("数组转换", this.returnCookies);
          })
          .catch(err => {
            console.log("getExpectationById失败", err);
          });
      },
      submitInfo() {
        //请求参数query
        let paramsQueryObj = new Object();
        //请求参数headers
        let paramsHeadersObj = new Object();
        //请求参数cookies
        let paramsCookiesObj = new Object();
        //返回数据headers
        let returnHeadersObj = new Object();
        //返回数据cookies
        let returnCookiesObj = new Object();
        for (let i = 0; i < this.paramsQueryKey.length; i++) {
          paramsQueryObj[this.paramsQueryKey[i]] = this.paramsQueryValue[i];
        }
        for (let i = 0; i < this.paramsHeadersKey.length; i++) {
          paramsHeadersObj[this.paramsHeadersKey[i]] = this.paramsHeadersValue[i];
        }
        for (let i = 0; i < this.paramsCookiesKey.length; i++) {
          paramsCookiesObj[this.paramsCookiesKey[i]] = this.paramsCookiesValue[i];
        }
        if (this.httpResponse != null) {
          for (let i = 0; i < this.returnHeadersKey.length; i++) {
            returnHeadersObj[this.returnHeadersKey[i]] = this.returnHeadersValue[
              i
            ];
          }
          for (let i = 0; i < this.returnCookiesKey.length; i++) {
            returnCookiesObj[this.returnCookiesKey[i]] = this.returnCookiesValue[
              i
            ];
          }
        }
        this.httpRequest.body = this.messageInfo;
        this.httpRequest.cookies = JSON.stringify(paramsCookiesObj);
        this.httpRequest.headers = JSON.stringify(paramsHeadersObj);
        this.httpRequest.queryParameters = JSON.stringify(paramsQueryObj);
        this.httpRequest.keepAlive = this.selectedKeepalive;
        this.httpRequest.secure = this.selectedSecure;
        this.httpRequest.path = this.path;
        this.httpRequest.method = this.selectedParseMethod;
        this.httpRequest.type = this.messageFormat;

        if (this.httpResponse != null) {
          this.httpResponse.body = this.returnDataInfo;
          this.httpResponse.cookies = JSON.stringify(returnCookiesObj);
          this.httpResponse.headers = JSON.stringify(returnHeadersObj);
          this.httpResponse.statusCode = this.statusCode;
          this.httpResponse.delayTime = this.delayTime;
          this.httpResponse.type = this.returnDataType;
          this.httpResponse.reasonPhrase = this.reasonPhrase;
        }
        if (this.httpForwardEntity != null) {
          this.httpForwardEntity.host = this.hostContent;
          this.httpForwardEntity.port = this.portContent;
          this.httpForwardEntity.scheme = this.selectedProtocol;
        }
        // console.log("creator", this.creator);
        // console.log("expectationName", this.expectationName);
        // console.log("httpForwardEntity", this.httpForwardEntity);
        // console.log("httpRequest", this.httpRequest);
        // console.log("httpResponse", this.httpResponse);
        // console.log("id", this.id);
        // console.log("type", this.type);

        Request({
          url: "/mockServer/updateExpectation",
          method: "POST",
          params: {
            creator: this.creator,
            expectationName: this.expectationName,
            httpForwardEntity: this.httpForwardEntity === null ? null : this.httpForwardEntity,
            httpRequest: this.httpRequest,
            httpResponse: this.httpResponse === null ? null : this.httpResponse,
            id: this.id,
            type: this.type,
            userId: Number(sessionStorage.getItem('userId')),
            creatorId: this.creatorId
          }
        })
          .then(res => {
            console.log("提交成功", res);
            this.$message.success(res.respMsg);
          })
          .catch(err => {
            console.log("提交出现错误", err);
            this.$message.error("提交错误");
          });
      },
      handleTitleChange(requestParamsTitle) {
        let _this = this;
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
      handleReturnDataTitleChange(returnDataTitle) {
        let _this = this;
        // _this.$message.success('handle：' + returnDataTitle)
        if (returnDataTitle === "body") {
          _this.returnBodyVisible = true;
          _this.returnCookiesVisible = false;
          _this.returnHeadersVisible = false;
        } else if (returnDataTitle === "headers") {
          _this.returnBodyVisible = false;
          _this.returnHeadersVisible = true;
          _this.returnCookiesVisible = false;
        } else if (returnDataTitle === "cookies") {
          _this.returnBodyVisible = false;
          _this.returnHeadersVisible = false;
          _this.returnCookiesVisible = true;
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
      addReturnHeadersNewRow() {
        this.$message.success("添加数据headers事件");
        let obj = new Object();
        this.returnHeadersKey.push("");
        this.returnHeadersValue.push("");
        this.returnHeaders.push(obj);
      },
      addReturnCookiesNewRow() {
        this.$message.success("添加数据cookies事件");
        let obj = new Object();
        this.returnCookiesKey.push("");
        this.returnCookiesValue.push("");
        this.returnCookies.push(obj);
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
      },
      deleteReturnHeadersNewRow() {
        this.$message.error("删除数据headers事件");
        if (this.returnHeaders.length === 1) {
        } else {
          this.returnHeaders.pop();
        }
      },
      deleteReturnCookiesNewRow() {
        this.$message.error("删除数据cookies事件");
        if (this.returnCookies.length === 1) {
        } else {
          this.returnCookies.pop();
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
  .textareaStyle {
    border: 1px solid gray;
    border-radius: 8px;
    background: #ffffff;
    width: 96%;
    height: 300px;
    margin: 10px auto 10px auto;
    display: block;
    padding: 6px 12px;
    font-size: 17px;
    font-family: "Times New Roman";
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
</style>
<template>
    <div class="cardEdit">
        <el-row>
            <el-col :span='20' :offset='0'>
                <span 
                    class="baseInfo"
                    >基本设置
                </span>
            </el-col>
            <el-col :span='1' :offset='0'>
                <el-button 
                    type='primary'
                    size='mini'
                    icon='el-icon-video-play'
                    plain
                    @click='submitInfo'
                    >运行
                </el-button >
            </el-col>
        </el-row>
        <div class="contentDiv">
            <el-form>
                <el-form-item 
                    class="basicSettingRow" 
                    label='接口路径' 
                    label-width='100px'>
                    <el-select
                        v-model="selectedParseMethod">
                        <el-option 
                            v-for="(item,index) in parseMethods" 
                            :key="index" 
                            :value='item'
                            >
                        </el-option>
                    </el-select>
                    <el-input 
                        class="path"
                        v-model='path'>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <el-row>
            <span class="requestParams">
                请求参数设置
            </span>
        </el-row>
        <el-row
            class="settingTitleRow">
            <div>
                <el-radio-group 
                    size="small"
                    v-model="requestParamsTitle" 
                    @change="handleTitleChange(requestParamsTitle)">
                    <el-radio-button label='body'></el-radio-button>
                    <el-radio-button label='query'></el-radio-button>
                    <el-radio-button label='headers'></el-radio-button>
                    <el-radio-button label='cookies'></el-radio-button>
                    <el-radio-button label='高级'></el-radio-button>
                </el-radio-group>
            </div>
        </el-row>
        <!--body-->
        <div
            class="contentDiv" 
            v-if="bodyVisible">
            <el-row 
                class="radioButtonRow">
                <el-radio-group
                    v-model="messageFormat"
                    @change="printFormat">
                    <el-radio
                        label='JSON'>
                    </el-radio>
                    <el-radio
                        label='XML'>
                    </el-radio>
                    <el-radio
                        label='STRING'>
                    </el-radio>
                </el-radio-group>
            </el-row>
            <textarea
                class="textareaStyle"
                v-model="messageInfo">
            </textarea>
        </div>
        <!--query-->
        <div
            class="contentDiv" 
            v-if="queryVisible">
            <el-row 
                class="radioButtonRowHigh">
                <el-col
                    :span='15'>
                    <el-form>
                        <el-form-item
                            label='请求参数'
                            label-width='100px'>
                            <el-input
                                style="width: 200px"
                                placeholder='参数名称'>

                            </el-input>
                            <el-input
                                style="width: 400px;margin-left: 10px"
                                placeholder='参数值'>

                            </el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col
                    :span='2'
                    style='margin-left:10px;margin-top:4px'>
                    <el-button
                        type='primary'
                        size='mini'
                        icon='el-icon-plus'
                        circle>

                    </el-button>
                    <el-button
                        type='danger'
                        size='mini'
                        icon='el-icon-delete'
                        circle>

                    </el-button>
                </el-col>
            </el-row>
           
        </div>
        <!--headers-->
        <div
            class="contentDiv" 
            v-if="headersVisible">
            <el-row 
                class="radioButtonRowHigh">
                <el-form>
                    <el-col
                        :span='15'>
                        <el-form>
                            <el-form-item
                                label='请求头部'
                                label-width='100px'>
                                <el-input
                                    style="width: 200px"
                                    placeholder='参数名称'>

                                </el-input>
                                <el-input
                                    style="width: 400px;margin-left: 10px"
                                    placeholder='参数值'>

                                </el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col
                        :span='2'
                        style='margin-left:10px;margin-top:4px'>
                        <el-button
                            type='primary'
                            size='mini'
                            icon='el-icon-plus'
                            circle>

                        </el-button>
                        <el-button
                            type='danger'
                            size='mini'
                            icon='el-icon-delete'
                            circle>

                        </el-button>
                    </el-col>
                </el-form>
            </el-row>
        </div>
        <!--cookies-->
        <div
            class="contentDiv" 
            v-if="cookiesVisible">
            <el-row 
                class="radioButtonRowHigh">
                <el-form>
                    <el-col
                        :span='15'>
                        <el-form>
                            <el-form-item
                                label='cookies'
                                label-width='100px'>
                                <el-input
                                    style="width: 200px"
                                    placeholder='参数名称'>

                                </el-input>
                                <el-input
                                    style="width: 400px;margin-left: 10px"
                                    placeholder='参数值'>

                                </el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col
                        :span='2'
                        style='margin-left:10px;margin-top:4px'>
                        <el-button
                            type='primary'
                            size='mini'
                            icon='el-icon-plus'
                            circle>

                        </el-button>
                        <el-button
                            type='danger'
                            size='mini'
                            icon='el-icon-delete'
                            circle>

                        </el-button>
                    </el-col>
                </el-form>
            </el-row>
        </div>
         <!--高级-->
        <div
            class='contentDiv' 
            v-if='highVisible'>
            <el-row
                class="radioButtonRowHigh">
                <el-form>
                    <el-col :span='11'>
                        <el-form-item 
                            label='secure'
                            label-width='100px'>
                            <el-select
                                v-model='selectedSecure'>
                                <el-option
                                    v-for='(item,index) in secures'
                                    :key='index'
                                    :value='item'>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span='10'>
                        <el-form-item 
                            label='keepalive'
                            label-width='100px'>
                            <el-select
                                v-model='selectedKeepalive'>
                                <el-option
                                    v-for='(item,index) in keepalives'
                                    :key='index'
                                    :value='item'>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
        </div>
        <div v-if="type==='forward'">
            <el-row>
                <span
                    class='forwardSetting'>
                    转发数据设置
                </span>
            </el-row>
            <div class='contentDiv'>
                <el-form>
                    <el-row>
                        <el-col :span='11'>
                            <el-form-item 
                                class='basicSettingRow' 
                                label='host' 
                                label-width='100px'>
                                <el-input 
                                    class='expectInput'
                                    v-model='hostContent'>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='10'>
                            <el-form-item 
                                class='basicSettingRow' 
                                label='port' 
                                label-width='100px'>
                                <el-input 
                                    class='expectInput'
                                    v-model='portContent'>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                    <el-form-item 
                        label='协议' 
                        label-width='100px'>
                        <el-select
                            v-model='selectedProtocol'>
                            <el-option 
                                v-for='(item,index) in protocols' 
                                :key='index' 
                                :value='item'
                                >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div v-else>
            <el-row>
                <span
                    class='forwardSetting'>
                    返回数据设置
                </span>
            </el-row>
            <el-row
                class="settingTitleRow">
                <div>
                    <el-radio-group 
                        size="small"
                        v-model="returnDataTitle" 
                        @change="handleReturnDataTitleChange(returnDataTitle)">
                        <el-radio-button label='body'></el-radio-button>
                        <el-radio-button label='query'></el-radio-button>
                        <el-radio-button label='headers'></el-radio-button>
                    </el-radio-group>
                </div>
            </el-row>
            <el-row 
                class="formRow">
                <el-form>
                    <el-col
                        :span='10'>
                        <el-form-item
                            label='状态码'
                            label-width='100px'>
                            <el-input
                                v-model='statusCode'>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span='8'
                        :offset='2'>
                        <el-form-item
                            label='延时时间'
                            label-width='100px'>
                            <el-input
                                v-model='delayTime'>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span='1'
                        style="margin-left: 3px">
                        <el-form-item
                            label='ms'>

                        </el-form-item>
                    </el-col>
                    
                </el-form>     
            </el-row>
              <!--body-->
            <div
                class="contentDiv" 
                v-if="returnBodyVisible">
                <el-row 
                    class="radioButtonRow">
                    <el-form>
                        <el-col
                            :span='10'>
                            <el-radio-group
                                class="radioGroupStyle"
                                v-model="returnDataType"
                                @change="printFormat">
                                <el-radio
                                    label='JSON'>
                                </el-radio>
                                <el-radio
                                    label='XML'>
                                </el-radio>
                                <el-radio
                                    label='STRING'>
                                </el-radio>
                            </el-radio-group>
                        </el-col>
                        <el-col
                            :span='8'>
                            <el-form-item
                                class="Error"
                                label='报错信息：'
                                label-width='100px'>
                                <el-input
                                    class="expectInput"
                                    v-model='reasonPhrase'>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        
                    </el-form>
                </el-row>
                <textarea
                    class="textareaStyle"
                    v-model="returnDataInfo">
                </textarea>
            </div>
            <!--query-->
            <div
                class="contentDiv" 
                v-if="returnQueryVisible">
                <el-row 
                    class="radioButtonRowHigh">
                    <el-form>
                        <el-form-item
                            label='请求参数'
                            label-width='100px'>
                            <el-input
                                style="width: 200px"
                                placeholder='参数名称'>
                            </el-input>
                            <el-input
                                style="width: 400px;margin-left: 10px"
                                placeholder='参数值'>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </el-row>
                
            </div>
            <!--headers-->
            <div
                class="contentDiv" 
                v-if="returnHeadersVisible">
                <el-row 
                    class="radioButtonRowHigh">
                    <el-form>
                        <el-form-item
                            label='请求头部'
                            label-width='100px'>
                            <el-input
                                style="width: 200px"
                                placeholder='头部名称'>
                            </el-input>
                            <el-input
                                style="width: 400px;margin-left: 10px"
                                placeholder='参数值'>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </el-row>
            </div>
           
        </div>
    </div>
</template>

<<script>
    import Request from '@/libs/request.js'
	import VueMixins from '@/libs/vueMixins.js'
	import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
    export default {
        name:'run',
         components: {ElSlPanel},
		mixins: [VueMixins], // 混入
        data() {
            return{
                id: '',//获取数据所需要的id
                expectationName: '',//期望名称
                parseMethods: [
                    'POST',
                    'GET',
                    'PUT',
                    'DELETE',
                    'HEAD',
                    'OPTIONS',
                    'PATCH'
                ],//接口解析方法
                selectedParseMethod: 'POST',//默认选中的接口解析方法
                path:'',//接口路径
                requestParamsTitle: 'body',
                bodyVisible: true,
                queryVisible: false,
                headersVisible: false,
                cookiesVisible: false,
                highVisible: false,
                returnDataTitle:'body',//底部返回数据设置的标题
                returnBodyVisible: true,
                returnQueryVisible: false,
                returnHeadersVisible: false,
                messageFormat: 'JSON',//报文体格式
                returnDataType: 'JSON',//返回数据报文形式
                messageInfo: '',//报文体内容
                returnDataInfo: '',//返回数据报文体内容
                hostContent: 'localhost',//host
                protocols:[
                    'HTTP',
                    'HTTPS'
                ],//协议
                selectedProtocol: 'HTTP',//选中的协议
                portContent: '8080',//端口号
                secures:[
                    'true',
                    'false'
                ],
                selectedSecure: '',//选择的secure
                keepalives:[
                    'true',
                    'false'
                ],
                selectedKeepalive: '',//选择的keepalive
                type: '',//返回的动作类型
                statusCode: '200',//状态码
                delayTime: '0',//延误时间
                creator: '',//创建者
                httpRequest:'',//解析得到的httpRequest
                httpResponse:'',//解析得到的httpResponse
                httpForwardEntity: {
                    id: '',
                    host: '',
                    port: '',
                    scheme: ''
                },//请求时所需要的httpForwardEntity
                reasonPhrase: '',//错误原因
            }
        },
        computed: {
            
        },
        created() {
            this.id = this.$route.query.id;
            console.log('id：',this.id)
            this.getExpectationById(this.id)
        },
        mounted() {
            this.id = this.$route.query.id;
            console.log('id：',this.id)
            this.getExpectationById(this.id)
        },
        methods: {
            //根据id获取信息
            getExpectationById(id){
                let _this = this;
                let qs = require('qs');
                Request({
                    url: '//mockServer/getExpectationById',
                    method: 'POST',
                    params: qs.stringify({
                        id: this.id
                    })
                }).then(res=>{
                    _this.expectationName = res.expectationName;
                    _this.path = res.httpRequest.path;
                    _this.selectedParseMethod = res.httpRequest.method;
                    _this.messageInfo = res.httpRequest.body;
                    _this.type = res.type;
                    _this.creator = res.creator;
                    _this.httpRequest = res.httpRequest;
                    _this.httpResponse = res.httpResponse;
                    _this.reasonPhrase = res.httpResponse.reasonPhrase;
                    _this.statusCode = res.httpResponse.statusCode;
                    _this.delayTime = res.httpResponse.delayTime;
                    _this.messageFormat = res.httpRequest.type;
                    //返回数据内容
                    _this.returnDataInfo = res.httpResponse.body;
                    _this.returnDataType = res.httpResponse.type;
                    //高级部分数据
                    _this.selectedKeepalive = res.httpRequest.keepAlive;
                    _this.selectedSecure = res.httpRequest.secure;
                    console.log('获取的type类型', _this.httpRequest)
                }).catch(err=>{
                    console.log('getExpectationById失败',err)
                });
            },
            submitInfo(){
                let result = 'expectationName = ' + this.expectationName
                           + '\nselectedParseMethod = ' + this.selectedParseMethod
                           + '\npath = ' + this.path
                           + '\nid = ' + this.id
                           + '\ncreator = ' + this.creator
                           + '\nhttpRequest = ' + this.httpRequest
                           + '\nhttpResponse = ' + this.httpResponse;
                this.httpRequest.path = this.path;
                this.httpRequest.method = this.selectedParseMethod;
                this.httpRequest.type = this.messageFormat;
                this.httpRequest.body = this.messageInfo;

                this.httpForwardEntity.host = this.hostContent;
                this.httpForwardEntity.port = this.portContent;
                this.httpForwardEntity.scheme = this.selectedProtocol;
                console.log('需要提交的信息(除httpRequest)',result)
                console.log('需要提交的httpRequest:', this.httpRequest)
                console.log('httpForwardEntity:' ,this.httpForwardEntity)
                // Request({
                //     url: '/mockServer/updateExpectation',
                //     method: 'POST',
                //     params: {
                //         creator: this.creator,
                //         expectationName: this.expectationName,
                //         httpForwardEntity: this.httpForwardEntity,
                //         httpRequest: this.httpRequest,
                //         httpResponse: this.httpResponse,
                //         id: this.id,
                //         type: this.type
                //     }
                // }).then(res => {
                //     console.log('提交成功',res)
                // }).catch(err => {
                //     console.log('提交出现错误',err)
                // });
            },
            handleTitleChange(requestParamsTitle) {
                let _this = this;
                //  _this.$message.success('handle：' + requestParamsTitle)
                if (requestParamsTitle === 'body') {
                    _this.bodyVisible = true;
                    _this.queryVisible = false;
                    _this.headersVisible = false;
                    _this.cookiesVisible = false;
                    _this.highVisible = false;
                }else if(requestParamsTitle === 'query') {
                    _this.bodyVisible = false;
                    _this.queryVisible = true;
                    _this.headersVisible = false;
                    _this.cookiesVisible = false;
                    _this.highVisible = false;
                }else if(requestParamsTitle === 'headers') {
                    _this.bodyVisible = false;
                    _this.queryVisible = false;
                    _this.headersVisible = true;
                    _this.cookiesVisible = false;
                    _this.highVisible = false;
                }else if(requestParamsTitle === 'cookies') {
                    _this.bodyVisible = false;
                    _this.queryVisible = false;
                    _this.headersVisible = false;
                    _this.cookiesVisible = true;
                    _this.highVisible = false;
                }else {
                    _this.bodyVisible = false;
                    _this.queryVisible = false;
                    _this.headersVisible = false;
                    _this.cookiesVisible = false;
                    _this.highVisible = true;
                }
            },
            handleReturnDataTitleChange(returnDataTitle){
                let _this = this;
                // _this.$message.success('handle：' + returnDataTitle)
                if (returnDataTitle === 'body') {
                    _this.returnBodyVisible = true;
                    _this.returnQueryVisible = false;
                    _this.returnHeadersVisible = false;
                }else if(returnDataTitle === 'query') {
                    _this.returnBodyVisible = false;
                    _this.returnQueryVisible = true;
                    _this.returnHeadersVisible = false;
                }else if(returnDataTitle === 'headers') {
                    _this.returnBodyVisible = false;
                    _this.returnQueryVisible = false;
                    _this.returnHeadersVisible = true;
                }
            },
            printFormat() {
                console.log('报文体格式',this.messageFormat);
                console.log('返回数据格式',this.returnDataType);
            }
        },
    }
</script>
<style scoped>
    .cardEdit {
        padding: 5px
    }
    .baseInfo, .requestParams, .forwardSetting {
        width: 100px;
        height: 34px;
        display: inline-block;
        background: #409eff;
        padding-top:5px; 
        font-size: 18px;
        font-weight: bolder;
        border-radius: .25em;
        white-space: nowrap;
        color: #fff;
        text-align: center;
        margin-bottom: 10px
    }
    .requestParams, .forwardSetting {
        width: 130px;
        margin-top: 20px;
    }
    .contentDiv {
        width: 99%;
        height: fit-content;
        margin: 10px auto 10px auto;
        border: 1px solid lightgrey;
        border-radius: 8px;
        background: #f5f5f5;
    }
    .expectInput {
        width: 230px;
    }
    .path {
        width: 400px
    }
    .basicSettingRow {
        margin-top: 30px;
        font-size: 17px;
    }
    .settingTitleRow {
        margin: 0px auto;
        width: fit-content
    }
    .radioButtonRow{
        margin: 15px auto 15px 20px
    }
    .radioButtonRowHigh{
        margin: 20px auto 0px 20px
    }
    .Error{
         margin-bottom: -15px
    }
    .formRow {
        margin: 10px auto
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
        font-family: 'Times New Roman'
	}
    .msLabel {
        height: 40px;
        padding-top: 10px
    }
    .radioGroupStyle {
        margin-top: 13px
    }
</style>
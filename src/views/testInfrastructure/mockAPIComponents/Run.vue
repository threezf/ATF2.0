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
                    icon='el-icon-caret-right'
                    plain
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
                        class="expectInput"
                        v-model='expectationName'>
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
            v-if="headersVisible">
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
        <!--cookies-->
        <div
            class="contentDiv" 
            v-if="cookiesVisible">
            <el-row 
                class="radioButtonRowHigh">
                <el-form>
                    <el-form-item
                        label='cookie'
                        label-width='100px'>
                        <el-input
                            style="width: 200px"
                            placeholder='cookie名称'>
                        </el-input>
                        <el-input
                            style="width: 400px;margin-left: 10px"
                            placeholder='参数值'>

                        </el-input>
                    </el-form-item>
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
</template>

<<script>
    export default {
        name:'run',
         data() {
            return{
                expectationName: 'forward测试12',//期望名称
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
                requestParamsTitle: '',
                bodyVisible: true,
                queryVisible: false,
                headersVisible: false,
                cookiesVisible: false,
                highVisible: false,
                messageFormat: 'JSON',//报文体格式
                messageInfo: '{"pageSize":"10","currentPage":1,"orderType":"asc","orderColumns":"id","username":"","reallyname":"","role":"","tel":"","dept":""}',//报文体内容
                hostContent: 'host',//host
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
            }
        },
        computed: {
            
        },
        created() {
            this.id = this.$route.query.id;
            console.log('id：',this.id)
        },
        mounted() {
            this.id = this.$route.query.id;
            console.log('id：',this.id)
        },
        methods: {
            handleTitleChange(requestParamsTitle) {
                let _this = this;
                 _this.$message.success('handle：' + requestParamsTitle)
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
            printFormat() {
                console.log('报文体格式',this.messageFormat);
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
</style>
    
</style>
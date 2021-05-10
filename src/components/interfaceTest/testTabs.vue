<template>
<div class="tabs-body">
    <el-tabs v-model="bodyShow" type="border-card">
        <el-tab-pane label="请求头部" name="first">
            <el-table :data="headers"
                        size="mini"
                        stripe :show-header="true"
                        border
                        class="h-b-e-a-style"
                        :row-style="{'background-color': 'rgb(250, 250, 250)'}">
                <el-table-column property="key" label="Key" header-align="center" minWidth="100">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.name" size="mini" placeholder="key">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column property="value" label="Value" header-align="center" minWidth="200">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.val" size="mini" placeholder="value">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column label="Description" header-align="center" minWidth="80">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.desc" size="mini" placeholder="备注">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column property="value" label="操作" header-align="center" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                    @click.native="delTableRow('headers',scope.$index)">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="请求体" name="second" >
            <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px; display: flex; align-items: center;">
                <el-radio-group v-model="bodyType">
                    <el-radio label= '0' >form-data</el-radio>
                    <el-radio label= '1' >raw</el-radio>
                </el-radio-group>
                <el-button type="primary" size="mini"
                    v-show="bodyType === '1'"
                    style="margin-left: 20px; margin-top: -9px"
                    @click="formatData()">格式化

                </el-button>
                <el-button size="mini" type="text" style="margin-top: -10px" @click="downloadTemplate">下载模板</el-button>
            </el-form>
            <hr style="height:1px;border:none;border-top:1px solid rgb(241, 215, 215);"/>
					<el-button type="primary" size="small" @click="importTemplate">导入
					</el-button>
            <div v-if="bodyType === '1'">
                <div style="border:1px solid rgb(234, 234, 234) ">
                    <el-container>
                        <editor
                                v-contextmenu:contextmenu
                                style="font-size: 15px"
                                v-model="jsonVariable"
                                @init="editorInit"
                                lang="json"
                                theme="chrome"
                                width="100%"
                                height="200px"
                                :options="{showPrintMargin:false,   //去除编辑器里的竖线
                                }"
                        >
                        </editor>
                    </el-container>
                </div>
            </div>
            <el-table :data="bodys"
                        size="mini"
                        stripe :show-header="true"
                        border
                        style="background-color: rgb(250, 250, 250)"
                        v-if="bodyType === '0'"
                        :row-style="{'background-color': 'rgb(250, 250, 250)'}">
                <el-table-column label="KEY" header-align="center" minWidth="100">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.name" size="mini">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column label="TYPE" header-align="center" width="100">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.type" size="mini">
                            <el-option v-for="item in paramTypes" :key="item" :value="item">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="VALUE" header-align="center" minWidth="200">
                    <template slot-scope="scope">
                        <div v-if="scope.row.type === 'file'">
                            <el-row>
                                <el-col :span="18">
                                    <el-input v-model="scope.row.val" size="mini" :disabled="true">
                                    </el-input>
                                </el-col>
                                <el-col :span="5" style="padding-left:10px;">
                                    <el-upload
                                            class="upload-demo"
                                            :action="uploadUrl"
                                            :show-file-list='false'
                                            :auto-upload="false"
                                            :limit="1"
                                            accept=".xlsx"
                                            :before-upload="beforeUpload"
                                            :file-list="fileList"
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemove"
                                            :on-exceed="handleExceed"
                                            :on-change="handleOnChange"
                                            :on-success="fileChange">
                                        <el-button size="mini" type="primary"
                                                    @click="tempNum(scope.$index)">点击上传
                                        </el-button>
                                    </el-upload>
                                </el-col>
                            </el-row>
                        </div>
                        <div v-else>
                            <el-input v-model="scope.row.val"
                                        :id="'data_input' + scope.$index "
                                        type="textarea"
                                        rows=1
                                        @focus="showLine('data_input', scope.$index)"
                                        @input="changeLine()"
                                        @blur="resetLine()"
                                        size="mini"
                                        resize="none">
                            </el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="DESCRIPTION" header-align="center" minWidth="80">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.desc" size="mini">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column property="value" label="操作" header-align="center" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                    @click.native="delTableRow('bodys',scope.$index)">
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
        </el-tab-pane>
        <el-tab-pane label="请求参数" name="third">
            <el-table :data="params" size="mini" stripe :show-header="true"
                        border
                        class="h-b-e-a-style"
                        :row-style="{'background-color': 'rgb(250, 250, 250)'}">
                <el-table-column property="key" label="Key" header-align="center" minWidth="100">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.name" size="mini" placeholder="Key">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column property="value" label="Value" header-align="center" minWidth="200">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.val" size="mini" placeholder="Value">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column label="Description" header-align="center" minWidth="80">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.desc" size="mini" placeholder="Description">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column property="value" label="操作" header-align="center" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                    @click.native="delTableRow('params',scope.$index)">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="权限校验" name="fourth">
            <el-row>
                <span>Authorization Type</span>
                <el-select size="small" v-model="selectedAuthType">
                    <el-option v-for="(item,index) in authorizationList" :key="index" :value="item.id" :label="item.value">
                    </el-option>
                </el-select>
            </el-row>
        </el-tab-pane>
    </el-tabs>
    <div class="append">
         <slot name="append"></slot>
    </div>

    <v-contextmenu ref="contextmenu">
        <v-contextmenu-item @click="handleClick">clear</v-contextmenu-item>
    </v-contextmenu>
</div>
</template>

<script>
import Request from '@/libs/request.js'
export default {
    components: {
        editor: require('vue2-ace-editor'),
    },
    name: 'testTabs',
    props:{
        header: {
            type: String,
            default: '[]'
        },
        body: {
            type: String,
            default: '[]'
        },
        param: {
            type: String,
            default: '[]'
        },
        bodyFormat: {
            type: Number,
            default: 0
        },
        authType: {
            type: Number,
        }
    },
    data() {
        return {
            bodyShow: 'second',
            paramTypes: ['string', 'file'],
            cell: Object(),
            //上传文件时，记录数组下当前数据的下标，用于把返回文件路径地址赋值
            temp_num: '',
            methods: ['POST', 'GET', 'PUT', 'DELETE'],
            fileName: '',
            fileList: [],

            headers: [],
            bodys: [],
            jsonVariable: '',
            bodyType: String(this.bodyFormat),
            params: [],
            selectedAuthType: '', // Authorization
            authorizationList: [{
                    id: 1,
                    value: 'inherit auth from parent'
                },
                {
                    id: 2,
                    value: 'No Auth'
                },
                {
                    id: 3,
                    value: 'Bearer Token'
                },
                {
                    id: 4,
                    value: 'Basic Auth'
                },
                {
                    id: 5,
                    value: 'Digest Auth'
                },
                {
                    id: 6,
                    value: 'OAuth 1.0'
                },
                {
                    id: 7,
                    value: 'OAuth 2.0'
                },
                {
                    id: 8,
                    value: 'Hawk Authentication'
                },
                {
                    id: 9,
                    value: 'AWS Signature'
                },
                {
                    id: 10,
                    value: 'NTLM Authentication[Beta]'
                },
            ],

        }
    },
    methods: {
        editorInit() {
            require('brace/ext/language_tools');
            require('brace/mode/json');
            require('brace/theme/chrome');
            require('brace/snippets/json')
        },
        formatData() {
            // 格式化json字符串
            try {
                this.jsonVariable = JSON.parse(this.jsonVariable);
                this.jsonVariable = JSON.stringify(this.jsonVariable, null, 4);
            } catch (err) {
                this.$message({
                    showClose: true,
                    message: 'json格式错误',
                    type: 'warning',
                });
            }
        },
        handleClick() {
                this.jsonVariable = ''
        },
        beforeUpload(file) {
            console.log(file)
            var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
            const extension2 = testmsg === 'xlsx'
            if(!extension2) {
                this.$message({
                    message: '上传文件只能是xlsx格式!',
                    type: 'warning'
                });
            }
            return extension2
        },
        fileChange(response, file) {
            if (response['status'] === 0) {
                this.$confirm('服务器已存在相同名字文件，是否覆盖?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log('本地存储')
                    let form = new FormData();
                    form.append("file", file.raw);
                    form.append("skip", '1');
                    this.$axios.post('/interfaceNewController/uploadInterfaceBody', form).then((response) => {
                            this.$message({
                                showClose: true,
                                message: response.data['msg'],
                                type: 'success',
                            });
                            this.bodys[this.temp_num]['value'] = response.data['data'];
                        }
                    );
                }).catch(() => {

                });
            } else {
                if (response['msg']) {
                    this.$message({
                        showClose: true,
                        message: response['msg'],
                        type: 'success',
                    });
                }
                this.bodys[this.temp_num]['value'] = response['data'];
            }

        },
        handleRemove(file, fileList) {
            // console.log('file:',file,fileList)
            this.fileName = "删除" + file.name;
            this.fileList.splice(0, 1)
        },
        handlePreview(file) {
            // console.log('file:' + file);
            this.fileName = "点击" + file.name;
        },
        handleExceed(file, fileList) {
            this.$message.warning(`只允许上传1个文件`);
        },
        handleOnChange(file) {
            this.$message.success(`选择文件成功`);
            this.fileName = file.name;
            this.fileList.push(file)
        },
        importTemplate() {
            console.log("importTemplate");
            let formData = new FormData();

            formData.append("file", this.fileList[0].raw);
            Request({
                url: "/interfaceNewController/uploadInterfaceBody",
                method: "POST",
                params: formData
            })
            .then((res) => {
                console.log('倒入成功')
                this.$message.success(res.respMsg);
            })
            .catch((res) => {
                this.$message.error("上传失败");
            });
        },
        tempNum(i) {
            this.temp_num = i;
        },
        resetLine() {
            //  重置单元格高度
            this.cell.style.height = '18px';
        },
        showLine(prefix, n) {
            //  获取单元格的滚动条高度，并使单元格为该高度
            this.cell = document.getElementById(prefix + n);
            this.cell.style.height = this.cell.scrollHeight + 'px';
        },
        changeLine() {
            //  当单元格高度和滚动条高度不一致时，改变单元格高度
            if (this.cell.style.height !== this.cell.scrollHeight + 'px') {
                let i = parseInt(this.cell.style.height.substring(0, this.cell.style.height.length - 2));
                if (i - this.cell.scrollHeight === 2) {
                    //  为true时，为减少高度操作
                    this.cell.style.height = (i - 18) + 'px'
                } else {
                    this.cell.style.height = this.cell.scrollHeight + 'px';
                }

            }
        },
        delTableRow(type, i) {
            console.log(type, i, 'delete')
            if (type === 'bodys') {
                this.bodys.splice(i, 1);
            } else if (type === 'headers') {
                this.headers.splice(i, 1);
            } else if (type === 'params') {
                this.params.splice(i, 1);
            }
        },
        addTableRow(type) {
            if (type === 'bodys') {
                this.bodys.push({name: null, val: null, type: 'string', desc: null});
            } else if (type === 'headers') {
                this.headers.push({name: null, val: null, desc: null});
            } else if (type === 'params') {
                this.params.push({name: null, val: null, desc: null});
            }
        },
        initApiMsgData() {
                console.log("测试")
                this.bodyType = '0'
                this.headers = Array();
                this.bodys = Array();
                this.jsonVariable = '';
                this.params = Array();
                this.selectedAuthType = 1
            },
        handlerParams() {
						this.bodys = []
						this.headers = []
						this.params = []
            if (this.bodyFormat === 1) {
                this.bodys.push({
                    name: '',
                    val: '',
                    desc: ''
                })
                this.jsonVariable = this.body
            } else {
                this.bodys.push(...JSON.parse(this.body))
            }
            if (this.header === '[]' || this.header === null) {
                this.headers.push({
                    name: '',
                    val: '',
                    desc: ''
                })
            } else {
                this.headers.push(...JSON.parse(this.header))
            }
            if (this.param === '[]' || this.param === null) {
                this.params.push({
                    name: '',
                    val: '',
                    desc: ''
                })
            } else {
                this.params.push(...JSON.parse(this.param))
            }
        },
        downloadTemplate() {
            window.location.href = "http://140.143.16.21:9090/atfcloud2.0a/interfaceNewController/downloadTemplate"
        }
    },
    created() {
        if(this.authType === 0) {
            this.initApiMsgData()
        }else {
            this.handlerParams()
        }

    },
    computed: {
        monitorVariable() {
            return this.bodys;
        },
        monitorHeader() {
            return this.headers;
        },
        monitorExtract() {
            return this.params;
        },
        uploadUrl() {
            return 'http://140.143.16.21:9090/atfcloud2.0a/interfaceNewController/uploadInterfaceBody'
        }

    }
    ,
    watch: {
        monitorVariable: {
            handler: function () {
                console.log('bodys change')
                if (this.bodys.length === 0) {
                    this.addTableRow('bodys')
                }
                if (this.bodys[this.bodys.length - 1]['name'] || this.bodys[this.bodys.length - 1]['val']) {
                    this.addTableRow('bodys')
                }
            },
            deep: true
        },
        monitorExtract: {
            handler: function () {
                if (this.params.length === 0) {
                    this.addTableRow('params')
                }
                if (this.params[this.params.length - 1]['name'] || this.params[this.params.length - 1]['val']) {
                    this.addTableRow('params')
                }
            },
            deep: true
        },
        monitorHeader: {
            handler: function () {
                if (this.headers.length === 0) {
                    this.addTableRow('headers')
                }
                if (this.headers[this.headers.length - 1]['name'] || this.headers[this.headers.length - 1]['val']) {
                    this.addTableRow('headers')
                }
            },
            deep: true
        },
        header: {
            handler(newVal) {
                let arr = JSON.parse(newVal)
                if(arr) {
                    this.headers = JSON.parse(newVal).filter(item => {
                        return item.name !== null || item.val !== null || item.desc !== null
                    })
                }
            },
            immediate: true
        },
        body: {
            handler(newVal) {
                let arr = JSON.parse(newVal)
                if(arr) {
                    this.bodys = JSON.parse(newVal)
                }
            },
            immediate: true
        },
        param: {
            handler(newVal) {
                let arr = JSON.parse(newVal)
                if(arr) {
                    this.params = JSON.parse(newVal)
                }
            },
            immediate: true
        },
        authType: {
            handler(newVal) {
                this.selectedAuthType = newVal
            },
            immediate: true
        }
    },

}
</script>

<style lang="less" scoped>
.tabs-body {
    position: relative;
    /deep/ .el-tabs--border-card {
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    .append {
        position: absolute;
        right: 10px;
        top: 10px;
    }
}
</style>

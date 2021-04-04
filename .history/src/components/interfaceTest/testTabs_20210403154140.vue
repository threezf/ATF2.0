<template>
<div>
    <el-tabs v-model="bodyShow" type="border-card">
        <el-tab-pane label="请求头部" name="first">
            <el-table :data="header"
                        size="mini"
                        stripe :show-header="true"
                        border
                        class="h-b-e-a-style"
                        :row-style="{'background-color': 'rgb(250, 250, 250)'}">
                <el-table-column property="key" label="Key" header-align="center" minWidth="100">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.key" size="mini" placeholder="key">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column property="value" label="Value" header-align="center" minWidth="200">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.value" size="mini" placeholder="value">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column label="Description" header-align="center" minWidth="80">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.remark" size="mini" placeholder="备注">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column property="value" label="操作" header-align="center" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                    @click.native="delTableRow('header',scope.$index)">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="请求体" name="second" >
            <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px">
                <el-radio-group v-model="form.choiceType">
                    <el-radio label="data">form-data</el-radio>
                    <el-radio label="json">raw</el-radio>
                </el-radio-group>
                <el-button type="primary" size="mini"
                            v-show="form.choiceType === 'json'"
                            style="margin-left:20px"
                            @click="formatData()">格式化

                </el-button>
            </el-form>
            <hr style="height:1px;border:none;border-top:1px solid rgb(241, 215, 215);"/>

            <div v-if="form.choiceType === 'json'">
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
                                :options="{}"
                        >
                        </editor>
                    </el-container>
                </div>
            </div>


            <el-table :data="body"
                        size="mini"
                        stripe :show-header="true"
                        border
                        style="background-color: rgb(250, 250, 250)"
                        v-if="form.choiceType === 'data'"
                        :row-style="{'background-color': 'rgb(250, 250, 250)'}">
                <el-table-column label="KEY" header-align="center" minWidth="100">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.key" size="mini">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column label="TYPE" header-align="center" width="100">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.param_type" size="mini">
                            <el-option v-for="item in paramTypes" :key="item" :value="item">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="VALUE" header-align="center" minWidth="200">
                    <template slot-scope="scope">
                        <div v-if="scope.row.param_type === 'file'">
                            <el-row>
                                <el-col :span="18">
                                    <el-input v-model="scope.row.value" size="mini" :disabled="true">
                                    </el-input>
                                </el-col>
                                <el-col :span="5" style="padding-left:10px;">
                                    <el-upload
                                            class="upload-demo"
                                            action="/api/upload"
                                            :show-file-list='false'
                                            :on-success="fileChange">
                                        <el-button size="mini" type="primary"
                                                    @click="tempNum(scope.$index)">点击上传
                                        </el-button>
                                    </el-upload>
                                </el-col>
                            </el-row>
                        </div>
                        <div v-else>
                            <el-input v-model="scope.row.value"
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
                        <el-input v-model="scope.row.remark" size="mini">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column property="value" label="操作" header-align="center" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                    @click.native="delTableRow('body',scope.$index)">
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
                        <el-input v-model="scope.row.key" size="mini" placeholder="Key">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column property="value" label="Value" header-align="center" minWidth="200">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.value" size="mini" placeholder="Value">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column label="Description" header-align="center" minWidth="80">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.remark" size="mini" placeholder="Description">
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
                <el-select size="small" v-model="authType">
                    <el-option v-for="(item,index) in authorizationList" :key="index" :value="item.id" :label="item.value">
                    </el-option>
                </el-select>
            </el-row>
        </el-tab-pane>
    </el-tabs>

    <v-contextmenu ref="contextmenu">
        <v-contextmenu-item @click="handleClick">clear</v-contextmenu-item>
    </v-contextmenu>
</div>
</template>

<script>

export default {
    components: {
        editor: require('vue2-ace-editor'),
    },
    name: 'testTabs',
    props: ['header','body','jsonVariable','params','authType'],
    data() {
        return {
            bodyShow: 'second',
            paramTypes: ['string', 'file'],
            cell: Object(),
            //上传文件时，记录数组下当前数据的下标，用于把返回文件路径地址赋值
            temp_num: '',
            methods: ['POST', 'GET', 'PUT', 'DELETE'],
            form: {
                // projectId: null,
                // configName: null,
                // moduleId: null,
                // choiceUrl: '基础url1',
                choiceType: 'data',
            },
            // apiMsgData: {
            //     header: Array(),
            //     body: Array(),
            //     jsonVariable: '',
            //     params: Array(),
            //     authType: 1, // Authorization
            // },
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
        fileChange(response, file) {
            if (response['status'] === 0) {
                this.$confirm('服务器已存在相同名字文件，是否覆盖?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let form = new FormData();
                    form.append("file", file.raw);
                    form.append("skip", '1');
                    this.$axios.post('/api/upload', form).then((response) => {
                            this.$message({
                                showClose: true,
                                message: response.data['msg'],
                                type: 'success',
                            });
                            this.body[this.temp_num]['value'] = response.data['data'];
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
                this.body[this.temp_num]['value'] = response['data'];
            }

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
            if (type === 'body') {
                this.body.splice(i, 1);
            } else if (type === 'header') {
                this.header.splice(i, 1);
            } 
        },
        addTableRow(type) {
            if (type === 'body') {
                this.body.push({key: null, value: null, param_type: 'string', remark: null});
            } else if (type === 'header') {
                this.header.push({key: null, value: null});
            } else if (type === 'params') {
                this.params.push({key: null, value: null, remark: null});
            }
        },
        initApiMsgData() {
                console.log("测试")
                this.form.choiceType = 'data';

                this.header = Array();
                this.body = Array();
                this.jsonVariable = '';
                this.params = Array();
            },
    },
    created() {

            this.initApiMsgData()

        
    },
    computed: {
        monitorVariable() {
            return this.body;
        }
        ,
        monitorHeader() {
            return this.header;
        },
        monitorExtract() {
            return this.params;
        },

    }
    ,
    watch: {
        monitorMethod(newValue) {
            if (newValue === 'GET') {
                this.bodyShow = 'first'
            }
        },
        monitorVariable: {
            handler: function () {
                if (this.body.length === 0) {
                    this.addTableRow('body')
                }
                if (this.body[this.body.length - 1]['key'] || this.body[this.body.length - 1]['value']) {
                    this.addTableRow('body')
                }
            },
            deep: true
        },
        monitorExtract: {
            handler: function () {
                if (this.params.length === 0) {
                    this.addTableRow('params')
                }
                if (this.params[this.params.length - 1]['key'] || this.params[this.params.length - 1]['value']) {
                    this.addTableRow('params')
                }
            },
            deep: true
        },
        monitorHeader: {
            handler: function () {
                if (this.header.length === 0) {
                    this.addTableRow('header')
                }
                if (this.header[this.header.length - 1]['key'] || this.header[this.header.length - 1]['value']) {
                    this.addTableRow('header')
                }
            },
            deep: true
        },

    },

}
</script>
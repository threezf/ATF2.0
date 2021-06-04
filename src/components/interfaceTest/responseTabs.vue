<template>
<div>
    <el-tabs v-model="bodyShow" type="border-card">
        <el-tab-pane label="返回头部" name="first">
            <el-table :data="respheaders"
                        size="mini"
                        stripe :show-header="true"
                        border
                        class="h-b-e-a-style"
                        :row-style="{'background-color': 'rgb(250, 250, 250)'}">
                <el-table-column property="key" label="Key" header-align="center" minWidth="120">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.name" size="mini" placeholder="key">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column label="Description" header-align="center" minWidth="180">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.desc" size="mini" placeholder="备注">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column property="value" label="操作" header-align="center" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button type="success" icon="el-icon-plus" size="mini"
                                    @click.native="addTableRow('respheaders',scope.$index)">
                        </el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                    @click.native="delTableRow('respheaders',scope.$index)">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="返回结果" name="second" >
            <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px">
                <el-radio-group v-model="respType">
                    <el-radio label="0">form-data</el-radio>
                    <el-radio label="1">raw</el-radio>
                </el-radio-group>
                <el-button type="primary" size="mini"
                            v-show="respType === '1'"
                            style="margin-left:20px"
                            @click="formatData()">格式化

                </el-button>
            </el-form>
            <hr style="height:1px;border:none;border-top:1px solid rgb(241, 215, 215);"/>

            <div v-if="respType === '1'">
                <div style="border:1px solid rgb(234, 234, 234) ">
                    <el-container>
                        <editor
                                v-contextmenu:contextmenu
                                style="font-size: 15px"
                                v-model="respJsonVariable"
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


            <el-table :data="results"
                        size="mini"
                        stripe :show-header="true"
                        border
                        style="background-color: rgb(250, 250, 250)"
                        v-if="respType === '0'"
                        :row-style="{'background-color': 'rgb(250, 250, 250)'}">
                <el-table-column label="KEY" header-align="center" minWidth="120">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.name" size="mini">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column label="TYPE" header-align="center" width="120">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.type" size="mini">
                            <el-option v-for="item in paramTypes" :key="item" :value="item">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="DESCRIPTION" header-align="center" minWidth="180">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.desc" size="mini">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column property="value" label="操作" header-align="center" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button type="success" icon="el-icon-plus" size="mini"
                                    @click.native="addTableRow('results',scope.$index)">
                        </el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                    @click.native="delTableRow('results',scope.$index)">
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
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
    props:{
            headerResopnse: {
                type: String,
                default: '[]'
            },
            bodyResopnse: {
                type: String,
                default: '[]'
            },
            bodyResopnseType: {
                type: Number,
                default: 0
            },
            authType: {
                type: Number,
            },
        },
    data() {
        return {
            bodyShow: 'second',
            paramTypes: ['string', 'file'],
            cell: Object(),
            //上传文件时，记录数组下当前数据的下标，用于把返回文件路径地址赋值
            temp_num: '',
            methods: ['POST', 'GET', 'PUT', 'DELETE'],

            respheaders: [],
            results: [],
            respType: String(this.bodyResopnseType),
            respJsonVariable: '',

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
                this.respJsonVariable = JSON.parse(this.respJsonVariable);
                this.respJsonVariable = JSON.stringify(this.respJsonVariable, null, 4);
            } catch (err) {
                this.$message({
                    showClose: true,
                    message: 'json格式错误',
                    type: 'warning',
                });
            }
        },
        handleClick() {
                this.respJsonVariable = ''
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
            if (type === 'results') {
                this.results.splice(i, 1);
            } else if (type === 'respheaders') {
                this.respheaders.splice(i, 1);
            }
        },
        addTableRow(type) {
            if (type === 'results') {
                this.results.push({name: null, type: 'string', desc: null});
            } else if (type === 'respheaders') {
                this.respheaders.push({name: null, desc: null});
            }
        },
        initApiMsgData() {
                console.log("测试")
                this.respType = '0';
                this.respheaders = [];
                this.results = [];
                this.respJsonVariable = '';
								this.results.push({
									name: '',
									val: '',
									desc: ''
								})
								this.respheaders.push({
									name: '',
									desc: ''
								})
            },
				handlerParams() {
            if (this.bodyResopnseType === 1) {
                this.results.push({
                    name: '',
                    val: '',
                    desc: ''
                })
                this.respJsonVariable = this.bodyResopnse
            } else {
                this.results.push(...JSON.parse(this.bodyResopnse))
            }
							if (this.headerResopnse === '[]' || this.headerResopnse === null) {
								this.respheaders.push({
									name: '',
									desc: ''
								})
							} else {
								this.respheaders.push(...JSON.parse(this.headerResopnse))
							}
        }
    },
    created() {
        if(this.authType === 0 || this.authType == null) {
            this.initApiMsgData()
        }else {
            this.handlerParams()
        }

    },
    computed: {
        monitorVariable() {
            return this.results;
        },
        monitorHeader() {
            return this.respheaders;
        },

    }
}
</script>

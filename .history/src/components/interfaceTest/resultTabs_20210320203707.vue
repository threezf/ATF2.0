<template>
<div>
    <el-tabs style="margin: 0 0 0 10px" v-model="bodyShow" type="border-card">
        <el-tab-pane label="返回结果" name="second" >
            <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px">
                <el-button type="primary" size="mini"
                            style="margin-left:20px"
                            @click="formatData()">整理格式
                </el-button>
                <el-button type="primary" size="mini"
                            style="margin-left:20px"
                            @click="formatData()">还原格式
                </el-button>
                <el-button type="primary" size="mini"
                            style="margin-left:20px"
                            @click="formatData()">复制
                </el-button>
            </el-form>
            <hr style="height:1px;border:none;border-top:1px solid rgb(241, 215, 215);"/>

                <div style="border:1px solid rgb(234, 234, 234) ">
                    <el-container>
                        <editor
                                v-contextmenu:contextmenu
                                style="font-size: 15px"
                                v-model="apiMsgData.jsonVariable"
                                @init="editorInit"
                                lang="json"
                                theme="chrome"
                                width="100%"
                                height="515px"
                                :options="{}"
                        >
                        </editor>
                    </el-container>
                </div>
        </el-tab-pane>
        <el-tab-pane label="返回头部" name="third">
            <div class="result-header">
                <ul style="list-style-type: none;">
                    <li v-for="item in apiMsgData.resultHeaders" :key="item.id">
                        <span>{{item.key}}:</span>
                        <span>{{item.val}}</span>
                    </li>
                </ul>
            </div>
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
    props: [],
    data() {
        return {
            bodyShow: 'second',
            apiMsgData: {
                id: null,
                resultHeaders: [
                    {
                        id: 1,
                        key:"cache-control",
                        val:"no-store, no-cache, must-revalidate"
                    },
                    {
                        id: 2,
                        key:"connection",
                        val:"keep-alive"
                    },
                    {
                        id: 3,
                        key:"content-type",
                        val:"text/html; charset=UTF-8"
                    },
                ],
                jsonVariable: '{"status":"success","user_info":{"token":"129n8yexqy3om8ryec"}}',
            },

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
                this.apiMsgData.jsonVariable = JSON.parse(this.apiMsgData.jsonVariable);
                this.apiMsgData.jsonVariable = JSON.stringify(this.apiMsgData.jsonVariable, null, 4);
            } catch (err) {
                this.$message({
                    showClose: true,
                    message: 'json格式错误',
                    type: 'warning',
                });
            }
        },
        handleClick() {
                this.apiMsgData.jsonVariable = ''
            },
        initApiMsgData() {
                console.log("测试")

                this.apiMsgData.resultHeaders = Array();
                this.apiMsgData.jsonVariable = '';
                this.apiMsgData.id = null;
            },
    },

}
</script>
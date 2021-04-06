<template>
    <div class="project">
        <el-tabs type="border-card" class="tabs-card">
            <el-tab-pane label="接口详情"></el-tab-pane>
                <el-row>
                  <el-col :span="2">
                    <el-tag size="middle"  :type="interfaceData.protocol | getType1">
                        {{interfaceData.protocol | getProtocol}}
                    </el-tag>
                  </el-col>
                  <el-col :span="2">
                    <el-tag size="middle"  :type="interfaceData.method | getType2">
                        {{interfaceData.method | getMethod}}
                    </el-tag>
                  </el-col>
                  <el-col :span="14">
                    <el-tag size="middle"  :type="interfaceData.status | getType3">
                        {{interfaceData.status | getStatus}}
                    </el-tag>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="primary" size="small">
                        <i class="el-icon-edit-outline"></i>编辑
                    </el-button>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="success"  size="small">
                        <i class="el-icon-copy-document"></i>复制
                    </el-button>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="danger"  size="small">
                        <i class="el-icon-delete"></i>删除
                    </el-button>
                  </el-col>
                </el-row>
                <el-row class="url-style">
                  <el-col :span="12">{{interfaceData.urlPath}}</el-col>
                </el-row>
                <el-row class="name-style">
                  <el-col :span="12">{{interfaceData.interfaceName}}</el-col>
                </el-row>
                <el-row class="remark-style">
                  <el-col :span="4">分组：{{interfaceData.interfaceGroupId}}</el-col>
                  <el-col :span="4">创建者：{{interfaceData.createUser}}</el-col>
                  <el-col :span="4">更新时间：{{updateTime}}</el-col>
                </el-row>
                <el-divider class="divider-style"></el-divider>
                <div v-if="true">
                  <el-row class="divider-row">
                      <el-divider class="divider-vertical" direction="vertical"></el-divider>
                      <span class="divider-span">请求头部</span>
                  </el-row>
                  <el-table
                      ref="singleTable"
                      highlight-current-row
                      height="200px"
                      border
                      @current-change="handleCurrentChange"
                      style="width: 100%">
                      <el-table-column
                        property="name"
                        label="参数名"
                        header-align="center">
                      </el-table-column>
                      <el-table-column
                        property="val"
                        label="参数值"
                        header-align="center">
                      </el-table-column>
                      <el-table-column
                        property="desc"
                        label="描述"
                        header-align="center">
                      </el-table-column>
                  </el-table>
                </div>
                <el-row class="divider-row">
                    <el-divider class="divider-vertical" direction="vertical"></el-divider>
                    <span class="divider-span">Body请求参数</span>
                    <el-tag class="tag-style" type="info" size="small">Raw</el-tag>
                    <el-tag class="tag-style" type="info" size="small">From-data</el-tag>
                </el-row>

                <div v-if="true" class="body-content">
                    <el-row>
                      <span class="span-content">内容类型</span>
                      <el-select size="small" style="width:100px" v-model="contentType" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.type"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <el-button type="primary" size="mini"
                          v-show="true"
                          style="margin-left:20px"
                          @click="formatData()">整理格式
                      </el-button>
                    </el-row>
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
                                    height="100px"
                                    :options="{showPrintMargin:false,   //去除编辑器里的竖线
                                    }"
                            >
                            </editor>
                        </el-container>
                    </div>
                    <el-table
                      highlight-current-row
                      height="200px"
                      border
                      @current-change="handleCurrentChange"
                      style="width: 100%">
                      <el-table-column
                        property="name"
                        label="参数名"
                        header-align="center">
                      </el-table-column>
                      <el-table-column
                        property="type"
                        label="参数类型"
                        header-align="center">
                      </el-table-column>
                      <el-table-column
                        property="val"
                        label="参数值"
                        header-align="center">
                      </el-table-column>
                      <el-table-column
                        property="desc"
                        label="描述"
                        header-align="center">
                      </el-table-column>
                  </el-table>
                </div>
              
            <el-tab-pane label="接口测试"></el-tab-pane>
            <el-tab-pane label="测试用例"></el-tab-pane>
            <el-tab-pane label="Mock API"></el-tab-pane>
        </el-tabs>
            <v-contextmenu ref="contextmenu">
                <v-contextmenu-item @click="handleClick">clear</v-contextmenu-item>
            </v-contextmenu>
    </div>
</template>

<script>
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
import {
    TimeUtils,
    SessionStorage
} from 'wii-fe-utils'
let that;
export default {
    mixins: [VueMixins], // 时间格式转化
    name: 'InterfaceDetail',
    components: {
        editor: require('vue2-ace-editor'),
    },
    data() {
        return {
            interfaceData: {},
            updateTime:'',
            jsonVariable: '',
            currentRow: '',
            protocols: [{
                value: 0,
                protocol: 'HTTP'
            }, {
                value: 1,
                protocol: 'HTTPS'
            }],
            methodOptions: [{
                    value: 0,
                    method: 'POST'
                }, {
                    value: 1,
                    method: 'GET'
                }, {
                    value: 2,
                    method: 'DELETE'
                }, {
                    value: 3,
                    method: 'PUT'
                }],
            statusOptions: [{
                value: 0,
                status: '开发中'
            }, {
                value: 1,
                status: '已完成'
            }, {
                value: 2,
                status: '已废弃'
            }],
            options: [{
              value: 0,
              type: 'JSON'
            }, {
              value: 1,
              type: 'XML'
            }, {
              value: 2,
              type: 'TEXT'
            }, {
              value: 3,
              type: 'HTML'
            }],
            contentType: 0,
            edtiorOptions: {"0":"JSON","1":"XML",}
        }
    },
    created() {
        let data
        if (this.$route.query.interfaceData) {
            data = this.$route.query.interfaceData
            this.interfaceData = data
            this.updateTime = TimeUtils.timestampToTime(data.updateTime, 'yyyy-MM-dd hh:mm:ss')
        }
        


    },
    beforeCreate: function () {
        that = this;
    },
    filters: {
        getProtocol(val) {
            for ( let item in that.protocols){
              let option = that.protocols[item]
              if(option.value == val){
                return option.protocol
              }
            }
        },
        getMethod(val) {
            for ( let item in that.methodOptions){
              let option = that.methodOptions[item]
              if(option.value == val){
                return option.method
              }
            }
        },
        getStatus(val) {
            for ( let item in that.statusOptions){
              let option = that.statusOptions[item]
              if(option.value == val){
                return option.status
              }
            }
        },
        getType2(val) {
          return val === 0 ? 'success' : val === 1 ? 'info' :  val === 2 ? 'danger' : 'warning' 
        },
        getType1(val) {
          return val === 0 ? 'warning' : 'success' 
        },
        getType3(val) {
          return val === 0 ? 'primary' : val === 1 ? 'warning' :  val === 2 ? 'danger' : 'success' 
        },
    },
    methods: {
        editorInit() {
            require('brace/ext/language_tools');
            require('brace/mode/json');
            require('brace/theme/chrome');
            require('brace/snippets/json')
        },
        handleClick() {
            this.jsonVariable = ''
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
        handleCurrentChange(val) {
          this.currentRow = val;
        },
    }
}
</script>
<style scoped>
.project {
    padding: 10px;
    min-height: calc(100vh - 90px);
    overflow: auto;
    
}
.tabs-card {
    min-height: calc(100vh - 90px);
}
.url-style{
    font-size: 18px;
    margin: 10px 0;
}
.name-style {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}
.remark-style {
    font-size: 13px;
}
.divider-style {
    margin-top:5px;
    height: 2px;
}
.divider-row {
    background-color:#eef0f0;
    width:100%;
    margin-bottom: 10px;
    margin-top: 20px;
    padding: 0 !important;
    font-size: 18px;
    font-weight: bold;
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
}
.divider-vertical {
    width: 3px;
    margin: 0 10px 0 0;
    background-color: #409EFF;
    height: 40px;
}
.tag-style {
  background-color: black;
  color: white;
  margin-left: 5px;
}
.body-content {
  border: 1px solid #E7E7E7;
}
.span-content {
  margin: 0 10px;
  font-size: 15px;
}
</style>
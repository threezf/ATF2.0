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
            <el-tab-pane label="接口测试"></el-tab-pane>
            <el-tab-pane label="测试用例"></el-tab-pane>
            <el-tab-pane label="Mock API"></el-tab-pane>
        </el-tabs>
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
    data() {
        return {
            interfaceData: {},
            updateTime:'',
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
}
</script>
<style scoped>
.project {
    padding: 10px;
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
    margin-top:5px
}
</style>
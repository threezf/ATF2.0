<template>
    <div class="project">
        <el-tabs type="border-card" class="tabs-card">
            <el-tab-pane label="接口详情"></el-tab-pane>
                <el-row>
                  <el-col :span="2">
                    <el-tag size="middle"  :type="interfaceData.protocol | getType">
                        {{interfaceData.protocol | getProtocol}}
                    </el-tag>
                  </el-col>
                  <el-col :span="2">
                    <el-tag size="middle"  :type="interfaceData.method | getType">
                        {{interfaceData.method | getMethod}}
                    </el-tag>
                  </el-col>
                  <el-col :span="8">
                    <el-tag size="middle"  :type="interfaceData.status | getType">
                        {{interfaceData.status | getStatus}}
                    </el-tag>
                  </el-col>
                </el-row>
            <el-tab-pane label="接口测试"></el-tab-pane>
            <el-tab-pane label="测试用例"></el-tab-pane>
            <el-tab-pane label="Mock API"></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
let that;
export default {
    mixins: [VueMixins], // 时间格式转化
    name: 'InterfaceDetail',
    data() {
        return {
            interfaceData: {},
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
        this.interfaceData = this.$route.query.interfaceData
        console.log(interfaceData)

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
        getType(val) {
          return val === 0 ? 'success' : val === 1 ? 'primary' :  val === 2 ? 'danger' : 'warning' 
        }
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
</style>
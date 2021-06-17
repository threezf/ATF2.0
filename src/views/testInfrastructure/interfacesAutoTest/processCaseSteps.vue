<template>
    <div class="project">
      <el-select size="mini" v-model="selectedEviorment" class="selector" @change="handleEnviormentChange">
        <el-option v-for="(option, index) in interfaceEvironmentList" :key="index" :value="option.id" :label="option.environmentName">
        </el-option>
      </el-select>
      <el-tabs type="border-card" class="tabs-card" v-model="activeTab">
          <el-tab-pane v-for="(tab, index) in interfaceTabs" :key="'tab' + index" :label="tab.label" :name="tab.name">
            <TestProcess v-if="activeTab === 'testProcess' && tab.name === 'testProcess'">

            </TestProcess>
            <TestData v-if="activeTab === 'testData' && tab.name === 'testData'">
            </TestData>
          </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
import TestTabs from '@/components/interfaceTest/testTabs'
import ResponseTabs from '@/components/interfaceTest/responseTabs'
import TestProcess from './testProcess'
import TestData from './testData'
import {TimeUtils} from 'wii-fe-utils'
import { mapState } from 'vuex';
let that;
export default {
    mixins: [VueMixins], // 时间格式转化
    name: 'InterfaceDetail',
    components: {
        editor: require('vue2-ace-editor'),
        TestTabs: TestTabs,
        ResponseTabs: ResponseTabs,
				TestProcess,
				TestData
    },
    data() {
        return {
            interfaceData: {},
            selectedEviorment: '0',
            copyInterfaceData: {},
            updateTime:'',
            currentRow: '',
            activeTab: 'testProcess',
            interfaceTabs: [{
              label: '测试流程',
              name: 'testProcess'
            }, {
              label: '测试数据',
              name: 'testData'
            }],
            enviromentPre: '',
					  caseData:{}

            // 接口测试数据
        }
    },
    created() {
    	if (this.$route.query.data){
				this.caseData = this.$route.query.data
			}

      if(this.interfaceEvironmentList && this.interfaceEvironmentList.length > 0) {
        console.log('ceshi', this.interfaceEvironmentList)
        this.selectedEviorment = this.interfaceEvironmentList[1].id
        this.enviromentPre = this.interfaceEvironmentList[1] ? this.interfaceEvironmentList[1].host: ''
      }
    },
    computed: {
      interfaceEvironmentList() {
        const arr = JSON.parse(localStorage.getItem('environmentList'))
        arr.unshift({
          id: 'manage',
          environmentName: '管理项目环境'
        })
        return arr;
      }
    },
    methods: {
        handleEnviormentChange(val) {
          const item = this.interfaceEvironmentList.find(item => item.id == val)
          console.log('更改环境', val, this.interfaceEvironmentList, item)
          this.enviromentPre = item ? item.host: ''
          if(val === 'manage') {
            this.$router.push({
              name: 'ProjectEnvironment'
            })
          }
        },
    }
}
</script>
<style lang="less" scoped>
.project {
  padding: 10px;
  position: relative;
  .selector {
    position: absolute;
    z-index: 10;
    right: 15px;
    top: 15px;
  }
}
.tabs-card {
    min-height: calc(100vh - 90px);
}
.method-tag {
  margin: 0 20px;
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
.buttons_row {
    text-align: center;
    margin-bottom: -15px;
    margin-top: 20px;
}
.change-label-calss /deep/ .el-form-item__label{
    padding: 0;
    margin-bottom: 0;
    line-height: 30px;
    font-weight: bold;
}
.input-new-tag {
    width: 99%;
}
.select-status {
    width: 99%;
}
.divider-dialog {
    width: 3px;
    margin: 0;
    background-color: #409EFF;
    height: 30px;
}
.divider-span {
    font-size: 15px;
    margin-left: 10px;
}
</style>

<template>
  <div class="page-outer">
    <div class="page-inner">
        <el-button
            size="small" 
            @click='addSearchCondition'
            type="primary" 
            icon="el-icon-plus">
            添加筛选条件
        </el-button>
      <div class='searchRow' v-for='(condition,index) in conditionList' :key="index">
         <el-select v-model="condition.propertyName" placeholder="请选择筛选项目">
            <el-option
                v-for="item in propertyNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
         <el-select v-model="condition.compareType" placeholder="筛选操作">
            <el-option
                v-for="item in compareTypeOptions[condition.propertyName]"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <el-input v-if='valueType(condition)' v-model="condition.propertyValueList" placeholder="比较值"></el-input>        
         <el-select v-else v-model="condition.propertyValueList" placeholder="比较值">
            <el-option
                v-for="item in compareTypeOptions[condition.propertyName].filter(v=>(v.value==condition.compareType))[0].itemList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <el-button
            size="small" 
            @click='deleteSearchCondition(index)'
            type="primary" 
            icon="el-icon-delete">
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Request from '@/libs/request.js'
import VueMixins from '@/libs/vueMixins.js'
export default {
  components: {},
  mixins: [VueMixins],
  data() {
    return {
        propertyNameOptions:[
                {
                value:"caseCompositeType",
                label:"用例组成类型"
            },
                {
                value:"casecode",
                label:"用例编号"
            },
                {
                value:"missionId",
                label:"测试任务"
            },
                {
                value:"autId",
                label:"被测系统"
            },
                {
                value:"testDesign",
                label:"测试意图"
            },
                {
                value:"preRequisites",
                label:"前置条件"
            },
                {
                value:"dataRequest",
                label:"数据需求"
            },
                {
                value:"testStep",
                label:"测试步骤"
            },
                {
                value:"expectResult",
                label:"预期结果"
            },
                {
                value:"checkPoint",
                label:"附加检查点"
            },
                {
                value:"caseProperty",
                label:"用例性质"
            },
                {
                value:"caseType",
                label:"测试用例类型"
            },
                {
                value:"priority",
                label:"优先级"
            },
                {
                value:"author",
                label:"作者"
            },
                {
                value:"reviewer",
                label:"评审者"
            },
            {
            value:"scriptModeFlag",
            label:"所属模板"
            },
        ],
        compareTypeOptions:{
           caseCompositeType:[
                {
                    value:"=",
                    label:"等于",
                    itemType: true , // false/输入框; true/下拉框
                    itemList:[
                        {
                            value:"1",
                            label:"单用例",
                        },
                        {
                            value:"2",
                            label:"流程用例",
                        },
                    ]
                }
           ] 
        },
        conditionList:[{propertyName: {}, compareType: '' ,propertyValueList:''}]
    }
  },
  watch: {},
  computed: {
      compareType(){
          return caseCompositeType.filter()
      }
  },
  methods: {
      valueType( condition ){

          console.log('模态框李经理1',condition.propertyName)
          console.log('模态框李经理1.5',this.compareTypeOptions[condition.propertyName] && this.compareTypeOptions[condition.propertyName].filter(v=>(v.value==condition.compareType)))
          console.log('模态框李经理2',this.compareTypeOptions[condition.propertyName] && this.compareTypeOptions[condition.propertyName].filter(v=>(v.value==condition.compareType)).length !== 0 && this.compareTypeOptions[condition.propertyName].filter(v=>(v.value==condition.compareType))[0].itemType)
          return !(this.compareTypeOptions[condition.propertyName] && this.compareTypeOptions[condition.propertyName].filter(v=>(v.value==condition.compareType)).length != 0 && this.compareTypeOptions[condition.propertyName].filter(v=>(v.value==condition.compareType))[0].itemType)
      },
      addSearchCondition(){
          this.conditionList.push({
              propertyName: {},
              compareType: '' ,
              propertyValueList:''
          })
      },
      deleteSearchCondition(index){
          if(this.conditionList.length === 0){
              this.$message('只剩最后一个筛选条件')
              return
          }
          this.conditionList.splice(index,1)
      }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.el-input {
    width: 200px!important;
  }
  .searchRow{
      margin-top:10px; 
  }
</style>
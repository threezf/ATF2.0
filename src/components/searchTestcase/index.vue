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
         <el-select v-model="condition.propertyName" @change='itemChange(condition)' placeholder="请选择筛选项目">
            <el-option
                v-for="item in propertyNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
         <el-select v-model="condition.compareType" placeholder="筛选操作" @change='valueChange(condition)'>
            <el-option
                v-for="item in compareTypeOptions[condition.propertyName]"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <el-input v-if='valueType(condition)' v-model="condition.propertyValueList[0]" placeholder="比较值" @change='valueChange(condition)'></el-input>        
        <el-select v-else-if='getConf(condition).multiple' v-model="condition.propertyValueList" placeholder="比较值" :multiple='true'  @change='valueChange()'>
            <el-option
                v-for="item in getConf(condition).itemList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>        
        <el-select v-else v-model="condition.propertyValueList[0]" placeholder="比较值" @change='valueChange(condition)'>
            <el-option
                v-for="item in getConf(condition).itemList"
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
import { PropertyNameOptions, CompareTypeOptions } from './conf.js'
export default {
  components: {},
  mixins: [VueMixins],
  data() {
    return {
        propertyNameOptions: PropertyNameOptions,
        compareTypeOptions: CompareTypeOptions,
        conditionList:[{propertyName: 'caseCompositeType', compareType: undefined ,propertyValueList: [undefined]}]
    }
  },
  watch: {
  },
  mounted(){
      Request({
        url: "/aut/queryListAut",
        method: "get",
        params: {
        }
      }).then(resp => {
          let options = []
          resp.autRespDTOList.forEach(item => {
              options.push({
                value: item.id,
                label: item.nameMedium,
              })
          })
          this.compareTypeOptions.autId.forEach(item => {
              item.itemList = options
          })
      })
  },
  computed: {
      compareType(){
          return caseCompositeType.filter()
      }
  },
  methods: {
      valueType( condition ){

          console.log('模态框李经理1',condition.propertyName)
          console.log('模态框李经理1.5',this.getConf(condition))
          console.log('模态框李经理2',this.compareTypeOptions[condition.propertyName] && this.compareTypeOptions[condition.propertyName].filter(v=>(v.value==condition.compareType)).length !== 0 && this.compareTypeOptions[condition.propertyName].filter(v=>(v.value==condition.compareType))[0].itemType)
          return !(this.compareTypeOptions[condition.propertyName] && this.compareTypeOptions[condition.propertyName].filter(v=>(v.value==condition.compareType)).length != 0 && this.compareTypeOptions[condition.propertyName].filter(v=>(v.value==condition.compareType))[0].itemType)
      },
      addSearchCondition(){
          this.conditionList.push({
              propertyName: 'caseCompositeType',
              compareType: '' ,
              propertyValueList:[undefined]
          })
      },
      deleteSearchCondition(index){
          if(this.conditionList.length === 0){
              this.$message('只剩最后一个筛选条件')
              return
          }
          this.conditionList.splice(index,1)
          this.valueChange()
      },
      getConf(condition){
          return this.compareTypeOptions[condition.propertyName] && this.compareTypeOptions[condition.propertyName].filter(v=>(v.value==condition.compareType)).length !== 0 && this.compareTypeOptions[condition.propertyName].filter(v=>(v.value==condition.compareType))[0]
      },
      itemChange(condition){
          condition.compareType= undefined;
          condition.propertyValueList = [undefined];
      },
      valueChange(item){
        if(item){
            if(!(item.compareType && item.propertyName && item.propertyValueList.length > 0 &&item.propertyValueList[0])){
                return
            }
        }
        this.$emit('condition-list',this.conditionList)
      },
  },
  created() {},
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
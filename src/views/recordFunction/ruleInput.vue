<!--
 * @Author: your name
 * @Date: 2020-05-15 18:01:08
 * @LastEditTime: 2020-05-18 09:30:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ATF2.0\src\views\recordFunction\ruleInput.vue
 -->
<template>
    <div class="page-banner">
    <el-form ref="form" >
        <el-row>
            <el-col :span="5">
                <el-form-item   label="规则名称"  label-width="30%">
                   <el-input  v-model="ruleName"  :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
               <el-form-item   label="规则描述" label-width="30%">
                   <el-input  v-model="ruleDesc"  :disabled="true"></el-input>
               </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
                <el-button
                    @click='saveRule'
                    icon="el-icon-folder">
                    保存规则
                </el-button>
                <el-button
                    @click='checkVisible'
                    icon="el-icon-edit">
                    设置检测点类型
                </el-button>
            </el-col>
        </el-row>
    </el-form>
    <el-divider></el-divider>
     <el-dialog :close-on-click-modal="false" 
     width='50%'
	 title='设置检查点类型'
	 :visible.sync='dialogVisible'
     >
     <el-form :model="checkPoint">
        <el-row>
           <el-col :span="10">
               <el-form-item   label="检查点类型及内容" label-width="60%">
                   <el-select
						v-model="
							checkPoint.checkStyle
						"
						size="small"
					>
						<el-option
							v-for="item in checkStyleList"
							:key="item.id"
							:label="
								item.nameMedium
							"
							:value="item.id"
						>
						</el-option>
					</el-select>
               </el-form-item>
           </el-col>
           <el-col :span="8" :offset="1" class="down">
               <el-input  v-model="checkPoint.checkInfo" size="small"></el-input>
           </el-col>
        </el-row>
        <el-row>
           <el-col :span="6" :offset="8">
				<el-button
					type="primary"
					size="small"
					@click="setCheckPoint"
					>确定</el-button
				>
				<el-button
					type="primary"
					size="small"
					@click="
						dialogVisible = !dialogVisible
					"
					>取消</el-button
				>
            </el-col>
        </el-row>
     </el-form>
     </el-dialog>
    </div>
</template>
<script>
import Request from '@/libs/request.js'
import VueMixins from '@/libs/vueMixins.js'
export default {
        mixins: [VueMixins], // 混入
        name: "RuleInput",
        data() {
            return{
              ruleName: sessionStorage.getItem('ruleName'),//规则名称
              ruleDesc: sessionStorage.getItem('ruleDesc'),//规则描述
              uiId: sessionStorage.getItem("uiId"),
              modal: {type:'',elementId:'', index:''},
              elements: {},
              elementRepositoryId:sessionStorage.getItem('elementRepositoryId'),//元素库id
              isRestraint: false, //输入框是否有限制
              inputMust: false,   //输入框是否必输
              inputValue: '',     //输入框的标准值
              inputMinLength: '', //输入的最短长度
              inputMaxLength: '', //输入的最大长度
              inputElement:[],    //输入元素的字段
              setOrder: -1,        //输入顺序
              selectValue: [],    //下拉框的列表选择值
              clickButton: [],    //按钮的点击
              selectEleVal: '',   //当前下拉框的选择值
              dialogVisible: false,
              singleButtonValue: [
                  {
                  "value":"a", 
                  "order":"3",
                  "elementId": 69
                  }
              ],    //按钮的规则
              checkPoint:{
                  checkStyle:"弹窗",
                  checkInfo:''
              },
              checkStyleList:[
                  {
					value: "popup",
					label: "弹窗"
				},
              ],
            }    
        },
        created(){},
        methods:{
            //保存规则按钮
            saveRule(){
                  var ret = {};
                  let transId = parseInt(sessionStorage.getItem("transactId"));     //把功能点id传过去

                  ret.inputElement = this.inputElement;
                  ret.selectValue = this.selectValue;
                  ret.clickButton = this.clickButton;
                  ret.singleButtonValue = [];
                  ret.uiId = this.uiId;
                  ret.repositoryId = this.elementRepositoryId;
                  ret.nameMedium = this.ruleName;
                  ret.descShort = this.ruleDesc;
                  ret.transId = transId;
                  Request({
                    url: '/regulationController/saveRegulation',
                    method: 'post',
                    params: ret
                }).then((res) => {
                    this.$alert('保存规则成功', '成功', {
                      confirmButtonText: '确定',
					   });
                },(err) => {
                   this.$alert('保存规则失败', '失败', {
                      confirmButtonText: '确定',
					   });
                }).catch((err) => {
                   this.$alert('保存规则失败', '失败', {
                      confirmButtonText: '确定',
					   });
                })
            },
            //设置检查点弹窗
            checkVisible(){
                this.dialogVisible=!this.dialogVisible
            },
            //设置检查点
            setCheckPoint(){
                this.dialogVisible=!this.dialogVisible
            },
        }
}
</script>
<style lang="less" scoped>
    // .right-content{
    //     background-color: #f1f2f7;
    // }
    .page-banner{
        background-color:white;
        height:60px;
        padding-left:60px;
        padding-top:25px;
        border-radius: 5px;
    }
    .down{
        padding-top:4px;
    }
</style>

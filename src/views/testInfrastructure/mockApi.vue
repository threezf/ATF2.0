<template>
    <div class="page-base-inner">
		<el-container>
            <el-card class='box-card'>
                <div slot='header' class="clearfix">
                    <span>映射规则列表</span>
                    <span class="addSpan">添加</span>
                    <el-button
                        type='primary'
                        size='small'
                        icon='el-icon-plus'
                        class='btn-top-margin'>
                    </el-button>
                </div>
                <el-table
                    ref="singleTable" 
                    class="cardTableStyle"
                    stripe
					highlight-current-row
                    :data='expectation'
                    :show-header='showHeader'>
                    <el-table-column
                        width='185px'
                        prop='expectationName'>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">
                            <el-button
                                type='danger'
                                size='mini'
                                icon='el-icon-delete'
                                @click="deleteExpectation(scope.$index)">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
            <div class="content">
                <el-radio-group
                    class="buttonGroupStyle"
                    v-model='option'
                    @change="changeRadioButton(option)">
                    <el-radio-button
                        label='预览'>
                    </el-radio-button>
                    <el-radio-button
                        label='编辑'>
                    </el-radio-button>
                    <el-radio-button
                        label='运行'>
                    </el-radio-button>
                </el-radio-group>
                <el-card 
                    :class="previewCard? 'mainCardPreview': 'mainCard'">
                    <router-view></router-view>
                </el-card>
            </div>
		</el-container>
        <el-footer class="footStyle">
            <p class='footParagraphTop'>Copyright © 1998－2019 BUPT All Rights Reserved</p>
            <p class='footParagraphBottom'>教育部信息网络工程研究中心 版权所有</p>
        </el-footer>
	</div>
</template>

<script>
    import Request from '@/libs/request.js'
	import VueMixins from '@/libs/vueMixins.js'
	import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
    export default {
        name: "MockApI",
        components: {ElSlPanel},
		mixins: [VueMixins], // 混入
        data() {
            return{
                expectation: [],//完整列表数据
                showHeader: false,//通过设置:show-header为false，隐藏表头
                option: '预览',
                previewCard: true,//是否选择previewCard
            }
        },
        computed: {
            
        },
        created() {
            this.getAllExpectation();
            this.changeRadioButton(this.option)
        },
        mounted() {
            
        },
        methods: {
            //获取全部的映射规则列表
            getAllExpectation(){
                Request({
                    url: '//mockServer/getAllExpectation',
                    method: 'POST',
                    params:{}
                }).then(res=>{
                    console.log('获取映射规则列表成功',res)
                    this.expectation = res
                }).catch(err=>{
                    console.log('获取映射规则列表失败',err)
                });
            },
            deleteExpectation(index) {
                let _this = this;
                _this.$message.success('删除事件:'+index);
                console.log('删除列',_this.expectation[index].expectationName)
            },
            changeRadioButton(option){
                let _this = this;
                _this.$message.success('点击'+option)
                if(_this.option === '预览'){
                    _this.previewCard = true
                    _this.$router.push({path:'/testInfrastructure/mockApi/preview'}) 
                }else if(_this.option === '编辑'){
                    _this.previewCard = false
                    _this.$router.push({path:'/testInfrastructure/mockApi/edit'})
                }else{
                    _this.previewCard = false
                    _this.$router.push({path:'/testInfrastructure/mockApi/run'})
                }
            },
        }
    }
</script>

<style scoped>
    .box-card {
        width: 16.5%;
        margin-top: 30px;
        margin-left: 30px;
        height: fit-content;
    }
    .clearfix {
        clear: both;
    }
    .btn-top-margin{
        margin: 0px 3px 0px 30px
    }
    /* 每一行内容 */
    .cardTableStyle{
        margin: auto 10px auto 10px
    }
    .addSpan{
        margin-left: 44px; 
        margin-right: -30px
    }
    /* content相关内容 */
    .content{
        width: 75%;
        height: 100%;
        float: left;
        margin-left: 70px;
    }
    .mainCardPreview {
        width: 100%;
        height: 770px;
    }
    .mainCard { 
        width: 100%;
        height: fit-content;
    }
    .footParagraphTop,.footParagraphBottom{
		width: 100%;
		text-align: center;
		font-family: 'Times New Roman';
		font-size: 14px;
	}
    .footParagraphTop {
        margin-top: 15px;
    }
    .footStyle {
        margin-bottom: -30px;
    }
    .buttonGroupStyle {
        margin-bottom: 1px;
    }
</style>

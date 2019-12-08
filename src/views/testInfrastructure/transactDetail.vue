/**
功能点详情界面
 */
<template>
    <div class="page-outer">
        <el-container>
            <el-main>
                <el-row>
                    <el-col :span="3" class='rightLable'>
                        <span>
                            被测系统 ：
                        </span>
                    </el-col>
                    <el-col :span="3" >
                        <el-select 
                        filterable 
                        v-model="autSelectValue" 
                        @change='autChange'>
                            <el-option
                            v-for="item in autSelectOptions"
                            :key="item.id"
                            :label="item.code"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3" class='rightLable'>
                        <span>
                            功能点 ：
                        </span>
                    </el-col>
                    <el-col :span="3" >
                        <el-select filterable v-model="tranSelectValue" placeholder="请选择">
                            <el-option
                            v-for="item in tranSelectOptions"
                            :key="item.id"
                            :label="item.code"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4" :offset='1'>
                        <el-button
                            icon="el-icon-edit-outline"
                            size="small" 
                            @click='getUsers(1)'
                            type="primary">
                            复制功能点
                        </el-button>
                    </el-col>
                </el-row>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="元素库" name="elementLibrary">
                        <element-library ></element-library>
                    </el-tab-pane>
                    <el-tab-pane label="基础脚本" name="template">
                        <template-manage path-name="TestInfrastructure"></template-manage>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import Request from '@/libs/request.js'
    import SideBar from '@/components/side-bar'
    import elementLibrary from '@/components/transactDetail/elementLibrary'
    import templateManage from '@/components/transactDetail/template'
    export default {
        components: {
            SideBar,
            elementLibrary,
            templateManage
        },
        data() {
            return {
                autSelectValue:'',
                tranSelectValue:'',
                activeName: 'elementLibrary',
                autSelectOptions:[],
                tranSelectOptions:[],
            }
        },
        mounted(){
            this.getAuts();
            this.getTran(61);
            this.tranSelectValue = 115
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            getAuts(){
                console.log('1111111111')
                Request({
                    url: '/aut/queryListAut',
                    method: 'post',
                }).then((res) => {
                    console.log(res)
                    this.autSelectOptions = res.autRespDTOList
                    this.autSelectValue = 61
                },(err) => {
                    console.log(err)
                }).catch((err) => {
                    console.log(err)
                })
            },
            getTran(id){
                console.log('1111111111')
                Request({
                    url: '/transactController/queryTransactsByAutId',
                    method: 'post',
                    params:{'id':id}
                }).then((res) => {
                    this.tranSelectValue = ''
                    this.tranSelectOptions = res.transactRespDTOs
                    console.log(res)
                },(err) => {
                    console.log(err)
                }).catch((err) => {
                    console.log(err)
                })
            },
            autChange(data){
                this.getTran(data)
            }
        }
    }
</script>

<style lang="less" scoped>
    .page-outer {
        display: flex;
        .right-content {
            flex: 1;
        }
    }
</style>
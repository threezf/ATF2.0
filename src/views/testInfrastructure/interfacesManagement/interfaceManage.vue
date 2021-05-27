<template>
    <div class="project">
        <SideBarCreate v-ref="c => setChildrenRef('sidebar',c)" :menuList="menuList"  @getTableDataByIndex="getTableDataByIndex"
        @getAllTableData="getAllTableData" @getGroupById="getGroupById"></SideBarCreate>
        <!-- <SideBarCreate ></SideBarCreate> -->
        <div class="main-page">
            <el-row class="rightPage-topRow" :gutter="20">
                <el-col :span="18">
                    <el-button class="new-interface" icon="el-icon-plus" @click="newInterface" type="primary" size="small">
                        新建接口
                    </el-button>
                    <el-button class="new-interface" @click="newInterface" icon="el-icon-upload" type="primary" size="small">
                        批量导入
                    </el-button>
                    <el-button class="new-interface" type="primary" size="small" icon="el-icon-link" @click="swaggerVisible = true" >绑定swagger
                    </el-button>
                </el-col>
                <el-col :span="6">
                    <span class="enviroment-span">项目环境</span>
                    <el-select @change="selectChanged" v-model="value" placeholder="请选择" size="small">
                        <el-option
                        v-for="item in originEnviormentList"
                        :key="item.id"
                        :label="item.environmentName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <!-- <InterfacesTable></InterfacesTable> -->
            <InterfacesTable :tableData="tableData" :tableType="tableType" @updateGroupButton="updateGroupButton" @getAllTableData="getAllTableData"></InterfacesTable>
            <el-dialog :title="getTitle" :visible.sync="dialogVisible" :before-close="handleClose" width="60%">
                <el-form :model="form" ref="form" label-width="80px" label-position='top'>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="开发状态" prop="status" class="change-label-calss">
                            <el-select class="select-status" size="small" v-model="form.status" filterable placeholder="请选择">
                                <el-option
                                    v-for="item in statusOptions"
                                    :key="item.value"
                                    :label="item.status"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </el-col>
                        <el-col :span="18">
                            <el-form-item label="标签" class="change-label-calss">
                                <el-select
                                    size="small"
                                    class="input-new-tag"
                                    v-model="tags"
                                    multiple
                                    filterable
                                    allow-create
                                    default-first-option
                                    placeholder="请选择或输入标签">
                                    <el-option
                                    v-for="item in tagOptions"
                                    :key="item.value"
                                    :label="item.tag"
                                    :value="item.tag">
                                    </el-option>
                                </el-select>
                        </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="URL Path" prop="urlPath" class="change-label-calss">
                            <el-select size="small" v-model="form.protocol" placeholder="请选择" style="width:12.5%">
                                <el-option
                                    v-for="item in protocolOptions"
                                    :key="item.value"
                                    :label="item.protocol"
                                    :value="item.value">测试
                                </el-option>
                            </el-select>
                            <el-select size="small" v-model="form.method" placeholder="请选择" style="width:12.5%">
                                <el-option
                                    v-for="item in methodOptions"
                                    :key="item.value"
                                    :label="item.method"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-tooltip class="item" effect="dark" content="接口路径，建议将环境信息写到项目环境中" placement="top-start">
                                <el-input v-model="form.urlPath" size="small" placeholder="接口路径" style="width:74%">
                                </el-input>
                            </el-tooltip>
                        </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="分组和接口名称" prop="interfaceGroupId"  class="change-label-calss">
                            <el-cascader size="small" :options="menuList" v-model="interfaceGroup" :show-all-levels="false"
                            :props="defaultProps" style="width:25%">
                            </el-cascader>
                            <el-tooltip class="item" effect="dark" content="接口名称" placement="top-start">
                                <el-input v-model="form.interfaceName" size="small" placeholder="接口名称" style="width:74%">
                                </el-input>
                            </el-tooltip>
                        </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="divider-row">
                        <el-divider class="divider-style" direction="vertical"></el-divider>
                        <span class="divider-span">请求参数</span>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <TestTabs ref="testTabs" :body="form.bodyContent" :header="form.header"
                            :param="form.params" :bodyFormat="form.bodyFormat" :authType="form.authType"></TestTabs>
                        </el-col>
                    </el-row>
                    <el-row class="divider-row">
                        <el-divider class="divider-style" direction="vertical"></el-divider>
                        <span class="divider-span">响应内容</span>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <ResponseTabs ref="responseTabs" :bodyResopnse="form.bodyResopnse" :headerResopnse="form.headerResopnse"
                                :bodyResopnseType="form.bodyResopnseType" :authType="form.authType"></ResponseTabs>
                        </el-col>
                    </el-row>
                    <el-row class="buttons_row">
                        <el-button type="primary" size="small" @click="submitForm('form')">{{buttonName}}</el-button>
                        <el-button size="small" @click="cancelButtonClicked">取消</el-button>
                    </el-row>
                </el-form>
            </el-dialog>
            <el-dialog title="绑定swagger" width="31%" :visible.sync="swaggerVisible">
                <el-form>
                    <el-form-item label-width="50px" label="URL: ">
                        <el-input size="small" style="width: 300px" placeholder="请输入绑定swagger的url" v-model="swaggerUrl" clearable>
                        </el-input>
                    </el-form-item>
                    <el-row type="flex" justify="center">
                        <el-button type="primary" size="small" @click="insertSwaggerAPI">确定
                        </el-button>
                        <el-button type="warning" size="small" @click="swaggerVisible = false" plain>取消
                        </el-button>
                    </el-row>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import SideBarCreate from '@/components/interfaceTest/sidebarCreate'
import InterfacesTable from '@/components/interfaceTest/interfacesTable'
import TestTabs from '@/components/interfaceTest/testTabs'
import ResponseTabs from '@/components/interfaceTest/responseTabs'
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
import { mapState } from 'vuex';

export default {
    mixins: [VueMixins], // 时间格式转化
    name: 'InterfacesManagement',
    components: {
        SideBarCreate: SideBarCreate,
        InterfacesTable: InterfacesTable,
        TestTabs: TestTabs,
        ResponseTabs: ResponseTabs,
    },
    data () {
        return {
            originEnviormentList: [],
            value: '',
            tableData: [],
            options: [],
            //被测系统编号
            autId: '',
            menuList: [],
            transactId: '' ,// 获取接口管理传递的id数据
            currentPage: 1,
            totalCount: 30,
            pageSize: 10,
            modelFlag: 1,
            dialogVisible: false,
            statusOptions: [{
                    value: 0,
                    status: '开发中'
                }, {
                    value: 1,
                    status: '已完成'
                }, {
                    value: 2,
                    status: '已废弃'
                }, {
                    value: 3,
                    status: '测试中'
                }, {
                    value: 4,
                    status: '异常'
                }, {
                    value: 5,
                    status: '维护中'
                }],
            tagOptions: [{
                    value: 0,
                    tag: '可以添加多个标签'
                }, {
                    value: 1,
                    tag: '测试'
                }],
            protocolOptions: [{
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
            inputVisible: true,
            inputValue: '',
            tags: [],
            interfaceGroup:[],
            form: {
                status: 0,
                tags: '[]',
                protocol:0,
                method:0,
                urlPath:"/",
                interfaceGroupId:0,
                interfaceName: "",
                header: '[]',
                bodyContent: '[]',
                bodyFormat: 0,
                params: '[]',
                authType: 0, // Authorization
                bodyResopnse: '[]',
                headerResopnse: '[]',
                bodyResopnseType: 0,
                transactId:0,
                rowFormat:1,

            },
            defaultProps: {
                children: 'childNodeList',
                label: 'groupName',
                value: 'id'
            },
            environmentUrl:'',
            tableType:1,

            // swagger 绑定
            swaggerVisible: false,
            swaggerUrl: ''

        }
    },
    inject: {
        setChildrenRef: {
            default:()=>{}
        }
    },
    computed: {
        //根据modelFlag 展示弹窗的名字
        getTitle() {
            var obj = {
                1: '新建接口',
                2: '修改接口'
            }
            return obj[this.modelFlag]
        },
        //用于展示弹窗按钮的文字
        buttonName() {
            var obj = {
                1: '添加',
                2: '确认'
            }
            return obj[this.modelFlag]
        },
        ...mapState('interface', {
            interfaceEvironmentList: 'interfaceEvironmentList',
        })
    },
    created() {
        let data
        if (this.$route.query.data && this.$route.query.data.hasOwnProperty('id')) {
            data = this.$route.query.data
            console.log(data)
            localStorage.setItem('transactId', this.$route.query.data.id)
            localStorage.setItem('transactAutId', this.$route.query.data.autId)
            this.autId = Number(data.autId)
            this.transactId = data.id
        } else {
            this.autId = Number(localStorage.getItem('transactAutId'))
            this.transactId = localStorage.getItem('transactId')
        }
        this.getGroupById(this.transactId)
        this.getAllTableData()
        this.getEnvironmentList()
    },
    beforeRouteEnter (to, from, next) {
        // ...
        console.log('进入接口页面', to, from)
        next(vm => {
            vm.getAllTableData()
        })
    },
    beforeRouteUpdate (to, from, next) {
        // ...
        if(to.name === 'Transact') {
            next(vm => {
                console.log('测试数据离开接口页面', to.query, from)
                vm.$router.push({
                    name: 'Transact',
                    query: {
                        ...from.query,
                        isInterface: true
                    }
                })
            })
        }else {
            next()
        }
    },
    methods: {
        // 绑定swagger
        insertSwaggerAPI() {
            console.log()
            if (this.swaggerUrl != "") {
                Request({
                    url: "/swaggerController/insertSwaggerAPI",
                    method: "POST",
                    params: {
                        url: this.swaggerUrl,
                        systemId: sessionStorage.getItem('autId'),
                        creatorId: sessionStorage.getItem('userId'),
                    },
                })
                .then((res) => {
                    console.log(res);
                    if(res.respCode === '0000') {
                        this.$message.success("绑定成功");
                    }else {
                        this.$message.warning('绑定失败')
                    }
                    this.swaggerVisible = false;
                })
                .catch((error) => {
                    console.log(error);
                    this.$message.error("请求swagger接口失败");
                });
            } else {
                this.$message.warning("请输入url");
            }
        },
        getEnvironmentList() {
            Request({
                url: '/interfaceNewController/interfaceEnvironmentSelect',
                method: 'post',
                params: {
                    transactId: this.transactId
                }
            }).then(res => {
                console.log('查询成功列表', res)
                this.originEnviormentList = res.list
                this.options = this.originEnviormentList.map(item => ({
                    label: item.environmentName,
                    value: item.id
                }))
                this.value = this.options[0].value
                this.$store.commit('interface/updateEvironmentList', {
                    value: this.options
                })
                localStorage.setItem('environmentList', JSON.stringify(this.originEnviormentList));
            })
        },
        selectChanged(val){
            if (val ===1){
                this.$router.push({
                    path: "projectEnvironment",
                }); //界面跳转
            }else if (val ===2) {
                this.environmentUrl = ''
                console.log(val)
            }else {
                console.log(val)
            }
        },
        newInterface(){
            this.modelFlag = 1
            this.dialogVisible = true
        },
        handleClose(done) {
            if (this.modelFlag === 1) {
                done()
                return true
            }
            this.$refs['form'].resetFields()
            done()
            return true
        },
        //取消按钮
        cancelButtonClicked() {
            this.dialogVisible = false
        },
        //修改分组表单
        updateGroupButton(row) {
            this.modelFlag = 2
            console.log('row', row)
            if(row.tags !=='[]'&& row.tags !==null) {
                this.tags = (JSON.parse(row.tags))
            }
            this.interfaceGroup = row.interfaceGroupId
            const {
                status,
                protocol,
                method,
                urlPath,
                id,
                interfaceName,
                bodyContent,
                bodyFormat,
                authType,
                bodyResponse,
                bodyResponseType,
                header,
                headerResponse,
                params,
            } = row

            this.form = {
                status,
                protocol,
                method,
                urlPath,
                id,
                interfaceName,
                bodyContent,
                bodyFormat,
                authType,
                bodyResponse,
                bodyResponseType,
                header,
                headerResponse,
                params,
            }
            this.dialogVisible = true
        },
        // 提交表单进行验证
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 如果是修改则调用 updateGroup 方法 否则调用 addGroup
                    console.log(this.modelFlag)
                    if (this.modelFlag === 2) {
                        this.updateInterface()
                    } else {
                        this.addInterface()
                    }
                } else {
                    this.$message('信息格式有误，请检查')
                    return false;
                }
            });
        },
        getTableDataByIndex(index){
             Request({
                url: '/interfaceNewController/selectAllInterface',
                method: 'post',
                params: {
                    interfaceGroupId: index,
                    pageSize: this.pageSize,
                    currentPage: this.currentPage,
                    orderColumns: "update_time",
                    orderType: "desc",
                }
            }).then((res) => {
                if(res.respCode === '0000'){
                    this.tableData = res.list
                    // this.$message.success("查询成功！")
                }else {
                    this.$message.error("获取接口信息失败！")
                    console.log(err)
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        getAllTableData(){
            console.log(this.transactId)
             Request({
                url: '/interfaceNewController/selectAllInterfaceByTransactId',
                method: 'post',
                params: {
                    transactId: this.transactId,
                    pageSize: this.pageSize,
                    currentPage: this.currentPage,
                    orderColumns: "update_time",
                    orderType: "desc",
                }
            }).then((res) => {
                if(res.respCode === '0000'){
                    this.tableData = res.list
                }else {
                    this.$message.error("获取接口信息失败！")
                    console.log(err)
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        getGroupById(id){
            console.log(id)
            Request({
                url: '/interfaceNewController/selectAllInterfaceGroup',
                method: 'post',
                params: {
                    transactId: id
                }
            }).then((res) => {
                if(res.respCode === '0000'){
                    this.menuList = []
                    var treeData = res.interfaceGroupDtoList
                    for (var i = 0; i < treeData.length; i++) {
                        if (treeData[i].level === 0) {
                            this.menuList.push(treeData[i])
                        }
                    }
                    // this.$message.success("查询成功！")
                }else {
                    this.$message.error("获取接口分组失败！")
                    console.log(res.respMsg)
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        updateInterface(){
            this.form.transactId = this.transactId
            this.form.tags = JSON.stringify(this.tags)
					  if(typeof this.interfaceGroup ==="number"){
							this.form.interfaceGroupId =this.interfaceGroup;
						}else {
							let length = this.interfaceGroup.length
							this.form.interfaceGroupId = this.interfaceGroup[length-1]
						}
            this.form.bodyFormat = Number(this.$refs.testTabs.bodyType)
            if(this.form.bodyFormat === 0){
                this.form.bodyContent = JSON.stringify(this.$refs.testTabs.bodys)
            }else {
                this.form.bodyContent = this.$refs.testTabs.jsonVariable
            }
            this.form.header = JSON.stringify(this.$refs.testTabs.headers)
            this.form.params = JSON.stringify(this.$refs.testTabs.params)
						this.form.headerResponse = JSON.stringify(this.$refs.responseTabs.respheaders)
						this.form.bodyResponseType = Number(this.$refs.responseTabs.respType)
						if(this.form.bodyResponseType === 0){
							this.form.bodyResponse = JSON.stringify(this.$refs.responseTabs.results)
						}else {
							this.form.bodyResponse = this.$refs.responseTabs.respJsonVariable
						}
            this.form.authType = this.$refs.testTabs.selectedAuthType
            this.form.updateUser = sessionStorage.getItem("username")
						console.log(JSON.stringify(this.form))
            Request({
                    url: '/interfaceNewController/updateSingleInterface',
                    method: 'post',
                    params: this.form
                }).then((res) => {
										if(res.respCode === '0000'){
											this.$message.success('更新成功')
											this.dialogVisible = false
											this.getAllTableData()
										}else {
											this.$message.error("更新失败！")
											this.dialogVisible = false
											console.log(res.respMsg)
										}
                }).catch((err) => {
                    console.log(err)
                })

        },
        addInterface() {
            this.form.transactId = this.transactId
            this.form.tags = JSON.stringify(this.tags)
            let length = this.interfaceGroup.length
            this.form.interfaceGroupId = this.interfaceGroup[length-1]
            this.form.bodyFormat = Number(this.$refs.testTabs.bodyType)
            if(this.form.bodyFormat === 0){
                this.form.bodyContent = JSON.stringify(this.$refs.testTabs.bodys)
            }else {
                this.form.bodyContent = this.$refs.testTabs.jsonVariable
            }
            this.form.header = JSON.stringify(this.$refs.testTabs.headers)
            this.form.params = JSON.stringify(this.$refs.testTabs.params)
            this.form.headerResponse = JSON.stringify(this.$refs.responseTabs.respheaders)
            this.form.bodyResponseType = Number(this.$refs.responseTabs.respType)
            if(this.form.bodyResponseType === 0){
                this.form.bodyResponse = JSON.stringify(this.$refs.responseTabs.results)
            }else {
                this.form.bodyResponse = this.$refs.responseTabs.respJsonVariable
            }
            this.form.authType = this.$refs.testTabs.selectedAuthType
            this.form.createUser = sessionStorage.getItem("username")
            console.log(this.form)
            Request({
                    url: '/interfaceNewController/addNewInterface',
                    method: 'post',
                    params: this.form
                }).then((res) => {
										if(res.respCode === '0000'){
											this.$message.success('新建成功')
											this.dialogVisible = false
											this.getAllTableData()
										}else {
											this.$message.error("新建失败！")
											this.dialogVisible = false
											console.log(res.respMsg)
										}
                }).catch((err) => {
                    console.log(err)
                })
        },
    },
  }
</script>
<style lang="less" scoped>
.project {
        height: 100%;
        display: flex;
    }
.main-page {
    flex: 1;
    min-width: calc(100vh - 480px);
}
.new-interface{
    margin: 0 0 0 10px;
}
.enviroment-span{
    margin-right: 20px;
    font-size: 15px;
    color: #b6b6b6;
}
/**添加取消按钮样式 */
.buttons_row {
    text-align: center;
    margin-bottom: -15px;
    margin-top: 20px;
}
.divider-style {
    width: 3px;
    margin: 0;
    background-color: #409EFF;
    height: 30px;
}
.divider-span {
    font-size: 15px;
    margin-left: 10px;
}
.divider-row {
    background-color:#eef0f0;
    width:100%;
    margin-bottom: 10px;
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
.rightPage-topRow {
    padding: 10px 5px;
    line-height: 40px;
}
</style>

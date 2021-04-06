<template>
    <div class="project">
            <!-- <SideBarCreate :menuList="menuList"></SideBarCreate> -->
            <SideBarCreate ></SideBarCreate>
            <div class="main-page">
                <el-row>
                  <el-col :span="16">
                      <el-button class="new-interface" @click="newInterface" type="primary" size="small">
                        <i class="el-icon-plus"></i>新建接口
                    </el-button>
                  </el-col>
                  <el-col :span="8">
                        <span class="enviroment-span">项目环境</span>
                        <el-select v-model="value" placeholder="请选择" size="small">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                  </el-col>
                </el-row>
                <InterfacesTable></InterfacesTable>
                <!-- <InterfacesTable :tableData="tableData"></InterfacesTable> -->
                <el-dialog :title="getTitle" :visible.sync="dialogVisible" :before-close="handleClose" width="50%">
                    <el-form :rules="rules" :model="form" ref="form" label-width="80px" label-position='top'>
                        <el-row>
                          <el-col :span="11">
                              <el-form-item label="开发状态" prop="status">
                                <el-select size="small" v-model="form.status" filterable placeholder="请选择">
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.status"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="11" :offset="1">
                              <el-form-item label="标签" prop="tags">
                                    <el-input
                                        class="input-new-tag"
                                        v-if="inputVisible"
                                        v-model="inputValue"
                                        ref="saveTagInput"
                                        size="small"
                                        @keyup.enter.native="handleInputConfirm"
                                        @blur="handleInputConfirm"
                                        >
                                        <el-tag
                                            :key="tag"
                                            v-for="tag in form.dynamicTags"
                                            closable
                                            :disable-transitions="false"
                                            @close="handleClose(tag)">
                                            {{tag}}
                                        </el-tag>
                                    </el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="23">
                              <el-form-item label="URL Path" prop="urlPath">
                                <el-select size="small" v-model="form.protocol" placeholder="请选择" style="width:160px">
                                    <el-option
                                        v-for="item in protocolOptions"
                                        :key="item.value"
                                        :label="item.protocol"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-select size="small" v-model="form.method" placeholder="请选择" style="width:160px">
                                    <el-option
                                        v-for="item in methodOptions"
                                        :key="item.value"
                                        :label="item.method"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-tooltip class="item" effect="dark" content="接口路径，建议将环境信息写到项目环境中" placement="top-start">
                                    <el-input v-model="form.urlPath" size="small" placeholder="接口路径">
                                    </el-input>
                                </el-tooltip>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="23">
                              <el-form-item label="分组和接口名称" prop="groupName">
                                <el-cascader size="small" :options="menuList" v-model="form.groupName" :show-all-levels="false" style="width:200px"> 
                                </el-cascader>
                                <el-tooltip class="item" effect="dark" content="接口名称" placement="top-start">
                                    <el-input v-model="form.interfaceName" size="small" placeholder="接口名称">
                                    </el-input>
                                </el-tooltip>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                            <el-divider direction="vertical"></el-divider>
                            <span>请求参数</span>
                        </el-row>
                        <TestTabs ref="testTabs"></TestTabs>
                        <el-row class="buttons_row">
                            <el-button type="primary" size="small" @click="submitForm('form')">{{buttonName}}</el-button>
                            <el-button size="small" @click="cancelButtonClicked">取消</el-button>
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
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";

export default {
    mixins: [VueMixins], // 时间格式转化
    name: 'InterfacesManagement',
    components: {
        SideBarCreate: SideBarCreate,
        InterfacesTable: InterfacesTable,
        TestTabs: TestTabs
    },
    data () {
        return {
            options: [{
                value: '选项1',
                label: '管理测试环境'
                }, {
                value: '选项2',
                label: '无'
                }, {
                value: '选项3',
                label: '演示环境'
                }],
                value: '',
                tabaleData: [],
                //被测系统编号
                autId: '',
                menuList: [],
                transactsForm: {
                    id: ""
                }, // 获取功能点传递的表单数据
                currentPage: 1,
                totalCount: 30,
                pageSize: 10,
                modelFlag: 1,
                dialogVisible: false,
                rules: {
                    groupName: [{
                        required: true,
                        message: "分组名称是必填项",
                        trigger: "blur"
                    }]
                },
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
                form: {
                    status: 0,
                    dynamicTags: [],
                    protocol:"HTTP",
                    method:"POST",
                    urlPath:"/",
                    groupName:"",
                    interfaceName: ""
                },

        }
    },
    computed: {
        //根据modelFlag 展示弹窗的名字
        getTitle() {
            var obj = {
                1: '新建分组',
                2: '修改分组'
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
    },
    created() {
            // this.autId = Number(localStorage.getItem('transactAutId'));
            // this.getGroupByAutId(this.autId)
            let data
            if (this.$route.query.data.hasOwnProperty('id')) {
                data = this.$route.query.data
                console.log(data)
                localStorage.setItem('transactId', this.$route.query.data.id)
                localStorage.setItem('transactAutId', this.$route.query.data.autId)
                this.autId = Number(data.autId)
                this.transactsForm.id = data.id
            } else {
                this.autId = Number(localStorage.getItem('transactAutId'))
                this.transactsForm.id = localStorage.getItem('transactId')
            }
            this.getGroupById(this.transactsForm.id)
    },
    beforeRouteEnter (to, from, next) {
        // ...
        console.log('进入接口页面', to, from)
        next()
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
        newInterface(){
                this.$refs.testTabs.initApiMsgData()
                this.modelFlag = 1
                this.dialogVisible = true
            },
        handleClose(done) {
            if (this.modelFlag == 1) {
                done()
                return true
            }
            this.$refs['form'].resetFields()
            done()
            return true
        },
        handleClose(tag) {
            this.form.dynamicTags.splice(this.form.dynamicTags.indexOf(tag), 1);
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
            this.form.dynamicTags.push(inputValue);
            }
            this.inputValue = '';
        },
        //取消按钮
        cancelButtonClicked() {
            this.dialogVisible = false
        },
        //修改分组表单
        updateGroupButton(index, row) {
            this.modelFlag = 2
            console.log('row', row)
            // const {
            //     groupName
            // } = row

            // this.form = {
            //     groupName,
            // }
            this.dialogVisible = true
        },
        // 提交表单进行验证
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 如果是修改则调用 updateGroup 方法 否则调用 addGroup
                    console.log(this.modelFlag)
                    if (this.modelFlag === 2) {
                        this.updateGroup()
                    } else {
                        this.addGroup()
                    }
                } else {
                    this.$message('信息格式有误，请检查')
                    return false;
                }
            });
        },
        getTableDataByIndex(index){
             Request({
                url: '/interfaceNewController/selectAllInterfaceGroup',
                method: 'post',
                params: {
                    interfaceGroupId: index,
                    pageSize: this.pageSize,
                    currentPage: this.currentPage,
                    orderColumns: "update_time",
                    orderType: "desc",
                }
            }).then((res) => {
                this.tabaleData = res.list
                this.$message.success("查询成功！")
            }, (err) => {
                this.$message.error("获取接口信息失败！")
                console.log(err)
            }).catch((err) => {
                console.log(err)
            })
        },
        getAllTableData(){
             Request({
                url: '/interfaceNewController/selectAllInterfaceByTransactId',
                method: 'post',
                params: {
                    transactId: this.transactsForm.id,
                    pageSize: this.pageSize,
                    currentPage: this.currentPage,
                    orderColumns: "update_time",
                    orderType: "desc",
                }
            }).then((res) => {
                this.tabaleData = res.list
                this.$message.success("查询成功！")
            }, (err) => {
                this.$message.error("获取接口信息失败！")
                console.log(err)
            }).catch((err) => {
                console.log(err)
            })
        },
        getGroupById(id){
            Request({
                url: '/interfaceNewController/selectAllInterfaceGroup',
                method: 'post',
                params: {
                    transactId: id
                }
            }).then((res) => {
                this.menuList = res.interfaceGroupDtoList
                this.$message.success("查询成功！")
            }, (err) => {
                this.$message.error("获取接口分组失败！")
                console.log(err)
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
    flex: 1
}
.new-interface{
    margin: 0 0 0 20px;
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
}
</style>
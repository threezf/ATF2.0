<!--
 * @Author: your name
 * @Date: 2020-10-23 16:53:38
 * @LastEditTime: 2020-10-23 17:22:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ATF2.0\src\views\quicklyStart\quicklyTransact.vue
-->
/**
*快速开始——第一步添加功能点
*/
<template>
<div class="contain">
    <div class="header-content">
        <steps :active="0"></steps>
    </div>
    <div>

    </div>
    <el-row type="flex" class="row-bg">
        <el-col :span="7">
            <el-select size="small" v-model="selectValue" style="margin-top: 12px" placeholder="请选择要查询的功能点" clearable filterable @change="getChange">
                <el-option v-for="item in transactList" :key="item.id" :label="item.nameMedium" :value="item.id">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="10" :offset="2">
            <el-card shadow="always">
                <div slot="header" class="clearfix">
                    <span>{{modelName}}</span>
                </div>
                <el-form label-width="100px" :model="formData" :rules="rules" ref="form">
                    <el-form-item label="功能点名称:" prop="nameMedium">
                        <el-input style="width:100%" size="small" v-model="formData.nameMedium"></el-input>
                    </el-form-item>
                    <el-form-item label="编码:" prop="code">
                        <el-input style="width:100%" size="small" v-model="formData.code"></el-input>
                    </el-form-item>
                    <el-form-item label="描述:" prop="descShort">
                        <el-input size="small" v-model="formData.descShort" type="textarea"></el-input>
                    </el-form-item>
                    <el-row type="flex" justify="center">
                        <el-col :span="14" v-show="!disabled">
                            <el-button type="primary" @click="submitForm('form')" v-show="!disabled">添加并进入下一步</el-button>
                            <el-button @click="resetForm('form')" v-show="!disabled">重置</el-button>
                        </el-col>
                        <el-col :span="18" v-show="disabled">
                            <el-button type="primary" @click="editTransact('form')" v-show="disabled">修改功能点</el-button>
                            <el-button @click="resetForm('form')" v-show="disabled">返回添加</el-button>
                            <el-button @click="toElement" v-show="disabled">下一步</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
        </el-col>
        <el-col :span="7">
        </el-col>
    </el-row>
</div>
</template>

<script>
import steps from "@/components/steps";
import Request from "@/libs/request.js";
export default {
    components: {
        steps
    },
    data() {
        return {
            formData: {
                nameMedium: "",
                code: "",
                descShort: "",
            },
            rules: {
                nameMedium: [{
                    required: true,
                    message: "请输入功能点名称",
                    trigger: "blur"
                }, ],
            },
            transactList: [],
            selectValue: '',
            modelName: "添加功能点",
            disabled: false,
            funDic: {}
        };
    },
    created() {
        this.getAllFunction()
    },
    methods: {
        submitForm(formName) {
            var _this = this;
            this.$refs[formName].validate((valid) => {
                if (_this.formData.code === "") {
                    _this.formData.code = "功能点" + Date.now();
                }
                if (valid) {
                    Request({
                            url: "/transactController/addSingleUITransactWithoutAut",
                            method: "POST",
                            params: {
                                nameMedium: _this.formData.nameMedium,
                                descShort: _this.formData.descShort,
                                code: _this.formData.code,
                                // creatorId: sessionStorage.getItem('userId')
                                creatorId: sessionStorage.getItem('userId')
                            },
                        })
                        .then((res) => {
                            if (res.respCode === "0000") {
                                console.log("addSingleUITransactWithoutAut", res);
                                this.$router.push({
                                    name: "QuicklyElement",
                                    query: {
                                        autId: res.autId,
                                        transactId: res.transId,
                                        sceneId: res.sceneId,
                                        testPlanId: res.testPlanId,
                                    },
                                });
                            } else {
                                this.$message.warning("添加失败");
                            }
                        })
                        .catch((err) => {
                            this.$message.error("添加失败");
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        //跳转到下一步
        toElement() {
            this.$router.push({
                name: "QuicklyElement",
                query: {
                    autId: this.formData.autId,
                    transactId: this.formData.id,
                    sceneId: this.formData.sceneId,
                    creatorId: sessionStorage.getItem("userId"),
                    testPlanId: this.formData.testPlanId,
                },
            });
        },
        //修改功能点
        editTransact(formName) {
            var _this = this;
            this.$refs[formName].validate((valid) => {
                Request({
                        url: "/transactController/modifySingleTransact",
                        method: "POST",
                        params: {
                            nameMedium: _this.formData.nameMedium,
                            descShort: _this.formData.descShort,
                            code: _this.formData.code,
                            creatorId: _this.formData.creatorId,
                            id: _this.formData.id,
                            userId: sessionStorage.getItem('userId'),
                            autId: this.formData.autId,
                        },
                    }).then(res => {
                        this.$alert("修改成功")
                    })
                    .catch(err => {
                        this.$alert("修改失败")
                    });
            })
        },
        getChange(val) {
            console.log(val)
            this.formData = this.funDic[val]
            this.modelName = "查看功能点"
            this.disabled = true
        },
        getAllFunction() {
            Request({
                    url: "/transactController/fastStartPagedBatchQueryTransact",
                    method: "post",
                    params: {
                        creatorId: parseInt(sessionStorage.getItem("userId")),
                        currentPage: 1,
                        orderColumns: "modified_time",
                        orderType: "desc",
                        pageSize: 9999
                    }
                })
                .then(res => {
                        this.transactList = res.list
                        this.selectValue = ''
                        res.list.forEach(item => {
                            this.funDic[item.id] = item
                        })
                        // this.formData=res.list[0]
                    },
                    err => {
                        console.log("功能点查询出错" + err);
                    }
                )
                .catch(err => {
                    console.log("功能点查询出错" + err);
                });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.modelName = "添加功能点"
            this.disabled = false
            this.getAllFunction()
        },
    },
};
</script>

<style lang="less" scoped>
.page-outer {
    display: flex;

    .right-content {
        flex: 1;
    }
}

.el-form {
    width: 100%;
}
</style>

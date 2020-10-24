/**
功能点详情界面
 */
<template>
<page>
            <el-row>
                <el-col :span="3" class='rightLable'>
                    <span>
                        被测系统 ：
                    </span>
                </el-col>
                <el-col :span="3">
                    <el-select filterable v-model="autSelectValue" @change='autChange'>
                        <el-option v-for="item in autSelectOptions" :key="item.id" :label="item.code" :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="3" class='rightLable'>
                    <span>
                        功能点 ：
                    </span>
                </el-col>
                <el-col :span="3">
                    <el-select filterable v-model="tranSelectValue" placeholder="请选择" @change='transChange'>
                        <el-option v-for="(item,index) in tranSelectOptions" :key="index" :label="item.code" :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4" :offset='1'>
                    <el-button icon="el-icon-edit-outline" size="small" @click='copySingleUITransact()' type="primary">
                        复制功能点
                    </el-button>
                </el-col>
            </el-row>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="元素库" name="elementLibrary">
                    <element-library :trans-id='tranSelectValue + ""' :aut-id='autSelectValue+""' :creatorId="creatorId" :creatorName="creatorName"></element-library>
                </el-tab-pane>
                <el-tab-pane label="基础脚本" name="template">
                    <template-manage :trans-id='tranSelectValue' :aut-id='autSelectValue' path-name="TestInfrastructure" :creatorId="creatorId" :creatorName="creatorName"></template-manage>
                </el-tab-pane>
            </el-tabs>
</page>
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
            userId: "", // 用户id
            conpanyId: '', // 企业id
            autSelectValue: "",
            tranSelectValue: "",
            activeName: 'elementLibrary',
            autSelectOptions: [],
            tranSelectOptions: [],
            transSelected: {} //当前被选中的功能点的数据
        }
    },
    watch: {
        "$route": {
            handler(to, from) {
                console.log('$route', to, from)
                to.query.steps === 0 ?
                    this.activeName = 'elementLibrary' :
                    this.activeName = 'template'
            }
        }
    },
    created() {
        let data;
        console.log('data', this.$$route.query.data)
        if (this.$route.query.data) {
            data = this.$route.query.data // 跳转源界面传递的行数据或新增测试功能点的对象数据
            localStorage.setItem('transactId', this.$route.query.data.id)
            localStorage.setItem('transactAutId', this.$route.query.data.autId)
            this.autSelectValue = data.autId
            this.tranSelectValue = data.id
        } else {
            this.autSelectValue = Number(localStorage.getItem('transactAutId'))
            this.tranSelectValue = Number(localStorage.getItem('transactId'))
        }
        this.creatorId = this.$route.query.creatorId,
            this.creatorName = this.$route.query.creatorName,
            this.userId = sessionStorage.getItem('userId')
        this.getAuts();
        this.getTran(this.autSelectValue, true);
        console.log('treeData', this.companyId)
    },
    methods: {
        handleClick(tab, event) {
            console.log('tab-click	', tab.index);
            if (tab.index == 0) {
                this.$router.push({
                    path: '/testInfrastructure/transactDetail',
                    query: {
                        steps: 0
                    }
                })
            } else {
                this.$router.push({
                    path: '/testInfrastructure/transactDetail',
                    query: {
                        steps: 1
                    }
                })
            }
        },
        getAuts() {
            Request({
                url: '/aut/queryListAut',
                method: 'post',
                params: {
                    companyId: this.companyId
                }
            }).then((res) => {
                console.log(res)
                this.autSelectOptions = res.autRespDTOList
                this.autSelectValue = this.autSelectValue
            }, (err) => {
                console.log(err)
            }).catch((err) => {
                console.log(err)
            })
        },
        getTran(id, flag = false) {
            Request({
                url: '/transactController/queryTransactsByAutId',
                method: 'post',
                params: {
                    'id': id
                }
            }).then((res) => {
                this.tranSelectOptions = res.transactRespDTOs
                if (!flag) {
                    this.tranSelectValue = ''
                    this.tranSelectValue = res.transactRespDTOs[0].id
                }
                this.transChange(this.tranSelectValue)
                console.log(res)
            }, (err) => {
                console.log(err)
            }).catch((err) => {
                console.log(err)
            })
        },
        autChange(data) {
            this.getTran(data)
        },
        transChange(tranSelectValue) {
            this.transSelected = this.tranSelectOptions.filter(v => (tranSelectValue == v.id))[0]
        },
        copySingleUITransact() {
            console.log()
            Request({
                url: '/transactController/copySingleUITransact',
                method: 'post',
                params: {
                    "autId": this.autSelectValue,
                    "transId": this.tranSelectValue,
                    "elementRepositoryId": this.transSelected.elementRepositoryId,
                    "objectRepositoryId": this.transSelected.objectRepositoryId,
                    "creatorId": this.userId
                }
            }).then((res) => {
                this.$message('复制成功')
            }, (err) => {

            })
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

<template>
    <div class="project">
            <SideBarCreate></SideBarCreate>
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
                <!-- <InterfacesTable @getTableData="getTableData" @getAllTableData="getAllTableData"></InterfacesTable> -->
            </div>
            
    </div>
</template>
<script>
import SideBarCreate from '@/components/interfaceTest/sidebarCreate'
import InterfacesTable from '@/components/interfaceTest/interfacesTable'

export default {
    name: 'InterfacesManagement',
    components: {
        SideBarCreate: SideBarCreate,
        InterfacesTable: InterfacesTable
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
                autId: '',
                menuList: []

        }
    },
    mounted() {
            this.autId = Number(localStorage.getItem('transactAutId'));
            this.getGroupByAutId(this.autId)
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
    computed: {
        
    },
    methods: {
        newInterface(){
                this.$message('创建接口');
            },
        getTableData(index){
             Request({
                url: '/testProjectController/addSingleTestProject',
                method: 'post',
                params: {
                    index: index,
                }
            }).then((res) => {
                this.tabaleData = res.list

            }, (err) => {
                this.$message("获取接口信息失败！")
                console.log(err)
            }).catch((err) => {
                this.$message(err.respMsg)
                console.log(err)
            })
        },
        getAllTableData(){
             Request({
                url: '/testProjectController/addSingleTestProject',
                method: 'post',
                params: {
                    
                }
            }).then((res) => {
                this.tabaleData = res.list

            }, (err) => {
                this.$message("获取接口信息失败！")
                console.log(err)
            }).catch((err) => {
                this.$message(err.respMsg)
                console.log(err)
            })
        },
        getGroupByAutId(id){
            Request({
                url: '/testProjectController/addSingleTestProject',
                method: 'post',
                params: {
                    id: id
                }
            }).then((res) => {
                this.menuList = res.list

            }, (err) => {
                this.$message("获取接口分组失败！")
                console.log(err)
            }).catch((err) => {
                this.$message(err.respMsg)
                console.log(err)
            })
        },
    },
    mounted() {
        
    }
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
</style>
<template>
    <div class="project">
        <SideBarCreate :needAdd="false" v-ref="c => setChildrenRef('sidebar',c)" :menuList="menuList"  @getGroupById="getGroupById"></SideBarCreate>
        <div class="main-page">
            <InterfaceTest :originData="interfaceData" :path="interfaceData.urlPath" :protocals="protocols" :methods="methodOptions" >
            </InterfaceTest>
        </div>
    </div>
</template>
<script>
import SideBarCreate from '@/components/interfaceTest/sidebarCreate'
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
import InterfaceTest from '../interfacesManagement/interfaceDetail/interfaceTest'


export default {
    mixins: [VueMixins], // 时间格式转化
    name: 'InterfacesTest',
    components: {
        SideBarCreate: SideBarCreate,
        InterfaceTest
    },
    data () {
        return {
            menuList: [],
            interfaceData: { "id": 377, "menuId": 2317, "interfaceGroupId": 57, "interfaceName": "用户登录", "protocol": 0, "urlPath": "/login", "status": 1, "method": 0, "authType": 1, "params": "[{\"name\":\"name\",\"val\":\"zhx\",\"desc\":null},{\"name\":null,\"val\":null,\"desc\":null}]", "header": "[{\"name\":\"Content-Type\",\"val\":\"application/json\",\"desc\":\"类型\"},{\"name\":null,\"val\":null,\"desc\":null}]", "bodyFormat": 0, "rawFormat": null, "bodyContent": "[{\"name\":\"zhx\",\"val\":\"123456\",\"type\":\"string\",\"desc\":\"用户名\"},{\"name\":null,\"val\":null,\"type\":\"string\",\"desc\":null}]", "bodyResponseType": 0, "bodyResponse": "[{\"name\":null,\"type\":\"string\",\"desc\":null}]", "headerResponse": "[{\"name\":\"\",\"desc\":\"\"}]", "tags": "[\"测试\"]", "createUser": "zhx", "createTime": 1620393595000, "updateUser": null, "updateTime": 1620393595000 },
            protocols: [{
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
					menuId: null
        }
    },
    inject: {
        setChildrenRef: {
            default:()=>{}
        }
    },

    created() {
        this.menuId = localStorage.getItem('menuId')
        this.getGroupById(this.menuId)
    },
    beforeRouteEnter (to, from, next) {
        // ...
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
        getGroupById(id){
            Request({
                url: '/interfaceNewController/selectAllInterfaceGroup',
                method: 'post',
                params: {
									menuId: id
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
    }
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
</style>

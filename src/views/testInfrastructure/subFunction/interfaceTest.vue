<template>
    <div class="project">
        <SideBarCreate :menuType="1" v-ref="c => setChildrenRef('sidebar',c)" :menuList="menuList"  @getGroupById="getGroupById" @getInterfaceDetail="getInterfaceDetail"></SideBarCreate>
        <div class="main-page">
            <InterfaceTest :originData="interfaceData" :path="interfaceData.urlPath" :protocals="protocols" :methods="methodOptions" :getId="getId"
													 @caseChange="handleCaseChange">
            </InterfaceTest>
        </div>
    </div>
</template>
<script>
import SideBarCreate from '@/components/interfaceTest/sideBar'
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
import InterfaceTest from '../interfacesManagement/interfaceDetail/interfaceTest'
import {TimeUtils} from "wii-fe-utils";


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
            interfaceData: {},
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
					// menuId: null,
					autId: undefined,
					getId:null
        }
    },
    inject: {
        setChildrenRef: {
            default:()=>{}
        }
    },

    created() {
        this.autId = sessionStorage.getItem('autId')
        this.getGroupById(this.autId)
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
			getGroupById(id) {
				Request({
					url: '/interfaceNewController/selectAllInterfaceGroup',
					method: 'post',
					params: {
						autId: id
					}
				}).then((res) => {
					if (res.respCode === '0000') {
						this.menuList = []
						var treeData = res.interfaceGroupDtoList
						for (var i = 0; i < treeData.length; i++) {
							if (treeData[i].level === 0) {
								this.menuList.push(treeData[i])
							}
						}
						console.log("menuList", this.menuList)
						this.addMenu(this.menuList)
						// this.$message.success("查询成功！")
					} else {
						this.$message.error("获取接口分组失败！")
						console.log(res.respMsg)
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			addMenu(menuList) {
				menuList.forEach((item) => {
					if (item.childNodeList == null) {
						this.$set(item, 'childNodeList', []);
						Request({
							url: "/interfaceNewController/selectAllInterface",
							method: "post",
							params: {
								interfaceGroupId: item.id,
								pageSize: 10,
								currentPage: 1,
								orderColumns: "update_time",
								orderType: "desc",
							},
						})
							.then((res) => {
								if (res.respCode === "0000") {
									let list = res.list.map((item) => ({
										id: item.id,
										groupName: item.interfaceName,
										method: item.method
									}))
									list.forEach((i) =>{
										item.childNodeList.push(i)
									})
									console.log('MapList',list)
								} else {
									console.log(res.respMsg);
								}
							})
							.catch((err) => {
								console.log("查询失败", err);
							})
					} else {
						this.addMenu(item.childNodeList)
					}
				})
			},
			getInterfaceDetail(id){
				this.getId = id
				console.log("getId",this.getId)
				Request({
					url: '/interfaceNewController/selectInterfaceById',
					method: 'post',
					params: {
						id: id
					}
				}).then((res) => {
					if(res.respCode === '0000'){
						this.interfaceData = res.interfaceSelectDto
						for(let key in res.interfaceSelectDto) {
							if(key in this.$store.state.interface) {
								if(key === 'header' || key === 'params' || key === 'bodyContent' || key === 'bodyResponse' || key === 'headerResponse' || key === 'tags') {
									this.$store.commit(`interface/update${key.slice(0, 1).toUpperCase()}${key.slice(1)}`, {
										value: JSON.parse(res.interfaceSelectDto[key])
									})
								}else {
									this.$store.commit(`interface/update${key.slice(0, 1).toUpperCase()}${key.slice(1)}`, {
										value: res.interfaceSelectDto[key]
									})
								}
							}
						}
						console.log('interfaceData',this.interfaceData)

						// this.$message.success("查询成功！")
					}else {
						this.$message.error("查询失败！")
						console.log(res.respMsg)
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			handleCaseChange(){
					this.$router.push({
						path: "interfaceDetail",
						// query: {
						//     interfaceData: row
						// }
					}); //界面跳转
				}
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

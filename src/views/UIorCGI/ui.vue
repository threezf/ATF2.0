/**
UI测试页面，作为二级路由主页面
*/
<template>
	<div class="page-outer">
		<side-bar :path-name="pathName"></side-bar>
		<div class="right-content">
			<progress-bar v-show="$store.state.flag &&isShow"></progress-bar>
			<router-view />
		</div>
	</div>
</template>
<script>
//   import { SessionStorage } from "wii-fe-utils";
import SideBar from '@/components/side-bar'
import progressBar from '@/components/progressBar'
export default {
    name: 'UI',
	components: {
		SideBar,
		progressBar
	},
	data() {
		return {
			urls: [],
			pathName: 'UI'
		}
	},
	created() {
		const flag = localStorage.getItem("userType")
		this.$store.commit("changeFlag", flag == 'true')
	},

    // activated(){
    //     let testSys = sessionStorage.getItem("testSysNameStorage")
    //     console.log('进入UI测试', this.$route.query)
    //     this.msg = sessionStorage.getItem('testSysNameStorage')
    //     console.log('测试', testSys, '进行了ui')
    //     if(this.msg){
    //         this.$router.push({
    //             name:'Transact',
    //             query: {
    //                 isInterface: false,
    //                 id: JSON.parse(sessionStorage.getItem('toTransact')).id,
    //                 nameMedium: JSON.parse(sessionStorage.getItem('toTransact')).nameMedium,
    //             }
    //         })
    //         return
    //     }
    //     this.$router.push({
    //         name:'TestedSystemManagement',
    //         query:{
    //             dialog: true
    //         }
    //     })
    //
    // },
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

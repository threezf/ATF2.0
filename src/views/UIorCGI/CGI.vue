/**
接口测试页面，作为二级路由主页面
*/
<template>
	<div class="page-outer">
		<side-bar :path-name="pathName"></side-bar>
		<div class="right-content">
			<router-view />
		</div>
	</div>
</template>
<script>
//   import { SessionStorage } from "wii-fe-utils";
import SideBar from '@/components/side-bar'
import progressBar from '@/components/progressBar'
export default {
	name: 'CGI',
	components: {
		SideBar,
	},
	data() {
		return {
			urls: [],
			pathName: 'Interface'
		}
	},
	provide() {
		return {
			setChildrenRef: (name, ref) => {
				this[name] = ref
			},
			getChildrenRef: name => {
				return this[name]
			},
			getRef: () => {
				return this
			}
		}
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

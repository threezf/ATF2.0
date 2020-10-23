<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
			<el-breadcrumb-item>ATF云测</el-breadcrumb-item>
			<el-breadcrumb-item v-for="bread in breadList" v-bind:key="bread">
				{{ breadsName[bread] }}
			</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
	// import { Provide, Component, Watch, Prop, Vue } from 'vue-property-decorator';
	export default {
		data() {
			return {
				breadsName: {
					'index': '首页',
					'testInfrastructure': '测试基础设施',
					'systemManagement': '系统管理',
					'quicklyStart': '快速开始',
					'recordFunction':'录制功能',
					'testProjectIndext':'项目测试',
					'testedSystemManagement':'被测系统管理',
					'transact':'功能点管理',
					'autData':'被测系统管理',
					'automatedComponentMaintenance':'自动化构件维护',
					'execCode':'被测系统管理',
					'transactDetail':'UI管理',
					'useCaseDebug':'用例调试',
					'mockApi':'Mock API',
					'interfacesManagement':'接口管理',
					'enterpriseManagement':'企业管理',
					'roleManagement':'角色管理',
					'menuManagement':'系统菜单',
					'userManagement':'用户管理',
					'automatedComponentManagement':'自动化构件管理',
					'runnerManagement':'执行机管理',
					'testProject':'测试项目管理',
			    'manageTestProject':'管理项目',
					'testCase':'测试用例管理',
					'datatable':'测试资源管理',
					'uploadRecord':'导入记录',
					'scene':'场景管理',
					'sceneSetting':'场景设置',
					'datatable_flowcase':'测试资源管理流程用例',
					'insertSceneCase':'添加场景用例',
					'caseOperation':'用例执行结果查询',
					'testplanExecute':'测试计划及执行',
					'batchexecutionquery':'批次执行查询',
					'testrecord':'执行记录查询',
					'testRecord_of_runId':'测试记录单',
					'quicklyTransact':'添加功能点',
					'quicklyElement':'维护元素库',
					'quicklyTemplate':'配置用例',
					'quicklyRun':'执行用例',
					'quicklyResult':'查看结果'
				},
				breadList: [],
				path:[]
			}

		},
		created() {
			this.getBreadList();
		},
		watch: {
			$route: {
				handler(to, from) {
					this.getBreadList()
				}
			},
		},
		methods: {
			getBreadList() {
				this.path=this.$route.path.split("/")
				this.path.splice(0,1)
				console.log("aaaa",this.path)
				if(this.path[1]=="TestedSystemManagementRouter"){
					this.path.splice(1,1)
				}
				this.breadList = [];
				for (const routeInfo of this.path) {
					if (typeof routeInfo === 'string' ) {
						this.breadList.push(routeInfo);
					}
				}
			}
		}

	}
</script>

<style lang="less">
	.breadcrumb {
		margin-bottom: 0;
		background-color: #fafbfb;
		padding:0.5em 1em;
	}
	.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
		color:#007bff;
	}
	.el-breadcrumb__inner {
		color: #78797b !important;
	}
</style>

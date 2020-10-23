<template>
  <div class="page-inner">
    <el-container>
      <el-main style="margin-top: 20px">
						<el-table
							:data="treeData"
							style="width: 100%;margin-bottom: 20px;"
							row-key="id"
							border
							highlight-current-row
							stripe
							:tree-props="{children: 'childNodeList'}">
							<el-table-column label="" type="selection" width="35px">
							</el-table-column>
							<el-table-column
								prop="name"
								align="center"
								label="姓名">
							</el-table-column>
							<el-table-column
								label="类型"
								align="center">
								<template slot-scope="scope">
									<el-tag
										v-if="scope.row.type === 0"
										type="success"
									>顶部菜单
									</el-tag>
									<el-tag
										v-else-if="scope.row.type === 1"
										type="primary"
									>左侧子菜单
									</el-tag>
									<el-tag
										v-else
										type="info"
									>功能
									</el-tag>
								</template>
							</el-table-column>
							<el-table-column
								prop="url"
								align="center"
								label="菜单URL">
							</el-table-column>
							<el-table-column
								prop="perms"
								align="center"
								label="授权标识">
							</el-table-column>
						</el-table>
			</el-main>
    </el-container>
  </div>
</template>

<script>
	import Request from '@/libs/request.js'
	import VueMixins from '@/libs/vueMixins.js'
export default {
  name: "MenuManagement",
  data() {
    return {
      total: 100,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [5, 10, 20, 50],
			treeData:[],
			defaultProps: {
				children: 'childNodeList',
				label: 'name'
			}
    };
  },
	created() {
  	this.getTree()
	},
	methods: {
    handleCurrentChange(val) {},
    handleSizeChange(val) {},
		getTree(){
			Request({
				url: '/menuController/queryAllMenu',
				method: 'post',
				params: {
					userId:sessionStorage.getItem("userId")
				}
			}).then((res) => {
				var treeData=res.menuDtoList
				for(var i=0;i<treeData.length;i++){
					if(treeData[i].level==0){
						this.treeData.push(treeData[i])
					}
				}
			}, (err) => {
				console.log(err)
			}).catch((err) => {
				console.log(err)
			})
		}
  },
};
</script>

<style scoped lang="less">
.searchRow {
  .el-input {
    width: 300px;
  }
}

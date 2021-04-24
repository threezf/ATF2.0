<template>
	<el-table :data="headers"
						size="mini"
						stripe :show-header="true"
						border
						class="h-b-e-a-style"
						:row-style="{'background-color': 'rgb(250, 250, 250)'}">
		<el-table-column property="key" label="Key" header-align="center" minWidth="100">
			<template slot-scope="scope">
				<el-input v-model="scope.row.name" size="mini" placeholder="key">
				</el-input>
			</template>
		</el-table-column>
		<el-table-column property="value" label="Value" header-align="center" minWidth="200">
			<template slot-scope="scope">
				<el-input v-model="scope.row.val" size="mini" placeholder="value">
				</el-input>
			</template>
		</el-table-column>
		<el-table-column label="Description" header-align="center" minWidth="80">
			<template slot-scope="scope">
				<el-input v-model="scope.row.desc" size="mini" placeholder="备注">
				</el-input>
			</template>
		</el-table-column>
		<el-table-column property="value" label="操作" header-align="center" width="80" align="center">
			<template slot-scope="scope">
				<el-button type="danger" icon="el-icon-delete" size="mini"
									 @click.native="delTableRow(scope.$index)">
				</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
export default {
	name: "headerTab",
	props:{
		headers:{
			type:Array,
			default: () => []
		}
	},
	methods:{
		delTableRow(i) {
				this.headers.splice(i, 1);
		},
		addTableRow() {
				this.headers.push({name: null, val: null, desc: null});
		},
	},
	computed: {
		monitorHeader() {
			return this.headers;
		},
	},
	created() {
		if (this.headers.length===0){
			this.headers = Array()
		}
	},
	watch: {
		monitorHeader: {
			handler: function () {
				if (this.headers.length === 0) {
					this.addTableRow()
				}
				if (this.headers[this.headers.length - 1]['name'] || this.headers[this.headers.length - 1]['val']) {
					this.addTableRow()
				}
			},
			deep: true
		},
	}
}
</script>

<style scoped>

</style>

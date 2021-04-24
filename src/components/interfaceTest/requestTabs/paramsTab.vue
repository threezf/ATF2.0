<template>
	<el-table :data="params" size="mini" stripe :show-header="true"
						border
						class="h-b-e-a-style"
						:row-style="{'background-color': 'rgb(250, 250, 250)'}">
		<el-table-column property="key" label="Key" header-align="center" minWidth="100">
			<template slot-scope="scope">
				<el-input v-model="scope.row.name" size="mini" placeholder="Key">
				</el-input>
			</template>
		</el-table-column>
		<el-table-column property="value" label="Value" header-align="center" minWidth="200">
			<template slot-scope="scope">
				<el-input v-model="scope.row.val" size="mini" placeholder="Value">
				</el-input>
			</template>
		</el-table-column>
		<el-table-column label="Description" header-align="center" minWidth="80">
			<template slot-scope="scope">
				<el-input v-model="scope.row.desc" size="mini" placeholder="Description">
				</el-input>
			</template>
		</el-table-column>
		<el-table-column property="value" label="操作" header-align="center" width="80" align="center">
			<template slot-scope="scope">
				<el-button type="danger" icon="el-icon-delete" size="mini"
									 @click.native="delTableRow('params',scope.$index)">
				</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
export default {
	name: "paramsTab",
	props:{
		params:{
			type:Array,
			default: () => []
		}
	},
	methods:{
		delTableRow(i) {
			this.params.splice(i, 1);
		},
		addTableRow() {
			this.params.push({name: null, val: null, desc: null});
		},
	},
	computed: {
		monitorParams() {
			return this.params;
		},
	},
	created() {
		if (this.params.length===0){
			this.params = Array()
		}
	},
	watch: {
		monitorParams: {
			handler: function () {
				if (this.params.length === 0) {
					this.addTableRow()
				}
				if (this.params[this.params.length - 1]['name'] || this.params[this.params.length - 1]['val']) {
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

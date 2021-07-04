<template>
	<div>
		<div class="show-body" v-if="hasUploaded">
			<div class="table-item">
				<p>目标BLSTM生成特征</p>
				<el-table
					:data="tableData"
					stripe
					border
					highlight-current-row
					style="width: 100%"
					height="700"
				>
					<el-table-column
						v-for="(header, index) in tableHeader"
						:fixed="index < 3"
						:key="index"
						:prop="header.prop"
						:label="header.label"
						align="center"
						width="150"
					>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="loading-modal" v-if="!hasUploaded">
			<div class="loading">
				<RadialProgressBar
					:diameter="200"
					:completed-steps="completedSteps"
					:total-steps="totalSteps"
				>
					<p>特征提取中...</p>
					<p style="font-size: 20px; margin-top: -15px;">
						{{ completedSteps | percent }}
					</p>
				</RadialProgressBar>
			</div>
		</div>
	</div>
</template>

<script>
import Request from "@/libs/request.js";
import RadialProgressBar from "vue-radial-progress";
import { mapState, mapGetters } from "vuex";

export default {
	name: "ShowData",
	components: {
		RadialProgressBar
	},
	filters: {
		percent(val) {
			return `${val}%`;
		}
	},
	data() {
		return {
			fileList: ["Process.txt", "Import.txt", "Number.txt"],
			hasUploaded: false,
			completedSteps: 1,
			totalSteps: 100,
			tableData: []
		};
	},
	computed: {
		headerObj() {
			return {
				data: this.headerData
			};
		},
		tableHeader() {
			let results = [
				{
					label: "label",
					prop: "preDir"
				},
				{
					label: "rootDir",
					prop: "rootDir"
				},
				{
					label: "name",
					prop: "name"
				}
			];
			for (let i = 0; i < 28; i++) {
				results.push({
					label: "vector-" + i + "",
					prop: "vector" + i + ""
				});
			}
			return results;
		},
		...mapState("showStore", {
			baseFileName: "baseFileName",
			expFileName: "expFileName",
			basePath: "basePath",
			expPath: "expPath"
		}),
		...mapGetters("showStore", {
			getMap: "getMap",
			getMapList: "getMapList"
		})
	},
	methods: {
		getFeatureData() {
			this.hasUploaded = false;
			this.completedSteps = 0;
			let timer = setInterval(() => {
				if (this.completedSteps <= 98) {
					this.completedSteps += 1;
				}
			}, 50);
			const fileArr = [];
			if (this.getMap.get(this.baseFileName)) {
				fileArr.push({
					fileName: this.baseFileName.split(".")[0] + ".txt",
					preDir: this.basePath
				});
			} else {
				console.log("getMapList", this.getMapList[this.baseFileName]);
				this.getMapList[this.baseFileName].forEach(file => {
					fileArr.push({
						fileName: file.split(".")[0] + ".txt",
						preDir: this.baseFileName
					});
				});
			}
			if (this.getMap.get(this.expFileName)) {
				fileArr.push({
					fileName: this.expFileName.split(".")[0] + ".txt",
					preDir: this.expPath
				});
			} else {
				console.log("getMapList", this.getMapList[this.expFileName]);
				this.getMapList[this.expFileName].forEach(file => {
					fileArr.push({
						fileName: file.split(".")[0] + ".txt",
						preDir: this.expFileName
					});
				});
			}
			const requestList = [];
			fileArr.forEach(item => {
				["source_files", "target_files"].forEach(rootDir => {
					requestList.push({
						callback: Request({
							url: "visualBackend/characteristics/read",
							method: "post",
							params: {
								rootDir: rootDir,
								fileName: item.fileName,
								preDir: item.preDir
							}
						}),
						params: {
							rootDir,
							preDir: item.preDir
						}
					});
				});
			});
			Promise.all(requestList.map(request => request.callback)).then(res => {
				this.tableData = [];
				res.forEach((item, index) => {
					let obj = {
						name: item.fileTitle,
						rootDir: requestList[index].params.rootDir,
						preDir: requestList[index].params.preDir
					};
					item.vector.forEach((num, innerIndex) => {
						obj[`vector${innerIndex}`] = num;
					});
					this.tableData.push(obj);
				});
				this.hasUploaded = true;
				if (this.hasUploaded) {
					clearInterval(timer);
				}
			});
			setTimeout(() => {
				this.completedSteps = 100;
				setTimeout(() => {
					this.hasUploaded = true;
					if (this.hasUploaded) {
						clearInterval(timer);
					}
				}, 1000);
			}, 4500);
		}
	}
};
</script>

<style scoped>
.show-body {
	display: flex;
	width: 70vw;
	height: calc(100vh - 130px);
	border: 1px solid #eee;
	padding: 20px;
}
.table-item {
	width: 35vw;
	height: calc(100vh - 110px);
	flex: 1;
}
.table-item:last-child {
	margin-left: 10px;
}
.new {
	margin: 0 10px;
	height: 40vh;
	width: 70vw;
	overflow-y: scroll;
}
.loading-modal {
	position: absolute;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 10;
	width: 100vw;
	height: 100vh;
}
.loading {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
</style>

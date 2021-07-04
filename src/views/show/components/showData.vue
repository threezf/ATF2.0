<template>
	<div>
		<div class="new" v-if="hasUploaded">
			<p v-if="hasUploaded" style="margin: 10px 0;">源文件词向量</p>
			<el-table
				:data="tableContent"
				stripe
				border
				highlight-current-row
				style="width: 100%"
				height="340"
			>
				<el-table-column
					v-for="(header, index) in tableHeader"
					:fixed="index < 1"
					:key="index"
					:prop="header.prop"
					:label="header.label"
					align="center"
					width="180"
				>
				</el-table-column>
			</el-table>
			<p v-if="hasUploaded" style="margin: 10px 0;">测试文件词向量</p>
			<el-table
				:data="tableContent1"
				stripe
				border
				highlight-current-row
				style="width: 100%"
				height="340"
			>
				<el-table-column
					v-for="(header, index) in tableHeader"
					:fixed="index < 2"
					:key="index"
					:prop="header.prop"
					:label="header.label"
					align="center"
					width="180"
				>
				</el-table-column>
			</el-table>
		</div>
		<div class="loading-modal" v-if="!hasUploaded">
			<div class="loading">
				<RadialProgressBar
					:diameter="200"
					:completed-steps="completedSteps"
					:total-steps="totalSteps"
				>
					<p>向量生成中...</p>
					<p style="font-size: 20px; margin-top: -15px;">
						{{ completedSteps | percent }}
					</p>
				</RadialProgressBar>
			</div>
		</div>
	</div>
</template>

<script>
import { LetterHeader } from "./tableConf";
import Request from "@/libs/request.js";
import RadialProgressBar from "vue-radial-progress";
import { mapGetters, mapState } from "vuex";

export default {
	name: "ShowData",
	components: {
		RadialProgressBar
	},
	data() {
		return {
			letterHeader: LetterHeader,
			letterData: [
				{
					prop1: "1",
					prop2: "2"
				}
			],
			timer: null,
			hasUploaded: false,
			completedSteps: 1,
			totalSteps: 100,
			tableContent: [],
			tableContent1: []
		};
	},
	filters: {
		percent(val) {
			return `${val}%`;
		}
	},
	computed: {
		letterObj() {
			return {
				data: this.letterData
			};
		},
		tableHeader() {
			let results = [
				{
					label: "key",
					prop: "key",
					width: 300
				}
			];
			for (let i = 1; i < 31; i++) {
				results.push({
					label: "vector-" + i + "",
					prop: i + ""
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
		getLetterData() {
			console.log(this.getMap);
			this.hasUploaded = false;
			this.completedSteps = 0;
			this.timer = setInterval(() => {
				if (this.completedSteps <= 98) {
					this.completedSteps += 1;
				}
			}, 10);
			setTimeout(() => {
				this.completedSteps = 100;
				setTimeout(() => {
					this.hasUploaded = true;
					if (this.hasUploaded) {
						clearInterval(this.timer);
					}
				}, 1000);
			}, 4500);
			const fileArr = [];
			if (this.getMap.get(this.baseFileName)) {
				fileArr.push({
					fileName:
						this.getMap.get(this.baseFileName) === "isbug"
							? "bug" + this.baseFileName + ".csv"
							: this.baseFileName + ".csv",
					preDir: this.basePath
				});
			} else {
				console.log("getMapList", this.getMapList[this.baseFileName]);
				this.getMapList.isbug.forEach(file => {
					fileArr.push({
						fileName: "bug" + file + ".csv",
						preDir: "isbug"
					});
				});
				this.getMapList.nobug.forEach(file => {
					fileArr.push({
						fileName: file + ".csv",
						preDir: "nobug"
					});
				});
			}
			if (this.getMap.get(this.expFileName)) {
				fileArr.push({
					fileName:
						this.getMap.get(this.expFileName) === "isbug"
							? "bug" + this.expFileName + ".csv"
							: this.expFileName + ".csv",
					preDir: this.expPath
				});
			} else {
				console.log("getMapList", this.getMapList[this.expFileName]);
				this.getMapList.isbug.forEach(file => {
					fileArr.push({
						fileName: "bug" + file + ".csv",
						preDir: "isbug"
					});
				});
				this.getMapList.nobug.forEach(file => {
					fileArr.push({
						fileName: file + ".csv",
						preDir: "nobug"
					});
				});
			}
			const requestList = [];
			fileArr.forEach((item, index) => {
				requestList.push(
					Request({
						url: "/visualBackend/word-vector/read",
						method: "post",
						params: {
							fileName: item.fileName,
							preDir: item.preDir
						}
					})
				);
			});
			Promise.all(requestList).then(res => {
				console.log(res);
				this.tableContent = [];
				this.tableContent1 = [];
				res.forEach((item, index) => {
					console.log(index);
					if (res.length === 2) {
						this.tableContent = res[0].tableContent;
						this.tableContent1 = res[1].tableContent;
					} else {
						console.log("is---", item);
						if (index % 2 === 0) {
							this.tableContent.push(
								...item.tableContent
									.filter(tableItem => tableItem.key != "0")
									.map(tableItem =>
										Object.assign({}, tableItem, {
											key: `${tableItem.key}`
										})
									)
							);
						} else {
							this.tableContent1.push(
								...item.tableContent
									.filter(tableItem => tableItem.key != "0")
									.map(tableItem =>
										Object.assign({}, tableItem, {
											key: `${tableItem.key}`
										})
									)
							);
						}
					}
				});
			});
		}
	},
	mounted() {
		this.hasUploaded = true;
		if (this.hasUploaded) {
			clearInterval(this.timer);
		}
	}
};
</script>

<style scoped>
.show-body {
	display: flex;
	width: 70vw;
	height: 30vh;
	border: 1px solid #eee;
	padding: 20px;
}
.table-item {
	width: 35vw;
	flex: 1;
}
.table-item:last-child {
	margin-left: 10px;
}
.new {
	margin: 0 10px;
	height: calc(100vh - 220px);
	width: 70vw;
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

<template>
	<div class="inner-container">
		<el-card class="upload-part" v-if="hasUploaded" shadow="hover">
			<div class="upload-area">
				<div class="upload-item">
					<b class="title">源文件</b>
					<el-upload
						id="base"
						drag
						ref="upload"
						class="upload-demo"
						action="https://jsonplaceholder.typicode.com/posts/"
						:on-preview="handlePreview"
						:on-remove="handleRemove"
						:before-remove="beforeRemove"
						multiple
						:limit="1"
						:on-exceed="handleExceed"
						:file-list="fileList"
						:on-change="handleBaseChange"
						:auto-upload="false"
					>
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">
							将文件拖到此处，或<em>点击上传</em>
						</div>
					</el-upload>
				</div>
				<div class="upload-item">
					<b class="title">测试文件</b>
					<el-upload
						drag
						ref="upload"
						class="upload-demo"
						action="https://jsonplaceholder.typicode.com/posts/"
						:on-preview="handlePreview"
						:on-remove="handleRemove"
						:before-remove="beforeRemove"
						multiple
						:limit="1"
						:on-exceed="handleExceed"
						:file-list="expFileList"
						:on-change="handleExpChange"
						:auto-upload="false"
					>
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">
							将文件拖到此处，或<em>点击上传</em>
						</div>
					</el-upload>
				</div>
				<div class="upload-btn-part">
					<el-button
						class="upload-btn"
						style="margin-left: 10px;"
						size="small"
						type="success"
						@click="submitUpload"
						>上传到服务器</el-button
					>
				</div>
			</div>
		</el-card>
		<el-divider style="width: 54vw;" v-if="hasUploaded">文件列表</el-divider>
		<div class="file-list" v-if="hasUploaded">
			<el-card shadow="hover">
				<ShowFileList
					fileName="源文件"
					:fileList="fileNameLists1"
				></ShowFileList>
			</el-card>
			<el-card shadow="hover">
				<ShowFileList
					fileName="测试文件"
					:fileList="fileNameLists2"
				></ShowFileList>
			</el-card>
		</div>
		<div class="file-list" v-else>
			<div class="empty">上传后将显示文件列表</div>
		</div>
		<div class="loading-modal" v-if="!hasUploaded">
			<div class="loading">
				<RadialProgressBar
					:diameter="200"
					:completed-steps="completedSteps"
					:total-steps="totalSteps"
				>
					<p>文件处理中...</p>
					<p style="font-size: 20px; margin-top: -15px;">
						{{ completedSteps | percent }}
					</p>
				</RadialProgressBar>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import Request from "@/libs/request.js";
import ShowFileList from "./fileList.vue";
import RadialProgressBar from "vue-radial-progress";
export default {
	components: {
		ShowFileList,
		RadialProgressBar
	},
	data() {
		return {
			fileList: [],
			storeFileList: ["", ""],
			expFileList: [],
			fileNameLists1: [],
			fileNameLists2: [],
			hasUploaded: true,
			completedSteps: 1,
			totalSteps: 100
		};
	},
	filters: {
		percent(val) {
			return `${val}%`;
		}
	},
	methods: {
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handlePreview(file) {
			console.log(file);
		},
		handleExceed(files, fileList) {
			this.$message.warning(
				`当前限制选择 3 个文件，本次选择了 ${
					files.length
				} 个文件，共选择了 ${files.length + fileList.length} 个文件`
			);
		},
		beforeRemove(file, fileList) {
			return this.$confirm(`确定移除 ${file.name}？`);
		},
		submitUpload() {
			this.hasUploaded = true;
			this.completedSteps = 0;
			let promiseList = [];
			const pathList = [
				"/visualBackend/java-file/read_originFile",
				"/visualBackend/java-file/read_targetFile"
			];
			this.storeFileList.forEach((file, index) => {
				promiseList.push(
					Request({
						url: pathList[index],
						method: "post",
						params: {
							// dirName: file
						}
					})
				);
			});
			this.hasUploaded = false;
			let timer = setInterval(() => {
				if (this.completedSteps <= 98) {
					this.completedSteps += 1;
				}
			}, 50);
			Promise.all(promiseList)
				.then(res => {
					console.log(res);
					this.$store.commit("showStore/setUploaded");
					this.fileNameLists1 = res[0].fileTitleList.map(item => ({
						name: item
					}));
					this.fileNameLists2 = res[1].fileTitleList.map(item => ({
						name: item
					}));
				})
				.catch(err => {});
			setTimeout(() => {
				this.completedSteps = 100;
				setTimeout(() => {
					this.hasUploaded = true;
					if (this.hasUploaded) {
						clearInterval(timer);
					}
				}, 1000);
			}, 4500);
		},
		handleBaseChange(file, filelist) {
			console.log(
				document.querySelector("#base .el-upload .el-upload__input").files[0]
					.name,
				file,
				"path"
			);
			this.storeFileList[0] =
				file.name.indexOf("zip") > -1 ? file.name.split(".")[0] : file.name;
			this.$store.commit("showStore/setBaseFileName", this.storeFileList[0]);
			this.$store.commit("showStore/setBasePath", this.storeFileList[0]);
		},
		handleExpChange(file) {
			this.storeFileList[1] =
				file.name.indexOf("zip") > -1 ? file.name.split(".")[0] : file.name;
			this.$store.commit("showStore/setExpFileName", this.storeFileList[1]);
			this.$store.commit("showStore/setExpPath", this.storeFileList[1]);
		}
	}
};
</script>

<style scoped>
.inner-container {
	width: 100%;
	justify-content: center;
}
.upload-part {
	height: 32vh;
	width: 54vw;
	margin: 0 auto;
	border: 1px solid #eee;
}
.upload-area {
	width: 52vw;
	display: flex;
	margin: 0 auto;
	justify-content: space-between;
	margin-top: 20px;
}
.title {
	margin: 10px 0;
}
.upload-item {
	flex: 1;
	width: 25vw;
	text-align: center;
}
.file-list {
	width: 1000px;
	height: 47vh;
	margin: 0 auto;
	display: flex;
	justify-content: space-around;
}
.empty {
	height: 46vh;
	width: 700px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: gray;
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
.upload-btn-part {
	display: flex;
	align-items: flex-end;
	padding-bottom: 4px;
}
</style>

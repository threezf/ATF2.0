<template>
	<div class="inner-container">
		<el-card class="upload-part" v-if="hasUploaded" shadow="hover">
			<div class="upload-area">
				<div class="upload-item">
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
				<ShowFileList fileName="" :fileList="fileNameLists"></ShowFileList>
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
			storeFileName: "",
			expFileList: [],
			fileNameLists: [],
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
			this.hasUploaded = false;
			let timer = setInterval(() => {
				if (this.completedSteps <= 98) {
					this.completedSteps += 1;
				}
			}, 50);
			Request({
				url: "/visualBackend/in-project/read_file",
				method: "post",
				params: {
					rarName: this.storeFileName.split(".")[0]
				}
			})
				.then(res => {
					console.log(res);
					this.$store.commit("innerProject/setUploaded");
					this.fileNameLists = res.fileNameList.map(item => ({
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
			this.storeFileName =
				file.name.indexOf("zip") > -1 ? file.name.split(".")[0] : file.name;
			this.$store.commit("innerProject/setRarName", this.storeFileName);
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
	width: 34vw;
	margin: 0 auto;
	border: 1px solid #eee;
}
.upload-area {
	width: 32vw;
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
	width: 700px;
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

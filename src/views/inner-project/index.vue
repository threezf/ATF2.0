<template>
	<div class="body">
		<el-steps
			align-center
			finish-status="success"
			:active="activeStep"
			@click="handleStepClick"
		>
			<el-step
				v-for="(step, index) in stepLists"
				:key="index"
				:title="step.title"
				:icon="step.icon"
			>
			</el-step>
		</el-steps>
		<main class="viewPort">
			<div class="trans-view">
				<UploadView ref="upload" v-show="activeStep === 0"> </UploadView>
				<ResultView ref="result" v-show="activeStep === 1"> </ResultView>
			</div>
			<div class="operation-row">
				<el-tooltip placement="top" content="上一步">
					<el-button
						size="small"
						type="primary"
						:disabled="activeStep === 0"
						@click="toPre"
						>上一步
					</el-button>
				</el-tooltip>
				<el-button
					size="small"
					type="primary"
					:disabled="activeStep === 1 || !uploaded"
					@click="toNext"
				>
					{{ names[activeStep] }}
				</el-button>
			</div>
		</main>
	</div>
</template>

<script>
import UploadView from "./components/uploadView.vue";
import ResultView from "./components/resultView.vue";
import { mapGetters, mapState } from "vuex";
export default {
	name: "Login",
	components: {
		UploadView,
		ResultView
	},
	data() {
		return {
			activeStep: 0,
			stepLists: [
				{
					title: "上传文件",
					icon: "el-icon-upload"
				},
				{
					title: "查看结果",
					icon: "el-icon-tickets"
				}
			],
			names: ["下一步，预测结果", "结束"]
		};
	},
	computed: {
		...mapState("innerProject", {
			uploaded: "uploaded"
		})
	},
	methods: {
		handleStepClick(val) {
			console.log(val);
		},
		toPre() {
			if (this.activeStep > 0) {
				this.activeStep--;
			}
		},
		toNext() {
			if (this.activeStep < 1) {
				this.activeStep++;
				switch (this.activeStep) {
					case 1:
						this.$refs.result.getResult();
						break;
					default:
						break;
				}
			}
		}
	}
};
</script>

<style scoped>
.body {
	width: 80vw;
	height: calc(100vh);
	padding: 20px;
	margin: 0px auto;
	border: 1px solid #eee;
	box-sizing: border-box;
	background: white;
	display: flex;
	flex-direction: column;
}
.viewPort {
	flex: 1;
	display: flex;
	flex-direction: column;
}
.trans-view {
	flex: 1;
}
.operation-row {
	position: absolute;
	bottom: 10px;
	left: 50%;
	transform: translate(-50%);
	display: flex;
	justify-content: center;
	height: 32px;
	margin-bottom: 10px;
}
</style>

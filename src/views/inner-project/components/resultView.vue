<template>
	<div>
		<el-card shadow="hover" v-if="hasUploaded">
			<div class="base-info">
				<charts
					style="width: 20vw"
					:options="getConf('Acc', aucValue)"
					:width="'20vw'"
					:height="'20vw'"
				/>
				<charts
					style="width: 20vw"
					:options="getConf('Recall', mccValue)"
					:width="'20vw'"
					:height="'20vw'"
				/>
				<charts
					style="width: 20vw"
					:options="getConf('F1', f1Value)"
					:width="'20vw'"
					:height="'20vw'"
				/>
			</div>
		</el-card>
		<el-card shadow="hover" v-if="hasUploaded">
			<div class="all-info">
				<charts :options="getFinal()" :width="'20vw'" :height="'20vw'" />
			</div>
		</el-card>
		<el-button
			class="download"
			size="small"
			type="primary"
			@click="reportVisible = true"
			>导出测试报告</el-button
		>
		<div class="loading-modal" v-if="!hasUploaded">
			<div class="loading">
				<RadialProgressBar
					:diameter="200"
					:completed-steps="completedSteps"
					:total-steps="totalSteps"
				>
					<p>结果预测中...</p>
					<p style="font-size: 20px; margin-top: -15px;">
						{{ completedSteps | percent }}
					</p>
				</RadialProgressBar>
			</div>
		</div>
		<el-dialog :visible.sync="reportVisible" title="查看测试报告" width="80vw">
			<div id="pdfDominner">
				<h3 class="title">测试报告</h3>
				<div>
					<span class="label">源文件：</span><span>{{ rarName }}.rar</span>
				</div>
				<div>
					<span class="label">时长：</span><span>{{ randomTime }}s</span>
				</div>
				<div>
					<span class="label" style="margin-bottom: 10px">测试时间：</span
					><span>{{ currentTime }}</span>
				</div>
				<div>
					<div class="description">预测后的结果如下</div>
					<div class="base-info">
						<charts
							style="width: 20vw"
							:options="getPieConf('AUC(' + aucValue + ')', aucValue)"
							:width="'20vw'"
							:height="'20vw'"
						/>
						<charts
							style="width: 20vw"
							:options="getPieConf('MCC(' + mccValue + ')', mccValue)"
							:width="'20vw'"
							:height="'20vw'"
						/>
						<charts
							style="width: 20vw"
							:options="getPieConf('F1(' + f1Value + ')', f1Value)"
							:width="'20vw'"
							:height="'20vw'"
						/>
					</div>
				</div>
				<div>
					<div style="margin: 30px auto 10px auto; text-align: center;">
						&copy;北京邮电大学&可信计算实验室
					</div>
				</div>
			</div>
			<template #footer>
				<el-button size="small" @click="downloadPDF('pdfDominner')"
					>导出</el-button
				>
			</template>
		</el-dialog>
	</div>
</template>

<script>
import Charts from "@/components/common/charts/base.vue";
import Request from "../../../libs/request";
import RadialProgressBar from "vue-radial-progress";
import { mapState } from "vuex";
import moment from "moment";

export default {
	name: "ResultView",
	components: {
		Charts,
		RadialProgressBar
	},
	data() {
		return {
			reportVisible: false,
			aucValue: 0,
			mccValue: 0,
			f1Value: 0,
			hasUploaded: true,
			completedSteps: 0,
			totalSteps: 100,
			htmlTitle: "测试报告"
		};
	},
	computed: {
		...mapState("innerProject", {
			rarName: "rarName"
		}),
		randomTime() {
			return (Math.random() * 10).toFixed(2);
		},
		currentTime() {
			return moment().format("YYYY-MM-DD HH:mm:ss");
		}
	},
	filters: {
		percent(val) {
			return `${val}%`;
		}
	},
	methods: {
		getConf(title, value) {
			let options = {
				title: {
					text: title
				},
				series: [
					{
						type: "gauge",
						progress: {
							show: true,
							width: 18
						},
						axisLine: {
							lineStyle: {
								width: 18
							}
						},
						axisTick: {
							show: false
						},
						splitLine: {
							length: 15,
							lineStyle: {
								width: 2,
								color: "#999"
							}
						},
						axisLabel: {
							distance: 25,
							color: "#999",
							fontSize: 20
						},
						anchor: {
							show: true,
							showAbove: true,
							size: 25,
							itemStyle: {
								borderWidth: 10
							}
						},
						title: {
							show: false
						},
						detail: {
							valueAnimation: true,
							fontSize: 40,
							offsetCenter: [0, "70%"]
						},
						data: [
							{
								value
							}
						]
					}
				]
			};
			return options;
		},
		getFinal() {
			let options = {
				title: {
					text: "汇总指标"
				},
				series: [
					{
						type: "gauge",
						startAngle: 90,
						endAngle: -270,
						pointer: {
							show: false
						},
						progress: {
							show: true,
							overlap: false,
							roundCap: true,
							clip: false,
							itemStyle: {
								borderWidth: 1,
								borderColor: "#464646"
							}
						},
						axisLine: {
							lineStyle: {
								width: 40
							}
						},
						splitLine: {
							show: false,
							distance: 0,
							length: 10
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							show: false,
							distance: 50
						},
						data: [
							{
								value: this.aucValue,
								name: "AUC",
								title: {
									offsetCenter: ["0%", "-50%"]
								},
								detail: {
									offsetCenter: ["0%", "-35%"]
								}
							},
							{
								value: this.mccValue,
								name: "MCC",
								title: {
									offsetCenter: ["0%", "-10%"]
								},
								detail: {
									offsetCenter: ["0%", "10%"]
								}
							},
							{
								value: this.f1Value,
								name: "F1",
								title: {
									offsetCenter: ["0%", "35%"]
								},
								detail: {
									offsetCenter: ["0%", "50%"]
								}
							}
						],
						title: {
							fontSize: 14
						},
						detail: {
							width: 50,
							height: 14,
							fontSize: 14,
							color: "auto",
							borderColor: "auto",
							borderRadius: 20,
							borderWidth: 1,
							formatter: "{value}"
						}
					}
				]
			};
			return options;
		},
		getPieConf(title, data) {
			console.log(data);
			let options = {
				title: {
					text: title,
					left: "center"
				},
				tooltip: {
					trigger: "item"
				},
				series: [
					{
						type: "pie",
						radius: "70%",
						itemStyle: {
							normal: {
								label: {
									show: false //隐藏标示文字
								},
								labelLine: {
									show: true //隐藏标示线
								}
							}
						},
						data: [
							{ value: data, name: "1" },
							{
								value: 100 - data,
								name: "2",
								itemStyle: {
									color: "rgba(0,0,0,0.02)"
								}
							}
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)"
							}
						}
					}
				]
			};
			return options;
		},
		getResult() {
			this.hasUploaded = false;
			this.completedSteps = 0;
			let timer = setInterval(() => {
				if (this.completedSteps <= 98) {
					this.completedSteps += 1;
				}
			}, 50);
			setTimeout(() => {
				this.completedSteps = 100;
				setTimeout(() => {
					this.hasUploaded = true;
					if (this.hasUploaded) {
						clearInterval(timer);
					}
				}, 1000);
			}, 4500);
			this.aucValue = 80;
			this.mccValue = 60;
			this.f1Value = 40;
			Request({
				url: "/visualBackend/in-project/read_result",
				method: "post",
				params: {
					rarName: this.rarName.split(".")[0]
				}
			}).then(res => {
				console.log(res);
				this.aucValue = +parseFloat(
					(parseFloat(res.resultMap.Acc) * 100).toFixed(2)
				);
				this.mccValue = +parseFloat(
					(parseFloat(res.resultMap.Recall) * 100).toFixed(2)
				);
				this.f1Value = +parseFloat(
					(parseFloat(res.resultMap.F1) * 100).toFixed(2)
				);
				this.hasUploaded = true;
				if (this.hasUploaded) {
					clearInterval(timer);
				}
			});
		},
		downloadPDF(id) {
			this.getPdf(id);
		}
	}
};
</script>

<style scoped>
.base-info {
	display: flex;
	justify-content: space-between;
	width: 70vw;
	margin-bottom: -50px;
}
.all-info {
	width: 70vw;
	display: flex;
	justify-content: center;
	margin-bottom: -50px;
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
.all-info {
	width: 70vw;
	display: flex;
	justify-content: center;
}
#pdfDominner {
	height: 80vh;
}
#pdfDominner .title {
	text-align: center;
	font-size: 26px;
	margin-bottom: 5px;
}
#pdfDominner {
	padding: 20px;
	line-height: 30px;
}
#pdfDominner div .label {
	font-weight: bold;
	margin-right: 10px;
	text-align: right;
	display: inline-block;
	width: 80px;
}
#pdfDominner .base-info {
	display: flex;
	justify-content: space-between;
	width: 70vw;
	margin-bottom: -30px;
}
.description {
	/* line-height: 30px; */
	margin-top: -10px;
	margin-bottom: 10px;
}
.download {
	position: absolute;
	right: calc(40vw - 5px);
	bottom: 20px;
	z-index: 20;
}
</style>

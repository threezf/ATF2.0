<template>
	<div>
		<!--    <div  onmousemove="console.log('x+' + window.event.x + 'y:' + window.event.y)">-->
		<!--        <div id="quicklyStart">-->
		<!--            <el-tooltip content="体验最简洁的测试流程" placement="top"  href="./quicklyTransact.html">-->
		<!--                <el-button>-->
		<!--                    <router-link :to="{name:'QuicklyStart'}">-->
		<!--                        快速开始-->
		<!--                    </router-link>-->
		<!--                </el-button>-->
		<!--            </el-tooltip>-->


		<div style="height:30px"></div>
		<page>
			<el-row>
				<el-col :offset="1" :span="6">
					<a href="#" class="blueButton big blue">
						<p>新用户入口</p>
						<p style="font-size: 16px">快速学习，10分钟学会自动化测试流程</p>
						<div class="littleButton" style="color: #3a6afa">去测试</div>
					</a>
				</el-col>
                <el-col  :span="6" style="margin-left: 15px">
                    <a href="#" class="blueButton big green">
                        <p>老用户入口</p>
                        <p style="font-size: 16px">适用于已熟悉自动化测试流程的用户</p>
                        <div class="littleButton" style="color: #89d228">去测试</div>
                    </a>
				</el-col>
				<el-col :offset="1" :span="9">
					<div style="font-size: 28px;color:#3a6afa">
						<i class="el-icon-cloudy"></i>
					    ATF测试云工具
					</div>
					<el-divider></el-divider>
					<div style="margin-top: 15px">ATF是一个适用范围涵盖了整个测试工作的生命周期的自动化测试工具，包括测试各阶段的管理、资源分配、测试执行等模块。</div>
				</el-col>
			</el-row>
		</page>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				currentDate: new Date()
			}
		},
		watch: {},
		mounted() {

		},
		methods: {}
	}
</script>
<script>
	function f() {
		var value = "x:" + window.event.x + " y:" + window.event.y
		console.log(value)
	}
</script>
<style lang="less" scoped>
	.home-page {
		width: 1200px;
		margin: 0 auto;
		padding-top: 25px;
	}

	#quicklyStart {
		position: relative;;
		top: 30px;
		left: 40px;

	}

	.blue {
		color: #FFF !important;
		border: 1px solid #84acc3 !important;
		background-color: #007bffe3;
		background-image: url(../assets/images/bubble.png), url(../assets/images/bubble.png),
		-webkit-gradient(radial, 50% 100%, 0, 50% 100%, 100,
		from(rgba(89, 208, 244, 1)), to(rgba(89, 208, 244, 0))),
		-webkit-gradient(linear, 0% 0%, 0% 100%, from(#4fbbf7), to(#3faeeb));
		font-size: 30px;

	}

	.green {
		color: #FFF !important;
		border: 1px solid #96a37b !important;
		background-color: #79be1e;
		background-image: url(../assets/images/bubble.png), url(../assets/images/bubble.png),
		-webkit-gradient(radial, 50% 100%, 0, 50% 100%, 100, from(rgba(162, 211, 30, 1)),
        to(rgba(162, 211, 30, 0))),
        -webkit-gradient(linear, 0% 0%, 0% 100%, from(#82cc27), to(#74b317));
	}

	.blue:hover {
		background-color: #63c7fe;
		background-image: url(../assets/images/bubble.png), url(../assets/images/bubble.png),
		-webkit-gradient(radial, 50% 100%, 0, 50% 100%, 100,
		from(rgba(109, 217, 250, 1)), to(rgba(109, 217, 250, 0))),
		-webkit-gradient(linear, 0% 0%, 0% 100%, from(#63c7fe), to(#58bef7));
	}
    .green:hover{
		background-color: #89d228;
        background-image: url(../assets/images/bubble.png), url(../assets/images/bubble.png),
        -webkit-gradient(radial, 50% 100%, 0, 50% 100%, 100, from(rgba(183,229,45,1)), to(rgba(183,229,45,0))),
        -webkit-gradient(linear, 0% 0%, 0% 100%, from(#90de31), to(#7fc01e));
	}
	.blueButton {
		width:336px;
		font: 30px 微软雅黑;
		/*text-shadow: 1px 1px 0 rgb(255,255,255,0.4);*/
		text-decoration: none !important;
		white-space: nowrap;
		display: inline-block;
		vertical-align: baseline;
		position: relative;
		cursor: pointer;
		padding: 30px 30px;
		background-repeat: no-repeat;
		background-position: bottom left;
		background-image: url(../assets/images/bubble.png);
		background-position: bottom left, top right, 0 0, 0 0;
		background-clip: border-box;
		-moz-border-radius: 8px;
		-webkit-border-radius: 8px;
		border-radius: 8px;
		-moz-box-shadow: 0 0 1px #fff inset;
		-webkit-box-shadow: 0 0 1px #fff inset;
		box-shadow: 0 0 1px #fff inset;
		-webkit-transition: background-position 1s;
		-moz-transition: background-position 1s;
		transition: background-position 1s;
	}

	.blueButton:hover {
		background-position: top left, bottom right, 0 0, 0 0;
	}

	.blueButton:active {
		bottom: -1px;
	}
	.littleButton{
		width:80px;
		height:30px;
		background-color: #FFF;
		font-size: 16px;
		padding: 4px 15px;
		opacity: .9;
		border-radius: 20px;
	}
</style>{

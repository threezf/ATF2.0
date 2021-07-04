<template>
	<div id="app">
		<div v-if="menuShow" class="sider-bar">
			<el-menu
				:default-active="activeIndex"
				class="el-menu-vertical-demo"
				@select="handleSelect"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b"
			>
				<el-menu-item index="show">
					<i class="el-icon-menu"></i>
					<span slot="title" style="font-size: 18px">跨项目</span>
				</el-menu-item>
				<el-menu-item index="inner-project">
					<i class="el-icon-setting"></i>
					<span slot="title" style="font-size: 18px">项目内</span>
				</el-menu-item>
			</el-menu>
		</div>
		<div class="router">
			<keep-alive>
				<router-view />
			</keep-alive>
		</div>
	</div>
</template>

<script>
export default {
	name: "App",
	data() {
		return {
			activeIndex: "show",
			menuShow: false
		};
	},
	watch: {
		$route: {
			handler(newVal) {
				if (
					newVal.fullPath &&
					(newVal.fullPath === "/show" ||
						newVal.fullPath === "inner-project" ||
						newVal.fullPath === "/inner-project")
				) {
					this.menuShow = true;
					// if (newVal.fullPath === "/inner-project") {
					// 	this.$router.push({
					// 		name: "InnerProject"
					// 	});
					// } else {
					// 	this.activeIndex = newVal.fullPath.slice(1);
					// }
					if (
						newVal.fullPath === "/show" ||
						newVal.fullPath === "/inner-project"
					) {
						this.activeIndex = newVal.fullPath.slice(1);
					}
					if (
						newVal.fullPath === "inner-project" ||
						newVal.fullPath === "/inner-project"
					) {
						this.$router.push({
							name: "InnerProject"
						});
					}

					console.log(newVal.fullPath.slice(0));
				} else {
					this.menuShow = false;
				}
			},
			immediate: true
		}
	},
	mounted() {
		console.log(this.$route);
		this.activeIndex = this.$route.path.slice(1);
	},
	methods: {
		handleSelect(key) {
			this.activeIndex = key;
			switch (key) {
				case "show":
					this.$router.push({
						name: "Show"
					});
					break;
				case "inner-project":
					this.$router.push({
						name: "InnerProject"
					});
					break;
			}
		}
	}
};
</script>

<style scoped>
#app {
	display: flex;
}
.sider-bar {
	width: 240px;
	height: 100vh;
	background-color: rgb(84, 92, 100);
}
.router {
	flex: 1;
}
</style>

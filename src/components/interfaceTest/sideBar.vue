<template>
    <div :class="isCollapse?'narrow-side-bar':'side-bar'">
        <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @select="handleSelect"
                background-color="#F2F2F2">
					<el-row>
						<span v-show="!isCollapse" class="span-group">分组
						</span>
						<el-button class="isCollapse-button" @click="isCollapse=!isCollapse" icon="el-icon-open"></el-button>
					</el-row>
						<el-menu-item index="0" class="itemAll">
							<i class="el-icon-s-operation"></i>
							<span slot="title">所有接口</span>
						</el-menu-item>
            <!-- 引入组件 -->
            <MenuTree :menuData="menuList" :isCollapse="isCollapse"></MenuTree>

        </el-menu>
    </div>
</template>

<script>
    import MenuTree from "@/components/interfaceTest/MenuTree";

export default {
        name: "Nav",
        components: {
            MenuTree: MenuTree,
        },
				props:{
					menuList: {
						type: Array,
						default: []
					},
				},
        data() {
            return {
                menuData : [],
                // menuList : [{
                //     id: "1",
                //     groupName: "用户模块",
								// 		childNodeList: [{
								// 			id: "2",
								// 			groupName: "账号相关",
								// 			childNodeList: [{
								// 					id: "3",
								// 					groupName: "用户登录",
                //         }, {
								// 					id: "4",
								// 					groupName: "用户注销",
                //         }],
                //     }]
                // }, {
								// 	id: "5",
								// 	groupName: "企业模块",
                // }, {
								// 	id: "6",
								// 	groupName: "测试模块",
                // }, {
								// 	id: "7",
								// 	groupName: "日志模块",
                // }],
							isCollapse: false,
            }
        },
         methods: {
            handleSelect(key, keyPath) {
							var length = keyPath.length;
							console.log(key, keyPath[length-1]);
							if(key === '0'){
								this.$emit('getAllTableData')
							}else {
								this.$emit('getTableDataByIndex',keyPath[length-1])
							}
            },
    }
};
</script>

<style lang="less" scoped>
.side-bar {
	border-top:1px solid  #DDD;
	width: 240px;
	flex-shrink: 0;
	min-height: calc(100vh - 90px);
	.el-menu-vertical-demo {
		min-height: 400px;
		height: 100%;
	}
}

.narrow-side-bar {
	width: 90px;
	flex-shrink: 0;
	min-height: calc(100vh - 90px);
	.el-menu-vertical-demo {
		min-height: 400px;
		height: 100%;
	}
}
.el-menu-item {
	font-size: 14px;
}
.isCollapse-button{
	border: 0;
	background-color: #F2F2F2;
	float: right;
	font-size: 20px;

}
.itemAll {
	border-bottom:1px dashed  #CCC;
	border-top:1px solid  #DDD;
	text-decoration : none;
	text-align:center;
	padding-right:40px;
}
.span-group{
	margin-left: 20px;
	font-weight: bold;
	font-size: 24px;
	padding: 10px 0;
}
</style>

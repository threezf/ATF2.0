<template>
    <div>
        <template v-for="menu in menuData">
            <el-submenu :key="menu.id" :index="String(menu.id)" style="text-align:center" v-if="menu.childNodeList" >
                <template slot="title">
                        <span slot="title" :class="isCollapse? 'isisCollapse-span':'open-span'">{{menu.groupName}}</span>
                </template>
                <MenuTree :menuData="menu.childNodeList" :isCollapse="isCollapse"></MenuTree>
            </el-submenu>
            <el-menu-item :key="menu.id" :index="String(menu.id)" style="text-align:center"  v-else>
                    <span slot="title" :class="isCollapse? 'isisCollapse-span':'open-span'">{{menu.groupName}}
                    </span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>

    export default {
        name: "MenuTree",
        props:{
            menuData: {
                type: Array,
                default: []
            },
					isCollapse: {
						type: Boolean,
						default: false
					},
        },
        components:{
        },

    }
</script>

<style lang="less" scoped>
    .el-menu-item {
        font-size: 14px  !important;
    }
		.isisCollapse-span {
			height: 0;
			width: 0;
			overflow: hidden;
			visibility: hidden;
			display: inline-block;
		}
		.open-span {
			width: auto;
			visibility: visible;
		}
</style>

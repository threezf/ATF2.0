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
										<el-tag v-if="menu.method>=0" size="small"  :type="menu.method | getType">
											{{menu.method | getMethod}}
										</el-tag>
                    <span slot="title" :class="isCollapse? 'isisCollapse-span':'open-span'">{{menu.groupName}}
                    </span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
		let that;
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
			data(){
        	return{
						methodOptions: [{
							value: 0,
							method: 'POST'
						}, {
							value: 1,
							method: 'GET'
						}, {
							value: 2,
							method: 'DELETE'
						}, {
							value: 3,
							method: 'PUT'
						}],
					}
			},
			beforeCreate: function () {
				that = this;
			},
        components:{
        },
			filters: {
				getMethod(val) {
					for ( let item in that.methodOptions){
						let option = that.methodOptions[item]
						if(option.value === val){
							return option.method
						}
					}
				},
				getType(val) {
					return val === 0 ? 'success' : val === 1 ? 'primary' :  val === 2 ? 'danger' : 'warning'
				}
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

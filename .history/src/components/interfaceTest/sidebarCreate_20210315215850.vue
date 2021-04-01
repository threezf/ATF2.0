<template>
    <div :class="isCollapse?'narrow-side-bar':'side-bar'">
        <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @select="handleSelect"
                background-color="#E7E7E7"
                :collapse="isCollapse">
                <el-row>
                    <el-button v-show="!isCollapse" class="newInterface-button"  @click="newInterfeace" type="primary" size="small">
                        <i class="el-icon-plus"></i>创建接口
                    </el-button>
                    <el-button class="isCollapse-button" @click="isCollapse=!isCollapse" icon="el-icon-open"></el-button>
                </el-row>
                <el-menu-item index="0" style="text-align:center;padding-right:40px">
                    <i class="el-icon-s-operation"></i>
                    <span slot="title">所有接口</span>
                </el-menu-item>
            <!-- 引入组件 -->
            <MenuAndDropdown :menuData="menuList"></MenuAndDropdown>
            
        </el-menu>
    </div>
</template>
 
<script>
    import MenuTree from "@/components/interfaceTest/MenuTree";
    import MenuAndDropdown from "@/components/interfaceTest/MenuAndDropdown";
 
export default {
        name: "Nav",
        components: {
            MenuTree: MenuTree,
            MenuAndDropdown: MenuAndDropdown
        },
        data() {
            return {
                menuData : [],
                isCollapse: false,
                menuList : [{
                    index: "1",
                    name: "用户模块",
                    children: [{
                        index: "2",
                        name: "账号相关",
                        children: [{
                            index: "3",
                            name: "用户登录",
                        }, {
                            index: "4",
                            name: "用户注销",
                        }],
                    }]
                }, {
                    index: "5",
                    name: "企业模块",
                }, {
                    index: "6",
                    name: "测试模块",
                }, {
                    index: "7",
                    name: "日志模块",
                }]
            }
        },
         methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            newInterface(){
                this.$message('创建接口');
            }
    }
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
    min-height: 400px;
    height: 100%;
  }
.side-bar {
    width: 200px;
    flex-shrink: 0;
}

.narrow-side-bar {
    width: 90px;
    flex-shrink: 0;
}
.radioGroup .el-divider--horizontal{
	margin:0 !important;
}
	.radioGroup label{
		margin-bottom: 0;
        margin-left: 150px !important;
	}
    .radioGroup .el-radio-button--small .el-radio-button__inner{
        padding:6px 8px !important;
}
.el-menu-item {
    font-size: 14px;
}
.isCollapse-button{
    border: 0;
    background-color: #E7E7E7;
    float: right;
    font-size: 20px;
    margin-top: 5px;
}
.newInterface-button{
    margin:10px 0 0 30px
}
</style>
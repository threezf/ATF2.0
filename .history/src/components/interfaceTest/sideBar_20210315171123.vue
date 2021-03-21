<template>
    <div>
        <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @select="handleSelect">
            <!-- 引入组件 -->
            <el-row>
              <el-col :span="12">
                <MenuTree :menuData="menuList"></MenuTree>
              </el-col>
              <el-col :span="12">
                <MenuAndDropdown :menuData="menuList"></MenuAndDropdown>
              </el-col>
            </el-row>
            
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
    }
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
    width: 600px;
    min-height: 400px;
    height: 100%;
  }
</style>
<template>
    <div>
        <div id="quicklyStart">
            <el-tooltip content="体验最简洁的测试流程" placement="top"  href="./quicklyTransact.html">
                <el-button>
                    <router-link :to="{name:'QuicklyStart'}">
                        快速开始
                    </router-link>
                </el-button>
            </el-tooltip>
            <!-- <a class="btn btn-white" type="button" href="/quicklyTransact" value="">
                快速开始 <i class="icon-question-sign"></i>
            </a>
            <div id = "quicklyInfo">

                <span>体验最简洁的测试流程</span>
                <div class="triangle"></div>
            </div> -->
        </div>
        <img  src="../assets/Operationflow.png" width="68%"  usemap="#Map" style="margin: -35px 220px 0 220px;">
        <map name="Map" id = "CribMap">
            <area shape="rect" coords="590,280,705,310" href="./architecture.html"> <!--编写自动化构件库-->
            <area shape="rect" coords="450,280,550,310" href="./aut.html"> <!--被测系统管理-->
            <area shape="rect" coords="450,328,550,357" href="./aut.html" onclick="goHere('newfunpoint')"> <!--新建功能点-->
            <area shape="rect" coords="450,374,550,405" href="./aut.html" onclick="goHere('elelibrary')"> <!--配置元素库-->
            <area shape="rect" coords="450,421,550,452" href="./aut.html" onclick="goHere('basicscript')"> <!--生成基础脚本-->
            <area shape="rect" coords="251,420,352,451" href="./testplan-execute.html"> <!--批量执行-->
            <area shape="rect" coords="251,373,352,404" href="./scene.html"> <!--场景管理-->
            <area shape="rect" coords="251,327,352,356" href="./datatable.html"> <!--测试资源配置-->
            <area shape="rect" coords="251,289,352,310" href="./caseManagement.html"> <!--新增用例-->
            <area shape="rect" coords="251,490,352,520" href="./execution.html">   <!--执行记录查询-->
            <area shape="rect" coords="43,234,141,266" href="./testProject.html">   <!--新增测试项目-->
        </map>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                currentDate: new Date()
            }
        },
        watch: {

        },
        mounted() {

        },
        methods: {
            
        }
    }
</script>
<style lang="less" scoped>
    .home-page {
        width: 1200px;
        margin: 0 auto;
        padding-top: 25px;
    }
    #quicklyStart{
        position: relative;;
        top:30px;
        left:40px;

    }
</style>
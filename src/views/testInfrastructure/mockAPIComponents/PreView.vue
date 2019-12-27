<template>
    <div class="cardPreview">
        <el-row>
            <span 
                class="baseInfo"
                >基本信息
            </span>
        </el-row>
        <el-row
            class='rowStyle'>
            <el-col :span='12' :offset='0'>
                <span class="detailInfoTitle">
                    接口名称
                </span>
                <label class="labelContent">
                    {{expectationName}}
                </label>
            </el-col>
            <el-col :span='10' :offset='0'>
                <span class="detailInfoTitle">
                    创建人
                </span>
                <label class="labelContent">
                    {{creator}}
                </label>
            </el-col>
        </el-row>
        <el-row
            class='rowStyle'>
            <el-col :span='12' :offset='0'>
                <span class="detailInfoTitle">
                    更新时间
                </span>
                <label class="labelContent">
                    {{modifiedTime}}
                </label>
            </el-col>
        </el-row>
        <el-row
            class='rowStyle'>
            <el-col :span='12' :offset='0'>
                <span class="detailInfoTitle">
                    接口路径
                </span>
                <span class="mothodStyle">
                    {{method}}
                </span>
                <label class="labelContent">
                    {{expectationName}}
                </label>
            </el-col>
        </el-row>
        <el-row
            class='rowStyle'>
            <el-col :span='12' :offset='0'>
                <span class="detailInfoTitle">
                    Mock地址
                </span>
                <label class="labelContent">
                    {{path}}
                </label>
            </el-col>
        </el-row>
        <el-row>
            <span 
                class="returnData"
                >返回数据
            </span>
        </el-row>
        <pre 
            class='textareaStyle' 
            onresize 
            disabled>{{httpForwardEntity}}
        </pre>
    </div>
</template>

<<script>
    import Request from '@/libs/request.js'
    import VueMixins from '@/libs/vueMixins.js'
    import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
    export default {
        name:'preview',
        components: {ElSlPanel},
		mixins: [VueMixins], // 混入
        data() {
            return {
                expectationName: 'forward测试12',//接口名称
                creator: 'rui',//创建人
                modifiedTime: '1559398514000',//更新时间
                path: '/userController/pagedBatchQueryUser',//接口路径以及Mock路径
                method: 'POST',//方法
                httpForwardEntity:{"id":4,"host":"localhost","port":8088,"scheme":"HTTP"},//返回数据
            }
        },
        computed: {
            updateTime() {
                this.tranformTime(this.modifiedTime);
            },
        },
        created() {
            
        },
        methods: {
            tranformTime(currentTime){
                let time = new Date(currentTime);
                console.log('转化时间',time)
            }
        },
    }
</script>
<style scoped>
    .cardPreview {
        padding: 5px;
    }
    .baseInfo, .returnData {
        width: 100px;
        height: 34px;
        display: inline-block;
        background: #8175c7;
        padding-top:5px; 
        font-size: 18px;
        font-weight: bolder;
        border-radius: .25em;
        white-space: nowrap;
        color: #fff;
        text-align: center;
        margin-bottom: 10px
    }
    .returnData{
        margin-top: 60px;
    }
    .detailInfoTitle {
        width: 80px;
        height: 28px;
        display: inline-block;
        background: #bebec2;
        padding-top:4px; 
        font-size: 14px;
        font-weight: 400;
        border-radius: .25em;
        white-space: nowrap;
        color: #fff;
        text-align: center;
        margin-left: 10px
    }
    .mothodStyle {
        width: 60px;
        height: 28px;
        display: inline-block;
        background: rgb(45, 231, 144);
        padding-top:5px; 
        font-size: 14px;
        font-weight: bolder;
        border-radius: .25em;
        white-space: nowrap;
        color: #fff;
        text-align: center;
        margin-left: 10px
    }
    .rowStyle{
        margin-top: 20px;
    }
    .labelContent{
        margin-left: 5px;
        font-size: 16px;
    }
    /* 控制文字域样式 */
    .textareaStyle {
		border: 1px solid gray;
		border-radius: 8px;
        background:#f5f5f5;
		width: 94%;
		height: 337px;
		margin: 10px auto 10px auto;
		display: block;
		padding: 6px 12px;
		font-size: 17px;
        line-height: 22px;
        font-family: 'Times New Roman'
	}
</style>
<template>
  <div class="cardPreview">
    <el-row>
      <span class="baseInfo">基本信息</span>
    </el-row>
    <el-row class="rowStyle">
      <el-col :span="12" :offset="0">
        <span class="detailInfoTitle">接口名称</span>
        <label class="labelContent">{{expectationName}}</label>
      </el-col>
      <el-col :span="10" :offset="0">
        <span class="detailInfoTitle">创建人</span>
        <label class="labelContent">{{creator}}</label>
      </el-col>
    </el-row>
    <el-row class="rowStyle">
      <el-col :span="12" :offset="0">
        <span class="detailInfoTitle">更新时间</span> 
        <label class="labelContent">{{updateTime}}</label>
      </el-col>
    </el-row>
    <el-row class="rowStyle">
      <el-col :span="12" :offset="0">
        <span class="detailInfoTitle">接口路径</span>
        <span class="mothodStyle">{{method}}</span>
        <label class="labelContent">{{expectationName}}</label>
      </el-col>
    </el-row>
    <el-row class="rowStyle">
      <el-col :span="12" :offset="0">
        <span class="detailInfoTitle">Mock地址</span>
        <label class="labelContent">{{path}}</label>
      </el-col>
    </el-row>
    <el-row>
      <span class="returnData">返回数据</span>
    </el-row>
    <pre class="textareaStyle" onresize disabled>{{httpForwardEntity}}
        </pre>
  </div>
</template>

<script>
  import Request from "@/libs/request.js";
  import VueMixins from "@/libs/vueMixins.js";
  import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
  export default {
    name: "preview",
    components: { ElSlPanel },
    mixins: [VueMixins], // 混入
    data() {
      return {
        expectationName: "", //接口名称
        creator: "", //创建人
        modifiedTime: 0, //更新时间
        path: "", //接口路径以及Mock路径
        method: "", //方法
        httpForwardEntity: {} //返回数据
      };
    },
    computed: {
      updateTime() {
        return this.tranformTime(this.modifiedTime);
      }
    },
    created() {
      this.id = this.$route.query.id;
      this.getExpectationById(this.id);
    },
    mounted() {
      this.id = this.$route.query.id;
      this.getExpectationById(this.id);
    },
    methods: {
      //根据id获取信息
      getExpectationById(id) {
        let _this = this;
        let qs = require("qs");
        Request({
          url: "//mockServer/getExpectationById",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          method: "POST",
          params: qs.stringify({
            id: this.id
          })
        })
          .then(res => {
            _this.expectationName = res.expectationName;
            _this.creator = res.creator;
            _this.modifiedTime = res.modifiedTime;
            _this.path = res.httpRequest.path;
            _this.method = res.httpRequest.method;
            _this.httpForwardEntity =
              res.httpForwardEntity != null
                ? res.httpForwardEntity
                : res.httpResponse;
          })
          .catch(err => {
            console.log("getExpectationById失败", err);
          });
      },
      //时间格式转换
      tranformTime(modifiedTime) {
        let time = new Date(modifiedTime);
        let year = time.getFullYear();
        let month =
          time.getMonth() + 1 >= 10
            ? time.getMonth() + 1
            : "0" + (time.getMonth() + 1);
        let date = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
        let hour =
          time.getHours() >= 10 ? time.getHours() : "0" + time.getHours();
        let minute =
          time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes();
        let second =
          time.getSeconds() >= 10 ? time.getSeconds() : "0" + time.getSeconds();
        let transTime =
          year +
          "-" +
          month +
          "-" +
          date +
          " " +
          hour +
          ":" +
          minute +
          ":" +
          second;
        // console.log('转化时间',transTime);
        return transTime;
      }
    }
  };
</script>
<style scoped>
  .cardPreview {
    padding: 5px;
  }
  .baseInfo,
  .returnData {
    width: 110px;
    height: 38px;

    display: inline-block;
    background: #409eff;
    padding-top: 6px;
    font-size: 18px;
    font-weight: bolder;
    border-radius: 0.25em;
    white-space: nowrap;
    color: #fff;
    text-align: center;

  }
  .returnData {
    margin-top: 30px;
  }
  .detailInfoTitle {
    width: 80px;
    height: 30px;
    display: inline-block;
    background: #bebec2;
    padding-top: 4px;
    font-size: 14px;
    font-weight: 400;
    border-radius: 0.25em;
    white-space: nowrap;
    color: #fff;
    text-align: center;
    margin-left: 20px;
  }
  .mothodStyle {
    width: 70px;
    height: 28px;
    display: inline-block;
    background: rgb(45, 231, 144);
    padding-top: 5px;
    font-size: 14px;
    font-weight: bolder;
    border-radius: 0.25em;
    white-space: nowrap;
    color: #fff;
    text-align: center;
    margin-left: 10px;
  }
  .rowStyle {
    margin-top: 15px;
  }
  .labelContent {
    margin-left: 5px;
    font-size: 15px;
  }
  /* 控制文字域样式 */
  .textareaStyle {
    border: 1px solid gray;
    border-radius: 8px;
    background: #f5f5f5;
    width: 99%;
    height: 300px;
    margin: 10px auto 10px auto;
    display: block;
    padding: 15px 20px;
    font-size: 17px;
    line-height: 22px;
    font-family: "Times New Roman";
    resize: none;
    white-space: pre-wrap;
  }
</style>
/**
*快速开始——第一步添加功能点
*/
<template>
  <div class="contain">
    <div class="header-content">
      <steps :active="0"></steps>
    </div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="12">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>添加功能点</span>
          </div>
          <el-form
            label-position="right"
            label-width="200px"
            :model="formData"
            :rules="rules"
            ref="form"
          >
            <el-form-item label="功能点名称:" prop="name">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="编码:" prop="code">
              <el-input v-model="formData.code"></el-input>
            </el-form-item>
            <el-form-item label="描述:" prop="desc">
              <el-input v-model="formData.desc" type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">添加并进入下一步</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import steps from "@/components/steps";
import Request from "@/libs/request.js";
export default {
  components: { steps },
  data() {
    return {
      formData: {
        name: "",
        code: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入功能点名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate((valid) => {
        if (_this.formData.code === "") {
          _this.formData.code = "功能点" + Date.now();
        }
        if (valid) {
          this.$message.success("已填写必选项" + this.formData.code);
          Request({
            url: "/transactController/addSingleUITransactWithoutAut",
            method: "POST",
            params: {
              nameMedium: _this.formData.name,
              descShort: _this.formData.desc,
              code: _this.formData.code,
            },
          })
            .then((res) => {
              if (res.respCode === "0000") {
                console.log("addSingleUITransactWithoutAut", res);
                this.$router.push({
                  name: "QuicklyElement",
                  query: {
                    autId: res.autId,
                    transactId: res.transId,
                    sceneId: res.sceneId,
                    testPlanId: res.testPlanId,
                  },
                });
              } else {
                this.$message.warning("添加失败");
              }
            })
            .catch((err) => {
              this.$message.error("添加失败");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.page-outer {
  display: flex;
  .right-content {
    flex: 1;
  }
}
.el-form {
  width: 500px;
}
</style>
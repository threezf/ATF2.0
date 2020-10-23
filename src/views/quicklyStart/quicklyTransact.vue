/**
*快速开始——第一步添加功能点
*/
<template>
  <div class="contain">
    <div class="header-content">
      <steps :active="0"></steps>
    </div>
		<div >

		</div>
    <el-row type="flex" class="row-bg" >
			<el-col :span="4">
				<el-select size="small" v-model="selectValue"  style="margin-top: 12px" placeholder="请选择要查询的功能点"
									 clearable filterable @change="getChange">
					<el-option
						v-for="item in transactList"
						:key="item.nameMedium"
						:label="item.nameMedium"
						:value="item">
					</el-option>
				</el-select>
			</el-col>
      <el-col :span="10" :offset="3">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>{{ modelName }}</span>
          </div>
          <el-form
            label-position="right"
            label-width="200px"
            :model="formData"
            ref="form">
            <el-form-item label="功能点名称:" prop="nameMedium">
              <el-input style="width:100%" size="small" v-model="formData.nameMedium" ></el-input>
            </el-form-item>
            <el-form-item label="编码:" prop="code">
              <el-input style="width:100%" size="small" v-model="formData.code"  placeholder="选填"></el-input>
            </el-form-item>
            <el-form-item label="描述:" prop="descShort">
              <el-input
                v-model="formData.descShort"
                type="textarea"
                placeholder="选填"
              ></el-input>
            </el-form-item>
						<el-row>
              <el-col :offset="12" :span="12"  >
              <el-button size="small" type="primary" @click="submitForm('form')" v-show="!disabled">添加并进入下一步</el-button>
              <el-button size="small" @click="resetForm('form')" v-show="!disabled">重置</el-button>
							</el-col>
							<el-col :offset="8" :span="16">
								<el-button size="small" type="primary" @click="editTransact('form')" v-show="disabled">修改功能点</el-button>
								<el-button size="small" @click="resetForm('form')" v-show="disabled" >返回添加</el-button>
								<el-button size="small" @click="toElement" v-show="disabled" >下一步</el-button>
							</el-col>
						</el-row>
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
        nameMedium: "",
        code: "",
        descShort: "",
      },
      transactList: [],
      selectValue: "",
      modelName: "添加功能点",
      disabled: false,
      autLib: {}
    };
  },
  created() {
    this.getAllFunction();
  },
  methods: {
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate((valid) => {
        if (_this.formData.code === "") {
          _this.formData.code = "功能点" + Date.now();
        }
        if (valid) {
          Request({
            url: "/transactController/addSingleUITransactWithoutAut",
            method: "POST",
            params: {
              nameMedium: _this.formData.nameMedium,
              descShort: _this.formData.descShort,
              code: _this.formData.code,
              // creatorId: sessionStorage.getItem('userId')
              creatorId: "3",
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
              } else if (res.respCode === "10011000") {
                this.$message.warning("名称在该被测系统下已经存在");
              }
            })
            .catch((err) => {
                this.$message.warning("名称在该被测系统下已经存在");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //跳转到下一步
    toElement() {
      this.$router.push({
        name: "QuicklyElement",
        query: {
          autId: this.formData.autId,
          transactId: this.formData.id,
        },
      });
      this.$message(`autId: ${this.formData.autId}, id: ${this.formData.id}`)
    },
    //修改功能点
    editTransact(formName) {
      var _this = this;
      this.$refs[formName].validate((valid) => {
        Request({
          url: "/transactController/modifySingleTransact",
          method: "POST",
          params: {
            nameMedium: _this.formData.nameMedium,
            descShort: _this.formData.descShort,
            code: _this.formData.code,
            creatorId: _this.formData.creatorId,
            id: _this.formData.id,
            userId: sessionStorage.getItem("userId"),
          },
        })
          .then((res) => {
            this.$alert("修改成功");
          })
          .catch((err) => {
            this.$alert("修改失败");
          });
      });
    },
    getChange(val) {
        const aut = this.autLib[val]
        this.formData.nameMedium = aut.nameMedium
        this.formData.code = aut.code
        this.formData.descShort = aut.descShort
        this.formData.creatorId = aut.creatorId
        this.formData.id = aut.id
        this.formData.autId = aut.autId
        this.selectValue = aut.nameMedium;
        this.modelName = "查看功能点";
        this.disabled = "true";
    },
    getAllFunction() {
      Request({
        url: "/transactController/fastStartPagedBatchQueryTransact",
        method: "post",
        params: {
          creatorId: sessionStorage.getItem("userId"),
          currentPage: 1,
          orderColumns: "modified_time",
          orderType: "desc",
          pageSize: 9999,
        },
      }).then(
          (res) => {
            this.transactList = res.list.map(item => {
                this.autLib[item.id] = item
                return {
                    ...item
                }
            });
            this.selectValue = "";
            console.log('add', this.transactList)
            // this.formData=res.list[0]
          },
          (err) => {
            console.log("功能点查询出错" + err);
          }
        )
        .catch((err) => {
          console.log("功能点查询出错" + err);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.modelName = "添加功能点";
      this.disabled = false;
      this.getAllFunction();
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

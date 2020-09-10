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
				<el-select v-model="selectValue"  style="margin-top: 12px" placeholder="请选择要查询的功能点"
									 clearable filterable @change="getChange">
					<el-option
						v-for="item in transactList"
						:key="item.id"
						:label="item.nameMedium"
						:value="item">
					</el-option>
				</el-select>
			</el-col>
      <el-col :span="12" :offset="2">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>{{modelName}}</span>
          </div>
          <el-form
            label-position="right"
            label-width="200px"
            :model="formData"
            :rules="rules"
            ref="form"
          >
            <el-form-item label="功能点名称:" prop="nameMedium">
              <el-input v-model="formData.nameMedium" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="编码:" prop="code">
              <el-input v-model="formData.code" :disabled="disabled"></el-input>
            </el-form-item>
<<<<<<< HEAD
            <el-form-item label="描述:" prop="desc">
              <el-input v-model="formData.desc" type="textarea" style="width: 270px"></el-input>
=======
            <el-form-item label="描述:" prop="descShort" >
              <el-input v-model="formData.descShort" type="textarea" :disabled="disabled"></el-input>
>>>>>>> fsd
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')" v-show="!disabled">添加并进入下一步</el-button>
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
				nameMedium: "",
        code: "",
				descShort: "",
      },
      rules: {
				nameMedium: [
          { required: true, message: "请输入功能点名称", trigger: "blur" },
        ],
      },
			transactList:[],
			selectValue:'',
			modelName:"添加功能点",
			disabled:false
    };
  },
	created() {
  	this.getAllFunction()
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
              creatorId: '3'
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
		getChange(val){
			this.formData=val
			this.modelName="查看功能点"
			this.disabled="true"
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
					pageSize: 9999
				}
			})
				.then(
					res => {
              this.transactList=res.list
						  this.selectValue=''
						  // this.formData=res.list[0]
					},
					err => {
						console.log("功能点查询出错" + err);
					}
				)
				.catch(err => {
					console.log("功能点查询出错" + err);
				});
		},
    resetForm(formName) {
      this.$refs[formName].resetFields();
			this.modelName="添加功能点"
			this.disabled=false
			this.getAllFunction()
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

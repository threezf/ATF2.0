<template>
  <div class="page-base-inner">
    <el-container>
      <el-main>
        <el-row class="topRow">
          <el-form :model="titleForm" label-width="80px" class="titleFormStyle">
            <el-col :span="12">
              <el-form-item label="被测系统">
                <el-select v-model="titleForm.selectedSystem" @change="handleSelectChange">
                  <el-input v-model="titleForm.searchSystem"></el-input>
                  <el-option
                    v-for="item in searchedSystem(autRespDTOList)"
                    :key="item.id"
                    :value="item.id"
                    :label="item.nameMedium"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="功能点">
                <el-select v-model="titleForm.selectedFunc"
                  @change="handleFuncChange">
                  <el-input v-model="titleForm.funcSearch"></el-input>
                  <el-option
										v-for="(item) in transactRespDTOs"
										:key="item.id"
										:value="item.id"
										:label="item.nameMedium">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
          <el-button type="primary" size="small" icon="el-icon-upload" @click="ruleRecord">录制规则录入</el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-download"
            @click="downloadTools"
          >录制工具下载</el-button>
        </el-row>
        <el-tabs @tab-click="handleTabClick" type="border-card" class="mainTab">
          <el-tab-pane class="detailTabPane" label="详情">
            <el-form class="detailForm" label-width="60px" :model="detailForm">
              <el-form-item label="编码">
                <el-input v-model="detailForm.code"></el-input>
              </el-form-item>
              <el-form-item label="名称">
                <el-input v-model="detailForm.nameMedium"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="detailForm.descShort"></el-input>
              </el-form-item>
              <div class="buttonDiv">
                <el-button type="warning" size="small" plain>取消</el-button>
                <el-button type="success" size="small" @click="modifySingleTransact">修改</el-button>
              </div>
            </el-form>
            <div class="copyRightDiv">
              Copyright © 1998－2019 BUPT All Rights Reserved
              教育部信息网络工程研究中心 版权所有
            </div>
          </el-tab-pane>
          <el-tab-pane label="元素库">
            <element-library ref="elelib" :transactId="Number(id)" :repositoryId="Number(elementRepositoryId)"
            :autId="Number(autId)"
            :omClassRespDTOList="omClassRespDTOList"></element-library>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
import elementLibrary from "@/components/recordDetail/RecordDetailElementLib";
export default {
  components: { ElSlPanel },
  mixins: [VueMixins], // 混入
  name: "recordDetail",
  data() {
    return {
      autId: "", //获取数据所需要的autId
      id: "", // 获取数据所需要的id
      titleForm: {
        selectedSystem: "", // 选择的被测系统
        searchSystem: "", // 搜索被测系统
        selectedFunc: "", // 选择的功能点
        funcSearch: "" // 搜索功能点
      }, // 头部表单
      autRespDTOList: [], //被测系统列表
      funcList: [], // 功能点列表
      detailForm: {
        code: "", // 编码
        nameMedium: "", // 名称
        descShort: "" // 描述
      }, // 详情表单
			uis: [], // 元素库数据
			transactRespDTOs: [],
			elementRepositoryId: '', //元素库id
			omClassRespDTOList: [], //
      objects: [], // 获取的对象
      scriptTemplateList: [], // 脚本列表
      scriptId: '', // 脚本编号
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.autId = this.$route.query.autId
    this.elementRepositoryId = this.$route.query.elementRepositoryId
		this.queryListAut();
    this.queryTransactsByAutId(this.autId)
    this.queryAutVisibleOmClasses(this.autId)
    this.queryAllObjectForATransact(this.id)
		this.querySingleTransact(this.id);
    this.queryTemplateByTransId(this.id)
    this.titleForm.selectedSystem = Number(this.autId)
  },
  methods: {
    queryListAut() {
      Request({
        url: "/aut/queryListAut",
        method: "POST",
        params: {
        	companyId:parseInt(JSON.parse(sessionStorage.getItem("toTransact")).companyId)
				}
      })
        .then(res => {
          if (res.respCode === "0000") {
            this.autRespDTOList = res.autRespDTOList;
            console.log("autRespDTOList".this.autRespDTOList);
          }
        })
        .catch(err => {
          console.log("网络连接失败");
        });
    },
    // 查询全部元素
    queryAllElementsForATransact(id, autId) {
      Request({
        url: '/elementRepository/queryAllElementsForATransact',
        method: 'POST',
        params: {
          transactId: id
        }
      }).then(res => {
        this.$refs.elelib.change(id, autId, res.elementRepositoryId)
      }).catch(err => {

      })
    },
		 //查询详情
    querySingleTransact(id) {
			let _this = this
      Request({
        url: "/transactController/querySingleTransact",
        method: "POST",
        params: {
          id: id
        }
      }).then(res => {
          if (res.respCode === "0000") {
            console.log(res);
            _this.detailForm.code = res.code;
            _this.detailForm.nameMedium = res.nameMedium;
						_this.detailForm.descShort = res.descShort;
            _this.titleForm.selectedFunc = res.id
            this.queryAllElementsForATransact(id, res.autId)
          } else {
            console.log(res.respMsg);
          }
        })
        .catch(err => {
          this.$message.error("网络连接失败");
        });
		},
    queryTransactsByAutId(id) {
      let _this = this;
      Request({
        url: "/transactController/queryTransactsByAutId",
        method: "POST",
        params: {
          id
        }
      }).then(res => {
				if (res.respCode === "0000") {
          _this.transactRespDTOs = res.transactRespDTOs
          if(_this.transactRespDTOs.length === 0) {
            console.log('transactRespDTOs', true)
            _this.titleForm.selectedFunc = "暂无数据"
          }else {
            _this.titleForm.selectedFunc = _this.transactRespDTOs[0].id
            let dao = _this.transactRespDTOs[0]
            _this.id = _this.transactRespDTOs[0].id
            _this.querySingleTransact(_this.id)
            _this.$refs.elelib.change(_this.id, dao.autId, dao.elementRepositoryId)
          }
          console.log('change', res.transactRespDTOs)
				} else {
					this.$message.warning(res.respMsg);
				}
			})
			.catch(err => {
				console.log("网络连接失败");
			});
		},
		//
		queryAutVisibleOmClasses(id) {
			let _this = this;
      Request({
        url: "/aut/queryAutVisibleOmClasses",
        method: "POST",
        params: {
          'id': _this.autId
        }
      }).then(res => {
				if (res.respCode === "0000") {
          _this.omClassRespDTOList = res.omClassRespDTOList
				} else {
					console.log(res.respMsg);
				}
			})
			.catch(err => {
				this.$message.error("网络连接失败");
			});
		},
		// 查询全部对象
		queryAllObjectForATransact(id) {
			let _this = this;
      Request({
        url: "/objectRepository/queryAllObjectForATransact",
        method: "POST",
        params: {
          transactId: id
        }
      }).then(res => {
				if (res.respCode === "0000") {
					this.objects = res.objects
				} else {
					this.$message.warning(res.respMsg);
				}
			})
			.catch(err => {
				console.log("网络连接失败");
			});
		},
		// 通过Transid获取模板
		queryTemplateByTransId(id) {
			Request({
				url: '/scriptTemplate/queryTemplateByTransId',
				method: 'POST',
				params: {
					id
				}
			}).then(res => {
				if(res.respCode === "0000") {
          console.log('queryTemplateByTransId', res)
          this.scriptTemplateList = res.scriptTemplateList
          this.scriptId = this.scriptTemplateList[0].id
          this.queryScriptInfo(this.scriptId)
				}else {
					this.$message.error(res.respMsg)
				}
			}).catch(err => {
				this.$message.error(err.respMsg)
			})
    },
    // 查询脚本信息
    queryScriptInfo(scriptId) {
      Request({
        url: '/scriptTemplate/queryScriptInfo',
        method: 'POST',
        params: {
          autId: this.autId,
          scriptId
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 查询到的系统
    searchedSystem(list) {
      let _this = this;
      // 注意此处应该返回filter执行后的结果
      return list.filter(function(item) {
        if (item.nameMedium.includes(_this.titleForm.searchSystem)) {
          return item;
        }
      });
    },
    // 更换系统时
    handleSelectChange(val) {
			console.log('handleSelectChange',val)
      this.queryTransactsByAutId(val);

    },
    // 更换功能点时
    handleFuncChange(val) {
      console.log('handleFuncChange', val)
      this.querySingleTransact(val)
    },
    // 修改功能
    modifySingleTransact() {
      console.log(this.id);
      Request({
        url: "/transactController/modifySingleTransact",
        method: "POST",
        params: {
          code: this.detailForm.code,
          descShort: this.detailForm.descShort,
          id: this.id,
          nameMedium: this.detailForm.nameMedium
        }
      })
        .then(res => {
          if (res.respCode === "0000") {
            this.$message.success(res.respMsg);
          } else {
            this.$message.warning("功能点编码与该被测系统下的其他功能点重复");
          }
        })
        .catch(err => {
          this.$message.error("功能点编码与该被测系统下的其他功能点重复");
        });
    },
    // 下载录制工具
    downloadTools() {
      window.location = "http://10.101.167.184:8080/atf-data/atf-recorder.zip";
    },
    // 录制规则录入
    ruleRecord() {
     console.log('规则录入')
     this.$refs.elelib.recordrule()
    },
    // 切换点击
    handleTabClick(tab, event) {
      console.log('handleTabClick', tab, event)
      if(tab.label === '详情') {
        this.$refs.elelib.maskFlag = true
      }
    }
  },
  components: {
    "element-library": elementLibrary
  }
};
</script>

<style lang="less" scoped>
	.topRow {
		.titleFormStyle {
			width: 600px;
			height: 40px;
			margin-right: 30px;
		}
		.el-button {
			margin-left: 10px;
		}
	}
	.mainTab {
		margin-top: 5px;
		.detailTabPane {
			width: 800px;
			.detailForm {
				margin-left: 160px;
				width: 460px;
				.buttonDiv {
					text-align: center;
				}
			}
			.copyRightDiv {
				width: 300px;
				color: #797979;
				font-size: 13px;
				line-height: 20px;
				text-align: center;
				margin: 20px auto;
			}
		}
	}
</style>

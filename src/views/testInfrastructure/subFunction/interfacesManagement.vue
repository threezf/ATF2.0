<template>
<div class="page-base-inner">
  <el-row :gutter="20" class="titleClass">
    <el-form :model="titleForm" label-width="90px">
      <el-col :span="6">
        <el-form-item label="被测系统">
          <el-select class="systemSelectSystem" placeholder="请选择被测系统" v-model="selectSystem" @change="selectedSystemChange" clearable>
            <el-input v-model="systemNameSearch" class="searchInput">
            </el-input>
            <el-option v-for="(item) in systemSearch(titleForm.autRespDTOList)" :key="item.id" :value="item.id" :label="item.nameMedium"> 
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span='6'>
        <el-form-item label="功能点">
          <el-select class="systemSelectFun" v-model="selectedTransact" placeholder="Nothing Selected" @change="tranctChanged" clearable>
            <el-input v-model="transactSearchInput"></el-input>
            <el-option v-for="(item,index) in transactSearch(titleForm.transactRespDTOs)" :key="index" :label="item.nameMedium" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col class="buttonCol" :offset="1" :span="11">
        <el-button type="primary" size="small" icon="el-icon-document-copy" @click="copyFun">
          复制功能点
        </el-button>
      </el-col>
    </el-form>
  </el-row>
  <el-card class="mainCard">
    <p>接口管理</p>
    <hr color="#eff2f7" />
    <el-form :model="manageInfo" ref="interfaceRule" label-width="70px">
      <el-row class="manageRow">
        <el-col :span="5">
          <el-form-item prop="interfaceCode" label="接口编码">
            <el-input v-model="manageInfo.interfaceCode">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-form-item prop="name" label="接口名称">
            <el-input v-model="manageInfo.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-form-item label="版本号">
            <el-input v-model="manageInfo.version">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-form-item label="创建时间">
            <el-input v-model="manageInfo.createTime" disabled>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="manageRow">
        <el-col :span="5">
          <el-form-item label="创建者">
            <el-select class="mainSelect" v-model="manageInfo.creatorId">
              <el-option v-for="(item) in manageInfo.creatorList" :key="item.id" :label="item.username" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-form-item label="维护者">
            <el-select class="mainSelect" v-model="manageInfo.maintainerId">
              <el-option v-for="(item) in manageInfo.maintainerList" :key="item.id" :label="item.username" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-form-item label="认证方法">
            <el-select class="mainSelect" v-model="manageInfo.authenticationMethod">
              <el-option v-for="(item,index) in authenticationMethodList" :key="index" :value="item" :label="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-form-item label="修改时间">
            <el-input v-model="manageInfo.modifyTime" disabled>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="manageRow">
        <el-col :span="5">
          <el-form-item label="开发状态">
            <el-select class="mainSelect" v-model="manageInfo.status">
              <el-option v-for="(item) in statusList" :key="item.id" :label="item.status" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-form-item label="通信类型">
            <el-select class="mainSelect" v-model="manageInfo.protocol">
              <el-option v-for="(item,index) in protocolList" :key="index" :value="item.id" :label="item.type">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-form-item label="请求方法">
            <el-select class="mainSelect" v-model="manageInfo.method">
              <el-option v-for="(item,index) in methodList" :key="index" :value="item.id" :label="item.type">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item prop="urlPath" label="接口路径">
          <el-input v-model="manageInfo.urlPath" class="inputPath">
          </el-input>
        </el-form-item>
      </el-row>
      <el-row class="saveRow">
        <el-form-item label="接口简介">
          <el-input class="description" v-model="manageInfo.description" type="textarea">
          </el-input>
          <el-button class="saveButton" type="primary" size="small" @click="saveContent">保存
          </el-button>
        </el-form-item>
      </el-row>
      <el-tabs class="bottomCard" type="border-card">
        <el-tab-pane label="Authorization">
          <el-form-item class="bottomForm" label="type">
            <el-select class="typeSelect" v-model="manageInfo.selectedAuthorization">
              <el-option v-for="(item,index) in authorizationList" :key="index" :value="item.id" :label="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="Header">
          <el-row v-for="(item, index) in manageInfo.selectedHeader" :key="index">
            <el-col :span="6">
              <el-form-item label-width="100px" label="header">
                <el-input placeholdr="请填写header" v-model="item.name">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label-width="100px" label="value">
                <el-input placeholdr="请填写value" v-model="item.val">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label-width="100px" label="备注">
                <el-input placeholdr="请填写备注" v-model="item.desc">
                </el-input>
              </el-form-item>
            </el-col>
            <el-button type="success" icon="el-icon-plus" size="mini" class="deleteRow" title="添加" plain @click="addRow(index)">
            </el-button>
            <el-button type="danger" icon="el-icon-close" size="mini" class="deleteRow" title="删除" plain @click="removeRowHeader(index)">
            </el-button>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Body">
          <el-form-item prop="bodyFormat" class="bottomForm" label-width="100px" label="报文格式">
            <el-select v-model="manageInfo.bodyFormat">
              <el-option v-for="(item,index) in bodyFormats" :key="index" :value="item.id" :label="item.value">
              </el-option>
            </el-select>
            <el-button class="decode" type="primary" size="small" style="display: none" @click="decode">解码
            </el-button>
          </el-form-item>
          <el-form-item prop="bodyContent" class="descForm" label-width="100px" label="报文内容">
            <el-input class="bodyDes" type="textarea" v-model="manageInfo.bodyContent">
            </el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <el-button class="buttonBottom" type="primary" size="small" @click="saveBottom">保存
      </el-button>
    </el-form>
  </el-card>
</div>
</template>

<script>
import Request from "@/libs/request.js";
import VueMixins from "@/libs/vueMixins.js";
import jQuery from 'jquery';
import moment from "moment";
export default {
  mixins: [VueMixins], // 时间格式转化
  name: 'InterfacesManagement',
  data() {
    return {
      autId: "", // 系统id
      transactsForm: {
        id: ""
      }, // 获取功能点传递的表单数据
      singleInterfaceForm: {
        id: "271"
      }, // 获取接口的表单数据
      systemNameSearch: '', // 被测系统查询条件
      transactSearchInput: '', // 功能点查询条件
      titleForm: {
        autNameMedium: '', // 选中的被测系统名称
        autRespDTOList: [], // 被测系统了列表
        interfaceNameMedium: '', // 被选中的功能点名称
        transactRespDTOs: [], // 功能点名称列表
      },
      selectedTransact: '', // 选择的功能点
      selectSystem: '', // 选择的系统
      manageInfo: {
        bodyContent: '', // 报文内容
        bodyFormat: '1', // 报文格式
        createTime: '', // 创建时间
        creatorId: '', // 创建者
        description: '', // 接口简介
        header: [{
          "name": "h1",
          "desc": "h3",
          "val": "h2"
        }], // header里面的文本
        interfaceCode: '', // 接口编码
        maintainerId: '', // 维护者
        method: '', // 请求方法
        name: '', // 接口名称
        protocol: '', // 通信类型，取值1和2
        version: '', // 版本号
        status: '1', // 开发状态
        creatorList: [], // 创建者列表
        maintainerList: [], // 维护者列表
        modifyTime: '', // 修改时间
        authenticationMethod: 'HTTP Basic', // 认证方法
        selectedStatus: '', //选择的开发状态
        selectedProtocol: '', // 选择的通信类型
        selectedMethod: '', // 选择的请求方法
        urlPath: '', // 接口路径
        selectedAuthorization: 'inherit auth from parent', // Authorization
        selectedHeader: [{}],
        rawFormat: '', // 
      },
      authenticationMethodList: [
        'HTTP Basic',
        'HTTP Digest',
        'WSSE(WS-Security)',
        'API KEY',
        'OAUTH 2'
      ], // 认证方法列表
      statusList: [{
          id: 0,
          status: '开发中'
        },
        {
          id: 1,
          status: '开发完成'
        },
        {
          id: 2,
          status: '已废弃'
        }
      ], // 开发状态列表
      protocolList: [{
          id: 1,
          type: 'HTTP'
        },
        {
          id: 2,
          type: 'FTP'
        }
      ], // 通信类型列表
      methodList: [{
          id: 0,
          type: 'GET'
        },
        {
          id: 1,
          type: 'POST'
        },
        {
          id: 2,
          type: 'PUT'
        },
        {
          id: 3,
          type: 'DELETE'
        },
      ], // 请求方法列表
      authorizationList: [{
          id: 1,
          value: 'inherit auth from parent'
        },
        {
          id: 2,
          value: 'No Auth'
        },
        {
          id: 3,
          value: 'Bearer Token'
        },
        {
          id: 4,
          value: 'Basic Auth'
        },
        {
          id: 5,
          value: 'Digest Auth'
        },
        {
          id: 6,
          value: 'OAuth 1.0'
        },
        {
          id: 7,
          value: 'OAuth 2.0'
        },
        {
          id: 8,
          value: 'Hawk Authentication'
        },
        {
          id: 9,
          value: 'AWS Signature'
        },
        {
          id: 10,
          value: 'NTLM Authentication[Beta]'
        },
      ], // Authorization
      bodyFormats: [{
          id: "1",
          value: 'JSON'
        },
        {
          id: "2",
          value: 'XML'
        },
      ], // 报文格式
    }
  },
  created() {
    let data 
    if (this.$route.query.data.hasOwnProperty('id')) {
      data = this.$route.query.data
      localStorage.setItem('transactId', this.$route.query.data.id)
      localStorage.setItem('transactAutId', this.$route.query.data.autId)
      this.autId = Number(data.autId)
      this.transactsForm.id =  data.id
    }else {
      this.autId = Number(localStorage.getItem('transactAutId'))
      this.transactsForm.id = localStorage.getItem('transactId')
    }
    console.log('transactsForm', this.autId, this.transactsForm.id, this.$route.query.data.hasOwnProperty('id'))
    this.selectSystem = this.autId
    this.selectedTransact = Number(this.transactsForm.id)
    this.selectAllUsername()
    this.queryListAut()
    this.queryTransactsByAutId(this.autId)
    this.querySingleInterface(this.transactsForm.id)
  },
  
  methods: {
    // 获取全部用户
    selectAllUsername() {
      Request({
        url: '/userController/selectAllUsername',
        method: 'POST',
        params: {}
      }).then(res => {
        if (res.respCode == '0000') {
          this.manageInfo.creatorList = res.list
          this.manageInfo.maintainerList = res.list

        } else {
          this.$message.warning('获取失败')
        }
      }).catch(error => {
        console.log('数据获取失败')
      })
    },
    // 获取全部被测系统
    queryListAut() {
      Request({
        url: '/aut/queryListAut',
        method: 'POST',
        params: {}
      }).then(res => {
        if (res.respCode == '0000') {
          this.titleForm.autRespDTOList = res.autRespDTOList
          let item = this.titleForm.autRespDTOList.find(item => {
            return item.id == this.autId
          })
          this.selectSystem = item.id
        } else {
          this.$message.warning('获取失败')
        }
      }).catch(error => {
        console.log('数据获取失败')
      })
    },
    // 获取功能点
    queryTransactsByAutId(id) {
      Request({
        url: '/transactController/queryTransactsByAutId',
        method: 'POST',
        params: {
          id: id
        }
      }).then(res => {
        if (res.respCode == '0000') {
          if (this.transactsForm.id !== "") {
            this.titleForm.transactRespDTOs = res.transactRespDTOs.filter(item => item.transType === 2)
          } else {
            this.titleForm.transactRespDTOs = res.transactRespDTOs.filter(item => item.transType === 2)
            this.transactsForm.id = this.titleForm.transactRespDTOs[0].id ? this.titleForm.transactRespDTOs[0].id : '系统下无功能点'
            this.selectedTransact = this.transactsForm.id
            this.querySingleInterface(this.selectedTransact)
            console.log('原始数据', this.titleForm.transactRespDTOs)
          }
        } else {
          this.$message.warning('获取失败')
        }
      }).catch(error => {
        this.$message.error('该系统下无功能点')
      })
    },
    // 获取单个接口信息
    querySingleInterface(id) {
      let _this = this
      Request({
        url: '/interface/querySingleInterface',
        method: 'POST',
        params: {
          id: id
        }
      }).then(res => {
        console.log('uploadquerySingleInterface', res)
        if (res.respCode === '0000') {
          jQuery.extend(this.manageInfo, res)
          this.manageInfo.createTime = moment(res.createTime).format('YYYY/MM/DD HH:mm:ss')
          this.manageInfo.modifyTime = moment(res.modifyTime).format('YYYY/MM/DD HH:mm:ss')
          _this.manageInfo.status = res.status //开发状态
          _this.manageInfo.method = res.method // 请求方法
          _this.manageInfo.protocol = res.protocol // 通信类型
          _this.manageInfo.bodyFormat = res.bodyFormat? res.bodyFormat: '1' // 报文格式
          _this.manageInfo.selectedHeader = []
          if (res.header === '[]' || res.header === null) {
            _this.manageInfo.selectedHeader.push({
              name: '',
              val: '',
              desc: ''
            })
          } else {
            _this.manageInfo.selectedHeader.push(...JSON.parse(res.header))
          }
          console.log("querySingleInterface", _this.manageInfo)
        } else {
          this.$message.warning('获取失败')
        }
      }).catch(error => {
        this.$message.error(error)
        console.log("querySingleInterface", error)
      })
    },
    // 选中系统更换
    selectedSystemChange(value) {
      console.log('选中的value', value)
      this.transactsForm.id = ""
      this.selectedTransact = ""
      this.autId = value
      this.selectSystem = value
      this.queryTransactsByAutId(value)
    },
    tranctChanged(value) {
      console.log('选中的value', value)
      this.querySingleInterface(value)
      this.transactsForm.id = value
      console.log(this.manageInfo.creatorId)
    },
    // 复制功能点
    copyFun() {
      Request({
        url: '/transactController/copySingleInterfaceTransact',
        method: 'POST',
        params: {
          autId: this.autId,
          creatorId: this.manageInfo.creatorId,
          transId: this.transactsForm.id
        }
      }).then(res => {
        if (res.respCode == "0000") {
          this.$message.success('复制成功')
          this.queryTransactsByAutId(this.autId)
          this.querySingleInterface(this.transactsForm.id)
        } else {
          this.$message, error('复制失败')
        }
      }).catch(error => {
        this.$message, error('复制失败')
      })
    },
    // 筛选被测系统
    systemSearch(list) {
      let _this = this
      /**
       * 此处返回满足条件的内容
       */
      return list.filter(function (item, index) {
        // console.log(_this.systemNameSearch,item)
        if (item.nameMedium.includes(_this.systemNameSearch)) {
          return item
        }
      })
    },
    // 筛选功能点
    transactSearch(list) {
      let _this = this
      return list.filter(function (item, index) {
        // console.log("transactSearch",item)
        if (item.nameMedium.includes(_this.transactSearchInput)) {
          return item
        }
      })
    },
    // 保存内容
    saveContent() {
      let valid = this.manageInfo.bodyFormat !== null && this.manageInfo.bodyContent !== ""
      if (valid) {
        let uploadForm = {
          authContent: null,
          authType: null,
          bodyContent: this.manageInfo.bodyContent,
          bodyFormat: this.manageInfo.bodyFormat,
          bodyParseContent: null,
          createTime: this.manageInfo.createTime,
          creatorId: this.manageInfo.creatorId,
          dataDictList: null,
          description: this.manageInfo.description,
          groupName: null,
          header: JSON.stringify(this.manageInfo.selectedHeader),
          id: this.transactsForm.id,
          interfaceCode: this.manageInfo.interfaceCode,
          maintainerId: this.manageInfo.maintainerId,
          method: this.manageInfo.method,
          name: this.manageInfo.name,
          preRequestScript: null,
          protocol: this.manageInfo.protocol,
          query: "[]",
          rawFormat: 1,
          status: this.manageInfo.status,
          systemId: this.autId,
          urlPath: this.manageInfo.urlPath,
          version: this.manageInfo.version
        }
        Request({
          url: '/interface/modifySingleInterface',
          method: 'POST',
          params: uploadForm
        }).then(res => {
          if (res.respCode == "0000") {
            this.$message.success("保存成功")
            this.queryTransactsByAutId(this.autId)
            // this.querySingleInterface(this.transactsForm.id)
          } else {
            this.$message.warning("保存失败")
          }
        }).catch(error => {
          this.$message.error(error)
        })
      } else {
        this.$message.warning('报文体格式、内容是必选项')
        return false
      }
    },
    // 底部保存
    saveBottom() {
      this.saveContent()
    },
    // 解码
    decode() {
      Request({
        url: '/interface/parseXmlBody',
        method: 'POST',
        params: {
          interfaceId: this.transactsForm.id,
          xmlBody: this.transactsForm.bodyContent
        }
      }).then(res => {
        if (res.respCode == "0000") {

        } else {
          this.$alert('解码失败', '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
      }).catch(error => {
        this.$alert('网络连接失败', '警告', {
          confirmButtonText: '确定',
          type: 'error'
        })
      })
    },
    // 数据编辑时添加一行
    addRow(index) {
      this.manageInfo.selectedHeader.push({})
    },
    // 删除一行数据
    removeRowHeader(index) {
      this.manageInfo.selectedHeader.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.titleClass {
  .systemSelectSystem {
    position: relative;
    width: 100%;

    .searchInput {
      position: fixed !important;
      top: 0px;
      left: 0px;
    }
  }

  .systemSelectFun {
    width: 100%;
  }

  .buttonCol {
    height: 40px;
    display: flex;
    align-items: center;
  }
}

.mainCard {
  margin-top: -10px;

  p {
    color: #8a99a8;
    margin-bottom: 10px;
    margin-left: 10px;
  }

  .manageRow {
    margin-top: 15px;
  }

  .el-form-item {
    margin-bottom: 0px;
  }

  .inputPath {
    width: 69.6%;
  }

  .description {
    resize: none;
    width: 69.6%;
    height: 120px;
  }

  .el-textarea__inner {
    height: 120px;
  }

  .mainSelect {
    width: 100%;
  }

  .saveRow {
    position: relative;

    .saveButton {
      position: absolute;
      right: 70px;
      bottom: 0px;
    }
  }

  .bottomCard {
    margin-top: 10px;

    .bottomForm {
      margin-top: 5px;
    }

    .typeSelect {
      width: 400px;
    }

    .decode {
      margin-left: 20px;
    }

    .descForm {
      margin-top: 10px;

      .bodyDes {
        width: 96%;
        height: 175px;
        resize: none;
      }

      .el-textarea__inner {
        height: 170px;
      }
    }

    .el-tabs__content {
      overflow: auto;
      height: 270px;

      .deleteRow {
        margin-top: 8px;
        margin-left: 10px;
      }
    }
  }

  .el-tabs {
    height: 310px;
  }

  .buttonBottom {
    float: right;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>

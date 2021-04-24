<template>
  <div>
    <div>
      <div class="content">
        <!--main content start-->
        <section id="main-content">
          <section class="content-wrapper" style="margin-bottom: 50px">
            <div
              class="main"
              style="padding: 15px; user-select: none; min-width: 100%"
            >
              <!-- breadcrumb start -->
              <!-- <div class="row" style="margin-bottom: 15px;">
                            <div class="col-lg-12">
                                <ul class="breadcrumb">
                                    <li><a id = "myTitle"><i class="icon-home" id="myProjectName"></i> 项目测试 {{ projectName }}</a></li>
                                    <li><a href="#"> 测试计划及执行</a></li>
                                </ul>
                            </div>
                        </div> -->
              <div
                class="main-content"
                id="testround-main"
                style="padding: 15px 0"
              >
                <el-form class="testplan" label-width="80px">
                    <el-row :gutter="20">
<!--                      <el-col :span="5">-->
<!--                        <el-form-item label="测试计划">-->
<!--                          <el-select size="small" v-model="testPlanId" placeholder="请选择">-->
<!--                            <el-option-->
<!--                            v-for="(item, index) in testPlans"-->
<!--                            :key="'testplans' + index"-->
<!--                            :label="item.nameMedium"-->
<!--                            :value="item.id"-->
<!--                            >-->
<!--                            </el-option>-->
<!--                          </el-select>-->
<!--                        </el-form-item>-->
<!--                      </el-col>-->
<!--                      <el-col :span="2">-->
<!--                        <el-button-->
<!--                          style="margin-top:5px"-->
<!--                          type="primary"-->
<!--                          size="mini"-->
<!--                          @click="testPlanManager()"-->
<!--                          >测试计划管理</el-button-->
<!--                        >-->
<!--                      </el-col>-->
                      <el-col :span="6">
                        <el-form-item label="执行范围">
                          <el-select style="width:100%" size="small" v-model="exeScope" placeholder="请选择">
                            <el-option label="所有" value="1"></el-option>
                            <el-option label="已选择" value="0"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                     <el-col :span="6" >
                        <el-form-item label="分配模式">
                          <el-select
                          size="small"
                          v-model="runnerExecuteType"
                          placeholder="请选择"
                          >
                          <el-option
                            label="指定执行机"
                            value="appointed"
                          ></el-option>
                          <el-option label="自动分配" value="auto"></el-option>
                        </el-select>
                        </el-form-item>
                     </el-col>
                      <el-col :span="10" >
                        <el-form-item label="执行机选择" label-width="100px">
                          <el-select
                          size="small"
                          v-model="runnerselected"
                          placeholder="请选择执行机"
                          :multiple="true"
                          >
                            <el-option
                            v-for="(item, index) in runners"
                            :key="'runner' + index"
                            :label="item.runnerName"
                            :value="item.identifiableName"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="0">
                        <el-form-item label="当前执行轮次" hidden>
                          <span
                            id="currentRound"
                            class="execute-range form-control"
                          >正在等待数据加载</span
                          >
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row style="margin-left:15px">
                      <label label-width=30% class="executeStatus" v-html="exeStautShow"></label>
                    </el-row>
                  </el-form>
                <div class="test-control container" style="display: flex; margin: 15px 5px; height: 30px">
                  <div style="font-size: 12px; color: #999"></div>
                  <el-button type="primary" size="mini" @click="executeAll()" v-if="notTimerFlag"
                    ><i class="icon-play" ></i> 批量执行
                  </el-button>
                  <el-button type="primary" size="mini" @click="executeAllT2()" v-if="!notTimerFlag">
                      <i class="icon-play"></i> 定时执行
                  </el-button>
                  <el-button type="primary" size="mini" @click="stopExe()"
                    ><i class="icon-stop"></i> 终止执行</el-button
                  >
                  <el-button type="primary" size="mini" @click="getCases()"
                    ><i class="icon-eye-open"></i> 查询</el-button
                  >
                  <el-button type="primary" size="mini" @click="addScene()"
                    ><i class="icon-plus"></i> 添加场景</el-button
                  >
                  <el-button
                    type="primary"
                    size="mini"
                    @click="removeSceneAndCase()"
                    ><i class="icon-remove"></i> 移除场景与用例</el-button
                  >
                  <el-button type="primary" size="mini" @click="reQuery()"
                    ><i class="icon-refresh"></i> 重新查询执行结果</el-button
                  >
                  <el-button type="primary" size="mini" icon="el-icon-download" @click="downloadRunner">下载执行机</el-button>
                  <el-button type="primary" size="mini" icon="el-icon-download" v-if="isDownload == false" @click="isDownload = true">下载浏览器</el-button>
                  <div v-else style="margin-left: 10px;">
                      选择浏览器版本
                      <el-button type="text" @click="downloadWin(1)">chrome-87-win</el-button>
                      <el-button type="text" @click="downloadWin(2)">firefox-win</el-button>
                      <el-button type="text" @click="downloadMac(1)">chrome-87-mac</el-button>
                      <el-button type="text" @click="downloadMac(2)">firefox-mac</el-button>
                  </div>
                  <el-switch
                    style="margin: 5px 10px"
                    v-model="sendMail"
                    active-text="是"
                    inactive-text="否">
                  </el-switch>
                </div>
                <div id="">
                  <div class="logcontainer">
                    <el-card class="box-card" v-if="logShow">
                      <div slot="header" class="clearfix">
                        <span>日志信息</span>
                        <el-button
                          style="float: right; margin-right: 5px; padding: 0px"
                          type="text"
                          @click="updateScreen()"
                        >
                          <i class="icon-double-angle-right"></i>
                        </el-button>
                        <el-button
                          class="el-icon-full-screen"
                          v-if="fullFlag"
                          style="float: right; margin-right: 5px; padding: 0px"
                          type="text"
                          @click="fullScreen()"
                        ></el-button>
                        <el-button
                          v-else
                          style="float: right; margin-right: 5px; padding: 0px"
                          type="text"
                          @click="subScreen()"
                        >
                          <i class="fa fa-compress"></i>
                        </el-button>
                      </div>
                      <div id="area">
                        <pre
                          class="pre"
                        ><code  id="logarea" class="javascript"></code></pre>
                      </div>
                    </el-card>
                    <div v-else id="loghidden">
                      <div id="hidden">
                        <el-button size="small" @click="showScreen()">
                          <i class="icon-double-angle-left">
                            <font color="black">展开日志</font>
                          </i>
                        </el-button>
                        <!-- <button class="btn btn-white"></button> -->
                      </div>
                    </div>
                  </div>
                  <div class="main-content2">
                    <div
                      class="case-list-wrapper list-wrapper"
                      v-if="testCaseList && testCaseList.length"
                      style="padding: 10px 20px 10px 20px"
                    >
                      <!-- <span class="case-list-title list-title">用例列表</span> -->
                      <header class="panel-heading" style="margin: 0 -15px">
                        用例列表
                      </header>
                      <button
                        class="hide-case-list btn btn-xs btn-info"
                        @click="hideCaseList($event)"
                        style="padding: 3px 6px; margin: 5px 10px"
                        @mousedown.stop="1"
                      >
                        <span>收起</span>&nbsp;&nbsp;<i
                          class="icon-caret-down"
                        ></i>
                      </button>
                      <div class="case-list">
                        <div
                          class="check-all-case"
                          v-if="testCaseList && testCaseList.length"
                          style="margin: 10px 10px"
                        >
                          全选
                          <input
                            type="checkbox"
                            @change="checkallBox($event)"
                            v-model="checkall"
                          />
                        </div>
                        <div id="sortable_caselist">
                          <div
                            class="case-lib"
                            v-for="(case_wrapper, index) in testCaseList"
                            :key="'case_wrapper' + index"
                          >
                            <template
                              v-if="case_wrapper.caseCompositeType == '1'"
                            >
                              <div class="checkbox-wrapper">
                                <i
                                  class="icon-move handle"
                                  style="color: #ff6c60"
                                ></i
                                >&nbsp;&nbsp;
                                <div
                                  style="
                                    display: inline-block;
                                    width: 20px;
                                    height: 20px;
                                  "
                                  @mousedown.stop="1"
                                >
                                  <input
                                    type="checkbox"
                                    :value="case_wrapper.caseId"
                                    @mousedown.stop="1"
                                    @change="checkallToggle($event)"
                                    class="checkall"
                                    v-model="selectedCases"
                                  />
                                </div>
                              </div>
                              <div class="case-wrapper">
                                <div
                                  class="case"
                                  @click="changeCase(case_wrapper.caseId, 1)"
                                  @mousedown.stop="1"
                                >
                                  <div class="case-header">
                                    <img
                                      :src="exeImgs[0]"
                                      :id="'img' + '-' + case_wrapper.caseId"
                                    />
                                    <p
                                      class="width-limit"
                                      :title="case_wrapper.casecode"
                                    >
                                      {{ case_wrapper.caseCode }}
                                    </p>
                                    <input
                                      type="checkbox"
                                      v-bind:value="case_wrapper.caseId"
                                      class="check-case single-case-incaselib"
                                      v-model="selectedCases"
                                      @change="checkChanged($event)"
                                    />
                                    <p>
                                      <a
                                        class="view-case"
                                        @click.stop="
                                          viewCase(case_wrapper.caseId, 'PE4')
                                        "
                                        ><span>查看</span></a
                                      >
                                    </p>
                                  </div>
                                  <footer class="case-footer"></footer>
                                </div>
                              </div>
                            </template>
                            <!-- 流程用例 -->
                            <template v-else>
                              <div class="checkbox-wrapper">
                                <i
                                  class="icon-move handle"
                                  style="color: #ff6c60"
                                ></i
                                >&nbsp;&nbsp;
                                <div
                                  style="
                                    display: inline-block;
                                    width: 20px;
                                    height: 20px;
                                  "
                                  @mousedown.stop="1"
                                >
                                  <input
                                    type="checkbox"
                                    :value="case_wrapper.caseId"
                                    class="checkall"
                                    v-model="selectedCases"
                                    @change="checkallToggle($event)"
                                    @mousedown.stop="1"
                                  />
                                </div>
                              </div>
                              <div class="case-wrapper">
                                <div
                                  class="case"
                                  v-for="(item,
                                  index) in case_wrapper.flowNodes"
                                  :key="'case_wrapper' + index"
                                  @mousedown.stop="1"
                                  @click="changeCase(item.flowNodeId, 2)"
                                >
                                  <div class="case-header">
                                    <img
                                      :src="exeImgs[0]"
                                      :id="'img' + '-' + item.flowNodeId"
                                    />
                                    <p
                                      class="width-limit"
                                      :title="item.casecode"
                                    >
                                      {{ item.casecode }}
                                    </p>
                                    <input
                                      type="checkbox"
                                      v-bind:value="item.flowNodeId"
                                      class="check-case flow-node-incaselib"
                                      @change="checkChanged($event)"
                                      v-model="checkedFlowNodes"
                                    />
                                    <p>
                                      <a
                                        class="view-case"
                                        @click.stop="
                                          viewCase(case_wrapper.caseId, 'PE4')
                                        "
                                        ><span>查看</span></a
                                      >
                                    </p>
                                  </div>
                                  <footer class="case-footer">2</footer>
                                </div>
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 场景列表 -->
                <!-- <span class="case-list-title list-title" style="margin:10px 20px -10px 20px;" v-if="testSceneList.length">场景列表</span> -->
                <header class="panel-heading" v-if="testSceneList.length">
                  场景列表
                  <button
                    class="hide-case-list btn btn-xs btn-info"
                    @mousedown.stop="1"
                    @click="saveScenesSort()"
                  >
                    保存场景排序
                  </button>
                  <span class="exe-info">
                    <i class="icon-info-sign"></i>
                    场景内的用例串行执行，场景之间并行执行
                  </span>
                </header>
                <div class="sortable_sceneslist" style="margin-top: 20px">
                  <div
                    class="scene-list-wrapper -wrapper"
                    style="padding: 0px 20px 10px 20px"
                    v-for="(scene, index) in testSceneList"
                    :key="index"
                  >
                    <i class="icon-move handle2" style="color: #5a3c3c"></i
                    >&nbsp;&nbsp;
                    <div
                      class="checkbox-wrapper"
                      style="display: inline-block; padding: 2px 5px"
                      @mousedown.stop="1"
                    >
                      <input
                        type="checkbox"
                        :value="scene.sceneId"
                        class="checkscene"
                        v-bind:name="scene.id"
                        v-model="selectedScenes"
                      />
                      <!-- lrqlrq-->
                    </div>
                    <span
                      class="scene-list-title list-title"
                      style="top: 2px"
                      >{{ scene.sceneName }}</span
                    >
                    <button
                      class="hide-case-list btn btn-xs btn-info"
                      @click="hideCaseList($event)"
                      @mousedown.stop="1"
                    >
                      <span>展开</span>&nbsp;&nbsp;<i
                        class="icon-caret-right"
                      ></i>
                    </button>
                    <button
                      class="hide-case-list btn btn-xs btn-info"
                      @mousedown.stop="1"
                      @click="saveSort(scene.sceneId)"
                    >
                      保存排序
                    </button>
                    <!-- <div class="case-list"> -->
                    <div class="case-list" style="display: none">
                      <div
                        class="check-all-case"
                        v-if="scene.testCaseList && scene.testCaseList.length"
                        style="padding: 2px 5px; margin: 10px 10px"
                        @mousedown.stop="1"
                      >
                        全选用例
                        <input
                          type="checkbox"
                          @change="checkAllInScene($event)"
                          class="checkall-inscene"
                          :value="scene.sceneId"
                          v-model="checkallSceneIds"
                        />
                      </div>
                      <div class="sortable_scene_caselist">
                        <div
                          class="case-lib case-lib-pad"
                          v-for="(case_wrapper, index) in scene.testCaseList"
                          :key="'case_wrapper' + index"
                        >
                          <template
                            v-if="case_wrapper.caseCompositeType == '1'"
                          >
                            <div class="checkbox-wrapper">
                              <i
                                class="icon-move handle1"
                                style="color: #b8860b"
                              ></i
                              >&nbsp;&nbsp;
                              <div
                                style="
                                  display: inline-block;
                                  width: 20px;
                                  height: 20px;
                                "
                                @mousedown.stop="1"
                              >
                                <input
                                  type="checkbox"
                                  :value="
                                    'sort' +
                                    '-' +
                                    scene.sceneId +
                                    '-' +
                                    case_wrapper.caseId
                                  "
                                  class="check-flownodes"
                                  v-bind:name="case_wrapper.caseId"
                                  v-model="selectedSceneCases"
                                  @change="checkAllFlowNodes($event)"
                                />
                              </div>
                            </div>
                            <div class="case-wrapper">
                              <div
                                class="case"
                                @click="
                                  changeCase(
                                    scene.sceneId + '-' + case_wrapper.caseId,
                                    3
                                  )
                                "
                                @mousedown.stop="1"
                              >
                                <div class="case-header">
                                  <img
                                    :src="exeImgs[0]"
                                    :id="
                                      'img' +
                                      '-' +
                                      scene.sceneId +
                                      '-' +
                                      case_wrapper.caseId
                                    "
                                  />
                                  <p
                                    class="width-limit"
                                    :title="case_wrapper.caseCode"
                                  >
                                    {{ case_wrapper.caseCode }}
                                  </p>
                                  <input
                                    type="checkbox"
                                    :value="
                                      'sort' +
                                      '-' +
                                      scene.sceneId +
                                      '-' +
                                      case_wrapper.caseId
                                    "
                                    class="check-case check-case-inscene"
                                    v-model="selectedSceneCases"
                                    @change="checkFlowNode($event)"
                                  />
                                  <!--lrlrq -->
                                  <p>
                                    <a
                                      class="view-case"
                                      @click.stop="
                                        viewCase(
                                          scene.sceneId,
                                          case_wrapper.caseId,
                                          'PE6'
                                        )
                                      "
                                      ><span>查看</span></a
                                    >
                                  </p>
                                </div>
                              </div>
                              <div
                                class="runnerclass"
                                :id="
                                  'runner' +
                                  '-' +
                                  scene.sceneId +
                                  '-' +
                                  case_wrapper.caseId
                                "
                              >
                                <p></p>
                              </div>
                            </div>
                          </template>
                          <template v-else>
                            <div class="checkbox-wrapper">
                              <i
                                class="icon-move handle1"
                                style="color: #b8860b"
                              ></i
                              >&nbsp;&nbsp;
                              <div
                                style="
                                  display: inline-block;
                                  width: 20px;
                                  height: 20px;
                                "
                                @mousedown.stop="1"
                              >
                                <input
                                  type="checkbox"
                                  :value="
                                    'sort' +
                                    '-' +
                                    scene.sceneId +
                                    '-' +
                                    case_wrapper.caseId
                                  "
                                  v-bind:name="case_wrapper.caseId"
                                  class="check-flownodes"
                                  @change="checkAllFlowNodes($event)"
                                  v-model="selectedSceneCases"
                                />
                              </div>
                            </div>
                            <!-- <div class="case-wrapper" v-for = "index1 in (case_wrapper.flowNodes.length/7)">
                                                            <div class="case" v-for="index2 in 7" v-if = "case_wrapper.flowNodes[index1*7 + index2]"
                                                                @mousedown.stop="1"
                                                                @click="changeCase(scene.sceneId+ '-' + case_wrapper.caseId + '-' + case_wrapper.flowNodes[index1*7 + index2].flowNodeId, 3)">
                                                                <div class="case-header">
                                                                    <img :src="exeImgs[0]"
                                                                        :id="'img' + '-' + scene.sceneId+ '-' + case_wrapper.caseId + '-' + case_wrapper.flowNodes[index1*7 + index2].flowNodeId">
                                                                    <p :title="case_wrapper.flowNodes[index1*7 + index2].flowNodeCode">{{case_wrapper.flowNodes[index1*7 + index2].flowNodeCode}} </p>
                                                                    <input type="checkbox"
                                                                        v-bind:value="scene.sceneId+ '-' + case_wrapper.caseId + '-' + case_wrapper.flowNodes[index1*7 + index2].flowNodeId"
                                                                        class="check-case check-case-inscene"
                                                                        @change="checkFlowNode($event)"
                                                                        v-model="selectedSceneCases">
                                                                </div>
                                                                <div class="case-main">
                                                                    <a class="view-case"
                                                                    @click.stop="viewCase(scene.sceneId, case_wrapper.caseId, 'PE6')"><span>查看</span>
                                                                    </a>
                                                                </div>
                                                                <footer class="case-footer">
                                                                </footer>
                                                            </div>
                                                            <div class="runnerclass"
                                                                :id="'runner' + '-' + scene.sceneId+'-'+case_wrapper.caseId">
                                                                <p></p>
                                                            </div>
                                                        </div> -->
                            <div class="case-wrapper">
                              <div
                                class="case caseFlow"
                                v-for="(item, index) in case_wrapper.flowNodes"
                                :key="'case_wrapper2' + index"
                                @mousedown.stop="1"
                                @click="
                                  changeCase(
                                    scene.sceneId +
                                      '-' +
                                      case_wrapper.caseId +
                                      '-' +
                                      item.flowNodeId,
                                    3
                                  )
                                "
                              >
                                <div style="display: flex; align-items: center">
                                  <div class="case-header case-header-Flow">
                                    <img
                                      :src="exeImgs[0]"
                                      :id="
                                        'img' +
                                        '-' +
                                        scene.sceneId +
                                        '-' +
                                        case_wrapper.caseId +
                                        '-' +
                                        item.flowNodeId
                                      "
                                    />
                                    <p
                                      class="width-limit"
                                      :title="item.flowNodeCode"
                                    >
                                      {{ item.flowNodeCode }}
                                    </p>
                                    <input
                                      type="checkbox"
                                      v-bind:value="
                                        scene.sceneId +
                                        '-' +
                                        case_wrapper.caseId +
                                        '-' +
                                        item.flowNodeId
                                      "
                                      class="check-case check-case-inscene"
                                      @change="checkFlowNode($event)"
                                      v-model="selectedSceneCases"
                                    />
                                    <p>
                                      <a
                                        class="view-case"
                                        @click.stop="
                                          viewCase(
                                            scene.sceneId,
                                            case_wrapper.caseId,
                                            'PE6',
                                            item.flowNodeId
                                          )
                                        "
                                        >查看
                                      </a>
                                    </p>
                                    <!-- <a class="view-case"
                                                                            @click.stop="viewCase(scene.sceneId, case_wrapper.caseId, 'PE6')"><span>查看</span></a> -->
                                    <!-- <span>{{item.runTotalNumber}}</span> -->
                                  </div>
                                  <i
                                    v-if="
                                      index != case_wrapper.flowNodes.length - 1
                                    "
                                    class="icon-long-arrow-right"
                                  ></i>
                                </div>
                              </div>
                              <div
                                class="runnerclass"
                                :id="
                                  'runner' +
                                  '-' +
                                  scene.sceneId +
                                  '-' +
                                  case_wrapper.caseId
                                "
                              >
                                <p></p>
                              </div>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                    <!-- </div> -->
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
        <!--main content end-->
      </div>
    </div>
    <!--content end -->
    <el-dialog title="新增场景" :visible.sync="senceDialog" width="50%">
      <div class="modal-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="th">
                <input type="checkbox" @change="selectAll($event)" />全选
              </th>
              <th scope="col">场景名称</th>
              <th scope="col">场景描述</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(scene, index) in allscenes" :key="'scene' + index">
              <td v-if="senceAddedStatus(scene.id)">已选择</td>
              <td v-else>
                <input
                  type="checkbox"
                  v-model="selectedScene"
                  v-bind:value="scene.id"
                />
              </td>
              <td>{{ scene.nameMedium }}</td>
              <td>{{ scene.descShort }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-lg-12 text-center">
        <div class="pagination-wrap" v-if="scenePage.totalPage != 0">
          <div class="num">
            <select
              size="1"
              name="sample_1_length"
              aria-controls="sample_1"
              class="form-control"
              v-model="scenePage.pageSize"
              id="pageSizeSelect"
            >
              <option value="5" selected>5条/页</option>
              <option value="10">10条/页</option>
              <option value="20">20条/页</option>
              <option value="50">50条/页</option>
            </select>
          </div>
          <ul class="pagination">
            <li :class="scenePage.currentPage == 1 ? 'disabled' : ''">
              <a href="javascript:;" @click="turnToScenePage(1)">首页</a>
            </li>
            <li :class="scenePage.currentPage == 1 ? 'disabled' : ''">
              <a
                @click="turnToScenePage(scenePage.currentPage - 1)"
                href="javascript:;"
                >上一页</a
              >
            </li>
            <li>
              <a
                href="javascript:;"
                @click="turnToScenePage(scenePage.currentPage - 3)"
                v-text="scenePage.currentPage - 3"
                v-if="scenePage.currentPage - 3 > 0"
              ></a>
            </li>
            <li>
              <a
                href="javascript:;"
                @click="turnToScenePage(scenePage.currentPage - 2)"
                v-text="scenePage.currentPage - 2"
                v-if="scenePage.currentPage - 2 > 0"
              ></a>
            </li>
            <li>
              <a
                href="javascript:;"
                @click="turnToScenePage(scenePage.currentPage - 1)"
                v-text="scenePage.currentPage - 1"
                v-if="scenePage.currentPage - 1 > 0"
              ></a>
            </li>
            <li class="active">
              <a
                href="javascript:;"
                @click="turnToScenePage(scenePage.currentPage)"
                v-text="scenePage.currentPage"
                >3</a
              >
            </li>
            <li>
              <a
                href="javascript:;"
                @click="turnToScenePage(scenePage.currentPage + 1)"
                v-text="scenePage.currentPage + 1"
                v-if="scenePage.currentPage + 1 <= scenePage.totalPage"
              ></a>
            </li>
            <li>
              <a
                href="javascript:;"
                @click="turnToScenePage(scenePage.currentPage + 2)"
                v-text="scenePage.currentPage + 2"
                v-if="scenePage.currentPage + 2 <= scenePage.totalPage"
              ></a>
            </li>
            <li
              :class="
                scenePage.currentPage == scenePage.totalPage ? 'disabled' : ''
              "
            >
              <a
                href="javascript:;"
                @click="turnToScenePage(scenePage.currentPage + 1)"
                >下一页</a
              >
            </li>
            <li
              :class="
                scenePage.currentPage == scenePage.totalPage ? 'disabled' : ''
              "
            >
              <a
                href="javascript:;"
                @click="turnToScenePage(scenePage.totalPage)"
                >尾页</a
              >
            </li>
          </ul>
          <div class="go">
            <div
              :class="isPageNumberError ? 'input-group error' : 'input-group'"
            >
              <input
                class="form-control"
                type="number"
                v-model="goToPage"
                min="1"
                :max="scenePage.totalPage"
              />
              <a
                href="javascript:;"
                class="input-group-addon"
                @click="turnToScenePage(goToPage)"
                >Go</a
              >
            </div>
          </div>
          <p class="page-info nowrap">
            当前第
            <span class="text-primary" v-text="scenePage.currentPage"></span> /
            <span class="text-primary" v-text="scenePage.totalPage"></span
            >页，共有
            <span class="text-primary" v-text="scenePage.totalCount"></span>条
          </p>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" @click="senceDialog = false">
          取消
        </button>
        <button type="button" class="btn btn-primary" @click="sendSceneData()">
          确认
        </button>
      </div>
    </el-dialog>
    <!-- /.modal -->

    <el-dialog title="测试计划管理" :visible.sync="testPlanDialog" width="50%">
      <el-row>
        <el-col>
          <el-button @click="showAddModal()"> 新增 </el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table stripe :data="testPlanArray" style="width: 100%">
          <el-table-column prop="nameMedium" label="名称" width="180">
          </el-table-column>
          <el-table-column prop="descMedium" label="描述" width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="showUpdateModal(scope.row)"
                >修改</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <el-pagination
          @size-change="turnToPage(1)"
          @current-change="
            (val) => {
              turnToPage(val);
            }
          "
          :current-page="page.currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.totalPage"
        >
        </el-pagination>
      </el-row>
    </el-dialog>
    <!--新增测试轮次 -->
    <div
      class="modal fade"
      tabindex="-1"
      role="dialog"
      id="addTestRoundId"
      aria-hidden="true"
      aria-labelledby="addTestRound"
      data-toggle="modal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              &times;
            </button>
            <h4 class="modal-title" id="addTestRound">新增测试轮次</h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-2 control-label">名称</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    v-model="addRoundRowData.roundName"
                    class="form-control"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">描述</label>
                <div class="col-sm-10">
                  <textarea
                    resize="disabled"
                    v-model="addRoundRowData.roundDesc"
                    class="form-control"
                    autocomplete="off"
                  ></textarea>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">记录单保存方式</label>
                <div class="col-sm-10">
                  <select
                    class="form-control"
                    v-model="addRoundRowData.recordmanagementflag"
                  >
                    <option
                      v-for="option in [
                        { value: 1, label: '仅保存一份' },
                        { value: 2, label: '保存多份' },
                      ]"
                      :value="option.value"
                      :key="option.value"
                    >
                      {{ option.label }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">定时执行方式</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    v-model="addRoundRowData.timeexecutesetting"
                    class="form-control"
                    autocomplete="off"
                  />
                </div>
              </div>
            </form>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
              >
                关闭
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="addTestRound()"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--新增模态框-->

    <el-dialog
      title="新增测试计划"
      :visible.sync="addTestPlanDialog"
      width="50%"
    >
      <div class="modal-body">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="testplan-name" class="col-sm-2 control-label"
              >测试计划名称</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                v-model="addRowData.nameMedium"
                class="form-control"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="testplan-desc" class="col-sm-2 control-label"
              >测试计划描述</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                v-model="addRowData.descMedium"
                class="form-control"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="form-group display" v-show="1 === editType">
            <label class="col-sm-2 control-label">测试阶段</label>
            <div class="col-sm-10">
              <select
                name="testPhaseId"
                id=""
                class="form-control"
                v-model="addRowData.testPhaseId"
              >
                <option
                  v-for="testPhase in testPhaseArray"
                  :value="testPhase.id"
                  :key="testPhase.id"
                >
                  {{ testPhase.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group display" v-show="1 === editType">
            <label class="col-sm-2 control-label">测试轮次</label>
            <div class="col-sm-10">
              <select
                name="testRoundId"
                v-model="addRowData.testRoundId"
                style="width: 80%; height: 34px"
                filterable
                placeholder="请选择"
              >
                <option
                  v-for="testRound in testRoundArray"
                  :key="testRound.id"
                  :label="testRound.name"
                  :value="testRound.id"
                ></option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button data-dismiss="modal" class="btn btn-default" type="button" @click="addTestPlanDialog = false">
          取消
        </button>
        <button
          class="btn btn-success"
          type="button"
          id="btn-add"
          @click="add()"
        >
          确定
        </button>
      </div>
    </el-dialog>
    <!--出错信息提示-->
    <div
      class="modal fade"
      tabindex="-1"
      role="dialog"
      id="runInterrupt"
      aria-hidden="true"
      aria-labelledby="addTestRound"
      data-toggle="modal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              &times;
            </button>
            <h4 class="modal-title" id="addTestRound">用理执行出错</h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-8 control-label"
                  >执行用例出错，请选择是否继续执行，{{
                    interruptTime
                  }}后自动继续执行</label
                >
              </div>
            </form>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-default"
                @click="runContinue()"
              >
                继续执行
              </button>
              <button type="button" class="btn btn-primary" @click="runStop()">
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--content end -->
</template>

<script src="@/lib/highlight.pack.js"></script>
<script>
hljs.initHighlightingOnLoad();
</script>

<script>
import $ from "jquery";
import jQuery from "jquery";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "@/libs/highlight.pack.js";
import hljs from "@/libs/highlight.pack.js";
// import {hljs.initHighlightingOnLoad()}
// import '@/lib/bootstrap.min'
import "jquery-ui/themes/base/draggable.css"; //此css不引入也不影响draggable 功能
import "jquery-ui/themes/base/sortable.css"; //此css不引入也不影响draggable 功能
import "jquery-ui/themes/base/resizable.css"; //使用resizable功能必须引入此css！
import "jquery-ui/ui/widgets/draggable"; //必须像如下这样直接引入，import 'jquery-ui' 这样引入是无效的
import "jquery-ui/ui/widgets/sortable"; //必须像如下这样直接引入，import 'jquery-ui' 这样引入是无效的
import "jquery-ui/ui/widgets/resizable";

import {
  gotoPage,
  getSendData,
  loginDetect,
  resort,
  search,
  destructe,
  createTable,
  getDate,
  changeShowRows,
  paginationControl,
  lastPage,
  firstPage,
  previousPage,
  nextPage,
  updateTableAndPagination,
  showAlterModal,
  initialTable,
} from "../../libs/testitems.es.js";
import Vac from "../../libs/vac-functions.es";
import Request from "../../libs/request";
import SideBar from "@/components/side-bar";
import vueMixins from "@/libs/vueMixins.js";
import {
  initialAddRowData,
  initialAddRoundRowData,
} from "./conf/testplanExecute.js";
export default {
  components: {},
  mixins: [vueMixins],
  data() {
    return {
      // tooltipMessage:'',
      goToPage: 0,
      runners: [],
      runnerselected: [],
      runnerExecuteType: "appointed",
      caselibIds: [],
      caselibId: 3, // caselibId
      executionround: "1", // 执行轮次
      recordflag: 2, // 记录单
      exeScope: "1", // 执行范围
      selectState: "", // 选择状态
      userId: sessionStorage.getItem("userId") || 3,
      projectName:
        sessionStorage.getItem("projectNameStorage") ||
        "(电子商务网站购物测试)", //项目名称
      fullFlag: true,

      // save the value obtained from back end and will set to the selects' options
      testPlans: [],
      testrounds: [],
      // save the values which is selected by users and will be send to the back end
      testPlanId: sessionStorage.getItem("testPlanId") || undefined,
      // the cases and scenes obtained from back end
      testCaseList: [],
      testSceneList: [],
      // save the value of input in the scene list
      checkallSceneIds: [],
      sceneIds: [], // save all sceneids		[2,3,4]
      sceneCaseMap: new Map(), // save the cases and flownodes in scene { sceneId: [caseid, flownodeid...]}
      sceneCaseIds: [], // only save the caseids in the form of 'sceneid-caseid' in scene ["29-27"]
      flowNodesMap: new Map(), // save the nodes in flowCase { caseId: [flownode, flownode...]}

      // get all the scenes when user click addScene
      allscenes: null,

      /***************** save data in scene list ************************/
      // selected Scene which is checked
      selectedScenes: [],
      selectedSceneCases: [],
      // selectedFlowNodes: [],

      /***************** save data in case list ************************/
      checkall: false,
      // save the selected cases in caselist
      selectedCases: [],
      // save the checked flow nodes in caselist
      checkedFlowNodes: [],
      // save the all case ids in caselist
      caseIds: [],
      // save the all flowNode ids in caselist
      flowNodeIds: new Map(),

      // Scenes in add-scene modal
      selectedScene: [], // 3, 1, 2, [1,2], [3],[{"sceneId":1,"testcaseList":[1,2]}]
      // exeImgs: { },
      exeImgs: {
        0: "/index/static/img/waiting.png",
        10: "/index/static/img/init.png",
        2: "/index/static/img/success.png",
        3: "/index/static/img/error.png",
        13: "/index/static/img/running.gif",
        4: "/index/static/img/success.png",
        5: "/index/static/img/jump.png",
        11: "/index/static/img/warn.png",
        12: "/index/static/img/warn.png",
      },
      // 批量执行相关
      batchId: null,
      exeStautShow: '执行状态：<i class="el-icon-info""></i>无计划',
      tagType: "primary",
      exeStauts: true, //执行状态,用与判断该测试计划是否在执行中，确定是否调用执行接口
      // save the string : 展开 and 收起
      expandString: "展开",
      unexpandString: "收起",
      //来自测试计划页面的data
      selectTestPlan: "",
      addModalShow: false,
      addRoundModalShow: false,
      addRowData: {
        ...initialAddRowData,
      },
      addRoundRowData: {
        ...initialAddRoundRowData,
      },
      addModalTitle: "新增测试计划",
      editType: 1, // 1: add  2: update
      testPlanArray: [],
      testPhaseArray: [],
      testRoundArray: [],
      orderType: "asc",
      orderColumns: "id",
      page: {
        totalCount: 1,
        currentPage: 1,
        totalPage: 1,
        pageSize: 5,
      },
      scenePage: {
        currentPage: 1,
        pageSize: 5,
        order: "",
        sort: "",
        totalPage: 1,
        totalCount: 1,
      },
      logShow: false,

      //出错查询的时间
      interruptTime: 5,
      //是否通过界面点击进行执行了,0:用户不动 1：点击执行 2：点击取消
      interruptExe: 0,
      //出错时的断点保存循环查询的data
      interruptData: {},
      isPageNumberError: false,
      senceDialog: false,
      testPlanDialog: false,
      addTestPlanDialog: false,
      notTimerFlag: true,

      // 下载浏览器
      isDownload: false,
      isStop: false,

      // 是否发邮件
      sendMail: false
    };
  },
  mounted() {
    if(this.$route.query.sceneId) {
      this.notTimerFlag = this.$route.query.notTimer
      this.sceneId = this.$route.query.sceneId
      console.log('定时执行发起的', this.notTimerFlag, this.sceneId)
    }
    console.log("sessionId", sessionStorage.getItem("userId"));
    var _this = this;
    var tempTestPlanId = sessionStorage.getItem("testPlanId") || undefined;
    _this.caselibId = sessionStorage.getItem("caselibId") || 1241;
    this.addRowData.caseLibId = _this.caselibId;
    this.getTestPlans();
    console.log("--*-*-*-*-*-*-*-*-*");
    console.log(this.addRowData);
    var getPlans = new Promise((resolve, reject) => {
      console.log(
        "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
      );
      Vac.ajax({
        url: "testPlanController/queryTestPlan",
        data: {
          caseLibId: _this.caselibId,
          nameMedium: "",
          descMedium: "",
        },
        success: function (data) {
          console.log(
            "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
          );
          if (data.respCode === "0000") {
            if (data.testPlanEntityList && data.testPlanEntityList.length > 0) {
              if (tempTestPlanId == undefined) {
                //从执行记录查询跳转过来所需
                _this.testPlanId = data.testPlanEntityList[0].id;
                console.log("我来自查询出来的");
              } else {
                console.log("我来自跳转转过来的出来的");
                _this.testPlanId = tempTestPlanId;
                sessionStorage.removeItem("testPlanId");
              }
              _this.testPlans = data.testPlanEntityList;
              resolve();
            } else {
              reject("请添加测试计划！");
            }
            return;
          }
          reject("出了点问题吧");
        },
      });
    });
    getPlans
      .then(() => {
        _this.getCases(true);
      })
      .catch((err) => {
        Vac.alert(err);
      });
    // init the modal
    $("#add-modal").on("hidden.bs.modal", function (e) {
      var scenes = _this.selectedScene;
      for (var i = 0, len = scenes.length; i < len; i++) {
        scenes.shift();
      }
    });
    // let result = Vac.isAncestor(document.querySelector('html'), document.querySelector('body'))
    // console.log(result)
    this.queryRunners();
  },
  methods: {
    // 浏览器下载
    downloadWin(type) {
      switch(type) {
        case 1:
          window.location.href = this.address4 + 'atf-data/browser_windows/chrome_87_install.zip'
          break;
        case 2: 
          window.location.href = this.address4 + 'atf-data/browser_windows/Firefox-install.zip'
          break;
        default:
          break;
      }
    },

    downloadMac(type) {
      switch(type) {
        case 1:
          window.location.href = this.address4 + 'atf-data/browser_mac/chrome_87_install.zip'
          break;
        case 2: 
          window.location.href = this.address4 + 'atf-data/browser_mac/Firefox-install.zip'
          break;
        default:
          break;
      }
    },


    onSubmit() {
      console.log("submit!");
    },
    getTestPlanList() {
      Request({
        url: "testPlanController/queryTestPlan",
        method: "post",
        params: {
          nameMedium: "",
          descMedium: "",
          caseLibId: +this.caseLibId,
        },
      })
        .then((res) => {
          this.testPlanId = data.testPlanEntityList[0].id;
          this.testPlans = data.testPlanEntityList;
          resolve();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    queryRunners: function () {
      var _this = this;
      Vac.ajax({
        url: "executeController/queryRunners",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          serviceName: "web.ui",
          userId: sessionStorage.getItem('userId')
        }),
        success: function (data) {
          if (data.respCode == "0000") {
            _this.runners = data.runners;
            // for(let item of _this.runners){
            //     $('#runnerselected').append(`<option value="${item.identifiableName}">${item.runnerName}</option>`);
            // }
            // $('#runnerselected').selectpicker('refresh');
            if (data.runners.length == 0) Vac.alert("查询不到执行机");
            // else
            // _this.runner=data.runners[0].identifiableName;
          } else {
            Vac.alert(data.respMsg);
          }
        },
        error: function () {
          Vac.alert("网络错误！请点击重新查询！");
        },
      });
    },
    hideAlert: function () {
      this.alertShow = false;
    },
    stopExe: function () {
      var _this = this;
      // if(_this.exeStauts) {
      // 	Vac.alert('该测试计划尚未执行或执行完毕。');return;
      // }
      Vac.ajax({
        url: "batchRunCtrlController/terminateBatch",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          batchId: _this.batchId,
        }),
        success: function (data) {
          if (data.respCode == "0000") {
            Vac.alert(data.respMsg);
            this.isStop = true
            _this.startQueryResult();
          } else {
            Vac.alert(data.respMsg);
          }
        },
        error: function () {
          Vac.alert("网络错误！请点击重新查询！");
        },
      });
    },

    executeAll: function () {
      var _this = this;
      if (!_this.userId) {
        Vac.alert("请填写用户id");
        return;
      }
      if (!_this.recordflag) {
        Vac.alert("请填写recordflag");
        return;
      }
      if (!_this.exeScope) {
        Vac.alert("请填写执行范围");
        return;
      }
      if (!_this.testPlanId) {
        Vac.alert("请选择测试计划");
        return;
      }
      if (
        _this.runnerExecuteType == "appointed" &&
        _this.runnerselected.length === 0
      ) {
        Vac.alert("请选择执行机");
        return;
      }
      if (!_this.exeStauts) {
        Vac.alert("该测试计划正在执行中，若想再次执行，请终止当前执行");
        return;
      }
      var selectedExeInstances = [];
      if (_this.exeScope == 1) {
      } else {
        for (var i = 0; i < _this.selectedSceneCases.length; i++) {
          let temp = {};
          let selectedSceneCase = _this.selectedSceneCases[i].split("-");
          temp.caseId = selectedSceneCase[selectedSceneCase.length - 1];
          temp.sceneId = selectedSceneCase[1];
          selectedExeInstances.push(temp);
        }
      }
      // _this.logShow = true;
      _this.exeStautShow = '执行状态：<i class="el-icon-loading"></i>执行中';
      _this.tagType = "primary";
      Vac.ajax({
        url: "executeController/t1",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          userId: _this.userId,
          recordflag: _this.recordFlag,
          exeScope: _this.exeScope,
          selectState: _this.selectState,
          selectedExeInstances: selectedExeInstances,
          testPlanId: _this.testPlanId,
          identifiableRunnerName: _this.runnerExecuteType,
          appointedRunners: _this.runnerselected,
          sendMail: this.sendMail
        }),
        success: function (data) {
          if (data.respCode === "0000") {
            // this.$store.disatch('updateTotalScore', {
            //     userId: sessionStorage.getItem('userId'),
            //     totalScore: Number(sessionStorage.getItem("totalScore")) + 5
            // })
            console.log("查询日志", this.$store);
            _this.startQueryLog(); //查询日志
            Vac.ajax({
              //因为查询执行信息需要最近执行的批量号因此需要查询批次
              url: "batchRunCtrlController/queryLatestBatchIdForTestPlan",
              type: "post",
              contentType: "application/json",
              data: JSON.stringify({
                testPlanId: _this.testPlanId,
              }),
              success: function (data) {
                _this.batchId = data.batchId;
                _this.startQueryResult();
              },
              error: function () {
                Vac.alert("网络错误，执行失败！");
                _this.setResultIcon();
              },
            });
          } else {
            Vac.alert(data.respMsg);
            _this.setResultIcon();
          }
        },
        error: function () {
          Vac.alert("网络错误，执行失败！");
          _this.setResultIcon();
        },
      });
    },
    // 发起定时执行
    executeAllT2() {
      var _this = this;
      if (!_this.userId) {
        Vac.alert("请填写用户id");
        return;
      }
      if (!_this.recordflag) {
        Vac.alert("请填写recordflag");
        return;
      }
      if (!_this.exeScope) {
        Vac.alert("请填写执行范围");
        return;
      }
      if (!_this.testPlanId) {
        Vac.alert("请选择测试计划");
        return;
      }
      if (
        _this.runnerExecuteType == "appointed" &&
        _this.runnerselected.length === 0
      ) {
        Vac.alert("请选择执行机");
        return;
      }
      if (!_this.exeStauts) {
        Vac.alert("该测试计划正在执行中，若想再次执行，请终止当前执行");
        return;
      }
      
      var selectedExeInstances = [];
      if (_this.exeScope == 1) {
      } else {
        for (var i = 0; i < _this.selectedSceneCases.length; i++) {
          let temp = {};
          let selectedSceneCase = _this.selectedSceneCases[i].split("-");
          temp.caseId = selectedSceneCase[selectedSceneCase.length - 1];
          temp.sceneId = selectedSceneCase[1];
          selectedExeInstances.push(temp);
        }
      }
      // _this.logShow = true;
      _this.exeStautShow = '执行状态：<i class="el-icon-loading"></i>执行中';
      _this.tagType = "primary";
      Vac.ajax({
        url: "executeController/t2",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
            sceneId: this.sceneId,
            t1ReqDto: {
                userId: _this.userId,
                recordflag: _this.recordFlag,
                exeScope: _this.exeScope,
                selectState: _this.selectState,
                selectedExeInstances: selectedExeInstances,
                testPlanId: _this.testPlanId,
                identifiableRunnerName: _this.runnerExecuteType,
                appointedRunners: _this.runnerselected,
            }
        }),
        success: function (data) {
          if (data.respCode === "0000") {
            console.log("查询日志", this.$store);
            // _this.startQueryLog(); //查询日志
            // Vac.ajax({
            //   //因为查询执行信息需要最近执行的批量号因此需要查询批次
            //   url: "batchRunCtrlController/queryLatestBatchIdForTestPlan",
            //   type: "post",
            //   contentType: "application/json",
            //   data: JSON.stringify({
            //     testPlanId: _this.testPlanId,
            //   }),
            //   success: function (data) {
            //     _this.batchId = data.batchId;
            //     _this.$message.success(data.respMsg)
            //     _this.startQueryResult();
            //   },
            //   error: function () {
            //     Vac.alert("网络错误，执行失败！");
            //     _this.setResultIcon();
            //   },
            // });
            _this.timerView()
            _this.exeStautShow = '执行状态：<i class="el-icon-loading"></i>任务等待执行';
          } else {
            Vac.alert(data.respMsg);
            _this.exeStautShow = '执行状态：<i class="el-icon-loading"></i>任务等待执行';
            _this.setResultIcon();
          }
        },
        error: function () {
          Vac.alert("网络错误，执行失败！");
          _this.setResultIcon();
        },
      });
    },
    timerView() {
        Request({
            url: '/sceneTimer/queryAllSceneTimersByScene',
            method: 'post',
            params: {
                sceneId: Number(this.sceneId),
                userId: Number(sessionStorage.getItem('userId'))
            }
        }).then(res => {
            console.log('查看', res)
            switch(Number(res.timers[0].status)) {
                case 0:
                    this.$alert('当前状态：已完成')
                    break;
                case 1:
                    this.$alert('当前状态：等待发起执行')
                    break;
                case 2:
                    this.$alert('当前状态：发起执行，等待定时器下一次启动')
                    break;
                default:
                    this.$alert('当前状态：定时器正在执行')
                    break
            }
        }).catch(err => {
            console.log('查询失败')
        })
    },
    fullScreen: function () {
      // this.$refs.logShow.style.width = "100%" ;
      // this.$refs.logShow.style.height = "100%" ;
      var logDiv = document.getElementsByClassName("logcontainer")[0];
      logDiv.style.width = "100%";
      logDiv.style.height = "80vh";
      this.fullFlag = false;
    },
    showScreen() {
      this.logShow = !this.logShow;
      this.subScreen();
    },
    updateScreen: function () {
      var _this = this;
      var logDiv = document.getElementsByClassName("logcontainer")[0];
      logDiv.style.width = "auto";
      logDiv.style.height = "auto";
      _this.logShow = !_this.logShow;
    },
    subScreen: function () {
      var logDiv = document.getElementsByClassName("logcontainer")[0];
      logDiv.style.width = "500px";
      logDiv.style.height = "500px";
      this.fullFlag = true;
    }, 
    startQueryResult: function () {
      var _this = this;
      Vac.ajax({
        url: "batchRunCtrlController/syncQueryIncInsStatus",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          batchId: _this.batchId,
          reqSyncNo: null,
          sessionId: null,
        }),
        success: function (data) {
          if (data.respCode == "0000") {
            if (data.respSyncNo == -1) {
              _this.setResultIcon(data.insStatuses);
              _this.exeStautShow =
                '执行状态：<i class="el-icon-circle-check"></i>已执行';
              _this.tagType = "success";
              console.log("finish this branch");
            } else {
              _this.setResultIcon(data.insStatuses);
              _this.syncQueryIncInsStatus(data);
            }
          } else {
            Vac.alert(data.respMsg);
          }
        },
        error: function () {
          Vac.alert("网络错误！请点击重新查询！");
        },
      });
    },
    syncQueryIncInsStatus(values) {
      var _this = this;
      Vac.ajax({
        url: "batchRunCtrlController/syncQueryIncInsStatus",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          batchId: values.batchId,
          reqSyncNo: values.respSyncNo,
          sessionId: values.sessionId,
        }),
        success: function (data) {
          if (data.respSyncNo == -1) {
            _this.setResultIcon(data.insStatuses);
            console.log("finish this branch");
            _this.exeStautShow =
              '执行状态：<i class="el-icon-circle-check"></i>已执行';
            _this.tagType = "success";
          } else if (data.respSyncNo == -2) {
            _this.syncQueryIncInsStatus(values);
          } else {
            _this.setResultIcon(data.insStatuses);
            //若出错  则弹框询问
            if (
              data.insStatuses[0].manualChooseErrExecuting == true &&
              data.insStatuses[0].status == 3
            ) {
              _this.interruptData = data;
              _this.runInterrupt();
            } else {
              _this.syncQueryIncInsStatus(data);
            }

            console.log("continue this branch");
          }
        },
        error: function () {
          Vac.alert("网络错误！请点击重新查询！");
        },
      });
    },
    runInterrupt() {
      $("#runInterrupt").modal("show");
      var _this = this;
      var name = setInterval(
        function () {
          if (_this.interruptExe == 2) {
            clearInterval(name);
            _this.interruptTime = 5;
            _this.interruptExe = 0;
            _this.instanceErrorChoice(2);
            return false;
          }
          //如果秒数大于0
          if (_this.interruptTime < 1 || _this.interruptExe == 1) {
            //清除定时任务
            $("#runInterrupt").modal("hide");
            _this.interruptExe = 0;
            clearInterval(name);
            _this.interruptTime = 5;
            _this.instanceErrorChoice(1);

            //跳转
            return true;
          } else {
            //将秒数写入到页面并将秒数减一
            _this.interruptTime--;
          }
        },
        //每秒执行一次
        1000
      );
    },
    runContinue() {
      var _this = this;
      _this.interruptExe = 1;
      $("#runInterrupt").modal("hide");
    },
    runStop() {
      var _this = this;
      _this.interruptExe = 2;
      $("#runInterrupt").modal("hide");
    },
    instanceErrorChoice(status) {
      var _this = this;
      let errorContinuing = status == 2 ? false : true;
      Vac.ajax({
        url: "batchRunCtrlController/instanceErrorChoice",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          batchId: _this.interruptData.batchId,
          sceneId: _this.interruptData.insStatuses[0].sceneId,
          caseId: _this.interruptData.insStatuses[0].testcaseId,
          errorContinuing: errorContinuing,
        }),
        success: function (data) {
          if (data.respCode == "0000") {
            if (errorContinuing) {
              _this.syncQueryIncInsStatus(_this.interruptData);
            }
          } else {
            Vac.alert(data.respMsg);
          }
        },
        error: function () {
          Vac.alert("网络错误！请点击重新查询！");
        },
      });
    },
    startQueryLog: function () {
      var _this = this;
      Vac.ajax({
        url: "executeController/syncQueryLog",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          logType: 2,
          reqSyncNo: null,
          sessionId: null,
          testPlanId: _this.testPlanId,
          latestLineNum: 50,
        }),
        success: function (data) {
          if (data.respCode == "0000") {
            console.log("aaaaaaaa");
            let textarea = $("#logarea");
            textarea.text(data.logSeg);
            var logarea = document.getElementById("logarea");
            hljs.highlightBlock(logarea);
            textarea.scrollTop(99999999999);
            syncQueryIncLog(data);
          } else {
            Vac.alert(data.respMsg);
          }
        },
        error: function () {
          Vac.alert("网络错误！请点击重新查询！");
        },
      });

      function syncQueryIncLog(values) {
        Vac.ajax({
          url: "executeController/syncQueryLog",
          type: "post",
          contentType: "application/json",
          data: JSON.stringify({
            logType: 2,
            reqSyncNo: values.respSyncNo,
            sessionId: values.sessionId,
            testPlanId: values.testPlanId,
            latestLineNum: 50,
          }),
          success: function (data) {
            if (data.respCode == "0000") {
              let textarea = $("#logarea");
              if (data.logSeg != null) {
                textarea.text(textarea.text() + data.logSeg);
                var logarea = document.getElementById("logarea");
                hljs.highlightBlock(logarea);
              }
              textarea.scrollTop(99999999999);
              syncQueryIncLog(data);
            } else {
              Vac.alert(data.respMsg);
            }
          },
          error: function () {
            Vac.alert("网络错误！请点击重新查询！");
          },
        });
      }
    },
    reQuery: function () {
      var _this = this;
      Vac.ajax({
        url: "batchRunCtrlController/queryLatestBatchIdForTestPlan",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          testPlanId: _this.testPlanId,
        }),
        success: function (data) {
          _this.batchId = data.batchId;
          _this.startQueryResult();
        },
        error: function () {
          Vac.alert("网络错误，执行失败！");
          _this.setResultIcon();
        },
      });
      if (_this.batchId) _this.startQueryResult();
    },
    setResultIcon: function (data) {
      if (!data) {
        [...document.querySelectorAll('img[id^="img-"]')].forEach((item) => {
          item.src = this.exeImgs["0"];
        });
        return;
      }
      for (let d of data) {
        //  //注释掉直接选中的用例
        // if (d.sourcechannel === 'PE4') {	//直接选中执行的测试用例
        // 	if (d.flownodeid) {
        // 		document.querySelector(`#img-${d.flownodeid}`).src = this.exeImgs[d.status];
        // 	} else {
        // 		document.querySelector(`#img-${d.caseid}`).src = this.exeImgs[d.status];
        // 	}
        // } else {
        if (d.flowNodeId) {
          if (
            document.querySelector(
              `#img-${d.sceneId}-${d.testcaseId}-${d.flowNodeId}`
            ) != null
          ) {
            document.querySelector(
              `#img-${d.sceneId}-${d.testcaseId}-${d.flowNodeId}`
            ).src = this.exeImgs[d.status];
          }
        } else {
          if (
            document.querySelector(`#img-${d.sceneId}-${d.testcaseId}`) != null
          ) {
            document.querySelector(
              `#img-${d.sceneId}-${d.testcaseId}`
            ).src = this.exeImgs[d.status];
          }
        }
        let selectNode = "#runner-" + d.sceneId + "-" + d.testcaseId;
        if ($(selectNode) != null) {
          console.log(d.runnerName);
          if (d.runnerName != null) {
            let runner = d.runnerName.replace(/-/g, "_");
            let runnerpors = runner.split("/");
            console.log(
              $(selectNode)
                .children()
                .text("分配执行机为：" + runnerpors[0])
            );
          }
        }

        //}
      }
    },
    testPlanManager: function () {
      this.testPlanDialog = true;
    },
    addScene: function () {
      var _this = this;

      this.getScene(
        this.scenePage.currentPage,
        this.scenePage.pageSize,
        this.scenePage.order,
        this.scenePage.sort
      );
    },
    getScene: function (currentPage, pageSize, order, sort) {
      var _this = this;
      console.log(_this.caselibId);
      Vac.ajax({
        url: "sceneController/pagedBatchQueryScene",
        data: JSON.stringify({
          currentPage: currentPage,
          pageSize: pageSize,
          orderType: order,
          orderColumns: sort,
          caseLibId: _this.caselibId,
        }),
        success: (data) => {
          if (data.respCode == "0000") {
            console.log("陈工了");
            _this.allscenes = data.sceneEntityList;
            _this.scenePage.currentPage = data.currentPage;
            _this.scenePage.totalCount = data.totalCount;
            _this.scenePage.totalPage = data.totalPage;
            this.senceDialog = true;
            console.log("陈工了2223");
          } else {
            Vac.alert("场景获取失败!");
          }
        },
      });
    },
    turnToScenePage(pageNum) {
      var ts = this;
      pageNum = parseInt(pageNum);

      //页数不合法则退出
      if (!pageNum || pageNum > ts.scenePage.totalPage || pageNum < 1) {
        alert("页码输入有误！");
        return false;
      }
      //更新页面
      else {
        this.scenePage.currentPage = pageNum;
        this.getScene(
          ts.scenePage.currentPage,
          ts.scenePage.pageSize,
          ts.scenePage.order,
          ts.scenePage.sort
        );
      }
    },
    removeSceneAndCase: function () {
      var _this = this;
      if (!this.selectedScenes.length) {
        Vac.alert("请选择要删除的场景!");
        return;
      }
      // let sceneList = this.selectedScenes.length === 0 ? '' : JSON.stringify(this.selectedScenes);
      // let testcaseList = this.selectedCases.length === 0 ? '' : JSON.stringify(this.selectedCases);
      // let sceneCaseList = new Array();
      // let o = {};
      // for (let sceneCase of this.selectedSceneCases) {
      // 	let arr = sceneCase.split('-');
      // 	if (arr.length !== 2) {continue;}
      // 	o[arr[0]] ? o[arr[0]].push(+arr[1]) : o[arr[0]] = [+arr[1]];
      // }
      // for (let key of Object.keys(o)) {
      // 	sceneCaseList.push({
      // 		sceneId: +key,
      // 		testcaseList: o[key].length === 0 ? '' : o[key]
      // 	})
      // }
      // sceneCaseList = sceneCaseList.length === 0 ? '' : JSON.stringify(sceneCaseList);
      // //
      // if (!sceneCaseList.length && !sceneList.length && !testcaseList.length) {
      // 	Vac.alert('请至少选择一项进行删除');
      // 	return;
      // }
      let data = {
        testPlanId: this.testPlanId,
        sceneList: this.selectedScenes,
        testcaseList: this.selectedCases,
      };
      Vac.ajax({
        url: "caseExecuteInstance/deleteCaseExecuteInstance",
        data: data,
        success: function (data) {
          if (data.respCode === "0000") {
            $("#vac-confirm").modal("hide");
            _this.selectedScenes = [];
            Vac.alert("移除成功");
            _this.getCases(false, true);
          } else {
            Vac.alert("移除失败");
          }
        },
      });
    },
    sendSceneData: function () {
      var _this = this;
      var data = {
        testPlanId: +this.testPlanId,
        testcaseList: [], // 暂时为空   [1,2]
        sceneList: this.selectedScene, // [3]
        creatorId: +sessionStorage.getItem("userId") || 3,
      };
      // send data and display the modal
      Vac.ajax({
        url: "caseExecuteInstance/insertCaseExecuteInstance",
        data: data,
        success: function (data) {
          $("#add-modal").modal("hide");
          if (data.respCode === "0000") {
            _this.getCases(true);
            // _this.alertShow = true;
            // _this.tooltipMessage = '添加成功';
            _this.$nextTick(() => {
              _this.setDraggable();
            });
          } else {
            Vac.alert(data.respMsg);
          }
        },
        error: function () {
          $("#add-modal").modal("hide");
          Vac.alert("添加失败");
        },
      });
    },
    selectAll: function (event) {
      if (event.target.checked) {
        this.allscenes.forEach((scene) => {
          if (!this.selectedScene.includes(scene.id)) {
            this.selectedScene.push(scene.id);
          }
        });
      } else {
        this.allscenes.forEach((scene) => {
          this.selectedScene.pop();
        });
      }
    },
    setDraggable: function () {
      if ($(".sortable_caselist").length > 0) {
        //$('#id').sortable()函數实现拖动 disableSelection文章不能被选择
        $(".sortable_caselist").sortable({
          handle: ".handle",
        });
        $(".sortable_caselist").disableSelection();
      }
      if ($(".sortable_sceneslist").length > 0) {
        $(".sortable_sceneslist").sortable({
          handle: ".handle2",
        });
        $(".sortable_sceneslist").disableSelection();
      }
      if ($(".sortable_scene_caselist").length > 0) {
        $(".sortable_scene_caselist").sortable({
          handle: ".handle1",
        });
        $(".sortable_scene_caselist").disableSelection();
      }
      if ($(".scene-list-wrapper").length > 0) {
        $(".scene-list-wrapper").sortable({
          handle: ".handle2",
        });
        $(".scene-list-wrapper").disableSelection();
      }

      if ($("#testround-main").length > 0) {
        $("#testround-main").disableSelection();
      }
    },
    senceAddedStatus(sceneId) {
      //判断是否已经添加
      let _this = this;
      var testSceneList = _this.testSceneList;
      for (let i = 0; i < testSceneList.length; i++) {
        if (+testSceneList[i].sceneId === +sceneId) return true;
      }
      return false;
    },
    getBatchIdForTestPlan(testPlanId) {
      var _this = this;
      Vac.ajax({
        url: "batchRunCtrlController/queryLatestBatchIdForTestPlan",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          testPlanId: testPlanId,
        }),
        success: function (data) {
          if (data.respCode == "0000") {
            _this.batchId = data.batchId;
            _this.getSinglebranchStatus();
          } else if (data.respCode == "10012000") {
            _this.exeStautShow =
              '执行状态：<i class="el-icon-video-play"></i>尚未执行';
            _this.tagType = "warning";
            _this.exeStauts = true;
            Vac.alert(data.respMsg);
          } else Vac.alert("查询branchId出错啦");
        },
        error: function () {
          Vac.alert("网络错误");
        },
      });
    },
    getSinglebranchStatus() {
      //查询单个批次结果 并展示执行状态
      var _this = this;
      Vac.ajax({
        url: "batchRunCtrlController/syncQueryIncInsStatus",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
          batchId: _this.batchId,
          reqSyncNo: null,
          sessionId: null,
        }),
        success: function (data) {
          if (data.respCode == "0000") {
            if (data.respSyncNo == -1) {
              _this.setResultIcon(data.insStatuses);
              _this.exeStautShow =
                '执行状态：<i class="el-icon-circle-check"></i>已执行';
              _this.tagType = "success";
              _this.exeStauts = true;
            } else {
              _this.setResultIcon(data.insStatuses);
              _this.exeStautShow =
                '执行状态：<i class="el-icon-loading"></i>执行中';
              _this.tagType = "primary";
              _this.exeStauts = false;
            }
          } else {
            _this.exeStautShow =
              '执行状态：<i class="el-icon-question"></i>未知';
            _this.tagType = "info";
            _this.exeStauts = false;
            Vac.alert(data.respMsg);
          }
        },
        error: function () {
          Vac.alert("网络错误！请点击重新查询！");
        },
      });
    },
    getCases(isAdd, isFirst) {
      var _this = this;
      var data = {
        caselibId: _this.caselibId,
        testPlanId: _this.testPlanId,
        roundFlag: 2,
        scopeFlag: 1,
      };
      if (!_this.testPlanId) {
        Vac.alert("请选择测试计划");
        return;
      }
      Vac.ajax({
        url: "caseExecuteInstance/queryCaseExecuteInstance",
        data: data,
        success: function (data) {
          if ("0000" != data.respCode) {
            Vac.alert(data.respMsg);
          } else {
            console.log(isAdd, data.executeInstanceResult.testSceneList,data.executeInstanceResult.testSceneList.length !== 0, isFirst,'节点');
            /*if(!(data.testCaseList && data.testCaseList.length)) {
              // Vac.alert('未查询到相关的用例信息！')
                            return;
                        }*/
            if ((isAdd &&(data.executeInstanceResult.testSceneList[0].testCaseList === null || data.executeInstanceResult.testSceneList[0].testCaseList.length == 0))) {
              // Vac.alert('未查询到相关的场景信息！')
              return _this.$message.warning('当前场景下无用例，不允许添加');
            }else {
              _this.testCaseList = data.executeInstanceResult.testCaseList;
              _this.testSceneList = data.executeInstanceResult.testSceneList;
              _this.$nextTick(() => {
                _this.setDraggable();
              });
              _this.caseIds.length = 0;
              _this.flowNodeIds.clear();
              if (_this.testCaseList != null) {
                _this.testCaseList.forEach((value) => {
                  Vac.pushNoRepeat(_this.caseIds, value.caseId);
                  if (value.caseCompositeType == 2) {
                    let arr = [];
                    for (let flowNode of value.flowNodes) {
                      arr.push(+flowNode.flowNodeId);
                    }
                    _this.flowNodeIds.set(+value.caseId, arr);
                  }
                });
              }
            }
  
            _this.sceneIds.length = [];
            _this.sceneCaseMap.clear();
            _this.flowNodesMap.clear();
            _this.testSceneList.sort(_this.compare("orderNum")); //更新排序后的场景列表
            if (_this.testSceneList) {
              for (var j = 0; j < _this.testSceneList.length; j++) {
                var scene = _this.testSceneList[j];
                // sceneIds save the id of scene  [4,5,6]
                _this.sceneIds.push(scene.sceneId);
                var caselist = [];
                for (var i = 0; i < scene.testCaseList.length; i++) {
                  var c = scene.testCaseList[i];
                  // caselist save the caseid in the form of  'sceneId-caseId' ['3-45','3-56']
                  caselist.push(scene.sceneId + "-" + c.caseId);
  
                  if (c.caseCompositeType == 2) {
                    _this.sceneCaseIds.push(scene.sceneId + "-" + c.caseId);
                    let flowNodes = [];
                    for (let flowNode of c.flowNodes) {
                      // caselist also save the flowNodeId in flowCase in the form of
                      //  'sceneId-caseId-flowNodeId' ['3-45-34','3-56-55']
                      caselist.push(
                        scene.sceneId + "-" + c.caseId + "-" + flowNode.flowNodeId
                      );
                      flowNodes.push(
                        scene.sceneId + "-" + c.caseId + "-" + flowNode.flowNodeId
                      );
                    }
                    // flowNodesMap save the map of caseId between flowNodes in the following form
                    // {
                    //  	'sceneId-caseId':  [ sceneId-caseId-flowNodeId,  sceneId-caseId-flowNodeId ]
                    // }
                    _this.flowNodesMap.set(
                      scene.sceneId + "-" + c.caseId,
                      flowNodes
                    );
                  }
                }
                // sceneCaseMap save the map of sceneId between flowNodeId and caseId in the following form
                // {
                //  	'sceneId':  [ sceneId-caseId, sceneId-caseId-flowNodeId ]
                // }
                _this.sceneCaseMap.set(scene.sceneId, caselist);
                if(isAdd) {
                  Vac.alert(data.respMsg);
                }
              }
            }
          }
        },
      });
      _this.getBatchIdForTestPlan(data.testPlanId); //查询批次的执行状态并且展示
    },
    compare: function (property) {
      //排序所需要的函数
      return function (obj1, obj2) {
        //比较两个对象相应的元素，按照升序排序
        var value1 = obj1[property];
        var value2 = obj2[property];
        return value1 - value2;
      };
    },
    hideCaseList: function (event) {
      var _this = this;
      var el = $(".case-list", $(event.currentTarget).parent())[0];
      // var curHeight = el.offsetHeight;
      // el.style.height = curHeight + 'px';
      el.style.display = "block";
      if ($(event.currentTarget).find("span").html() == _this.unexpandString) {
        // unexpandString 收起
        $(event.currentTarget)
          .find("i")
          .removeClass("icon-caret-down")
          .addClass("icon-caret-right");
        // el.style.height = '0px'
        el.style.display = "none";
        $(event.currentTarget).find("span").html(_this.expandString);
      } else {
        $(event.currentTarget)
          .find("i")
          .removeClass("icon-caret-right")
          .addClass("icon-caret-down");
        // el.style.height = 'auto';
        // var curHeight = el.offsetHeight; 	// 展开
        // el.style.height = '0px';
        // window.requestAnimationFrame(function() {
        // 	el.style.height = curHeight+ 'px'
        // })
        $(event.currentTarget).find("span").html(_this.unexpandString);
      }
      event.stopPropagation();
    },
    changeCase: function (id, type) {
      let arr;
      switch (type) {
        case 1:
          arr = this.selectedCases;
          break;
        case 2:
          arr = this.checkedFlowNodes;
          break;
        case 3:
          arr = this.selectedSceneCases;
          break;
      }
      console.log(id);
      let index = arr.findIndex((value) => {
        return value === id;
      });
      index !== -1 ? arr.splice(index, 1) : arr.push(id);
      // 如果选中的是flowNode
      // console.log('sceneCaseIds' + this.sceneCaseIds)
      // console.log('flowNodesMap'+ this.flowNodesMap)
      // console.log('sceneCaseMap'+ this.sceneCaseMap.keys())
      let idArr = (id + "").split("-");
      if (idArr.length === 3) {
        let sceneCaseId = idArr.slice(0, 2).join("-");
        let caseList = this.flowNodesMap.get(sceneCaseId);
        if (
          caseList.every((value) => {
            return this.selectedSceneCases.includes(value);
          })
        ) {
          Vac.pushNoRepeat(this.selectedSceneCases, sceneCaseId);
        } else {
          let set = new Set(this.selectedSceneCases);
          set.delete(sceneCaseId);
          this.selectedSceneCases = [...set];
        }
      }
      if (type === 3) {
        let sceneId = idArr[0];
        let caseIds = this.sceneCaseMap.get(+sceneId);
        if (
          caseIds.every((value) => {
            return this.selectedSceneCases.includes(value);
          })
        ) {
          this.checkallSceneIds.push(+sceneId);
        } else {
          let set = new Set(this.checkallSceneIds);
          set.delete(+sceneId);
          this.checkallSceneIds = [...set];
        }
      }
      this.setBackground(this.selectedSceneCases);
    },
    saveSort: function (sceneId) {
      var domNodes = $("input[value^=sort-" + sceneId + "]");
      var arrSortId = [];
      for (var i = 0; i < domNodes.length; i++) {
        let name = $(domNodes[i]).attr("name");
        if (name) {
          arrSortId.push(+name);
        }
      }
      Vac.ajax({
        url: "sceneController/sceneTestcaseSortSave",
        data: {
          sceneId: sceneId,
          caseIdList: arrSortId,
        },
        success: function (data) {
          if (data.respCode === "0000") {
            Vac.alert("排序保存成功");
          } else Vac.alert("排序保存失败");
        },
      });
    },

    saveScenesSort: function () {
      //保存场景排序
      var domNodes = $("input.checkscene"); //使用jQuery找到包含场景信息的元素
      var keyIdList = [];
      for (var i = 0; i < domNodes.length; i++) {
        keyIdList.push(+$(domNodes[i]).attr("name")); //将属性值为name的变量中的值取出来，为id值
      }

      Vac.ajax({
        url: "sceneController/sceneSortSave",
        data: {
          keyIdList: keyIdList,
        },
        success: function (data) {
          if (data.respCode === "0000") {
            Vac.alert("场景排序保存成功");
          } else Vac.alert("场景排序保存失败");
        },
      });
    },

    viewCase: function (
      sceneId,
      caseId,
      sourcechannel,
      flowNodeId,
      testPhase,
      testRound,
      recorderStatus
    ) {
      var that = this;
      let path = this.$router.resolve({
        name: "CaseOperation",
        query: {
          batchId: that.batchId,
          testPlanId: that.testPlanId,
          testcaseId: caseId,
          flowNodeId,
          sceneId,
        },
      });
      window.open(path.href, "_blank");
    },

    turnToPage(currentPageParam) {
      if (currentPageParam > 0 && currentPageParam <= this.page.totalPage) {
        this.page.currentPage = currentPageParam;
        this.getTestPlans();
      } else Vac.alert("不在页码范围");
    },
    add() {
      const url =
        1 === this.editType
          ? "testPlanController/insertTestPlan"
          : "testPlanController/updateTestPlan";
      const data =
        1 === this.editType
          ? this.addRowData
          : {
              id: this.selectTestPlan,
              nameMedium: this.addRowData.nameMedium,
              descMedium: this.addRowData.descMedium,
              modifierId: this.addRowData.creatorId,
            };
      console.log(this.addRowData);
      Vac.ajax({
        url: url,
        data: data,
        success: (data) => {
          if ("0000" === data.respCode) {
            this.addTestPlanDialog = false;
            Vac.alert(data.respMsg);
            this.addModalShow = false;
            this.addRowData.nameMedium = "";
            this.addRowData.descMedium = "";
            this.getTestPlans();
          } else {
            Vac.alert(data.respMsg);
          }
        },
        error: () => {
          Vac.alert("出错啦~7");
        },
      });
    },
    delete() {
      Vac.ajax({
        url: "testPlanController/deleteTestPlan",
        data: {
          id: this.selectTestPlan,
        },
        success: (data) => {
          if ("0000" === data.respCode) {
            this.selectTestPlan = "";
            this.getTestPlans();
          }
          Vac.alert(data.respMsg);
        },
        error: () => {
          Vac.alert("出错啦~8");
        },
      });
    },
    showAddModal() {
      this.addRowData.nameMedium = "";
      this.addRowData.descMedium = "";
      this.editType = 1;
      this.addTestPlanDialog = true;
      // $('#addTestPlan').on('show.bs.modal',function(event){
      //     var modal = $(this);
      //     modal.find('.modal-title').text("新增测试计划");
      // })
      // $("#addTestPlan").modal("show");
    },
    // showDeleteConfirm() {
    //     if ('' === this.selectTestPlan) {
    //         Vac.alert('请选择测试计划');
    //         return;
    //     }
    //     var pro = Vac.confirm('', '', '', '确认要删除吗？');
    //         pro.then(() => {
    //             this.delete();
    //         }, () => {});
    // },
    showUpdateModal(item) {
      this.addRowData.nameMedium = item.nameMedium;
      this.addRowData.descMedium = item.descMedium;
      this.addTestPlanDialog = true;
      this.editType = 2;
      this.selectTestPlan = item.id;
    },
    getTestPlans() {
      Vac.ajax({
        url: "testPlanController/pagedBatchQueryTestPlan",
        data: {
          pageSize: this.page.pageSize,
          currentPage: this.page.currentPage,
          orderType: this.orderType,
          orderColumns: this.orderColumns,
          nameMedium: "",
          descMedium: "",
          caseLibId: this.addRowData.caseLibId,
        },
        success: (data) => {
          if ("0000" === data.respCode) {
            this.testPlanArray = data.testPlanEntityList;
            this.testPlans = data.testPlanEntityList;
            this.page.totalCount = data.totalCount;
            this.page.totalPage = data.totalPage;
          } else {
            Vac.alert(data.respMsg);
          }
        },
        error: () => {
          Vac.alert("出错啦~2");
        },
      });
    },
    getTestPhases() {
      Vac.ajax({
        url: "testphaseController/selectAllTestphase",
        data: {},
        success: (data) => {
          if ("0000" === data.respCode) {
            this.testPhaseArray = data.testphaseEntityList;
          } else {
            Vac.alert(data.respMsg);
          }
        },
        error: () => {
          Vac.alert("出错啦~4");
        },
      });
    },
    getTestRound() {
      Vac.ajax({
        url: "testroundController/selectAllTestround",
        data: {},
        success: (data) => {
          if ("0000" === data.respCode) {
            this.testRoundArray = data.testroundEntityList;
          } else {
            Vac.alert(data.respMsg);
          }
        },
      });
    },
    addTestRound() {
      Vac.ajax({
        url: "testroundController/insertTestround",
        data: this.addRoundRowData,
        success: (data) => {
          if ("0000" === data.respCode) {
            //Vac.alert("操作成功");
            this.addRoundModalShow = false;
            this.getTestRound();
            $("#addTestRoundId").modal("hide");
          } else {
            Vac.alert(data.respMsg);
          }
        },
        error: () => {
          Vac.alert("网络错误，请稍候再试");
        },
      });
    },
    resort(target) {
      var app = this;
      if (target.getAttribute("data-sort") === "desc") {
        app.orderType = "asc";
        target
          .getElementsByTagName("span")[0]
          .setAttribute("class", "icon-sort-up");
        target.setAttribute("data-sort", "asc");
      } else {
        app.orderType = "desc";
        target
          .getElementsByTagName("span")[0]
          .setAttribute("class", "icon-sort-down");
        target.setAttribute("data-sort", "desc");
      }
      app.orderColumns = target.getAttribute("data-order");
      app.getTestPlans();
    },
     downloadRunner() {
        window.location.href = this.address4 + "atf-data/atf-runner.zip";
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../styles/base2.less";
@import "../../styles/base2.less";
@import "../../styles/ascetic.less";

.page-outer {
  display: flex;

  .right-content {
    flex: 1;
  }
}
</style><style lang="less">
/*.hljs-number,*/
/*.hljs-meta,*/
/*.hljs-type,*/
/*.hljs-params {*/
/*	color:  gray;*/
/*}*/
.hljs-literal {
  color: deepskyblue;
}

.hljs-builtin-name,
.hljs-built_in,
.hljs-builtco_in {
  color: orangered;
}

.hljs-tag,
.hljs-name,
.hljs-keyword,
.hljs-selector-tag {
  color: #22ee55;
}

.hljs-comment,
.hljs-quote {
  color: #e4ba00;
}

.exe-info {
  padding-left: 10px;
}

.exe-info i {
  color: #58c9f3;
}

.case-main {
  white-space: nowrap;
}

.modal-width {
  width: 1000px;
}

.logcontainer {
  width: auto;
  height: auto;
  position: fixed;
  right: 0px;
  top: 15%;
  z-index: 9999;
}

#log {
  opacity: 0.75;
  position: absolute;
  right: 0%;
  height: 100%;
  width: 100%;
}

#loghidden {
  right: 0%;
  height: auto;
  width: auto;
  z-index: 9999;
}

.display {
  display: none;
}

#hidden {
  float: left;
  height: auto;
  width: 5%;
  color: black;
}

#hidden-1 {
  overflow: hidden;
  height: auto;
  width: 38px;
  color: black;
  display: inline-block;
}

.box-card {
  height: 100%;
}

.el-card__header {
  padding: 10px 20px 8px 20px;
}

.clearfix {
  font-size: 17px;
}

#logcontent {
  border: 1px solid #000;
  float: left;
  height: 100%;
  width: 95%;
}

#logShowBtn {
  float: right;
}

#logtext {
  float: left !important;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: 3;
}

.el-card__body {
  height: 100%;
}

#area {
  width: 100%;
}

#logarea {
  resize: none;
  color: white;
  background: #000;
  float: left !important;
  height: 100%;
  width: 100%;
  overflow: auto;
  z-index: 3;
  min-height: 300px;
}

#area {
  height: 90%;
  width: 100%;
}

.pre {
  height: 100%;
  z-index: 100;
}

.case-lib-pad {
  margin: 10px 5px;
}

.arrow-right {
  float: right;
  width: 15px;
  height: 30px;
  line-height: 30px;
  margin-top: 10px;
}

#main-content .content-wrapper .main .main-content .caseFlow {
  margin-right: 5px;
  display: inline-block;
  margin-bottom: 0;
  min-width: 50px;
  width: 175px;
  height: 30px;
  border: 0px solid #ddd5d5;
}

#main-content .content-wrapper .main .main-content .case .case-header-Flow {
  height: 30px;
  width: 155px;
  margin-top: 0px;
  position: relative;
  background: white;
  border: 1px solid #ddd5d5;
  border-radius: 5px;
  flex: 0 0 auto;
  display: inline-block;
}

.main {
  margin: 0;
}

@globleRed: #ff6c60;

.row {
  width: 100%;
  margin: 0;

  .breadcrumb {
    margin-bottom: 0px;
  }
}

#main-content {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 0px;

  .strench {
    flex: 1 1 auto;
    background-color: #fff;
  }

  .content-wrapper {
    position: relative;
    height: calc(100% - 110px);
    flex: 1 0 auto;
    flex-direction: column;
    display: flex;
    overflow: hidden;
    margin-bottom: 250px;
    transition: margin-bottom 0.5s;

    .main {
      position: relative;
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      overflow: auto;
      // background-color: #fff;
      font-size: 13px;

      .top-bar {
        padding: 10px 20px;
      }

      .btn {
        // padding: 3px 6px;
        // font-size: 13px;
      }

      .route-position {
        flex: 0 0 auto;
        padding: 5px 20px;
        background-color: #fff;
        font-size: 14px;
        color: #416cff;

        a {
          color: #416cff;
        }
      }

      .top-bar {
        position: sticky;
        top: 0;
        flex: 0 0 auto;
        width: 100%;
        background-color: #f1f2f7;
      }

      .form-input {
        // height: 0;
        display: none;
        background-color: #f1f2f7;

        & > div {
          float: left;
          margin: 0 20px 0 0;
        }

        label {
          font-weight: normal;
        }

        input[type="number"],
        .exe-scope {
          border-radius: 5px;
          border: 1px solid #ddd;
          padding: 5px 10px;
        }
      }

      .form-input-show {
        margin: 10px 0 5px 0;
        padding: 10px 20px;
        // height: auto;
        display: block;
      }

      .main-content {
        position: relative;
        flex: 1 0 auto;
        background-color: #fff;
        padding: 0px 0px;
        min-width: 100%;

        .check-all-case {
          display: inline-block;
        }

        .scene-list-wrapper {
          position: relative;

          .scene-list-title {
            position: relative;
            top: 5px;
          }

          .btn {
            padding: 3px 6px;
            margin: 5px 3px;
          }
        }

        .case-lib {
          // margin-bottom: 20px;
          // border: 1px dashed #ddd;
          padding: 5px;
          background-color: #fafafa;
          // width: max-content;
          min-width: 100%;
          display: flex;
          flex-direction: row;

          .checkbox-wrapper {
            display: flex;
            height: 100%;
            width: 50px;
            vertical-align: top;
            padding: 9px 5px 0px 5px;

            input {
              float: left;
              margin: 0;
            }
          }

          .case-wrapper {
            // display: flex;
            // flex-direction: row;
            // width: max-content;
          }
        }

        .case-lib:last-child {
          margin-bottom: 0;
        }

        .case {
          margin-right: 5px;
          @caseWidth: 155px;
          // flex: 1 0 auto;
          // display: flex;
          display: inline-block;
          margin-bottom: 0px;
          margin-right: 20px;
          min-width: 50px;
          width: @caseWidth;
          border: 1px solid #ddd5d5;
          border-radius: 5px;
          @caseHeaderheight: 30px;

          height: 30px;

          &:first-of-type {
            margin-left: 0;
          }

          .case-header {
            height: @caseHeaderheight;
            padding: 0 0px;
            position: relative;
            // background-color: #f5f5f5;
            background: transparent;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            flex: 0 0 auto;

            input[type="checkbox"] {
              visibility: hidden;
              position: relative;
              top: -8px;
            }

            img {
              display: inline-block;
              position: relative;
              top: -11px;
              left: 2px;
              width: 16px;
              height: 16px;
              margin: 0 auto;
              vertical-align: middle;
            }

            p {
              display: inline-block;
              line-height: @caseHeaderheight;
              margin: 0px 0 0 0px;
              overflow-x: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            .width-limit {
              width: 80px;
            }
          }

          .case-main {
            .view-case {
              position: relative;
              top: 5px;
              cursor: pointer;
              width: 3000px;
            }
          }

          .case-footer {
            padding-left: 20px;
            font-size: 16px;
            line-height: @caseHeaderheight;
            height: @caseHeaderheight;
            width: auto;
          }
        }

        // testphase css
        table#testphase-table {
          td,
          th {
            text-align: center;
          }

          tr :first-child {
            width: 50px;
          }

          tr :nth-of-type(2) {
            width: 30%;
          }
        }
      }

      .main-content2 {
        position: relative;
      }
    }
  }

  .bigMarginBottom {
    margin-bottom: 0px;
  }

  .smallMarginBottom {
    margin-bottom: 0px;
  }

  .panel {
    position: fixed;
    bottom: 0px;
    // left: 0;
    flex: 1 0 auto;
    height: 200px;
    width: calc(100% - 180px);
    border-radius: 5px;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 0;
    overflow: hidden;
    // transition: 0.5s height;
    z-index: 3;

    .panel-heading {
      height: 34px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      background-color: #f5f5f5;
      font-size: 14px;
      margin: 0 0px;
      padding: 5px 10px;
    }

    .panel-body {
      // height: 166px;
      overflow: auto;

      button {
        // background-color: #ccc;
        color: #444;

        i {
          color: @globleRed;
        }
      }

      .timeArrange {
        div {
          margin-top: 10px;

          button {
            float: right;
            margin-right: 50px;
          }
        }
      }

      .triggerSetting {
        .table-wrapper {
          margin: 20px 0;
        }

        table {
          width: 100%;

          th,
          td {
            text-align: center;
          }
        }

        .table {
          tr {
            th:first-child,
            td:first-child {
              width: 50px;
            }

            th:nth-child(2) {
              width: 200px;
            }

            th:nth-child(4) {
              width: 100px;
            }
          }
        }

        .triggerSave {
          float: right;
          margin-right: 20px;
        }
      }

      .processControl {
        p {
          margin: 0;
        }

        .wrapper-div {
          margin: 10px 0;

          .strategy-group {
            margin: 10px 0;

            .group-name {
              display: inline-block;
              width: 100px;
            }

            .select-wrapper {
              // display: inline-block;
            }

            .select-group {
              display: inline-block;
              margin: 0 5px;

              select {
                padding: 3px 5px;
              }
            }
          }
        }

        .processControl-footer {
          .processControlSave {
            float: right;
          }
        }
      }

      .dataPool {
        .table-wrapper {
          margin: 20px 0;
        }

        table {
          width: 100%;

          th {
            text-align: center;
          }

          td {
            text-align: center;
          }
        }

        .triggerSave {
          float: right;
          margin-right: 20px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .panel {
      width: 100%;
    }
  }

  .panel.height43px {
    // height: 34px;
    height: 0px;
    // top: 0;
  }

  .panel.height200px {
    height: 200px;
    // top: -0;
  }

  .copy-right {
    // position: fixed;
    // left: 0;
    bottom: 0;
    height: 50px;
    // width: 100%;
    bottom: 0;
  }

  #test-options {
    overflow: hidden;

    .form-group {
      margin-bottom: 10px;
    }
  }

  #testround-main {
    .test-control {
      margin: 10px;
    }

    .list-wrapper {
      // display: flex;
      margin-top: 10px;

      .list-title {
        flex: 0 0 auto;
        vertical-align: top;
        margin-right: 10px;
      }

      .case-list,
      .scene-list {
        // display: flex;
        height: auto;
        // flex: 0 0 auto;
        border: 1px dashed #ddd;
        // padding: 10px;
        overflow: hidden;
        box-sizing: border-box;
        transition: height 100ms;

        .case-item {
          display: inline-block;
          flex: 1 1 auto;
          margin: 10px 10px 0 0;
        }
      }
    }
  }
}

.modal {
  .modal-header {
    // margin: 5px 10px;
    padding: 8px 10px;

    h4 {
      font-size: 16px;
    }
  }

  .modal-footer {
    padding: 8px 10px;

    button {
      padding: 3px 8px;
    }
  }
}

.alert {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  z-index: 1041;
  padding: 0;
  border: 1px solid #ddd;

  header {
    height: 35px;
    padding: 0px 10px;
    background-color: #00a8b3;

    span {
      font-size: 16px;
      color: #fff;
      line-height: 35px;
    }

    button {
      height: 35px;

      i {
        line-height: 35px;
      }
    }
  }

  main {
    min-height: 100px;
    padding: 10px 5px;
    border-bottom: 1px solid #ddd;

    p {
      font-size: 16px;
      color: #b94a48;
    }
  }

  footer {
    text-align: center;

    button {
      display: block;
      padding: 5px;
      margin: 0 auto;
    }

    button.cancelConfirm,
    button.okConfirm {
      display: inline-block;
      padding: 5px 10px;
      margin: 10px;
    }
  }

  background-color: #fff;
}

.show {
  display: none;
}

.hide {
  display: block;
}

.runnerclass p {
  margin: 0%;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  padding-top: 6px;
}

.control-label {
  line-height: 30px;
}

.executeStatus {
  margin-top: 5px !important;
  font-family: "宋体";
}

.form-group {
  margin-bottom: 0px !important;
}
</style>

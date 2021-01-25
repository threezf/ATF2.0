<template>
  <div>
        <el-card class="leftCard">
          <div slot="header">
            <span style="font-weight:bold;font-size:20px">{{messageTitle}}</span>
            <!--此回复按钮跳转到页面最下方发表回复"-->
            <el-button type="text" class="answerbutton" @click="getfocus()">回复</el-button>              
          </div>
          <div>
            <el-col :span="2" class="colLeft0">
              <el-image :src="imgUrl1"></el-image>
              {{creatorUsername}}
            </el-col>
            <el-col :span="22" class="colRight">
              <div class="answerContents">
                {{messageContent}}
              </div>
              <el-row type="flex" justify="end" class="timerow">
                  {{createTime}}
                  <!--此回复按钮跳转到页面最下方发表回复"-->
                  <el-button style="padding-left:5px" type="text" @click="getfocus()">回复</el-button>
              </el-row>
            </el-col>              
          </div>
            
          <div v-for="item in answerList"  :key="item.answerId" >
            
            <el-col :span="2" class="colLeft">
              <el-image :src="imgUrl2"></el-image>
              {{item.answerCreatorUsername}}
            </el-col>
            <el-col :span="22" class="colRight">
              <div>
                <div class="answerContents">
                  {{item.answerContent}}
                </div>
                <el-row type="flex" justify="end" class="timerow">
                  {{item.answerId}}楼
                  {{item.answerTime}}
                  <!--此回复按钮是回复已发表留言的按钮"-->
                  <el-button style="padding-left:5px" type="text"  @click="replyconfirm =item.answerId,
                  answerId=item.answerId,
                  berepliedId=item.answerCreatorId,
                  berepliedUsername=item.answerCreatorUsername">回复</el-button>
                </el-row>
                <div  v-for="reply in myreplyList(item.answerId)" :key="reply.replyOrder"
                  class="replyContent">
                  <span   v-if="reply.beRepliedUsername==item.creatorUsername" >
                    {{reply.creatorUsername}}：{{reply.replyContent}}</span>
                  <span v-else>
                    {{reply.creatorUsername}}<span style="padding:0 5px 0 5px">回复</span>{{reply.beRepliedUsername}}：{{reply.replyContent}}</span>
                  <el-row type="flex" justify="end" class="timerow">
                  {{reply.replyTime}}
                  <!--此回复按钮是回复留言下评论的按钮"-->
                  <el-button style="padding-left:5px" type="text"  @click="replyconfirm =item.answerId,
                  answerId=item.answerId,
                  berepliedId=reply.creatorUserId,
                  berepliedUsername=reply.creatorUsername">回复</el-button>
                  </el-row>
                </div>
                <div v-if="replyconfirm==item.answerId" class="replyContent">
                    <el-input
                      type="textarea"
                      v-model="replyContents"
                      rows="3"
                      >
                    </el-input>
                    <el-button 
                      class="submitreply"
                      @click="replyButton(answerId,berepliedId,berepliedUsername)"
                      size="small"
                      type="primary">
                      发表
                    </el-button>
                  </div>
              </div>
            </el-col>
          </div>
        </el-card>
        <el-card class="leftCard">
            <div slot="header">
                <span>发表回复</span>            
            </div>
            <div style="padding:10px 20px 0 20px">
                <vue-ueditor-wrap
                  v-model="message" 
                  :config="myConfig">
                </vue-ueditor-wrap>
            </div>
            <div class="bottom">
                <el-button 
                class="submitbutton"
                @click="addAnswer(message)"
                size="small"
                type="primary">
                发表
                </el-button> 
            </div>
        </el-card>
      </div>
</template>

<script>
import Request from "../../libs/request";
import VueMixins from "@/libs/vueMixins.js";
import VueUeditorWrap from 'vue-ueditor-wrap';
import imgUrl1 from '@/assets/images/img1.jpg'
import imgUrl2 from '@/assets/images/img2.jpg'
export default {
  mixin: [VueMixins],
  name: "msglist",
  data() {
    return {
        replyconfirm: "",
        answerconfirm: false,
        bereplyId: "",
        berepliedUsername:"",
        message: "",
        id:"",
        replyContents:"",
        answerId:"",
        berepliedId:"",
        berepliedUsername:"",
        editorOption: {
          placeholder: '有什么问题请留言~'
        },
        imgUrl1:imgUrl1,
        imgUrl2:imgUrl2,
        myConfig: {
        toolbars: [
              [
                'undo', //撤销
                'redo', //重做
                'bold', //加粗
                'indent', //首行缩进
                'snapscreen', //截图
                'italic', //斜体
                'underline', //下划线
                'strikethrough', //删除线
                'subscript', //下标
                'fontborder', //字符边框
                'superscript', //上标
                'formatmatch', //格式刷
                'source', //源代码
                'blockquote', //引用
                'pasteplain', //纯文本粘贴模式
                'selectall', //全选
                'horizontal', //分隔线
                'removeformat', //清除格式
                'time', //时间
                'date', //日期
                'unlink', //取消链接
                'cleardoc', //清空文档
                'insertcode', //代码语言
                'fontfamily', //字体
                'fontsize', //字号
                'paragraph', //段落格式
                'simpleupload', //单图上传
                'insertimage', //多图上传
                'link', //超链接
                'emotion', //表情
                'justifyleft', //居左对齐
                'justifyright', //居右对齐
                'justifycenter', //居中对齐
                'justifyjustify', //两端对齐
                'forecolor', //字体颜色
                'backcolor', //背景色
              ]
            ],
            // 编辑器不自动被内容撑高
            autoHeightEnabled: false,
            // 初始容器高度
            initialFrameHeight: 240,
            // 初始容器宽度
            initialFrameWidth: '100%',
            //不启用元素路径
            elementPathEnabled: false,
            //不显示字数统计
            wordCount: false,
            // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
            serverUrl: 'http://35.201.165.105:8000/controller.php',
            UEDITOR_HOME_URL: '/static/ueditor/'
        },
    }
  },
  components: {
        VueUeditorWrap
  },
  props:{
      answerList: {
        type: Array,
        default: []
      },
      replyList: {
        type: Array,
        default: []
      },
      messageTitle: {
        type: String,
        default: ""
      },
      messageContent: {
        type: String,
        default: ""
      },
      createTime: {
        type: String,
        default: ""
      },
      creatorUsername: {
        type: String,
        default: ""
      },
      getTestProject: {
        type: Function,
      },

  },
  computed: {
    myreplyList:function() {
      return function(val) {
        console.log(val)
        return this.replyList.filter(replys =>replys.answerId==val)
      }
    }
  },
  methods: {
        getfocus() {
          this.$refs.answer.focus();
        },
        addAnswer() {
            let submitForm = {}
            submitForm.messageId = sessionStorage.getItem('messageId')
            submitForm.userId = sessionStorage.getItem('userId')
            submitForm.username = sessionStorage.getItem('username')
            if(this.message != ''){
                submitForm.answerContent = this.message
            Request({
                url: '/messageBoxController/insertAnswer',
                method: 'post',
                params: submitForm
            }).then((res) => {
                this.$alert('发表留言成功', '成功', {
                    confirmButtonText: '确定',
                });
                this.getTestProject();
                this.message=""
            }, (err) => {
                console.log(submitForm)
                this.$alert('添加留言失败', '失败', {
                    confirmButtonText: '确定',
                });
            }).catch((err) => {
              console.log(submitForm)
                this.$alert('添加留言失败', '失败', {
                    confirmButtonText: '确定',
                });
            })
            }else {
                this.$alert('留言不能为空', '失败', {
                    confirmButtonText: '确定',
                    });
            }
        },
        replyButton(answerId,berepliedId,berepliedUsername){
          let replyForm = {}
            replyForm.messageId = sessionStorage.getItem('messageId')
            replyForm.answerId = answerId
            replyForm.beRepliedUserId = berepliedId
            replyForm.beRepliedUsername = berepliedUsername
            replyForm.userId = sessionStorage.getItem('userId')
            replyForm.username = sessionStorage.getItem('username')
            if(this.replyContents!= ''){
              replyForm.replyContent = this.replyContents
             Request({
                url: '/messageBoxController/insertReply',
                method: 'post',
                params: replyForm
            }).then((res) => {
                this.$alert('发表评论成功', '成功', {
                    confirmButtonText: '确定',
                });
                this.getTestProject()
                this.replyContents=""
                this.replyconfirm=""
            }, (err) => {
                this.$alert('添加评论失败', '失败', {
                    confirmButtonText: '确定',
                });
            }).catch((err) => {
                this.$alert('添加评论失败', '失败', {
                    confirmButtonText: '确定',
                });
            })
            }else {
                this.$alert('内容不能为空', '失败', {
                    confirmButtonText: '确定',
                    });
            }
        },
  }
}
</script>

<style lang="less" scoped>
.leftCard {
  width: 1200px;
  margin-top: 15px;
}
.bottom {
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 40px;
  }
.submitbutton {
    float: right;
    margin-right: 20px ;
    margin-bottom: 10px;
  }
.answerbutton {
    float: right;
  }
.submitreply {
  float: right;
  margin: 10px 0px 10px 0px ;
}
.replymsg {
  margin: 10px 20px 0 20px;
}
.box-card {
    width: 960px;
  margin-top: 15px;
}
.replyContent {
  width: 720px;
  float: right;
  padding: 10px 10px 0px 10px;
  border: 1px solid #d7d7d7;
  background-color: #f7f8fa;
}
.answerContents {
  padding: 10px ;
  height: 100px;
  margin-top: 10px;
}
.timerow {
  font-size: 12px;
  height: 40px;
  overflow: hidden;
}
.sideContent {
  background-color: #f7f8fa;
  height: 150px;
  
}
.colRight {
  border-left: 1px solid #e1e4e6;
  border-bottom: 1px solid #e1e4e6;
  padding-bottom: 20px;
  padding-right: 20px;
}
.colLeft {
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-top: 1px solid #e1e4e6;
  padding-top: 10px;
  text-align: center;
}
.colLeft0 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 10px;
  text-align: center;
}
.firstphoto {
  width: 100px;
  height: 100px;
  // background-image: url(imgUrl1);
}
.el-card /deep/ .el-card__body {
    padding: 0px;
  }
</style>
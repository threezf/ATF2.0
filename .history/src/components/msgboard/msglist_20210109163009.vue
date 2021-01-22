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
              <div class="answerContents" v-html="messageContent">
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
                <div class="answerContents" v-html="item.answerContent">
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
            <div id="demo2"></div>
            </div>
            <div class="bottom">
                <el-button 
                class="submitbutton"
                @click="addAnswer()"
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
import imgUrl1 from '@/assets/images/img1.jpg'
import imgUrl2 from '@/assets/images/img2.jpg'
import wangEditor from 'wangeditor';
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
        imgUrl1:imgUrl1,
        imgUrl2:imgUrl2,
        editor: null,
        editorData: ''
    }
  },
  beforeUpdate(){
        this.editor.destroy()
        this.editor = null
    },
    updated() {
        const editor = new wangEditor(`#demo1`)

    //限制图片上传大小
    editor.config.uploadImgMaxSize = 3 * 1024 * 1024 // 3M
    //使用 base64 格式保存图片
    editor.config.uploadImgShowBase64 = true
    //限制图片类型
    editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif']
    editor.config.showLinkImg = false
    // 创建编辑器
    editor.create()

    this.editor = editor
    },
  mounted() {
    
    const editor = new wangEditor(`#demo2`)

    //限制图片上传大小
    editor.config.uploadImgMaxSize = 3 * 1024 * 1024 // 3M
    //使用 base64 格式保存图片
    editor.config.uploadImgShowBase64 = true
    //限制图片类型
    editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif']
    editor.config.showLinkImg = false
    // 创建编辑器
    editor.create()

    this.editor = editor
  },
  components: {
      wangEditor
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
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  },
  methods: {
        getfocus() {
          this.$refs.answer.focus();
        },
        addAnswer() {
            this.message = this.editor.txt.html()
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
  height: auto;
}
.colLeft {
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-top: 1px solid #e1e4e6;

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
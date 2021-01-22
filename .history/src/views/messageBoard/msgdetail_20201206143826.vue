<template>
<div class="page-inner">
    <el-container>
        <el-main>
            <el-row type="flex" justify="center">
                <v-msglist :answerList='answerList' :messageTitle='messageTitle'
                 :messageContent='messageContent' :createTime='createTime'
                 :replyList='replyList' :creatorUsername='creatorUsername'
                 :getTestProject='getTestProject'>
                </v-msglist>
            </el-row>

        </el-main>
        
    </el-container>
               
</div>
</template>

<script>
import Request from '@/libs/request.js'
import VueMixins from '@/libs/vueMixins.js'
import msglist from '@/components/msgboard/msglist'
export default {
    name: 'MsgDetail',
    mixins: [VueMixins], // 混入
    components: {
        'v-msglist':msglist          //2.挂载组件
    },
    data() {
        return {
            answerList: [],
            replyList: [],
            radio: false,
            selectedId:-1,
            totalCount:0,
            message: "",
            messageTitle: "",
            messageContent:"",
            createTime: "",
            creatorUsername: "",
            messageId: "",
        }
 
    },

    activated() {
        this.messageId=sessionStorage.getItem('messageId')

        this.getTestProject();
    },
    created() {
        this.messageId=sessionStorage.getItem('messageId')
        this.getTestProject();
    },
    methods: {
        deletemsgButton(row) {
            this.selectedId = row.messageId
            this.$confirm('是否确定删除此条留言?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          this.deletemsg()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
        // 删除留言
        deletemsg() {
            Request({
                url: '/messageBoxController/deleteMessage',
                method: 'post',
                params: {
                    messageId: this.selectedId,
                }
            }).then((res) => {
                this.dialogVisible = false
                this.getTestProject()
                this.$alert('删除留言成功', '成功', {
                    confirmButtonText: '确定',
                });
            }, (err) => {
                this.$message(res.respMsg)
                this.dialogVisible = false
                console.log(err)
                this.$alert('您没有权限删除', '失败', {
                    confirmButtonText: '确定',
                });
            }).catch((err) => {
                console.log(err)
                this.$alert('您没有权限删除', '失败', {
                    confirmButtonText: '确定',
                });
            })
        },
        
        //展示所有留言、评论
        getTestProject() {
            console.log('1111111')
            Request({
                url: '/messageBoxController/displayMessage',
                method: 'post',
                params: {
                    messageId: this.messageId
                }
            }).then((res) => {
                this.answerList = res.answerList
                this.messageTitle = res.messageTitle
                this.creatorUsername = res.creatorUsername
                this.messageContent = res.messageContent
                this.createTime = res.createTime
                this.totalCount = res.numberOfAnswers
                this.replyList = res.replyList
                console.log('111111', res)
            }, (err) => {
                this.$message(res.respMsg)
                console.log(err)
            }).catch((err) => {
                console.log(err)
            })
        },
        //列表排序函数,调用相应排序方法
            listSort: function() {
                    this.msgBoardList.sort(this.desc_oder)
            },

            /**
             * 编号降序函数
             * @param {Object} a 第一个留言
             * @param {Object} b 第二个留言
             */
            desc_oder: function(a, b) {
             //这里注意传入的参数为对象，而我们要比较的是messageId
                return b.messageId - a.messageId
            },
    }
}
</script>

<style scoped >
.box-card {
    width: 960px;
  }
.bottom {
    margin-top: 13px;
    line-height: 40px;
  }

.submitbutton {
    margin-right: 20px;
    margin-bottom: 10px;
    float: right;
  }
.msgleave {
    margin: 20px 20px 0 20px;

}


</style>

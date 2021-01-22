<template>
<div class="page-inner">
    <el-container>
        <el-main>
            <el-table size="medium" stripe :data="msgBoardList.slice((currentPage - 1) * pageSize, currentPage*pageSize)" border class='table'>
                <el-table-column label="编号" prop="messageId" width="50px" align="center" >
                </el-table-column>
                <el-table-column label="留言标题" prop="messageTitle">
                </el-table-column>
                <el-table-column label="留言人" prop="creatorName" width="200px" align="center">
                </el-table-column>
                <el-table-column label="最后回复时间" prop="latestReplyTime" width="300px"/>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="toDisplayMessage(scope.row)">查看</el-button>
                        <el-button size="mini" type="danger" @click="deletemsgButton(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-footer  class="dialog-footer">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                </el-pagination>
            </el-footer>
            <el-row type="flex" justify="center">
                <el-card class="box-card" :body-style="{ padding: '20px',  }" >
                    <div slot="header" class="clearfix">
                        <span>有什么问题想问大家？快来创建留言吧</span>
                    </div>
                    <div class="msgeditor">
                        <el-input
                            v-model="title"
                            placeholder="请填写标题"
                            style="margin-bottom:10px;width:100%;height:40px"
                            >
                        </el-input>
						<div id="demo1"></div>
                        <div class="bottom">
                            <el-button
                            class="submitbutton"
                            @click="addMsg"
                            size="small"
                            type="primary">
                            发表
                            </el-button>
                        </div>
                    </div>
                </el-card>
            </el-row>
        </el-main>

    </el-container>
</div>
</template>


<script>
import Request from '@/libs/request.js'
import VueMixins from '@/libs/vueMixins.js'
import wangEditor from 'wangeditor'

export default {
    name: 'messageBoard',
    mixins: [VueMixins], // 混入
    data() {
        return {
            msgBoardList: [],
            radio: false,
            selectedId:-1,
            // apiUrl: '',
            tt: 0, //总条数
            pageSize: 10, //页面大小
            currentPage: 1, //当前页
            totalPage: 1, //总页数
            timeValue: [],
            totalCount:0,
            message: "",
            title: "",
            dialogVisible: false,
			imgURL:"",
            editor: null,
            editorData: ''
        }

    },
    created() {
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
    components: {
        wangEditor
    },
    created() {
    this.getTestProject();

    },
    beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
    },
    methods: {
        handleRadioChange(val) {
            this.row = val
        },
        // 页码大小变化
        handleSizeChange(val) {
            this.pageSize = val
            this.getTestProject()
        },
        //当前页码数变化
        handleCurrentChange(val) {
            this.currentPage = val
            this.getTestProject()
        },
        //删除留言帖按钮
        deletemsgButton(row) {
            this.selectedId = row.messageId
            this.$confirm('是否确定删除此留言帖?', '提示', {
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
        // 添加留言帖
        addMsg() {
            let submitForm = {}
                this.message = this.editor.txt.html()
                submitForm.userId = sessionStorage.getItem('userId')
                submitForm.username = sessionStorage.getItem('username')
            if(this.message !== ''&&this.title !== ''){
                submitForm.messageContent = this.message
                submitForm.messageTitle = this.title
            Request({
                url: '/messageBoxController/insertMessage',
                method: 'post',
                params: submitForm
            }).then((res) => {
                this.$alert('添加留言成功', '成功', {
                    confirmButtonText: '确定',
                });
                this.getTestProject()
                this.editor.txt.clear()
                this.title=""
            }, (err) => {
                this.$alert('添加留言失败', '失败', {
                    confirmButtonText: '确定',
                });
            }).catch((err) => {
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
        // 查看留言
        toDisplayMessage(row) {
            sessionStorage.setItem("messageId", row.messageId) //存储messageId到sessionstorage
            console.log('messageId', row.messageId)
            this.$router.push({
                // path: '/messageBoard/msgdetail'
                name: 'MsgDetail'
            })
        },
        // 删除留言
        deletemsg() {
            Request({
                url: '/messageBoxController/deleteAnswer',
                method: 'post',
                params: {
                    messageId: this.selectedId,
                }
            }).then((res) => {
                this.getTestProject()
                this.$alert('删除留言成功', '成功', {
                    confirmButtonText: '确定',
                });
            }, (err) => {
                this.$message(res.respMsg)
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
        //展示所有留言
        getTestProject() {
            Request({
                url: '/messageBoxController/displayTitle',
                method: 'post',
                // params: this.params
            }).then((res) => {
                this.msgBoardList = res.list
                this.listSort()
                this.totalCount = res.numberOfTitles
                console.log(this.msgBoardList)
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

<style lang="less" scoped>
/* .box-card {
    width: 960px;
  } */
.bottom {
    margin-top: 20px;
    line-height: 40px;
  }

.submitbutton {
    float: right;
  }
.msgleave {
    margin: 20px 20px 0 20px;

}

.msgeditor {
    flex-flow: column;
    display:flex;
    .quill-editor {
        flex: 1;
    }
}

</style>

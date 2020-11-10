<template>
  <div class="page-outer" v-loading="pageLoading">
      <el-table style="margin: 10px" class="table" border stripe highlight-current-row :data="auditDtoList">
          <el-table-column label="用户名" prop="username" align="center">
          </el-table-column>
          <el-table-column label="真实姓名" prop="reallyname" align="center">
          </el-table-column>
          <el-table-column label="公司名称" prop="companyName" align="center">
          </el-table-column>
          <el-table-column label="联系人电话" prop="telephone" align="center">
          </el-table-column>
          <el-table-column label="邮箱" prop="email" align="center">
          </el-table-column>
          <el-table-column label="最大使用人数" prop="maximumNumber" align="center">
          </el-table-column>
          <el-table-column label="购买年限" prop="purchaseYear" align="center">
          </el-table-column>
          <el-table-column label="当前状态" align="center">
              <template slot-scope="scoped">
                  <el-tag type="primary">待审核</el-tag>
              </template>
          </el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                 <el-button size="mini" @click="done(1, scope.row)" type="primary">
                     审核通过
                 </el-button>
                 <el-button size="mini" @click="done(0, (scope.row))" type="warning">
                     审核不通过
                 </el-button>
              </template>
          </el-table-column>
      </el-table>
  </div>
</template>

<script>
import Request from '@/libs/request'
export default {
    name: 'noReviewed',
    data() {
        return {
            pageLoading: false,
            auditDtoList: [],
            pageSize: 10,
            pageSizes: [5, 10, 20 ,50],
            totalPage: 100,
        }
    },
    mounted() {
        this.queryAllAuditUser()
    },
    methods: {
        queryAllAuditUser() {
            this.pageLoading = true
            Request({
                url: '/userController/queryAllAuditUser',
                method: 'post',
                params: {
                }
            }).then(res => {
                console.log('待审核', res, this.$parent)
                this.auditDtoList = res.auditDtoList
                sessionStorage.setItem('leftCount', res.totalCount)
            }).catch(err => {
                console.log(err)
            }).finally(_ => {
                this.pageLoading = false
            })
        },
        done(index, {userId, companyId, purchaseYear}) {
            let url
            let message
            if (index === 1) {
                url = '/userController/auditRegisteredUser'
                message = '审核通过'
            }else {
                url = '/userController/deleteAuditRegistered'
                message = '审核不通过'
            }
            Request({
                url,
                method: 'post',
                params: {
                    userId: Number(userId),
                    companyId: Number(companyId),
                    purchaseYear: Number(purchaseYear)
                }
            }).then(res => {
                this.$message.success(message)
                this.queryAllAuditUser()
            }).catch(err => {
                console.log('err', err)
            })
        }
    }
}
</script>

<style>

</style>
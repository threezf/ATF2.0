<template>
  <div class="download-body">
      <el-button class="el-icon-download" size="small" type="primary" @click="downData" :loading="downloadLoading">下载数据</el-button>
  </div>
</template>

<script>
import {ExportAndDownloadCSV} from '@/libs/csv'
export default {
    name: 'DownData',
    data() {
        return {
            downloadLoading: false
        }
    },
    props: {
        content: {
            type: String,
            default: ''
        },
        fileName: {
            type: String,
            default: ''
        }
    },
    methods: {
        exportAndDownloadCSV: ExportAndDownloadCSV,
        downData() {
            this.downloadLoading = true
            this.exportAndDownloadCSV(this.content, this.fileName)
            this.downloadLoading = false
        }
    },
    created() {
    },
    mounted() {}
}
</script>

<style lang="less" scoped>
    .download-body {
        margin-bottom: 15px;
    }
</style>
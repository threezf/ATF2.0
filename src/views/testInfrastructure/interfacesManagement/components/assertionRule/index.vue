<template>
  <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane v-for="(tab, index) in tabs" :label="tab.label" :name="tab.name" :key="index">
          <CheckCode v-if="activeTab === 'code' && tab.name === 'code'"></CheckCode>
          <ResponseBody v-if="activeTab === 'body' && tab.name === 'body'"></ResponseBody>
          <ResponseHeader v-if="activeTab === 'header' && tab.name === 'header'"></ResponseHeader>
      </el-tab-pane>
  </el-tabs>
</template>

<script>
import CheckCode from './checkCode';
import ResponseBody from './responseBody';
import ResponseHeader from './responseHeader';
export default {
    name: 'AssertionRule',
    components: {
        CheckCode,
        ResponseBody,
        ResponseHeader
    },
    data() {
        return {
            activeTab: 'code',
            tabs: [{
                name: 'code',
                label: 'HTTP状态码'
            }, {
                name: 'header',
                label: '响应头部'
            }, {
                name: 'body',
                label: '响应体'
            }]
        }
    }
}
</script>

<style>

</style>
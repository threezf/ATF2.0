<template>
  <div class="contain">
    <div class="header-content">
      <steps :active="3"></steps>
    </div>
    <el-row type="flex" justify="center">
      <el-button type="primary" @click="next">执行完毕查看结果</el-button>
    </el-row>
  </div>
</template>

<script>
import steps from "@/components/steps";
export default {
  name: 'QuicklyRun',
  data() {
    return {

    }
  },
  created() {

  },
  methods: {
    next() {
      this.$router.push({
        name: 'QuicklyResult',
        query: {

        }
      })
    }
  },
  components: {
    steps
  }
}
</script>

<style>

</style>
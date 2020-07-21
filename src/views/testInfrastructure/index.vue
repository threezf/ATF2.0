/*
 *	测试基础设施界面，作为二级路由的主界面
 **/
<template>
  <div class="page-outer">
    <side-bar path-name="TestInfrastructure"></side-bar>
    <div class="right-content">
        <progress-bar></progress-bar>
        <div >
            <router-view />
        </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/side-bar";
    import progressBar from '@/components/progressBar'
export default {
  name: "index",
  components: {
    SideBar,
    progressBar
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.page-outer {
  display: flex;
  .right-content {
    flex: 1;
  }
}
</style>

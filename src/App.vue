<template>
  <div id="app">
    <el-header class="header-container" v-if="activeMenu!='Login'">
        <el-row class="header">
          <el-col :span="4" class="logo">
            <h3 style="white-space: nowrap;">管理系统</h3>
          </el-col>
          <el-col :span="20">
            <el-menu v-if="menuList.length!=0" :default-active="activeMenu" class="el-menu-demo" mode="horizontal" background-color="#333" text-color="#fff" active-text-color="#44b549">
              <el-menu-item v-for="route in menuList" :index="route.name" :key="route.name">
                <router-link :to="{name: route.name}">{{route.meta.name}}</router-link>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <router-view/>
  </div>
</template>

<script>
import Request from '@/libs/request.js'
export default {
  name: 'App',
  data() {
    let activeMenu = window.activeMenu;
    return {
      routes: this.$router.options.routes,
      activeMenu: activeMenu
    }
  },
  watch: {
    '$route' (to, from) {
      this.activeMenu = to.meta.parents || to.name;
    }
  },
  computed: {
    menuList() {
      let menuList = []
      this.$router.options.routes.forEach(item => {
        if(item.path != '/' && !item.meta.hide) {
          menuList.push(item)
        }
      })

      return menuList
    }
  },
  mounted() {

  }
}
</script>

<style lang="less">
@import './styles/base.less';
</style>

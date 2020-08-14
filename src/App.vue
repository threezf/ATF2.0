<template>
  <div id="app">
    <el-header class="header-container" v-if="activeMenu!='Login'">
      <el-row class="header">
        <el-col :span="4" class="logo">
          <h3 class="mainTitle" style="white-space: nowrap;">管理系统</h3>
        </el-col>
        <el-col :span="18">
          <el-menu
            v-if="menuList.length!=0"
            :default-active="activeMenu"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#333"
            text-color="#fff"
            active-text-color="#44b549">
            <el-menu-item v-for="route in menuList" :index="route.name" :key="route.name">
              <router-link :to="{name: route.name}">{{route.meta.name}}</router-link>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="2">
          <el-tooltip class="item" effect="dark" content="退出登录" placement="left">
            <el-button
              icon="el-icon-switch-button"
              class="logout"
              type="danger"
              @click="logout"
              plain>
            </el-button>
           </el-tooltip>
        </el-col>
      </el-row>
    </el-header>
    <router-view />
  </div>
</template>

<script>
import Request from "@/libs/request.js";
export default {
  name: "App",
  data() {
    let activeMenu = window.activeMenu;
    return {
      routes: this.$router.options.routes,
      activeMenu: activeMenu,
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        console.log("to.meta.parent", to.meta.parent);
        this.activeMenu = to.meta.parent || to.name;
      },
      immediate: true,
    },
  },
  computed: {
    menuList() {
      let menuList = [];
      this.$router.options.routes.forEach((item) => {
        if (item.path != "/" && !item.meta.hide) {
          menuList.push(item);
        }
      });

      return menuList;
    },
  },
  methods: {
    logout() {
      this.$confirm('是否注销登录','警告', {
        confirmButton: '确定',
        cancelButton: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({
          path: "/login",
        });
      }).catch(() => {})
    },
  },
  mounted() {},
};
</script>

<style lang="less">
@import "./styles/base.less";
.el-menu.el-menu--horizontal {
  border-bottom: solid 0px;
}
.mainTitle {
  line-height: 60px;
}
.logout {
  background: transparent !important;
  border: none;
  height: 60px;
}
.el-icon-switch-button {
  font-size: 26px;
}
</style>

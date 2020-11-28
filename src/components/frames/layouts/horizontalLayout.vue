<template>
  <div class="layout-main">
      <div class="left-layout">
          <!-- 这里放置左侧菜单栏 -->
          <slot name="left"></slot>
      </div>
      <main class="right-layout">
          <!-- 这里放置主要内容 -->
          <slot name="main"></slot>
      </main>
  </div>
</template>

<script>
export default {
    name: 'HorizontalLayout',
    data() {
        return {}
    },
    created() {},

}
</script>

<style lang="less" scoped>
    .layout-main {
        width: inherit;
        display: flex;
        .left-layout {
            flex-basis: 190px;
            flex-shrink: 1;
            border-right: 1px solid #eee;
        }
        .right-layout {
            flex-shrink: 9;
            overflow: auto;
            flex: 1;
        }
    }
</style>
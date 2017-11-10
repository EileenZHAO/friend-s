<template>
  <div id="app">
    <transition
      enter-active-class="animated zoomInRight"
      leave-active-class="animated zoomOutLeft"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
  .zoomOutLeft{
    position: absolute;
    z-index: -1;
  }
</style>

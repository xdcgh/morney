<template>
  <div id="app">
    <router-view/>
    <hr/>
  </div>
</template>

<style lang="scss">
  @import "~@/assets/style/reset.scss";
  @import "~@/assets/style/helper.scss";

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
    font-size: 16px;
    font-family: $font-hei;
    color: #333333;
    background: #f5f5f5;
  }
</style>

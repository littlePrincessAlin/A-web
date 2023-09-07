<script setup lang='ts'>
import { RouterLink, RouterView } from 'vue-router'


</script>

<template>
  <div class="lilin">
    <p>vue3入门</p>
    <RouterLink to="/expression">vue基础语法练手</RouterLink>
  </div>
</template>

<style lang='scss' scoped>
.lilin {
  padding: 40px;
}
a {
  margin-left: 40px;
  color: plum;
}
</style>

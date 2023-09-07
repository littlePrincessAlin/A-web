<script setup lang="ts"> 
import { ref } from 'vue'
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
};
const value = 'lilin';
const someAttr = 'name';
const count = ref(0);
const count1 = ref(0);
const handleClickCountAdd = () => {
  count1.value++;
}
</script>
<template>
  <div class="expression">
    <div v-bind="objectOfAttrs">给dom绑定多个属性</div>
    <a :[someAttr]="value"> DOM 内嵌模板 </a>
    <br />
    <div @click="count++">ref声明响应: {{ count }}</div>
    <div @click="handleClickCountAdd">ref声明响应2: {{ count1 }}</div>
  </div>
</template>
<style lang="scss" scoped>
.expression {
  padding: 40px;
  &__title {
  }
}
</style>

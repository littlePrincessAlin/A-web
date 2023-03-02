/// <reference types="vite/client" />

// vue不是模块，所以ts会引入报错，在这里声明一下
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
// 引入组件库
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

// import "./assets/main.css"; // 取消使用公共样式

const app = createApp(App);

// app.provide()：提供一个公用的值,组件使用时 通过 inject: ['isApp'] this.isApp 取值
app.provide("isApp", "1");
// app.component()：注册一个全局组件

// app.directive()：注册一个全局指令（内置的指令像v-model、v-show）

app.use(createPinia());
app.use(router);
app.use(Antd);
app.mount("#app");
// console.log("app config", app.config);
console.log("app", app);

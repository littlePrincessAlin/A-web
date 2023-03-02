import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
// 引入组件库
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

// import "./assets/main.css"; // 取消使用公共样式

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Antd);
app.mount("#app");

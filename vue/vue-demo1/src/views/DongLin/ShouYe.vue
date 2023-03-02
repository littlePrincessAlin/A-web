<script lang="ts">
import { defineComponent, ref, reactive, createVNode } from "vue";
import type { FormInstance } from "ant-design-vue";
import { Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
// import { useStore } from "../stores/store.js";
// const store = useStore();
// setup命名的script不接受es模块导出
interface FormState {
  temperature: string;
  humidity: string;
  exchangeLow: string;
}
export default defineComponent({
  setup() {
    const formRef = ref<any>();
    const formState = reactive<FormState>({
      temperature: "",
      humidity: "",
      exchangeLow: "",
    });
    const onFinish = (values: any) => {
      const res =
        27.261261 +
        0.197419 * +formState.temperature +
        0.485103 * +formState.humidity +
        2.124483 * +formState.exchangeLow;

      Modal.confirm({
        title: "最终转换结果为：",
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode("div", { style: "color:red;" }, res),
        okText: "知道啦",
        cancelText: "取消",
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        },
        class: "test",
      });
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    return {
      activeKey: ref("1"),
      formState,
      formRef,
      onFinish,
      onFinishFailed,
      resetForm,
    };
  },
});
</script>

<template>
  <main>
    <div class="card-container">
      <!-- 轮播图 -->
      <a-carousel autoplay>
        <div>
          <img src="@/assets/dongLin/d5.png" alt="" class="card-image" />
        </div>
        <div>
          <img src="@/assets/dongLin/d6.png" alt="" class="card-image" />
        </div>
        <div>
          <img src="@/assets/dongLin/d7.png" alt="" class="card-image" />
        </div>
      </a-carousel>
      <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane key="1" tab="首页">
          <p>
            挥发性有机化合物（volatile organic
            compounds，VOCs）作为一类有害气体的总称，影响室内空气质量，危害人体健康。室内VOCs来源于各种建筑装饰材料、人造板、家具等，例如室内装修中使用的胶合板、刨花板、涂料、地板等都含有VOCs，其中包含毒性甚至是致癌物质。总挥发性有机化合物（total
            volatile organic
            compounds，TVOC）用来表示其总和。研究表明，环境条件（温度、相对湿度、空气交换律）对强化地板VOCs释放有一定的影响，通过建立模型，用户可以随意给出各环境条件值，本系统即可提供双象强化地板的TVOC释放量预测结果。
          </p>
          <img src="@/assets/dongLin/d4.png" alt="" class="card-image" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="双象木业介绍">
          <p>
            哈尔滨双象木业有限公司暨国营松江胶合板厂，隶属于黑龙江省森工总局，始建于1924年，该公司是一家有着80年的木材加工和制造历史的有限公司。2000年企业投资近亿元，引进当今世界领先水平的德国强化复合地板生产线。其中强化复合地板年产量为520万平方米；浸渍纸年产量为2000万平方米（加上老生产线年产量总计为3000万平方米）；贴面板年产量为500万平方米。实现了主产品结构调整，一跃成为国内集强化复合地板、浸渍纸和贴面产品于一体的现代化高精加工的大型企业。位居全国强化复合地板行业十大企业之一，“双象”牌强化复合地板系国内名优品牌产品。
          </p>
          <img src="@/assets/dongLin/d1.png" alt="" class="card-image" />
          <img src="@/assets/dongLin/d2.png" alt="" class="card-image" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="强化地板">
          <p>
            双象强化地板是由黑龙江省哈尔滨市国营松江胶合板厂生产的E0级无毒强化复合地板，是一种浸渍纸层压木质地板。浸渍纸层压木质地板是以一层或多层专用纸浸渍热固性氨基树脂，铺装在刨花板、高密度纤维板等人造板基材表层，背面加平衡层，正面加耐磨层，经热压、成型的地板。浸渍纸层压木质地板与普通地板相比，具有耐磨性高、款式丰富、抗冲击能力强、抗变形、耐污染能力强、阻燃、防潮、环保、易打理，可用于地暖等优点，这些优点使强化地板深受人们的青睐。
          </p>
          <img src="@/assets/dongLin/d3.png" alt="" class="card-image" />
        </a-tab-pane>
        <a-tab-pane key="4" tab="TVOC预测">
          <p>
            请根据提示输入温度、相对湿度、空气交换率，系统将给出强化地板的TVOC释放量预测值。
          </p>
          <a-form
            ref="formRef"
            :model="formState"
            name="basic"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 6 }"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
          >
            <a-form-item label="温度(℃)" name="temperature">
              <a-input v-model:value="formState.temperature" />
            </a-form-item>
            <a-form-item label="相对湿度(%)" name="humidity">
              <a-input v-model:value="formState.humidity" />
            </a-form-item>
            <a-form-item label="空气交换律(次/h)" name="exchangeLow">
              <a-input v-model:value="formState.exchangeLow" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button type="primary" html-type="submit">转换</a-button>
              <a-button style="margin-left: 10px" @click="resetForm"
                >重置</a-button
              >
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </div>
  </main>
</template>

<style>
.card-container {
  margin-top: 20px;
}
.card-image {
  margin-bottom: 20px;
  width: 100%;
  height: 500px;
}
.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
  color: #32cd32 !important;
}

/* For demo */
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}
</style>

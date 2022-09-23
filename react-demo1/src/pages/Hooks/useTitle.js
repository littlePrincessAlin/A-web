import { useEffect } from "react";

// 给每个页面自定义标题
export const useTitle = (title) => {
  useEffect(() => {
    document.title = title;
  });

  // 在这里可以对入参进行存储、大量的逻辑处理，也可以把包装好的方法变量，在这个自定义钩子中return 出去
  // 在需要的地方结构调用即可，注意自定义hooks也需要满足纯函数的定义。
};

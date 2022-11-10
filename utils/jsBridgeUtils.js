/**
 * @description: 端能力工具函数
 * @params: parmas, callBack
 */
/**
 * namespace:
 * 
 */
export const JSBridge = (parmas, callBack) => {
  const { action, ...rest } = parmas || {};
  window.AmapApp.bridge.send(
    {
      action,
      ...rest,
    },
    (res) => {
      callBack(res);
    }
  );
};

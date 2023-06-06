import React from 'react';
// login页面

// 渲染组件
export interface mapLoginComponent {
  [key: string]: (props?: object) => React.JSX.Element
}

// 登陆配置loginForm类型
interface comType {
  comType: string;
  [key: string]: any;
}

export interface loginFormItem {
  dataIndex: string;
  label?: string;
  name?: string;
  rules?: Array<any>;
  render: comType | comType[];
  layout?: object;
  className?: string;
  config?: object;
}

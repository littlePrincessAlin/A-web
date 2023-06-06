// 路由配置文件
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  redirect
  // 路由器组件写法：
  // BrowserRouter,
  // Routes,
  // Route
} from "react-router-dom";
import Home from '@/pages/home/Home';
import Login from '@/pages/login/Login';
import ErrorBoundary from '@/components/commonComponent/ErrorBoundary'

// 重定向
const loader = async () => {
  const user = ''// 从redux获取用户信息
  if (!user) {
    return redirect("/login");
  }
  // 同时需要在这个函数做请求拦截
  return null;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorBoundary /> // 错误元素
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorBoundary />, // 错误元素
    loader
  },
]);

const RouterComponent = () => (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

export default RouterComponent;

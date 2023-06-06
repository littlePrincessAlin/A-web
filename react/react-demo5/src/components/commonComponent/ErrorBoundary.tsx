// 错误抛出组件
import React from 'react';
import { useRouteError } from 'react-router-dom';
import './style.scss'

const ErrorBoundary = () => {
  // 此挂钩返回在操作、加载程序或渲染期间抛出的任何内容
  const error = useRouteError();
  console.log('error:', error)
  return (
    <div className="error__boundary">
      <div>啊哦～页面错误喽！</div>
      <div>页面正在修理🔧中，不要着急哦</div>
      <div className="error__boundary--email">
        <div>请联系我 YOLO</div>
        <div>email：1361821021@qq.com</div>
      </div>
    </div>
  )
}
export default ErrorBoundary

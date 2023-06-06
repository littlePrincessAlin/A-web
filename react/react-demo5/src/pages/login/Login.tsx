// 登陆页
import React, { useEffect, useState, useRef } from 'react';
import { Form, Checkbox, Tooltip } from 'antd';
import { loginForm, registerForm } from './config/const';
import './style.scss';
import InputComponent from '@/components/formComponent/Input';
import ButtonComponent from '@/components/formComponent/Button';
import { mapLoginComponent, loginFormItem } from '@/type/loginType';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const Login: React.FC = () => {
  const mapComponent: mapLoginComponent = {
    'Input': InputComponent,
    'InputPassword': InputComponent,
    'Button': ButtonComponent,
  }
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  // 页面状态：login、register
  const [pageStatus, setPageStatus] = useState<string>('login');
  const [formList, setFormList] = useState<loginFormItem[]>(loginForm);
  // 选择框
  const checkBoxRef = useRef(null);
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [toolTip, setToolTip] = useState<boolean>(false);
  const [clickScan, setClickScan] = useState<boolean>(false);

  // 表单重置
  const onReset = () => {
    form.resetFields();
  };

  // 表单提交
  const onFinish = (values: any) => {
    console.log('onFinish', values);
  }

  // 点击前往注册
  const handleRegister = () => {
    if(pageStatus === 'register') {
      setPageStatus('login')
    }
    if(pageStatus === 'login') {
      setPageStatus('register')
    }
  }

  // 同意法律条例
  const onChange = (event: CheckboxChangeEvent) => {
    setIsCheck(event.target.checked);
    setToolTip(false);
  }

  // 扫码登陆
  const handleScan = () => {
    setClickScan(!clickScan);
    // 查看《用户协议》和《隐私协议》是否勾选
    if(!isCheck) {
      if(checkBoxRef?.current?.className) {
        // 移除dom上的notice属性，以便触发第二次动画
        checkBoxRef.current.classList.remove("notice");
      }
      setToolTip(true)
    }else {
    }
  }

  useEffect(() => {
    if(pageStatus === 'register') {
      setFormList(registerForm)
    }
    if(pageStatus === 'login') {
      setFormList(loginForm)
    }
  }, [pageStatus]);

  // 首次不触发动画
  useEffect(() => {
    if(!isCheck) {
      checkBoxRef.current.className = 'notice';
    }
    return () => {
      // 销毁
      if(checkBoxRef?.current?.className) {
        checkBoxRef.current.classList.remove("notice");
      }
    }
  }, [clickScan]);

  return (
    <>
      <div className="login">
        <div className='title'>
          {pageStatus === 'register' ? '注册YOLO' : '登陆YOLO'}
        </div>
        <div className="login__form">
          <div onClick={handleScan} className="login__form--tip">扫码登陆更便捷</div>
          <div onClick={handleScan} className="login__form--img"></div>
          <Form
            className="login__form--content"
            form={form}
            onFinish={onFinish}
            onReset={onReset}
            {...layout}
          >
            {
              formList.map((item: loginFormItem) => {
                return (
                  <Form.Item
                    key={item.dataIndex}
                    label={item.label}
                    name={item.name}
                    rules={item.rules}
                    className={item.className}
                    {...item.layout}
                    {...item.config}
                  >
                    {
                      Array.isArray(item.render)
                        ? item.render.map((renderItem, renderIndex) => 
                            <div key={renderIndex}>{mapComponent[renderItem.comType](renderItem)}</div>
                          )
                        : mapComponent[item.render.comType](item.render)
                    }
                  </Form.Item>
                )
              })
            }
          </Form>
          <div className="login__form--agree">
            <div ref={checkBoxRef}>
              <Tooltip
                title={toolTip ? '请阅读并勾选下方协议' : ''}
                open={toolTip ? true : false}
              > 
              </Tooltip>
              <Checkbox onChange={onChange} />
            </div>
            同意YOLO《用户协议》和《隐私协议》
          </div>
        </div>
        <div onClick={handleRegister} className='register'>
          {pageStatus === 'register' ? '已经有账号了，去登陆吧' : '还没有注册yolo，快来注册加入我们吧！'}
        </div>
      </div>
    </>
  )
};

export default Login;

// 配置

// 登陆配置
export const loginForm = [
  {
    dataIndex: 'username',
    label: '用户名',
    name: "username",
    rules: [{ required: true, message: '请输入用户名' }],
    render: {
      comType: 'Input'
    }
  },
  {
    dataIndex: 'password',
    label: '密码',
    name: "password",
    rules: [{ required: true, message: '请输入密码' }],
    render: {
      comType: 'InputPassword'
    }
  },
  {
    dataIndex: 'buttonList',
    className: 'buttonList',
    render: [
      {
        comType: 'Button',
        type: 'primary',
        htmlType: 'submit',
        ButtonTxt: '登陆'
      },
      {
        comType: 'Button',
        htmlType: 'reset',
        ButtonTxt: '重置'
      }
    ],
    layout: {
      wrapperCol: { offset: 6, span: 16 },
    }
  }
]


// 注册配置
export const registerForm = [
  {
    dataIndex: 'username',
    label: '用户名',
    name: "username",
    rules: [{ required: true, message: '请输入用户名' }],
    render: {
      comType: 'Input'
    }
  },
  {
    dataIndex: 'password',
    label: '密码',
    name: "password",
    rules: [{ required: true, message: '请输入密码' }],
    render: {
      comType: 'InputPassword'
    }
  },
  {
    dataIndex: 'buttonList',
    render:{
      comType: 'Button',
      type: 'primary',
      htmlType: 'submit',
      ButtonTxt: '确认注册'
    },
    layout: {
      wrapperCol: { offset: 6, span: 16 },
    }
  }
]

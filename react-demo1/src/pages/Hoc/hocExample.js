// 权限控制： 登陆鉴权、属性代理，继承自React.Component，通过传递给被包装的组件props得名

import React from "react";

function withLogin(WrappedComponent) {
  return class Lilin extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLogin: false,
      };
    }
    async componentDidMount() {
      const isLogin = await getLoginStatus();
      this.setState({ isLogin });
    }
    render() {
      if (this.state.isLogin) {
        return <WrappedComponent {...this.props} />;
      }
      return <div>您还未登陆。。。。。。。</div>;
    }
  };
}

export default withLogin;

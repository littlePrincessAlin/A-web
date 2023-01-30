import React from 'react';

// 反向继承传入的组件
function iiHOC(WrappedComponent) {
  return class Enhancer extends WrappedComponent {
    render() {
      // todo
      // this.
      console.log('this', this);

      return (
        <>lilin</>
      )
    }
  };
}

class son extends React.Component {
  componentDidMount() {
    console.log('this', 'lilin');
  }

  render() {
    return (
      <>123</>
    )
  }
}
export default iiHOC(son);

// 反向继承允许高阶组件通过 this 关键词获取 WrappedComponent，意味着它可以获取到 state，props，组件生命周期（component lifecycle）钩子，以及渲染方法（render），所以我们主要用它来做渲染劫持，
// 比如在渲染方法中读取或更改 React Elements tree，或者有条件的渲染等。

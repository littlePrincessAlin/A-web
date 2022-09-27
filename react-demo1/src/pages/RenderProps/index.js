import Son from "./Son";
const RenderProps = () => {
  return (
    <>
      <h1>效果：</h1>
      <Son
        render={name => {
          return <div>我是一个dom，由render props来复用逻辑的，可以通过子组件传出来参数{name}</div>;
        }}
      ></Son>

      <hr />
      <h1>render props：</h1>
      这个方法像极了vue的插槽啊～～
      <h2>使用举例</h2>
      由于可以通过将子组件向父组件传参，所以可以做登陆拦截等。（eg.维护登陆信息，通过该组件传入不同的父组件中）。
      ui逻辑由各自的业务组件决定。
      <h2>render props核心流程：</h2>
      <img
        alt=""
        src="https://code52-1305763557.file.myqcloud.com/uploads/article/8zSOZpbaAa/8AFrmj7saI.png"
      ></img>
      <p>
        1、当代码执行遇到jsx语法,会调用React.js的createElement方法，其实调用的是ReactElement.js中createElement方法转成react
        element节点
      </p>
      <p>
        2、 当代码调用的是ReactDOM.render，最终返回React
        component类型的组件，在执行render的过程中，会调用Son组件的render函数，遇到jsx语法
        <b style={{ color: "red" }}>{`<>{props.render('lilin')}</>`}</b>
        会执行步骤1生成element节点并返回，当执行到props.render('lilin')，遇到jsx语法
        <b style={{ color: "red" }}>{`return <div>我是一个dom，由render props来复用逻辑的，可以通过子组件传出来参数{name}</div>`}</b>
        会再次执行步骤1生成element节点并返回，最终经过复杂的渲染过程渲染到页面。
      </p>
      <h2>render props缺点：</h2>
      嵌套地狱、业务逻辑分散在各个组件、难以理解的class。
    </>
  );
};
export default RenderProps;

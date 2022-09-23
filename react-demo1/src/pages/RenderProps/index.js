import Father from "./Father";
const RenderProps = () => {
  return (
    <>
      <h1>效果：</h1>
      <Father
        render={() => {
          return <div>我是一个dom，由render props来复用逻辑的</div>;
        }}
      ></Father>

      <hr />
      <h1>render props：</h1>
      这个方法像极了vue的插槽啊～～
      <h2>使用举例</h2>
      当你n个子组件想根据同一规则选择性展示，就可以在父组件中维护一套逻辑，来决定最终的ui展示。
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
        2、 当代码执行遇到{" "}
        <b style={{ color: "red" }}>{`ReactDOM.render(comp,
      document.getElementById("root"))`}</b>{" "}
        调用的是ReactDOM.render，最终返回React
        component类型的组件，在执行render的过程中，会调用Demo组件的render函数，遇到jsx语法
        <b style={{ color: "red" }}>{`return (<div>{func(this.state.name)}</div>);`}</b>
        会执行步骤1生成element节点并返回，当执行到func(this.state.name)，遇到jsx语法
        <b style={{ color: "red" }}>{`return <h1>{name}</h1>，`}</b>
        会再次执行步骤1生成element节点并返回，最终经过复杂的渲染过程渲染到页面。
      </p>
      <h2>render props缺点：</h2>
      嵌套地狱、业务逻辑分散在各个组件、难以理解的class。
    </>
  );
};
export default RenderProps;

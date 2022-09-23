let SetIntervalMixin = {
  componentWillMount: function () {
    this.intervals = [];
  },
  setInterval: function () {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function () {
    this.intervals.forEach(clearInterval);
  },
};
let initZero = {
  handleClick: function () {
    this.setState({ seconds: 0 });
  },
};

let createReactClass = require("create-react-class");

let TickTock = createReactClass({
  mixins: [SetIntervalMixin, initZero], // 使用 mixin
  getInitialState: function () {
    return { seconds: 0 };
  },
  componentDidMount: function () {
    this.setInterval(this.tick, 1000); // 调用 mixin 上的方法
  },
  tick: function () {
    this.setState({ seconds: this.state.seconds + 1 });
  },
  render: function () {
    return (
      <p>
        React has been running for {this.state.seconds} seconds.
        <button onClick={this.handleClick}>点击这里我会从0开始</button>
      </p>
    );
  },
});

const Mixins = () => (
  <>
    <h1>效果：</h1>
    <TickTock />

    <hr />
    <h1>mixins</h1>
    如果组件拥有多个 mixins，且这些 mixins 中定义了
    <b style={{ color: "red" }}>相同的生命周期方法</b>
    （例如，当组件被销毁时，几个 mixins 都想要进行一些清理工作），
    那么这些生命周期方法都会被调用的。
    <b style={{ color: "red" }}>
      使用 mixins 时，mixins
      会先按照定义时的顺序执行，最后调用组件上对应的方法。
    </b>
    <b style={{ color: "red" }}>react 15 以上，React.createClass已经被废弃了，</b>大家陆续开始使用es6 的 class；
    在这里我使用create-react-class这个包，来模拟class；

    <h2>使用举例</h2>
    mixins里的每个元素，可以把逻辑函数进行分类，从而达到复用函数的效果。
    <h2>mixins核心流程：</h2>
    <img alt="mixins核心流程" src="https://code52-1305763557.file.myqcloud.com/uploads/article/8zSOZpbaAa/8AFrj1SF2w.png"></img>
    <p>1、通过React.createClass(spec)接收到spec参数，判断spec对象中是否有mixins属性，</p>
    <p>2、如果没有，那太棒了，直接遍历spec把propTypes、componentWillMount等生命周期函数、事件方法等挂载到Constructor.prototype上，这个Constructor就是react组件实例的构造函数；</p>
    <p>3、如果有，就需要判断mixins对象中是否还有mixins属性（因为框架允许mixins嵌套mixins），没有再回到步骤2挂载到原型，有则继续步骤3遍历。</p>
    <h2>mixins缺点：</h2>
    <h3>引入了隐式依赖</h3>
    嵌套mixins各自定义的属性可能被嵌套的多个mixins隐式引用着，删除其中一个会破坏另一个，不形成层次结构，被扁平化并在相同的命名空间中运行。
    <h3>导致命名冲突</h3>
    存在潜在的破坏性更改，因为在某些使用它的组件上可能已经存在具有相同名称的方法。
    <h3>导致滚雪球般的复杂性</h3>
    原本抽离公共的mixins是为了代码复用，但是随着业务需求的迭代，逐渐出现了差异化，就开始在上面增加if...else逻辑，代码耦合度、复杂度增高，随之带来的是理解成本和开发出错成本，重构代码也是个难题。
  </>
);
export default Mixins;

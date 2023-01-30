import { Link } from "react-router-dom";
import Styles from "./home.css";

function Home() {
  return (
    <div className={Styles.home}>
      <main>
        <h2 className={Styles.title}>Welcome to Li Lin's share</h2>
      </main>
      {/* <hr />
      <h1>1、JSX</h1>
      <h2>jsx是什么？为什么使用jsx</h2>
      <code>
        const element = &lt;h1&gt; Hello, world! &lt;/h1&gt;; <br />
      </code>
      React 认为渲染逻辑本质上与其他 UI 逻辑内在耦合，比如，在 UI 中需要绑定处理事件、在某些时刻状态发生变化时需要通知到 UI，以及需要在 UI 中展示准备好的数据。
      <h2>在jsx嵌入表达式</h2>
      <code>
        const name = 'Josh Perez'; <br />
        const element = &lt;h1&gt;Hello, {'\u007B'}name{'\u007d'}&lt;/h1&gt;; <br />
      </code>
      在jsx代码中，你可以在大括号内放置有效的js表达式：2 + 2，user.firstName 或 formatName(user) 都是有效的 JavaScript 表达式。
      <h2>jsx也是一个表达式</h2>
      在编译之后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象。

      也就是说，你可以在 if 语句和 for 循环的代码块中使用 JSX，将 JSX 赋值给变量，把 JSX 当作参数传入，以及从函数中返回 JSX：<br />
      function getGreeting(user) {'\u007B'}<br />
        if (user) {'\u007B'}<br />
           return &lt;h1&gt;Hello, {'\u007B'}formatName(user){'\u007d'}!&lt;/h1&gt;;<br />
          {'\u007d'}<br />
         return &lt;h1&gt;Hello, Stranger.&lt;/h1&gt;;<br />
      {'\u007d'}<br />
      <h2>jsx自动展开数组</h2>
      
      <hr /> */}
      <h1 className={Styles.title}>react代码逻辑复用</h1>
      <p>四种方式：</p>
      <ul>
        <li>
          mixins: <span className={Styles.icon}>已被废弃</span> <br />
          <Link to="/mixins">去看看mixins的组件逻辑复用吧</Link>
        </li>
        <li>
          render props:
          <br />
          <Link to="/renderProps">去看看render props的组件逻辑复用吧</Link>
        </li>
        <li>
          hoc:
          <br />
          <Link to="/hoc">去看看hoc的组件逻辑复用吧</Link>
        </li>
        <li>
          hooks: <br />
          <Link to="/hooks">去看看hooks的组件逻辑复用吧</Link>
          <br />
        </li>
      </ul>
    </div>
  );
}
export default Home;

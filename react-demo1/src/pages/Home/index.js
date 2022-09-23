import { Link } from "react-router-dom";
import Styles from "./home.css";

function Home() {
  console.log(Styles)
  return (
    <div className={Styles.home}>
      <main>
        <h2>Welcome to the homepage</h2>
      </main>
      <hr />
      <h1>1、JSX</h1>
      <h2>jsx是什么？为什么使用jsx</h2>
      <code>
        const element = &lt;h1&gt; Hello, world! &lt;/h1&gt;;
      </code>

      <hr />
      <nav>
        <Link to="/about">about</Link>
      </nav>
    </div>
  );
}
export default Home;
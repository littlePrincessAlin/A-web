import { useTitle } from "./useTitle";
import { useNavigate } from 'react-router-dom';

const Hooks = () => {
    const title = "我是自定义hooks";
    useTitle(title);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/private");
    }

    return (
      <>
        <h1>效果：</h1>
        <hr></hr>
        <h1>Hooks: </h1>
        它是react的api，解决了以上render props、hoc代码复用的问题
        <h2>使用注意</h2>
        <ul>
            <li>避免在for、条件判断、嵌套函数中使用hooks，保证调用顺序的稳定</li>
            <li>只有函数定义组件和hooks可以调用hooks。避免在类组件或普通函数调用</li>
            <li>不能在useEffect中使用useState，react会报错</li>
            <li>类组件不会被废弃/替换，不需要强制去修改类组件，两者可并存</li>
        </ul>
        <h2>一些hooks</h2>
        <ul>
            <li>useState</li>
            <li>useEffect</li>
            <li>useRef： 获取组件的真实节点</li>
            <li>useMemo: 用户缓存传入的props，避免依赖的组件每次都重新去渲染</li>
            <li>useReducer：组件内部的redux，不是持久化的存储，组件销毁就会被销毁；配合useContext使用；属于组件内部，无法共享，其他组件不能用；</li>
            <li>useImpretiveHandler: 配合forwardRef一起使用，完成没有关系组件间的通信</li>
            <li>自定义hooks</li>
        </ul>
        <h2>自定义hook</h2>
        <button onClick={handleClick}>点击一下试试，自定义hooks的其他页面有没有生效呀～～</button>
      </>
    );
  };
  
  export default Hooks;
  
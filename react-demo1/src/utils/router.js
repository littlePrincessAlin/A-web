import { useRoutes } from "react-router-dom";
import Home from "../pages/Home/index.js";
import About from "../pages/About/index.js";
import Mixins from "../pages/Mixins/index.js";
import RenderProps from "../pages/RenderProps/index.js";
import Hoc from "../pages/Hoc/index.js";
import Hooks from "../pages/Hooks/index.js";
import HooksPrivate from "../pages/Hooks/HooksPrivate.js";

function RouterComponent() {
  let element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about",
      element: <About />,
    //   children: [
    //     {
    //       path: "messages",
    //       element: <DashboardMessages />,
    //     },
    //     { path: "tasks", element: <DashboardTasks /> },
    //   ],
    },
    {
      path: "/mixins",
      element: <Mixins />,
    },
    {
      path: "/renderProps",
      element: <RenderProps />,
    },
    {
      path: "/hoc",
      element: <Hoc />,
    },
    {
      path: "/hooks",
      element: <Hooks />,
    },
    {
      path: "/private",
      element: <HooksPrivate />,
    },
    // 重定向
    { path: "home", redirectTo: "/" },
    // 404找不到
    // { path: "*", element: <NotFound /> },
  ]);
  return element;
}

export default RouterComponent;

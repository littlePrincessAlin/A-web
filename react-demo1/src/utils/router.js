import { useRoutes } from "react-router-dom";
import Home from "../pages/Home/index.js";
import About from "../pages/About/index.js";

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
    // 重定向
    { path: "home", redirectTo: "/" },
    // 404找不到
    // { path: "*", element: <NotFound /> },
  ]);
  return element;
}

export default RouterComponent;

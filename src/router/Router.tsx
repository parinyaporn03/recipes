import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Detail from "../components/Detail";
import Meal from "../components/Meal";
const Router = createBrowserRouter([
  {
    path: "/recipes",
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "",
            element: <Meal />,
          },
          {
            path: ":category",
            element: <Meal />,
          },
        ],
      },
      {
        path: ":category/detail/:id",
        element: <Detail />,
      },
    ],
  },
]);
export default Router;

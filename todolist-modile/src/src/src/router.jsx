import { createHashRouter } from "react-router-dom";
import Home from "./pages/Home";

const router = createHashRouter([
  {
    path: "",
    Component: Home,
  },
]);

export default router;
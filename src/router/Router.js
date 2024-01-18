import { useRoutes } from "react-router-dom";
import { route } from "./route";

export default function Router() {
  let routes = useRoutes(route);

  return routes;
}

import { Route } from "react-router-dom";
import { routes } from ".";

const renderRoutes = () => {
  interface NestedRoute {
    path: string;
    element: React.ComponentType<any>;
    nested?: NestedRoute[];
  }

  interface RouteConfig extends NestedRoute {
    nested?: NestedRoute[];
  }

  return routes.map((route: RouteConfig) => {
    if (route.nested) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.nested.map((item: NestedRoute) => (
            <Route key={item.path} path={item.path} element={<item.element />}>
              {item.nested?.map((i: NestedRoute) => (
                <Route key={i.path} path={i.path} element={<i.element />} />
              )) ?? []}
            </Route>
          ))}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};

export { renderRoutes };

import { lazy } from "react";

declare interface RouteConfig {
  path: string;
  element: any;
  nested?: RouteConfig[];
}

const routes: RouteConfig[] = [
  {
    path: "/",
    element: lazy(() => import("./../pages/UserTemplates")),
    nested: [
      {
        path: "",
        element: lazy(() => import("./../pages/UserTemplates/Homepage")),
      },
      {
        path: "boards/:boardId/cards",
        element: lazy(() => import("./../pages/UserTemplates/Cardpage")),
      },
      {
        path: "boards/:boardId/invite/accept",
        element: lazy(() => import("./../pages/UserTemplates/Cardpage/component/InviteResponsePage")),
      },
    ],
  },
  {
    path: "auth",
    element: lazy(() => import("./../pages/AuthTemplates")),
    nested: [
      {
        path: "login",
        element: lazy(() => import("./../pages/AuthTemplates/Login")),
      },
      {
        path: "email-verification",
        element: lazy(
          () => import("./../pages/AuthTemplates/EmailVerification")
        ),
      },
    ],
  },
];

export { routes };

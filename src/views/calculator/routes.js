import React from "react";

const Calculator = React.lazy(() => import("./calculator"));

const routes = [
  { path: "/calculator", name: "Calculator", element: Calculator },
  // { path: "/lend/all", name: "Alllend", element: Alllend },
  // { path: "/lend/trash", name: "Trashlend", element: Trashlend },
  // { path: "/lend/:id/edit", name: "Trashlend", element: Addlend },
];
export default routes;

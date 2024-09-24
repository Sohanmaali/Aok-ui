import React from "react";

const Addlend = React.lazy(() => import("./create"));
const Alllend = React.lazy(() => import("./all"));
const Trashlend = React.lazy(() => import("./trash"));

const routes = [
  { path: "/lend/create", name: "Addlend", element: Addlend },
  { path: "/lend/all", name: "Alllend", element: Alllend },
  { path: "/lend/trash", name: "Trashlend", element: Trashlend },
  { path: "/lend/:id/edit", name: "Trashlend", element: Addlend },
];
export default routes;

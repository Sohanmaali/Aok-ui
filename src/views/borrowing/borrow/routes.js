import React from "react";

const AddBorrow = React.lazy(() => import("./create"));
const AllBorrow = React.lazy(() => import("./all"));
const TrashBorrow = React.lazy(() => import("./trash"));
const Page404 = React.lazy(() => import("../../pages/page404/Page404"));

const routes = [
  { path: "/borrowing/create", name: "AddBorrow", element: AddBorrow },
  { path: "/borrowing/all", name: "AllBorrow", element: AllBorrow },
  { path: "/borrowing/trash", name: "TrashBorrow", element: TrashBorrow },
  { path: "/borrowing/:id/edit", name: "TrashBorrow", element: AddBorrow },
  { path: "*", name: "Page404", element: Page404 }, // Catch-all route
];
export default routes;

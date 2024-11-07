import React from "react";

const AddBill = React.lazy(() => import("./create"));
const AllBill = React.lazy(() => import("./all"));
const TrashBill = React.lazy(() => import("./trash"));
const BillDetails = React.lazy(() => import("./BillDetails"));

const routes = [
  { path: "/bill/create", name: "AddBill", element: AddBill },
  { path: "/bill/all", name: "AllBill", element: AllBill },
  { path: "/bill/trash", name: "TrashBill", element: TrashBill },
  { path: "/bill/bill-details/:id", name: "TrashBill", element: BillDetails },
  { path: "/bill/create/:customer", name: "TrashBill", element: AddBill },
];
export default routes;

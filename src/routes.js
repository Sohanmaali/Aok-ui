import BorrowingRoutes from './views/borrowing/borrow/routes'

// const BorrowingRoutes = React.lazy(() =>
  // import("./views/borrowing/borrow/routes")
// );

import BillRouters from "./views/Bill/routes";
import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
const Typography = React.lazy(() =>
  import("./views/theme/typography/Typography")
);

const Charts = React.lazy(() => import("./views/charts/Charts"));

const AddBorrow = React.lazy(() => import("./views/borrowing/borrow/create"));
const AllBorrow = React.lazy(() => import("./views/borrowing/borrow/all"));
const TrashBorrow = React.lazy(() => import("./views/borrowing/borrow/trash"));

const AddBill = React.lazy(() => import("./views/Bill/create"));
const AllBill = React.lazy(() => import("./views/Bill/all"));
const TrashBill = React.lazy(() => import("./views/Bill/trash"));

const AddAdmin = React.lazy(() => import("./views/user/admin/create"));
const AllAdmin = React.lazy(() => import("./views/user/admin/all"));
const TrashAdmin = React.lazy(() => import("./views/user/admin/trash"));

const routes = [
  ...BorrowingRoutes,
  ...BillRouters,
  // =======================================================================
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/theme", name: "Theme", element: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", element: Colors },
  { path: "/theme/typography", name: "Typography", element: Typography },
];

export default routes;

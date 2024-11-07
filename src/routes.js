import BorrowingRoutes from "./views/borrowing/borrow/routes";
import LendRoutes from "./views/borrowing/lend/routes";
import BillRouters from "./views/Bill/routes";
import Calculator from "./views/calculator/routes";
import AdminRouters from "./views/user/admin/routes";
import CustomerRouters from "./views/user/customer/routes";

// import BorrowingRoutes from "./views/borrowing/borrow/routes";

// const BorrowingRoutes = React.lazy(() =>
// import("./views/borrowing/borrow/routes")
// );

import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
const Typography = React.lazy(() =>
  import("./views/theme/typography/Typography")
);

const Charts = React.lazy(() => import("./views/charts/Charts"));

const routes = [
  ...BorrowingRoutes,
  ...LendRoutes,
  ...BillRouters,
  ...Calculator,
  ...AdminRouters,
  ...CustomerRouters,
  // =======================================================================
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/theme", name: "Theme", element: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", element: Colors },
  { path: "/theme/typography", name: "Typography", element: Typography },
];

export default routes;

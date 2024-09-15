import React from 'react'

const AddBill = React.lazy(() => import('./create'))
const AllBill = React.lazy(() => import('./all'))
const TrashBill = React.lazy(() => import('./trash'))

const routes = [
  { path: '/lend/create', name: 'AddBill', element: AddBill },
  { path: '/lend/all', name: 'AllBill', element: AllBill },
  { path: '/lend/trash', name: 'TrashBill', element: TrashBill },
  { path: '/lend/:id/edit', name: 'TrashBill', element: AddBill },
]
export default routes
